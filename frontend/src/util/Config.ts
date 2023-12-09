import {
    Address, createPublicClient,
    createWalletClient,
    Hex, http
} from 'viem';
import {privateKeyToAccount} from 'viem/accounts';
import {scrollSepolia} from 'viem/chains';

export const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY! as Hex;
export const account = privateKeyToAccount(PRIVATE_KEY);
export const zeroAddress = "0x0000000000000000000000000000000000000000" as Address;
export const walletClient = createWalletClient({
    account: account,
    chain: scrollSepolia,
    transport: http()
});
export const publicClient = createPublicClient({
    chain: scrollSepolia,
    transport: http()
});
