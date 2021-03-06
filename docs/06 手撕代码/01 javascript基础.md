---
title: 手撕01 基础
date: 2022-03-24
sidebar: 'auto'
categories:
- 06手撕
isShowComments: true
---

## 1. Object.create

> 思路

将传入的对象作为原型

> 实现

```js
function Create (obj) {
    function Proxy() {}
    Proxy.prototype = obj
    return new Proxy()
}
```



## 2. instanceof

:::tip

- [instanceof](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof) : 用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。

:::

> 思路

1. 首先获取类型的原型
2. 然后获取对象的原型
3. 然后一直循环判断对象的原型是否等于类型的原型，直到对象原型为 `null`，因为原型链最终为 `null`

> 实现

```js
function Instanceof(left, right) {
  const proto = Object.getPrototypeOf(left);
  let prototype = right.prototype;

  while (true) {
    if (!proto) return false;
    if (proto === prototype) return true;
    proto = Object.getPrototypeOf(proto)
  }
}
```



## 3. new

**思路：**

在调用new的过程中会发生以上四件事情：

1. 创建一个全新的对象；
2. 这个新对象会被执行prototype连接；
3. 这个新对象会绑定到函数调用的this上
4. 如果函数没有返回其他对象，则会返回这个新对象

**实现：**

```js 
const New = function (fn, ...args) {
    let obj = Object.create(fn.prototype)
    let res = fn.apply(obj, args)
    return typeof res === "object" || typeof res === "function" ? res : obj;
}
```



## 4. Promise

```js
// 先定义三个常量表示状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

// 新建 MyPromise 类
class MyPromise {
  constructor(executor) {
    // executor 是一个执行器，进入会立即执行
    // 并传入resolve和reject方法
    try {
      executor(this.resolve, this.reject)
    } catch (error) {
      this.reject(error)
    }
  }

  // 储存状态的变量，初始值是 pending
  status = PENDING;

  // resolve和reject为什么要用箭头函数？
  // 如果直接调用的话，普通函数this指向的是window或者undefined
  // 用箭头函数就可以让this指向当前实例对象
  // 成功之后的值
  value = null;
  // 失败之后的原因
  reason = null;

  // 存储成功回调函数
  onFulfilledCallbacks = [];
  // 存储失败回调函数
  onRejectedCallbacks = [];

  // 更改成功后的状态
  resolve = (value) => {
    // 只有状态是等待，才执行状态修改
    if (this.status === PENDING) {
      // 状态修改为成功
      this.status = FULFILLED;
      // 保存成功之后的值
      this.value = value;
      // resolve里面将所有成功的回调拿出来执行
      while (this.onFulfilledCallbacks.length) {
        // Array.shift() 取出数组第一个元素，然后（）调用，shift不是纯函数，取出后，数组将失去该元素，直到数组为空
        this.onFulfilledCallbacks.shift()(value)
      }
    }
  }

  // 更改失败后的状态
  reject = (reason) => {
    // 只有状态是等待，才执行状态修改
    if (this.status === PENDING) {
      // 状态成功为失败
      this.status = REJECTED;
      // 保存失败后的原因
      this.reason = reason;
      // resolve里面将所有失败的回调拿出来执行
      while (this.onRejectedCallbacks.length) {
        this.onRejectedCallbacks.shift()(reason)
      }
    }
  }

  then(onFulfilled, onRejected) {
    const realOnFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    const realOnRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };

    // 为了链式调用这里直接创建一个 MyPromise，并在后面 return 出去
    const promise2 = new MyPromise((resolve, reject) => {

      const fulfilledMicrotask = () => {
        // 创建一个微任务等待 promise2 完成初始化
        queueMicrotask(() => {
          try {
            // 获取成功回调函数的执行结果
            const x = realOnFulfilled(this.value);
            // 传入 resolvePromise 集中处理
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error)
          }
        })
      }

      const rejectedMicrotask = () => {
        // 创建一个微任务等待 promise2 完成初始化
        queueMicrotask(() => {
          try {
            // 调用失败回调，并且把原因返回
            const x = realOnRejected(this.reason);
            // 传入 resolvePromise 集中处理
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error)
          }
        })
      }
      // 判断状态
      if (this.status === FULFILLED) {
        fulfilledMicrotask()
      } else if (this.status === REJECTED) {
        rejectedMicrotask()
      } else if (this.status === PENDING) {
        // 等待
        // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
        // 等到执行成功失败函数的时候再传递
        this.onFulfilledCallbacks.push(fulfilledMicrotask);
        this.onRejectedCallbacks.push(rejectedMicrotask);
      }
    })

    return promise2;
  }

  catch(onRejected) {
    // 只需要进行错误处理
    this.then(undefined, onRejected);
  }

  // resolve 静态方法
  static resolve(parameter) {
    // 如果传入 MyPromise 就直接返回
    if (parameter instanceof MyPromise) {
      return parameter;
    }

    // 转成常规方式
    return new MyPromise(resolve => {
      resolve(parameter);
    });
  }

  // reject 静态方法
  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }

}

function resolvePromise(promise, x, resolve, reject) {
  // 如果 promise 和 x 指向同一对象，以 TypeError 为据因拒绝执行 promise
  // 这是为了防止死循环
  if (promise === x) {
    return reject(new TypeError('The promise and the return value are the same'));
  }

  if (typeof x === 'object' || typeof x === 'function') {
    // 这个坑是跑测试的时候发现的，如果x是null，应该直接resolve
    if (x === null) {
      return resolve(x);
    }

    let then;
    try {
      // 把 x.then 赋值给 then 
      then = x.then;
    } catch (error) {
      // 如果取 x.then 的值时抛出错误 e ，则以 e 为据因拒绝 promise
      return reject(error);
    }

    // 如果 then 是函数
    if (typeof then === 'function') {
      let called = false;
      // 将 x 作为函数的作用域 this 调用之
      // 传递两个回调函数作为参数，第一个参数叫做 resolvePromise ，第二个参数叫做 rejectPromise
      // 名字重名了，我直接用匿名函数了
      try {
        then.call(
          x,
          // 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
          y => {
            // 如果 resolvePromise 和 rejectPromise 均被调用，
            // 或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
            // 实现这条需要前面加一个变量called
            if (called) return;
            called = true;
            resolvePromise(promise, y, resolve, reject);
          },
          // 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
          r => {
            if (called) return;
            called = true;
            reject(r);
          });
      } catch (error) {
        // 如果调用 then 方法抛出了异常 e：
        // 如果 resolvePromise 或 rejectPromise 已经被调用，则忽略之
        if (called) return;

        // 否则以 e 为据因拒绝 promise
        reject(error);
      }
    } else {
      // 如果 then 不是函数，以 x 为参数执行 promise
      resolve(x);
    }
  } else {
    // 如果 x 不为对象或者函数，以 x 为参数执行 promise
    resolve(x);
  }
}

MyPromise.deferred = function () {
  var result = {};
  result.promise = new MyPromise(function (resolve, reject) {
    result.resolve = resolve;
    result.reject = reject;
  });

  return result;
}


module.exports = MyPromise
```





