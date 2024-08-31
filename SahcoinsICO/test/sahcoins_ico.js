const SahcoinICO = artifacts.require("sahcoins_ico");

contract("SahcoinICO", (accounts) => {
  let sahcoinICOInstance;

  beforeEach(async () => {
    sahcoinICOInstance = await SahcoinICO.new();
  });

  it("should set the correct initial values", async () => {
    const maxSahcoins = await sahcoinICOInstance.max_sahcoins();
    const usdToSahcoins = await sahcoinICOInstance.usd_to_sahcoins();
    const totalSahcoinsBought = await sahcoinICOInstance.total_sahcoins_bought();

    assert.equal(maxSahcoins, 1000000, "Max Sahcoins should be 1,000,000");
    assert.equal(usdToSahcoins, 1000, "USD to Sahcoins conversion rate should be 1,000");
    assert.equal(totalSahcoinsBought, 0, "Total Sahcoins bought should initially be 0");
  });

  it("should allow buying Sahcoins", async () => {
    const investor = accounts[1];
    const usdInvested = 100;

    await sahcoinICOInstance.buy_sahcoins(investor, usdInvested);

    const equityInSahcoins = await sahcoinICOInstance.equity_in_sahcoins(investor);
    const equityInUSD = await sahcoinICOInstance.equity_in_usd(investor);
    const totalSahcoinsBought = await sahcoinICOInstance.total_sahcoins_bought();

    assert.equal(equityInSahcoins, 100000, "Investor should have 100,000 Sahcoins");
    assert.equal(equityInUSD, 100, "Investor's equity in USD should be 100");
    assert.equal(totalSahcoinsBought, 100000, "Total Sahcoins bought should be 100,000");
  });

  it("should not allow buying more Sahcoins than available", async () => {
    const investor = accounts[1];
    const usdInvested = 1001; // This would result in 1,001,000 Sahcoins, which is more than the max

    try {
      await sahcoinICOInstance.buy_sahcoins(investor, usdInvested);
      assert.fail("The transaction should have thrown an error");
    } catch (error) {
      assert.include(error.message, "revert", "The error message should contain 'revert'");
    }
  });

  it("should allow selling Sahcoins", async () => {
    const investor = accounts[1];
    const usdInvested = 100;
    const sahcoinsToSell = 50000;

    await sahcoinICOInstance.buy_sahcoins(investor, usdInvested);
    await sahcoinICOInstance.sell_sahcoins(investor, sahcoinsToSell);

    const equityInSahcoins = await sahcoinICOInstance.equity_in_sahcoins(investor);
    const equityInUSD = await sahcoinICOInstance.equity_in_usd(investor);
    const totalSahcoinsBought = await sahcoinICOInstance.total_sahcoins_bought();

    assert.equal(equityInSahcoins, 50000, "Investor should have 50,000 Sahcoins left");
    assert.equal(equityInUSD, 50, "Investor's equity in USD should be 50");
    assert.equal(totalSahcoinsBought, 50000, "Total Sahcoins bought should be 50,000");
  });

  it("should not allow selling more Sahcoins than owned", async () => {
    const investor = accounts[1];
    const usdInvested = 100;
    const sahcoinsToSell = 150000; // More than the investor owns

    await sahcoinICOInstance.buy_sahcoins(investor, usdInvested);

    try {
      await sahcoinICOInstance.sell_sahcoins(investor, sahcoinsToSell);
      assert.fail("The transaction should have thrown an error");
    } catch (error) {
      assert.include(error.message, "revert", "The error message should contain 'revert'");
    }
  });
});