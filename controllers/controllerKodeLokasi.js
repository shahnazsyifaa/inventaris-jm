// jshint esversion:7

var exports = (module.exports = {});
const models = require("../models");
let Op = require("sequelize").Op;

exports.index = (req, res) => {
  let page = req.query.page || 1;
  let offset = 0;
  if (page > 1) {
    offset = (page - 1) * 10 + 1;
  }
  models.tabel_kode_lokasi
    .findAndCountAll({
      limit: 10,
      offset: offset,
      order: [["kode_lokasi", "ASC"]],
    })
    .then((result) => {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      const totalPage = Math.ceil(result.count / 10);
      const pagination = { totalPage: totalPage, currentPage: page };
      res.render("viewKodeLokasi", {
        alert: alert,
        title: "Tabel Kode Lokasi",
        kodeLokasi: result.rows,
        pagination: pagination,
      });
    });
};

exports.create = function (req, res) {
  let data = {
    kode_lokasi: req.body.kodeLokasi,
    unit_kerja: req.body.unit_kerja,
    alias: req.body.alias,
  };
  models.tabel_kode_lokasi
    .create(data)
    .then(() => {
      req.flash("alertMessage", "Berhasil menyimpan data baru!");
      req.flash("alertStatus", "success");
      res.redirect("/viewKodeLokasi");
    })
    .catch((err) => {
      req.flash("alertMessage", "Gagal menyimpan data baru!");
      req.flash("alertStatus", "danger");
      res.redirect("/viewKodeLokasi");
    });
};

exports.edit = function (req, res) {
  let id = req.params.id;
  models.tabel_kode_lokasi
    .findOne({ where: { kode_lokasi: { [Op.eq]: id } } })
    .then((result) => {
      models.tabel_kode_lokasi.findAndCountAll().then((kodelokasi) => {
        console.log(result.dataValues);
        res.render("editKodeLokasi", {
          title: "edit kode lokasi",
          kodeLokasi: result.dataValues,
          kolok: kodelokasi.rows,
        });
      });
    });
};

exports.goEdit = function (req, res) {
  console.log(req.body);
  const id = req.params.id;
  models.tabel_kode_lokasi
    .findOne({ where: { kode_lokasi: { [Op.eq]: id } } })
    .then((result) => {
      models.tabel_kode_lokasi.findAndCountAll().then((kodelokasi) => {
        data = {
            kode_lokasi: req.body.kodeLokasi,
            unit_kerja: req.body.unit_kerja,
            alias: req.body.alias,
        };
        result
          .update(data)
          .then(() => {
            req.flash("alertMessage", "Berhasil mengubah data!");
            req.flash("alertStatus", "success");
            res.redirect("/viewKodeLokasi");
          })
          .catch((err) => {
            req.flash("alertMessage", "Gagal mengubah data!");
            req.flash("alertStatus", "danger");
            res.redirect("/viewKodeLokasi");
          });
      });
    });
};

exports.delete = function (req, res) {
  let data = {};
  res.render("", {});
};
