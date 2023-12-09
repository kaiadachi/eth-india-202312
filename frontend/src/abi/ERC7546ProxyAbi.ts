export const ERC7546ProxyAbi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "dictionary",
                type: "address"
            },
            {
                internalType: "bytes",
                name: "_data",
                type: "bytes"
            }
        ],
        stateMutability: "payable",
        type: "constructor"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "target",
                type: "address"
            }
        ],
        name: "AddressEmptyCode",
        type: "error"
    },
    {
        inputs: [],
        name: "ERC1967NonPayable",
        type: "error"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "dictionary",
                type: "address"
            }
        ],
        name: "ERC7546InvalidDictionary",
        type: "error"
    },
    {
        inputs: [],
        name: "FailedInnerCall",
        type: "error"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "dictionary",
                type: "address"
            }
        ],
        name: "DictionaryUpgraded",
        type: "event"
    },
    {
        stateMutability: "payable",
        type: "fallback"
    },
    {
        stateMutability: "payable",
        type: "receive"
    }
] as const;
