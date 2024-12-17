require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const expressSwagger = require("express-swagger-generator");

const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

const expressSwaggerGenerator = expressSwagger(app);
const options = {
  swaggerDefinition: {
    info: {
      title: "Task API Documentation",
      version: "1.0.0",
      description: "Documentation for Task Management API",
    },
    host:
      process.env.NODE_ENV === "production"
        ? "bebaru.vercel.app"
        : "localhost:5000",
    basePath: "/api",
    schemes: ["https", "http"],
    securityDefinitions: {
      JWT: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
        description: "Bearer token",
      },
    },
  },
  basedir: __dirname,
  files: ["./routes/*.js"],
};

expressSwaggerGenerator(options);

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is working!");
});

app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(
    `Swagger documentation available at http://localhost:${PORT}/api-docs`
  );
});
console.log("JWT_SECRET:", process.env.JWT_SECRET);
