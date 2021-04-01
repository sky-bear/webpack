const { SyncHook } = require("tapable");

class Lesson {
  constructor(...args) {
    this.hooks = {
      arch: new SyncHook(),
    };
  }
  tap(name, fn) {
    this.hooks.arch.tap(name, fn);
  }
  start() {
    this.hooks.arch.tap.call();
  }
}

const lesson = new Lesson()
lesson.tap()
