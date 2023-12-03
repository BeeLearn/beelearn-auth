import type { FirebaseOptions } from "firebase/app";

export default defineNuxtConfig({
  css: ["@unocss/reset/tailwind.css", "@/global.css"],
  devtools: { enabled: false },
  modules: ["@unocss/nuxt", "@nuxtjs/google-fonts"],
  runtimeConfig: {
    public: {
      iosBundleId: "",
      androidPackageName: "",
      firebaseConfig: {} as FirebaseOptions,
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