## 5. Promise.all

> 实现

```js
Promise.myAll = (promises) =>{
	let arr = [], count = 0;
    return new Promise((resolve, reject) =>{
 		promises.forEach((item, i) =>{
			Promise.resolve(item).then(
        	(res) =>{
                arr.push(res);
                count++;
                if(count == promises.length) return resolve(arr)
            }, 
            reject
        	)
    	})
    })
}
```

> 测试

```js
const p1 = Promise.resolve('p1')
const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('p2 延时一秒')
    }, 1000)
})
const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('p3 延时两秒')
    }, 2000)
})

const p4 = Promise.reject('p4 rejected')

const p5 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('p5 rejected 延时1.5秒')
    }, 1500)
})

Promise.MyAll = (promises) => {
    let arr = [], count = 0;
    return new Promise((resolve, reject) => {
        promises.forEach((item) => {
            Promise.resolve(item).then(
                (res) => {
                    arr.push(res);
                    count++;
                    if (count == promises.length) return resolve(arr)
                },
                reject
            )
        })
    })
}

// 所有 Promsie 都成功
Promise.MyAll([p1, p2, p3])
    .then(res => console.log(res))
    .catch(err => console.log(err)) // 2秒后打印 [ 'p1', 'p2 延时一秒', 'p3 延时两秒' ]

// 一个 Promise 失败
Promise.MyAll([p1, p2, p4])
    .then(res => console.log(res))
    .catch(err => console.log(err)) // p4 rejected

// 一个延时失败的 Promise
Promise.MyAll([p1, p2, p5])
    .then(res => console.log(res))
    .catch(err => console.log(err)) // 1.5秒后打印 p5 rejected 延时1.5秒

// 两个失败的 Promise
Promise.MyAll([p1, p4, p5])
    .then(res => console.log(res))
    .catch(err => console.log(err)) // p4 rejected
```





