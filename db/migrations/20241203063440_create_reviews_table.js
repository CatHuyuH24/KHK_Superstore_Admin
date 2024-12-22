/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.raw(`
      CREATE TABLE IF NOT EXISTS reviews (
          id SERIAL PRIMARY KEY,
          product_id INT NOT NULL,
          user_id INT NOT NULL,
          comment VARCHAR NOT NULL,
          rating INT NOT NULL,
          created_at timestamp without time zone DEFAULT NOW(),
          FOREIGN KEY (product_id) REFERENCES products(id),
          FOREIGN KEY (user_id) REFERENCES users(id),
          CONSTRAINT rating CHECK (rating >= 1 AND rating <= 5)
    );`);
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = async function (knex) {
    await knex.raw(`DROP TABLE IF EXISTS reviews;`);
  };
  