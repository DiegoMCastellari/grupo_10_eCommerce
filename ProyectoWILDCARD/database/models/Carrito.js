


module.exports = (sequelize, DataTypes) => {

    let alias = 'Carritos';
    let cols =  {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_usuario: {
            type: DataTypes.INTEGER
        },
        estado: {
            type: DataTypes.STRING(50)
        },
        forma_pago: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        forma_envio: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        }
    };
    let config = {
        tableName: 'carritos',
    }

    const Carritos = sequelize.define(alias, cols, config);
    Carritos.associate = function(modelos){
        Carritos.belongsTo(modelos.Usuarios, {
            as: "usuarios",
            foreignKey: "id_usuario"
        });
        Carritos.belongsToMany(modelos.Productos, {
            as: "productos",
            through: "carrito_producto",
            foreignKey: "id_carrito",
            otherKey: "id_producto",
            timestamps: false
        });
        Carritos.hasMany(modelos.Carrito_producto, {
            as: "carrito_productos",
            foreignKey: "id"
        });
    } 
    return Carritos;
}