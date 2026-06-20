const fs = require("fs");
const path = require("path");

const INCIDENT_FILE = path.join(
  __dirname,
  "../data/incidents.json"
);

exports.createIncident = (
 recommendation,
 action
)=>{

 let incidents = [];

 try{

   incidents =
   JSON.parse(
     fs.readFileSync(
       INCIDENT_FILE
     )
   );

 }catch{}

 incidents.push({

   incidentId:
   `INC-${Date.now()}`,

   recommendationId:
   recommendation.id,

   action,

   severity:
   recommendation.severity,

   whatHappened:
   recommendation.action,

   createdAt:
   new Date().toISOString()
 });

 fs.writeFileSync(
   INCIDENT_FILE,
   JSON.stringify(
     incidents,
     null,
     2
   )
 );
};