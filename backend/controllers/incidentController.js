const fs = require("fs");
const path = require("path");

const INCIDENT_FILE = path.join(
  __dirname,
  "../data/incidents.json"
);

exports.getIncidents = (req, res) => {

  const incidents = JSON.parse(
    fs.readFileSync(INCIDENT_FILE)
  );

  res.json(incidents);
};

exports.getIncidentById = (req, res) => {

  const incidents = JSON.parse(
    fs.readFileSync(INCIDENT_FILE)
  );

  const incident = incidents.find(
    i => i.incidentId === req.params.id
  );

  if (!incident) {
    return res.status(404).json({
      message: "Incident not found"
    });
  }

  res.json(incident);
};