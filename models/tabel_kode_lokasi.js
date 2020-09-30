/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const tabel_kode_lokasi = sequelize.define('tabel_kode_lokasi', {
    kode_lokasi: {
      type: DataTypes.STRING(6),
      allowNull: false,
      primaryKey: true
    },
    unit_kerja: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    alias: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'tabel_kode_lokasi',
    timestamps: false
  });

  // tabel_kode_lokasi.associate = function (models) {
  //   tabel_kode_lokasi.hasMany(models.tabel_kode_ruang);
  // };

  return tabel_kode_lokasi;
};
