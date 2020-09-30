/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tabel_pemeliharaan_kendaraan', {
    nomor_pemeliharaan_kendaraan: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nomor_inventaris: {
      type: DataTypes.STRING(20),
      allowNull: true,
      references: {
        model: 'tabel_data_kendaraan',
        key: 'nomor_inventaris_kendaraan'
      }
    },
    tanggal_pemeliharaan_kendaraan: {
      type: DataTypes.DATE,
      allowNull: true
    },
    by_1: {
      type: "DOUBLE",
      allowNull: true,
      defaultValue: '0'
    },
    by_2: {
      type: "DOUBLE",
      allowNull: true,
      defaultValue: '0'
    },
    by_3: {
      type: "DOUBLE",
      allowNull: true,
      defaultValue: '0'
    },
    uraian: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    tanggal_input_pemeliharaan_kendaraan: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('current_timestamp')
    }
  }, {
    tableName: 'tabel_pemeliharaan_kendaraan'
  });
};
