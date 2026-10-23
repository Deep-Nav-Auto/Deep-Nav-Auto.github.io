---
title: "Building Our Custom Sensor Fusion Platform"
date: "2023-11-22"
cover: "/gallery/sensor-rig-assembly.jpg"
category: "Equipment"
tags: ["Hardware", "Calibration", "Integration"]
members: ["Jinhee Kim", "Rohan Patel"]
location: "INML Lab, UCalgary"
featured: true
excerpt: "From bare aluminum extrusion to a time-synchronized rig ready for the roof rack—documenting the build of our primary field platform."
---

Every field season starts in the lab with cable ties, torque wrenches, and a spreadsheet of serial numbers. This winter we rebuilt the roof-rack platform from the ground up: new vibration isolation for the LiDAR, a revised power distribution box, and a single PPS line shared across GNSS, IMU, and cameras so we stop chasing microsecond offsets in post-processing.

Jinhee handled mechanical layout and shielding; Rohan wrote the bring-up checklist and verified that each sensor actually triggered when we expected it to. We learned—again—that the last 10% of integration is grounding, connector strain relief, and labeling every cable on both ends.

---

The rig is not glamorous, but it is honest. When you know exactly where each sensor sits in the vehicle frame and you trust the time base, your algorithms can focus on estimation instead of excuses. We ran bench tests with the wheels on jack stands before anyone was allowed to say the word “Kananaskis.”

Next up: thermal cycling in the parking garage and a formal calibration session for camera–LiDAR extrinsics. Hardware is never finished; it only reaches “good enough for this campaign.”
