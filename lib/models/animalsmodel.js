import pool from '../utils/pool.js';
export default class AnimalsClass {
  constructor(rows) {
    this.id = rows.id;
    this.name = rows.name;
    this.colour = rows.colour;
    this.species_id = rows.species_id;
  }
  static async saveNewAnim({ name, colour, species_id }) {
    const { rows } = await pool.query('INSERT INTO animals (name, colour, species_id) VALUES ($1, $2, $3) RETURNING *', [name, colour, species_id]);
    return new AnimalsClass(rows[0]);
  }

  static async listSpec() {
    const { rows } = await pool.query('SELECT * FROM animals');
    return new AnimalsClass(rows[0]);
  }
}
