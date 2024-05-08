const contractAddress = '0xCC103B7Aada3645d0BbDba7012CB95AE4533097C'; // Replace with the contract address
const abi = [[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DividendsClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawal","type":"event"},{"inputs":[],"name":"AUTOPAY_PERCENTAGE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"REFUND_PERCENTAGE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SECONDS_PER_MINUTE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"contractBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"deposits","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getUserDividends","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lastClaimedTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDeposits","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDividends","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDividendsClaimed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalEarnings","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalRefunds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalUsers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalWithdrawalFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalWithdrawals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]]; // Replace with the contract ABI

let contract;
let userAddress;

async function init() {
    // Initialize Web3 provider
    const provider = new Web3.providers.HttpProvider('https://testnet.bscscan.com');
    const web3 = new Web3(provider);

    // Initialize contract instance
    contract = new web3.eth.Contract(abi, contractAddress);

    // Get user address
    userAddress = await web3.eth.getAccounts();

    // Update contract statistics
    updateContractStats();

    // Update user statistics
    updateUserStats();

    // Add event listeners
    document.getElementById('deposit-btn').addEventListener('click', deposit);
    document.getElementById('withdraw-btn').addEventListener('click', withdraw);
   document.getElementById('claim-dividends-btn').addEventListener('click', claimDividends);
}

async function updateContractStats() {
    const contractStats = await contract.methods.getContractStats().call();
    document.getElementById('contract-balance').innerText = contractStats.contractBalance;
    document.getElementById('total-deposits').innerText = contractStats.totalDeposits;
    document.getElementById('total-withdrawals').innerText = contractStats.totalWithdrawals;
    document.getElementById('total-refunds').innerText = contractStats.totalRefunds;
    document.getElementById('total-earnings').innerText = contractStats.totalEarnings;
    document.getElementById('total-dividends-claimed').innerText = contractStats.totalDividendsClaimed;
}

async function updateUserStats() {
    const userStats = await contract.methods.getUserStats(userAddress[0]).call();
    document.getElementById('user-deposits').innerText = userStats.deposits;
    document.getElementById('last-claimed-timestamp').innerText = userStats.lastClaimedTimestamp;
    document.getElementById('available-dividends').innerText = userStats.availableDividends;
}

async function deposit() {
    const depositAmount = document.getElementById('deposit-amount').value;
    await contract.methods.deposit().send({ from: userAddress[0], value: web3.utils.toWei(depositAmount, 'ether') });
    updateUserStats();
    updateContractStats();
}

async function withdraw() {
    await contract.methods.withdraw().send({ from: userAddress[0] });
    updateUserStats();
    updateContractStats();
}

async function claimDividends() {
    await contract.methods.claimDividends().send({ from: userAddress[0] });
    updateUserStats();
    updateContractStats();
}

init();
