const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

//una forma de llamar a cada uno de los modelos
//cont {Movies,Genres,Actors} = require('../database/models');

//Otra forma de llamar a los modelos
const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;

const moviesController = { 
    'list': (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', {movies})
            })
           // paranoid : false//para mostrar los elimidados(para el adm)
                   
    },
    'detail': (req, res) => {
         db.Movie.findByPk(req.params.id,{include:[{association:'generos'},{association:'actores'}]})//generos igual al modelo(as: 'generos)//(as:actores)
            .then(movie => {
                res.send(movie)
            });
    /*'detail': (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDetail.ejs', {movie});
            });*/
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
    }, 
    //Aqui debemos modificar y completar lo necesario para trabajar con el CRUD
    //Aqui dispongo las rutas para trabajar con el CRUD
   /* add: function (req, res) {
         return res.render('moviesAdd') */
    add: async (req, res) => {
            try {
                const generos = await db.Genre.finAll()
                return res.render('moviesAdd', {allGenres: generos}) 
                
            } catch (error) {
                console.log(error)
                
            }
    },
    /*create: async (req, res) => {
        try {
          const peliculaCreada = await db.Movie.create({
                ...req.body
            })
             console.log(peliculaCreada)
          return res.redirect('/movies/detail/'+ peliculaCreada.id)  
        } catch (error) {
            console.log(error)
            
        }*/
    create: async (req, res) => {
            try {
                console.log(req.body)
                const actores= [{
                    id: 1,
                    apariciones: 4,
                    rating:8,
                },{
                    id: 9,
                    apariciones: 5,
                    rating:5,
                
                },{
                    id: 8,
                    apariciones: 6,
                    rating:9,
                
                }]
              const peliculaCreada = await db.Movie.create({
                    //...req.body
                    title: req.body.title,
                    rating:req.body.rating,
                    awards:req.body.awards,
                    releae_date:req.body.release_date,
                    length:req.body.length,
                    genre_id:req.body.genre_id
                })
                 console.log(peliculaCreada)
                 for(let i=0; i<actores.length;i++){
                    await peliculaCreada.addActor(actores[i].id,{through:{rating:actores[i].rating, participaciones:actores[i].apariciones}})//metodo de sequelize add+el nombre del modelo de la tabla con el que se vincula
                 }
              return res.redirect('/movies/detail/'+ peliculaCreada.id) 

            } catch (error) {
                console.log(error)
                
            }
    },
    /*edit: async (req, res) => {
       try{const peliculaEncontrada = await db.Movie.findByPk(req.params.id)
           //throw new error("hubo un error")//para forzar el error del catch
        return res.render('moviesEdit', {movie:peliculaEncontrada}) 
        }
        catch(error){
        console.log(error)
        }*/
    edit: async (req, res) => {//con edit vemos la vista, con update modificamos//
        
        try{const movies = await db.Movie.findByPk(req.params.id)
            const genre = db.Genre.findAll()
            const [peliculas, generos]= await Promise.all([movies,genre])
                //throw new error("hubo un error")//para forzar el error del catch
    
            return res.render('moviesEdit', {Movie:peliculas,allGenres:generos}) }
             
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

    }
}

module.exports = moviesController;