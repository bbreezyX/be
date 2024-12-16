module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert("users", [
      {
        username: "dany",
        password: "secure123",
        nama: "dany",
        created_at: new Date(),
      },
    ]);
  },
  down: async (queryInterface) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
