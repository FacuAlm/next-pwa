//Check permissions
export const checkPermission = () => {
  if (!("serviceWorker" in navigator)) {
    throw new Error("No support for service worker!");
  }

  if (!("Notification" in window)) {
    throw new Error("No support for notification API");
  }

  if (!("PushManager" in window)) {
    throw new Error("No support for Push API");
  }
};

export const requestNotificationPermission = async () => {
  const permission = await Notification.requestPermission();

  if (permission !== "granted") {
    // Manejar la situación de error mostrando un mensaje al usuario
    throw new Error(
      "Para recibir notificaciones, necesitas permitir los permisos de notificación en tu navegador."
    );
  }
};

export const registerSW = async () => {
  const registration = await navigator.serviceWorker.register("./sw.js");
  return registration;
};

export const subscribe = async () => {
  let sw = await navigator.serviceWorker.ready;
  let push = await sw.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey:
      "BDSIh3BSC70FVGo3fo39aAgTLivEYZv3S60Mn-tGSJY0JTCxe76-TbW2llAXukQHm-Fwc6oiuEnvvDcIWxy57bA", //Public VAPID key
  });
  console.log(JSON.stringify(push));
};
