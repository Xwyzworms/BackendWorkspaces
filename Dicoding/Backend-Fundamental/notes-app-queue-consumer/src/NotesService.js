
const { Pool } = require('pg');

class NotesService {
	
	constructor() {
		this.pool = new Pool();
	}	

	async getNotes(userId) {
		// Get All notes she/he currently working with
		const query = {
			text: `SELECT DISTINCT notes.* FROM notes
			LEFT JOIN collaborations ON collaborations.note_id = notes.id 
			WHERE notes.owner = $1 OR collaborations.user_id = $1
			`,
			values: [userId],
		}

		const result = await this.pool.query(query);

		return result.rows;

	}
}

module.exports = NotesService;
