// jshint esversion:7

var exports = (module.exports = {});
const models = require("../models");
let Op = require("sequelize").Op;
const sequelize = require("sequelize");

exports.index = (req, res) => {
  let search = req.query.data || "";
  let kode_barang = req.query.kode_barang || "";
  let nomor_urut = req.query.nomor_urut || "";
  let kode_kondisi = req.query.kode_kondisi || "";
  let page = req.query.page || 1;
  let offset = 0;
  if (page > 1) {
    offset = (page - 1) * 10 + 1;
  }
  models.tabel_data_barang_jalan
    .findAndCountAll({
      where: {
        nama_barang_jalan: { [Op.like]: "%" + search + "%" },
        kode_barang: { [Op.like]: "%" + kode_barang + "%" },
        nomor_urut_barang_jalan: { [Op.like]: "%" + nomor_urut + "%" },
        kode_kondisi: { [Op.like]: "%" + kode_kondisi + "%" },
      },
      limit: 10,
      offset: offset,
      order: [["nomor_bangunan", "ASC"]],
    })
    .then((result) => {
      getLokasi(result);
    });

  const getLokasi = (result) => {
    models.tabel_kode_lokasi.findAndCountAll().then((kodeLokasi) => {
      getKodeBarang(result, kodeLokasi);
    });
  };

  const getKodeBarang = (result, kodeLokasi) => {
    models.tabel_kode_barang.findAndCountAll().then((kodeBarang) => {
      getKondisi(result, kodeLokasi, kodeBarang);
    });
  };
  const getKondisi = (result, kodeLokasi, kodeBarang) => {
    models.tabel_kode_kondisi.findAndCountAll().then((kodeKondisi) => {
      getNoUrut(result, kodeLokasi, kodeBarang, kodeKondisi);
    });
  };

  const getNoUrut = (result, kodeLokasi, kodeBarang, kodeKondisi) => {
    models.tabel_data_barang_jalan
      .findAndCountAll({
        attributes: [
          [
            sequelize.fn("max", sequelize.col("nomor_urut_barang_jalan")),
            "noUrut",
          ],
        ],
      })
      .then((noUrut) => {
        urutan = parseInt(noUrut.rows[0].dataValues.noUrut) + 1;
        getData(result, kodeLokasi, kodeBarang, kodeKondisi, urutan);
      });
  };
  const getData = (result, kodeLokasi, kodeBarang, kodeKondisi, urutan) => {
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };
    const totalPage = Math.ceil(result.count / 10);
    const pagination = { totalPage: totalPage, currentPage: page };
    res.render("dataBangunan", {
      alert: alert,
      title: "Data Bangunan",
      search: search,
      kode_barang: kode_barang,
      nomor_urut: nomor_urut,
      kode_kondisi: kode_kondisi,
      barangJalan: result.rows,
      lokasi: kodeLokasi.rows,
      barang: kodeBarang.rows,
      kondisi: kodeKondisi.rows,
      dataNoUrut: urutan,
      pagination: pagination,
    });
  };
};

exports.create = function (req, res) {
  let data = {
    nama_barang_jalan: req.body.nama_bangunan,
    sebutan: req.body.alamat,
    kode_lokasi: req.body.kode_lokasi,
    kode_barang: req.body.kode_barang,
    nomor_urut_barang_jalan: req.body.nomor_urut,
    jumlah_barang_jalan: req.body.jumlah,
    luas_barang_jalan: req.body.luas_bangunan,
    dari_barang_jalan: req.body.dari,
    pengiriman_barang_jalan: req.body.cara,
    dokumen_barang_jalan: req.body.nomor_dokumen,
    tanggal_barang_jalan: req.body.tanggal,
    harga_barang_jalan: req.body.harga_perolehan,
    kode_kondisi: req.body.kode_kondisi,
    keterangan_barang_jalan: req.body.keterangan,
    nomor_inventaris_barang_jalan:
      req.body.kode_lokasi +
      "/" +
      req.body.kode_barang +
      "/" +
      req.body.nomor_urut,
  };
  models.tabel_data_barang_jalan
    .create(data)
    .then(() => {
      req.flash("alertMessage", "Berhasil menyimpan data baru!");
      req.flash("alertStatus", "success");
      res.redirect("/dataBangunan");
    })
    .catch((err) => {
      req.flash("alertMessage", "Gagal menyimpan data baru!");
      req.flash("alertStatus", "danger");
    });
};

exports.edit = function (req, res) {
  let id = req.params.id;

  models.tabel_data_barang_jalan
    .findOne({ where: { nomor_bangunan: { [Op.eq]: id } } })
    .then((result) => {
      getLokasi(result);
    });

  const getLokasi = (result) => {
    models.tabel_kode_lokasi.findAndCountAll().then((kodeLokasi) => {
      getKodeBarang(result, kodeLokasi);
    });
  };

  const getKodeBarang = (result, kodeLokasi) => {
    models.tabel_kode_barang.findAndCountAll().then((kodeBarang) => {
      getKondisi(result, kodeLokasi, kodeBarang);
    });
  };
  const getKondisi = (result, kodeLokasi, kodeBarang) => {
    models.tabel_kode_kondisi.findAndCountAll().then((kodeKondisi) => {
      getData(result, kodeLokasi, kodeBarang, kodeKondisi);
    });
  };

  const getData = (result, kodeLokasi, kodeBarang, kodeKondisi) => {
    console.log(result.dataValues);
    res.render("editBangunan", {
      title: "Edit Data Bangunan",
      barangJalan: result.dataValues,
      lokasi: kodeLokasi.rows,
      barang: kodeBarang.rows,
      kondisi: kodeKondisi.rows,
    });
  };
};

exports.goEdit = function (req, res) {
  console.log(req.body);
  const id = req.params.id;
  models.tabel_data_barang_jalan
    .findOne({
      where: { nomor_bangunan: { [Op.eq]: id } },
    })
    .then((result) => {
      data = {
        nama_barang_jalan: req.body.nama_barang,
        sebutan: req.body.sebutan,
        kode_lokasi: req.body.kode_lokasi,
        kode_barang: req.body.kode_barang,
        nomor_urut_barang_jalan: req.body.nomor_urut,
        jumlah_barang_jalan: req.body.jumlah,
        luas_barang_jalan: req.body.luas_bangunan,
        dari_barang_jalan: req.body.dari,
        pengiriman_barang_jalan: req.body.cara,
        dokumen_barang_jalan: req.body.nomor_dokumen,
        input_barang_jalan: req.body.tanggal,
        harga_barang_jalan: req.body.harga_perolehan,
        kode_kondisi: req.body.kode_kondisi,
        keterangan_barang_jalan: req.body.keterangan,
        nomor_inventaris_barang_jalan:
          req.body.kode_lokasi +
          "/" +
          req.body.kode_barang +
          "/" +
          req.body.nomor_urut,
      };
      result
        .update(data)
        .then(() => {
          req.flash("alertMessage", "Sukses mengubah data!");
          req.flash("alertStatus", "success");
          res.redirect("/dataBangunan");
        })
        .catch((err) => {
          req.flash("alertMessage", "Gagal mengubah data!");
          req.flash("alertStatus", "danger");
          res.redirect("/dataBangunan");
        });
    });
};
exports.delete = function (req, res) {
  let data = {};
  res.render("", {});
};
