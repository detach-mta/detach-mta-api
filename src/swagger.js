var path = require("path");

// ------ Configure swagger docs ------
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "detach-api",
            version: "1.0.0",
            description: "API of the Detach MTA project",
        },
    },
    apis: [path.join(__dirname, "/routes/*.js")],
};

module.exports = swaggerOptions;
