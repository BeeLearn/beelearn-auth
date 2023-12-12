import { initializeApp, type FirebaseOptions } from "firebase/app";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  console.log(config.public);
  const firebaseConfig: FirebaseOptions = config.public.firebaseConfig;
  
  initializeApp(firebaseConfig);
});
