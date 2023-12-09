#!/bin/sh

source .env

forge verify-contract \
--chain-id 84531 \
--watch \
--num-of-optimizations 200 \
--etherscan-api-key $BASE_API_KEY \
0xB31499445F1cC556a66cdeeF2fd56766D03abA00 \
lib/light-account/lib/account-abstraction/contracts/core/EntryPoint.sol:EntryPoint
