
//Hola mundo
/*let nombre = 'david'
//console.log('hola '+ nombre);
console.log(`hola ${nombre}`);

//Funcion saludo
function saludar(nombre){
    let mensaje = `Hola ${nombre}`;
    return mensaje;
}
let saludo = saludar('Fernando');
console.log(saludo);*/


//Ciclos de eventos
/*
console.log('Inicio del programa');
setTimeout(function(){
    console.log('primer Timeout');
},3000);
setTimeout(function(){
    console.log('segundo Timeout');
},0);
setTimeout(function(){
    console.log('tercer Timeout');
},0);
console.log('Fin del programa');*/




//VAR Y LET 
//var name = 'david';
//Var es para variables se puede inicializar varias veces 
//console.log(nombre);
//Let es como un final no se puede inicializar mas de una vez y crea un espacio de memoria
//nuevo para la varialbe cuando se usa dentro de un if, for o funciones
/*if(true){
    let nombre= 'jhon';
}
//templates `` 
console.log(nombre+' '+name);
console.log(`${nombre} ${name}`);*/


//DESTRUCTURACION 
/*let objecto ={
 nombre: 'wade',
 apellido: 'winston',
 poder:'Regeneracion',
 getDatos: function(){
     return `${this.nombre} ${this.apellido} -poder ${this.poder}`
 }   
};        
//let nombre = objecto.nombre;
//La Destructuracion me permite sacar los atributos de la siguiente forma, por asignaacion del nombre de los atributos 
let {nombre : primernombre, apellido, poder} = objecto;
//Se le puede asignar un nuevo nombre a la variable con :nombrenuevo
console.log(nombre, apellido ,poder);*/


//FUNCIONES DE FLECHAS
//funcion normal
/*function sumar(a, b){
return a+b;
};*/


//FUNCIONES FLECHA
let sumar = (a,b) => {return a+b;}
//funcion resumida por que el return es solo una unica linea 
//let sumar = (a,b) => a+b;

//NOTA IMPORTANTE LAS FUNCIONES FLECHAS NO PERMITEN USAR EL THIS.NOMBRE COMO EN  EL OBJETO ES MEJOR USAR LA FUNCION EN ESE CASO 
console.log(sumar(10,20));


//CALLBACKS
//
/*console.log('Inicio del programa');
setTimeout(function(){
    console.log('primer Timeout');
},3000);*/

let getUsuariosById = (id, callback) =>{ 
    let usuario={
        nombre: 'Gladys',
        id
        //id:id es lo mismo que id solo ya que lo esta resiviendo la funcion podemos oviarlo 
    }
    if(id === 20){
        callback(`El usuario con id ${id}, no existe en la BD`);
    }else{
        callback(null, usuario);
        //(err,usua)
    }
  
}
//usua es un nombre de la funcion de arriba callback funcion como un return
getUsuariosById(10, (err,usua) =>{
    if(err){
       return console.log('Error ',err);
    }
    console.log('Usuario de la base de datos', usua);
});



//CALLBACKS 2
let empleados = [{
    id:1,
    nombre: 'edilia'
},{
    id:2,
    nombre: 'gladys'
},{
    id:3,
    nombre: 'marta'
}];
let salarios=[{
    id:1,
    salario:1000
},{
    id:2,
    salario:2000
}];

//La funcion empleado resive un id, la funcion callback funciona como un retorno pero esta retorna 2 parametros el error y el objeto
let getEmpleado = (id, callback) =>{
    //empleado hace referencia a los OBJETOS del arreglo empleados y retorna el objecto con id que busca 
    let empleadoDB = empleados.find( empleado => {
        return empleado.id === id;
    })
    if(!empleadoDB){
        callback(`No existe un empleado con el ID ${id}`);
    }else{
        callback(null, empleadoDB);
        //NOTA ESTAR SEGURO QUE EL CALLBACK SE LLAME UNA VEZ 
    }
   // console.log(empleadoDB);
}
//funcion salario resive el empleado 
let getSalario = (empleado, callback) =>{
    //salariosDB hace referencia a los OBJETOS del arreglo empleados y retorna el objecto con id que busca 
    let salarioDB = salarios.find( salario => {
        return salario.id === empleado.id;
    })
    if(!salarioDB){
        callback(`No existe un salario para el ${empleado.nombre}`);
    }else{
    //    callback(null, `${empleado.nombre} , ${salarioDB.salario}`);
        callback(null,{
            nombre: empleado.nombre, 
            salario: salarioDB.salario
        });
        //NOTA ESTAR SEGURO QUE EL CALLBACK SE LLAME UNA VEZ 
    }
}
//Llamado del metosdo empleado devuelve 2 parametros err un error, emp puede ser otro nombre hacer refrencia al objeto que devuelve
getEmpleado(2, (err,emp) => {
    //Obtenemos el objeto empleado con el id si no hay error sigue el return para la ejecucion
    if(err){
        return console.log('error: ', err);
    }
    //console.log(emp);
    //llamado para el salario Mandamos el objeto empleado que obtuvimos arriba a la funcion salarios
    getSalario(emp, (err,sal) => {
        if(err){
            return console.log('error: ', err);
        }
        console.log(sal);
    });
});

