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
  models.tabel_data_kendaraan
    .findAndCountAll({
      limit: 10,
      offset: offset,
      order: [["nomor_inventaris_kendaraan", "ASC"]],
    })
    .then((result) => {
      getKodeLokasi(result);
    });

  const getKodeLokasi = (result) => {
    models.tabel_kode_lokasi.findAndCountAll().then((kodeLokasi) => {
      getKodeBarang(result, kodeLokasi);
    });
  };

  const getKodeBarang = (result, kodeLokasi) => {
    models.tabel_kode_barang.findAndCountAll().then((kodeBarang) => {
      getKodeKondisi(result, kodeLokasi, kodeBarang);
    });
  };

  const getKodeKondisi = (result, kodeLokasi, kodeBarang) => {
    models.tabel_kode_kondisi.findAndCountAll().then((kodeKondisi) => {
      getKodePemakai(result, kodeLokasi, kodeBarang, kodeKondisi);
    });
  };

  const getKodePemakai = (result, kodeLokasi, kodeBarang, kodeKondisi) => {
    models.tabel_kode_pemakai.findAndCountAll().then((kodePemakai) => {
      getData(result, kodeLokasi, kodeBarang, kodeKondisi, kodePemakai);
    });
  };

  const getData = (
    result,
    kodeLokasi,
    kodeBarang,
    kodeKondisi,
    kodePemakai
  ) => {
    const totalPage = Math.ceil(result.count / 10);
    const pagination = { totalPage: totalPage, currentPage: page };
    res.render("kendaraan", {
      title: "Tabel Kendaraan",
      kendaraan: result.rows,
      kodeLokasi: kodeLokasi.rows,
      kodeBarang: kodeBarang.rows,
      kodeKondisi: kodeKondisi.rows,
      kodePemakai: kodePemakai.rows,
      pagination: pagination,
    });
  };
};

exports.create = function (req, res) {
  let data = {
    kode_ruang: "",
    ruang: "",
    kode_lokasi: "",
    unit_kerja: "",
  };
  res.render("", {});
};

exports.edit = function (req, res) {
  let data = {};
  res.render("", {});
};

exports.delete = function (req, res) {
  let data = {};
  res.render("", {});
};
