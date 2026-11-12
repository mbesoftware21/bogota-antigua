# Bogotá Antigua

Calendario editorial ilustrado con doce historias y fotografías de archivo de Bogotá. Está hecho con **HTML, CSS y JavaScript puro**: no tiene build, dependencias ni base de datos.

![Vista previa de Bogotá Antigua](docs/preview.jpg)

## Qué incluye

- Calendario real que abre en el mes actual y resalta el día de hoy.
- Doce meses, cada uno con una historia distinta y una fotografía de archivo.
- Navegación por mes y año, botón **Hoy**, efemérides y fechas destacadas.
- Animación de cambio de mes con un giro de página antigua.
- Láminas ampliables, créditos, enlace a la fuente e impresión.
- Diseño responsive para celulares, tabletas, laptops y pantallas horizontales.
- Carga por demanda: primero la lámina del mes y luego el resto en segundo plano.
- Respeta `prefers-reduced-motion` para quienes prefieren menos animaciones.

## Cómo verlo

Abre `index.html` directamente en el navegador, o levanta un servidor local:

```bash
python3 -m http.server 8000
```

Luego visita `http://localhost:8000`.

> Las fotografías se cargan desde archivos públicos de Radio Nacional de Colombia / Señal Memoria y Wikimedia Commons, así que la primera visita necesita conexión a internet. Después el navegador las conserva en caché.

## Estructura

```
.
├── index.html      # aplicación completa
├── docs/
│   └── preview.jpg # captura de referencia
└── README.md
```

## Despliegue

Es un sitio estático. En Vercel basta con importar el repositorio y desplegar; no requiere framework ni comando de build.

## Créditos

Textos y fotografías de archivo: [Radio Nacional de Colombia / Señal Memoria](https://www.radionacional.co/cultura/historia-colombiana/galeria-la-bogota-de-antano-un-recorrido-por-la-capital), Colección Museo de Bogotá, Colección Banco de la República y [Wikimedia Commons](https://commons.wikimedia.org/).

Pieza editorial sin fines comerciales; las imágenes conservan sus créditos originales.
