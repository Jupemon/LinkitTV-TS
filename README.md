This is a remake of [LinkitTV](https://github.com/Jupemon/LinkitTV) project i have previously made.

# Linkit TV

## The idea behind the project

The rise of [Reaction Content](https://en.wikipedia.org/wiki/Reaction_video) gave me a great idea. I decided to create an app where livestreamers could watch online videos during a stream. A streamer can visit the site and share the generated URL link with their fans. The Fans can send videos to be watched by the livestreamer. Think of it as an online TV screen where you can share the remote with anyone on the internet.

## How it works

I made a [Youtube video](https://www.youtube.com/watch?v=v72WnalJ8ss&ab_channel=Jupemon) explaining how it works


## Tools / dependencies used

- Created with **React** & **Node**

- **Express** used for creating the API.

- **Bodyparser** Used for parsing HTTP request bodies.

- **NextJs** React framework which serves prerendered web pages and renders all React components on the server. It allows combining frontend and backend into a single web project.

- **cross-env** Custom nextjs servers can't be hosted withouth this, dont ask me why

- **Socket.IO** Used for real time bidirectional communication between the server and client. Allows the server to initiate communication with frontend client when certain events happen. Often used when building instant chat apps.

- **Youtube Iframe API** I also needed to choose an embedded player which could play online videos. Youtube was the natural choice because of its popularity and massive video library. Google also has great [Documentation](https://developers.google.com/youtube/iframe_api_reference). It took me a while to figure out how to get it working with React components.

- **Heroku** The hardest part was hosting the project. NEXTJS has some major configuration issues with HEROKU but i eventually got it working.


## Links

- [View project](https://linkit-tv-ts.herokuapp.com/)

- Hosted on heroku with free tier, initial loading might be slow
