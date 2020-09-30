// jshint esversion:7

var exports = (module.exports = {});
const models = require("../models");
let Op = require("sequelize").Op;
exports.index = (req, res) => {
  let search = req.query.data || "";
  let jenis_kendaraan = req.query.jenis_kendaraan || "";
  let nomor_urut = req.query.nomor_urut || "";
  let kode_kondisi = req.query.kode_kondisi || "";
  let page = req.query.page || 1;
  let offset = 0;
  if (page > 1) {
    offset = (page - 1) * 10 + 1;
  }
  models.tabel_data_kendaraan
    .findAndCountAll({
      where: {
        merk_tipe_kendaraan: { [Op.like]: "%" + search + "%" },
        nomor_urut_kendaraan: { [Op.like]: "%" + nomor_urut + "%" },
        kode_barang: { [Op.like]: "%" + jenis_kendaraan + "%" },
        kode_kondisi: { [Op.like]: "%" + kode_kondisi + "%" },
      },
      limit: 10,
      offset: offset,
      order: [["nomor_kendaraan", "ASC"]],
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
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };
    const totalPage = Math.ceil(result.count / 10);
    const pagination = { totalPage: totalPage, currentPage: page };
    res.render("dataKendaraan", {
      alert: alert,
      title: "Data Kendaraan",
      search: search,
      jenis_kendaraan: jenis_kendaraan,
      nomor_urut: nomor_urut,
      kode_kondisi: kode_kondisi,
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
    asal: req.body.asal,
    harga_kendaraan: req.body.harga,
    keterangan_kendaraan: req.body.keterangan,
    kode_barang: req.body.kode_barang,
    kode_kondisi: req.body.kode_kondisi,
    kode_lokasi: req.body.kode_lokasi,
    kode_user: req.body.pn_jawab,
    merk_tipe_kendaraan: req.body.merk,
    nomor_bpkb: req.body.nomor_bpkb,
    nomor_mesin: req.body.nomor_mesin,
    nomor_polisi: req.body.nomor_polisi,
    nomor_rangka: req.body.nomor_rangka,
    nomor_urut_kendaraan: req.body.nomor_urut,
    tahun_beli: req.body.tanggal,
    tahun_buat: req.body.tahun_pembuatan,
    nomor_inventaris_kendaraan:
      req.body.kode_lokasi +
      "/" +
      req.body.kode_barang +
      "/" +
      req.body.nomor_urut,
    // tanggal_input_kendaraan : req.body. ,
  };
  models.tabel_data_kendaraan
    .create(data)
    .then(() => {
      req.flash("alertMessage", "Berhasil menyimpan data baru!");
      req.flash("alertStatus", "success");
      res.redirect("/dataKendaraan");
    })
    .catch((err) => {
      req.flash("alertMessage", "Gagal menyimpan data baru!");
      req.flash("alertStatus", "danger");
      res.redirect("/dataKendaraan");
    });
};

exports.edit = function (req, res) {
  let id = req.params.id;
  models.tabel_data_kendaraan
    .findOne({ where: { nomor_kendaraan: { [Op.eq]: id } } })
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
    res.render("editKendaraan", {
      title: "Edit Data Kendaraan",
      kendaraan: result.dataValues,
      kodeLokasi: kodeLokasi.rows,
      kodeBarang: kodeBarang.rows,
      kodeKondisi: kodeKondisi.rows,
      kodePemakai: kodePemakai.rows,
    });
  };
};

exports.goEdit = function (req, res) {
  console.log(req.body);
  const id = req.params.id;
  models.tabel_data_kendaraan
    .findOne({
      where: { nomor_kendaraan: { [Op.eq]: id } },
    })
    .then((result) => {
      data = {
        asal: req.body.asal,
        harga_kendaraan: req.body.harga,
        keterangan_kendaraan: req.body.keterangan,
        kode_barang: req.body.kode_barang,
        kode_kondisi: req.body.kode_kondisi,
        kode_lokasi: req.body.kode_lokasi,
        kode_user: req.body.pn_jawab,
        merk_tipe_kendaraan: req.body.merk,
        nomor_bpkb: req.body.nomor_bpkb,
        nomor_mesin: req.body.nomor_mesin,
        nomor_polisi: req.body.nomor_polisi,
        nomor_rangka: req.body.nomor_rangka,
        nomor_urut_kendaraan: req.body.nomor_urut,
        tahun_beli: req.body.tanggal,
        tahun_buat: req.body.tahun_pembuatan,
        nomor_inventaris_kendaraan:
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
          res.redirect("/dataKendaraan");
        })
        .catch((err) => {
          req.flash("alertMessage", "Gagal mengubah data!");
          req.flash("alertStatus", "danger");
          res.redirect("/dataKendaraan");
        });
    });
};

exports.delete = function (req, res) {
  let data = {};
  res.render("", {});
};
