const sanitizeUserData = (user) => {
  const { password, ...safeUser } = user;
  return safeUser;
};

module.exports = { sanitizeUserData };
