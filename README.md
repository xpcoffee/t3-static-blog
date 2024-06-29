# Static blog

Testing out building a static blog using NextJS. Don't use this as a reference; it's going to get real messy in here.

Notes (most recent at the top)
- I don't see a standard plugin for deploying to S3 static sites (surprising, would have expected there to be a community around this style of site). Ended up writing my own.
- there's no routing to dynamic routes in a static export (!); that means I either need to render everything as a /path/index.html OR have custom routing at the S3 bucket layer...
- type checking and linting from t3 app is really good. I've learned a few things (e.g. annotation as void for promises and marking individual imports as types); it's also caught a couple minor bugs. Thanks, t3!
- ts-node swapped out for tsx; very surprised that it doesn't work well out of the box for ESM
- lots of small papercuts, but really quite easy to fix them incrementally; the migration to NextJS will be worth it if this ease of change keeps up
- The rehype ecosystem has some cool packages, but not many stars/follows which is weird (expected huge amounts of usage...)
- MDX remote makes things pretty nice
- Currently need to read markdown content twice: 1 for static props and 1 to render the page (not great..)
- Started with T3 to get sane defaults, but I don't need the full-stack stuff (need typescript + tailwind)
- NextJS seems like the main tool at the moment that can do static rendering
- I want to move off of GatsbyJS for my personal website
  - the plugin ecosystem feels broken; lots of incompatibilities between important plugins
  - lots of dependencies are not up to date with either gatsby or with security updates
  - I needed to re-write large parts of the data processing layer when moving from v4 to v5; the migration guide missed a lot w.r.t mdx
  - so I end up re-writing the ecosystem and needing to understand the bowels of transforming queries to different parts of my website; I don't spend much time on the website itself...
