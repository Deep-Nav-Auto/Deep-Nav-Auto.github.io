---
title: "Adverse Weather Radar-Camera Trials"
date: "2024-04-08"
cover: "/gallery/radar-camera-testing.jpg"
category: "Field Work"
tags: ["Radar", "Vision", "Odometry"]
members: ["Jinhee Kim", "Sophia Zhao"]
location: "Calgary, AB"
featured: false
excerpt: "Spring slush and low visibility gave us a natural testbed for radar–camera odometry when optical flow fails."
---

Optical odometry fails gracefully in theory and poorly in practice the first time you drive through slush spray at dusk. We scheduled a short campaign on a quiet industrial road south of the city, pairing a medium-range radar with a stereo pair we could shutter in sync.

Jinhee logged radar range–Doppler cubes while Sophia managed camera exposure so we did not saturate on wet asphalt. When visibility dropped, radar velocities remained interpretable even as feature tracks collapsed. That gap—where vision drops out but the vehicle still moves—is exactly the regime we are targeting with learned fusion.

---

We are not claiming all-weather magic. We are building datasets where failure modes are labeled honestly: spray, glare, partial occlusion, and the moments when both modalities disagree. Those disagreements are often more informative than the easy sunny laps.

Analysis is ongoing, but the first plots already show reduced drift on segments where monocular VO lost lock entirely. More rain dates are on the calendar—Calgary will cooperate eventually.
