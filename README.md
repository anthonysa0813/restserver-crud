# RestServer con Express

1. Primero debemos de inicializar el proyecto con "npm init -y". Esto nos creará un archivo llamado package.json ( lugar donde tendremos nuestra configuración de nuestra app y dar seguimiento a sus paquetes externos)

```bash
- npm install express dotenv cors
- npm install -D nodemon
```

- Para correr necesitamos crear un main.js ( no importa si solo tiene un console.log("algún mensaje"))

```bash
 node main.js
```

2. Models (lugar donde tendremos el esqueleto de nuestra aplicación en forma de clase)

```js
import express from "express";

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 5050;

    // middlewares
    this.middlewares();
    // routes
    this.routes();
  }
  middlewares() {
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.get("/api", (req, res) => {
      res.send("cague de rii");
    });

    this.app.post("/api", (req, res) => {
      res.json({
        message: "post API",
      });
    });

    this.app.put("/api", (req, res) => {
      res.json({
        message: "put API",
      });
    });

    this.app.patch("/api", (req, res) => {
      res.json({
        message: "Patch API",
      });
    });

    this.app.delete("/api", (req, res) => {
      res.json({
        message: "delete API",
      });
    });
  }

  listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`the application listening in the port ${process.env.PORT}`);
    });
  }
}

export default Server;
```

3. Algunas deficiones

- Middlewares: son funcionalidades que le damos a nuestra aplicación para realizar una acción.
- routes: El método o archivo que se encargará de tener las rutas de nuestra aplicación.
- listne: método que se encargará de levantar el servidor.

4. CORS

- Los Cors es un middleware que exige los navegadores para que el frontend o cualquier otro usuario pueda tener permiso a ver nuestra información que mandamos desde el servidor.
- Más info: https://www.npmjs.com/package/cors

5. Lectura del body

- Primero lo que debemos hacer es agregar un nuevo middleware

```js
this.app.use(express.json());
```

- Luego en el controlador donde tenemos acceso al request y response, podemos consumir el valor del body que viene adentro del request.

```js
// controllers/user.js
const userPost = (req, res) => {
  const body = req.body;
  res.json({
    message: "post API",
    ...body,
  });
};
```

6. Segmentos (parametros en las rutas)

- Los segmentos lo podemos ver como variables en los parámetros y adentro de la request (req.params) vendrá los parámetros y express ya lo parse.

```js
// user route
router.put("/:id", userPut);

// user controller
const userPut = (req = request, res) => {
  const { id } = req.params;

  res.json({
    message: "put API",
    id,
  });
};
```

7. Query Params

- Los query params son como si fuesen unos filtros en nuestras rutas y esto van a ser opcionales. Express ya lo parsea y la podemos usar. NO TENEMOS QUE AGREGAR NADA EN NUESTRAS RUTAS.

```js
const userGet = (req = request, res = response) => {
  const query = req.query;
  // path: http://localhost:8080/api/users?name=jeje&limit=10
  res.json({
    message: "get all :D",
    ...query,
  });
};
```
