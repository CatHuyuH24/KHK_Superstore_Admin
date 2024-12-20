/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('categories').del()
  await knex('categories').insert([
    { id: 1, category_name: 'computers'},
    { id: 2, category_name: 'mobilephones'},
    { id: 3, category_name: 'televisions'}
  ]);
};