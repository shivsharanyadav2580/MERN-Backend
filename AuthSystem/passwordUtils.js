const { hash, compare, genSalt } = require("bcrypt");

const generateHash = async (password) => {
  const salt = await genSalt(10);
  const hashPassword = await hash(password, salt);
  console.log(hashPassword);

  return hashPassword;
};

const verifyPassword = async (password, hashPassword) => {
  return compare(password, hashPassword); // ✅ correct
};

module.exports = { generateHash, verifyPassword };
