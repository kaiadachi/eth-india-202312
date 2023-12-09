import React, {useState} from 'react';
import {Address} from 'viem';
import {DictionaryAbi} from '../abi/DictionaryAbi';
import {walletClient, dictionary, lightAccountImpl, safeImpl, publicClient} from '../util/Config';

export default function SetImpl() {
    const [functionSelector, setFunctionSelector] = useState('');
    const [targetImpl, setTargetImpl] = useState('');
    const [supportedInterfaces, setSupportedInterfaces] = useState([]);
    const [functionSelectorToDelete, setFunctionSelectorToDelete] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    // supportsInterfacesを独立した関数として定義
    const fetchSupportedInterfaces = async () => {
        const data = await publicClient.readContract({
            address: dictionary,
            abi: DictionaryAbi,
            functionName: 'supportsInterfaces',
        });
        // @ts-ignore
        setSupportedInterfaces([...data]);
    };


    const setImpl = async () => {
        setIsUpdating(true);
        try {
            await walletClient.writeContract({
                address: dictionary,
                abi: DictionaryAbi,
                functionName: 'setImplementation',
                args: [functionSelector as `0x{string}`, targetImpl as Address]
            });
            await fetchSupportedInterfaces(); // supportsInterfacesを呼び出して一覧を更新
        } catch (error) {
            console.error("An error occurred during the setup process:", error);
        }
        setIsUpdating(false);
    };
    const deleteImpl = async () => {
        setIsUpdating(true);
        try {
            await walletClient.writeContract({
                address: dictionary,
                abi: DictionaryAbi,
                functionName: 'deleteImplementation',
                args: [functionSelectorToDelete as `0x{string}`]
            });
            await fetchSupportedInterfaces();
        } catch (error) {
            console.error("An error occurred during the delete process:", error);
        }
        setIsUpdating(false);
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
                <button onClick={setImpl} disabled={isUpdating}>
                    {isUpdating ? 'Processing...' : 'Setup Implementation'}
                </button>
            </div>


            <h2>Delete Implementation</h2>
            <div>
                <label>Function Selector to Delete:</label>
                <input
                    type="text"
                    value={functionSelectorToDelete}
                    onChange={(e) => setFunctionSelectorToDelete(e.target.value)}
                />
            </div>
            <button onClick={deleteImpl} disabled={isUpdating}>
                {isUpdating ? 'Processing...' : 'Delete Implementation'}
            </button>

            {supportedInterfaces.length > 0 && (
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
                <li>bytes4 setup: 0xb63e800d</li>
                <li>bytes4 nonce: 0xaffed0e0</li>
                <li>bytes4 execTransaction: 0x6a761202</li>
                <li>bytes4 encodeTransactionData: 0xe86637db</li>
            </ul>
        </>
    );
}
