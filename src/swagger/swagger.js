const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Slice N Share API Documentation",
      version: "1.0.0",
      description: "This is the API documentation for your project.",
      contact: {
        name: "Your Name",
        email: "your-email@example.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5000", // Replace with your server's base URL
      },
    ],
  },
  apis: ["../routes/*.js"], // Adjust the path to match where your route files are stored
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
