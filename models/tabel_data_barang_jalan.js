/* jshint indent: 2 */
const moment = require("moment");
module.exports = function (sequelize, DataTypes) {
  const tabel_data_barang_jalan = sequelize.define(
    "tabel_data_barang_jalan",
    {
      nama_barang_jalan: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      sebutan: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      kode_lokasi: {
        type: DataTypes.STRING(6),
        allowNull: true,
        defaultValue: "15200",
        references: {
          model: "tabel_kode_lokasi",
          key: "kode_lokasi",
        },
      },
      kode_barang: {
        type: DataTypes.STRING(8),
        allowNull: false,
        defaultValue: "070101",
        references: {
          model: "tabel_kode_barang",
          key: "kode_barang",
        },
      },
      nomor_urut_barang_jalan: {
        type: DataTypes.STRING(3),
        allowNull: false,
      },
      nomor_inventaris_barang_jalan: {
        type: DataTypes.STRING(17),
        allowNull: false,
      },
      jumlah_barang_jalan: {
        type: "DOUBLE",
        allowNull: true,
        defaultValue: "1",
      },
      luas_barang_jalan: {
        type: "DOUBLE",
        allowNull: true,
        defaultValue: "0",
      },
      dari_barang_jalan: {
        type: DataTypes.STRING(16),
        allowNull: true,
        defaultValue: "RKAP",
      },
      pengiriman_barang_jalan: {
        type: DataTypes.STRING(15),
        allowNull: true,
        defaultValue: "Pemborongan",
      },
      dokumen_barang_jalan: {
        type: DataTypes.STRING(18),
        allowNull: true,
      },
      tanggal_barang_jalan: {
        type: DataTypes.DATEONLY,
        get: function () {
          return moment
            .utc(this.getDataValue("tanggal_barang_jalan"))
            .format("YYYY-MM-DD");
        },
        allowNull: true,
      },
      harga_barang_jalan: {
        type: "DOUBLE",
        allowNull: true,
        defaultValue: "0",
      },
      kode_kondisi: {
        type: DataTypes.STRING(1),
        allowNull: true,
        defaultValue: "1",
        references: {
          model: "tabel_kode_kondisi",
          key: "kode_kondisi",
        },
      },
      keterangan_barang_jalan: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      tanah: {
        type: "DOUBLE",
        allowNull: true,
        defaultValue: "0",
      },
      hak: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      non_hak: {
        type: DataTypes.STRING(25),
        allowNull: true,
      },
      fungsi: {
        type: DataTypes.STRING(28),
        allowNull: true,
      },
      input_barang_jalan: {
        type: DataTypes.DATEONLY,
        get: function () {
          return moment
            .utc(this.getDataValue("input_barang_jalan"))
            .format("YYYY-MM-DD");
        },
        allowNull: true,
        defaultValue: sequelize.fn("current_timestamp"),
      },
      nomor_bangunan: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      tableName: "tabel_data_barang_jalan",
      timestamps: false,
    }
  );

  return tabel_data_barang_jalan;
};
