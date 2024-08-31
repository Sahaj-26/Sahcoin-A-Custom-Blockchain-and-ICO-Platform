# Sahcoin-A-Custom-Blockchain-and-ICO-Platform

Sahcoin is a decentralized blockchain platform built using Python and Flask, designed to allow users to mine blocks, validate the blockchain, and conduct transactions securely. Additionally, Sahcoin includes a smart contract for an Initial Coin Offering (ICO) written in Solidity, enabling investors to buy and sell Sahcoins using Truffle Suite and Ganache.

## Key Features:
1) Blockchain Implementation (sahcoin.py)
  Create and validate a blockchain.
  Proof-of-Work consensus mechanism.
  Transaction handling and node communication.

2) Multi-Node Setup (sahcoin_node_5001.py, sahcoin_node_5002.py, sahcoin_node_5003.py)
  Support for decentralized network setup with multiple nodes.
  Node interaction and chain synchronization.

3) API Testing with Postman
  Interact with the blockchain implementation using Postman.
  Test various endpoints for GET and POST requests to mine blocks, add transactions, and check the blockchain state.

4) ICO Smart Contract (sahcoins_ico.sol)
  Smart contract for Sahcoin ICO.
  Equity management in both Sahcoins and USD.
  Buy and sell Sahcoins using Ethereum-based tools.

## Usage:
1) Blockchain Operations: Use the Flask-based API to mine new blocks, add transactions, and manage nodes.
2) ICO Operations: Deploy the sahcoins_ico.sol contract using Truffle and interact with it through Ganache.
3) API Testing: Use Postman to test the endpoints for blockchain operations, including '/mine_block', '/get_chain', '/is_valid', '/add_transaction', '/connect_node', and '/replace_chain'.

## Technologies Used:
* Python: Blockchain and Flask API.
* Solidity: Smart contract for ICO.
* Flask: Web application framework.
* Postman: API testing and interaction.
* Truffle Suite and Ganache: Ethereum development environment.

## Prerequisites
Install nvm
Install node v16
Install flask

## How to Run
A) Blockchain Implementation
1) _python app_name.py_
2) Interact with the blockchain using Postman

B) Smart contract for ICO
1) Install truffle
2) Install truffle suite ganache gui
3) Ensure the ganache gui is up and running
4) If you want to create your own smart contract:
   1) create a new directory
   2) run _truffle init_
   3) ensure you are using the required version of solidity
   4) run _truffle migrate_ after creating the smart contract and migrate files
5) Run node interact.js
6) You can also test the smart contract before running truffle migrate by running the test file

