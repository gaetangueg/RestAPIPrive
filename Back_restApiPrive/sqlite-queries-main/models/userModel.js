const db = require("../database")

// Function to update a user in the database
function updateUser(userId, userDetails) {
	return new Promise((resolve, reject) => {
		const sql = `
            UPDATE users
            SET 
                firstName = ?,
                lastName = ?,
                imageUrl = ?,
                email = ?,
                userName = ?,
                items = ?
            WHERE id = ?;
        `
		const { firstName, lastName, imageUrl, email, userName, items } =
			userDetails

		db.run(
			sql,
			[firstName, lastName, imageUrl, email, userName, items, userId],
			function (err) {
				if (err) {
					reject(err)
				} else {
					resolve({
						message: "User updated successfully",
						changes: this.changes,
					})
				}
			}
		)
	})
}

module.exports = { updateUser }