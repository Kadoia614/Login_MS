const jwt = require("jsonwebtoken");
require("dotenv").config();

const bcrypt = require("bcryptjs"); // Para comparação de senha criptografada
const USER_API = require("../service/user_api");

exports.login = async (request, reply) => {
  const { email, pwd } = request.body;
  try {
    const response = await USER_API.post(`/user/login`, {
      email: email,
    });

    const user = response.data;

    const validPassword = await bcrypt.compare(pwd, user.password);

    if (!validPassword && pwd != user.password) {
      throw { message: "Email ou senha incorretos", status: 401 };
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, role: user.role },
      process.env.SECRET_KEY
    );

    let payload = {
      firstLogin: user.firstLogin,
      message: "Login bem sucedido",
      name: user.name,
      token: token,
      ip: request.ip,
      scopo: user.role,
    };

    reply.status(200).send(payload);
  } catch (error) {
    return reply
      .status(error.status || 500)
      .send(error || "Erro interno no servidor");
  }
};
