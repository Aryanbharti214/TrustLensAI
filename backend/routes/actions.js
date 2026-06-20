const express = require("express");

const router = express.Router();

const {

  approveRecommendation,

  rejectRecommendation,

  escalateRecommendation,

  requestDetails

} = require(
  "../controllers/actionController"
);

router.post(
  "/approve/:id",
  approveRecommendation
);

router.post(
  "/reject/:id",
  rejectRecommendation
);

router.post(
  "/escalate/:id",
  escalateRecommendation
);

router.post(
  "/details/:id",
  requestDetails
);

module.exports = router;