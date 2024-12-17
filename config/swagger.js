// config/swagger.js
const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Management API Documentation",
      version: "1.0.0",
      description: "Documentation for Task Management System API",
    },
    servers: [
      {
        url: "https://bebaru.vercel.app",
        description: "Production server",
      },
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          required: ["username", "password", "nama"],
          properties: {
            id: {
              type: "integer",
              description: "User ID (auto-generated)",
            },
            username: {
              type: "string",
              description: "Username (unique)",
            },
            password: {
              type: "string",
              description: "User password",
            },
            nama: {
              type: "string",
              description: "Nama lengkap user",
            },
            created_at: {
              type: "string",
              format: "date-time",
              description: "Timestamp pembuatan user",
            },
          },
        },
        Task: {
          type: "object",
          required: ["title", "creator_id"],
          properties: {
            id: {
              type: "integer",
              description: "Task ID (auto-generated)",
            },
            title: {
              type: "string",
              description: "Judul task",
            },
            description: {
              type: "string",
              description: "Deskripsi task",
            },
            status: {
              type: "string",
              enum: ["todo", "in_progress", "done"],
              default: "todo",
              description: "Status task",
            },
            priority: {
              type: "string",
              enum: ["low", "medium", "high"],
              default: "medium",
              description: "Prioritas task",
            },
            creator_id: {
              type: "integer",
              description: "ID user pembuat task",
            },
            assignee_id: {
              type: "integer",
              description: "ID user yang ditugaskan",
              nullable: true,
            },
            due_date: {
              type: "string",
              format: "date-time",
              description: "Deadline task",
              nullable: true,
            },
            created_at: {
              type: "string",
              format: "date-time",
              description: "Timestamp pembuatan task",
            },
            updated_at: {
              type: "string",
              format: "date-time",
              description: "Timestamp update terakhir",
            },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

// routes/userRoutes.js documentation
/**
 * @swagger
 * /api/users:
 *   get:
 *     tags: [Users]
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *
 * /api/users/signup:
 *   post:
 *     tags: [Users]
 *     summary: Register new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - nama
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               nama:
 *                 type: string
 *     responses:
 *       201:
 *         description: User successfully created
 *       400:
 *         description: Invalid input or username already exists
 *
 * /api/users/login:
 *   post:
 *     tags: [Users]
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 */

// routes/taskRoutes.js documentation
/**
 * @swagger
 * /api/tasks:
 *   get:
 *     tags: [Tasks]
 *     summary: Get all tasks
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       403:
 *         description: No token provided
 *       401:
 *         description: Unauthorized
 *
 *   post:
 *     tags: [Tasks]
 *     summary: Create new task
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *               assignee_id:
 *                 type: integer
 *               due_date:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Invalid input
 *
 * /api/tasks/{id}:
 *   put:
 *     tags: [Tasks]
 *     summary: Update task
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [todo, in_progress, done]
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *               assignee_id:
 *                 type: integer
 *               due_date:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       404:
 *         description: Task not found
 *
 *   delete:
 *     tags: [Tasks]
 *     summary: Delete task
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 */
