// JavaScript para interactuar con el contrato y actualizar la interfaz HTML

// Web3 initialization
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // Set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

// Obtener la instancia del contrato
var contractABI = []; // Aquí colocarás el ABI de tu contrato
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
