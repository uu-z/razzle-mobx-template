export class Env {
  isSSR() {
    return typeof window === "undefined";
  }
  onBrowser(func) {
    if (this.isBrowser()) {
      func();
    }
  }
  isBrowser() {
    return typeof window === "object";
  }
  isProduction() {
    if (this.isSSR()) {
      return process.env.NODE_ENV === "production";
    }
    return true;
  }
}
