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
export const lightAccountProxy = "0x507CB02E406F582026B017a98db6EBEAE022eB89";
export const lightAccountImpl = "0xf80c1D36a5A9621f883940A13fCFCe1d6336580A";
export const entryPoint = "0xB31499445F1cC556a66cdeeF2fd56766D03abA00";
export const dictionary = "0xDEF2B64CDE5005926ED0B545A59D85BA0D4218aF";
export const safeImpl = "0x3CBA306E0e91f5d2FB5690Dd44ac3c363FB50582";
export const receiver = "0x4eE2BCf2354a07fe81c532738C4B4139E291E6b9";
