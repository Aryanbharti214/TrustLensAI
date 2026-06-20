const fs = require("fs");
const path = require("path");

const LOG_FILE = path.join(
  __dirname,
  "../data/activity_log.json"
);

exports.getActivityLog = (req,res)=>{

  const logs = JSON.parse(
    fs.readFileSync(LOG_FILE)
  );

  res.json(logs);
};