#!/bin/sh

source .env

forge script ./script/DeployDict.s.sol \
--chain-id 534351 \
--rpc-url https://sepolia-rpc.scroll.io \
--verifier-url https://api-sepolia.scrollscan.com/api \
--etherscan-api-key $SCROLL_API_KEY \
--broadcast \
--verify \
