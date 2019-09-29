---
title: "Module parse failed Unexpected character'' error when using Webpack for Fontawsome from OnsenUI"
author: "Sporule"
date: "2019-07-12"
categories: "coding"
tags: "webpack,onsenui,fontawsome"
coverimage: "https://www.valentinog.com/blog/wp-content/uploads/2018/01/tutorial-webpack-4-featured.png"
---

## The problem

I was using webpack to package the woff file from fontawsome in OnsenUI, however it raise the error:

```bash
ERROR in ./~/onsenui/css/font_awesome/fonts/fontawesome-webfont.woff?v=4.7.0
Module parse failed: C:\Users\luoha\Documents\Projects\spplayer-pwa\node_modules\onsenui\css\font_awesome\fonts\fontawesome-webfont.woff?v=4.7.0 Unexpected character '' (1:4)
You may need an appropriate loader to handle this file type.
```

## Cause

I have spent quiet a lot of time to find out the reason, end up the solution is very simple.

I was using regex to match the woff file:

 {
        test: /\.(woff|woff2|eot|ttf|svg)/,
        loader: 'file?name=assets/[name].[ext]'
 }
However the woff file name is actually fontawesome-webfont.woff?v=4.7.0, it contains a version number at the end. As a result, it does not fit into the pattern of my regex hence webpack didn't load them.

## Solution

The solution is add a pattern at the end to match possible versions:

{
      test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
      loader: 'file?name=assets/[name].[ext]'
}
