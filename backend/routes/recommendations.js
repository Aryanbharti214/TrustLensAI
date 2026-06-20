const express = require("express");
const router = express.Router();

const {
 getRecommendations,
 getRecommendationById
}
=
require("../controllers/recommendationController");

router.get("/",getRecommendations);

router.get("/:id",getRecommendationById);

module.exports = router;