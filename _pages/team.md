---
layout: page
title: Team
permalink: /team/
nav: true
nav_order: 30
---

<!-- Link to the new CSS file -->
<link rel="stylesheet" href="/assets/css/team.css">

{% assign categories = "Lab Director, PhD Students, MSc Students, Research Assistants, Undergraduates, Alumni" | split: ", " %}
{% for category in categories %}
  <h2>{{ category }}</h2>
  {% assign team_members = site.people | where: "category", category %}
  <div class="category-group">
    {% for person in team_members %}
      {% include team_member.liquid person=person %}
    {% endfor %}
  </div>
{% endfor %}
