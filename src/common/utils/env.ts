export class Env {
  isSSR() {
    return typeof window === "undefined";
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
