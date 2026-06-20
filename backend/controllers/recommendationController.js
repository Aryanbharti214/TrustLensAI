const fs = require("fs");
const path = require("path");

const FILE = path.join(
  __dirname,
  "../../ai-engine/outputs/recommendations.json"
);

exports.getRecommendations = (req,res)=>{

  const data = JSON.parse(
    fs.readFileSync(FILE)
  );

  res.json(data);
};

exports.getRecommendationById = (req,res)=>{

  const data = JSON.parse(
    fs.readFileSync(FILE)
  );

  const rec =
    data.find(
      r => r.id === req.params.id
    );

  res.json(rec);
};