---
title: "Winter GNSS Field Campaign — Rocky Mountain Foothills"
date: "2024-02-18"
cover: "/gallery/gnss-field-test-2024.jpg"
category: "Field Work"
tags: ["GNSS", "Multipath", "Cold Weather"]
members: ["Dr. Hongzhou Yang", "Mohammed Al-Sharif"]
location: "Kananaskis, AB"
featured: true
excerpt: "Collecting high-rate GNSS and IMU data along forest service roads to stress-test our integrity monitoring stack in deep multipath."
---

The foothills west of Calgary are a demanding place to test navigation algorithms. In late February, with temperatures hovering near −20 °C, we packed our reference receivers, a dual-antenna rover rig, and a full suite of logging laptops into the lab van and headed for Kananaskis.

Our goal was straightforward on paper and difficult in practice: capture hours of raw GNSS observables in environments where canopy, terrain, and intermittent sky view conspire against any filter that assumes benign geometry. Forest corridors produce long stretches of multipath; open cutlines offer brief relief before the next stand of spruce closes the sky again.

Mohammed ran the rover along a pre-surveyed path while Dr. Yang monitored real-time residuals and cycle-slip flags on a base station we set on a known monument near the trailhead. We logged at 10 Hz and marked every stop and turn in the field notebook—old habits that still pay off when you are reconciling trajectories weeks later in the office.

By the end of the second day we had datasets we are already using to tune spoofing-sensitive monitors and to validate IMU-aided coasting when fixes drop out entirely. The cold was brutal; the data were worth it.
