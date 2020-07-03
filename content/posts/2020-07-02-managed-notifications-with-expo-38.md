---
template: post
title: Managed Notifications with Expo 38
slug: expo-38-notifications-example
draft: false
date: 2020-06-30T18:32:59.580Z
description: >-
  Expo version 38 was just released this month, and among the new features was a
  revamp of the Notifications API to support managed workflows. It's now easier
  than ever to create a simple mobile app that can schedule notifications and
  perform an action when those notifications are dismissed.


  In this post, I'm going to create a mobile app that will remind me to turn off the lights and do so upon notification dismissal.
category: Project
tags:
  - Project
  - React Native
  - Mobile
---
[Expo version 38](https://blog.expo.io/expo-sdk-38-is-now-available-ab6cd30ca2ee) was just released this month, and among the new features was a revamp of the Notifications API to support managed workflows. It's now easier than ever to create a simple mobile app that can schedule notifications and perform an action when those notifications are dismissed.

In this post, I'm going to create a mobile app that will remind me to turn off the lights every night and have it do so when the notification is dismissed.

> How many app notifications does it take to turn off a lightbulb?
>
> Just one, but whether it turns off the correct lightbulb is a different concern...

## Project setup

```sh
// Install the necessary npm libraries
npm i -g create-react-native-app expo-cli

// Pull the starter project and give it a name
npx create-react-native-app -t with-typescript
```

To test your app, download the Expo mobile app from the iOS or Android App Store.

An expo account will be necessary to generate a push notification token. Register at [expo.io](https://expo.io/signup) and then use the same login credentials to link your account to your current terminal session. 

```sh
// Log in
expo login

// Start the app
npm start
```

A QR code will be generated to allow the Expo app to bundle the test application on your phone.

## The code

Follow along with the code at [this repo](https://github.com/dskline/dskline-home).

Some small modifications were made to the initial create-react-native-app starter project - mainly the addition of absolute path support.

```
// src/features/Notification/useNotification.ts

export const useNotification = () => {
  // settings are best placed in a separate hook
  useNotificationOptions()

  // generate the previously mentioned Expo push token
  const pushToken = usePushToken()

  const [messages, setMessages] = useState([])

  useEffect(() => {
    // After a push token has been generated, send all notifications
    if (pushToken && messages.length) {
      messages.forEach((message) => {
        fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: pushToken,
            ...message,
          }),
        }).catch(console.error)
      })
      setMessages([])
    }
  }, [pushToken, messages])

  // Add a notification to the queue
  const sendNotification = (message: NotificationContentInput): void => {
    setMessages([...messages, message])
  }

  return {
    sendNotification,
    scheduleNotification: Notifications.scheduleNotificationAsync,
    notificationClickedListener:
      Notifications.addNotificationResponseReceivedListener,
  }
}
```

With our notification hook, we can start adding consumers:

```
// src/features/NotificationLightsOff/useLightsOffNotification.ts

export const useLightsOffNotification = (): void => {
  const {
    scheduleNotification,
    notificationClickedListener,
  } = useNotification()

  useEffect(() => {
    const notificationText = 'Press to turn off the lights'

    scheduleNotification({
      content: {
        title: 'Bed time!',
        body: notificationText,
      },
      // Trigger every day at 10:00pm
      trigger: {
        repeats: true,
        hour: 22,
        minute: 0,
      },
    })

    const subscription = notificationClickedListener((response) => {

      // Make sure the pressed notification is the one we want
      if (response.notification.request.content.body === notificationText) {

        // This function will depend on your home setup
        turnLightsOff()
      }
    })

    return (): void => subscription.remove()
  })
}
```

I have implemented the `turnLightsOff()` function by having another home device (an Amazon Fire tablet) listen for notifications from [Pushbullet](https://www.pushbullet.com/) through a popular automation app called [Tasker](https://play.google.com/store/apps/details?id=net.dinglisch.android.taskerm&hl=en_US). There are APIs for interacting with a multitude of smart lights, but I found this workflow to be simpler. The main focus of this guide is the expo-notification API.

```
// App.tsx

import { useLightsOffNotification } from 'src/features/NotificationLightsOff/useLightsOffNotification'

export default function App (): ReactNode {
  useLightsOffNotification()

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
    </View>
  )
}
```

Adding the feature to the root of the app should now give you a result that looks like this:

![Notification Screenshot](/media/screenshot_20200701-213502_expo-galaxy-s8.png "Notification Screenshot")

## APK Publishing

You probably don't want to keep the Expo client running on your computer in order to keep your mobile app alive. In order to create a standalone app, you'll want to generate and install an APK from your React Native project.

If you're using an Android device, this is quite simple. First, you'll want to install a JDK ([mac download](https://mac.filehorse.com/download-java-development-kit/)) so that Expo can automatically generate certificates. Then, run the CLI command: `expo build:android`, choose "APK" and "Generate new keystore". This will take some time as a free user, but eventually you'll receive a link to a universal APK file that your device can install.

## Stay Tuned...

More work is still being done on the refactored expo-notifications API. Personally, I'm excited for notification categories which already has a [pull request](https://github.com/expo/expo/pull/9015) in code review. Notification categories will allow interactive buttons on notification, for example, to ask the user if they would like to cancel, snooze, or complete an action.

## Resources

* [Expo 38 release post](https://blog.expo.io/expo-sdk-38-is-now-available-ab6cd30ca2ee)

* [GitHub: expo-notifications API](https://github.com/expo/expo/tree/master/packages/expo-notifications)

* [Source code](https://github.com/dskline/dskline-home) for this post

* [Dimmy.club](https://dimmy.club/) for providing a mock phone border for mobile screenshots (very cool!)
