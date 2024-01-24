const { DataTypes } = require('sequelize') // Permet de définir des types de colonnes

module.exports = (instance) => {
    // Le nom de l'instance n'a pas de "s" !
    return instance.define('user', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING,
        }
    }, {
        timestamps: false
    })
}