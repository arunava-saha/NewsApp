// pages/_app.js

import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log("Service worker registration successful:", registration);
        })
        .catch((error) => {
          console.error("Service worker registration failed:", error);
        });
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
