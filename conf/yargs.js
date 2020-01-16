//CONFIGURACIONS
const opts = {
    base: {
        demand: true,
        alias:'b'
    },
    limite:{
        alias:'l',
        default: 10
    }
};


//PAQUETE YARGS PERMITE MANEJAR LOS PARAMETROS DE LA CONSOLA DE MEJOR MANERA --base=5
//node asd.js listar --base 5
/*const argv2 = require('yargs').argv;*/
const argv = require('yargs')
//Permite colocar la ayuda y manejar otros parametros que vaya a recibir --base 5 o -b 5 
//Recibe nombre, mensaje, objetos (que podemos configurar)
.command('listar', 'Imprime en consola la tabla de multiplicar',opts)
.command('crear', 'Genera un archivo con la tabla multiplicar',opts)
.help()
.argv;

module.exports = {
    argv
}