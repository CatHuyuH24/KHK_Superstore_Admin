/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
	await knex.raw(`
    CREATE TABLE IF NOT EXISTS televisions (
    ID SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    imageurl VARCHAR(255) NOT NULL,
    detail TEXT NOT NULL,
    discount REAL DEFAULT 0
);`);
};

exports.down = async function (knex) {
	await knex.raw(`DROP TABLE IF EXISTS televisions;`);
};
