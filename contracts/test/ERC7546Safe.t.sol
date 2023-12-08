// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import {Test, console2} from "forge-std/Test.sol";
import {Dictionary} from "../src/Dictionary.sol";
import {IDictionary} from "../src/IDictionary.sol";
import {ERC7546Proxy} from "../src/ERC7546Proxy.sol";
import {Safe} from "@safe/contracts/Safe.sol";
import {Enum} from "@safe/contracts/common/Enum.sol";

contract ERC7546Safe is Test {
    uint256 private signKey;
    address private admin;
    address private receiver;

    address private dictionary;
    address private erc7546Proxy;

    address private safe;


    function setUp() public {
        signKey = uint256(vm.envBytes32("PRIVATE_KEY"));
        admin = vm.addr(signKey);
        receiver = vm.addr(1);

        dictionary = address(new Dictionary(admin));
        erc7546Proxy = address(new ERC7546Proxy(address(dictionary), bytes("")));
        vm.deal(erc7546Proxy, 10 ether);
        safe = address(new Safe());
    }

    function test_Success_UCSafe() public {
        vm.startPrank(admin);
        // set impl
        bytes4 setup = Safe.setup.selector;
        bytes4 execTransaction = Safe.execTransaction.selector;
        bytes4 encodeTransactionData = Safe.encodeTransactionData.selector;

        IDictionary(dictionary).setImplementation(setup, safe);
        IDictionary(dictionary).setImplementation(execTransaction, safe);
        IDictionary(dictionary).setImplementation(encodeTransactionData, safe);
        IDictionary(dictionary).setImplementation(bytes4(keccak256("nonce()")), safe);

        vm.stopPrank();

        // exec safe
        address[] memory owners = new address[](1);
        owners[0] = admin;
        Safe(payable(erc7546Proxy)).setup(owners, 1, address(0), "", address(0), address(0), 0, payable(address((0))));

        uint nonce = Safe(payable(erc7546Proxy)).nonce();
        uint value = 10;
        bytes memory txHashData = Safe(payable(erc7546Proxy)).encodeTransactionData(
            receiver,
            value,
            "",
            Enum.Operation.Call,
            0,
            0,
            0,
            address(0),
            payable(address(0)),
            nonce
        );


        bytes32 hash = keccak256(txHashData);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(signKey, hash);

        bytes memory signature = abi.encodePacked(r, s, v);

        uint beforeBalance = erc7546Proxy.balance;
        Safe(payable(erc7546Proxy)).execTransaction({
            to: receiver,
            value: value,
            data: "",
            operation: Enum.Operation.Call,
            safeTxGas: 0,
            baseGas: 0,
            gasPrice: 0,
            gasToken: address(0),
            refundReceiver: payable(address(0)),
            signatures: signature
        });
        uint afterBalance = erc7546Proxy.balance;

        assertEq(beforeBalance - afterBalance, value);
    }

}
