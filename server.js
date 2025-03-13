const fatify = require("fastify");
const cors = require("@fastify/cors");
const fastifySwagger = require("@fastify/swagger");
const fastifySwaggerUi = require("@fastify/swagger-ui");

const routes = require("./router/routes");

const app = fatify();

app.register(cors, {
  allowOrigin: "*",
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  withCredentials: true,
});

app.register(fastifySwagger, {
  openapi: {
    openapi: "3.0.0",
    components: {
      securitySchemes: {
        JWTAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
        APIKey: {
          type: "apiKey",
          in: "header",
          name: "x-api-key",
          description: "Use a chave de API no cabeçalho como 'x-api-key'",
        },
      },
    },
    info: {
      title: "Test swagger",
      description: "API principal de consumo de microserviços",
      version: "2.0.0",
    },
    servers: [
      {
        url: "http://192.168.16.13:8001",
        description: "Development server",
      },
      {
        url: "http://192.168.16.80:8001",
        description: "prodution server",
      },
    ],
  },
});

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
  exposeRoute: true,
});

app.register(routes);

const port = 8001;

const start = () => {
  try {
    app.listen({ port, host: "0.0.0.0" });
    console.log(`Server is running on port ${port}`);
  } catch (error) {}
};

start();
