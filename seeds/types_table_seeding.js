/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('types').del()
  await knex('types').insert([
    { id: 1, type_name: 'computers'},
    { id: 2, type_name: 'mobilephones'},
    { id: 3, type_name: 'televisions'}
  ]);
};
