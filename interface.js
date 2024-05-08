// Define the contract address and ABI
const minersAddr = '0xCC103B7Aada3645d0BbDba7012CB95AE4533097C';
const minersAbi = [[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DividendsClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawal","type":"event"},{"inputs":[],"name":"AUTOPAY_PERCENTAGE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"REFUND_PERCENTAGE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SECONDS_PER_MINUTE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"contractBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"deposits","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getUserDividends","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lastClaimedTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDeposits","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDividends","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDividendsClaimed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalEarnings","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalRefunds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalUsers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalWithdrawalFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalWithdrawals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]]; // your ABI definition

// Create a Web3 contract instance
const web3 = require('web3');
const minersContract = new web3.eth.Contract(minersAbi, minersAddr);

// Define some constants
const currentAddr = '0x...'; // your current address
const canSell = true;
const canHatch = true;

// Define functions to interact with the contract
async function contractBalance(callback) {
  try {
    const balance = await web3.eth.getBalance(minersAddr);
    callback(web3.utils.fromWei(balance));
  } catch (err) {
    console.log(err);
  }
}

async function deposit(ref, trx, callback) {
  try {
    await minersContract.methods.deposit(ref).send({ value: trx, from: currentAddr });
    callback();
  } catch (err) {
    console.log(err);
  }
}

async function claimDividends(ref, callback) {
  if (canHatch) {
    canHatch = false;
    try {
      await minersContract.methods.claimDividends(ref).send({ from: currentAddr });
      callback();
    } catch (err) {
      console.log(err);
    }
    setTimeout(() => {
      canHatch = true;
    }, 10000);
  } else {
    console.log('Cannot hatch yet...');
  }
}

async function withdraw(callback) {
  if (canSell) {
    canSell = false;
    try {
      await minersContract.methods.withdraw().send({ from: currentAddr });
      callback();
    } catch (err) {
      console.log(err);
    }
    setTimeout(() => {
      canSell = true;
    }, 10000);
  } else {
    console.log('Cannot sell yet...');
  }
}

async function calculateEggBuy(trx, contractBalance, callback) {
  try {
    const result = await minersContract.methods.calculateEggBuy(trx, contractBalance).call();
    callback(result);
  } catch (err) {
    console.log(err);
  }
}

async function calculateEggBuySimple(trx, callback) {
  try {
    const result = await minersContract.methods.calculateEggBuySimple(trx).call();
    callback(result);
  } catch (err) {
    console.log(err);
  }
}

async function calculateEggSell(eggs, callback) {
  try {
    const result = await minersContract.methods.calculateEggSell(eggs).call();
    callback(result);
  } catch (err) {
    console.log(err);
  }
}

async function claimedEggs(callback) {
  try {
    const result = await minersContract.methods.claimedEggs().call();
    callback(result);
  } catch (err) {
    console.log(err);
  }
}

async function devFee(amount, callback) {
  try {
    const result = await minersContract.methods.devFee(amount).call();
    callback(result);
  } catch (err) {
    console.log(err);
  }
}

async function getBalance(callback) {
  try {
    const result = await minersContract.methods.getBalance().call();
    callback(result);
  } catch (err) {
    console.log(err);
  }
}

async function getEggsSinceLastHatch(address, callback) {
  try {
    const result = await minersContract.methods.getEggsSinceLastHatch(address).call();
    callback(result);
  } catch (err) {
    console.log(err);
  }
}

async function getMyEggs(callback) {
  try {
    const result = await minersContract.methods.getMyEggs().call({ from: currentAddr });
    callback(result);
  } catch (err) {
    console.log(err);
  }
}

async function getMyMiners(callback) {
  try {
    const result = await minersContract.methods.getMyMiners().call({ from: currentAddr });
    if (result === '0x') {
      result = 0;
    }
    callback(result);
  } catch (err) {
    console.log(err);
  }
}

async function lastHatch(address, callback) {
  try {
    const result = await minersContract.methods.lastHatch(address).call({ from: currentAddr });
    callback(result);
  } catch (err) {
    console.log(err);
  }
}

async function marketEggs(callback) {
  try {
    const result = await minersContract.methods.marketEggs().call();
    callback(result);
  } catch (err) {
    console.log(err);
  }
}
