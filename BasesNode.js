//IMPORTANTE USAREMOS EL MODULO PARA USAR UNOS OBJETOS GLOBALES
//REVISAR EL ARCHIVO DE MULTIPLICAR
//Usar {} destructuracion no Funciono
//Process.argv las notas estan abajo
const multiplicar = require('./multiplicar/multiplicar');



//PAQUETE YARGS PERMITE MANEJAR LOS PARAMETROS DE LA CONSOLA DE MEJOR MANERA --base=5
//node asd.js listar --base 5
/*const argv2 = require('yargs').argv;*/
const argv2 = require('yargs')
//Permite colocar la ayuda y manejar otros parametros que vaya a recibir --base 5 o -b 5 
//Recibe nombre, mensaje, objetos (que podemos configurar)
.command('listar', 'Imprime en consola la tabla de multiplicar',{
    base: {
        demand: true, //comando obligatorio
        alias:'b'
    },
    limite:{
        alias:'l',
        default: 10
    }
})
.command('crear', 'Genera un archivo con la tabla multiplicar',{
    base: {
        demand: true,
        alias:'b'
    },
    limite:{
        alias:'l',
        default: 10
    }
})
.help()
.argv; //esto es para no tener que hacer argv2.argv y solo llamarlo argv2 


//IMPORTANTE VERSION RESUMIDAD
//REVISAR CONF PARA VER YARGS MAS RESUMIDO, argv(nombre de la funcion ) la usamoas al final
// es para NO tener que llamar la funcion asi argv3.argv (objeto,funcion del objeto) 
// argv3.base argv3.limite
const argv3 = require('./conf/yargs').argv;


//COMANDOS
//argv son argumentso de la consola  _ es para hacer referencia al arreglo que contiene los comandos que escribimos en la consola 
let comando = argv2._[0];
switch(comando){

    case 'listar':
    //Aqui esta usando argv3 es la version optimisada de yargs
    multiplicar.crearlista(argv3.base,argv3.limite)
    .then(tabla => console.log(`Tabla ${argv2.base} \n ${tabla}`))
    .catch(error =>{
        console.log(error);
    });
    console.log('Comando Listar');
    break;

    case 'crear':
    multiplicar.crearArchivo(argv2.base)
    .then(archivos => console.log(`Archivo Creado ${archivos}`))
    .catch( error => {
    console.log(error);
    });
    console.log('Comando crear');
    break;

    default:
    console.log('Comando no reconocido');
}



//ARGUMENTOS ESCIRIBIR PARAMETRO DESDE LA CONSOLA Y OBTENER ESOS PARAMETRO
//process Es para configurar el archivos node 
//process.argv Es para mandar unos argumentos node asd.js --base=5
let argv = process.argv;
//los argumentos los almacena en un arreglo NOTA ya tiene 2 argumentos predeterminados
/*let parametros = argv[2];*/
//split permite separa datos separamos lo que esta antes y despues del =
//el [1] sirve para tomar segundo valor del dato que separamos ya que los datos se guardan en un arreglo
/*let base = parametros.split('=')[1];*/
//console.log(process.argv);
/*console.log(base);*/


//IMPRECIONES
/*console.log(argv);*/
/*console.log(argv2.base);*/
console.log(argv2); 


//OBJETO GLOBAL DEL MODULO LA BASE SE OBTUVO ARRIBA TOMANDO EL PARAMETRO DESDE LA CONSOLOA
/*multiplicar.crearArchivo(base)
.then(archivos => console.log(`Archivo Creado ${archivos}`))
.catch( error => {
    console.log(error);
})
;*/