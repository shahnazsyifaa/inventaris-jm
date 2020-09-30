const express = require("express");
const router = express.Router();

const controllerHome = require("../controllers/controllerHome.js");
const controllerPemeliharaanAlat = require("../controllers/controllerPemeliharaanAlat");
const controllerDataBangunan = require("../controllers/controllerDataBangunan");
const controllerDataKendaraan = require("../controllers/controllerDataKendaraan");
const controllerPemeliharaanKendaraan = require("../controllers/controllerPemeliharaanKendaraan");
const controllerKendaraan = require("../controllers/controllerKendaraan.js");
const controllerDataBarangJalan = require("../controllers/controllerDataBarangJalan.js");
const controllerKodeBarang = require("../controllers/controllerKodeBarang.js");
const controllerKodeRuang = require("../controllers/controllerKodeRuang.js");
const controllerKodeLokasi = require("../controllers/controllerKodeLokasi.js");
const controllerDataTransaksi = require("../controllers/controllerDataTransaksi.js");

router.get("/", controllerHome.index);
router.get("/login", controllerHome.login);

// test untuk data bangunan
router.get("/barangJalan", controllerDataBarangJalan.index);

// test untuk data kendaraan
router.get("/kendaraan", controllerKendaraan.index);

// untuk data kode barang
router.get("/viewKodeBarang", controllerKodeBarang.index);
router.post("/viewKodeBarang/create", controllerKodeBarang.create);
router.get("/viewKodeBarang/:id/edit", controllerKodeBarang.edit);
router.post("/viewKodeBarang/:id/edit", controllerKodeBarang.goEdit);

// untuk data kode lokasi
router.get("/viewKodeLokasi", controllerKodeLokasi.index);
router.post("/viewKodeLokasi/create", controllerKodeLokasi.create);
router.get("/viewKodeLokasi/:id/edit", controllerKodeLokasi.edit);
router.post("/viewKodeLokasi/:id/edit", controllerKodeLokasi.goEdit);

// untuk data kode ruang
router.get("/viewKodeRuang", controllerKodeRuang.index);
router.post("/viewKodeRuang/create", controllerKodeRuang.create);
router.get("/viewKodeRuang/:id/edit", controllerKodeRuang.edit);
router.post("/viewKodeRuang/:id/edit", controllerKodeRuang.goEdit);

// kelarin fiturnya
router.get("/dataTransaksi", controllerDataTransaksi.index);
router.get("/dataTransaksi/", controllerDataTransaksi.index);
router.post("/dataTransaksi/create", controllerDataTransaksi.create);
router.get("/dataTransaksi/:id/edit", controllerDataTransaksi.edit);
router.post("/dataTransaksi/:id/edit", controllerDataTransaksi.goEdit);
router.get("/dataTransaksi/delete/:id", controllerDataTransaksi.delete);

router.get("/pemeliharaanAlat", controllerPemeliharaanAlat.index);

// kelarin fiturnya
router.get("/dataBangunan", controllerDataBangunan.index);
router.get("/dataBangunan/", controllerDataBangunan.index);
router.post("/dataBangunan/create", controllerDataBangunan.create);
router.get("/dataBangunan/:id/edit", controllerDataBangunan.edit);
router.post("/dataBangunan/:id/edit", controllerDataBangunan.goEdit);
// router.get("/dataBangunan/delete/:id", controllerdataBangunan.delete);

// kelarin fiturnya
router.get("/dataKendaraan", controllerDataKendaraan.index);
router.get("/dataKendaraan/", controllerDataKendaraan.index);
router.post("/dataKendaraan/create", controllerDataKendaraan.create);
router.get("/dataKendaraan/:id/edit", controllerDataKendaraan.edit);
router.post("/dataKendaraan/:id/edit", controllerDataKendaraan.goEdit);

// kelarin fiturnya
router.get("/pemeliharaanKend", controllerPemeliharaanKendaraan.index);

module.exports = router;
