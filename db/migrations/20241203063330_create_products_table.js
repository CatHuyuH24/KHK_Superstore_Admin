/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.raw(`
      CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      category_id INT NOT NULL,
      manufacturer_id INT NOT NULL,
      price INT NOT NULL,
      image_url VARCHAR NOT NULL,
      detail TEXT NOT NULL,
      discount REAL DEFAULT 0,
      number INT DEFAULT 0,
      last_modified timestamp without time zone DEFAULT NOW(),
      fps_hz INT,
      screen_width_inches REAL,
      status VARCHAR(255) DEFAULT 'on stock',
      total_purcharsed INT DEFAULT 0,
      created_at timestamp without time zone,
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
      FOREIGN KEY (manufacturer_id) REFERENCES manufacturers(id) ON DELETE CASCADE,
      CONSTRAINT check_status CHECK (status IN ('on stock', 'out of stock', 'suspended')),
      CONSTRAINT check_number_status CHECK (
          (number = 0 AND status = 'out of stock') OR (number > 0 AND status != 'out of stock')
      )
  );`);
  };
  
  exports.down = async function (knex) {
    await knex.raw(`DROP TABLE IF EXISTS products;`);
  };
  