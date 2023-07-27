const db = require('../database/models');
const sequelize = db.sequelize;


const genresController = {
    'list': (req, res) => {
        db.Genre.findAll()
            .then(genres => {
                res.render('genresList.ejs', {genres})
            })
    },
    'detail': (req, res) => {
        //db.Genre.findByPk(req.params.id)
        db.Genre.findByPk(req.paramas.id, {include: [{association: 'peliculas'}]})
            .then(genre => {
                res.send(genre)
                //res.render('genresDetail.ejs', {genre});
            });
    }

}

module.exports = genresController;