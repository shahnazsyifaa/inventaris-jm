/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('tabel_kode_pemakai', {
    kode_user: {
      type: DataTypes.STRING(1),
      allowNull: false,
      primaryKey: true
    },
    keterangan_user: {
      type: DataTypes.STRING(15),
      allowNull: true
    }
  }, {
    tableName: 'tabel_kode_pemakai',
    timestamps: false
  });
};
