# Timezone Watcher - React Dev Test

"Timezone Watcher" es un proyecto que nació de una prueba técnica. El proyecto consiste en consumir dos APIs para obtener información de zonas horarias y un listado de ellos.

Las APIs utilizadas son [TimeApi](https://timeapi.io/) y [IpGeolocation](https://ipgeolocation.io/), ambas con una capa gratuita.

El proyecto cuenta con dos páginas. La primera tiene la función de buscar zonas horarias por su nombre, ver su información y guardarlas localmente para comparar sus horarios mediante un reloj analógico. La segunda página tiene la función de ver más información de la zona horaria, así como un mapa de su ubicación.

## Screenshots

![Screenshot_12-4-2024_3737_timezone-watcher vercel app](https://github.com/DeadBryam/timezone-watcher/assets/32852885/f9e2e034-0fcc-4c1c-bed2-234e7c8f1e21)
![Screenshot_12-4-2024_383_timezone-watcher vercel app](https://github.com/DeadBryam/timezone-watcher/assets/32852885/b0ea05cd-ca2c-4ac9-9ea2-5e2e416864eb)

## Instalación

Para ejecutar este proyecto, se recomienda el uso de [Volta](https://volta.sh/).

#### Requisitos

- Node v20.x.x (Específicamente 20.12.2).
- Pnpm v8.7.6.
- Vercel

#### Pasos a seguir:

1. Clonar proyecto

   ```bash
   git clone https://github.com/DeadBryam/timezone-watcher.git
   cd timezone-watcher
   ```

2. Instalar paquetes
   ```bash
   pnpm install
   ```
3. Ejecutar proyecto

   ```bash
   pnpm dev
   ```

   \*Disclaimer: Si se desea probar el proyecto con el consumo del API (edge functions), utilizar el comando:

   ```bash
   vercel dev
   ```

4. Para ejecutar las pruebas, usar el comando
   ```bash
   pnpm test
   ```

## Despliegue

Para desplegar este proyecto, se recomienda el uso de Vercel.

- Para crear una snapshot, utilizar el siguiente comando

```bash
  vercel
```

- Para desplegar el proyecto en producción, utilizar

```bash
vercel --prod
```

## Variables de entorno

Para correr este proyecto, se necesita crear un archivo `.env` en la raíz del proyecto con la siguiente estructura:

```
NEXT_PUBLIC_TIME_API=
NEXT_PUBLIC_IP_GEOLOCATION_API=
NEXT_PUBLIC_IP_GEOLOCATION_API_KEY=
```

Como valores por defecto, se pueden usar:

```
NEXT_PUBLIC_TIME_API=https://timeapi.io/api/
NEXT_PUBLIC_IP_GEOLOCATION_API=https://api.ipgeolocation.io/timezone
NEXT_PUBLIC_IP_GEOLOCATION_API_KEY=<Generar el api key propio>
```

## Demo

El proyecto se puede encontrar en el siguiente [enlace](https://timezone-watcher.vercel.app/).

## Stack

El proyecto fue realizado con:

- Next.js: Uno de los frameworks de React más famosos actualmente.
- @formkit/auto-animate: Una forma rápida y sencilla de agregar animaciones con "una simple línea de código".
- axios: Librería para realizar solicitudes HTTP.
- lodash-es: Utilidades de JavaScript para trabajar con datos de forma eficiente.
- Leaflet: Librería para crear mapas interactivos en aplicaciones web.
- react-toastify: Biblioteca para mostrar notificaciones estilo toast.

## Estructura de carpetas

```bash
.
├── __tests__/ <-- Pruebas unitarias
├──── components/ <-- Pruebas de componentes
├──── hooks/ <-- Pruebas de páginas
├──── utils/ <-- Pruebas de utilidades
├── .husky/ <-- Configuración de Husky
├── @types/ <-- Tipos de TypeScript
├── api/ <-- Funciones de Vercel
├── components/ <-- Componentes de la aplicación
├── hooks/ <-- Hooks personalizados
├── pages/ <-- Páginas de la aplicación
├── public/ <-- Archivos estáticos
├── styles/ <-- Estilos globales
├──── components/ <-- Estilos de componentes
├──── pages/ <-- Estilos de páginas
├── utils/ <-- Utilidades, funciones y constantes
├── .env <-- Variables de entorno
```