## 6. Promise.race

> 实现

```js
Promise.MyRace = (promises) => {
    return new Promise((resolve, reject) => {
        for (item of promises) {
            Promise.resolve(item).then(resolve, reject)
        }
    })
}
```

> 测试

```js
const p1 = Promise.resolve('p1')
const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('p2 延时一秒')
    }, 1000)
})
const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('p3 延时两秒')
    }, 2000)
})

const p4 = Promise.reject('p4 rejected')

const p5 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('p5 rejected 延时1秒')
    }, 1500)
})

Promise.MyRace = (promises) => {
    return new Promise((resolve, reject) => {
        for (item of promises) {
            Promise.resolve(item).then(resolve, reject)
        }
    })
}

// p1无延时，p2延时1s，p3延时2s
Promise.MyRace([p1, p2, p3])
    .then(res => console.log(res))
    .catch(err => console.log(err)) // p1

// p4无延时reject
Promise.MyRace([p4, p2, p3])
    .then(res => console.log(res))
    .catch(err => console.log(err)) // p4 rejected

// p5 延时1.5秒reject，p2延时1s
Promise.MyRace([p5, p2, p3])
    .then(res => console.log(res))
    .catch(err => console.log(err)) // 1s后打印: p2 延时一秒
```



## 7. Promise.any

:::tip

​	`Promise.any` 与 `Promise.all` 可以看做是相反的。`Promise.any` 中只要有一个 `Promise` 实例成功就成功，只有当所有的 `Promise` 实例失败时 `Promise.any` 才失败，此时`Promise.any` 会把所有的失败/错误集合在一起，返回一个失败的 `promise` 和`AggregateError`类型的实例。

:::

> 实现

```js
Promise.MyAny = (promises) => {
    let arr = [], count = 0
    return new Promise((resolve, reject) => {
        promises.forEach(item => {
            Promise.resolve(item).then(resolve, err => {
                arr.push({ status: 'rejected', val: err })
                count++;
                if (count == promises.length) reject(new Error('没有promise成功'))
            })
        });
    })
}
```

> 测试

```js
const p1 = Promise.resolve('p1')
const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('p2 延时一秒')
    }, 1000)
})
const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('p3 延时两秒')
    }, 2000)
})

const p4 = Promise.reject('p4 rejected')

const p5 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('p5 rejected 延时1.5秒')
    }, 1500)
})

Promise.MyAny = (promises) => {
    let arr = [], count = 0
    return new Promise((resolve, reject) => {
        promises.forEach(item => {
            Promise.resolve(item).then(resolve, err => {
                arr.push({ status: 'rejected', val: err })
                count++;
                if (count == promises.length) reject(new Error('没有promise成功'))
            })
        });
    })
}

// 所有 Promise 都成功
Promise.MyAny([p1, p2, p3])
    .then(res => console.log(res))
    .catch(err => console.log(err)) // p1

// 两个 Promise 成功
Promise.MyAny([p1, p2, p4])
    .then(res => console.log(res))
    .catch(err => console.log(err)) // p1

// 只有一个延时成功的 Promise
Promise.MyAny([p2, p4, p5])
    .then(res => console.log(res))
    .catch(err => console.log(err)) // p2 延时1秒

// 所有 Promise 都失败
Promise.MyAny([p4, p5])
    .then(res => console.log(res))
    .catch(err => console.log(err)) // 没有promise成功

```



## 8. Promise.allSetted

> 实现

```js
Promise.MyAllSettled = (promises) => {
    let arr = [], count = 0

    return new Promise((resolve, reject) => {
        const resovlePromise = (status, val) => {
            arr.push({
                status,
                val
            })
            count++;
            if (count == promises.length) resolve(arr)

        }

        promises.forEach(item => {
            Promise.resolve(item).then(
                val => {
                    resovlePromise('fulfilled', val)
                },
                err => {
                    resovlePromise('rejected', err)
                }
            )
        })
    })
}
```

> 原理

