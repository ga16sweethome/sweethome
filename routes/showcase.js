const router = require("express").Router();
const {
  getOneShowcase,
  getAllShowcase,
  getAllShowcaseAdmin,
  createPortfolio,
  createCompletedProject,
  getDetailProjectByAdmin,
  getListProject,
  shownShowcase,
} = require("../controllers/showcase");
const { getPicture } = require("../controllers/user");
const { isAdmin } = require("../middlewares/userAuth");

router.get("/:id", getOneShowcase); //get one showcase on homepage/showcase detail
router.get("/", getAllShowcase); //get all Showcase on homepage/showcase filter
router.get("/home/pic", getPicture); //get Picture on Home Page
router.get("/admin/get", isAdmin, getAllShowcaseAdmin); //get All Showcase
router.post("/admin/post/:id", isAdmin, shownShowcase); // seting visibility showcase.is_shown : true/false
router.post("/admin/portfolio", isAdmin, createPortfolio); //create protfolio Showcase
router.post("/admin/project", isAdmin, createCompletedProject); //create completed project Showcase
router.get("/admin/project/:id", isAdmin, getDetailProjectByAdmin); // to get detail Project
router.get("/admin/project/all", isAdmin, getListProject); // to get list of all project
module.exports = router;
