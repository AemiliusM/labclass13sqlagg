import pool from '../utils/pool.js';
export default class SpeciesClass {
  constructor(rows) {
    this.id = rows.id;
    this.species_name = rows.species_name;
    this.extinct = rows.extinct;
  }
  static async saveNewSpec({ species_name, extinct }) {
    const { rows } = await pool.query('INSERT INTO species (species_name, extinct) VALUES ($1, $2) RETURNING *', [species_name, extinct]);
    return new SpeciesClass(rows[0]);
  }

  static async listSpec() {
    const { rows } = await pool.query('SELECT * FROM species');
    return new SpeciesClass(rows[0]);
  }
}
