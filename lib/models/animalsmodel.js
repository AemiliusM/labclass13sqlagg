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

  static async listAnim(id) {
    const { rows } = await pool.query(`SELECT * FROM animals WHERE id = ${id}`);
    return new AnimalsClass(rows[0]);
  }

  static async listAnimSpec() {
    const { rows } = await pool.query(`SELECT name, species_name
     FROM animals 
     LEFT JOIN species 
     ON animals.species_id = species.id`);
    // console.log('THIS', rows);
    return new AnimalsClass(rows[0]);
  }

  static async fixOneAnimal(id, { name }) {
    const { rows } = await pool.query('UPDATE animals SET name = ($2) WHERE id = ($1) RETURNING *', [id, name]);
    return new AnimalsClass(rows[0]);
  }
}
