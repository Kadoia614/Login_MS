const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.verifyToken = (token) => {
  return new Promise((resolve) => {
    if (!token) {
      throw { status: 401 , message: "Sem token fornecido" };
    }

    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      if (err) {
        throw { status: 401 , message: "Incorrect Token." };
      }
      return resolve({ auth: true, role: decoded.role, id: decoded.id });
    });
  });
};