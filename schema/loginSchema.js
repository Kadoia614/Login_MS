const loginSchema = {
  description: "Verificação de usuário",
  tags: ["Auth"],
  headers: {
    required: ["x-api-key"],
    type: "object",
    properties: { ["x-api-key"]: { type: "string" } },
  },
  security: [{ APIKey: [] }],
  body: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: {
        type: "string",
        // format: "email",
      },
      password: {
        type: "string",
        minLength: 6,
        maxLength: 255,
      },
    },
  },

  response: {
    200: {
      description: "Verificação bem sucedido",
      type: "object",
      properties: {
        message: { type: "string", example: "Login bem sucedido" },
        firstLogin: { type: "boolean", example: true },
        name: { type: "string", example: "João" },
        token: { type: "string", example: "token" },
        ip: { type: "string", example: "192.168.1.1" },
        scopo: { type: "string", example: "admin" },
      },
    },
    401: {
      description: "Não autorizado",
      type: "object",
      properties: { message: { type: "string", example: "Não autorizado" } },
    },
    400: {
      description: "Erro de validação",
      type: "object",
      properties: {
        message: { type: "string", example: "Erro de validação" },
      },
    },
    500: {
      description: "Erro interno",
      type: "object",
      properties: { message: { type: "string", example: "Erro interno" } },
    },
  },
};
module.exports = loginSchema;
