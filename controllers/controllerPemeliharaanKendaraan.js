// jshint esversion:7

var exports = module.exports = {};
const models = require('../models');
let Op = require("sequelize").Op;

exports.index = (req, res) => {
    res.render("inputPemeliharaanKd", { title: "Pemeliharaan Kendaraan" });
};

exports.create = function (req, res) {
    let data = {
        nomor_pemeliharaan_kendaraan: '',
        nomor_inventaris: '',
        tanggal_pemeliharaan_kendaraan: '',
        by_1: '',
        by_2: '',
        by_3: '',
        uraian: '',
        tanggal_input_pemeliharaan_kendaraan: ''
    };
    res.render('', {

    });
};

exports.edit = function (req, res) {
    let data = {

    };
    res.render('', {

    });
};

exports.delete = function (req, res) {
    let data = {

    };
    res.render('', {

    });
};