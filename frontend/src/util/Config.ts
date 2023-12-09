import {
    Address, createPublicClient,
    createWalletClient,
    Hex, http
} from 'viem';
import {privateKeyToAccount} from 'viem/accounts';
import {goerli} from 'viem/chains';

export const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY! as Hex;
export const account = privateKeyToAccount(PRIVATE_KEY);
export const zeroAddress = "0x0000000000000000000000000000000000000000" as Address;
export const walletClient = createWalletClient({
    account: account,
    chain: goerli,
    transport: http()
});
export const publicClient = createPublicClient({
    chain: goerli,
    transport: http()
});
export const lightAccountProxy = "0x6b4B94617D319f818486f2EdDDbBF4EF58365063";
export const lightAccountImpl = "0xf80c1D36a5A9621f883940A13fCFCe1d6336580A";
export const entryPoint = "0xB31499445F1cC556a66cdeeF2fd56766D03abA00";
export const dictionary = "0x62942ee2d58C6f949296C962F0dd664A63A704Ee";
export const safeImpl = "0x3E5c63644E683549055b9Be8653de26E0B4CD36E";
export const receiver = "0x0B6BF3448904D010Daf5be72885561B50604CE55";
