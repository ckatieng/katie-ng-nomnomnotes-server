const knex = require("knex")(require("../knexfile"));

// Get all users
const getUsers = (req, res) => {
    knex("users")
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => 
            res.status(400).send(`Error retrieving users: ${err}`)
        );
}

module.exports = {
    getUsers
};