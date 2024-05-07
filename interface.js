// JavaScript para interactuar con el contrato y actualizar la interfaz HTML

// Web3 initialization
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // Set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

// Obtener la instancia del contrato
var contractABI = [[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DividendsClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawal","type":"event"},{"inputs":[],"name":"AUTOPAY_PERCENTAGE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"REFUND_PERCENTAGE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SECONDS_PER_MINUTE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"contractBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"deposits","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getUserDividends","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lastClaimedTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDeposits","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDividends","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDividendsClaimed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalEarnings","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalRefunds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalUsers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalWithdrawalFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalWithdrawals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]]; // Aquí colocarás el ABI de tu contrato
var contractAddress = '0xCC103B7Aada3645d0BbDba7012CB95AE4533097C'; // Dirección del contrato
var minersContract = new web3.eth.Contract(contractABI, contractAddress);

// Función para obtener el saldo del contrato
function contractBalance(callback){
    web3.eth.getBalance(contractAddress).then(result => {
        callback(web3.utils.fromWei(result));
    }).catch((err) => {
        console.log(err)
    });
}

// Función para comprar huevos
function buyEggs(ref, trx, callback){
    minersContract.methods.buyEggs(ref).send({value: trx, from: currentAddr}).then(result => {
        callback();
    }).catch((err) => {
        console.log(err)
    });
}

// Función para incubar huevos
function hatchEggs(ref, callback){
    minersContract.methods.hatchEggs(ref).send({from: currentAddr}).then(result => {
        callback();
    }).catch((err) => {
        console.log(err)
    });
}

// Función para vender huevos
function sellEggs(callback){
    minersContract.methods.sellEggs().send({from: currentAddr}).then(result => {
        callback();
    }).catch((err) => {
        console.log(err)
    });
}

// Función para calcular la cantidad de BNB que se necesita para comprar huevos
function calculateEggBuy(trx, contractBalance, callback){
    minersContract.methods.calculateEggBuy(trx, contractBalance).call().then(result => {
        callback(result);
    }).catch((err) => {
        console.log(err)
    });
}

// Función para calcular la cantidad de huevos que se pueden comprar con una cantidad específica de BNB
function calculateEggBuySimple(trx, callback){
    minersContract.methods.calculateEggBuySimple(trx).call().then(result => {
        callback(result);
    }).catch((err) => {
        console.log(err)
    });
}

// Función para calcular la cantidad de BNB que se puede obtener al vender huevos
function calculateEggSell(eggs, callback){
    minersContract.methods.calculateEggSell(eggs).call().then(result => {
        callback(result);
    }).catch((err) => {
        console.log(err)
    });
}

// Función para obtener la cantidad de huevos reclamados
function claimedEggs(callback){
    minersContract.methods.claimedEggs().call().then(result => {
        callback(result);
    }).catch((err) => {
        console.log(err)
    });
}

// Función para obtener la comisión del desarrollador
function devFee(amount, callback){
    minersContract.methods.devFee(amount).call().then(result => {
        callback(result);
    }).catch((err) => {
        console.log(err)
    });
}

// Función para obtener el saldo del usuario
function getBalance(callback){
    minersContract.methods.getBalance().call().then(result => {
        callback(result);
    }).catch((err) => {
        console.log(err)
    });
}

// Función para obtener la cantidad de huevos generados desde el último proceso de incubación
function getEggsSinceLastHatch(address, callback){
    minersContract.methods.getEggsSinceLastHatch(address).call().then(result => {
        callback(result);
    }).catch((err) => {
        console.log(err)
    });
}

// Función para obtener la cantidad de huevos del usuario
function getMyEggs(callback){
    minersContract.methods.getMyEggs().call({from: currentAddr}).then(result => {
        callback(result);
    }).catch((err) => {
        console.log(err)
    });
}

// Función para obtener la cantidad de "mineros" del usuario
function getMyMiners(callback){
    minersContract.methods.getMyMiners().call({from: currentAddr}).then(result => {
        if (result == '0x') {
            result = 0;
        }
        callback(result);
    }).catch((err) => {
        console.log(err)
    });
}

// Función para obtener la última incubación del usuario
function lastHatch(address, callback){
    minersContract.methods.lastHatch(address).call({from: currentAddr}).then(result => {
        callback(result);
    }).catch((err) => {
        console.log(err)
    });
}

// Función para obtener la cantidad de huevos en el mercado
function marketEggs(callback){
    minersContract.methods.marketEggs().call().then(result => {
        callback(result);
    }).catch((err) => {
        console.log(err)
    });
}
