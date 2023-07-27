module.exports = (sequelize, dataTypes) => {
    let alias = 'Genre';
    let cols = {
        id :{
            type: DataType.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name : {
            type: DataType.STRING(100)
           // alowNull: false
        },
        ranking : {
            type: DataType.INTEGER.UNSIGNED
        },
        active: {
            type: DataType.TINYINT
        
        },
        created_at: {
            type: DataType.DATE
        },
        update_at:{
            type: DataType.DATE
        }
    };
    let config = {
        tableName: 'genres',
        timestamps: false
    };
    const Genre = sequelize.define(alias, cols, config)

    return Genre
}