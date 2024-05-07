var minersAddr = '0x33F07adB3DAD9Bb80a7d722F6e34242290f46374';
var minersAbi = [
    // Copia y pega la ABI del contrato aquí
];

var minersContract;

var canSell = true;
var canHatch = true;

function contractBalance(callback){
    web3.eth.getBalance(minersAddr).then(result => {
        callback(web3.utils.fromWei(result));
    }).catch((err) => {
        console.log(err)
    });
}

function buyEggs(ref, trx, callback){
    minersContract.methods.buyEggs(ref).send({value: trx, from: currentAddr}).then(result => {
        callback();
    }).catch((err) => {
        console.log(err)
    });
}

function hatchEggs(ref, callback){
    if (canHatch) {
        canHatch = false;
        minersContract.methods.hatchEggs(ref).send({from: currentAddr}).then(result => {
            callback();
        }).catch((err) => {
            console.log(err)
        });
        setTimeout(function(){
            canHatch = true;
        }, 10000);
    } else {
        console.log('Cannot hatch yet...')
    }
}

function sellEggs(callback){
    if (canSell) {
        canSell = false;
        minersContract.methods.sellEggs().send({from: currentAddr}).then(result => {
            callback();
        }).catch((err) => {
            console.log(err)
        });
        setTimeout(function(){
            canSell = true;
        }, 10000);
    } else {
        console.log('Cannot sell yet...')
    }
}

function calculateEggBuy(trx, contractBalance, callback){
    minersContract.methods.calculateEggBuy(trx, contractBalance).call().then(result => {
        callback(result);
    }).catch((err) => {
        console.log(err)
    });
}

function calculateEggBuySimple(trx, callback){
    minersContract.methods.calculateEggBuySimple(trx).call().then(result => {
        callback(result);
    }).catch((err) => {
        console.log(err)
    });
}

function calculateEggSell(eggs, callback){
    minersContract.methods.calculateEggSell(eggs).call().then(result => {
        callback(result);
    }).catch((err) => {
        console.log(err)
    });
}

function claimedEggs(callback){
    minersContract.methods.claimedEggs().call().then(result => {
        callback(result);
    }).catch((err) => {
        console.log(err)
    });
}

function devFee(amount, callback){
    minersContract.methods.devFee(amount).call().then(result => {
        callback(result);
    }).catch((err) => {
        console.log(err)
    });
}

function getBalance(callback){
    minersContract.methods.getBalance().call().then(result => {
        callback(result);
    }).catch((err) => {
        console.log(err)
    });
}

function getEggsSinceLastHatch(address, callback){
    minersContract.methods.getEggsSinceLastHatch(address).call().then(result => {
        callback(result);
    }).catch((err) => {
        console.log(err)
    });
}

function getMyEggs(callback){
    minersContract.methods.getMyEggs().call({from: currentAddr}).then(result => {
        callback(result);
    }).catch((err) => {
        console.log(err)
    });
}

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

function lastHatch(address, callback){
    minersContract.methods.lastHatch(address).call({from: currentAddr}).then(result => {
        callback(result);
    }).catch((err) => {
        console.log(err)
    });
}

function marketEggs(callback){
    minersContract.methods.marketEggs().call().then(result => {
        callback(result);
    }).catch((err) => {
        console.log(err)
    });
}

// Esta parte debe ejecutarse después de que web3 esté inicializado y minersContract esté instanciado.
// Por ejemplo, puedes usar `web3.eth.Contract` para instanciar minersContract.
// Luego, puedes llamar a las funciones según sea necesario.
