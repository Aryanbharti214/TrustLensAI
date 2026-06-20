const fs = require("fs");
const path = require("path");

const RECOMMENDATION_FILE = path.join(
  __dirname,
  "../../ai-engine/outputs/recommendations.json"
);
const {
 createIncident
}
=
require(
 "./incidentHelper"
);
const LOG_FILE = path.join(
  __dirname,
  "../data/activity_log.json"
);

// =========================
// Recommendation Helpers
// =========================

function getRecommendations() {
  return JSON.parse(
    fs.readFileSync(
      RECOMMENDATION_FILE,
      "utf8"
    )
  );
}

function saveRecommendations(data) {
  fs.writeFileSync(
    RECOMMENDATION_FILE,
    JSON.stringify(
      data,
      null,
      2
    )
  );
}

// =========================
// Activity Log Helpers
// =========================

function readLogs() {
  return JSON.parse(
    fs.readFileSync(
      LOG_FILE,
      "utf8"
    )
  );
}

function writeLogs(logs) {
  fs.writeFileSync(
    LOG_FILE,
    JSON.stringify(
      logs,
      null,
      2
    )
  );
}

function addLog(event) {
  const logs = readLogs();

  logs.push({
    type: "user",
    time: new Date().toLocaleTimeString(),
    event
  });

  writeLogs(logs);
}

// =========================
// Approve
// =========================

exports.approveRecommendation = (req, res) => {

  const recommendations =
    getRecommendations();

  const rec =
    recommendations.find(
      r => r.id === req.params.id
    );

  if (!rec) {
    return res.status(404).json({
      message: "Recommendation not found"
    });
  }

  rec.status = "Approved";

  saveRecommendations(
    recommendations
  );

  addLog(
    `Recommendation ${rec.id} approved`
  );

  res.json({
    success: true,
    message: "Recommendation approved",
    recommendation: rec
  });
};

// =========================
// Reject
// =========================

exports.rejectRecommendation = (req, res) => {

  const recommendations =
    getRecommendations();

  const rec =
    recommendations.find(
      r => r.id === req.params.id
    );

  if (!rec) {
    return res.status(404).json({
      message: "Recommendation not found"
    });
  }

  rec.status = "Rejected";

  saveRecommendations(
    recommendations
  );

  addLog(
    `Recommendation ${rec.id} rejected`
  );
createIncident(
 rec,
 "Rejected"
);
  res.json({
    success: true,
    message: "Recommendation rejected",
    recommendation: rec
  });
};

// =========================
// Escalate
// =========================

exports.escalateRecommendation = (req, res) => {

  const recommendations =
    getRecommendations();

  const rec =
    recommendations.find(
      r => r.id === req.params.id
    );

  if (!rec) {
    return res.status(404).json({
      message: "Recommendation not found"
    });
  }

  rec.status = "Escalated";

  saveRecommendations(
    recommendations
  );

  addLog(
    `Recommendation ${rec.id} escalated`
  );
  createIncident(
 rec,
 "Escalated"
);

  res.json({
    success: true,
    message: "Recommendation escalated",
    recommendation: rec
  });
};

// =========================
// Request Details
// =========================

exports.requestDetails = (req, res) => {

  const recommendations =
    getRecommendations();

  const rec =
    recommendations.find(
      r => r.id === req.params.id
    );

  if (!rec) {
    return res.status(404).json({
      message: "Recommendation not found"
    });
  }

  rec.status = "Details Requested";

  saveRecommendations(
    recommendations
  );

  addLog(
    `More details requested for ${rec.id}`
  );

  res.json({

    success: true,

    expanded_reasoning: [

      "7 failed login attempts detected.",

      "Device contacted suspicious external endpoint.",

      "Behavior matched historical quarantine events.",

      "Security patch overdue by 18 days.",

      "Confidence derived from similar past incidents."
    ],

    recommendation: rec
  });
};