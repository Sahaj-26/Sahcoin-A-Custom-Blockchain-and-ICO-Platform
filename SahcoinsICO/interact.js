// interact.js

const Web3 = require('web3');
const contractData = require('./build/contracts/sahcoins_ico.json'); // Adjust the path if necessary

// Connect to the local Ethereum node
const web3 = new Web3('http://localhost:7545'); // Replace with your Ganache URL if different

// Get the ABI and contract address from the contract data
const contractABI = contractData.abi;
const contractAddress = contractData.networks['5777'].address; // 5777 is the default network ID for Ganache

// Create a contract instance
const sahcoinContract = new web3.eth.Contract(contractABI, contractAddress);

// Function to get the equity in Sahcoins of an investor
async function getEquityInSahcoins(investorAddress) {
    const equity = await sahcoinContract.methods.equity_in_sahcoins(investorAddress).call();
    console.log(`Equity in Sahcoins: ${equity}`);
}

// Function to get the equity in USD of an investor
async function getEquityInUSD(investorAddress) {
    const equity = await sahcoinContract.methods.equity_in_usd(investorAddress).call();
    console.log(`Equity in USD: ${equity}`);
}

// Function to buy Sahcoins
async function buySahcoins(investorAddress, usdInvested) {
    const accounts = await web3.eth.getAccounts();
    await sahcoinContract.methods.buy_sahcoins(investorAddress, usdInvested).send({ from: accounts[2] });
    console.log(`Bought Sahcoins for ${usdInvested} USD`);
}

// Function to sell Sahcoins
async function sellSahcoins(investorAddress, sahcoinsSold) {
    const accounts = await web3.eth.getAccounts();
    await sahcoinContract.methods.sell_sahcoins(investorAddress, sahcoinsSold).send({ from: accounts[2] });
    console.log(`Sold ${sahcoinsSold} Sahcoins`);
}

// Example usage
async function main() {
    const investor = '0x31EbE838B7B1351fc7F720d7aca238AE8fAC97c8';

    // Get equity
    await getEquityInSahcoins(investor);
    await getEquityInUSD(investor);

    // Buy Sahcoins
    await buySahcoins(investor, 10); // Buy Sahcoins with 10 USD

    // Sell Sahcoins
    await sellSahcoins(investor, 1000); // Sell 1000 Sahcoins

    // Get updated equity
    await getEquityInSahcoins(investor);
    await getEquityInUSD(investor);
}

main();
