---
title: "Flutter - How to Show Message in UI after Receving Web Responses"
author: "Sporule"
date: "2019-07-18"
categories: "coding"
tags: "flutter,android"
---

## The Problem

Flutter was quiet hot in the Tech news these days, so I am giving it a try to write an Android app.

It share the similar concept as React, which uses the States system. I wouldn't explain more here as this can be found all over the place in Google.

I did some Windows development before, which has a control "MessageBox" is very useful to give some feedback information to the user.

## Solution

In flutter, it does have something similar call "AlertDialog", however it is not very straightforward.

Below is an example on how to display a message(or any control) on a screen after receving responses from any web services.

To start with, we create a widget as a container for displaying the message.

This widget will be empty for now, but we will have a function later to populate the content of this widget.

```javascript
Widget messageWidget;
```

Then we need to place this widget to the location you want it to be

```javascript
 @override
  Widget build(BuildContext context) {
        return Stack(
      children: <Widget>[
        messageWidget
      ],
    );
}
```

Now we need to create a function to build the messageWidget, it allows user to pass a text string, which is the message you want to display.

```javascript
Widget getMessageController(String text){
    return Stack(
      children: <Widget>[
        Align(
          alignment:Alignment.topCenter,
          child: Text(text, style: new TextStyle(
            color: Colors.white,
            fontSize: 15.0,
            fontWeight: FontWeight.bold,
          )),
        )
      ],
    );
  }
```

Finally we have a function to handle the request to API

```javascript
void handleMessage() async{
    setState(() {
      messageWidget = getMessageController("Sending Request....");
    });
    String response= await http.get("https://google.com");
    //change the message in the message controller after receiving the response
    setState(() {
        messageWidget = getMessageController("Response received");
      });
    }
    //dismiss the message box after 3 seconds
    new Future.delayed(new Duration(seconds: 3), () {
      setState(() {
        setState(() {
          //dismiss the message box
          messageWidget = null;
        });
      });
    });

  }
```

You can simply replace the messageWidget to a AlertDialog and then provide a button for user to dismiss the messagebox.

Overall if you package this into a class, then you will be able to reuse this in all places in your Flutter application.

At the end, I am still quiet new to Flutter,  please do let me know if you have better way to implement the messagebox.
