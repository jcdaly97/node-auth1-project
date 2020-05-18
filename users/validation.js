module.exports = {
    isValid,
}

function isValid(user) {
    return Boolean(user.username && typeof user.username === "string" && user.password && typeof user.password === "string");
  }