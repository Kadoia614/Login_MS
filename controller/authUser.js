const { verifyToken } = require("../utils/verifyToken");
const USER_API = require("../service/user_api");

exports.authUser = async (request, reply) => {
  let token = request.body.token;

  try {
    let user = await verifyToken(token);
    let response = await USER_API.get(`/user/${user.id}`);

    let verifyUser = response.data;

    if (!verifyUser) {
      throw { message: "Unauthorized", status: 401 };
    }

    reply
      .status(200)
      .send({ message: "Usuário authenticado", scopo: verifyUser.role, user: user });
  } catch (error) {
    return reply.status(error.status || 500).send({
      message: error.message || "Erro interno no servidor",
      error: error,
    });
  }
};
