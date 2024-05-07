var web3 = new Web3(Web3.givenProvider);
var minersContract = new web3.eth.Contract(minersAbi, minersAddr);
var currentAddr = '0xCC103B7Aada3645d0BbDba7012CB95AE4533097C';

$(document).ready(function () {
    // Comprobar si Web3 está inyectado por el navegador (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        // Usar el proveedor de MetaMask
        web3 = new Web3(web3.currentProvider);
        console.log('Usando el proveedor de MetaMask');
    } else {
        console.log('No se detectó web3. Volviendo a http://localhost:8545.');
        // Volver a localhost si no hay inyección de web3
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }

    // Obtener la dirección del usuario actual
    web3.eth.getAccounts(function (err, accounts) {
        if (err != null) {
            console.error("Ocurrió un error: " + err);
        } else if (accounts.length === 0) {
            console.log("El usuario no ha iniciado sesión en MetaMask");
        } else {
            currentAddr = accounts[0];
            console.log("Dirección actual: " + currentAddr);
        }
    });

    // Actualizar estadísticas cada 10 segundos
    updateStats();
});

function updateStats() {
    // Actualizar estadísticas
    getMyEggs(function (eggs) {
        $('#eggs').text(eggs);
    });

    getMyMiners(function (miners) {
        $('#miners').text(miners);
    });

    lastHatch(currentAddr, function (lastHatchTime) {
        var timeSinceLastHatch = Math.floor(Date.now() / 1000) - lastHatchTime;
        var timeToHatch = parseInt($('#EGGS_TO_HATCH_1MINERS').text()) * timeSinceLastHatch;
        $('#time_to_hatch').text(timeToHatch);
    });

    // Actualizar estadísticas cada 10 segundos
    setTimeout(updateStats, 10000);
}

function getMyEggs(callback) {
    minersContract.methods.getMyEggs().call({ from: currentAddr }).then(function (result) {
        callback(result);
    }).catch(function (err) {
        console.log(err);
    });
}

function getMyMiners(callback) {
    minersContract.methods.getMyMiners().call({ from: currentAddr }).then(function (result) {
        callback(result);
    }).catch(function (err) {
        console.log(err);
    });
}

function lastHatch(address, callback) {
    minersContract.methods.lastHatch(address).call({ from: currentAddr }).then(function (result) {
        callback(result);
    }).catch(function (err) {
        console.log(err);
    });
}
