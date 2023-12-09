pragma solidity ^0.8.21;

import {Script, console2} from "forge-std/Script.sol";

import {Safe} from "@safe/contracts/Safe.sol";

contract DeployAA is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        new Safe();

        vm.stopBroadcast();
    }
}
