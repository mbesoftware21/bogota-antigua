# Bogotá Antigua

Calendario editorial ilustrado con doce historias y fotografías de archivo de Bogotá. Está hecho con **HTML, CSS y JavaScript puro**: no tiene build, dependencias ni base de datos.

![Vista previa de Bogotá Antigua](docs/preview.jpg)

## Qué incluye

- Calendario real que abre en el mes actual y resalta el día de hoy.
- Doce meses, cada uno con una historia distinta y una fotografía de archivo.
- Navegación por mes y año, botón **Hoy**, efemérides y fechas destacadas.
- Barra **Tu agenda** con acceso directo a Google Calendar y un recordatorio mensual del almanaque.
- Gestos de deslizamiento en móvil para cambiar de mes.
- Animación de cambio de mes con un giro de página antigua.
- Botón flotante **Instalar app**: instala el almanaque como PWA en Android, iPhone, iPad o escritorio, con acceso directo y modo sin conexión.
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

> Para probar la instalación PWA y el modo sin conexión hay que servir el sitio por HTTP/HTTPS (localhost sirve). Abrir `index.html` con `file://` muestra la app, pero no permite registrar el service worker.

> Las fotografías se cargan desde archivos públicos de Radio Nacional de Colombia / Señal Memoria y Wikimedia Commons, así que la primera visita necesita conexión a internet. El service worker guarda una copia autónoma para que la app instalada funcione después sin conexión.

## Estructura

```
.
├── index.html                  # aplicación completa (versión conectada)
├── manifest.webmanifest        # configuración PWA
├── sw.js                       # service worker y caché offline
├── bogota-antigua-offline.html # copia autónoma con fotos y fuentes incrustadas
├── icons/                      # iconos 192, 512, maskable y Apple Touch
├── docs/
│   └── preview.jpg             # captura de referencia
└── README.md
```

## Google Calendar

La app **no pide conectar ninguna cuenta y no guarda credenciales**. La barra **Tu agenda** ofrece:

- **Google Calendar ↗**: abre el calendario del usuario en otra pestaña.
- **Añadir mes ＋**: abre Google Calendar con un evento precargado de la historia del mes, en formato todo el día. El usuario solo confirma y guarda; Google Calendar se encarga del recordatorio y la notificación.

El evento se propone en la próxima ocurrencia de la fecha de la historia: por ejemplo, el Bogotazo el 9 de abril, el funicular el 18 de agosto o la Fiesta del Estudiante el 21 de septiembre. Para los meses sin día histórico exacto se usa el día 1. Si estás viendo el mes actual y la fecha ya pasó, se propone mañana como recordatorio.

Esto no requiere OAuth, Client ID, token ni servidor. Si en el futuro se quisiera **leer las programaciones dentro de la app**, Google sí exige un Client ID público y el consentimiento del usuario; esa integración no está incluida para mantener la app sin credenciales.

## Instalar como app

El botón flotante **Instalar app** está siempre visible abajo:

- **Android / Chrome / Edge:** abre el instalador nativo del navegador.
- **iPhone / iPad:** abre una guía con los pasos de Safari (Compartir → Añadir a pantalla de inicio). Apple no permite lanzar la instalación por código.
- **Escritorio:** Chrome y Edge muestran su diálogo de instalación; si el navegador no lo permite, aparece la guía.

Al instalar, el service worker guarda `bogota-antigua-offline.html` y lo usa como respaldo cuando no hay conexión. La app instalada se abre en modo `standalone` (sin barra del navegador) y el botón de instalación se oculta.

## Despliegue

Es un sitio estático. En Vercel basta con importar el repositorio y desplegar; no requiere framework ni comando de build.

## Créditos

Textos y fotografías de archivo: [Radio Nacional de Colombia / Señal Memoria](https://www.radionacional.co/cultura/historia-colombiana/galeria-la-bogota-de-antano-un-recorrido-por-la-capital), Colección Museo de Bogotá, Colección Banco de la República y [Wikimedia Commons](https://commons.wikimedia.org/).

Pieza editorial sin fines comerciales; las imágenes conservan sus créditos originales.
