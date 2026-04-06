const bcrypt = require("bcrypt");

(async () => {
  const password = "";
  const hashed = await bcrypt.hash(password, 10);
  console.log(hashed);
})();