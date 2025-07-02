import { useEffect, useState } from "react";

/**
 * useIsDarkMode
 *
 * This hook will return a boolean indicating whether the user's device is set to
 * prefer a dark color scheme. It will also listen for changes to the user's
 * preferred color scheme and update the state accordingly.
 *
 * How it works:
 *
 * 1. On mount, the hook will check the user's preferred color scheme using the
 *    `window.matchMedia("(prefers-color-scheme: dark)")` API. If the user prefers
 *    a dark color scheme, the state will be set to `true`.
 * 2. The hook will then add an event listener to the `window.matchMedia` object
 *    to listen for changes to the user's preferred color scheme.
 * 3. When the user's preferred color scheme changes, the event listener will be
 *    called and the state will be updated accordingly.
 * 4. When the component is unmounted, the hook will remove the event listener to
 *    prevent memory leaks.
 *
 * @returns {boolean} Whether the user's device is set to prefer a dark color scheme.
 */
export function useIsDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;
    // Check if the user prefers dark mode
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const controller = new AbortController();
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener(
      "change",
      (e) => {
        setIsDarkMode(e.matches);
      },
      { signal: controller.signal }
    );

    return () => {
      controller.abort();
    };
  }, []);

  return isDarkMode;
}
