/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.raw(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        shipping_detail VARCHAR,
        is_paid BOOLEAN NOT NULL DEFAULT FALSE,
        order_date timestamp without time zone NOT NULL DEFAULT NOW(),
        FOREIGN KEY (user_id) REFERENCES users(id)
      );`);
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = async function (knex) {
    await knex.raw(`DROP TABLE IF EXISTS orders;`);
  };
  