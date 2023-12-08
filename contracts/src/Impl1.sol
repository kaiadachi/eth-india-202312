// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import {StorageSlot} from "@openzeppelin/contracts/utils/StorageSlot.sol";
import {Test, console2} from "forge-std/Test.sol";


contract Impl1 {
    /// @dev keccak256("plus(uint256,uint256)");
    bytes32 private constant Impl1StorageLocation = 0x7edda7a277cffa926a0dc53b32394fe7a9ef1a7c798cc46b0623098dfaf8a400;

    function plus(uint256 a, uint256 b) public {
        StorageSlot.getUint256Slot(Impl1StorageLocation).value = a + b;
    }

    function getNum() public returns (uint256){
        return StorageSlot.getUint256Slot(Impl1StorageLocation).value;
    }

}
