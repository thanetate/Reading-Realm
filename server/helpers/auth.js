const bcrypt = require("bcryptjs");

// Uses bcrypt to hash a plain text password
const hashPassword = (password) => {
	return new Promise((resolve, reject) => {
		bcrypt.genSalt(12, (err, salt) => {
			if (err) {
				reject(err);
			}
			bcrypt.hash(password, salt, (err, hash) => {
				if (err) {
					reject(err);
				}
				resolve(hash);
			});
		});
	});
};

// Uses bcrypt to compare a plain text password with a hashed password
const comparePassword = (password, hashed) => {
	return bcrypt.compare(password, hashed);
};

//exporting
module.exports = {
	hashPassword,
	comparePassword,
};
