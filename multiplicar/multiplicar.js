//FILE SYSTEM
//Para crear archivos con los datos que lleguemos a necesitar
const fs = require('fs');
//const fs = require('express');//importaciones que no esten en node
//const fs = require('./fs')//importar archivos que creamos nosotros 

let crearlista = (base,limite) =>{
    return new Promise((resolve, reject) =>{
        if(!Number(base)){
            reject('No es un numero');
            return;//es para que si hay erro el codigo no siga
        }
    let data = ''; 
    let resultado='';
    for(let i =1; i<=10; i++){
        resultado = base * i;
        //parseInt convierte a int tiene un segundo (readix) parametro si no recibe el primer parametro por defecto es 10
        if(parseInt(resultado) <= parseInt(limite)){
            data += `${base} * ${i} = ${base *i} \n`;;
        }
    }
    resolve(`tabla: ${data}`);
    });
}
    
let crearArchivo =(base) =>{
    return new Promise((resolve, reject) =>{
        if(!Number(base)){ 
            reject('No es un numero');
            return;//es para que si hay erro el codigo no siga
        }
        let data = '';
        for(let i =1; i<=10; i++){
            data += `${base} * ${i} = ${base *i} \n`;
        }
        //Para guardar el archivo en otro carpeta nombrecarpeta/nombreArchivo
        //Si estamos en otro carpeta hay que especificar ../nombrecarpeta/nombrearchivo 
        fs.writeFile(`tablas/tabla-${base}.txt`, data, (err) =>{
            if(err) reject(err)
            else 
                resolve(`tabla-${base}.txt`);
        });   
    });
}
//IMPORTANTE
//Le mandamos el objeto a al modulo para poder usar en otra funcion en otra clase
module.exports = {
    crearArchivo,
    crearlista
}