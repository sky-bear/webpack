import './a.js'
import './styles/index.less'
import Login from './ai.png'


console.log(123654)



const fn = () => {
  console.log('ES6语法')
}
fn()

const map = new Map()
map.set(0, 1).set('0', 1).set(1, 2)

map.keys()

const set = new Set()
set.add(1).add(2).add(3)
set.keys();


const proxy = new Proxy({}, {
  get(target, key, receiver) {
    console.log(target, key, receiver)
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    console.log(target, key, value, receiver)
    return Reflect.set(target, key, value, receiver);
  },
})


class A {
  a = 1
}




const img = new Image()
img.src = Login
document.body.appendChild(img)
