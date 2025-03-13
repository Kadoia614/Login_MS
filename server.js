const fatify = require("fastify");
const cors = require("@fastify/cors");
const swagger = require("@fastify/swagger");
const swaggerUi = require("@fastify/swagger-ui");

const routes = require("./router/routes");

const app = fatify();

app.register(cors, {
  allowOrigin: "*",
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  withCredentials: true,
});

app.register(swagger, {
  openapi: "3.0.0",
  info: {
    title: "Fastify Login API",
    description: "API for user login",
    version: "1.0.0",
  },
  servers: [
    {
      url: "192.168.16.13:8003",
      desciption: "Developer server",
    },
    {
      url: "192.168.16.80:8003",
      desciption: "Prodution server",
    },
  ],
});

app.register(swaggerUi,{
    routePrefix: "/docs",
    expouseRoute: true,
})

app.register(routes)

const port = 8003;

const start = ()=> {
    try {
        app.listen({port, host: '0.0.0.0'})
        console.log(`Server is running on port ${port}`)
    } catch (error) {
        
    }
}


start ()