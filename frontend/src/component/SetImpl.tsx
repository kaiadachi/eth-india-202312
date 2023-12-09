import React, {useState, useEffect} from 'react';
import {Address, createPublicClient, createWalletClient, http} from 'viem';
import {DictionaryAbi} from '../abi/DictionaryAbi';
import {walletClient, dictionary, lightAccountImpl, safeImpl, publicClient} from '../util/Config';
import {goerli} from "viem/chains";

export default function SetImpl() {
    const [functionSelector, setFunctionSelector] = useState('');
    const [targetImpl, setTargetImpl] = useState('');
    const [supportedInterfaces, setSupportedInterfaces] = useState([]);
    const [showSupportedInterfaces, setShowSupportedInterfaces] = useState(false);

    const setImpl = async () => {
        // 実行するたびに新しいトランザクションを発行
        const writeTxResponse = await walletClient.writeContract({
            address: dictionary,
            abi: DictionaryAbi,
            functionName: 'setImplementation',
            args: [functionSelector as `0x{string}`, targetImpl as Address]
        });


        const data = await publicClient.readContract({
            address: dictionary,
            abi: DictionaryAbi,
            functionName: 'supportsInterfaces',
        });

        // @ts-ignore
        setSupportedInterfaces([...data]);
        setShowSupportedInterfaces(true);
    };

    return (
        <>
            <h1>Dictionary</h1>
            <h2>Set Implementation</h2>
            <div>
                <div>
                    <label>Function Selector:</label>
                    <input
                        type="text"
                        value={functionSelector}
                        onChange={(e) => setFunctionSelector(e.target.value)}
                    />
                </div>
                <div>
                    <label>Target Implementation (Address):</label>
                    <input
                        type="text"
                        value={targetImpl}
                        onChange={(e) => setTargetImpl(e.target.value)}
                    />
                </div>
                <button onClick={setImpl}>Execute</button>
            </div>
            {showSupportedInterfaces && ( // 読み取りが完了したら表示
                <div>
                    <h2>Supported Interfaces:</h2>
                    <ul>
                        {supportedInterfaces.map((interfaceName, index) => (
                            <li key={index}>{interfaceName}</li>
                        ))}
                    </ul>
                </div>
            )}
            <br/>
            <h2>Memo</h2>
            <h3>AccountAbstraction</h3>
            <ul>
                <li>address LightAccountImpl: {lightAccountImpl}</li>
                <li>bytes4 initialize: 0xc4d66de8</li>
                <li>bytes4 valudateUserOp: 0x3a871cdd</li>
                <li>bytes4 execute: 0xb61d27f6</li>
            </ul>

            <h3>Multisig</h3>
            <ul>
                <li>address SafeImpl: {safeImpl}</li>
                <li>bytes4 setUp: 0xb63e800d</li>
                <li>bytes4 nonce: 0xaffed0e0</li>
                <li>bytes4 execTransaction: 0x6a761202</li>
                <li>bytes4 encodeTransactionData: 0xe86637db</li>
            </ul>
        </>
    );
}
