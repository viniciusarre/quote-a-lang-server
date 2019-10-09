'use strict';

var mongoose = require('mongoose');

module.exports = function () {
    var DB_URI = "mongodb+srv://crawler:zsvFNE5UzFLpTumu@quotelangcluster-s2xve.mongodb.net/test?retryWrites=true";

    global.db = mongoose.connect(DB_URI, { useNewUrlParser: true });
    mongoose.connection.on('connected', function () {
        console.log('=====Conexão estabelecida com sucesso=====');
    });
    mongoose.connection.on('error', function (err) {
        console.log('=====Ocorreu um erro: ' + err);
    });
    mongoose.connection.on('disconnected', function () {
        console.log('=====Conexão finalizada=====');
    });
};