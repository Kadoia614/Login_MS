const { authUser } = require("../controller/authUser");
const { login } = require("../controller/login");

const routes = async (fastify, options) => {
    fastify.post('/login', login)
    fastify.post('/authUser', authUser)
}

module.exports = routes;