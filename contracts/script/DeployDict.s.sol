pragma solidity ^0.8.21;

import {Script, console2} from "forge-std/Script.sol";
import {Dictionary} from "../src/Dictionary.sol";
import {ERC7546Proxy} from "../src/ERC7546Proxy.sol";

contract DeployAA is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address admin = vm.addr(deployerPrivateKey);
        vm.startBroadcast(deployerPrivateKey);

        address dictionary = address(new Dictionary(admin));
        new ERC7546Proxy(dictionary, "");

        vm.stopBroadcast();
    }
}
