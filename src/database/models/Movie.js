const config = require("../config/config")
module.exports = (sequelize, dataTypes) => {
    let alias = 'Movie';
    let cols = {
        id :{
            type: DataType.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        title : {
            type: DataType.STRING(500)
           // alowNull: false
        },
        rating : {
            type: DataType.DECIMAL(3.1)
        },
        awards: {
            type: DataType.INTEGER.UNSIGNED
        },
        release_date : {
            type: DataType.DATE
        },
        length: {
            type: DataType.INTEGER.UNSIGNED
        },
        genre_id:{
            type: DataType.INTEGER.UNSIGNED
        },
        created_at: {
            type: DataType.DATE
        },
        update_at:{
            type: DataType.DATE
        }

    };
    const config = {
        tableName: 'movies', 
        timestamps: false
    /*
    let config = {
        tableName: 'movies',
        timestamps: true,
        paranoid: true,
        createdAt:'created_at' ,
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'*/
    };
    const Movie = sequelize.define(alias, cols, config)

    return Movie
}