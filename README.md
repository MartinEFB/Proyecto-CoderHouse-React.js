# TechStore — Proyecto Final React.js (CoderHouse)

E-commerce de productos tecnológicos desarrollado como proyecto final del curso de React.js de CoderHouse. Permite navegar un catálogo de productos por categoría, ver el detalle de cada uno, agregarlos a un carrito de compras y finalizar la compra generando una orden en Firebase.

## Tecnologías utilizadas

- **React** + **Vite**
- **React Router DOM** — ruteo entre páginas
- **Material UI (MUI)** — componentes y sistema de diseño
- **Firebase**
  - **Firestore** — base de datos de productos y órdenes
  - **Analytics**
- **Context API** — manejo del estado global del carrito
- **localStorage** — persistencia del carrito entre sesiones

## Características

- Catálogo de productos filtrable por categoría, consumido en tiempo real desde Firestore.
- Detalle de producto con control de stock: si un producto está agotado, se oculta la opción de compra.
- Carrito de compras (agregar, quitar, vaciar) persistido en `localStorage`.
- Checkout con formulario de datos del comprador (nombre, apellido, DNI, dirección fiscal) y validaciones.
- Al confirmar la compra:
  - se genera una orden en la colección `orders` de Firestore con los datos del comprador, los productos, el total y la fecha;
  - se actualiza el stock de cada producto comprado en la colección `items` mediante una escritura por lote (`writeBatch`);
  - se muestra el número de orden generado como comprobante.
- Configuración de Firebase manejada mediante variables de entorno, sin credenciales hardcodeadas en el código.

## Estructura del proyecto

```
src/
├── components/
│   ├── Cart/              # CartContext, CartProvider, CartItem, CartWidget
│   ├── Containers/        # ItemListContainer, ItemsDetailContainer, CheckoutContainer
│   ├── Checkout/           # Checkout (presentacional)
│   ├── Item/               # Item, ItemList, ItemDetail, ItemCount
│   └── Nav/                # NavBar
├── firebase/
│   └── firebase.jsx        # Inicialización de Firebase (lee variables de entorno)
├── pages/
│   ├── Home/
│   ├── Catalog/
│   ├── ProductDetail/
│   ├── Cart/
│   ├── Checkout/
│   └── NotFound/
├── theme.js                # Tema global de Material UI
├── App.jsx                 # Definición de rutas
└── main.jsx                 # Punto de entrada: Providers (Theme, Cart) y BrowserRouter
```

## Instalación

1. Cloná el repositorio:
   ```bash
   git clone https://github.com/MartinEFB/Proyecto-CoderHouse-React.js/tree/main
   cd Proyecto-CoderHouse-Reactjs
   ```
2. Instalá las dependencias:
   ```bash
   npm install
   ```
3. Configurá las variables de entorno (ver sección siguiente).
4. Corré el proyecto en modo desarrollo:
   ```bash
   npm run dev
   ```

## Variables de entorno

El proyecto usa variables de entorno para no exponer la configuración de Firebase en el código fuente. Creá un archivo `.env` en la raíz del proyecto con las siguientes claves (podés basarte en `.env.example`):

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

Los valores se obtienen desde la configuración del proyecto en la [consola de Firebase](https://console.firebase.google.com/). El archivo `.env` está excluido del control de versiones mediante `.gitignore`.

> Es necesario reiniciar el servidor de desarrollo (`npm run dev`) después de crear o modificar el `.env` para que Vite tome los nuevos valores.

## Modelo de datos en Firestore

**Colección `items`** — productos del catálogo:
```json
{
  "title": "string",
  "description": "string",
  "price": "number",
  "stock": "number",
  "category": "string",
  "img": "string (url)"
}
```

**Colección `orders`** — órdenes generadas por el checkout:
```json
{
  "buyer": {
    "nombre": "string",
    "apellido": "string",
    "dni": "string",
    "direccion": "string"
  },
  "items": [
    { "id": "string", "title": "string", "price": "number", "quantity": "number", "subtotal": "number" }
  ],
  "total": "number",
  "date": "timestamp"
}
```

## Scripts disponibles

| Comando           | Descripción                                   |
|--------------------|------------------------------------------------|
| `npm run dev`      | Levanta el servidor de desarrollo con Vite     |
| `npm run build`    | Genera el build de producción                  |
| `npm run preview`  | Sirve el build de producción localmente        |

## Autor

Proyecto desarrollado como entrega final del curso de React.js de CoderHouse, por el alumno Martin Emanuel Flores Bravo, Comision: 93445.
