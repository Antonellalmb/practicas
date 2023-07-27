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

/*module.exports = (sequelize, dataTypes) => {
    let alias = 'Movie'; // esto debería estar en singular
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        title: {
            type: dataTypes.STRING(500),
            allowNull: false
        },
        rating: {
            type: dataTypes.DECIMAL(3, 1).UNSIGNED,
            allowNull: false
        },
        awards: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },
        release_date: {
            type: dataTypes.DATEONLY,
            allowNull: false
        },
        length: dataTypes.BIGINT(10),
        genre_id: dataTypes.BIGINT(10)
    };
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const Movie = sequelize.define(alias,cols,config);

    Movie.associate = function (models) {
        Movie.belongsTo(models.Genre, { // models.Genre -> Genres es el valor de alias en genres.js
            as: "genre",
            foreignKey: "genre_id"
        })

        Movie.belongsToMany(models.Actor, { // models.Actor -> Actors es el valor de alias en actor.js
            as: "actors",
            through: 'actor_movie',
            foreignKey: 'movie_id',
            otherKey: 'actor_id',
            timestamps: false
        })
    }

    return Movie
};*/