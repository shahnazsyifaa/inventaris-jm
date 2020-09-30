// jshint esversion:7

var exports = (module.exports = {});
const models = require("../models");
let Op = require("sequelize").Op;
const sequelize = require("sequelize");

exports.index = function (req, res) {
  let search = req.query.data || "";
  let kode_barang = req.query.kode_barang || "";
  let kode_ruang = req.query.kode_ruang || "";
  let kode_dokumen = req.query.kode_dokumen || "";
  let kode_kondisi = req.query.kode_kondisi || "";
  let page = req.query.page || 1;
  let offset = 0;
  if (page > 1) {
    offset = (page - 1) * 10 + 1;
  }
  models.tabel_data_barang
    .findAndCountAll({
      where: {
        nama_barang: { [Op.like]: "%" + search + "%" },
        kode_barang: { [Op.like]: "%" + kode_barang + "%" },
        kode_ruang: { [Op.like]: "%" + kode_ruang + "%" },
        kode_dokumen: { [Op.like]: "%" + kode_dokumen + "%" },
        kode_kondisi: { [Op.like]: "%" + kode_kondisi + "%" },
      },
      include: [
        {
          model: models.tabel_kode_ruang,
          nested: false,
          required: true,
          include: [
            {
              model: models.tabel_kode_lokasi,
            },
          ],
        },
      ],
      limit: 10,
      offset: offset,
      order: [["nomor_barang", "ASC"]],
    })
    .then((result) => {
      getDataRuang(result);
    });

  function getDataRuang(result) {
    models.tabel_kode_ruang.findAndCountAll().then((dataRuang) => {
      getDataLokasi(result, dataRuang);
    });
  }

  function getDataLokasi(result, dataRuang) {
    models.tabel_kode_lokasi.findAndCountAll().then((dataLokasi) => {
      getDataKodeBarang(result, dataRuang, dataLokasi);
    });
  }

  function getDataKodeBarang(result, dataRuang, dataLokasi) {
    models.tabel_kode_barang.findAndCountAll().then((dataKodeBarang) => {
      getDataKodeDokumen(result, dataRuang, dataLokasi, dataKodeBarang);
    });
  }

  function getDataKodeDokumen(result, dataRuang, dataLokasi, dataKodeBarang) {
    models.tabel_dokumen.findAndCountAll().then((dataKodeDokumen) => {
      getDataKodeKondisi(
        result,
        dataRuang,
        dataLokasi,
        dataKodeBarang,
        dataKodeDokumen
      );
    });
  }

  function getDataKodeKondisi(
    result,
    dataRuang,
    dataLokasi,
    dataKodeBarang,
    dataKodeDokumen
  ) {
    models.tabel_kode_kondisi.findAndCountAll().then((dataKodeKondisi) => {
      getNoUrut(
        result,
        dataRuang,
        dataLokasi,
        dataKodeBarang,
        dataKodeDokumen,
        dataKodeKondisi
      );
    });
  }

  function getNoUrut(
    result,
    dataRuang,
    dataLokasi,
    dataKodeBarang,
    dataKodeDokumen,
    dataKodeKondisi
  ) {
    models.tabel_data_barang
      .findAndCountAll({
        attributes: [
          [sequelize.fn("max", sequelize.col("nomor_urut_barang")), "noUrut"],
        ],
      })
      .then((noUrut) => {
        urutan = parseInt(noUrut.rows[0].dataValues.noUrut) + 1;
        getAllData(
          result,
          dataRuang,
          dataLokasi,
          dataKodeBarang,
          dataKodeDokumen,
          dataKodeKondisi,
          urutan
        );
      });
  }

  function getAllData(
    result,
    dataRuang,
    dataLokasi,
    dataKodeBarang,
    dataKodeDokumen,
    dataKodeKondisi,
    urutan
  ) {
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };
    const totalPage = Math.ceil(result.count);
    const pagination = { totalPage: totalPage, currentPage: page };
    res.render("dataTransaksi", {
      alert: alert,
      title: "Data Peralatan Kantor",
      search: search,
      kode_barang: kode_barang,
      kode_ruang: kode_ruang,
      kode_dokumen: kode_dokumen,
      kode_kondisi: kode_kondisi,
      peralatanKantor: result.rows, //tampilin perulangan di tabel
      dataRuang: dataRuang.rows,
      dataLokasi: dataLokasi.rows,
      dataKodeBarang: dataKodeBarang.rows,
      dataKodeDokumen: dataKodeDokumen.rows,
      dataKodeKondisi: dataKodeKondisi.rows,
      dataNoUrut: urutan,
      pagination: pagination,
    });
  }
};

