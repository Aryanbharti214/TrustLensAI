const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


app.use(
  cors({
    origin: "*"
  })
);
const activityRoutes =
require("./routes/activity");

app.use(
  "/api/activity-log",
  activityRoutes
);

const actionRoutes =
require("./routes/actions");

app.use(
 "/api/actions",
 actionRoutes
);

const incidentRoutes =
require("./routes/incidents");
const settingsRoutes =
require("./routes/settings");

app.use(
  "/api/settings",
  settingsRoutes
);

app.use(
  "/api/incidents",
  incidentRoutes
);
const recommendationRoutes =
require("./routes/recommendations");

const dashboardRoutes =
require("./routes/dashboard");

app.use(
 "/api/recommendations",
 recommendationRoutes
);

app.use(
 "/api/dashboard-stats",
 dashboardRoutes
);



const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});