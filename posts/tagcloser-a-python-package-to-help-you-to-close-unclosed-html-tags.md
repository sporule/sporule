---
title: "TagCloser - A Python package to help you to close unclosed HTML Tags"
author: "Sporule"
date: "2018-12-07"
categories: "coding"
tags: "python, tagcloser, excerpt"
coverimage: "https://i.imgur.com/xccQnBJ.png"
---


## The Concept

The reason for me to create this package is I have had excerpt issues in my blog.

My blog's layout will change if my post excerpt have unclosed tag, I was using a plain text excerpt to replace HTML excerpt but it does not look great.

The solution itself is very simple, the logic is:

- Finding all open html tags and close tags
- Match open tags with close tags, find the tags that are not closed
- Close the unclosed tags by adding them at the end of the excerpt

It is dead simple but I think it is very useful.

## How To Use

### Installing

Install it through pip

```python
pip install tagcloser
```

### Integrate with your code

```python
import tagcloser

sample_html = '<div>This is a unclosed tag html'
closed_html = tagcloser.close_tags(sample_html)
#It will return '<div> This is a unclosed tag html </div>'
```

### Github Repositry

[TagCloser](https://github.com/Hao-Luo/TagCloser)
