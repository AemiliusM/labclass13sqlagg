import pool from '../utils/pool.js';
export default class AnimalsClass {
  id;
  name;
  colour;
  speciesId;
  speciesName;
  count;
  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.colour = row.colour;
    this.speciesId = row.species_id;
    this.speciesName = row.species_name;
    this.count = row.count;
  }
  static async saveNewAnim({ name, colour, speciesId }) {
    const { rows } = await pool.query('INSERT INTO animals (name, colour, species_id) VALUES ($1, $2, $3) RETURNING *', [name, colour, speciesId]);
    return new AnimalsClass(rows[0]);
  }

  static async listAnim(id) {
    const { rows } = await pool.query('SELECT * FROM animals WHERE id = ($1)', [id]);
    return new AnimalsClass(rows[0]);
  }

  static async listAnimSpec() {
    const { rows } = await pool.query('SELECT name, species_name FROM animals LEFT JOIN species ON animals.species_id = species.id');
    console.log('THIS ROWS', rows)
    return rows.map((row) => new AnimalsClass(row)
    );
  }

  static async animalCount() {
    const { rows } = await pool.query('SELECT species_name, animals.name, COUNT(*) FROM animals LEFT JOIN species ON animals.species_id = species.id GROUP BY species.species_name, animals.name');
    console.log('COUNT', rows);
    return new AnimalsClass(rows[0]);
  }

  static async fixOneAnimal(id, { name }) {
    const { rows } = await pool.query('UPDATE animals SET name = ($2) WHERE id = ($1) RETURNING *', [id, name]);
    return new AnimalsClass(rows[0]);
  }

  static async deleteOneAnimal(id) {
    const { rows } = await pool.query('DELETE FROM animals WHERE id = ($1) RETURNING *', [id]);
    return new AnimalsClass(rows[0]);
  }
}
