const fs = require("fs");
const path = require("path");

const FILE = path.join(
  __dirname,
  "../data/settings.json"
);

exports.getSettings = (
  req,
  res
) => {

  const settings =
  JSON.parse(
    fs.readFileSync(
      FILE,
      "utf8"
    )
  );

  res.json(settings);
};

exports.updateSettings = (
  req,
  res
) => {

  const settings = {
    autonomyLevel:
    req.body.autonomyLevel
  };

  fs.writeFileSync(
    FILE,
    JSON.stringify(
      settings,
      null,
      2
    )
  );

  res.json(settings);
};