from faker import Faker
import random
import json
import os

fake = Faker()

os.makedirs(
    "outputs",
    exist_ok=True
)

devices = []
telemetry = []
patches = []
quarantines = []

for i in range(500):

    device_id = f"DEV-{1000+i}"

    devices.append({

        "device_id": device_id,

        "hostname":
        fake.hostname(),

        "owner":
        fake.name()
    })

    telemetry.append({

        "device_id":
        device_id,

        "failed_logins":
        random.randint(
            0,
            10
        ),

        "network_anomaly":
        random.choice([
            True,
            False
        ])
    })

    patches.append({

        "device_id":
        device_id,

        "days_overdue":
        random.randint(
            0,
            30
        )
    })

for i in range(1000):

    quarantines.append({

        "reason":
        random.choice([

            "Patch overdue",

            "Network anomaly",

            "Multiple failed logins"
        ]),

        "outcome":
        random.choice([

            "Correct",

            "Correct",

            "Correct",

            "Escalated",

            "False Positive"
        ])
    })

json.dump(
    devices,
    open(
        "outputs/devices.json",
        "w"
    ),
    indent=4
)

json.dump(
    telemetry,
    open(
        "outputs/telemetry.json",
        "w"
    ),
    indent=4
)

json.dump(
    patches,
    open(
        "outputs/patches.json",
        "w"
    ),
    indent=4
)

json.dump(
    quarantines,
    open(
        "outputs/quarantines.json",
        "w"
    ),
    indent=4
)

print("Synthetic data generated.")