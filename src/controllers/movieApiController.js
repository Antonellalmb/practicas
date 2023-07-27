const db = require('../database/models');
const sequelize = db.sequelize;



module.exports= {
    list: async(req,res)=>{
        const result = {
            success: true,
            endPoint: '/api/movies'
        } //en esta constan aca almaceno la data que estoy enviando
        try {
            const data = await db.Movie.findAll()
            result.info = data//data que trajimos de la base de datos
            return res.json(result)
            
        } catch (error) {
            result.success = false
            result.message = 'hubo un error'        
            return res.json(result)
        }

    },
    create: async(req,res) => {
        const result = {
            success: true,
            endPoint: '/api/movies/create'
        } //en esta constan aca almaceno la data que estoy enviando
        try {
            const data = await db.Movie.create({
                ...req.body
            })
            result.info = data//data que trajimos de la base de datos
            return res.json(result)
            
        } catch (error) {
            console.log(error);
            result.success = false
            result.message = 'hubo un error'        
            return res.json(result)
        }
    },
    detail: async(req,res)=>{
        const result = {
            success: true,
            endPoint: '/api/movies/detail'
        } //en esta constan aca almaceno la data que estoy enviando
        try {
            const data = await db.Movie.findByPk(req.params.id)
            result.info = data//data que trajimos de la base de datos
            return res.json(result)
            
        } catch (error) {
            result.success = false
            result.message = 'hubo un error'        
            return res.json(result)
        }

    }
}