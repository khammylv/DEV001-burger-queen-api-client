console.log('hola mundo')

// Declaración de Variables:
const nombre = 'Camila';
console.log('Hola', nombre)
console.log("¿Qué tal", nombre, "?");
console.log(`¿Cómo han ido las vacaciones, ${nombre} ?`);

let email = "martin@imaginagroup.com"; // Variable de ámbito local
console.log(`El Email de ${nombre} es ${email}`);

const PI: number = 3.1416;

let apellidos: any = "San José"; // Tipo any hace que la variable pueda cambiar de tipo
apellidos = 3;

let error: boolean;
error = false;

console.log(`¿Hay error?: ${error}`);


// Instanciación múltiple de variables

let a:string,b:boolean,c:number; // intancia 3 variables sin valor inicial
a = "TypeScript";
b = true;
c = 8.9;

// BuiltIn Types: number, string, boolean, void, null y undefined

// Tipos más complejos

// Lista de cadenas de texto
let listaTareas: string[] = ["Tarea 1", "Tarea 2"];

// Combinación de tipos en listas
let valores: (string | number | boolean)[] = [false, "Hola", true, 56];

// Enumerados

enum Estados {
    "Completado" = "C",
    "Incompleto" = "I",
    "Pendiente" = "P"
}

enum PuestoCarrera {
    "Primero" = 1,
    "Segundo",
    "Tercero"
}

let estadoTarea: Estados = Estados.Completado;
let puestoMaraton: PuestoCarrera = PuestoCarrera.Segundo;


// Interfaces
interface Tarea {
    nombre: string,
    estado: Estados,
    urgencia: number
}

// podemos crear variables que sigan la interface Tarea

let tarea1: Tarea = {
    nombre: "Tarea 1",
    estado: Estados.Pendiente,
    urgencia: 10
}

console.log(`Tarea: ${tarea1.nombre}`);


