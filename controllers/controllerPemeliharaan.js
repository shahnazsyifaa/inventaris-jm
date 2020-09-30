// jshint esversion:7

var exports = module.exports = {};
const models = require('../models');
let Op = require("sequelize").Op;

exports.create = function (req, res) {
    let data = {
        nomor_pemeliharaan: '',
        nomor_inventaris: '',
        tanggal_pemeliharaan: '',
        by_1: '',
        by_2: '',
        by_3: '',
        uraian: '',
        tanggal_input_pemeliharaan: ''
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