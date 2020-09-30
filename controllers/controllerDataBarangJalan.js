// jshint esversion:7

var exports = module.exports = {};
const models = require('../models');
let Op = require("sequelize").Op;

exports.index = (req, res) => {
    let page = req.query.page || 1;
    let offset = 0;
    if (page > 1) {
        offset = ((page - 1) * 10) + 1;
    }
    models.tabel_data_barang_jalan
        .findAndCountAll({
            limit: 10,
            offset: offset,
            order: [['nomor_inventaris_barang_jalan', 'ASC']]
        })
        .then((result) => {
            getLokasi(result);
        });

    const getLokasi = (result) => {
        models.tabel_kode_lokasi
            .findAndCountAll()
            .then((kodeLokasi) => {
                getKodeBarang(result, kodeLokasi);
            });
    };

    const getKodeBarang = (result, kodeLokasi) => {
        models.tabel_kode_barang
            .findAndCountAll()
            .then((kodeBarang) => {
                getKondisi(result, kodeLokasi, kodeBarang);
            });
    };
    const getKondisi = (result, kodeLokasi, kodeBarang) => {
        models.tabel_kode_kondisi
            .findAndCountAll()
            .then((kodeKondisi) => {
                getData(result, kodeLokasi, kodeBarang, kodeKondisi);
            });
    };

    const getData = (result, kodeLokasi, kodeBarang, kodeKondisi) => {
        const totalPage = Math.ceil(result.count / 10);
        const pagination = { totalPage: totalPage, currentPage: page };
        res.render('barangJalan', {
            title: 'Tabel Barang Jalan',
            barangJalan: result.rows,
            lokasi: kodeLokasi,
            barang: kodeBarang,
            kondisi: kodeKondisi,
            pagination: pagination
        });
    };
};

exports.create = function (req, res) {
    let data = {
        nama_barang_jalan: '',
        sebutan: '',
        kode_lokasi: '',
        kode_barang: '',
        nomor_urut_barang_jalan: '',
        nomor_inventaris_barang_jalan: '',
        jumlah_barang_jalan: '',
        luas_barang_jalan: '',
        dari_barang_jalan: '',
        pengiriman_barang_jalan: '',
        dokumen_barang_jalan: '',
        tanggal_barang_jalan: '',
        harga_barang_jalan: '',
        kode_kondisi: '',
        keterangan_barang_jalan: '',
        tanah: '',
        hak: '',
        non_hak: '',
        fungsi: '',
        input_barang_jalan: ''
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