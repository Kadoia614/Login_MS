const { verifyToken } = require("../utils/verifyToken");
const USER_API = require("../service/user_api");

exports.authUser = async (request, reply) => {
  let token = request.body.token;

  try {
    let user = await verifyToken(token);

    let response = await USER_API.get(`/user/${user.id}`);

    let verifyUser = response.data;

    if (!verifyUser) {
      const error = new Error("User not found");
      error.status = 401;
      throw error;
    }

    reply
      .status(200)
      .send({
        message: "Usuário authenticado",
        scopo: verifyUser.role,
        user: user,
      });
  } catch (error) {
    throw error;
  }
};
