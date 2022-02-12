const bcrypt = require("bcrypt");

module.exports = {
  hashPassword: (password) => {
    const hash = bcrypt.hashSync(password, 10);
    return hash;
  },
  comparePassword: (password, hash) => {
    const compare = bcrypt.compareSync(password, hash);
    return compare;
  },
  validatePassword: (password) => {
    var check = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (check.test(password) == false) {
      return false;
    }
    return true;
  },
};
