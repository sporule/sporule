---
title: "Manually Set Storage Folder for Android Apps that run in ARChon (Chrome)"
author: "Sporule"
date: "2019-08-01"
categories: "notes"
tags: "cors,cors-anywhere,pwa,heroku"
coverimage: "https://techdissected.com/wp-content/uploads/2015/04/Archon-Custom-Runtime-1920x500.jpg"
---

## Backgrounds

ARChon is a very useful software where allows users to run android application in Chrome.

However, you will need to set the external storage permission for the apk to specify the storage location for the Android app.

This is extremly useful when you are trying to use the video or music app to cache content.

## Implementation

It is very easy to do it, what you need to do is to change the manifest.json file in the apk package.

I am using Deepin LInux system, the apps folder are in

```bash
/lastore/apps/
```

Find below two entries(enableExternalDirectory and fileSystem) and ensure they look like below:

```bash
"enableExternalDirectory": true,
"fileSystem": [
        "write","directory"
      ]
```

That is it, so simple. You will get a pop up folder selector when you open your ARChon Apps.

## Credit

[Github Q&A](https://github.com/vladikoff/chromeos-apk/issues/199)
