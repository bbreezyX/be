require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

const setupSwagger = async () => {
  try {
    const swaggerUI = await import("swagger-ui-express");
    const { default: swaggerDocs } = await import("./config/swagger.js");
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
  } catch (err) {
    console.log("Swagger documentation is only available in development mode");
  }
};

setupSwagger();

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
