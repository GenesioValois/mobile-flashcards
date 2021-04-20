import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
// import * as Permissions from "expo-permissions";
const NOTIFICATION_KEY = "FlashCardsNotifications";

export async function clearLocalNotification() {
  const identifier = await AsyncStorage.getItem(NOTIFICATION_KEY);
  if (!identifier) {
    return false;
  }
  await AsyncStorage.removeItem(NOTIFICATION_KEY);
  Notifications.cancelAllScheduledNotificationsAsync();
}

export async function setLocalNotification() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

export async function schedulePushNotification() {
  const identifier = await Notifications.scheduleNotificationAsync({
    content: {
      title: "It's Quiz time",
      body: "👋 Don't forget to do at least one quiz today!!",
      data: { data: "goes here" },
    },
    trigger: { seconds: 12 * 60 * 60, repeats: true },
  });
  AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(identifier));
}
