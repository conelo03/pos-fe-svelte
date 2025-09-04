import { writable } from "svelte/store";
import { browser } from "$app/environment";

const defaultTheme = "light";
// const defaultTheme = "cmyk";

export const theme = writable<string>(defaultTheme);

export const themeController = {
  init: () => {
    if (browser) {
      // check local storage
      let initThemes = localStorage.getItem("theme");
      if (!initThemes) {
        localStorage.setItem("theme", defaultTheme);
        initThemes = defaultTheme;
      }
      // console.log(window.matchMedia("(prefers-color-scheme: dark)"));

      // Check system preference
      // const prefersDark = window.matchMedia(
      //   "(prefers-color-scheme: dark)"
      // ).matches;

      // console.log(prefersDark);
      // const initialTheme = prefersDark ? "dracula" : "cmyk";

      // const initialTheme = localStorage.getItem("theme");
      themeController.set(initThemes);
    }
  },

  set: (newTheme: string) => {
    if (browser) {
      document.documentElement.setAttribute("data-theme", newTheme);
      theme.set(newTheme);
      localStorage.setItem("theme", newTheme);
    }
  },

  toggle: () => {
    theme.update((current) => {
      const newTheme = current === "light" ? "dark" : "light";
      // const newTheme = current === "cmyk" ? "dracula" : "cmyk";
      themeController.set(newTheme);
      return newTheme;
    });
  },
};
