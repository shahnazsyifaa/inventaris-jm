/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const tabel_kode_ruang = sequelize.define('tabel_kode_ruang', {
    kode_ruang: {
      type: DataTypes.STRING(4),
      allowNull: false,
      primaryKey: true
    },
    ruang: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    kode_lokasi: {
      type: DataTypes.STRING(6),
      allowNull: true,
      references: {
        model: 'tabel_kode_lokasi',
        key: 'kode_lokasi'
      }
    },
    unit_kerja: {
      type: DataTypes.STRING(35),
      allowNull: true
    }
  }, {
    tableName: 'tabel_kode_ruang',
    timestamps: false
  });

  tabel_kode_ruang.associate = function (models) {
    tabel_kode_ruang.belongsTo(models.tabel_kode_lokasi, { foreignKey: 'kode_lokasi' });
    // tabel_kode_ruang.hasMany(models.tabel_data_barang);
  };

  return tabel_kode_ruang;
};
