---
layout: article
title: ""
aside:
  toc: true
  selectors: 'h3'
---
<div class="resume-section-content">
  <div class="resume-block">
      <div class="resume-title">
        {{site.data.resume.name}}
      </div>
      <div class="resume-sub-title">
      <a href="_target_"><i class="fa fa-briefcase"></i></a> {{site.data.resume.jobtitle}} | 
      <a href="{{site.data.resume.linkedin}}"><i class="fab fa-linkedin-in"></i></a> | 
      <a href="{{site.data.resume.link}}"><i class="fas fa-globe"></i></a> | 
      <a href="{{site.data.resume.github}}"><i class="fab fa-github"></i></a> | 
      <a href="{{site.data.resume.scholar}}"><i class="fas fa-flask"></i></a> |
      <a><i class="fas fa-map-marker-alt"></i></a> {{site.data.resume.place}}
      </div>
  </div>
</div>

## Work Experience
<div class="resume-section-content">
  {% for exp in site.data.resume.experience %}
  <div class="resume-block">
    <div class="resume-block-title">
      {{ exp.title }}
    </div>
    <div class="resume-block-subtitle">
      <i class="far fa-calendar-alt"></i> {{ exp.duration }} | <a href="{{exp.link}}"><i class="far fa-building"></i></a> {{ exp.company }}
    </div>
    <div class="resume-list-content">
      {% for d in exp.description %}
      <li> {{ d }} </li>
      {% endfor %}
    </div>
  </div>
  {% endfor %}
  </div>


## Education
<div class="resume-section-content">
    {% for edu in site.data.resume.education %}
    <div class="resume-block">
      <div class="resume-block-title">
        <i class="fas fa-university"></i> {{ edu.university }}, {{ edu.location }}
      </div>
      <div class="resume-block-subtitle">
        <i class="far fa-calendar-alt"></i> {{ edu.duration }} | <i class="fas fa-user-graduate"></i> {{ edu.major }}
      </div>
    </div>
    {% endfor %}
</div>

## Skills
<div class="resume-section-content">
  {% for skill in site.data.resume.skills %}
  <div class="resume-block">
    <div class="resume-block-title">
      <i class="fas fa-wrench"></i> {{ skill.title }}
    </div>
    <div class="resume-block-content">
      {{ skill.items }}
    </div>
  </div>
  {% endfor %}
  </div>

## Awards
<div class="resume-section-content">
  {% for award in site.data.resume.awards %}
    <div class="paper-block-title">
      <i class="fa fa-trophy"></i> {{ award }}
    </div>
  {% endfor %}
  </div>

## Publications
<div class="resume-section-content">
  {% for paper in site.data.resume.papers %}
    <div class="paper-block-title">
      <i class="fas fa-book"></i> {{ paper.title }}, <a href="{{paper.link}}">{{ paper.journal }}</a>
    </div>
    <div class="paper-block-subtitle">
        {{paper.authors | join: ", " }}
    </div>
  {% endfor %}
</div>
