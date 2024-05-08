const web3 = new Web3(new Web3.providers.HttpProvider('https://testnet.bscscan.com'));
const contractAddress = '0xCC103B7Aada3645d0BbDba7012CB95AE4533097C'; // Replace with the actual contract address
const abi = [[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DividendsClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawal","type":"event"},{"inputs":[],"name":"AUTOPAY_PERCENTAGE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"REFUND_PERCENTAGE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SECONDS_PER_MINUTE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"contractBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"deposits","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getUserDividends","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lastClaimedTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDeposits","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDividends","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDividendsClaimed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalEarnings","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalRefunds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalUsers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalWithdrawalFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalWithdrawals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]]; // Replace with the actual contract ABI

let contract;
let userAddress;

const connectWalletBtn = document.getElementById('connect-wallet-btn');
const userAddressDiv = document.getElementById('user-address');
const contractBalanceDiv = document.getElementById('contract-balance');
const totalDepositsDiv = document.getElementById('total-deposits');
const totalWithdrawalsDiv = document.getElementById('total-withdrawals');
const totalEarningsDiv = document.getElementById('total-earnings');
const userDepositsDiv = document.getElementById('user-deposits');
const lastClaimedTimestampDiv = document.getElementById('last-claimed-timestamp');
const availableDividendsDiv = document.getElementById('available-dividends');
const depositAmountInput = document.getElementById('deposit-amount');

if (typeof window.ethereum !== 'undefined') {
    connectWalletBtn.addEventListener('click', connectWallet);
} else {
    connectWalletBtn.style.display = 'none';
}

async function connectWallet() {
    try {
        await window.ethereum.enable();
        updateUserAddress();
    } catch (error) {
        console.error(error);
    }
}

function updateUserAddress() {
    userAddress = web3.currentProvider.selectedAddress;
    userAddressDiv.innerText = userAddress;
    updateContractStats();
    updateUserStats();
}

async function updateContractStats() {
    contract = new web3.eth.Contract(abi, contractAddress);
    const contractStats = await contract.methods.getContractStats().call();
    contractBalanceDiv.innerText = web3.utils.fromWei(contractStats.contractBalance, 'ether');
    totalDepositsDiv.innerText = web3.utils.fromWei(contractStats.totalDeposits, 'ether');
    totalWithdrawalsDiv.innerText = contractStats.totalWithdrawals;
    totalEarningsDiv.innerText = web3.utils.fromWei(contractStats.totalEarnings, 'ether');
}

async function updateUserStats() {
    const userStats = await contract.methods.getUserStats(userAddress).call();
    userDepositsDiv.innerText = web3.utils.fromWei(userStats.deposits, 'ether');
    lastClaimedTimestampDiv.innerText = userStats.lastClaimedTimestamp;
    availableDividendsDiv.innerText = web3.utils.fromWei(userStats.availableDividends, 'ether');
}

async function deposit() {
    const depositAmount = web3.utils.toWei(depositAmountInput.value, 'ether');
    await contract.methods.deposit().send({ from: userAddress, value: depositAmount });
    updateUserStats();
    updateContractStats();
}

document.getElementById('deposit-btn').addEventListener('click', deposit);

async function withdraw() {
    await contract.methods.withdraw().send({ from: userAddress });
    updateUserStats();
    updateContractStats();
}

document.getElementById('withdraw-btn').addEventListener('click', withdraw);

async function claimDividends() {
    await contract.methods.claimDividends().send({ from: userAddress });
    updateUserStats();
    updateContractStats();
}

document.getElementById('claim-dividends-btn').addEventListener('click', claimDividends);
