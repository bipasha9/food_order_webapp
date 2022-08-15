import { useState, useEffect } from "react";
import ToggleButton from "./ToggleButton";

function PushNotification({ user_id, subscription, token }) {
  const [toggle, setToggle] = useState(false);
  const [currentSubscription, setCurrentSubscription] = useState({});
  const [subscribed, setSubscribed] = useState(false);

  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");
    const rawData = window.atob(base64);
    return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
  }
  function registerServiceWorker() { 
    const REACT_APP_PUBLIC_KEY = 'BNv2C2R7Fs7o0OVxHNmDHGKqf5fKNPinye_1ZW031g5mmApEyZzlf-g3TVUX0KzQgZepjBkg7A6LZOzIZBzgi4Q'
    // let swUrl = `${REACT_APP_PUBLIC_KEY}/sw.js`;
    let swUrl = `${process.env.PUBLIC_URL}/sw.js`;
    
    return navigator.serviceWorker
      .register(swUrl)
      .then(function (registration) {
        //  console.log('Service worker successfully registered.');
        return registration;
      })
      .catch(function (err) {
        // console.error('Unable to register service worker.', err);
      });
  }

  const checkAlreadySubscribed = (curSubscription) => {
    //function to check if user is already subscribed
    return curSubscription?.endpoint === subscription?.endpoint;
  };

  useEffect(() => {
    const deriveSubscription = async () => {
      const PUBLIC_KEY = 'BNv2C2R7Fs7o0OVxHNmDHGKqf5fKNPinye_1ZW031g5mmApEyZzlf-g3TVUX0KzQgZepjBkg7A6LZOzIZBzgi4Q';
      const subscribeOptions = {
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(PUBLIC_KEY),
      };
      const SWRegistration = await registerServiceWorker();
      const pushSubscription = await SWRegistration.pushManager.subscribe(
        subscribeOptions
      );
      setCurrentSubscription(pushSubscription); //which sets our subscription object
      const checked = checkAlreadySubscribed(pushSubscription);
      setSubscribed(checked);
      setToggle(checked);
    };
    deriveSubscription();
  }, [subscription]);

  const CanPushNotified = () => {
    if (!("serviceWorker" in navigator)) {
      // Service Worker isn't supported on this browser, disable or hide UI.
      return 0; //0: SW not supported
    }
    if (!("PushManager" in window)) {
      // Push isn't supported on this browser, disable or hide UI.
      return -1; //-1 push manager not supported
    }
    return 1;
  };

  function askPermission() {
    return new Promise(function (resolve, reject) {
      const permissionResult = Notification.requestPermission(function (
        result
      ) {
        resolve(result);
      });

      if (permissionResult) {
        permissionResult.then(resolve, reject);
      }
    }).then(function (permissionResult) {
      if (permissionResult !== "granted") {
        throw new Error("We weren't granted permission.");
      }
    });
  }
  const sendSubscriptionToBackend = (pushSubscription) => {
    return fetch("/api/save-subscription/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(pushSubscription),
    })
      .then(function (response) {
        if (!response.ok) {
          return null;
        }
        return response.json();
      })
      .catch((err) => {
        return null;
      });
  };

  const cancelSubscription = (user_id) => {
    return fetch(`/api/cancel-subscription/${user_id}`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        if (!response.ok) return null;
        return response.json();
      })
      .catch((err) => {
        return null;
      });
  };

  const Subscribe = async () => {
    console.log("Applied for Subscription");
    //check
    if (CanPushNotified() !== 1) {
      alert(
        "The browser doesnot support push notification please update or try different"
      );
      return;
    }
    //ask permission
    askPermission();
    //subscribe
    const subscriptionResponse = await sendSubscriptionToBackend({
      pushSubscription: currentSubscription,
      user_id,
    });
    if (subscriptionResponse) {
      setSubscribed(true);
      setToggle(true);
    }
  };
  const UnSubscribe = async () => {
    const unSubscribeResponse = await cancelSubscription(user_id);
    if (unSubscribeResponse) {
      setSubscribed(false);
      setToggle(false);
    }
  };

  return (
    <div>
      <>
        {subscribed ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            {/* <span
              style={{
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "24px",
                fontFamily: "sans-serif",
                color: "#374151",
              }}
            >
              You Will Be Notified When Orders Recieved{" "}
            </span> */}
            {/* <span style={{ marginTop: "10px" }}>
              <ToggleButton
                toggle={toggle}
                setToggle={setToggle}
                subscribe={Subscribe}
                unsubscribe={UnSubscribe}
              />
            </span> */}
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <span
              style={{
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "24px",
                fontFamily: "sans-serif",
                color: "#374151",
              }}
            >
              Turn ON Notification to get Notified when Orders Received{" "}
            </span>
            <span style={{ marginTop: "10px" }}>
              <ToggleButton
                toggle={toggle}
                setToggle={setToggle}
                subscribe={Subscribe}
                unsubscribe={UnSubscribe}
              />
            </span>
          </div>
        )}
      </>
    </div>
  );
}

export default PushNotification;
