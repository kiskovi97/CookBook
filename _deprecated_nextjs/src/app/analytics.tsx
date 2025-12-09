'use client';

import { useEffect } from "react";
import ReactGa from "react-ga";

declare global {
  interface Window {
    GA_INITIALIZED?: boolean;
  }
}

export default function Analytics() {
  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      ReactGa.initialize("UA-166027980-1");
      window.GA_INITIALIZED = true;
    }

    ReactGa.set({ page: window.location.pathname });
    ReactGa.pageview(window.location.pathname + window.location.search);
  }, []);

  return null;
}
