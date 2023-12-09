import React, {useState} from 'react';
import {ERC7546ProxyAbi} from '../abi/ERC7546ProxyAbi';
import {walletClient} from '../util/Config'
import {dictionary} from '../util/ScrollAddress'

export default function CreateERC7546Proxy() {
    const [deployHash, setDeployHash] = useState('');
    const [isDeploying, setIsDeploying] = useState(false);
    const [error, setError] = useState('');

    const handleDeployClick = async () => {
        setIsDeploying(true);
        try {
            // @ts-ignore
            const hash = await walletClient.deployContract({
                abi: ERC7546ProxyAbi,
                args: [dictionary, "0x"],
                bytecode: "0x6080604052604051610599380380610599833981016040819052610022916102fd565b61002c8282610033565b505061042b565b61003c8261010b565b6040516001600160a01b038316907fa657f2ad315cf3bb35cf1964158da75c3f334481df05a4a1644b2376b17a59b290600090a28051156100ff576100fa6001600160a01b03831663dc9cc645610092846103bd565b6040516001600160e01b031960e084901b81168252919091166004820152602401602060405180830381865afa1580156100d0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906100f491906103f4565b82610187565b505050565b6101076101fe565b5050565b806001600160a01b03163b6000036101465760405163ecc44bf360e01b81526001600160a01b03821660048201526024015b60405180910390fd5b7f9717cc4ad21cea1e4bb2dbe5bf433000ecfa3ebe067079ba42add6d1ca82a2e280546001600160a01b0319166001600160a01b0392909216919091179055565b6060600080846001600160a01b0316846040516101a4919061040f565b600060405180830381855af49150503d80600081146101df576040519150601f19603f3d011682016040523d82523d6000602084013e6101e4565b606091505b5090925090506101f585838361021f565b95945050505050565b341561021d5760405163b398979f60e01b815260040160405180910390fd5b565b6060826102345761022f8261027e565b610277565b815115801561024b57506001600160a01b0384163b155b1561027457604051639996b31560e01b81526001600160a01b038516600482015260240161013d565b50805b9392505050565b80511561028e5780518082602001fd5b604051630a12f52160e11b815260040160405180910390fd5b80516001600160a01b03811681146102be57600080fd5b919050565b634e487b7160e01b600052604160045260246000fd5b60005b838110156102f45781810151838201526020016102dc565b50506000910152565b6000806040838503121561031057600080fd5b610319836102a7565b60208401519092506001600160401b038082111561033657600080fd5b818501915085601f83011261034a57600080fd5b81518181111561035c5761035c6102c3565b604051601f8201601f19908116603f01168101908382118183101715610384576103846102c3565b8160405282815288602084870101111561039d57600080fd5b6103ae8360208301602088016102d9565b80955050505050509250929050565b805160208201516001600160e01b031980821692919060048310156103ec5780818460040360031b1b83161693505b505050919050565b60006020828403121561040657600080fd5b610277826102a7565b600082516104218184602087016102d9565b9190910192915050565b61015f8061043a6000396000f3fe60806040523661000b57005b610013610015565b005b610025610020610027565b6100d5565b565b600061005a7f9717cc4ad21cea1e4bb2dbe5bf433000ecfa3ebe067079ba42add6d1ca82a2e2546001600160a01b031690565b60405163dc9cc64560e01b81526001600160e01b03196000351660048201526001600160a01b03919091169063dc9cc64590602401602060405180830381865afa1580156100ac573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906100d091906100f9565b905090565b3660008037600080366000845af43d6000803e8080156100f4573d6000f35b3d6000fd5b60006020828403121561010b57600080fd5b81516001600160a01b038116811461012257600080fd5b939250505056fea264697066735822122041b5b757232137fd6efbf595082afcf0d61f6b15cff9cf512a263c25e0487ca364736f6c63430008160033000000000000000000000000def2b64cde5005926ed0b545a59d85ba0d4218af00000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000000",
            });
            setDeployHash(hash);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setIsDeploying(false);
        }
    };

    return (
        <>
            <h1>ERC7546Proxy</h1>
            <div>
                <h2>Create Proxy</h2>
                <button onClick={handleDeployClick} disabled={isDeploying}>
                    {isDeploying ? 'Deploying...' : 'Create'}
                </button>
                {deployHash && <div>Deployment Transaction Hash: {deployHash}</div>}
                {error && <div>Error: {error}</div>}
            </div>
        </>
    );
}
