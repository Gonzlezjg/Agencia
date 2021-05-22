import { Testimonial } from "../models/Testimoniales.js";


const guardarTestimonial = async ( req, res ) => {

    //validar campos

    const { nombre, correo ,mensaje } = req.body;

    const error = [];


    if( nombre.trim() === '' ) {
        error.push( {Alerta: 'El nombre no puede estar vació'} )
    }
    if( correo.trim() === '' ) {
        error.push( {Alerta: 'El correo no puede estar vació'} )
    }
    if( mensaje.trim() === '' ) {
        error.push( {Alerta: 'El mensaje no puede estar vació'} )
    }

    if( error.length > 0 ) {

        //testimonios existentes
        const testimonios = await Testimonial.findAll();

        res.render('testimoniales', {
            pagina: 'Testimoniales',
            error,
            nombre,
            correo,
            mensaje,
            testimonios,
        });
        
    } else {

        //Almacenar en la DB

        try {

            await Testimonial.create({
                nombre,
                correo,
                mensaje,
            });

            res.redirect('/testimoniales')
        } catch (error) {
            console.log('Hubo un error:', error)
        };

    }
}

export {guardarTestimonial}