/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "tabel_kode_barang",
    {
      kode_barang: {
        type: DataTypes.STRING(8),
        allowNull: false,
        primaryKey: true,
      },
      nama_barang: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      satuan: {
        type: DataTypes.STRING(4),
        allowNull: true,
      },
      subkode_barang: {
        type: DataTypes.STRING(5),
        allowNull: true,
        references: {
          model: "tabel_subkode_barang",
          key: "subkode_barang",
        },
      },
    },
    {
      tableName: "tabel_kode_barang",
      timestamps: false,
    }
  );
};
