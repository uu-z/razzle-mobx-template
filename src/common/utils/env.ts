export class Env {
  isSSR() {
    return typeof window === "undefined";
  }
  onSSR(func) {
    if (this.isSSR()) {
      func();
    }
  }
  isBrowser() {
    return typeof window === "object";
  }
  onBrowser(func) {
    if (this.isBrowser()) {
      func();
    }
  }
}
