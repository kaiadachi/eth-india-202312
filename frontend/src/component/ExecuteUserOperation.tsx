import React, {useState} from 'react';
import SendUserOperation from '../util/SendUserOperation';
import {Address, Hex} from 'viem';

export default function ExecuteUserOperation() {
    const [target, setTarget] = useState('');
    const [data, setData] = useState('');
    const [value, setValue] = useState(0);
    const [execute, setExecute] = useState(false);
    const [contractResult, setContractResult] = useState('');

    const handleResult = (result: string) => {
        setContractResult(result);
        setExecute(false);
    };
    const handleSubmit = () => {
        setExecute(true);
        setContractResult('');
    };

    return (
        <>
            <h1>Account Abstraction</h1>
            <div>
                <h2>Send UserOperation</h2>
                <label>
                    Target Address:
                    <input
                        type="text"
                        placeholder="Target Address"
                        value={target}
                        onChange={(e) => setTarget(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Data:
                    <input
                        type="text"
                        placeholder="Data"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Value:
                    <input
                        type="number"
                        placeholder="Value"
                        value={value}
                        onChange={(e) => setValue(e.target.valueAsNumber)}
                    />
                </label>
            </div>
            <button onClick={handleSubmit}>実行</button>
            {execute &&
                <SendUserOperation
                    target={target as Address}
                    data={data as Hex}
                    value={BigInt(value)}
                    onResult={handleResult}
                />
            }
            {contractResult && <div>実行結果: {contractResult}</div>}
        </>
    );
}
