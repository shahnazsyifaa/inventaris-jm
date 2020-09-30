/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "tabel_subkode_barang",
    {
      subkode_barang: {
        type: DataTypes.STRING(5),
        allowNull: false,
        primaryKey: true,
      },
      nama_subkode_barang: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
    },
    {
      tableName: "tabel_subkode_barang",
      timestamps: false,
    }
  );
};
