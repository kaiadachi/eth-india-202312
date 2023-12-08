// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import {Test, console2} from "forge-std/Test.sol";
import {Dictionary} from "../src/Dictionary.sol";
import {IDictionary} from "../src/IDictionary.sol";
import {ERC7546Proxy} from "../src/ERC7546Proxy.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import {LightAccount} from "@light-account/src/LightAccount.sol";
import {BaseAccount} from "@light-account/lib/account-abstraction/contracts/core/BaseAccount.sol";
import {IEntryPoint} from "@light-account/lib/account-abstraction/contracts/interfaces/IEntryPoint.sol";
import {UserOperation} from "@light-account/lib/account-abstraction/contracts/interfaces/UserOperation.sol";
import {EntryPoint} from "@light-account/lib/account-abstraction/contracts/core/EntryPoint.sol";

contract ERC7546AA is Test{
    using Strings for uint256;

    uint256 private constant CHAIN_ID = 534351;
    uint256 private signKey;
    address private admin;
    address private receiver;
    address private beneficiary;
    address private erc7546Proxy;
    address private entrypoint;
    address private dictionary;
    address private lightAccount;

    function setUp() public {
        vm.createSelectFork(vm.envString("SCROLL_RPC_URL"));
        entrypoint = address(new EntryPoint());
        receiver = vm.addr(1);
        beneficiary = address(0x7F0Fa0BAB21c6749F12116aA8CBAB7bBaE8f50F2);

        signKey = uint256(vm.envBytes32("PRIVATE_KEY"));
        admin = vm.addr(signKey);

        dictionary = address(new Dictionary(admin));
        erc7546Proxy = address(new ERC7546Proxy(address(dictionary), ""));
        lightAccount = address(new LightAccount(IEntryPoint(entrypoint)));
        vm.deal(erc7546Proxy, 10 ether);

        vm.startPrank(admin);
        // valudateUserOp
        IDictionary(dictionary).setImplementation(0x3a871cdd, lightAccount);
        // execute
        IDictionary(dictionary).setImplementation(0xb61d27f6, lightAccount);
        IDictionary(dictionary).setImplementation(bytes4(keccak256("initialize(address)")), lightAccount);

        erc7546Proxy.call(
            abi.encodeWithSignature("initialize(address)", admin)
        );

        vm.stopPrank();
    }

    function test_Success_UCAA() public {
        uint256 value = 10;
        bytes memory encodedCallData = encodeCallData(receiver, value, "");

        UserOperation memory userOp = buildUserOperation(erc7546Proxy, encodedCallData);
        bytes memory encodedUserOp = packUserOperation(userOp);

        bytes32 hash = keccak256(concat(createPrefix(), createMessage(encodedUserOp, entrypoint)));

        (uint8 v, bytes32 r, bytes32 s) = vm.sign(signKey, hash);

        userOp.signature = abi.encodePacked(r, s, v);
        UserOperation[] memory userOps = new UserOperation[](1);
        userOps[0] = userOp;

        uint256 beforeReceiverBalance = receiver.balance;
        uint256 beforeLightAccountBalance = erc7546Proxy.balance;
        IEntryPoint(entrypoint).handleOps(userOps, payable(address(beneficiary)));
        uint256 afterReceiverBalance = receiver.balance;
        uint256 afterLightAccountBalance = erc7546Proxy.balance;
        assertEq(afterReceiverBalance - beforeReceiverBalance, value);
        assertGe(beforeLightAccountBalance - afterLightAccountBalance, value);
    }

    function encodeCallData(address target, uint256 value, bytes memory data) private pure returns (bytes memory){
        // LightAccount: Execute
        bytes4 executeSig = 0xb61d27f6;
        return abi.encodePacked(executeSig, abi.encode(target, value, data));
    }

    function buildUserOperation(address sender, bytes memory callData) private pure returns (UserOperation memory) {
        return UserOperation({
            sender: sender,
            nonce: 0,
            initCode: "",
            callData: callData,
            callGasLimit: 82694,
            verificationGasLimit: 204800,
            preVerificationGas: 51768,
            maxFeePerGas: 473516112,
            maxPriorityFeePerGas: 473516112,
            paymasterAndData: "",
            signature: "0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c"
        });
    }

    function packUserOperation(UserOperation memory userOp) private pure returns (bytes memory) {
        return abi.encode(
            userOp.sender,
            userOp.nonce,
            keccak256(userOp.initCode),
            keccak256(userOp.callData),
            userOp.callGasLimit,
            userOp.verificationGasLimit,
            userOp.preVerificationGas,
            userOp.maxFeePerGas,
            userOp.maxPriorityFeePerGas,
            keccak256(userOp.paymasterAndData)
        );
    }

    function createMessage(bytes memory encoded, address to) private pure returns (uint8[] memory) {
        bytes32 message = keccak256(abi.encode(keccak256(encoded), to, CHAIN_ID));
        uint8[] memory messageBytes = new uint8[](32);

        for (uint i = 0; i < 32; i++) {
            messageBytes[i] = uint8(message[i]);
        }
        return messageBytes;
    }

    function createPrefix() private pure returns (uint8[] memory) {
        bytes memory prefix = bytes("\x19Ethereum Signed Message:\n32");
        uint length = prefix.length;

        uint8[] memory prefixBytes = new uint8[](length);
        for (uint i = 0; i < length; i++) {
            prefixBytes[i] = uint8(uint256(uint8(prefix[i])));
        }

        return prefixBytes;
    }

    function concat(uint8[] memory first, uint8[] memory second) private pure returns (bytes memory) {
        uint totalLength = first.length + second.length;
        bytes memory combined = new bytes(totalLength);
        uint k = 0;

        for (uint i = 0; i < first.length; i++) {
            combined[k++] = bytes1(first[i]);
        }

        for (uint i = 0; i < second.length; i++) {
            combined[k++] = bytes1(second[i]);
        }
        return combined;
    }
}
