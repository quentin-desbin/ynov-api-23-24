const { DataTypes } = require('sequelize')

module.exports = (instance) => {
    return instance.define('review', {
        note: {
            type: DataTypes.INTEGER,
        },
        // Needed to force primaryKey
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