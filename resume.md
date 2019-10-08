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
      <a href="mailto:{{site.data.resume.email}}"><i class="far fa-envelope"></i></a> | 
      <a href="{{site.data.resume.linkedin}}"><i class="fab fa-linkedin-in"></i></a> | 
      <a href="{{site.data.resume.link}}"><i class="fas fa-globe"></i></a> | 
      <a href="{{site.data.resume.github}}"><i class="fab fa-github"></i></a> | 
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
      <i class="fa fa-calendar"></i> {{ exp.duration }} | {{ exp.company }}
    </div>
    <div class="resume-block-content">
      {{ exp.description }}
    </div>
  </div>
  {% endfor %}
  </div>


## Education
<div class="resume-section-content">
    {% for edu in site.data.resume.education %}
    <div class="resume-block">
      <div class="resume-block-title">
        {{ edu.university }}
      </div>
      <div class="resume-block-subtitle">
        <i class="fa fa-calendar"></i> {{ edu.duration }} | {{ edu.location }}
      </div>
      <div class="resume-block-content">
        {{ edu.major }}
      </div>
    </div>
    {% endfor %}
</div>

## Skills
<div class="resume-section-content">
  {% for skill in site.data.resume.skills %}
  <div class="resume-block">
    <div class="resume-block-title">
      {{ skill.title }}
    </div>
    <div class="resume-block-content">
      {{ skill.items }}
    </div>
  </div>
  {% endfor %}
  </div>

## Publications
<div class="resume-section-content">
  {% for paper in site.data.resume.papers %}
  <div class="resume-block">
    <div class="resume-block-title">
      {{ paper.title }}
    </div>
    <div class="resume-block-subtitle">
        {{paper.authors | join: ", " }}
    </div>
  </div>
  {% endfor %}
</div>
