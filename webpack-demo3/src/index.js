import moment from "moment";
import jquery from "jquery";
import Add from "./a";
import "./reactDom";
console.log(123);

//设置语言
import "moment/locale/zh-cn";
import "react/index";
moment.locale("zh-cn");
let r = moment().endOf("day").fromNow();
console.log(r);
