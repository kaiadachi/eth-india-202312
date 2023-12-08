// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import {Test, console2} from "forge-std/Test.sol";
import {Dictionary} from "../src/Dictionary.sol";
import {IDictionary} from "../src/IDictionary.sol";
import {Impl1} from "../src/Impl1.sol";
import {Impl2} from "../src/Impl2.sol";
import {ERC7546Proxy} from "../src/ERC7546Proxy.sol";


contract ERC7546Test is Test {
    event ImplementationUpgraded(bytes4 indexed functionSelector, address indexed implementation);

    Dictionary private dictionary;
    address private admin;
    uint private constant ADMIN_ADDRESS_KEY = 1;
    Impl1 private impl1;
    Impl2 private impl2;
    ERC7546Proxy private proxy;

    function setUp() public {
        admin = vm.addr(ADMIN_ADDRESS_KEY);
        dictionary = new Dictionary(admin);
        impl1 = new Impl1();
        impl2 = new Impl2();
        proxy = new ERC7546Proxy(address(dictionary), bytes(""));
    }

    function test_Success_Dict_SetImpl() public {
        vm.startPrank(admin);
        bytes4 functionSelector = bytes4(keccak256("plus(uint256,uint256)"));
        address impl1Addr = address(impl1);

        vm.expectEmit();
        emit ImplementationUpgraded(functionSelector, impl1Addr);

        dictionary.setImplementation(functionSelector, impl1Addr);
        vm.stopPrank();
    }

    function test_Success_Dict_getImpl() public {
        vm.startPrank(admin);
        bytes4 functionSelector = bytes4(keccak256("plus(uint256,uint256)"));
        address impl1Addr = address(impl1);
        dictionary.setImplementation(functionSelector, impl1Addr);
        address result = dictionary.getImplementation(functionSelector);

        assertEq(result, impl1Addr);
        vm.stopPrank();
    }

    function test_Success_Dict_Switch() public {
        vm.startPrank(admin);
        bytes4 plus = bytes4(keccak256("plus(uint256,uint256)"));
        bytes4 getNum = bytes4(keccak256("getNum()"));
        bytes4 minus = bytes4(keccak256("minus(uint256,uint256)"));
        bytes4 getNumMinus = bytes4(keccak256("getNumMinus()"));

        dictionary.setImplementation(plus, address(impl1));
        dictionary.setImplementation(getNum, address(impl1));
        dictionary.setImplementation(minus, address(impl2));
        dictionary.setImplementation(getNumMinus, address(impl2));

        address(proxy).call(abi.encodeWithSelector(plus, 3, 4));
        (, bytes memory plusData) = address(proxy).call(abi.encodeWithSelector(getNum));

        uint resultPlus = abi.decode(plusData, (uint));

        assertEq(resultPlus, 7);

        address(proxy).call(abi.encodeWithSelector(minus, 4, 3));
        (, bytes memory minusData) = address(proxy).call(abi.encodeWithSelector(getNumMinus));
        uint resultMinus = abi.decode(minusData, (uint));
        assertEq(resultMinus, 1);
    }
}
