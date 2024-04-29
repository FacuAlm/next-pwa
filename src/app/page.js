"use client"
import React, { useEffect, useState } from "react";
import {
  checkPermission,
  requestNotificationPermission,
  registerSW,
  subscribe,
} from "../../public/service-worker.js";

export default function Page() {
  const [notificationError, setNotificationError] = useState(null);

  useEffect(() => {
    async function initializeServiceWorker() {
      try {
        checkPermission();
        await requestNotificationPermission();
        await registerSW();
        await subscribe();
      } catch (error) {
        setNotificationError(error.message);
      }
    }

    initializeServiceWorker();
  }, []);

  const sendNotificationToServiceWorker = () => {
    if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: "SEND_PUSH_NOTIFICATION",
      });
    }
  };

  return (
    <div>
      <h1 className="font-bold text-3xl">Hola Mundo</h1>
      {notificationError && (
        <div className="error-message">{notificationError}</div>
      )}
      <button onClick={sendNotificationToServiceWorker}>
        Send Notification
      </button>
    </div>
  );
}
