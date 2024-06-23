# Static blog

Testing out building a static blog using NextJS. Don't use this as a reference; it's going to get real messy in here.

Notes (most recent at the top)

- Currenlty need to read markdown content twice: 1 for static props and 1 to render the page (not great..)
- Started with T3 to get sane defaults, but I don't need the full-stack stuff (need typescript + tailwind)
- NextJS seems like the main tool at the moment that can do static rendering
- I want to move off of GatsbyJS for my personal website
  - the plugin ecosystem feels broken; lots of incompatibilities between important plugins
  - lots of dependencies are not up to date with either gatsby or with security updates
  - I needed to re-write large parts of the data processing layer when moving from v4 to v5; the migration guide missed a lot w.r.t mdx
  - so I end up re-writing the ecosystem and needing to understand the bowels of transforming queries to different parts of my website; I don't spend much time on the website itself...
