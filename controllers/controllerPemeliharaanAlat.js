//jshint esversion:7
// jshint esversion:7

var exports = module.exports = {};
const models = require('../models');
let Op = require("sequelize").Op;

exports.index = function (req, res) {
    res.render('inputPemeliharaanAk', { title: "Pemeliharaan Peralatan" });
};