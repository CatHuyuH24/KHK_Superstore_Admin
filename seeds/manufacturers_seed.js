/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('manufacturers').del()
  await knex('manufacturers').insert([
    { id: 1, manufacturer_name: 'Apple'},
    { id: 2, manufacturer_name: 'Dell'},
    { id: 3, manufacturer_name: 'Acer'},
    {id: 4, manufacturer_name: 'Samsung'},
    {id: 5, manufacturer_name: 'LG'},
    {id: 6, manufacturer_name: 'Darling'}
  ]);
};