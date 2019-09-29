---
title: "Learn D3.js and Build a simple Mind Map web application in a day with Flask"
author: "Sporule"
date: "2018-10-13"
categories: "coding"
tags: "d3.js,python,flask,javascript"
coverimage: "https://i0.wp.com/blog.knoldus.com/wp-content/uploads/2017/06/d3logo.png?fit=590%2C313&ssl=1"
---

## Introduction

D3.js it is a popular tool for Data Visualisation, I have spent a day to explore it and built a simple mind map application.

The application structure is quiet simple:

- Back-end: Web API by Flask in Python
- Front-end: D3.js

![mind map](https://i.imgur.com/RJHtEm1.png) 

As the focus is mainly on trying the D3.js, so the web api doesn't come with any security implementation.

In addition, the JavaScript code is not organised very well. I might improve the code in the future if I have some spare time.

## Key Feature of D3.js

The only key feature I learned from the day is D3.js provides a very simple way to select New Data, Modified Data and Removed Data.

1. New Data is accessed by blocks.enter()

2. Modified Data is accessed by blocks

3. Removed Data is accessed by blocks.exit()

These three functions enable the developer to update the graph simply.

## Implementation

### Functionality of the Mind Map app

1. Add a new mind block by left click any empty spaces

2. Create a link between mind blocks by dragging from one to the other.

3. Move mind blocks by dragging the special area in the block.

4. Auto size of the mind blocks according to the content length.

5. Save the current layout and blocks by click save.
  
### What is the Design

1. Created two global arrays(Not a good practise): Blocks_Data for block information and Links_Data(Contains Parent and Child Information) for block links information

2. Few functions to implement the link the blocks and store the information into Links_Data

3. Convert two global arrays to JSON and save into the database through Web API.(Not a good practise)

### Check The Code

Please do check the GitHub code if you want to know the details, the repository is [hao-hao-hao/D3MindMap](https://github.com/hao-hao-hao/D3MindMap) .
