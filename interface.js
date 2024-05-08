// JavaScript para interactuar con el contrato y actualizar la interfaz HTML

// Web3 initialization
let web3;
if (typeof window.ethereum !== 'undefined') {
    web3 = new Web3(window.ethereum);
    window.ethereum.enable();
} else {
    // Fallback to localhost if no web3 provider is detected
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

// Obtener la instancia del contrato
const contractABI = [[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DividendsClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawal","type":"event"},{"inputs":[],"name":"AUTOPAY_PERCENTAGE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"REFUND_PERCENTAGE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SECONDS_PER_MINUTE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"contractBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"deposits","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getUserDividends","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lastClaimedTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDeposits","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDividends","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDividendsClaimed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalEarnings","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalRefunds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalUsers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalWithdrawalFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalWithdrawals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]];
const contractAddress = '0xCC103B7Aada3645d0BbDba7012CB95AE4533097C'; // Dirección del contrato
const minersContract = new web3.eth.Contract(contractABI, contractAddress);

// Función para obtener el saldo del contrato
function getContractBalance(callback) {
    web3.eth.getBalance(contractAddress, (error, result) => {
        if (error) {
            console.error(error);
        } else {
            callback(web3.utils.fromWei(result));
        }
    });
}

// Función para depositar BNB
function depositBNB(amount, callback) {
    const trxValue = web3.utils.toWei(amount.toString(), 'ether');
    minersContract.methods.deposit().send({ value: trxValue })
        .on('transactionHash', function(hash) {
            console.log("Transaction Hash: " + hash);
        })
        .on('confirmation', function(confirmationNumber, receipt) {
            console.log("Confirmation Number: " + confirmationNumber);
            console.log("Receipt: ", receipt);
            callback(receipt);
        })
        .on('error', function(error, receipt) {
            console.error(error);
            console.log("Receipt: ", receipt);
        });
}

// Función para retirar BNB
function withdrawBNB(callback) {
    minersContract.methods.withdraw().send({ from: web3.eth.defaultAccount })
        .on('transactionHash', function(hash) {
            console.log("Transaction Hash: " + hash);
        })
        .on('confirmation', function(confirmationNumber, receipt) {
            console.log("Confirmation Number: " + confirmationNumber);
            console.log("Receipt: ", receipt);
            callback(receipt);
        })
        .on('error', function(error, receipt) {
            console.error(error);
            console.log("Receipt: ", receipt);
        });
}

// Función para reclamar dividendos
function claimDividends(callback) {
    minersContract.methods.claimDividends().send({ from: web3.eth.defaultAccount })
        .on('transactionHash', function(hash) {
            console.log("Transaction Hash: " + hash);
        })
        .on('confirmation', function(confirmationNumber, receipt) {
            console.log("Confirmation Number: " + confirmationNumber);
            console.log("Receipt: ", receipt);
            callback(receipt);
        })
        .on('error', function(error, receipt) {
            console.error(error);
            console.log("Receipt: ", receipt);
        });
}

// Actualizar el saldo del contrato en la interfaz
function updateContractBalance() {
    getContractBalance((balance) => {
        document.getElementById("contractBalance").textContent = balance;
    });
}

// Función para actualizar la interfaz después de realizar una acción
function updateUI() {
    // Aquí puedes actualizar la interfaz según sea necesario
}

// Manejar el envío del formulario de depósito de BNB
document.getElementById("depositForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const amount = parseFloat(document.getElementById("bnbAmount").value);
    depositBNB(amount, updateUI);
});

// Asignar funciones a los botones
document.getElementById("deposit_button").addEventListener("click", function() {
    const amount = parseFloat(prompt("Ingrese la cantidad de BNB a depositar:"));
    if (!isNaN(amount) && amount > 0) {
        depositBNB(amount, updateUI);
    } else {
        alert("Ingrese una cantidad válida de BNB.");
    }
});

document.getElementById("withdraw_button").addEventListener("click", function() {
    withdrawBNB(updateUI);
});

document.getElementById("claim_button").addEventListener("click", function() {
    claimDividends(updateUI);
});

// Llamar a las funciones de actualización inicial
updateContractBalance();