```js
const p1 = Promise.resolve('p1')
const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('p2 延时一秒')
    }, 1000)
})
const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('p3 延时两秒')
    }, 2000)
})

const p4 = Promise.reject('p4 rejected')

const p5 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('p5 rejected 延时1.5秒')
    }, 1500)
})

Promise.MyAllSettled = (promises) => {
    let arr = [], count = 0

    return new Promise((resolve, reject) => {
        const resovlePromise = (status, val) => {
            arr.push({
                status,
                val
            })
            count++;
            if (count == promises.length) resolve(arr)

        }

        promises.forEach(item => {
            Promise.resolve(item).then(
                val => {
                    resovlePromise('fulfilled', val)
                },
                err => {
                    resovlePromise('rejected', err)
                }
            )
        })
    })
}

// 所有 Promise 实例都成功
Promise.MyAllSettled([p1, p2, p3])
    .then(res => console.log(res))
    .catch(err => console.log(err))
// [
//   { status: 'fulfilled', value: 'p1' },
//   { status: 'fulfilled', value: 'p2 延时一秒' },
//   { status: 'fulfilled', value: 'p3 延时两秒' }
// ]

// 有一个 MyAllSettled 失败
Promise.allSettled([p1, p2, p4])
    .then(res => console.log(res))
    .catch(err => console.log(err))
// [
//   { status: 'fulfilled', value: 'p1' },
//   { status: 'fulfilled', value: 'p2 延时一秒' },
//   { status: 'rejected' , value: 'p4 rejected' }
// ]

// 所有 MyAllSettled 都失败
Promise.allSettled([p4, p5])
    .then(res => console.log(res))
    .catch(err => console.log(err))
// [
//   { status: 'rejected', reason: 'p4 rejected' },
//   { status: 'rejected', reason: 'p5 rejected 延时1.5秒' }
// ]
```



## 9. Promise.finally

:::tip

​	`Promise.prototype.finally()` 是 ES2018 新增的特性，它回一个 `Promise` ，在 `promise` 结束时，无论 `Promise` 运行成功还是失败，都会运行 `finally` ，类似于我们常用的  `try {...} catch {...} finally {...}

:::

```js
const Finally = function (cb) {
  return this.then(val => {
    return Promise.resolve(cb()).then(() => val)
  }, err => {
    return Promise.resolve(cb()).then(() => {
      throw err
    })
  })
}
```



## 10. Promise.catch

:::tip

​	catch方法是then方法的语法糖，只接收reject态的数据

:::

```js
const Catch = function (cb) {
  return this.then(null, cb)
}
```





## 11. 节流

**定义**：

​	函数节流是指规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内某事件被触发多次，只有一次能生效。节流可以使用在 scroll 函数的事件监听上，通过事件节流来降低事件调用的频率。

**实现**：

```js
// 函数节流的实现;
function throttle(fn, delay) {
  let curTime = Date.now();

  return function() {
    let context = this,
        args = arguments,
        nowTime = Date.now();

    // 如果两次时间间隔超过了指定时间，则执行函数。
    if (nowTime - curTime >= delay) {
      curTime = Date.now();
      return fn.apply(context, args);
    }
  };
}
```



## 12. 防抖

:::tip

​	函数防抖是指在实践被触发n秒后再执行回调，如果在这n秒内事件又被触发，则重新计时。这可以使用在一些点击请求事件中，避免因为用户的多次点击向后端发送多次请求。

:::

```js
// 函数防抖
function debounce(fn, wait) {
    let timer = null;
    return function () {
        // 如果此时存在定时器的话，则取消之前的定时器重新记时
        if (timer) {
            clearTimeout(timer);
        }
        // 设置定时器，使事件间隔指定事件后执行
        timer = setTimeout(() => {
            fn.apply(this, arguments);
        }, wait);
    };
}
```

> 测试

```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div>
        <button id="btn">点击</button>
    </div>
    <script>
        // 函数防抖的实现
        function debounce(fn, wait) {
            let timer = null;
            return function () {
                // 如果此时存在定时器的话，则取消之前的定时器重新记时
                if (timer) {
                    clearTimeout(timer);
                }
                // 设置定时器，使事件间隔指定事件后执行
                timer = setTimeout(() => {
                    fn.apply(this, arguments);
                }, wait);
            };
        }

        function fn2(a) {
            console.log(a, 111)
        }

        let fn3 = debounce(fn2, 1000)
        let btn = document.getElementById("btn");
        btn.addEventListener('click', function (e) {
            fn3(1);
        })

    </script>
</body>

