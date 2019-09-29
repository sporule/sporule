---
title: "EXOPlayer source error on Android 8 and above"
author: "Sporule"
date: "2019-07-12"
categories: "coding"
tags: "android,exoplayer,java"
coverimage:"https://miro.medium.com/max/3092/1*oxK1gF5zFP9z9_9qFDOKlQ.png"
---

## The Problem

EXOPlayer is  an open source video player for mobile.
Yesterday I was trying to use EXOPlayer in my Pixel but it couldn't stream video (m3u8) by using EXOPlayer.

The error message is not very clear: "Source Error, can't connect to http://xxxxxxxx"

I was very confused as I am pretty sure the url I passed in is working OK.

## The Cause

I spent 20 minutes trying to resolve the issue, finally I found a small hidden error message in the console says "Cleartext HTTP traffic not permitted".

The new error message is very clear, the solution is simply add android:usesCleartextTraffic="true" into the mainfest:

```javascript
 <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="xxxxxx"
        android:supportsRtl="true"
        android:theme="@style/AppTheme"
        android:usesCleartextTraffic="true">
```

Works perfectly fine after adding the usesClearText, you will need to add this for Android 8.0 and above.

Please note that you should not use clear text traffic if the informatin you are trying to send is confidential.
