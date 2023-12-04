import { getAuth, sendSignInLinkToEmail } from "firebase/auth";

export default class FirebaseProvider {
  private auth: ReturnType<typeof getAuth>;

  static #instance?: FirebaseProvider;

  static get instance() {
    if (!FirebaseProvider.#instance) {
      FirebaseProvider.#instance = new FirebaseProvider();
    }

    return FirebaseProvider.#instance!;
  }

  private actionCodeSettings = {
    handleCodeInApp: true,
    url: window.location.href + "finish-signup/",
    iOS: {
      bundleId: "com.oasis.beelearn",
    },
    android: {
      packageName: "com.oasis.beelearn",
      installApp: true,
      minimumVersion: "12",
    },
    dynamicLinkDomain: "beelearn.page.link",
  };

  constructor() {
    this.auth = getAuth();
  }

  async sendSignInLinkToEmail(email: string) {
    await sendSignInLinkToEmail(this.auth, email, this.actionCodeSettings);
    window.localStorage.setItem("emailForSignIn", email);
  }
}
