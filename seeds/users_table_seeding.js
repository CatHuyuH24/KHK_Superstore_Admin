/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      username: "minhkhang1505",
      email: "mkhang@example.com",
      password: "22120151",
      salt: "salt_value_1",
    },
  ]);
};
