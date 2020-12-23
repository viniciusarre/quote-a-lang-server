const express = require("express");
const router = express();

const controller = require("./controller");

router.get("/getAll", controller.getQuotes);
router.get("/fetchNew", controller.fetchNew);
router.get("/fetchOne", controller.fetchOne);

module.exports = router;
