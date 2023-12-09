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
export const lightAccountImpl = "0x5467b1947F47d0646704EB801E075e72aeAe8113";
export const entryPoint = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
export const dictionary = "0x62942ee2d58C6f949296C962F0dd664A63A704Ee";
export const safeImpl = "0x3E5c63644E683549055b9Be8653de26E0B4CD36E";
export const receiver = "0x0B6BF3448904D010Daf5be72885561B50604CE55";
