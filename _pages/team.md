---
layout: page
title: Team
permalink: /team/
---

{% assign team_members = site.people %}
{% for person in team_members %}
  {% include team_member.liquid person=person %}
{% endfor %}
