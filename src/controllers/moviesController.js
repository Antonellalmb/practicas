const db = require('../database/models');
const sequelize = db.sequelize;

//Otra forma de llamar a los modelos
const Movies = db.Movie;

const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll({
           // paranoid : false//para mostrar los elimidados(para el adm)
        })
            .then(movies => {
                res.render('moviesList.ejs', {movies})
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDetail.ejs', {movie});
            });
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    }, //Aqui debemos modificar y completar lo necesario para trabajar con el CRUD
    add: function (req, res) {
         return res.render('moviesAdd')  
    },
    create: async (req, res) => {
        try {
          const peliculaCreada = await db.Movie.create({
                ...req.body
            })
             console.log(peliculaCreada)
          return res.redirect('/movies/detail/'+ peliculaCreada.id)  
        } catch (error) {
            console.log(error)
            
        }
    },
    edit: async (req, res) => {
       try{const peliculaEncontrada = await db.Movie.findByPk(req.params.id)
           //throw new error("hubo un error")//para forzar el error del catch
        return res.render('moviesEdit', {movie:peliculaEncontrada}) 
        }
        catch(error){
        console.log(error)
        }
        
    },
    update: async (req,res) => {
        try {
            const peliculaEditada = await db.Movie.update({
                  ...req.body
              }, {
                where:{id:req.params.id}
              })
               console.log(peliculaEditada)
            return res.redirect('/movies')  
          } catch (error) {
              console.log(error)
        }
        
    },
    delete: async(req, res) => {
        try{
            const peliculaEncontrada = await db.Movie.findByPk(req.params.id)
            //throw new error("hubo un error")//para forzar el error del catch
         return res.render('moviesDelete', {movie:peliculaEncontrada}) 
         }
         catch(error){
         console.log(error)
         }
        
    },
    destroy: async (req, res) => {
       try {
        const peliculaEliminar = await db.Movie.destroy({
            where:{id:req.params.id}
        })
        console.log(peliculaEliminar)
        return res.redirect('/movies')
       } catch (error) {
        console.log(error)
       }
    },
    restore: async (req, res) => {
        try {
         const peliculaRestaurada = await db.Movie.restore({
             where:{id:req.params.id}
         })
         console.log(peliculaRestaurada)
         return res.redirect('/movies')
        } catch (error) {
         console.log(error)
        }

    },
}

module.exports = moviesController;