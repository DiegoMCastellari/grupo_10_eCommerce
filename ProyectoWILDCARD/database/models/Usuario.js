module.exports = (sequelize, DataTypes) => {

    let alias = 'Usuarios';
    let cols =  {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING
        },
        telefono: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        password: {
            type: DataTypes.STRING
        },
        permiso: {
            type: DataTypes.STRING(50)
        },
        estado: {
            type: DataTypes.INTEGER,
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
        tableName: 'usuarios',
    }

    const Usuarios = sequelize.define(alias, cols, config);
    Usuarios.associate = function(modelos){
        Usuarios.hasMany(modelos.Carritos, {
            as: "carritos",
            foreignKey: "id_usuario"
        });  
    } 
    return Usuarios;
}