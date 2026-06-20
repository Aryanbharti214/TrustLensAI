import json
import random

def generate_shap():

    return [

        {
            "feature":"Failed Logins",
            "val":35,
            "type":"positive"
        },

        {
            "feature":"Patch Delay",
            "val":24,
            "type":"positive"
        },

        {
            "feature":"Known Device",
            "val":15,
            "type":"negative"
        }

    ]
def generate_subagents():

    return [

        {
            "name":"Ingestion Agent",
            "score":94,
            "details":"Collected endpoint telemetry"
        },

        {
            "name":"Threat Intel Matcher",
            "score":91,
            "details":"Matched known threat intelligence"
        },

        {
            "name":"UEBA Anomaly Classifier",
            "score":88,
            "details":"Behavioral anomaly detected"
        },

        {
            "name":"Devil's Advocate Falsifier",
            "score":83,
            "details":"Generated alternative explanations"
        }
    ]

def generate_similar_cases():

    cases = []

    for i in range(5):

        cases.append({

            "id":
            f"CASE-{100+i}",

            "action":
            random.choice([
                "Quarantine Device",
                "Force Patch",
                "Trigger MFA"
            ]),

            "outcome":
            random.choice([
                "Successful",
                "Escalated",
                "False Positive"
            ]),

            "confidence":
            random.randint(
                75,
                98
            ),

            "daysAgo":
            random.randint(
                1,
                180
            )
        })

    return cases
with open(
    "outputs/devices.json"
) as f:

    devices = json.load(f)

recommendations = []

for i, device in enumerate(
    devices[:100]
):

    confidence = random.randint(
        75,
        98
    )

    recommendation = {

        "id":
        f"REC-{i+1:03}",

        "type":
        random.choice([

            "Corporate Laptop",

            "Developer Workstation",

            "Mobile Device"
        ]),

        "action":
        "Quarantine Device",

        "severity":
        random.choice([

            "Critical",

            "High",

            "Medium"
        ]),

        "confidence":
        confidence,

        "sources":[

            "Telemetry",

            "Patch History",

            "Threat Intelligence"
        ],

        "status":
        "Pending",

        "why":[

            "Failed Login Activity - Multiple authentication failures detected.",

            "Patch Compliance Risk - Security updates overdue.",

            "Network Anomaly - Suspicious outbound traffic identified."
        ],

        "nutritionLabel":{

            "evidenceStrength":
            random.randint(
                3,
                5
            ),

            "sources":[

                "Telemetry",

                "Patch Service",

                "Historical Actions"
            ],

            "similarCases":
            random.randint(
                20,
                120
            ),

            "limitations":
            "Maintenance activity may not be fully represented.",

            "model":
            "TrustLens Decision Engine"
        },

        "trustDNA":{

            "score":
            random.randint(
                70,
                95
            ),

            "dataQuality":
            random.randint(
                75,
                100
            ),

            "policyMatch":
            random.randint(
                70,
                100
            ),

            "fleetSimilarity":
            random.randint(
                70,
                100
            ),

            "threatIntelMatch":
            random.randint(
                70,
                100
            ),

            "unknownRisk":
            random.randint(
                5,
                25
            )
        },

        "devilsAdvocate":{

            "points":[

                "Recent maintenance window could explain behaviour.",

                "Trusted user group may reduce risk.",

                "Telemetry history is incomplete."
            ],

            "alternativeAction":
            "Force Security Scan"
        },

        "timeMachine":{

            "accuracy":
            random.randint(
                75,
                95
            ),

            "cases":
            100,

            "breakdown":{

                "correct":70,

                "falsePositives":20,

                "escalated":10
            }
        },

        "shapImportance":
        generate_shap(),

        "subagents":
        generate_subagents(),

        "similarCasesList":
        generate_similar_cases()
    }

    recommendations.append(
        recommendation
    )

json.dump(
    recommendations,
    open(
        "outputs/recommendations.json",
        "w"
    ),
    indent=4
)

print(
    f"{len(recommendations)} recommendations generated."
)