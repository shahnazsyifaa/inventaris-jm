// jshint esversion:7

var exports = (module.exports = {});
const models = require("../models");
let Op = require("sequelize").Op;
const sequelize = require("sequelize");

exports.index = function (req, res) {
  let search = req.query.data || "";
  let page = req.query.page || 1;
  let offset = 0;
  if (page > 1) {
    offset = (page - 1) * 10 + 1;
  }
  models.tabel_kode_barang
    .findAndCountAll({
      where: { kode_barang: { [Op.like]: "%" + search + "%" } },
      limit: 10,
      offset: offset,
      order: [["kode_barang", "ASC"]],
    })
    .then((result) => {
      models.tabel_subkode_barang.findAndCountAll().then((subkode) => {
        const alertMessage = req.flash("alertMessage");
        const alertStatus = req.flash("alertStatus");
        const alert = { message: alertMessage, status: alertStatus };
        const totalPage = Math.ceil(result.count / 10);
        const pagination = { totalPage: totalPage, currentPage: page };
        res.render("viewKodeBarang", {
          alert: alert,
          title: "Tabel Kode Barang",
          kodeBarang: result.rows,
          subKode: subkode.rows,
          pagination: pagination,
        });
      });
    });
  };

exports.create = function (req, res) {
  let data = {
    kode_barang: req.body.kodeBarang,
    nama_barang: req.body.namaBarang,
    satuan: req.body.satuan,
    subkode_barang: req.body.kodeSatuan,
  };
  console.log(data);
  models.tabel_kode_barang
    .create(data)
    .then(() => {
      req.flash("alertMessage", "Berhasil menyimpan data baru!");
      req.flash("alertStatus", "success");
      res.redirect("/viewKodeBarang");
    })
    .catch((err) => {
      req.flash("alertMessage", "Gagal menyimpan data baru!");
      req.flash("alertStatus", "danger");
      res.redirect("/viewKodeBarang");
    });
};

exports.edit = function (req, res) {
  let id = req.params.id;
  models.tabel_kode_barang
    .findOne({ where: { kode_barang: { [Op.eq]: id } } })
    .then((result) => {
      models.tabel_subkode_barang.findAndCountAll().then((subkode) => {
        console.log(result.dataValues);
        res.render("editKodeBarang", {
          title: "edit kode barang",
          kodeBarang: result.dataValues,
          subKode: subkode.rows,
        });
      });
    });
};

exports.goEdit = function (req, res) {
  console.log(req.body);
  const id = req.params.id;
  models.tabel_kode_barang
    .findOne({ where: { kode_barang: { [Op.eq]: id } } })
    .then((result) => {
      models.tabel_subkode_barang.findAndCountAll().then((subkode) => {
        data = {
          kode_barang: req.body.kodeBarang,
          nama_barang: req.body.namaBarang,
          satuan: req.body.satuan,
          subkode_barang: req.body.kodeSatuan,
        };
        result
          .update(data)
          .then(() => {
            req.flash("alertMessage", "Berhasil mengubah data!");
            req.flash("alertStatus", "success");
            res.redirect("/viewKodeBarang");
          })
          .catch((err) => {
            req.flash("alertMessage", "Gagal mengubah data!");
            req.flash("alertStatus", "danger");
            res.redirect("/viewKodeBarang");
          });
      });
    });
};

exports.delete = function (req, res) {
  let data = {};
  res.render("", {});
};
