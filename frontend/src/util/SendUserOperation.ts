'use client';
import React, {useState, useEffect} from 'react';
import {
    Address,
    hexToBytes,
    Hex,
    SignableMessage,
} from 'viem';
import {signMessage} from 'viem/accounts';
import {goerli} from 'viem/chains';
import {lightAccountProxy, entryPoint} from './Config';

import {
    UserOperationRequest,
    entryPointContract,
    encodedCallData,
    buildUserOperation,
    getUserOperationHash,
    deepHexlify
} from './AccountAbstraction';
import {walletClient, PRIVATE_KEY} from './Config'

interface props {
    target: Address;
    data: Hex;
    value: bigint;
    onResult: (result: string) => void;
}

export default function SendUserOperation({target, data, value, onResult}: props) {
    const [nonce, setNonce] = useState<bigint>(BigInt(0));
    const [hexed, setHexed] = useState<UserOperationRequest | null>(null);
    const [contractResult, setContractResult] = useState<string>("");
    const fetchNonce = async () => {
        try {
            const result = await entryPointContract().read.getNonce([lightAccountProxy, BigInt(0)]);
            setNonce(result);
        } catch (error) {
            console.error('Error fetching nonce:', error);
        }
    };
    const createUserOperation = async () => {
        try {
            const encoded = encodedCallData(target, data, BigInt(value));
            const userOp = buildUserOperation(lightAccountProxy, encoded, nonce);
            const hexified: UserOperationRequest = deepHexlify(userOp);
            const hashUo = getUserOperationHash(hexified, entryPoint, BigInt(goerli.id));
            const msg = hexToBytes(hashUo as Hex);
            const signableMessage: SignableMessage = {raw: msg};
            const sig = await signMessage({message: signableMessage, privateKey: PRIVATE_KEY});
            hexified.signature = sig;
            setHexed(hexified);
        } catch (error) {
            console.error('Error during user operation creation:', error);
        }
    };
    const handleOperations = async () => {
        try {
            if (hexed) {
                // @ts-ignore
                const {request} = await entryPointContract().simulate.handleOps([[hexed], "0xd53Eb5203e367BbDD4f72338938224881Fc501Ab"]);
                const result = await walletClient.writeContract(request) as `0x{string}`;
                setContractResult(result);
            }
        } catch (error) {
            console.error('Error handling operations:', error);
        }
    };

    useEffect(() => {
        fetchNonce();
    }, []);

    useEffect(() => {
        createUserOperation();
    }, [nonce]);

    useEffect(() => {
        handleOperations();
    }, [hexed]);

    useEffect(() => {
        if (contractResult) {
            onResult(contractResult);
        }
    }, [contractResult]);

    return contractResult;
}