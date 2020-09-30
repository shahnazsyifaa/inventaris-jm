/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('tabel_dokumen', {
    kode_dokumen: {
      type: DataTypes.STRING(1),
      allowNull: false,
      primaryKey: true
    },
    nama_dokumen: {
      type: DataTypes.STRING(3),
      allowNull: true
    }
  }, {
    tableName: 'tabel_dokumen',
    timestamps: false
  });
};
