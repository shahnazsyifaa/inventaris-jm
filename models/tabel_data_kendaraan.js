/* jshint indent: 2 */
// jshint esversion:7
module.exports = function (sequelize, DataTypes) {
  const tabel_data_kendaraan = sequelize.define(
    "tabel_data_kendaraan",
    {
      kode_lokasi: {
        type: DataTypes.STRING(6),
        allowNull: true,
        references: {
          model: "tabel_kode_lokasi",
          key: "kode_lokasi",
        },
      },
      kode_barang: {
        type: DataTypes.STRING(8),
        allowNull: true,
        references: {
          model: "tabel_kode_barang",
          key: "kode_barang",
        },
      },
      nomor_urut_kendaraan: {
        type: DataTypes.STRING(3),
        allowNull: true,
      },
      nomor_inventaris_kendaraan: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      merk_tipe_kendaraan: {
        type: DataTypes.STRING(18),
        allowNull: true,
      },
      nomor_polisi: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      nomor_bpkb: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      nomor_mesin: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      nomor_rangka: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      tahun_buat: {
        type: DataTypes.STRING(4),
        allowNull: true,
      },
      tahun_beli: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      asal: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      harga_kendaraan: {
        type: "DOUBLE",
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
      kode_user: {
        type: DataTypes.STRING(1),
        allowNull: true,
        references: {
          model: "tabel_kode_pemakai",
          key: "kode_user",
        },
      },
      keterangan_kendaraan: {
        type: DataTypes.STRING(22),
        allowNull: true,
      },
      prosen: {
        type: DataTypes.STRING(5),
        allowNull: true,
      },
      tanggal_input_kendaraan: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.fn("current_timestamp"),
      },
      nomor_kendaraan: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      tableName: "tabel_data_kendaraan",
      timestamps: false,
    }
  );

  tabel_data_kendaraan.associate = (models) => {
    tabel_data_kendaraan.belongsTo(models.tabel_kode_lokasi, {
      foreignKey: "kode_lokasi",
    });
    tabel_data_kendaraan.belongsTo(models.tabel_kode_barang, {
      foreignKey: "kode_barang",
    });
    tabel_data_kendaraan.belongsTo(models.tabel_kode_kondisi, {
      foreignKey: "kode_kondisi",
    });
    tabel_data_kendaraan.belongsTo(models.tabel_kode_pemakai, {
      foreignKey: "kode_user",
    });
  };

  return tabel_data_kendaraan;
};
