console.log("test3");

// const dom = document.createElement("div");
// dom.innerText = "加载";
// dom.addEventListener("click", () => {
//   console.log(123);
//   // 利用es6草案， jsonp加载
//   import("./source.js").then((data) => {
//     console.log(data);
//   });
// });

// document.body.appendChild(dom);

import a from "./source";
console.log(a);
if (module.hot) {
  module.hot.accept("./source", () => {
    console.log("文件更新了");
    let data = require("./source");
  });
}
