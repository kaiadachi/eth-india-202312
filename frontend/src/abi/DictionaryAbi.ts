export const DictionaryAbi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "_admin",
                type: "address"
            }
        ],
        stateMutability: "nonpayable",
        type: "constructor"
    },
    {
        inputs: [
            {
                internalType: "bytes4",
                name: "functionSelector",
                type: "bytes4"
            }
        ],
        name: "ImplementationNotFound",
        type: "error"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "sender",
                type: "address"
            }
        ],
        name: "InvalidAccess",
        type: "error"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "implementation",
                type: "address"
            }
        ],
        name: "InvalidImplementation",
        type: "error"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "previousAdmin",
                type: "address"
            },
            {
                indexed: false,
                internalType: "address",
                name: "newAdmin",
                type: "address"
            }
        ],
        name: "AdminChanged",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes4",
                name: "functionSelector",
                type: "bytes4"
            },
            {
                indexed: true,
                internalType: "address",
                name: "implementation",
                type: "address"
            }
        ],
        name: "ImplementationUpgraded",
        type: "event"
    },
    {
        inputs: [
            {
                internalType: "bytes4",
                name: "functionSelector",
                type: "bytes4"
            }
        ],
        name: "getImplementation",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "bytes4",
                name: "functionSelector",
                type: "bytes4"
            },
            {
                internalType: "address",
                name: "implementation",
                type: "address"
            }
        ],
        name: "setImplementation",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "bytes4",
                name: "interfaceId",
                type: "bytes4"
            }
        ],
        name: "supportsInterface",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "supportsInterfaces",
        outputs: [
            {
                internalType: "bytes4[]",
                name: "",
                type: "bytes4[]"
            }
        ],
        stateMutability: "view",
        type: "function"
    }
] as const
