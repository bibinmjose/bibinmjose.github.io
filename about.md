---
layout: article
titles:
chart: true
---

<div class="item">
  <div class="item__image">
  <script>
    console.log("{{ site.url}}")
    console.log("{{ site.baseurl}}")
  </script>
    <img class="image image--sm" src="{{site.author.avatar}}"/>
  </div>
  <div class="item__content">
    <div class="item__header">
      <h2>About me</h2>
    </div>
    <div class="item__description">
      <p>
      Hi, this is Bibin Jose. I am Data-Scientist working on multiple enterprise level solutions focused on timeseries forecasting and computer vision. I started this blog to aggregate interesting stuff I pick up. Although this keeps me in track of what I've learnt, time seldom permits frequent updates. Hope you could find something useful here. I am also grateful to <a href="https://github.com/kitian616/jekyll-TeXt-theme">Tian Qi</a> for this theme. Tired of wordpress and monthly charges, I am migrating all things I have written across multiple platforms across last few years to this jekyll site. I have to admit, <b>I<span style='font-size:15px;'> &#128150;</span> Jekyll</b> that I keep learning something new about it whenever I want to update.
      </p>
    </div>
  </div>
</div>

```chart
{
  "type": "radar",
  "data": {
    "labels": [
      "Eating",
      "Drinking",
      "Sleeping",
      "Designing",
      "Coding",
      "Cycling",
      "Running"
    ],
    "datasets": [
      {
        "label": "My First dataset",
        "backgroundColor": "rgba(179,181,198,0.2)",
        "borderColor": "rgba(179,181,198,1)",
        "pointBackgroundColor": "rgba(179,181,198,1)",
        "pointBorderColor": "#fff",
        "pointHoverBackgroundColor": "#fff",
        "pointHoverBorderColor": "rgba(179,181,198,1)",
        "data": [
          65,
          59,
          90,
          81,
          56,
          55,
          40
        ]
      },
      {
        "label": "My Second dataset",
        "backgroundColor": "rgba(255,99,132,0.2)",
        "borderColor": "rgba(255,99,132,1)",
        "pointBackgroundColor": "rgba(255,99,132,1)",
        "pointBorderColor": "#fff",
        "pointHoverBackgroundColor": "#fff",
        "pointHoverBorderColor": "rgba(255,99,132,1)",
        "data": [
          28,
          48,
          40,
          19,
          96,
          27,
          100
        ]
      }
    ]
  },
  "options": {}
}
```