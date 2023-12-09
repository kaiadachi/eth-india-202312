import Link from 'next/link';
export default function Home() {
    return (
        <div>
            <h1>Multi Tenant Account Demo</h1>
            <div>Multi Tenant account is innovative contract wallet that is freely upgradeable without deployment. Even if
                a later, good contract wallet is developed by others, you can easily incorporate any contract wallet
                implementation.</div>
            <p>Naturally, LightAccount(AccountAbstraction) can be made Safe(Multisig) and Safe can be made LightAccount.
                This demo incorporates SafeImpl and LightAccountImpl to create a contract wallet that works as
                AccountAbstraction <strong>and</strong> Multisig.</p>
            <ul>
                <li>
                    <span>Create ERC-7546 Proxy(<a href="https://github.com/ethereum/ERCs/blob/9d1e9da45bf21212dc7de63483da967b96fadd7e/ERCS/erc-7546.md">What is ERC-7546?</a>)</span><br/>
                    <Link href="/proxy">Proxy</Link><br/>
                </li>
                <li>
                    <span>Set Implementation to Dictionary</span><br/>
                    <Link href="/dictionary">Dictionary</Link>
                </li>
                <li>
                    <span>Send UserOperation</span><br/>
                    <Link href="/account-abstraction">Account Abstraction</Link>
                </li>
                <li>
                    <span>ExecTransaction</span><br/>
                    <Link href="/safe">Multisig</Link>
                </li>
            </ul>
        </div>
    );
}
