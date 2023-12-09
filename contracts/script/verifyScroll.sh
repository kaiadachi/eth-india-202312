#!/bin/sh

source .env

forge verify-contract \
--chain-id 534351 \
--watch \
--num-of-optimizations 200 \
--constructor-args $(cast abi-encode "constructor(address)" 0xB31499445F1cC556a66cdeeF2fd56766D03abA00) \
--etherscan-api-key $SCROLL_API_KEY \
0xf80c1D36a5A9621f883940A13fCFCe1d6336580A \
