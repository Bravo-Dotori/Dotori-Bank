const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Dotori API",
      version: "1.0.0",
      description: "도토리 금융 서비스 API 문서",
    },

    servers: [
      {
        url: "http://localhost:5000",
      },
    ],

    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "accessToken",
        },
      },
    },

    security: [
      {
        cookieAuth: [],
      },
    ],
  },

  apis: [__dirname + "/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = specs;