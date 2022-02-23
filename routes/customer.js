const { getCustomer } = require("../controllers/user");
const router = require("express").Router();
const { isAdmin } = require("../middlewares/userAuth");

router.get("/", isAdmin, getCustomer);
module.exports = router;