</html>
```



## 12. call

> 实现流程

判断调用对象是否为函数，即使我们是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。

判断传入上下文对象是否存在，如果不存在，则设置为 window 。

处理传入的参数，截取第一个参数后的所有参数。

将函数作为上下文对象的一个属性。

使用上下文对象来调用这个方法，并保存返回结果。

删除刚才新增的属性。

返回结果。

> 实现

```js
Funciton.prototype.myCall = function (context) {
    // 判断调用对象
    if (typeof this !== "function") {
        console.error("type error");
    }
    
    // 获取参数
    let args = [...arguments].slice(1);
    // 判断context是否传入，如果未传入则设置为window
    context = context || window;
    
    // 将调用函数设置对象的方法
    let key = Symbol()
    context[key] = this;
    // 调用函数
    let result  = null;
    result = context[key](...args)
    // 将属性删除
    delete context[key];
    return result;
}
```



## 13. apply

> 实现步骤

1. 判断调用对象是否是函数
2. 判断传入上下文对象是否存在，如果不存在，则为window
3. 将函数作为上下文对象的一个属性
4. 判断参数值是否传入
5. 使用上下文对象来调用这个方法，并保存结果
6. 删除刚才新增的属性
7. 返回结果

> 实现

```js
Function.prototype.myApply = function (context) {
  // 判断调用对象是否为函数
  if (typeof this !== "function") {
    throw new TypeError("Error")
  }

  // 判断context与args是否存在
  context = context || window;
  let args = arguments[1] || []

  // 设置属性
  let key = Symbol();
  context[key] = this;

  // 调用属性
  let result = null;
  result = context[key](...args)

  // 删除属性
  delete context[key];

  return result;
}
```



## 14. bind

```js
Function.prototype.Bind = function (context, ...args) {
  const fn = this;
  args = args ? args : []
  return function newFn(...newFnArgs) {
    if (this instanceof newFn) {
      return new fn(...args, ...newFnArgs)
    }
    return fn.apply(context, [...args, ...newFnArgs])
  }
}
```



## 15. 柯里化

> 实现

```js
const curry = (fn, ...args) => {
    return args.length > fn.length 
    	? fn(...args)
    	: (..._args) => curry(fn, ...args, ..._args)
}
```



## 16. AJAX

:::tip

- [XHR](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)

​	AJAX是 Asynchronous JavaScript and XML 的缩写，指的是通过 JavaScript 的 异步通信，从服务器获取 XML 文档从中提取数据，再更新当前网页的对应部分，而不用刷新整个网页。

:::

**创建AJAX请求的步骤**：

- 创建一个XMLHttpRequest对象
- 使用open方法创建http请求
  - 请求方法
  - 请求地址
  - 是否异步
  - 用户的认证信息
- 发送请求前，可以为这个对象添加一些信息和监听函数
- 调用sent方法向服务器发送请求

```js
const SERVER_URL = "/server";
let xhr = new XMLHttpRequest();
// 创建 Http 请求
xhr.open("GET", SERVER_URL, true);
// 设置状态监听函数
xhr.onreadystatechange = function() {
  if (this.readyState !== 4) return;
  // 当请求成功时
  if (this.status === 200) {
    handle(this.response);
  } else {
    console.error(this.statusText);
  }
};
// 设置请求失败时的监听函数
xhr.onerror = function() {
  console.error(this.statusText);
};
// 设置请求头信息
xhr.responseType = "json";
xhr.setRequestHeader("Accept", "application/json");
// 发送 Http 请求
xhr.send(null);
```







## 17. 使用Promise封装AJAX请求



## 18. 浅拷贝

> 定义

![image-20220405101456115](https://raw.githubusercontent.com/option-star/imgs/master/202204051014183.png)

​	创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值，如果属性值是应用类型，拷贝的就是内存地址，所以如果其中一个对象改变了这个地址，就会影响另一个对象







## 19. 深拷贝

> 定义

​	将一个对象从内存中完整拷贝一份出来，从堆内存中开辟一个新的区域存放新对象，且修改新对象不会影响原对象



> JSON.stringify处理深拷贝，存在局限性：

- 无法处理BigInt类型的属性值 Uncaugth TypeError: Do not know how to serialize a BigInt
- 某些键值对会消失
  - 属性值是 undefined/symbol/function 类型的
  - 属性名是 symbol 类型的
-  属性值如果是 正则对象/错误对象 会转换为“{}”，值和之前是不一样的
- 日期对象变为字符串之后就无法在转换回日期对象了
- 一但内部出现“套娃操作”（obj.obj=obj），直接处理不了  Uncaught TypeError: Converting circular structure to JSON
-  处理起来没有问题的类型：number、string、boolean、普通对象、数组对象...

> 实现

- 定义一个工具函数，判断传入值是否是空或函数、对象

- 实现deepClone函数，第一个参数为克隆对象，第二个参数是是一个weakMap对象，记录循环引用

- 通过instanceof判断是不是set，是直接返回

- 判断instanceof判断是不是map，是直接返回

- 通过typeof判断是不是symbol，是通过获取其description创建返回一个新的symbol

- 通过typeof判断是不是函数，是直接返回

- 判断是不是对象，不是直接返回

- 判断是不是已经在map存在，是获取返回

- 当以上条件都不满足判断对象是数组还是对象，并创建一个空对象或数组，并将判断对象作为key，新对象作为value存入map

- 递归处理object和symbol

  通过Object.keys()和Object.getOwnPropertySymbols()获取key，递归处理

  ```js
  //实现深层对象深拷贝
  /*
  	1.判断类型是不是对象，如果是对象就继续遍历key
  	2.函数无需实现深拷贝
  	3.如果是对象判断是不是数组
  	4.处理Symbol为key Object.getOwnPropertySymbol(originValue)
  	5.循环引用时重点
  */
  //当value不为null且是一个对象或函数返回true
  const isObject = (value) => {
      const type = typeof value
      return value !== null && (type === "object" || type === "function")
  }
  
  const Clone = (target, map = new WeakMap()) => {
      // 处理set
      if (target instanceof Set) return new Set([...target]);
  
      // 处理map
      if (target instanceof Map) return new Map([...target]);
  
      // 处理symbol
      if (typeof target === "symbol") return Symbol(target.description);
  
      // 处理函数
      if (typeof target === "function") return target;
  
      // 处理普通值
      if (!isObject(target)) return target
  
      // 处理数组
      let _target = Array.isArray(target) ? [] : {}
  
      // 处理循环
      if (map.has(target)) return map.get(target)
      map.set(target, _target);
  
      // 克隆
      for (const key in target) {
          _target[key] = Clone(target[key], map);
      }
  
      // symbol特殊处理
      const symbolKeys = Object.getOwnPropertySymbols(target);
      for (let key of symbolKeys) _target[key] = Clone(target[key], map)
  
      return _target
  }
  ```
  
  

> 测试

```js
const map = new Map();
map.set('key', 'value');
map.set('ConardLi', 'code秘密花园');

