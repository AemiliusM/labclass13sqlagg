import pool from '../utils/pool.js';
export default class SpeciesClass {
  id;
  speciesName;
  extinct;
  constructor(rows) {
    this.id = rows.id;
    this.speciesName = rows.species_name;
    this.extinct = rows.extinct;
  }
  static async saveNewSpec({ speciesName, extinct }) {
    const { rows } = await pool.query('INSERT INTO species (species_name, extinct) VALUES ($1, $2) RETURNING *', [speciesName, extinct]);
    console.log('ROWS', rows[0])
    return new SpeciesClass(rows[0]);
  }

  static async listSpec() {
    const { rows } = await pool.query('SELECT * FROM species');
    return rows.map(row => new SpeciesClass(row));
  }
}
