// SPDX-License-Identifier: UNLICENSED
// Sahcoin ICO

// Version of compiler
pragma solidity ^0.8.13;

contract sahcoins_ico {
    // Maximum number of Sahcoins available for sale
    uint public max_sahcoins = 1000000;

    // USD to Sahcoins conversion rate
    uint public usd_to_sahcoins = 1000;

    // Total number of Sahcoins bought by the investors
    uint public total_sahcoins_bought = 0;

    // Mapping from the investor address to its equity in Sahcoins and USD
    mapping(address => uint) equity_sahcoins;
    mapping(address => uint) equity_usd;

    // Checking if an investory can buy Sahcoins
    modifier can_buy_sahcoins(uint usd_invested) {
        require(usd_invested * usd_to_sahcoins + total_sahcoins_bought < max_sahcoins);
        _;
    }

    // Getting the equity in Sahcoins of an investor
    function equity_in_sahcoins(address investor) external view returns(uint) {
        return equity_sahcoins[investor];
    }

    // Getting the equity in USD of an investor
    function equity_in_usd(address investor) external view returns(uint) {
        return equity_usd[investor];
    }

    // Buying Sahcoins
    function buy_sahcoins(address investor, uint usd_invested) external
    can_buy_sahcoins(usd_invested) {
        uint sahcoins_bought = usd_invested * usd_to_sahcoins;
        equity_sahcoins[investor] += sahcoins_bought;
        equity_usd[investor] = equity_sahcoins[investor] / 1000;
        total_sahcoins_bought += sahcoins_bought;
    }

    // Selling Sahcoins
    function sell_sahcoins(address investor, uint sahcoins_sold) external {
        equity_sahcoins[investor] -= sahcoins_sold;
        equity_usd[investor] = equity_sahcoins[investor] / 1000;
        total_sahcoins_bought -= sahcoins_sold;
    }
}