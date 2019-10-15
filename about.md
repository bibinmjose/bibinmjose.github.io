---
layout: article
titles:
---

<!-- <div class="card">
  <div class="card__image">
    <img class="image" src="{{ site.author.avatar }}"/>
  </div>
  <div class="card__content">
    <div class="card__header">
      <h4>About me</h4>
    </div>
    <p>
    I started this blog as an aggregator of my work in data science and computing over the years.
    </p>
  </div>
</div> -->

<div class="item">
  <div class="item__image">
  <script>
    console.log("{{ site.url}}")
    console.log("{{ site.baseurl}}")
  </script>
    <img class="image image--sm" src="{{ site.baseurl}}{{site.author.avatar }}"/>
  </div>
  <div class="item__content">
    <div class="item__header">
      <h4>About me</h4>
    </div>
    <div class="item__description">
      <p>
      I started this blog to aggregate interesting stuff I pick up. This keeps me in track of what I've learnt although time seldom permits frequent updates. Hope you could find something useful here. I am also grateful to <a href="https://github.com/kitian616/jekyll-TeXt-theme">Tian Qi</a> for this theme.
      </p>
    </div>
  </div>
</div>