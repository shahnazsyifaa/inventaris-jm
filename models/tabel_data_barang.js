/* jshint indent: 2 */
const moment = require("moment");
module.exports = function (sequelize, DataTypes) {
  const tabel_data_barang = sequelize.define(
    "tabel_data_barang",
    {
      nomor_barang: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      nama_barang: {
        type: DataTypes.STRING(27),
        allowNull: true,
      },
      kode_barang: {
        type: DataTypes.STRING(8),
        allowNull: true,
        references: {
          model: "tabel_kode_barang",
          key: "kode_barang",
        },
      },
      nomor_urut_barang: {
        type: DataTypes.STRING(4),
        allowNull: true,
      },
      kode_ruang: {
        type: DataTypes.STRING(4),
        allowNull: true,
      },
      tipe_barang: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      nomor_seri: {
        type: DataTypes.STRING(12),
        allowNull: true,
      },
      tahun_barang: {
        type: DataTypes.DATEONLY,
        get: function () {
          return moment
            .utc(this.getDataValue("tahun_barang"))
            .format("YYYY-MM-DD");
        },
        allowNull: true,
      },
      dari_barang: {
        type: DataTypes.STRING(16),
        allowNull: true,
      },
      kode_dokumen: {
        type: DataTypes.STRING(1),
        allowNull: true,
        references: {
          model: "tabel_dokumen",
          key: "kode_dokumen",
        },
      },
      harga_satuan_barang: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        defaultValue: "0",
      },
      kode_kondisi: {
        type: DataTypes.STRING(1),
        allowNull: true,
        references: {
          model: "tabel_kode_kondisi",
          key: "kode_kondisi",
        },
      },
      keterangan_barang: {
        type: DataTypes.STRING(25),
        allowNull: true,
      },
      nomor_inventaris_barang: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      tanggal_lelang_barang: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "tabel_data_barang",
      timestamps: false,
    }
  );

  tabel_data_barang.associate = function (models) {
    tabel_data_barang.belongsTo(models.tabel_kode_ruang, {
      foreignKey: "kode_ruang",
    });
  };

  return tabel_data_barang;
};
