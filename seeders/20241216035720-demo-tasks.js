module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert("tasks", [
      {
        title: "Task 1",
        description: "Description 1",
        status: "todo",
        priority: "medium",
        creator_id: 1,
        assignee_id: null,
        due_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  down: async (queryInterface) => {
    return queryInterface.bulkDelete("Tasks", null, {});
  },
};
