import dotenv from 'dotenv'
import express from 'express';
import router from './routes/index.js'
import db from './config/db.js'

dotenv.config({ path: 'variables.env' })

const app = express();

//conectar la DB
db.authenticate()
    .then( () => console.log('DB conectada'))
    .catch((e) => console.log(e,'error'))



//Habilitar pug
app.set('view engine', 'pug');

//Obtener año actual
app.use( (req,res, next) => {

    const year = new Date();

    res.locals.actualYear = year.getFullYear();

    next();
} )

//Agregar body parser para leer formularios
app.use(express.urlencoded({extended: true}));

//Habilitar carpeta public
app.use(express.static('public'))

//Agregamos router
app.use('/', router)

//puerto y host
const host = process.env.HOST ||'0.0.0.0';
//definir puerto
const port = process.env.PORT || 4000;

app.listen( port, host, () => {
    console.log(`Servidor funcionando en el puerto ${port}`)
})
