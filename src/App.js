import React, { useEffect, useState, useRef } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as StoreProvider } from "react-redux";
import store from "./store";
import Layout from "./components/Layout";
import { setLocalNotification, schedulePushNotification } from "./notification";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {
    setLocalNotification()
      .then((token) => setExpoPushToken(token))
      .catch((error) => console.log(error));
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });
    schedulePushNotification();
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <Layout />
      </PaperProvider>
    </StoreProvider>
  );
}
