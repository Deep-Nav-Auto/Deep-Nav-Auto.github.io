---
title: "High-Density Urban LiDAR Mapping — Downtown Calgary"
date: "2024-03-15"
cover: "/gallery/lidar-mapping-downtown.jpg"
category: "Field Work"
tags: ["LiDAR", "Mapping", "Urban"]
members: ["Zewei Chen", "Dr. Hongzhou Yang"]
location: "Calgary, AB"
featured: true
excerpt: "A mobile mapping pass through the downtown core to benchmark our semantic segmentation and loop-closure pipeline on real urban structure."
---

Calgary’s downtown grid is a useful stress test for any mapping stack: glass facades, repeating façades, underpasses, and construction zones that change week to week. We mounted our spinning LiDAR on the roof rack, coupled it with wheel odometry and a tactical-grade IMU, and drove a slow, deliberate loop that covered Stephen Avenue, the Bow River frontage, and several blocks of mixed-use towers.

Zewei led acquisition while we watched point density and time synchronization in real time. Urban campaigns are as much logistics as science—permits, traffic patterns, and early-morning windows when pedestrian load is low enough to keep speeds consistent.

Back in the lab, the session became a reference for semantic labeling: curb edges, pole-like objects, and building footprints that our network must separate before we can merge sessions into a single HD map. The loop closures were tight; the dynamic objects were not. Both outcomes were exactly what we wanted.

---

This campaign also feeds our ongoing work on map maintenance: when a façade changes or a crane appears mid-scan, the system should flag inconsistency rather than silently warping geometry. Downtown Calgary, in March, gave us plenty of examples.
