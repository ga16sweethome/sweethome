const { getCustomer } = require("../controllers/user");
const router = require("express").Router();

router.get("/", getCustomer);
module.exports = router;
