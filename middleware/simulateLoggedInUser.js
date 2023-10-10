const usersData = require("../seeds/seeds_data/users_seed");

// Simulate a logged-in user
const simulateLoggedInUser = (req, res, next) => {
  const loggedInUser = usersData[0];

  // Attach the simulated user to the request object
  req.user = loggedInUser;

  // Extract the email from the user object and attach it to req.user
  req.user.email = loggedInUser.email;

  // Continue to the next middleware or route handler
  next();
};

module.exports = simulateLoggedInUser;
