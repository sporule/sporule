---
title: "Integration of CKEditor 4 with Imgur Plugin (Image Uploading)"
author: "Sporule"
date: "2018-10-22"
categories: "coding"
tags: "sporule,ckeditor,imgur,javascript"
coverimage: "https://ckeditor.com/assets/images/og/ogimage-ck4-1ea514a336.png"
---

## Introduction

I was trying out different rich text editors for web, they all good but I found CKEditor 4 is the easiest to set up.

## How to Implement

### Download

Go to [CKEditor Builder](https://ckeditor.com/cke4/builder).
Click download after you pick the plugins, skins and langauges you want. Save the CKEditor files in the server. You can delete the example folder.

### Insert into your html file

- Add a textarea with id editor in your page.

```javascript
<textarea id="editor"></textarea>
```

- Load the ckeditor.js and the config.js from the downloaded files.

```javascript
<!-- CK  Editor Module -->
<script src="/static/ckeditor/ckeditor.js"></script>
<script src="/static/ckeditor/config.js"></script>
```

- Use Javascript in the page to initiate the CKEditor.

```javascript
CKEDITOR.replace( '#editor' );
```

- Thats it, check your page and you will be able to see the CKEditor.
- For uploading image, I have selected the Imgur plugin which allows me to upload the image to Imgur (Imgur is a free online image storage cloud) easily, what you need is a Client Id from the Imgur API, and then add it to the config.js

```javascript
config.extraPlugins = 'imgur';
config.imgurClientId = 'Your-Client-id';
```
