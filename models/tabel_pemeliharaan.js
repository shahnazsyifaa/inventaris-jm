/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tabel_pemeliharaan', {
    nomor_pemeliharaan: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nomor_inventaris: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    tanggal_pemeliharaan: {
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
    tanggal_input_pemeliharaan: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('current_timestamp')
    }
  }, {
    tableName: 'tabel_pemeliharaan'
  });
};
