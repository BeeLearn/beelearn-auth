import type { FirebaseOptions } from "firebase/app";

export default defineNuxtConfig({
  css: [
    "@unocss/reset/tailwind.css",
    "vue-toast-notification/dist/theme-sugar.css",
    "@/global.css",
  ],
  devtools: { enabled: false },
  modules: ["@unocss/nuxt", "@nuxtjs/google-fonts", "@pinia/nuxt"],
  runtimeConfig: {
    public: {
      iosBundleId: "",
      androidPackageName: "",
      dashboardDomain: "",
      dashboardBaseUrl: "",
      firebaseConfig: {} as FirebaseOptions,
    },
  },
  build: {
    rollupOptions: {
      external: ["@headlessui/vue"],
    },
  },
  googleFonts: {
    families: {
      "Albert+Sans": [100, 200, 300, 400, 500, 600, 700, 800, 900],
      "Noto+Sans": [100, 200, 300, 400, 500, 600, 700, 800, 900],
      Inter: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
    base64: true,
    outputDir: "assets",
    fontsDir: "fonts",
    stylePath: "css/font.css",
  },
  components: [{ path: "~/components" }, { path: "~/components/quizTabs" }],
});

