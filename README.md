# Desafío Tienda de Joyas

API REST desarrollada con Node.js, Express y PostgreSQL para gestionar consultas de inventario de una tienda de joyas llamada **My Precious Spa**.

El proyecto permite consultar joyas aplicando límite de resultados, paginación, ordenamiento, filtros y estructura HATEOAS.

## Tecnologías utilizadas

- Node.js
- Express
- PostgreSQL
- pg
- pg-format
- Nodemon

## Estructura del proyecto

```plaintext
desafioTiendadeJoyas/
│
├── connection.js
├── consultas.js
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## Base de datos

Para ejecutar el proyecto, primero se debe crear la base de datos `joyas` en PostgreSQL.

```sql
CREATE DATABASE joyas;

\c joyas;

CREATE TABLE inventario (
  id SERIAL,
  nombre VARCHAR(50),
  categoria VARCHAR(50),
  metal VARCHAR(50),
  precio INT,
  stock INT
);

INSERT INTO inventario values
(DEFAULT, 'Collar Heart', 'collar', 'oro', 20000 , 2),
(DEFAULT, 'Collar History', 'collar', 'plata', 15000 , 5),
(DEFAULT, 'Aros Berry', 'aros', 'oro', 12000 , 10),
(DEFAULT, 'Aros Hook Blue', 'aros', 'oro', 25000 , 4),
(DEFAULT, 'Anillo Wish', 'aros', 'plata', 30000 , 4),
(DEFAULT, 'Anillo Cuarzo Greece', 'anillo', 'oro', 40000 , 2);
```

## Instalación

1. Clonar el repositorio

```bash
git clone https://github.com/Konscio/desafio-tienda-de-joyas.git
```

2. Ingresar a la carpeta del proyecto

```bash
cd desafio-tienda-de-joyas
```

3. Instalar dependencias

```bash
npm install
```

4. Ejecutar el servidor

```bash
npm run dev
```

También se puede ejecutar con:

```bash
node server.js
```

El servidor se levanta en:

```plaintext
http://localhost:3000
```

## Endpoints disponibles

### Obtener joyas con HATEOAS

```http
GET /joyas
```

Esta ruta permite consultar las joyas usando límite, paginación y ordenamiento.

Parámetros disponibles por query string:

| Parámetro | Descripción                                      |
| --------- | ------------------------------------------------ |
| limits    | Limita la cantidad de joyas devueltas por página |
| page      | Define la página solicitada                      |
| order_by  | Ordena los resultados por campo y dirección      |

Ejemplo:

```http
GET /joyas?limits=3&page=2&order_by=stock_ASC
```

Respuesta esperada:

```json
{
  "totalJoyas": 3,
  "stockTotal": 19,
  "results": [
    {
      "name": "Anillo Wish",
      "href": "/joyas/joya/5"
    },
    {
      "name": "Collar History",
      "href": "/joyas/joya/2"
    },
    {
      "name": "Aros Berry",
      "href": "/joyas/joya/3"
    }
  ]
}
```

### Filtrar joyas

```http
GET /joyas/filtros
```

Esta ruta permite filtrar joyas según precio mínimo, precio máximo, categoría y metal.

Parámetros disponibles por query string:

| Parámetro  | Descripción                                             |
| ---------- | ------------------------------------------------------- |
| precio_min | Filtra joyas con precio mayor o igual al valor indicado |
| precio_max | Filtra joyas con precio menor o igual al valor indicado |
| categoria  | Filtra joyas por categoría                              |
| metal      | Filtra joyas por tipo de metal                          |

Ejemplo:

```http
GET /joyas/filtros?precio_min=25000&precio_max=30000&categoria=aros&metal=plata
```

Respuesta esperada:

```json
[
  {
    "id": 5,
    "nombre": "Anillo Wish",
    "categoria": "aros",
    "metal": "plata",
    "precio": 30000,
    "stock": 4
  }
]
```

## Middleware

El proyecto implementa un middleware que genera un reporte en consola cada vez que se realiza una consulta a una ruta.

Ejemplo:

```plaintext
Se realizó una consulta a la ruta: GET /joyas
```

## Manejo de errores

Las rutas utilizan bloques `try/catch` para capturar posibles errores durante la ejecución de consultas SQL o durante la lógica del servidor.

## Autor

Sebastián Cabrera
