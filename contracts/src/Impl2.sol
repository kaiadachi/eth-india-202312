// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import {StorageSlot} from "@openzeppelin/contracts/utils/StorageSlot.sol";


contract Impl2 {
    bytes32 private constant Impl2StorageLocation = 0x9439cff3836626e86da1b2dc757e236e0a1adaa64c3c376ef5337d7e92459e00;

    function minus(uint256 a, uint256 b) public {
        StorageSlot.getUint256Slot(Impl2StorageLocation).value = a - b;
    }

    function getNumMinus() public returns (uint256){
        return StorageSlot.getUint256Slot(Impl2StorageLocation).value;
    }

}
