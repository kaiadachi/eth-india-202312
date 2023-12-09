import React, {useState} from 'react';
import {Address, createPublicClient, createWalletClient, hexToBytes, hexToNumber, http, SignableMessage} from 'viem';
import {SafeAbi} from '../abi/SafeAbi';
import {
    walletClient,
    publicClient,
    lightAccountProxy,
    account,
    zeroAddress,
    PRIVATE_KEY,
    receiver
} from '../util/Config';

import {
    keccak256,
    type Hex,
} from "viem";

import {ethers} from 'ethers';

interface SafeTx {
    to: string,
    value: bigint,
    data: string,
    operation: bigint,
    safeTxGas: bigint,
    baseGas: bigint,
    gasPrice: bigint,
    gasToken: string,
    refundReceiver: string,
    signatures: string,
}

interface SafeReq {
    to: Address,
    value: Hex,
    data: Hex | `0x`,
    operation: Hex,
    safeTxGas: Hex,
    baseGas: Hex,
    gasPrice: Hex,
    gasToken: Address,
    refundReceiver: Address,
    signatures: Hex,
}

export default function SetImpl() {
    const [isSettingUp, setIsSettingUp] = useState(false);
    const [isExecutingTransaction, setIsExecutingTransaction] = useState(false);

    const setup = async () => {
        setIsSettingUp(true);
        try {
            await walletClient.writeContract({
                address: lightAccountProxy,
                abi: SafeAbi,
                functionName: 'setup',
                args: [[account.address], BigInt(1), zeroAddress, "0x", zeroAddress, zeroAddress, BigInt(0), zeroAddress]
            });
        } catch (error) {
            console.error("An error occurred during the setup process:", error);
        }
        setIsSettingUp(false);
    };
    const execTransaction = async () => {
        setIsExecutingTransaction(true);
        try {
            const to = receiver;
            const value = BigInt(20);
            const data = "0x";
            const operation = 0;
            const safeTxGas = BigInt(0);
            const baseGas = BigInt(0);
            const gasPrice = BigInt(0);
            const gasToken = zeroAddress;
            const refundReceiver = zeroAddress;
            const nonce = await publicClient.readContract({
                address: lightAccountProxy,
                abi: SafeAbi,
                functionName: 'nonce',
            });

            const txHash = await publicClient.readContract({
                address: lightAccountProxy,
                abi: SafeAbi,
                functionName: 'encodeTransactionData',
                args: [to, value, data, operation, safeTxGas, baseGas, gasPrice, gasToken, refundReceiver, nonce]
            });

            const hash = keccak256(txHash);

            const wallet = new ethers.Wallet(PRIVATE_KEY);
            const signingKey = new ethers.SigningKey(wallet.privateKey);
            const signature = signingKey.sign(hash);

            const r = ethers.zeroPadBytes(ethers.hexlify(signature.r), 32);
            const s = ethers.zeroPadBytes(ethers.hexlify(signature.s), 32);
            const v = signature.v;
            const packedSignature = ethers.solidityPacked(['bytes32', 'bytes32', 'uint8'], [r, s, v]) as `0x{string}`;

            const txH = await walletClient.writeContract({
                address: lightAccountProxy,
                abi: SafeAbi,
                functionName: 'execTransaction',
                args: [to, value, data, operation, safeTxGas, baseGas, gasPrice, gasToken, refundReceiver, packedSignature]
            });
            console.log(txH);
        } catch (error) {
            console.error("An error occurred during the transaction execution:", error);
        }

    };

    return (
        <>
            <h1>Light Account Implementation Setup</h1>
            <button onClick={setup} disabled={isSettingUp}>
                {isSettingUp ? 'Setting up...' : 'Setup Light Account'}
            </button>

            <button onClick={execTransaction} disabled={isExecutingTransaction}>
                {isExecutingTransaction ? 'Executing...' : 'Execute Transaction'}
            </button>
        </>
    );
}
