/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('tabel_kode_kondisi', {
    kode_kondisi: {
      type: DataTypes.STRING(1),
      allowNull: false,
      primaryKey: true
    },
    kondisi: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    uraian: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    tableName: 'tabel_kode_kondisi',
    timestamps: false
  });
};