const set = new Set();
set.add('ConardLi');
set.add('code秘密花园');
const target = {
    field1: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
    field4: [2, 4, 8],
    empty: null,
    map,
    set,
    bool: new Boolean(true),
    num: new Number(2),
    str: new String(2),
    symbol: Symbol(1),
    date: new Date(),
    reg: /\d+/,
    error: new Error(),
    func1: () => {
        console.log('code秘密花园');
    },
    func2: function (a, b) {
        return a + b;
    }
};


const result = Clone(target);

console.log(target);
console.log(result);
```



## 20. 发布订阅

> 实现

```js
class EventBus {
    constructor() {
        this.eventBus = {}
    }

    /* 事件注册 */
    on(name, callback, _this) {
        if (!this.eventBus[name]) {
            this.eventBus[name] = [{ callback, _this }];
        } else {
            this.eventBus[name].push({ callback, _this })
        }
    }

    /* 取消监听 */
    off(name, callback) {
        if (this.eventBus[name]) {
            this.eventBus[name].forEach(item => {
                if (item.callback === callback) {
                    let index = this.eventBus[name].indexOf(item)
                    this.eventBus[name].splice(index, 1)
                }
            })
        }
    }

    /* 调用监听 */
    emit(name, ...args) {
        if (this.eventBus[name]) {
            for (const item of this.eventBus[name]) {
                const { callback, _this } = item;
                callback.apply(_this, args)
            }
        }
    }
}
```

> 测试

```js

const eventBus = new EventBus()

// main.js

eventBus.on('abc', function () {
    console.log('监听abc1', this);
}, { name: 'Fhup' })

const handlerCallback = function () {
    console.log('监听abc2', this);
}

eventBus.on('abc', handlerCallback, { name: 'xxx' })

// // utils.js
eventBus.emit('abc', 123)



eventBus.off('abc', handlerCallback)
console.log('---------');
eventBus.emit('abc', 123)
```



