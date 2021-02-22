
module.exports = function(sequelize, dataTypes){
    let alias = "Carrito_producto";

    let cols = {
        //configuracion de las columnas
        id : {
            type: dataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        id_carrito : {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        id_producto : {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        id_talle : {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        id_color : {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        cantidad : {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        subtotal : { 
            type: dataTypes.INTEGER,
            allowNull: true,
        },
        id_usuario : {
            type: dataTypes.INTEGER,
            allowNull: false,
        }
    }
    //configuracion de nombre de tabla
    let config = { 
            tableName :"carrito_producto",
            timestamps: false
    }


    let Carrito_producto = sequelize.define(alias, cols, config);
//explico relacion de tablas
    Carrito_producto.associate = function(models){

        Carrito_producto.belongsTo(models.Carritos, {
            as: "carrito",
            foreignKey :"id_carrito"
        });
        Carrito_producto.belongsTo(models.Productos, {
            as: "producto",
            foreignKey :"id_producto"
        });
        Carrito_producto.belongsTo(models.Talles, {
            as: "talle",
            foreignKey :"id_talle"
        });
        Carrito_producto.belongsTo(models.Colores, {
            as: "color",
            foreignKey :"id_color"
        });
    }
    return Carrito_producto;
}
