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
export const erc7546Proxy = "0xaf315DC151C408507b65C9770FAe592a6e058f0b";
export const lightAccountImpl = "0xf80c1D36a5A9621f883940A13fCFCe1d6336580A";
export const entryPoint = "0xB31499445F1cC556a66cdeeF2fd56766D03abA00";
export const dictionary = "0x0bf881344233667a4D580b786d489b703Aa5909D";
export const safeImpl = "0x3CBA306E0e91f5d2FB5690Dd44ac3c363FB50582";
export const receiver = "0x4eE2BCf2354a07fe81c532738C4B4139E291E6b9";
