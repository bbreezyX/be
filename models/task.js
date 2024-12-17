"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "Task",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // SERIAL
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      status: {
        type: DataTypes.ENUM("todo", "in_progress", "done"),
        allowNull: false,
        defaultValue: "todo",
      },
      priority: {
        type: DataTypes.ENUM("low", "medium", "high"),
        allowNull: false,
        defaultValue: "medium",
      },
      creator_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "NO ACTION",
      },
      assignee_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "SET NULL",
        onUpdate: "NO ACTION",
      },
      due_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "tasks",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  Task.associate = (models) => {
    Task.belongsTo(models.User, {
      as: "creator",
      foreignKey: "creator_id",
    });
    Task.belongsTo(models.User, {
      as: "assignee",
      foreignKey: "assignee_id",
    });
  };

  return Task;
};
