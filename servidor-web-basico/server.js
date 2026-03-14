const http = require('http');

const PORT = 3000;


const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];


function generarPalabraAleatoria() {
  const letras = 'abcdefghijklmnopqrstuvwxyz';
  const longitud = Math.floor(Math.random() * 8) + 3;
  let palabra = '';
  for (let i = 0; i < longitud; i++) {
    palabra += letras.charAt(Math.floor(Math.random() * letras.length));
  }
  return palabra;
}


function generarNumeroAleatorio() {
  return Math.floor(Math.random() * (50000 - 10 + 1)) + 10;
}


function construirPaginaFechaHora() {
  const ahora = new Date();
  const dia = diasSemana[ahora.getDay()];
  const numeroDia = ahora.getDate();
  const mes = ahora.getMonth() + 1;
  const anio = ahora.getFullYear();
  const hora = ahora.getHours().toString().padStart(2, '0');
  const minutos = ahora.getMinutes().toString().padStart(2, '0');
  const segundos = ahora.getSeconds().toString().padStart(2, '0');

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Servidor de Fecha y Hora</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f4f4f4; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
    .card { background: #fff; padding: 40px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); text-align: center; }
    h1 { color: #333; margin-bottom: 20px; }
    .fecha { font-size: 1.4em; color: #555; }
    .hora { font-size: 2em; color: #2c3e50; margin-top: 10px; font-weight: bold; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Información Temporal del Servidor</h1>
    <p class="fecha">${dia}, ${numeroDia}/${mes}/${anio}</p>
    <p class="hora">${hora}:${minutos}:${segundos}</p>
  </div>
</body>
</html>`;
}


function construirPaginaPalabraAleatoria(palabra) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Palabra Aleatoria</title>
  <style>
    body { font-family: Arial, sans-serif; background: #eaf6f6; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
    .card { background: #fff; padding: 40px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); text-align: center; }
    h1 { color: #333; }
    .resultado { font-size: 2em; color: #16a085; margin-top: 10px; font-weight: bold; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Respuesta GET - Palabra Aleatoria</h1>
    <p class="resultado">${palabra}</p>
  </div>
</body>
</html>`;
}


function construirPaginaNumeroAleatorio(numero) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Número Aleatorio</title>
  <style>
    body { font-family: Arial, sans-serif; background: #fef9e7; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
    .card { background: #fff; padding: 40px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); text-align: center; }
    h1 { color: #333; }
    .resultado { font-size: 2em; color: #e67e22; margin-top: 10px; font-weight: bold; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Respuesta PUT - Número Aleatorio</h1>
    <p class="resultado">${numero}</p>
  </div>
</body>
</html>`;
}



const servidor = http.createServer((req, res) => {
  const metodo = req.method;
  const url = req.url;

  console.log(`[${new Date().toISOString()}] ${metodo} ${url}`);


  if (url === '/') {
    if (metodo === 'GET') {
      const html = construirPaginaFechaHora();
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(html);
    } else {
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(`Aún no estoy preparado para responder al método ${metodo}`);
    }


  } else if (url === '/random-data') {

    if (metodo === 'GET') {
      const palabra = generarPalabraAleatoria();
      const html = construirPaginaPalabraAleatoria(palabra);
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(html);

    } else if (metodo === 'PUT') {
      const numero = generarNumeroAleatorio();
      const html = construirPaginaNumeroAleatorio(numero);
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(html);

    } else {

      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(`Aún no estoy preparado para responder al método ${metodo}`);
    }


  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 - Ruta no encontrada');
  }
});

servidor.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
  console.log(`Endpoints disponibles:`);
  console.log(`  GET  /             → Fecha y hora actual`);
  console.log(`  GET  /random-data  → Palabra aleatoria`);
  console.log(`  PUT  /random-data  → Número aleatorio`);
});
