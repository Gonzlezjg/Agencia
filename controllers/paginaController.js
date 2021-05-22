import { Viajes } from '../models/Viajes.js';
import { Testimonial } from '../models/Testimoniales.js'


const paginaInicio =  async(req , res) => { //req- lo que enviamos y res- lo que recibimos

    //Consultar 3 viajes del modelo viaje para mostrar en el inicio
    const promiseDB = [];
    promiseDB.push( Viajes.findAll({ limit:3 }) )
    promiseDB.push( Testimonial.findAll({ limit:3 }) )

    try {
        const resultado = await Promise.all( promiseDB )


        res.render('inicio', {
        pagina: 'Inicio',
        clase: 'home',
        viajes: resultado[0],
        testimonios: resultado[1],
    });

    } catch (error) {
        console.log('Hubo un error', error)
    }
}

const paginaNosotros =  (req , res) => { //req- lo que enviamos y res- lo que recibimos
    res.render('nosotros', {
        pagina: 'Nosotros'
    });
}

const paginaViajes = async  (req , res) => { //req- lo que enviamos y res- lo que recibimos

    const viajes = await Viajes.findAll();
    console.log(viajes)

    res.render('viajes', {
        pagina: 'Próximos viajes',
        viajes,
    });
}

const testimoniales =  async(req , res) => { //req- lo que enviamos y res- lo que recibimos

    try {
        const testimonios = await Testimonial.findAll();
        

        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimonios
        });

    } catch (error) {
        console.log('Hubo un error', error);
    }

}

const paginaDetalleViaje = async ( req, res ) => { //req- lo que enviamos y res- lo que recibimos} 

    const { slug } = req.params;

    try {
        const viaje = await Viajes.findOne({ where: {slug} })

        res.render('viaje', {
            pagina: 'Información Viaje',
            viaje
        })
    } catch (error) {
        console.log('Ha ocurrido un error!', error)
    }

}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    testimoniales,
    paginaDetalleViaje
} 