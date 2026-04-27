"use client";

import { useEffect } from "react";

const GA4_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

function injectGA4() {
  if (!GA4_ID || document.getElementById("ga4-script")) return;

  const script = document.createElement("script");
  script.id = "ga4-script";
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
  script.async = true;
  document.head.appendChild(script);

  const init = document.createElement("script");
  init.id = "ga4-init";
  init.textContent = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA4_ID}');`;
  document.head.appendChild(init);
}

function injectMetaPixel() {
  if (!META_PIXEL_ID || document.getElementById("meta-pixel-script")) return;

  const script = document.createElement("script");
  script.id = "meta-pixel-script";
  script.textContent = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`;
  document.head.appendChild(script);
}

function loadAnalytics() {
  injectGA4();
  injectMetaPixel();
}

export default function AnalyticsProvider() {
  useEffect(() => {
    if (localStorage.getItem("cookie_consent") === "accepted") {
      loadAnalytics();
    }

    function handleConsent(e: Event) {
      if ((e as CustomEvent<string>).detail === "accepted") {
        loadAnalytics();
      }
    }

    window.addEventListener("cookie-consent", handleConsent);
    return () => window.removeEventListener("cookie-consent", handleConsent);
  }, []);

  return null;
}
