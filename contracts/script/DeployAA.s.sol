pragma solidity ^0.8.21;

import {Script, console2} from "forge-std/Script.sol";
import {EntryPoint} from "@light-account/lib/account-abstraction/contracts/core/EntryPoint.sol";
import {IEntryPoint} from "@light-account/lib/account-abstraction/contracts/interfaces/IEntryPoint.sol";
import {LightAccount} from "@light-account/src/LightAccount.sol";

contract DeployAA is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        address entrypoint = address(new EntryPoint());
        new LightAccount(IEntryPoint(entrypoint));

        vm.stopBroadcast();
    }
}
