import { num } from "@/src/api/index";
console.log("首页");

class A {
  constructor(a) {
    this.a = a;
  }
  get() {
    console.log("出错了");
  }
}
const a = new A(1);

console.log(a.a);
a.get();

console.log(num);

const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    console.log(xhr.responseText);
  }
};
xhr.open("GET", "/api/user", true);
xhr.send();
