FROM ruby:2.6
RUN curl https://raw.githubusercontent.com/bibinmjose/bibinmjose.github.io/master/jekyll-text-theme.gemspec -o "jekyll-text-theme.gemspec"
RUN curl https://raw.githubusercontent.com/bibinmjose/bibinmjose.github.io/master/Gemfile -o "Gemfile"
RUN bundle install
EXPOSE 4000
WORKDIR /app
ENTRYPOINT [ "bash" ]