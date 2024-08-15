# [Zápisky z výletů](https://zadnyspe.ch/)

My personal blog with reports from trips to forests, mountains, cities, undergrounds, lakes, lowlands, highlands, pastures, wastelands, railways, urbexes, ravines, pubs, hills, bicycle races...

Written in czech.

[https://zadnyspe.ch/](https://zadnyspe.ch/)

## Running locally

1. `npm install`
2. `hexo serve`

## Deploying

The website is served by Netlify. The generation is too heavy for their free tier CI runners so this needs to be build locally and deployed using netlify CLI.

1. Install [Netlify CLI](https://github.com/netlify/cli).
2. `netlify build`
3. `netlify deploy` to deploy to a one-off subdomain. Check everything looks alright.
4. `netlify deploy --prod`. It's life!
