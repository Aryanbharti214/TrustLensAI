const express = require("express");

const router = express.Router();

const {
  getIncidents,
  getIncidentById
} = require(
  "../controllers/incidentController"
);

router.get("/", getIncidents);

router.get("/:id", getIncidentById);

module.exports = router;