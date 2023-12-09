#!/bin/sh

source .env

forge script ./script/DeploySafe.s.sol \
--chain-id 84531 \
--rpc-url https://goerli.base.org/ \
--verifier-url https://api-goerli.basescan.org/api \
--etherscan-api-key $BASE_API_KEY \
--broadcast \
--verify \
