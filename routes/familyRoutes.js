const { Router } = require("express");
const familyController = require("../controllers/familyController");

const router = Router();

router.post("/family", familyController.family_post);

module.exports = router;
