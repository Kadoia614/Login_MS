require("dotenv").config();

const auth = (request, reply, next) => {
  const apiKey = request.headers["x-api-key"];

console.log(apiKey)

  apiKey === process.env.API_KEY
    ? next()
    : reply.status(401).send("Acesso não permitido");
};

module.exports = auth;
