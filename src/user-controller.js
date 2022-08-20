const User = require("./user-model");

const getUsers = async (request, response) => {
  let users;
  if (request.params.id) {
    users = await User.findById(request.params.id);
  } else {
    users = await User.find();
  }
  response.send(users);
};

const createUser = async (request, response) => {
  const user = User.create(request.body);
  response.send(user);
};

module.exports = {
  getUsers,
  createUser,
};
