const knex = require("knex")(require("../knexfile"));

// Create new account
const createUser = (req, res) => {
    // Receive user input from request body
    const { email, password } = req.body;

    // Validate input for required fields
    if (!email || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }

    // Check if the email is a valid email address
    if (!isEmailValid(email)) {
        return res.status(400).json({ error: "Invalid email address" });
    }

    // Check if the email already exists in the table
    knex("users")
        .select("email")
        .where({ email }) // Search for the email in the database
        .then((existingUser) => {
            if (existingUser.length > 0) {
                // Email already exists, return an error
                return res.status(400).json({ error: "Email already exists" });
            }
            
            // Email is unique, proceed with user creation
            return knex("users")
                .insert({ email, password })
                .then(() => {
                    // After successful insertion, fetch the newly created user's data
                    return knex("users")
                        .select("id", "email")
                        .where({ email })
                        .then((newUser) => {
                            res.status(201).json({ message: 'Account created successfully', user: newUser[0] });
                        })
                        .catch((err) => {
                            console.error("Error fetching user data:", err);
                            res.status(500).json({ error: "Internal server error" });
                        });
                })
                .catch((err) => {
                    console.error("Error creating account:", err);
                    res.status(500).json({ error: "Internal server error" });
                });
        })
        .catch((err) => {
            console.error("Error checking email existence:", err);
            res.status(500).json({ error: "Internal server error" });
        });
}

function isEmailValid(email) {
    // Define a regular expression pattern for a basic email format
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
}

// Get user's location
const getUserLocation = (req, res) => {
    const userId = req.user.id;
    
    // Query the database to get the user's location
    knex("users")
        .select("location") // Select only the 'location' field
        .where("id", userId)
        .then((user) => {
            if (user.length > 0) {
                const location = user[0].location;
                res.json(location);
            } else {
                res.status(404).json({ error: "User location not found" });
            }
        })
        .catch((err) => {
            console.error("Error retrieving user location:", err);
            res.status(500).json({ error: "Internal server error" });
        });
}

// Get logged in user's info
const getUserInfo = (req, res) => {
    const userId = req.user.id;

    // Check if the user is authenticated
    if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
    }

    // Query the database to get the user's data by ID
    knex("users")
        .select("id", "email", "location") // specify the fields you want to retrieve
        .where({ id: userId })
        .then((user) => {
            if (user.length > 0) {
                res.status(200).json(user[0]);
            } else {
                res.status(404).json({ error: "User not found" });
            }
        })
        .catch((err) => {
            console.error("Error retrieving user data:", err);
            res.status(500).json({ error: "Internal server error" });
        });
}

module.exports = {
    createUser,
    getUserLocation,
    getUserInfo,
};