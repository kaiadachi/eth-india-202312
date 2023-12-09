import React, {useState} from 'react';

import {account, walletClient} from "@/util/Config";
import {erc7546Proxy} from "@/util/ScrollAddress";
import {LightAccountAbi} from "@/abi/LightAccountAbi";

export default function LightAccountInitalize() {
    const [status, setStatus] = useState('');

    const initialize = async () => {
        try {
            await walletClient.writeContract({
                address: erc7546Proxy,
                abi: LightAccountAbi,
                functionName: 'initialize',
                args: [account.address]
            });
            setStatus("initialized"); // Set status to initialized on success
        } catch (error) {
            console.error("An error occurred during the setup process:", error);
            setStatus("initialization failed"); // Set a different status on failure
        }
    };

    return (
        <div>
            <button onClick={initialize}>initialize light account</button>
            {status && <p>Status: {status}</p>}
        </div>
    );
}