let empl = empleados.find( empleado => {
    return empleado.id === 1;
});



// PROMESAS
//Las promesas tratan de solucionar lo del callback que no se acumule tanto codigo cuando hay muchas consultas
let getEmpleado2 = (id) =>{
    return new Promise( (resolve, reject) => {
        let empleadoDB = empleados.find(empleado =>{
           return  empleado.id === id;
        })
        if(!empleadoDB){
            reject(`No existe un empleado con el ID ${id}`);
        }else{
            resolve(empleadoDB);
        }

    });
}
let getSalario2 = (emp) =>{
    return new Promise ( (resolve, reject) => {
        let salario = salarios.find( salario => {
            return salario.id == emp.id;
        })
        if(!salario){
            reject(`No existe un salaria para ${emp.nombre}`);
        }else{
            resolve({
                nombre: emp.nombre, 
                salario: salario.salario
            });
        }
    });

}
//LLamdo al metodo pero usando promesas then sirve para resivir lo que devuelve la promesa despues , resive el erro
getEmpleado2(3).then( a =>{

    console.log('Empleado de la BD', a);
//Llamda la metodo para el salario 
    getSalario2(a).then( s =>{
        console.log('Su salario es',s);
        //manejo de erroes
    },(err) => {
        console.log(err);
    });
//manejo de errores
}, (err) => {
    console.log(err);
});



//PROMESAS EN CADENA 
getEmpleado2(1).then( a =>{
    //Realizamo el return de la funcion que es una promesas para poder manejar la respues abajo con un then como se ve
    return getSalario2(a);
})
.then(respuesta =>{
    console.log(`El salario de ${respuesta.nombre} es de ${respuesta.salario}`);
})
//Manejaremos el ERROR con un CATCH
.catch( err =>{
    console.log(err);
})
;



//ASYNC --- AWAIT
//Son funciones asincronas esta es la version largar de ASYNC
let getNombre2 = () =>{
    return new Promise ((resolve,reject) =>{
        //NOTA EL SETTIMEOUT NO FUNCIONA CON async() ya que sigue con el codigo no hace la espera de 3seg toca usar el 
        //codigo de la promesa original como este
        setTimeout( function() {
            resolve(' ASYNC Fernando');
           },3000);     
    });
};
// ASYNC permite usar la promesa que esta arriba de forma resumida aun tiene inconvnientes por ej: setTimeout
// otra ventja es el uso del await 
let getNombre = async() =>{
  // NOTA Generar un mensaje de error expecifico usar throw  en ves REJECT 
  // ya sea dentro de una condicion es usado en las ASYNC
   // throw new Error('No existe un nombre');
   // NOTA PARA DEVOLVER EL MENSAJE USAR return en ves de RESOLVER
     return 'Fernado';
};

// console.log(getNombre()); //Demostracion de que imprime un Promesa
//Llamado de la funcion asincrona  async nombre con su catch para manejar errores o podemos manjerlo de la otra forma el error,
getNombre().then( n => {
    console.log(n);
}//,(error) =>{console.log('Error de ASYNC',error);}
)
.catch( error => {
    console.log('Error de ASYNC',error);
})

//AWAIT SIRVE PARA ESPERAR UN RESPUESTA PARA EL CODIGO HASTA QUE OBTIENE UN RESPUESTA
//Funcion que contiene el await Nota el AWAIT solo funciona si esta DENTRO DE UN ASYNC
let saludar = async() =>{
    //el await me evita aparte de detener el codigo por la respuesta
    // me permite evitar usar el .then nombre del objeto =>{}
    let nombre = await getNombre2();
    return `Hola ${nombre}`;
}
saludar().then( a => {
    console.log(a);
});



//Llamada a los metodos getEmpleados getSalarios usando async
let getInformacion = async (id) => {
    //el await me evita aparte de detener el codigo por la respuesta
    // me permite evitar usar el .then objeto =>{}
    let empleado = await getEmpleado2(id);
    let resp = await getSalario2(empleado)
    //el console ya devuelve el texto no hay que especificar algo en la llegada
   // console.log('async y await ',resp);
    // el return ya devuevle un objeto y hay que especificarlo en la llegada, esto es para manejar o obtener los errores 
   return `${resp.nombre} tiene un salario de ${resp.salario}`
}
//asi es si estuviera usando el console
//getInformacion(2);

//asi es para  cuando la funcion tiene el return
getInformacion(10).then( (mensaje) =>{
    console.log(mensaje);
})
.catch( error => {
    console.log(error);
})
;


//async de empleado podriamos reemplazarlo arriba y deberia funcionar
/*let getEmpleado2 = async (id) =>{
    
        let empleadoDB = empleados.find(empleado =>{
           return  empleado.id === id;
        })
        if(!empleadoDB){
            throw new Error (`No existe un empleado con el ID ${id}`);
        }else{
            return(empleadoDB);
        }


}*/