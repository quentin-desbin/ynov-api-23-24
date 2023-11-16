const { DataTypes } = require('sequelize')

module.exports = (instance) => {
    return instance.define('review', {
        note: {
            type: DataTypes.INTEGER,
        },
        userId: {
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        bookId: {
            primaryKey: true,
            type: DataTypes.INTEGER
        }
    }, {
        timestamps: false
    })
}