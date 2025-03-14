require("dotenv").config();

const auth = (request, reply, next) => {
  const apiKey = request.headers["x-api-key"];
  
  if (apiKey !== process.env.API_KEY) {
    const error = new Error('not authorized');

    error.status = 401;
    throw error;
  }
  next();
};

module.exports = auth;