exports.create = function (req, res) {
  models.tabel_kode_ruang
    .findAndCountAll({
      where: { kode_ruang: { [Op.like]: req.body.kode_ruang } },
    })
    .then((kodeLokasi) => {
      let lokasi = kodeLokasi.rows[0].dataValues.kode_lokasi;
      let data = {
        nama_barang: req.body.nama_barang,
        // kodeLokasi: req.body.kodeLokasi,
        kode_barang: req.body.kode_barang,
        nomor_urut_barang: req.body.nomor_urut,
        nomor_inventaris_barang:
          lokasi + "/" + req.body.kode_barang + "/" + req.body.nomor_urut,
        kode_ruang: req.body.kode_ruang,
        // namaRuang: req.body.namaRuang,
        // unitKerja: req.body.unitKerja,
        tipe_barang: req.body.merk,
        nomor_seri: req.body.no_seri,
        tahun_barang: req.body.tanggal,
        dari_barang: req.body.asal,
        kode_dokumen: req.body.kode_dokumen,
        harga_satuan_barang: req.body.harsat,
        kode_kondisi: req.body.kode_kondisi,
        keterangan_barang: req.body.keterangan,
      };
      models.tabel_data_barang
        .create(data)
        .then(() => {
          req.flash("alertMessage", "Berhasil menyimpan data baru!");
          req.flash("alertStatus", "success");
          res.redirect("/dataTransaksi");
        })
        .catch((err) => {
          req.flash("alertMessage", "Gagal menyimpan data baru!");
          req.flash("alertStatus", "danger");
          res.redirect("/dataTransaksi");
        });
    });
};

exports.edit = function (req, res) {
  let id = req.params.id;

  models.tabel_data_barang
    .findOne({ where: { nomor_barang: { [Op.eq]: id } } })
    .then((result) => {
      getDataRuang(result);
    });

  function getDataRuang(result) {
    models.tabel_kode_ruang.findAndCountAll().then((dataRuang) => {
      getDataLokasi(result, dataRuang);
    });
  }

  function getDataLokasi(result, dataRuang) {
    models.tabel_kode_lokasi.findAndCountAll().then((dataLokasi) => {
      getDataKodeBarang(result, dataRuang, dataLokasi);
    });
  }

  function getDataKodeBarang(result, dataRuang, dataLokasi) {
    models.tabel_kode_barang.findAndCountAll().then((dataKodeBarang) => {
      getDataKodeDokumen(result, dataRuang, dataLokasi, dataKodeBarang);
    });
  }

  function getDataKodeDokumen(result, dataRuang, dataLokasi, dataKodeBarang) {
    models.tabel_dokumen.findAndCountAll().then((dataKodeDokumen) => {
      getDataKodeKondisi(
        result,
        dataRuang,
        dataLokasi,
        dataKodeBarang,
        dataKodeDokumen
      );
    });
  }

  function getDataKodeKondisi(
    result,
    dataRuang,
    dataLokasi,
    dataKodeBarang,
    dataKodeDokumen
  ) {
    models.tabel_kode_kondisi.findAndCountAll().then((dataKodeKondisi) => {
      getAllData(
        result,
        dataRuang,
        dataLokasi,
        dataKodeBarang,
        dataKodeDokumen,
        dataKodeKondisi
      );
    });
  }

  function getAllData(
    result,
    dataRuang,
    dataLokasi,
    dataKodeBarang,
    dataKodeDokumen,
    dataKodeKondisi
  ) {
    console.log(result.dataValues);
    res.render("editTransaksi", {
      title: "Edit Data Transaksi",
      peralatanKantor: result.dataValues,
      dataRuang: dataRuang.rows,
      dataLokasi: dataLokasi.rows,
      dataKodeBarang: dataKodeBarang.rows,
      dataKodeDokumen: dataKodeDokumen.rows,
      dataKodeKondisi: dataKodeKondisi.rows,
    });
  }
};

exports.goEdit = function (req, res) {
  console.log(req.body);
  const id = req.params.id;
  models.tabel_data_barang
    .findOne({ where: { nomor_barang: { [Op.eq]: id } } })
    .then((result) => {
      models.tabel_kode_ruang
        .findAndCountAll({
          where: { kode_ruang: { [Op.like]: req.body.kode_ruang } },
        })
        .then((kodeLokasi) => {
          let lokasi = kodeLokasi.rows[0].dataValues.kode_lokasi;
          data = {
            nama_barang: req.body.nama_barang,
            kode_barang: req.body.kode_barang,
            nomor_urut_barang: req.body.nomor_urut,
            kode_ruang: req.body.kode_ruang,
            tipe_barang: req.body.merk,
            nomor_seri: req.body.no_seri,
            tahun_barang: req.body.tanggal,
            dari_barang: req.body.asal,
            kode_dokumen: req.body.kode_dokumen,
            keterangan_barang: req.body.keterangan,
            nomor_inventaris_barang:
              lokasi + "/" + req.body.kode_barang + "/" + req.body.nomor_urut,
          };
          result
            .update(data)
            .then(() => {
              req.flash("alertMessage", "Sukses mengubah data!");
              req.flash("alertStatus", "success");
              res.redirect("/dataTransaksi");
            })
            .catch((err) => {
              req.flash("alertMessage", "Gagal mengubah data!");
              req.flash("alertStatus", "danger");
              res.redirect("/dataTransaksi");
            });
        });
    });
};

exports.delete = function (req, res) {
  let id = req.params.id;
  models.tabel_data_barang
    .findOne({ where: { nomor_barang: { [Op.eq]: id } } })
    .then((result) => {
      return result.destroy().then(() => {
        res.redirect("/dataTransaksi");
      });
    });
};
