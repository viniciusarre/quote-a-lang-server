const express = require("express");
const router = express();

const controller = require("./controller");

router.post("/getAll", controller.getQuotes);
router.post("/fetchNew", controller.fetchNew);
router.post("/fetchOne", controller.fetchOne);

module.exports = router;
