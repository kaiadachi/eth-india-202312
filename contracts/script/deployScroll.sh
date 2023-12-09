#!/bin/sh

forge script ./script/DeploySafe.s.sol \
--chain-id 534351 \
--rpc-url https://sepolia-rpc.scroll.io \
--verifier-url https://api-sepolia.scrollscan.com/api \
--etherscan-api-key NV1HF963VT55EMDUNS8YSQVSTR5BCT93JT \
--broadcast \
--verify \
