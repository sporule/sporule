---
title: "Solutions for Cross Origin Request Security (CORS) in PWA (Progressive Web Apps)"
author: "Sporule"
date: "2019-07-23"
categories: "coding"
tags: "cors,cors-anywhere,pwa,heroku"
---

## Backgrounds

I was building a PWA app that consumes APIs from some providers.

As PWA is just a web app, so it has the exactly the same CORS restrictions as other web apps.

You won't have this type of issue if you are using native development, so it is very annoying as I don't have access to those APIs server to enable Cross Origin Request.

By browsing in Google, I found someone built a solution that enables a reverse proxy to overcome this difficulties.

## Solution

The name is CORS-ANYWHERE, the github link is https://github.com/Rob--W/cors-anywhere/ 

This is a very simple and neat solution to solve the problems for small projects.

Depends on the traffic of your project, you can buy different servers with different specification, I used Heroku free server as my application is relatively small.

## Steps to create the reverse proxy in Heroku free instance

Register a free account in Heroku, please verify your email as per instruction in Heroku.
Then Create a new app:
![heroku](https://i.imgur.com/IVXFYbt.png)
Follow the instruction to install Heroku CLI and GIT if you didn't have them installed before.
![heroku](https://i.imgur.com/2ovsWYO.png)
Open your terminal or cmd(Windows).
Clone the CROS-anywhere from Github

```bash
git clone https://github.com/Rob--W/cors-anywhere.git
cd cors-anywhere/
```

Login to Heroku and add your app as a remote repo, then push the app to the app

```bash
heroku git:remote -a enteryourappname
git push heroku master
```

It will build the app and return a link to your app, use this app as a reverse proxy.
[heroku](https://i.imgur.com/2ovsWYO.png)

## How to Use it

>- You can use it by adding your app url as a prefix to your api, for example your heorku url is "https://abc.herokuapp.com/", your API is "https://api.com/user".
>- What you need to do is to send the request to "https://abc.herokuapp.com/https://api.com/user", it will return whatever will be returned from the API server.
>- You can test the API by using the demo CROS-anywhere demo: https://cors-anywhere.herokuapp.com/
