import React, {useState, useEffect} from 'react';
import {
    createPublicClient,
    http,
    getContract,
    GetContractReturnType,
    PublicClient,
} from 'viem';

import {Chain} from 'viem/chains';
import {EntryPointAbi} from '../abi/EntryPointAbi';
import {publicClient} from './Config';
import {entryPoint} from './BaseAddress';


import {
    toHex,
    hexToBigInt,
    parseAbi,
    encodeFunctionData,
    encodeAbiParameters,
    keccak256,
    type Address,
    type Hex,
    type Hash,
} from "viem";

export interface UserOperationStruct {
    sender: string;
    nonce: bigint;
    initCode: string | "0x";
    callData: string;
    callGasLimit: bigint;
    verificationGasLimit: bigint;
    preVerificationGas: bigint;
    maxFeePerGas: bigint;
    maxPriorityFeePerGas: bigint;
    paymasterAndData: string | "0x";
    signature: string;
}

export interface UserOperationRequest {
    sender: Address;
    nonce: Hex;
    initCode: Hex | `0x`;
    callData: Hex;
    callGasLimit: Hex;
    verificationGasLimit: Hex;
    preVerificationGas: Hex;
    maxFeePerGas: Hex;
    maxPriorityFeePerGas: Hex;
    paymasterAndData: Hex | `0x`;
    signature: Hex;
}


export const contractABI = parseAbi([
    "function getImplementation(bytes4 functionSelector) external view returns (address)",
    "function execute(address dest, uint256 value, bytes calldata func) external",
    "function getNonce(address sender, uint192 key) public view"
]);

export const encodedCallData = (target: Address, data: Hex, value: bigint): `0x${string}` => {
    return encodeFunctionData({
        abi: contractABI,
        functionName: "execute",
        args: [target, value, data]
    });
};

export const buildUserOperation = (sender: Address, callData: string, nonce: bigint): UserOperationStruct => {
    return {
        sender: sender,
        nonce: nonce,
        initCode: '',
        callData: callData,
        callGasLimit: BigInt(82694),
        verificationGasLimit: BigInt(204800),
        preVerificationGas: BigInt(51768),
        maxFeePerGas: BigInt(473516112),
        maxPriorityFeePerGas: BigInt(473516112),
        paymasterAndData: '',
        signature: toHex('0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c'),
    };
};

export const deepHexlify = (obj: any): any => {
    if (typeof obj === "function") {
        return undefined;
    }
    if (obj == null || typeof obj === "string" || typeof obj === "boolean") {
        return obj;
    } else if (typeof obj === "bigint") {
        return toHex(obj);
    } else if (obj._isBigNumber != null || typeof obj !== "object") {
        return toHex(obj).replace(/^0x0/, "0x");
    }
    if (Array.isArray(obj)) {
        return obj.map((member) => deepHexlify(member));
    }
    return Object.keys(obj).reduce(
        (set, key) => ({
            ...set,
            [key]: deepHexlify(obj[key]),
        }),
        {}
    );
}

export const packUo = (uo: UserOperationRequest): Hex => {
    const hashedInitCode = keccak256(uo.initCode);
    const hashedCallData = keccak256(uo.callData);
    const hashedPaymasterAndData = keccak256(uo.paymasterAndData);

    return encodeAbiParameters(
        [
            {type: "address"},
            {type: "uint256"},
            {type: "bytes32"},
            {type: "bytes32"},
            {type: "uint256"},
            {type: "uint256"},
            {type: "uint256"},
            {type: "uint256"},
            {type: "uint256"},
            {type: "bytes32"},
        ],
        [
            uo.sender as Address,
            hexToBigInt(uo.nonce),
            hashedInitCode,
            hashedCallData,
            hexToBigInt(uo.callGasLimit),
            hexToBigInt(uo.verificationGasLimit),
            hexToBigInt(uo.preVerificationGas),
            hexToBigInt(uo.maxFeePerGas),
            hexToBigInt(uo.maxPriorityFeePerGas),
            hashedPaymasterAndData,
        ]
    );
}

export const entryPointContract = (): GetContractReturnType<
    typeof EntryPointAbi,
    PublicClient,
    Chain
> => {
    return getContract({
        address: entryPoint,
        abi: EntryPointAbi,
        publicClient: publicClient
    });
}

export const getUserOperationHash = (
    request: UserOperationRequest,
    entryPointAddress: Address,
    chainId: bigint
): Hash => {
    const encoded = encodeAbiParameters(
        [{type: "bytes32"}, {type: "address"}, {type: "uint256"}],
        [keccak256(packUo(request)), entryPointAddress, chainId]
    ) as `0x${string}`;

    return keccak256(encoded);
}
