// info-util-process.js

console.log('Información útil del proceso:\n');

// Versión de Node.js
console.log('Versión de Node.js:', process.version);

// Plataforma del sistema operativo
console.log('Plataforma:', process.platform);

// Arquitectura del sistema
console.log('Arquitectura:', process.arch);

// Directorio actual de trabajo
console.log('Directorio actual:', process.cwd());

// Argumentos pasados al script
console.log('Argumentos del proceso:', process.argv);

// ID del proceso
console.log('ID del proceso (PID):', process.pid);

// Variables de entorno (solo algunas)
console.log('Usuario:', process.env.USER || process.env.USERNAME);
console.log('HOME:', process.env.HOME || process.env.USERPROFILE);