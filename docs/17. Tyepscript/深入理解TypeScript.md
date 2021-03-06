---
title: 深入理解TypeScript
date: 2022-04-26
sidebar: 'auto'
categories:
- 17TypeScript
isShowComments: true
---



## 一、TypeScript项目

### 1. 编译上下文

​	编译上下文，可以用来给文件分组，告诉 TypeScript 哪些文件是有效的，哪些是无效的。

​	除了有效文件所携带信息外，编译上下文还包含有正在被使用的编译选项的信息。

​	通常使用`tsconfig.json`文件来定义逻辑分组。

#### 1）tsconfig.json

>  **基础**

​	在项目的根目录下创建`tsconfig.json`, TS将会把此目录和子目录下所有的`.ts`文件作为编译上下文的一部分，还会包含一部分默认的编译选项。

>  **编译选项**

你可以通过 `compilerOptions` 来定制你的编译选项：

```js
{
  "compilerOptions": {

    /* 基本选项 */
    "target": "es5",                       // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
    "module": "commonjs",                  // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
    "lib": [],                             // 指定要包含在编译中的库文件
    "allowJs": true,                       // 允许编译 javascript 文件
    "checkJs": true,                       // 报告 javascript 文件中的错误
    "jsx": "preserve",                     // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
    "declaration": true,                   // 生成相应的 '.d.ts' 文件
    "sourceMap": true,                     // 生成相应的 '.map' 文件
    "outFile": "./",                       // 将输出文件合并为一个文件
    "outDir": "./",                        // 指定输出目录
    "rootDir": "./",                       // 用来控制输出目录结构 --outDir.
    "removeComments": true,                // 删除编译后的所有的注释
    "noEmit": true,                        // 不生成输出文件
    "importHelpers": true,                 // 从 tslib 导入辅助工具函数
    "isolatedModules": true,               // 将每个文件作为单独的模块 （与 'ts.transpileModule' 类似）.

    /* 严格的类型检查选项 */
    "strict": true,                        // 启用所有严格类型检查选项
    "noImplicitAny": true,                 // 在表达式和声明上有隐含的 any类型时报错
    "strictNullChecks": true,              // 启用严格的 null 检查
    "noImplicitThis": true,                // 当 this 表达式值为 any 类型的时候，生成一个错误
    "alwaysStrict": true,                  // 以严格模式检查每个模块，并在每个文件里加入 'use strict'

    /* 额外的检查 */
    "noUnusedLocals": true,                // 有未使用的变量时，抛出错误
    "noUnusedParameters": true,            // 有未使用的参数时，抛出错误
    "noImplicitReturns": true,             // 并不是所有函数里的代码都有返回值时，抛出错误
    "noFallthroughCasesInSwitch": true,    // 报告 switch 语句的 fallthrough 错误。（即，不允许 switch 的 case 语句贯穿）

    /* 模块解析选项 */
    "moduleResolution": "node",            // 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6)
    "baseUrl": "./",                       // 用于解析非相对模块名称的基目录
    "paths": {},                           // 模块名到基于 baseUrl 的路径映射的列表
    "rootDirs": [],                        // 根文件夹列表，其组合内容表示项目运行时的结构内容
    "typeRoots": [],                       // 包含类型声明的文件列表
    "types": [],                           // 需要包含的类型声明文件名列表
    "allowSyntheticDefaultImports": true,  // 允许从没有设置默认导出的模块中默认导入。

    /* Source Map Options */
    "sourceRoot": "./",                    // 指定调试器应该找到 TypeScript 文件而不是源文件的位置
    "mapRoot": "./",                       // 指定调试器应该找到映射文件而不是生成文件的位置
    "inlineSourceMap": true,               // 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件
    "inlineSources": true,                 // 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性

    /* 其他选项 */
    "experimentalDecorators": true,        // 启用装饰器
    "emitDecoratorMetadata": true          // 为装饰器提供元数据的支持
  }
}
```



> **编译TS**

- 运行`tsc`， 查找子级或父级的`tsconfig.json`文件
- 运行`tsc -p ./path-to-project-directory`
- 运行`tsc -w` : 启动观测模式，检测文件改动后，重新编译



#### 2）指定文件

> **显示指定**

```js
{
  "files": [
    "./some/file.ts"
  ]
}
```

> **设置`include`与`exclude`为包含与排除的文件**

```js
{
  "include": [
    "./folder"
  ],
  "exclude": [
    "./folder/**/*.spec.ts",
    "./folder/someSubFolder"
  ]
}
```



### 2. 声明空间

#### 1）类型声明空间

类型声明空间的值用来当作类型注解的内容。

```js
// 类型声明空间
class Foo {}
interface Bar {}
type Bas = {};

// 类型注解
let foo: Foo;
let bar: Bar;
let bas: Bas;
```



#### 2）变量声明空间

变量声明空间的值用来当作变量的内容

```ts
// 变量声明空间
class Foo {}

// 变量
const someVar = Foo;
const someOtherVar = 123;
```



### 3. 模块

#### 1）全局模块

在默认情况下，当你开始在一个新的 TypeScript 文件中写下代码时，它处于全局命名空间中。如在 foo.ts 里的以下代码。

```ts
const foo = 123;
```

如果你在相同的项目里创建了一个新的文件 `bar.ts`，TypeScript 类型系统将会允许你使用变量 `foo`，就好像它在全局可用一样：

```ts
const bar = foo; // allowed
```

毋庸置疑，使用全局变量空间是危险的，因为它会与文件内的代码命名冲突。我们推荐使用下文中将要提到的文件模块。



#### 2）文件模块

​	文件模块也被称为外部模块。如果在你的 TypeScript 文件的根级别位置含有 `import` 或者 `export`，那么它会在这个文件中创建一个本地的作用域。因此，我们需要把上文 `foo.ts` 改成如下方式（注意 `export` 用法）：

```ts
export const foo = 123;
```

​	在全局命名空间里，我们不再有 `foo`，这可以通过创建一个新文件 `bar.ts` 来证明：

```ts
const bar = foo; // ERROR: "cannot find name 'foo'"
```

​	如果你想在 `bar.ts` 里使用来自 `foo.ts` 的内容，你必须显式地导入它，更新后的 `bar.ts` 如下所示。

```ts
import { foo } from './foo';
const bar = foo; // allow
```

​	在 `bar.ts` 文件里使用 `import` 时，它不仅允许你使用从其他文件导入的内容，还会将此文件 `bar.ts` 标记为一个模块，文件内定义的声明也不会“污染”全局命名空间



#### 3）文件模块详情

##### 澄清：commonjs, amd, es modules, others

​	首先，我们需要澄清这些模块系统的不一致性。我将会提供给你我当前的建议，以及消除一些你的顾虑。

​	你可以根据不同的 `module` 选项来把 TypeScript 编译成不同的 JavaScript 模块类型，这有一些你可以忽略的东西：

- AMD：不要使用它，它仅能在浏览器工作；
- SystemJS：这是一个好的实验，已经被 ES 模块替代；
- ES 模块：它并没有准备好。

​	使用 `module: commonjs` 选项来替代这些模式，将会是一个好的主意。

​	怎么书写 TypeScript 模块呢？，这也是一件让人困惑的事。在今天我们应该这么做：

- 放弃使用 `import/require` 语法即 `import foo = require('foo')` 写法
- 推荐使用 ES 模块语法

这很酷，接下来，让我们看看 ES 模块语法。

:::tip

**TIP**

使用 `module: commonjs` 选项以及使用 ES 模块语法导入、导出、编写模块。

:::



##### ES模块语法

- 使用 `export` 关键字导出一个变量或类型

```ts
// foo.ts
export const someVar = 123;
export type someType = {
  foo: string;
};
```

- `export` 的写法除了上面这种，还有另外一种：

```ts
// foo.ts
const someVar = 123;
type someType = {
  type: string;
};

export { someVar, someType };
```

- 你也可以用重命名变量的方式导出：

```ts
// foo.ts
const someVar = 123;
export { someVar as aDifferentName };
```

- 使用 `import` 关键字导入一个变量或者是一个类型：

```ts
// bar.ts
import { someVar, someType } from './foo';
```

- 通过重命名的方式导入变量或者类型：

```ts
// bar.ts
import { someVar as aDifferentName } from './foo';
```

- 除了指定加载某个输出值，还可以使用整体加载，即用星号（*）指定一个对象，所有输出值都加载在这个对象上面：

```ts
// bar.ts
import * as foo from './foo';
// 你可以使用 `foo.someVar` 和 `foo.someType` 以及其他任何从 `foo` 导出的变量或者类型
```

- 只导入模块：

```ts
import 'core-js'; // 一个普通的 polyfill 库
```

- 从其他模块导入后整体导出

```ts
export * from './foo';
```

- 从其他模块导入后，部分导出

```ts
export { someVar } from './foo';
```

- 通过重命名，部分导出从另一个模块导入的项目

```ts
export { someVar as aDifferentName } from './foo';
```



##### 默认导入/导出

我并不喜欢用默认导出，虽然有默认导出的语法：

- 使用`export default`
  - 在一个变量之前（不需要使用`let/const/var`）
  - 在一个函数之前
  - 在一个类之前

```ts
// some var
export default (someVar = 123);

// some function
export default function someFunction() {}

// some class
export default class someClass {}
```

- 导入使用`import someName from 'someModule'`语法（你可以根据需要为导入命名）：

```ts
import someLocalNameForThisFile from './foo';
```

##### 模块路径

:::tip

**TIP**

​	如果你需要使用 `moduleResolution: node` 选项，你应该将此选项放入你的配置文件中。如果你使用了 `module: commonjs` 选项， `moduleResolution: node` 将会默认开启。

:::

这里存在两种截然不同的模块：

- 相对模块路径（路径以 `.` 开头，例如：`./someFile` 或者 `../../someFolder/someFile` 等）；
- 其他动态查找模块（如：`core-js`，`typestyle`，`react` 或者甚至是 `react/core` 等）。

它们的主要区别在于系统如何解析模块。

:::tip

**TIP**

我将会使用一个概念性术语，`place` -- 将在提及查找模式后解释它。

:::

> **相对模块路径**

这很简单，仅仅是按照相对路径来就可以了：

- 如果文件 `bar.ts` 中含有 `import * as foo from './foo'`，那么 `foo` 文件必须与 `bar.ts` 文件存在于相同的文件夹下
- 如果文件 `bar.ts` 中含有 `import * as foo from '../foo'`，那么 `foo` 文件所存在的地方必须是 `bar.ts` 的上一级目录；
- 如果文件 `bar.ts` 中含有 `import * as foo from '../someFolder/foo'`，那么 `foo` 文件所在的文件夹 `someFolder` 必须与 `bar.ts` 文件所在文件夹在相同的目录下。

你还可以思考一下其他相对路径导入的场景。😃

> **动态查找**

当导入路径不是相对路径时，模块解析将会模仿 [Node 模块解析策略](https://nodejs.org/api/modules.html#modules_all_together)，下面我将给出一个简单例子：

- 当你使用`import * as foo from 'foo'`，将会按如下顺序查找模块：
  - `./node_modules/foo`
  - `../node_modules/foo`
  - `../../node_modules/foo`
  - 直到系统的根目录
- 当你使用`import * as foo from 'something/foo'`，将会按照如下顺序查找内容
  - `./node_modules/something/foo`
  - `../node_modules/something/foo`
  - `../../node_modules/something/foo`
  - 直到系统的根目录



##### 什么是`place`

​	当我提及被检查的 `place` 时，我想表达的是在这个 `place` 上，TypeScript 将会检查以下内容（例如一个 `foo` 的 `place`）：

- 如果这个 `place` 表示一个文件，如：`foo.ts`，欢呼！
- 否则，如果这个 `place` 是一个文件夹，并且存在一个文件 `foo/index.ts`，欢呼！
- 否则，如果这个 `place` 是一个文件夹，并且存在一个 `foo/package.json` 文件，在该文件中指定 `types` 的文件存在，那么就欢呼！
- 否则，如果这个 `place` 是一个文件夹，并且存在一个 `package.json` 文件，在该文件中指定 `main` 的文件存在，那么就欢呼！

从文件类型上来说，我实际上是指 `.ts`， `.d.ts` 或者 `.js`

就是这样，现在你已经是一个模块查找专家（这并不是一个小小的成功）。

##### 重写类型的动态查找

​	在你的项目里，你可以通过 `declare module 'somePath'` 声明一个全局模块的方式，来解决查找模块路径的问题。

```ts
// global.d.ts
declare module 'foo' {
  // some variable declarations
  export var bar: number;
}
```

接着：

```ts
// anyOtherTsFileInYourProject.ts
import * as foo from 'foo';
// TypeScript 将假设（在没有做其他查找的情况下）
// foo 是 { bar: number }
```



##### `import/require`仅仅是导入类型

以下导入语法：

```ts
import foo = require('foo');
```

它实际只做了两件事：

- 导入foo模块的所有类型信息
- 确定foo模块运行时的依赖关系

​	你可以选择仅加载类型信息，而没有运行时的依赖关系。在继续之前，你可能需要重新阅读本书 [声明空间部分](https://jkchao.github.io/typescript-book-chinese/project/declarationspaces.html) 部分。

​	如果你没有把导入的名称当做变量声明空间来用，在编译成 JavaScript 时，导入的模块将会被完全移除。这最好用例子来解释，下面我们将会给出一些示例。

> 例子1

```ts
import foo = require('foo');
```

将会编译成 JavaScript：

```js
```

这是正确的，一个没有被使用的空文件。

> 例子2

```ts
import foo = require('foo');
var bar: foo;
```

将会被编译成：

```js
let bar;
```

​	这是因为foo(或者其他任何属性如： `foo.bas`)没有被当作一个变量使用。

> 例子3

```ts
import foo = require('foo');
const bar = foo;
```

将会被编译成（假设是 commonjs）：

```js
const foo = require('foo');
const bar = foo;
```

这是因为 `foo` 被当做变量使用了。

> **使用例子： 懒加载**

​	类型推断需要提前完成，这意味着，如果你想在 `bar` 文件里，使用从其他文件 `foo` 导出的类型，你将不得不这么做：

```ts
import foo = require('foo');
let bar: foo.SomeType;
```

​	然而，在某些情景下，你只想在需要时加载模块 `foo`，此时你需要仅在类型注解中使用导入的模块名称，而**不**是在变量中使用。在编译成 JavaScript 时，这些将会被移除。接着，你可以手动导入你需要的模块。

​	作为一个例子，考虑以下基于 `commonjs` 的代码，我们仅在一个函数内导入 `foo` 模块：

```ts
import foo = require('foo');

export function loadFoo() {
  // 这是懒加载 foo，原始的加载仅仅用来做类型注解
  const _foo: typeof foo = require('foo');
  // 现在，你可以使用 `_foo` 替代 `foo` 来作为一个变量使用
}
```

​	一个同样简单的 `amd` 模块（使用 requirejs）：

```ts
import foo = require('foo');

export function loadFoo() {
  // 这是懒加载 foo，原始的加载仅仅用来做类型注解
  require(['foo'], (_foo: typeof foo) => {
    // 现在，你可以使用 `_foo` 替代 `foo` 来作为一个变量使用
  });
}
```

这些通常在以下情景使用：

- 在 web app 里， 当你在特定路由上加载 JavaScript 时；
- 在 node 应用里，当你只想加载特定模块，用来加快启动速度时。

> **使用例子：打破循环依赖**

​	类似于懒加载的使用用例，某些模块加载器（`commonjs/node` 和 `amd/requirejs`）不能很好的处理循环依赖。在这种情况下，一方面我们使用延迟加载代码，并在另一方面预先加载模块是很实用的。

> **使用例子： 确保导入**

​	当你加载一个模块，只是想引入其附加的作用（如：模块可能会注册一些像 [CodeMirror addons](https://codemirror.net/doc/manual.html#addons)）时，然而，如果你仅仅是 `import/require` （导入）一些并没有与你的模块或者模块加载器有任何依赖的 JavaScript 代码，（如：webpack），经过 TypeScript 编译后，这些将会被完全忽视。在这种情况下，你可以使用一个 `ensureImport` 变量，来确保编译的 JavaScript 依赖与模块。如：

```ts
import foo = require('./foo');
import bar = require('./bar');
import bas = require('./bas');

const ensureImport: any = foo || bar || bas;
```

#### 4）`global.d.ts`

​	在上文中，当我们讨论文件模块时，比较了全局变量与文件模块，并且我们推荐使用基于文件的模块，而不是选择污染全局命名空间。

​	然而，如果你的团队里有 TypeScript 初学者，你可以提供他们一个 `global.d.ts` 文件，用来将一些接口或者类型放入全局命名空间里，这些定义的接口和类型能在你的所有 TypeScript 代码里使用。

:::tip

**TIP**

对于任何需要编译成 `JavaScript` 的代码，我们强烈建议你放入文件模块里。

:::

- `global.d.ts` 是一种扩充 `lib.d.ts` 很好的方式，如果你需要的话。
- 当你从 `JS` 迁移到 `TS` 时，定义 `declare module "some-library-you-dont-care-to-get-defs-for"` 能让你快速开始。

### 4. 命名空间

在 JavaScript 使用命名空间时， 这有一个常用的、方便的语法：

```js
(function(something) {
  something.foo = 123;
})(something || (something = {}));
```

​	`something || (something = {})` 允许匿名函数 `function (something) {}` 向现有对象添加内容，或者创建一个新对象，然后向该对象添加内容。这意味着你可以拥有两个由某些边界拆成的块。

```js
(function(something) {
  something.foo = 123;
})(something || (something = {}));

console.log(something);
// { foo: 123 }

(function(something) {
  something.bar = 456;
})(something || (something = {}));

console.log(something); // { foo: 123, bar: 456 }
```

​	在确保创建的变量不会泄漏至全局命名空间时，这种方式在 JavaScript 中很常见。当基于文件模块使用时，你无须担心这点，但是该模式仍然适用于一组函数的逻辑分组。因此 TypeScript 提供了 `namespace` 关键字来描述这种分组，如下所示。

```ts
namespace Utility {
  export function log(msg) {
    console.log(msg);
  }
  export function error(msg) {
    console.log(msg);
  }
}

// usage
Utility.log('Call me');
Utility.error('maybe');
```

​	`namespace` 关键字编译后的 JavaScript 代码，与我们早些时候看到的 JavaScript 代码一样。

```js
(function (Utility) {
  // 添加属性至 Utility
})(Utility || Utility = {});
```

​	值得注意的一点是，命名空间是支持嵌套的。因此，你可以做一些类似于在 `Utility` 命名空间下嵌套一个命名空间 `Messaging` 的事情。

​	对于大多数项目，我们建议使用外部模块和命名空间，来快速演示和移植旧的 JavaScript 代码。

### 5. 动态导入表达式

​	动态导入表达式是 ECMAScript 的一个新功能，它允许你在程序的任意位置异步加载一个模块，TC39 JavaScript 委员会有一个提案，目前处于第四阶段，它被称为 [import() proposal for JavaScript](https://github.com/tc39/proposal-dynamic-import)。

​	此外，**webpack** bundler 有一个 [`Code Splitting`](https://webpack.js.org/guides/code-splitting/) 功能，它能允许你将代码拆分为许多块，这些块在将来可被异步下载。因此，你可以在程序中首先提供一个最小的程序启动包，并在将来异步加载其他模块。

​	这很自然就会让人想到（如果我们工作在 webpack dev 的工作流程中）[TypeScript 2.4 dynamic import expressions](https://github.com/Microsoft/TypeScript/wiki/What's-new-in-TypeScript#dynamic-import-expressions) 将会把你最终生成的 JavaScript 代码自动分割成很多块。但是这似乎并不容易实现，因为它依赖于我们正在使用的 `tsconfig.json` 配置文件。

​	webpack 实现代码分割的方式有两种：使用 `import()` （首选，ECMAScript 的提案）和 `require.ensure()` （最后考虑，webpack 具体实现）。因此，我们期望 TypeScript 的输出是保留 `import()` 语句，而不是将其转化为其他任何代码。

让我们来看一个例子，在这个例子中，我们演示了如何配置 webpack 和 TypeScript 2.4 +。

​	在下面的代码中，我希望懒加载 `moment` 库，同时我也希望使用代码分割的功能，这意味 `moment` 会被分割到一个单独的 JavaScript 文件，当它被使用时，会被异步加载。

```ts
import(/* webpackChunkName: "momentjs" */ 'moment')
  .then(moment => {
    // 懒加载的模块拥有所有的类型，并且能够按期工作
    // 类型检查会工作，代码引用也会工作  :100:
    const time = moment().format();
    console.log('TypeScript >= 2.4.0 Dynamic Import Expression:');
    console.log(time);
  })
  .catch(err => {
    console.log('Failed to load moment', err);
  });
```

这是 `tsconfig.json` 的配置文件：

```js
{
  "compilerOptions": {
    "target": "es5",
    "module": "esnext",
    "lib": [
      "dom",
      "es5",
      "scripthost",
      "es2015.promise"
    ],
    "jsx": "react",
    "declaration": false,
    "sourceMap": true,
    "outDir": "./dist/js",
    "strict": true,
    "moduleResolution": "node",
    "typeRoots": [
      "./node_modules/@types"
    ],
    "types": [
      "node",
      "react",
      "react-dom"
    ]
  }
}
```

:::tip

​	使用 `"module": "esnext"` 选项：TypeScript 保留 `import()` 语句，该语句用于 Webpack Code Splitting。

:::



## 二、TypeScript类型系统

### 1. 概述

#### 1）TypeScript类型系统

在讨论[为什么使用 TypeScript](https://jkchao.github.io/typescript-book-chinese/#whys) 时，我们表述了 TypeScript 类型系统的主要功能。以下是一些关键点：

- TypeScript 的类型系统被设计为可选的，因此，你的 JavaScript 就是 TypeScript;
- TypeScript 不会阻止 JavaScript 的运行，即使存在类型错误也不例外，这能让你的 JavaScript 逐步迁移至 TypeScript。

现在让我们开始学习 TypeScript 类型系统的语法吧，在这一章节中，你将能给你的代码加上类型注解，并且能看到它的益处。这将为我们进一步了解类型系统做铺垫。

#### 2）基本注解

如前文所提及，类型注解使用 `:TypeAnnotation` 语法。在类型声明空间中可用的任何内容都可以用作类型注解。

在下面这个例子中，使用了变量、函数参数以及函数返回值的类型注解：

```ts
const num: number = 123;
function identity(num: number): number {
  return num;
}
```

#### 3）原始类型

JavaScript 原始类型也同样适应于 TypeScript 的类型系统，因此 `string`、`number`、`boolean` 也可以被用作类型注解：

```ts
let num: number;
let str: string;
let bool: boolean;

num = 123;
num = 123.456;
num = '123'; // Error

str = '123';
str = 123; // Error

bool = true;
bool = false;
bool = 'false'; // Error
```

#### 4）数组

​	TypeScript 为数组提供了专用的类型语法，因此你可以很轻易的注解数组。它使用后缀 `[]`， 接着你可以根据需要补充任何有效的类型注解（如：`:boolean[]`）。它能让你安全的使用任何有关数组的操作，而且它也能防止一些类似于赋值错误类型给成员的行为。如下所示：

```ts
let boolArray: boolean[];

boolArray = [true, false];
console.log(boolArray[0]); // true
console.log(boolArray.length); // 2

boolArray[1] = true;
boolArray = [false, false];

boolArray[0] = 'false'; // Error
boolArray = 'false'; // Error
boolArray = [true, 'false']; // Error
```

#### 5）接口

​	接口是 TypeScript 的一个核心知识，它能合并众多类型声明至一个类型声明：

```ts
interface Name {
  first: string;
  second: string;
}

let name: Name;
name = {
  first: 'John',
  second: 'Doe'
};

name = {
  // Error: 'Second is missing'
  first: 'John'
};

name = {
  // Error: 'Second is the wrong type'
  first: 'John',
  second: 1337
};
```

​	在这里，我们把类型注解：`first: string` + `second: string` 合并到了一个新的类型注解 `Name` 里，这样能强制对每个成员进行类型检查。接口在 TypeScript 拥有强大的力量，稍后，我们将会用一个内容专门阐述如何更好的使用它。

#### 6）内联类型注解

​	与创建一个接口不同，你可以使用内联注解语法注解任何内容：`:{ /*Structure*/ }`：

```ts
let name: {
  first: string;
  second: string;
};

name = {
  first: 'John',
  second: 'Doe'
};

name = {
  // Error: 'Second is missing'
  first: 'John'
};

name = {
  // Error: 'Second is the wrong type'
  first: 'John',
  second: 1337
};
```

​	内联类型能为你快速的提供一个类型注解。它可以帮助你省去为类型起名的麻烦（你可能会使用一个很糟糕的名称）。然而，如果你发现需要多次使用相同的内联注解时，那么考虑把它重构为一个接口（或者是 `type alias`，它会在接下来的部分提到）是一个不错的主意。

#### 7）特殊类型

​	除了被提到的一些原始类型，在 TypeScript 中，还存在一些特殊的类型，它们是 `any`、 `null`、 `undefined` 以及 `void`。

> **any**

​	`any` 类型在 TypeScript 类型系统中占有特殊的地位。它提供给你一个类型系统的「后门」,TypeScript 将会把类型检查关闭。在类型系统里 `any` 能够兼容所有的类型（包括它自己）。因此，所有类型都能被赋值给它，它也能被赋值给其他任何类型。以下有一个证明例子：

```ts
let power: any;

// 赋值任意类型
power = '123';
power = 123;

// 它也兼容任何类型
let num: number;
power = num;
num = power;
```

​	当你把 JavaScript 迁移至 TypeScript 时，你将会经常性使用 `any`。但你必须减少对它的依赖，因为你需要确保类型安全。当使用 `any` 时，你基本上是在告诉 TypeScript 编译器不要进行任何的类型检查。



> **null和undefined**

​	在类型系统中，JavaScript 中的 null 和 undefined 字面量和其他被标注了 `any` 类型的变量一样，都能被赋值给任意类型的变量，如下例子所示：

```ts
// strictNullChecks: false

let num: number;
let str: string;

// 这些类型能被赋予
num = null;
str = undefined;
```



> **void**

使用 `:void` 来表示一个函数没有一个返回值

```ts
function log(message: string): void {
  console.log(message);
}
```



#### 8）泛型

​	在计算机科学中，许多算法和数据结构并不会依赖于对象的实际类型。但是，你仍然会想在每个变量里强制提供约束。例如：在一个函数中，它接受一个列表，并且返回这个列表的反向排序，这里的约束是指传入至函数的参数与函数的返回值：

```ts
function reverse<T>(items: T[]): T[] {
  const toreturn = [];
  for (let i = items.length - 1; i >= 0; i--) {
    toreturn.push(items[i]);
  }
  return toreturn;
}

const sample = [1, 2, 3];
let reversed = reverse(sample);

console.log(reversed); // 3, 2, 1

// Safety
reversed[0] = '1'; // Error
reversed = ['1', '2']; // Error

reversed[0] = 1; // ok
reversed = [1, 2]; // ok
```

​	在上个例子中，函数 `reverse` 接受一个类型为 `T`（注意在 `reverse<T>` 中的类型参数） 的数组（`items: T[]`），返回值为类型 T 的一个数组（注意：T[]），函数 `reverse` 的返回值类型与它接受的参数的类型一样。当你传入 `const sample = [1, 2, 3]` 时，TypeScript 能推断出 `reverse` 为 `number[]` 类型，从而能给你类型安全。与此相似，当你传入一个类型为 `string[]` 类型的数组时，TypeScript 能推断 `reverse` 为 `string`[] 类型，如下例子所示：

```ts
const strArr = ['1', '2'];
let reversedStrs = reverse(strArr);

reversedStrs = [1, 2]; // Error
```

事实上，JavaScript 数组已经拥有了 `reverse` 的方法，TypeScript 也确实使用了泛型来定义其结构：

```ts
interface Array<T> {
  reverse(): T[];
}
```

这意味着，当你在数组上调用 `.reverse` 方法时，将会获得类型安全：

```ts
let numArr = [1, 2];
let reversedNums = numArr.reverse();

reversedNums = ['1', '2']; // Error
```

当稍后在 [环境声明](https://jkchao.github.io/typescript-book-chinese/typings/ambient.html) 章节中提及 `lib.d.ts` 时，我们会讨论更多关于 `Array<T>` 的信息。

#### 9）联合类型

​	在 JavaScript 中，你可能希望属性为多种类型之一，如字符串或者数组。这正是 TypeScript 中联合类型能派上用场的地方（它使用 `|` 作为标记，如 `string | number`）。关于联合类型，一个常见的用例是一个可以接受字符串数组或单个字符串的函数：

```ts
function formatCommandline(command: string[] | string) {
  let line = '';
  if (typeof command === 'string') {
    line = command.trim();
  } else {
    line = command.join(' ').trim();
  }

  // Do stuff with line: string
}
```

#### 10）元组类型

​	JavaScript 并不支持元组，开发者们通常只能使用数组来表示元组。而 TypeScript 支持它，开发者可以使用 `:[typeofmember1, typeofmember2]` 的形式，为元组添加类型注解，元组可以包含任意数量的成员，示例：

```ts
let nameNumber: [string, number];

// Ok
nameNumber = ['Jenny', 221345];

// Error
nameNumber = ['Jenny', '221345'];
```

将其与 TypeScript 中的解构一起使用：

```ts
let nameNumber: [string, number];
nameNumber = ['Jenny', 322134];

const [name, num] = nameNumber;
```

#### 11） 类型别名

​	TypeScript 提供了为类型注解设置别名的便捷语法，你可以使用 `type SomeName = someValidTypeAnnotation` 来创建别名：

```ts
type StrOrNum = string | number;

// 使用
let sample: StrOrNum;
sample = 123;
sample = '123';

// 会检查类型
sample = true; // Error
```

​	与接口不同，你可以为任意的类型注解提供类型别名（在联合类型和交叉类型中比较实用），下面是一些能让你熟悉类型别名语法的示例。

```ts
type Text = string | { text: string };
type Coordinates = [number, number];
type Callback = (data: string) => void;
```

:::tip

**TIP**

- 如果你需要使用类型注解的层次结构，请使用接口。它能使用 `implements` 和 `extends`
- 为一个简单的对象类型（如上面例子中的 Coordinates）使用类型别名，只需要给它一个语义化的名字即可。另外，当你想给联合类型和交叉类型提供一个语义化的名称时，一个类型别名将会是一个好的选择。

:::



### 2. 从JavaScript迁移

首先，假设如下：

- 你了解 JavaScript；
- 你了解在项目中常用的方式和构建工具（如：webpack）。

有了以上假设，一般来说，将 JavaScript 代码迁移至 TypeScript 包括以下步骤：

- 添加一个 `tsconfig.json` 文件；
- 把文件扩展名从 `.js` 改成 `.ts`，开始使用 `any` 来减少错误；
- 开始在 TypeScript 中写代码，尽可能的减少 `any` 的使用；
- 回到旧代码，开始添加类型注解，并修复已识别的错误；
- 为第三方 JavaScript 代码定义环境声明。

让我们进一步讨论其中的几个关键点。

:::tip

**记住**：所有的 JavaScript 代码都是有效的 TypeScript 代码。这意味着，如果让 TypeScript 编译器编译 TypeScript 里的 JavaScript 代码，编译后的结果将会与原始的 JavaScript 代码一模一样。也就是说，把文件扩展名从 `.js` 改成 `.ts` 将不会造成任何负面的影响。

:::

#### 1）减少错误

​	代码被迁移至 TypeScript 后，TypeScript 将会立即对你的代码进行类型检查，你的 JavaScript 代码可能并不像想象中那样整齐了，因此你可能会收到一些报错信息。这时，可以使用 `any` 来解决大部分的报错问题：

```typescript
let foo = 123;
let bar = 'hey';

bar = foo; // Error: 不能把 number 类型赋值给 string 类型
```

​	虽然这些错误是有效的，并且在大多数情况下，根据这些错误所推断出的信息比代码库的不同部分的原始作者想象的更好，但是你的重点是在逐步更新旧代码库的同时，用 TypeScript 编写新代码。在这里，你可以使用类型断言来减少此错误：

```typescript
let foo = 123;
let bar = 'hey';

bar = foo as any; // ok
```

从另一方面来说，你可能想用 `any` 用作类型注解：

```typescript
function foo() {
  return 1;
}

let bar = 'hey';
bar = foo(); // Error: 不能把一个 number 类型赋值给 string 类型
```

减少这种错误：

```typescript
function foo(): any {
  // 添加 'any'
  return 1;
}

let bar = 'hey';
bar = foo();
```

:::warning

**NOTICE**

使用此种方式来减少错误是危险的，但是它允许你将注意力转移到你的新 TypeScript 代码错误上。当你进行下一步前，最好要留下 `// TODO` 的注释

:::

#### 2）第三方代码

​	你可以将你的 JavaScript 代码改成 TypeScript 代码，但是你不能让整个世界都使用 TypeScript。这正是 TypeScript 环境声明支持的地方。我建议你以创建一个 `vendor.d.ts` 文件作为开始（`.d.ts` 文件扩展名指定这个文件是一个声明文件），然后我向文件里添加东西。或者，你也可以创建一个针对于特定库的声明文件，如为 jquery 创建 `jquery.d.ts` 文件。

:::tip

**NOTICE**

​	几乎排名前 90% 的 JavaScript 库的声明文件存在于 [DefinitelyTyped](https://github.com/borisyankov/DefinitelyTyped) 仓库里，在创建自己定义的声明文件之前，我们建议你先去仓库中寻找是否有对应的声明文件。尽管如此，创建一个声明文件这种快速但不好的方式是减小使用 TypeScript 初始阻力的重要步骤

:::

​	根据 `jquery` 的使用，你可以非常简单快速的为它创建一个定义：

```typescript
declare var $: any;
```

​	有时，你可能想在某些内容（如 `jQuery`）上添加显式的注解，并且你会在类型声明空间中使用它。你可以通过 `type` 关键字快速的实现它：

```typescript
declare type JQuery = any;
declare var $: JQuery;
```

这提供给你一个更清晰的使用模式。

​	一个高质量的 `jquery.d.ts` 已经在 [DefinitelyTyped](https://github.com/borisyankov/DefinitelyTyped) 中存在。现在你已经知道如何在使用第三方 JavaScript 模块时，快速克服从 JavaScript 至 TypeScript 的阻力了。在接下去的章节，我们将会讨论环境声明。

#### 3）第三方的NPM模块

与全局变量声明相似，你可以快速的定义一个全局模块，如：对于 `jquery`，如果你想把它作为一个模块来使用（[NPM](https://www.npmjs.com/package/jquery)），可以自己通过以下方式实现：

```typescript
declare module 'jquery';
```

然后你就可以在必要时导入它：

```typescript
import * as $ from 'jquery';
```

:::tip

**TIP**

再一次说明，一个高质量的 `jquery.d.ts` 已经在 [DefinitelyTyped](https://github.com/borisyankov/DefinitelyTyped) 中存在，但是可能在你的包里没有，那么，你现在有一个简单快速的方式来继续迁移。

:::

#### 4）额外的非`JavaScript`资源

​	在 TypeScript 中，甚至可以允许你导入任何文件，例如 `.css` 文件（如果你使用的是 webpack 样式加载器或 css 模块），你只要添加如下代码（放在 `global.d.ts`）：

```typescript
declare module '*.css';
```

现在你可以使用 `import * as foo from './some/file.css'`。

与此相似，如果你想使用 html 模版（例如：angular），你可以：

```typescript
declare module '*.html';
```



### 3. @types

​	毫无疑问，[DefinitelyTyped](https://github.com/borisyankov/DefinitelyTyped) 是 TypeScript 最大的优势之一，社区已经记录了 90% 的顶级 JavaScript 库。

​	这意味着，你可以非常高效地使用这些库，而无须在单独的窗口打开相应文档以确保输入的正确性。

#### 1） 使用`@types`

你可以通过 `npm` 来安装使用 `@types`，例如为 `jquery` 添加声明文件：

```shell
npm install @types/jquery --save-dev
```

`@types` 支持全局和模块类型定义。

> **全局`@types`**

​	默认情况下，TypeScript 会自动包含支持全局使用的任何声明定义。例如，对于 jquery，你应该能够在项目中开始全局使用 `$`。

> **模块`@types`**

​	安装完之后，不需要特别的配置，你就可以像使用模块一样使用它：

```ts
import * as $ from 'jquery';

// 现在你可以此模块中任意使用$了 :)
```



#### 2）控制全局

​	可以看出，对于某些团队而言，拥有允许全局使用的定义是一个问题。因此，你可以通过配置 `tsconfig.json` 的 `compilerOptions.types` 选项，引入有意义的类型：

```ts
{
  "compilerOptions": {
    "types" : [
      "jquery"
    ]
  }
}
```

​	如上例所示，通过配置 `compilerOptions.types: [ "jquery" ]` 后，只允许使用 `jquery` 的 `@types` 包，即使这个人安装了另一个声明文件，比如 `npm install @types/node`，它的全局变量（例如 `process`）也不会泄漏到你的代码中，直到你将它们添加到 tsconfig.json 类型选项。

### 4. 环境声明

​	TypeScript 的设计目标之一是让你在 TypeScript 中安全、轻松地使用现有的 JavaScript 库，TypeScript 通过声明文件来做到这一点。

​	环境声明允许你安全地使用现有的 JavaScript 库，并且能让你的 JavaScript、CoffeeScript 或者其他需要编译成 JavaScript 的语言逐步迁移至 TypeScript。

​	学习为第三方 JavaScript 库编写环境声明，是一种为 TypeScript 写注解比较好的实践方式。

#### 1）声明文件

​	你可以通过 `declare` 关键字来告诉 TypeScript，你正在试图表述一个其他地方已经存在的代码，如：写在 JavaScript、CoffeeScript 或者是像浏览器和 Node.js 运行环境里的代码：

```ts
foo = 123; // Error: 'foo' is not defined
```

和：

```ts
declare var foo: any;
foo = 123; // allow
```

​	你可以选择把这些声明放入 `.ts` 或者 `.d.ts` 里。在你实际的项目里，我们强烈建议你应该把声明放入独立的 `.d.ts` 里（可以从一个命名为 `global.d.ts` 或者 `vendor.d.ts` 文件开始）。

​	如果一个文件有扩展名 `.d.ts`，这意味着每个根级别的声明都必须以 `declare` 关键字作为前缀。这有利于让开发者清楚的知道，在这里 TypeScript 将不会把它编译成任何代码，同时开发者需要确保这些在编译时存在。

:::tip

**TIP**

- 环境声明就好像你与编译器之间的一个约定，如果在编译时它们不存在，但是你却使用了它们，程序将会在没有警告的情况下中断。
- 环境声明就好像是一个文档。如果源文件更新了，你应该同步更新。所以，当你在运行时有新的行为时，如果没有去更新环境声明，编译器将会报错。

:::

#### 2）变量

当你想告诉 TypeScript 编辑器关于 `process` 变量时，你可以这么做：

```ts
declare let process: any;
```

:::tip

**TIP**

​	你并不需要为 `process` 做这些，因为这已经存在于社区维护的 [`node.d.ts`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/node/index.d.ts)

:::

​	这允许你使用 `process`，并能成功通过 TypeScript 的编译：

```ts
process.exit();
```

​	我们推荐尽可能的使用接口，例如：

```ts
interface Process {
  exit(code?: number): void;
}

declare let process: Process;
```

​	因为这允许其他人扩充这些全局变量，并且会告诉 TypeScript 有关于这些声明的修改。例如：考虑到以下情况，我们添加一个 `exitWithLogging` 函数至 `process`：

```ts
interface Process {
  exitWithLogging(code?: number): void;
}

process.exitWithLogging = function() {
  console.log('exiting');
  process.exit.apply(process, arguments);
};
```

​	接下来，让我们更详细的了解接口。



### 5. 接口

​	接口运行时的影响为 0。在 TypeScript 接口中有很多方式来声明变量的结构。

​	下面两个是等效的声明, 示例 A 使用内联注解，示例 B 使用接口形式：

```ts
// 示例 A
declare const myPoint: { x: number; y: number };

// 示例 B
interface Point {
  x: number;
  y: number;
}
declare const myPoint: Point;
```

示例 B 的好处在于，如果有人创建了一个基于 `myPoint` 的库来添加新成员, 那么他可以轻松将此成员添加到 `myPoint` 的现有声明中:

```ts
// Lib a.d.ts
interface Point {
  x: number,
  y: number
}
declare const myPoint: Point

// Lib b.d.ts
interface Point {
  z: number
}

// Your code
myPoint.z // Allowed!
```

TypeScript 接口是开放式的，这是 TypeScript 的一个重要原则，它允许你使用接口来模仿 JavaScript 的可扩展性。

#### 1）类可以实现接口

​	如果你希望在类中使用必须要被遵循的接口（类）或别人定义的对象结构，可以使用 `implements` 关键字来确保其兼容性：

```ts
interface Point {
  x: number;
  y: number;
}

class MyPoint implements Point {
  x: number;
  y: number; // Same as Point
}
```

​	基本上，在 `implements（实现）` 存在的情况下，该外部 `Point` 接口的任何更改都将导致代码库中的编译错误，因此可以轻松地使其保持同步：

```ts
interface Point {
  x: number;
  y: number;
  z: number; // New member
}

class MyPoint implements Point {
  // ERROR : missing member `z`
  x: number;
  y: number;
}
```

注意，`implements` 限制了类实例的结构，如下所示:

```ts
let foo: Point = new MyPoint();
```

但像 `foo: Point = MyPoint` 这样的代码，与其并不是一回事。

> 注意： **并非每个接口都是很容易实现的**

​	接口旨在声明 JavaScript 中可能存在的任意结构。

思考以下例子，可以使用 `new` 调用某些内容：

```ts
interface Crazy {
  new (): {
    hello: number;
  };
}
```

你可能会有下面这样的代码：

```ts
class CrazyClass implements Crazy {
  constructor() {
    return { hello: 123 };
  }
}

// Because
const crazy = new CrazyClass(); // crazy would be { hello:123 }
```

你可以使用接口声明所有“疯狂的”的 JavaScript 代码，甚至可以安全地在 TypeScript 中使用它们。但这并不意味着你可以使用 TypeScript 类来实现它们。



### 6. 枚举

​	枚举是组织收集有关联变量的一种方式，许多程序语言（如：c/c#/Java）都有枚举数据类型。下面是定义一个 TypeScript 枚举类型的方式：

```ts
enum CardSuit {
  Clubs,
  Diamonds,
  Hearts,
  Spades
}

// 简单的使用枚举类型
let Card = CardSuit.Clubs;

// 类型安全
Card = 'not a member of card suit'; // Error: string 不能赋值给 `CardSuit` 类型
```

这些枚举类型的值都是数字类型，因此它们被称为数字类型枚举。



#### 1）数字类型枚举与数字类型

​	数字类型枚举，允许我们将数字类型或者其他任何与数字类型兼容的类型赋值给枚举类型的实例。

```ts
enum Color {
  Red,
  Green,
  Blue
}

let col = Color.Red;
col = 0; // 有效的，这也是 Color.Red
```



#### 2）数字类型枚举与字符串类型

​	在我们继续深入学习枚举类型之前，先来看看它编译的 JavaScript 吧，以下是一个简单的 TypeScript 枚举类型：

```ts
enum Tristate {
  False,
  True,
  Unknown
}
```

其被编译成 JavaScript 后如下所示：

```ts
var Tristate;
(function(Tristate) {
  Tristate[(Tristate['False'] = 0)] = 'False';
  Tristate[(Tristate['True'] = 1)] = 'True';
  Tristate[(Tristate['Unknown'] = 2)] = 'Unknown';
})(Tristate || (Tristate = {}));
```

​	先让我们聚焦 `Tristate[Tristate['False'] = 0] = 'False'` 这行代码，其中 `Tristate['False'] = 0` 的意思是将 `Tristate` 对象里的 `False` 成员值设置为 `0`。注意，JavaScript 赋值运算符返回的值是被赋予的值（在此例子中是 `0`），因此下一次 JavaScript 运行时执行的代码是 `Tristate[0] = 'False'`。意味着你可以使用 `Tristate` 变量来把字符串枚举类型改造成一个数字或者是数字类型的枚举类型，如下所示：

```ts
enum Tristate {
  False,
  True,
  Unknown
}

console.log(Tristate[0]); // 'False'
console.log(Tristate['False']); // 0
console.log(Tristate[Tristate.False]); // 'False' because `Tristate.False == 0`
```



#### 3）改变与数字枚举关联的数字

默认情况下，第一个枚举值是 `0`，然后每个后续值依次递增 1：

```ts
enum Color {
  Red, // 0
  Green, // 1
  Blue // 2
}
```

但是，你可以通过特定的赋值来改变给任何枚举成员关联的数字，如下例子，我们从 3 开始依次递增：

```ts
enum Color {
  DarkRed = 3, // 3
  DarkGreen, // 4
  DarkBlue // 5
}
```

:::tip

**TIP**:

我通常用 `= 1` 初始化，因为在枚举类型值里，它能让你做一个安全可靠的检查。

:::

#### 4）使用数字类型作为标记

​	枚举的一个很好用途是使用枚举作为标志。这些标志允许你检查一组条件中的某个条件是否为真。考虑如下代码例子，我们有一组关于 animals 的属性：

```ts
enum AnimalFlags {
  None        = 0,
  HasClaws    = 1 << 0,
  CanFly      = 1 << 1,
  EatsFish    = 1 << 2,
  Endangered  = 1 << 3
}
```

在这里，我们使用了左移的位运算符，将数字 `1` 的二进制向左移动位置得到数字 `0001`、`0010`、`0100` 和 `1000`（换成十进制结果是：1, 2, 4, 8）。当你在使用这种标记的时候，这些位运算符 `|` (或)、`&` （和）、`~` （非）将会是你最好的朋友：

```ts
enum AnimalFlags {
  None        = 0,
  HasClaws    = 1 << 0,
  CanFly      = 1 << 1
}

interface Animal {
  flags: AnimalFlags;
  [key: string]: any;
}

function printAnimalAbilities(animal: Animal) {
  var animalFlags = animal.flags;
  if (animalFlags & AnimalFlags.HasClaws) {
    console.log('animal has claws');
  }
  if (animalFlags & AnimalFlags.CanFly) {
    console.log('animal can fly');
  }
  if (animalFlags == AnimalFlags.None) {
    console.log('nothing');
  }
}

var animal = { flags: AnimalFlags.None };
printAnimalAbilities(animal); // nothing
animal.flags |= AnimalFlags.HasClaws;
printAnimalAbilities(animal); // animal has claws
animal.flags &= ~AnimalFlags.HasClaws;
printAnimalAbilities(animal); // nothing
animal.flags |= AnimalFlags.HasClaws | AnimalFlags.CanFly;
printAnimalAbilities(animal); // animal has claws, animal can fly
```

在这里：

- 我们使用 `|=` 来添加一个标志；
- 组合使用 `&=` 和 `~` 来清理一个标志；
- `|` 来合并标志。

:::tip

**TIP**:

​	你可以组合标志，用来在枚举类型中定义方便快捷的方式，如下 `EndangeredFlyingClawedFishEating`：

```ts
enum AnimalFlags {
  None        = 0,
  HasClaws    = 1 << 0,
  CanFly      = 1 << 1,
  EatsFish    = 1 << 2,
  Endangered  = 1 << 3,
  EndangeredFlyingClawedFishEating = HasClaws | CanFly | EatsFish | Endangered
}
```

:::

#### 5）字符串枚举

​	在上文中，我们只看到了数字类型的枚举，实际上，枚举类型的值，也可以是字符串类型。

```ts
export enum EvidenceTypeEnum {
  UNKNOWN = '',
  PASSPORT_VISA = 'passport_visa',
  PASSPORT = 'passport',
  SIGHTED_STUDENT_CARD = 'sighted_tertiary_edu_id',
  SIGHTED_KEYPASS_CARD = 'sighted_keypass_card',
  SIGHTED_PROOF_OF_AGE_CARD = 'sighted_proof_of_age_card'
}
```

​	这些可以更容易被处理和调试，因为它们提供有意义/可调试的字符串。

你可以使用它们用于简单的字符串比较：

```ts
// Where `someStringFromBackend` will be '' | 'passport_visa' | 'passport' ... etc.
const value = someStringFromBackend as EvidenceTypeEnum;

// Sample use in code
if (value === EvidenceTypeEnum.PASSPORT) {
  console.log('You provided a passport');
  console.log(value); // `passport`
}
```



#### 6）常量枚举

```ts
enum Tristate {
  False,
  True,
  Unknown
}

const lie = Tristate.False;
```

​	`const lie = Tristate.False` 会被编译成 JavaScript `let lie = Tristate.False` (是的，编译后与编译前，几乎相同)。这意味着在运行执行时，它将会查找变量 `Tristate` 和 `Tristate.False`。在此处获得性能提升的一个小技巧是使用常量枚举：

```ts
const enum Tristate {
  False,
  True,
  Unknown
}

const lie = Tristate.False;
```

将会被编译成：

```js
let lie = 0;
```

编译器将会：

- 内联枚举的任何用法（`0` 而不是 `Tristate.False`）；
- 不会为枚举类型编译成任何 JavaScript（在这个例子中，运行时没有 `Tristate` 变量），因为它使用内联语法。

> **常量枚举`preserveConstEnums`选项**

​	使用内联语法对性能有明显的提升作用。运行时没有 `Tristate` 变量的事实，是因为编译器帮助你把一些在运行时没有用到的不编译成 JavaScript。然而，你可能想让编译器仍然把枚举类型编译成 JavaScript，用于如上例子中从字符串到数字，或者是从数字到字符串的查找。在这种情景下，你可以使用编译选项 `--preserveConstEnums`，它会编译出 `var Tristate` 的定义，因此你在运行时，手动使用 `Tristate['False']` 和 `Tristate[0]`。并且这不会以任何方式影响内联。



#### 7）有静态方法的枚举

​	你可以使用 `enum` + `namespace` 的声明的方式向枚举类型添加静态方法。如下例所示，我们将静态成员 `isBusinessDay` 添加到枚举上：

```ts
enum Weekday {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday
}

namespace Weekday {
    export function isBusinessDay(day: Weekday) {
        switch (day) {
            case Weekday.Saturday:
            case Weekday.Sunday:
                return false;
            default:
                return true;
        }
    }
}

const mon = Weekday.Monday;
const sun = Weekday.Sunday;

console.log(Weekday.isBusinessDay(mon)); // true
console.log(Weekday.isBusinessDay(sun)); // false
```



#### 8）开放式枚举

:::tip

​	只有在不适用模块时，开放式的枚举才有意义，应该使用模块

:::

让我们再一次看看编译成 JavaScript 的枚举是什么样子：

```ts
var Tristate;
(function(Tristate) {
  Tristate[(Tristate['False'] = 0)] = 'False';
  Tristate[(Tristate['True'] = 1)] = 'True';
  Tristate[(Tristate['Unknown'] = 2)] = 'Unknown';
})(Tristate || (Tristate = {}));
```

我们已经解释了 `Tristate[Tristate['False'] = 0] = 'False'` 部分，现在我们来看看包裹函数 `(function (Tristate) { /* code here */})(Tristate || (Tristate = {}))`，特别是 `(Tristate || (Tristate = {}))` 部分。这捕获了一个局部变量 `TriState`，它要么指向已经定义的`TriState` 值，要么使用一个新的空对象来初始化它。

这意味着你可以跨多个文件拆分（和扩展）枚举定义，如下所示，你可以把 `Color` 的定义拆分至两个块中：

```ts
enum Color {
  Red,
  Green,
  Blue
}

enum Color {
  DarkRed = 3,
  DarkGreen,
  DarkBlue
}
```

:::tip

​	你应该在枚举的延续块中，重新初始化第一个成员（此处为 `DarkRed = 3`），使生成的代码不破坏先前定义的值（即0、1...等值）。如果您仍然不这样做，TypeScript 将会发出警告（错误信息：`In an enum with multiple declarations, only one declaration can omit an initializer for its first enum element.`）。

:::



### 7. lib.d.ts

> lib.d.ts是什么？

​	当你安装 `TypeScript` 时，会顺带安装一个 `lib.d.ts` 声明文件。这个文件包含 JavaScript 运行时以及 DOM 中存在各种常见的环境声明。

- 它自动包含在 TypeScript 项目的编译上下文中；
- 它能让你快速开始书写经过类型检查的 JavaScript 代码。



> 如何从上下文中去除lib.d.ts文件

- 通过指定 `--noLib` 的编译器命令行标志
- 在 `tsconfig.json` 中指定选项 `noLib: true`

#### 1）使用例子

看如下例子：

```ts
const foo = 123;
const bar = foo.toString();
```

这段代码的类型检查正常，因为 `lib.d.ts` 为所有 JavaScript 对象定义了 `toString` 方法。

如果你在 `noLib` 选项下，使用相同的代码，这将会出现类型检查错误：

```ts
const foo = 123;
const bar = foo.toString(); // Error: 属性 toString 不存在类型 number 上
```

现在你已经理解了 `lib.d.ts` 的重要性，至于它的内容是怎么样的，我们接下来将会解释。



#### 2）观察`lib.d.ts`的内容

`lib.d.ts` 的内容主要是一些变量声明（如：`window`、`document`、`math`）和一些类似的接口声明（如：`Window`、`Document`、`Math`）。

寻找代码类型（如：`Math.floor`）的最简单方式是使用 IDE 的 `F12`（跳转到定义）。

让我们来看一个变量声明的示例，如 `window` 被定义为：

```ts
declare var window: Window;
```

这只是一个简单的 `declare var`，后面跟一个变量名称（`window`）和一个用来类型注解的接口（`Window`），这些变量通常指向一些全局的接口，例如，以下是 `Window` 接口的一小部分：

```ts
interface Window
  extends EventTarget,
    WindowTimers,
    WindowSessionStorage,
    WindowLocalStorage,
    WindowConsole,
    GlobalEventHandlers,
    IDBEnvironment,
    WindowBase64 {
  animationStartTime: number;
  applicationCache: ApplicationCache;
  clientInformation: Navigator;
  closed: boolean;
  crypto: Crypto;
  // so on and so forth...
}
```

​	你可以在这些接口里看到大量的类型信息，当你不使用 TypeScript 时，你需要将它们保存在你的大脑里。现在你可以使用 `intellisense` 之类东西，从而可以减少对知识的记忆。

​	使用这些全局变量是有利的。在不更改 `lib.d.ts` 的情况下，它可以让你添加额外的属性。接下来，我们将介绍这些概念。

#### 3）修改原始类型

​	在 TypeScript 中，接口是开放式的，这意味着当你想使用不存在的成员时，只需要将它们添加至 `lib.d.ts` 中的接口声明中即可，TypeScript 将会自动接收它。注意，你需要在[全局模块](https://jkchao.github.io/typescript-book-chinese/project/modules.html)中做这些修改，以使这些接口与 `lib.d.ts` 相关联。我们推荐你创建一个称为 `global.d.ts` 的特殊文件。

这里有我们需要添加至 `Window`，`Math`，`Date` 的一些例子：

> **Window**

仅仅是添加至 `Window` 接口：

```ts
interface Window {
  helloWorld(): void;
}
```

这将允许你以类型安全的形式使用它：

```ts
// Add it at runtime
window.helloWorld = () => console.log('hello world');

// Call it
window.helloWorld();

// 滥用会导致错误
window.helloWorld('gracius'); // Error: 提供的参数与目标不匹配
```

> **Math**

全局变量 `Math` 在 `lib.d.ts` 中被定义为：

```ts
/** 提供基本数学功能和常数的内在对象。 */
declare var Math: Math;
```

即变量 `Math` 是 `Math` 的一个实例，`Math` 接口被定义为：

```ts
interface Math {
  E: number;
  LN10: number;
  // others ...
}
```

​	当你想在 `Math` 全局变量上添加你需要的属性时，你只需要把它添加到 `Math` 的全局接口上即可，例如：在[`seedrandom Project`](https://www.npmjs.com/package/seedrandom)项目里，它添加了 `seedrandom` 函数至全局的 `Math` 对象上，这很容易被声明：

```ts
interface Math {
  seedrandom(seed?: string): void;
}
```

你可以像下面一样使用它：

```ts
Math.seedrandom();

Math.seedrandom('Any string you want');
```

> **Date**

如果你在 `lib.d.ts` 中寻找 `Date` 定义的声明，你将会找到如下代码：

```ts
declare var Date: DateConstructor;
```

接口 `DateConstructor` 与上文中 `Math` 和 `Window` 接口一样，它涵盖了可以使用的 `Date` 全局变量的成员（如：`Date.now()`）。除此之外，它还包含了可以让你创建 `Date` 实例的构造函数签名（如：`new Date()`）。`DateConstructor` 接口的一部分代码如下所示：

```ts
interface DateConstructor {
  new (): Date;
  // 一些其他的构造函数签名

  now(): number;

  // 其他成员函数
}
```

在 [datejs](https://github.com/abritinthebay/datejs) 里，它在 `Date` 的全局变量以及 `Date` 实例上同时添加了成员，因此这个库的 TypeScript 定义看起来像如下所示（社区已经[定义](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/datejs/index.d.ts)好了）：

```ts
// DateJS 公开的静态方法
interface DateConstructor {
  /** Gets a date that is set to the current date. The time is set to the start of the day (00:00 or 12:00 AM) */
  today(): Date;
  // ... so on and so forth
}

// DateJS 公开的实例方法
interface Date {
  /** Adds the specified number of milliseconds to this instance. */
  addMilliseconds(milliseconds: number): Date;
  // ... so on and so forth
}
```

这允许你在类型安全的情况下做：

```ts
const today = Date.today();
const todayAfter1second = today.addMilliseconds(1000);
```

> **string**

​	如果你在 `lib.d.ts` 里寻找 `string`，你将会找到与 `Date` 相类似的内容（全局变量 `String`，`StringConstructor` 接口，`String` 接口）。但值得注意的是，`String` 接口也会影响字符串字面量，如下所示：

```ts
interface String {
  endsWith(suffix: string): boolean;
}

String.prototype.endsWith = function(suffix: string): boolean {
  const str: string = this;
  return str && str.indexOf(suffix, str.length - suffix.length) !== -1;
};

console.log('foo bar'.endsWith('bas')); // false
console.log('foo bas'.endsWith('bas')); // true
```



> **终极string**

​	基于可维护性，我们推荐创建一个 `global.d.ts` 文件。然而，如果你愿意，你可以通过使用 `declare global { /* global namespace */ }`，从文件模块中进入全局命名空间：

```ts
// 确保是模块
export {};

declare global {
  interface String {
    endsWith(suffix: string): boolean;
  }
}

String.prototype.endsWith = function(suffix: string): boolean {
  const str: string = this;
  return str && str.indexOf(suffix, str.length - suffix.length) !== -1;
};

console.log('foo bar'.endsWith('bas')); // false
console.log('foo bas'.endsWith('bas')); // true
```



#### 4）自定义`lib.d.ts`

正如上文所说，使用 `--noLib` 编译选项会导致 TypeScript 排除自动包含的 `lib.d.ts` 文件。为什么这个功能是有效的，我例举了一些常见原因：

- 运行的 JavaScript 环境与基于标准浏览器运行时环境有很大不同；
- 你希望在代码里严格的控制全局变量，例如：`lib.d.ts` 将 `item` 定义为全局变量，你不希望它泄漏到你的代码里。

一旦你排除了默认的 `lib.d.ts` 文件，你就可以在编译上下文中包含一个命名相似的文件，TypeScript 将提取该文件进行类型检查。

:::tip

​	小心使用 `--noLib` 选项，一旦你使用了它，当你把你的项目分享给其他人时，它们也将被迫使用 `--noLib` 选项，更糟糕的是，如果将这些代码放入你的项目中，你可能需要将它们移植到基于你的代码的 `lib` 中。

:::

#### 5）编译目标对`lib.d.ts`的影响

​	设置编译目标为 `es6` 时，能导致 `lib.d.ts` 包含更多像 Promise 现代（es6）内容的环境声明。编译器目标的这种作用，改变了代码的环境，这对某些人来说是理想的，但是这对另外一些人来说造成了困扰，因为它将编译出的代码与环境混为一谈。

​	当你想对环境进行更细粒的控制时，你应该使用我们接下来将要讨论的 `--lib` 选项。



#### 6）`–-lib`选项

​	有时，你想要解耦编译目标（即生成的 JavaScript 版本）和环境库支持之间的关系。例如对于 Promise，你的编译目标是 `--target es5`，但是你仍然想使用它，这时，你可以使用 `lib` 对它进行控制。

:::tip

**TIP**

使用 `--lib` 选项可以将任何 `lib` 与 `--target` 解耦。

:::

你可以通过命令行或者在 `tsconfig.json` 中提供此选项（推荐）：

> **命令行**

```ts
tsc --target es5 --lib dom,es6
```



> **tsconfig.json**

```json
"compilerOptions": {
    "lib": ["dom", "es6"]
}
```

`lib` 分类如下：

- JavaScript 功能
  - es5
  - es6
  - es2015
  - es7
  - es2016
  - es2017
  - esnext
- 运行环境
  - dom
  - dom.iterable
  - webworker
  - scripthost
- ESNext 功能选项
  - es2015.core
  - es2015.collection
  - es2015.generator
  - es2015.iterable
  - es2015.promise
  - es2015.proxy
  - es2015.reflect
  - es2015.symbol
  - es2015.symbol.wellknown
  - es2016.array.include
  - es2017.object
  - es2017.sharedmemory
  - esnext.asynciterable

:::tip

**NOTE**:

`--lib` 选项提供非常精细的控制，因此你最有可能从运行环境与 JavaScript 功能类别中分别选择一项，如果你没有指定 `--lib`，则会导入默认库：

- `--target` 选项为 es5 时，会导入 es5, dom, scripthost。
- `--target` 选项为 es6 时，会导入 es6, dom, dom.iterable, scripthost。

:::

我个人的推荐：

```json
"compilerOptions": {
  "target": "es5",
  "lib": ["es6", "dom"]
}
```

包括使用 Symbol 的 ES5 使用例子：

```json
"compilerOptions": {
  "target": "es5",
  "lib": ["es5", "dom", "scripthost", "es2015.symbol"]
}
```



#### 7）在旧的JavaScript引擎时使用Polyfill

要使用一些新功能如 `Map`、`Set`、`Promise`（随着时间推移会变化），你可以使用现代的 `lib` 选项，并且需要安装 `core-js`：

```shell
npm install core-js --save-dev
```

接着，在你的项目里导入它：

```ts
import 'core-js';
```



### 8. 函数

​	函数类型在 TypeScript 类型系统中扮演着非常重要的角色，它们是可组合系统的核心构建块。



#### 1）参数注解

你可以注解函数参数，就像你可以注解其他变量一样:

```ts
// variable annotation
let sampleVariable: { bar: number };

// function parameter annotation
function foo(sampleParameter: { bar: number }) {}
```

这里我们使用了内联类型注解，除此之外，你还可以使用接口等其他方式。



#### 2）返回类型注解

你可以在函数参数列表之后使用与变量相同的样式来注解返回类型，如例子中 `：Foo`：

```ts
interface Foo {
  foo: string;
}

// Return type annotated as `: Foo`
function foo(sample: Foo): Foo {
  return sample;
}
```

​	我们在这里使用了一个 `interface`，但你可以自由地使用其他注解方式，例如内联注解。

​	通常，你不*需要*注解函数的返回类型，因为它可以由编译器推断：

```ts
interface Foo {
  foo: string;
}

function foo(sample: Foo) {
  return sample; // inferred return type 'Foo'
}
```

​	但是，添加这些注解以帮助解决错误提示通常是一个好主意，例如：

```ts
function foo() {
  return { fou: 'John Doe' }; // You might not find this misspelling of `foo` till it's too late
}

sendAsJSON(foo());
```

​	如果你不打算从函数返回任何内容，则可以将其标注为：`void` 。你通常可以删除 `void`， TypeScript 能推导出来。



#### 3）可选参数

>   **`?:`**

```ts
function foo(bar: number, bas?: string): void {
  // ..
}

foo(123);
foo(123, 'hello');
```

> **= someValue**

​	当调用者没有提供该参数时，提供一个默认值（在参数声明后使用 `= someValue` ）：

```ts
function foo(bar: number, bas: string = 'hello') {
  console.log(bar, bas);
}

foo(123); // 123, hello
foo(123, 'world'); // 123, world
```



#### 4）重载

​	TypeScript 允许你声明函数重载。这对于文档 + 类型安全来说很实用。请思考以下代码：

```ts
function padding(a: number, b?: number, c?: number, d?: any) {
  if (b === undefined && c === undefined && d === undefined) {
    b = c = d = a;
  } else if (c === undefined && d === undefined) {
    c = a;
    d = b;
  }
  return {
    top: a,
    right: b,
    bottom: c,
    left: d
  };
}
```

​	如果仔细查看代码，就会发现 a，b，c，d 的值会根据传入的参数数量而变化。此函数也只需要 1 个，2 个或 4 个参数。可以使用函数重载来*强制*和*记录*这些约束。你只需多次声明函数头。最后一个函数头是在函数体内实际处于活动状态但不可用于外部。

```ts
// 重载
function padding(all: number);
function padding(topAndBottom: number, leftAndRight: number);
function padding(top: number, right: number, bottom: number, left: number);
// Actual implementation that is a true representation of all the cases the function body needs to handle
function padding(a: number, b?: number, c?: number, d?: number) {
  if (b === undefined && c === undefined && d === undefined) {
    b = c = d = a;
  } else if (c === undefined && d === undefined) {
    c = a;
    d = b;
  }
  return {
    top: a,
    right: b,
    bottom: c,
    left: d
  };
}
```

这里前三个函数头可有效调用 `padding`:

```ts
padding(1); // Okay: all
padding(1, 1); // Okay: topAndBottom, leftAndRight
padding(1, 1, 1, 1); // Okay: top, right, bottom, left

padding(1, 1, 1); // Error: Not a part of the available overloads
```

​	当然，最终声明（从函数内部看到的真正声明）与所有重载兼容是很重要的。这是因为这是函数体需要考虑的函数调用的真实性质。

:::tip

**TIP**

TypeScript 中的函数重载没有任何运行时开销。它只允许你记录希望调用函数的方式，并且编译器会检查其余代码。

:::



#### 5）函数声明

> 快速开始：类型注解是你描述现有实现类型的一种方式

在没有提供函数实现的情况下，有两种声明函数类型的方式:

```ts
type LongHand = {
  (a: number): number;
};

type ShortHand = (a: number) => number;
```

上面代码中的两个例子完全相同。但是，当你想使用函数重载时，只能用第一种方式:

```ts
type LongHandAllowsOverloadDeclarations = {
  (a: number): number;
  (a: string): string;
};
```



### 9. 可调用的

你可以使用类型别名或者接口来表示一个可被调用的类型注解：

```ts
interface ReturnString {
  (): string;
}
```

它可以表示一个返回值为 `string` 的函数：

```ts
declare const foo: ReturnString;

const bar = foo(); // bar 被推断为一个字符串。
```



#### 1）示例

当然，像这样一个可被调用的类型注解，你也可以根据实际来传递任何参数、可选参数以及 rest 参数，这有一个稍微复杂的例子：

```ts
interface Complex {
  (foo: string, bar?: number, ...others: boolean[]): number;
}
```

一个接口可提供多种调用签名，用以特殊的函数重载：

```ts
interface Overloaded {
    (foo: string): string;
    (foo: number): number;
}

// 实现接口的一个例子：
function stringOrNumber(foo: number): number;
function stringOrNumber(foo: string): string;
function stringOrNumber(foo: any): any {
    if (typeof foo === 'number') {
        return foo * foo;
    } else if (typeof foo === 'string') {
        return `hello ${foo}`;
    }
}

const overloaded: Overloaded = stringOrNumber;

// 使用
const str = overloaded(''); // str 被推断为 'string'
const num = overloaded(123); // num 被推断为 'number'
console.log(str); // hello
console.log(num); // 15129
```

这也可以用于内联注解中：

```ts
let overloaded: {
  (foo: string): string;
  (foo: number): number;
};
```



#### 2）箭头函数

​	为了使指定可调用的类型签名更容易，TypeScript 也允许你使用简单的箭头函数类型注解。例如，在一个以 number 类型为参数，以 string 类型为返回值的函数中，你可以这么写：

```ts
const simple: (foo: number) => string = foo => foo.toString();
```

:::tip

**TIP**

​	它仅仅只能作为简单的箭头函数，你无法使用重载。如果想使用重载，你必须使用完整的`{(someArgs):someReturn}`的语法。

:::

#### 3）可实例化

可实例化仅仅是可调用的一种特殊情况，它使用 `new` 作为前缀。它意味着你需要使用 `new` 关键字去调用它：

```ts
interface CallMeWithNewToGetString {
  new (): string;
}

// 使用
declare const Foo: CallMeWithNewToGetString;
const bar = new Foo(); // bar 被推断为 string 类型
```



### 10. 类型断言

TypeScript 允许你覆盖它的推断，并且能以你任何你想要的方式分析它，这种机制被称为「类型断言」。TypeScript 类型断言用来告诉编译器你比它更了解这个类型，并且它不应该再发出错误。

类型断言的一个常见用例是当你从 JavaScript 迁移到 TypeScript 时：

```ts
const foo = {};
foo.bar = 123; // Error: 'bar' 属性不存在于 ‘{}’
foo.bas = 'hello'; // Error: 'bas' 属性不存在于 '{}'
```

这里的代码发出了错误警告，因为 `foo` 的类型推断为 `{}`，即没有属性的对象。因此，你不能在它的属性上添加 `bar` 或 `bas`，你可以通过类型断言来避免此问题：

```ts
interface Foo {
  bar: number;
  bas: string;
}

const foo = {} as Foo;
foo.bar = 123;
foo.bas = 'hello';
```



#### 1）`as foo`与`<foo>`

最初的断言语法如下所示：

```ts
let foo: any;
let bar = <string>foo; // 现在 bar 的类型是 'string'
```

然而，当你在 JSX 中使用 `<foo>` 的断言语法时，这会与 JSX 的语法存在歧义：

```ts
let foo = <string>bar;</string>;
```

因此，为了一致性，我们建议你使用 `as foo` 的语法来为类型断言。

#### 2）类型断言与类型转换

​	它之所以不被称为「类型转换」，是因为转换通常意味着某种运行时的支持。但是，类型断言纯粹是一个编译时语法，同时，它也是一种为编译器提供关于如何分析代码的方法。



#### 3）类型断言被认为是有害的

​	在很多情景下，断言能让你更容易的从遗留项目中迁移（甚至将其他代码粘贴复制到你的项目中），然而，你应该小心谨慎的使用断言。让我们用最初的代码作为示例，如果你没有按约定添加属性，TypeScript 编译器并不会对此发出错误警告：

```ts
interface Foo {
  bar: number;
  bas: string;
}

const foo = {} as Foo;

// ahhh, 忘记了什么？
```

另外一个常见的想法是使用类型断言来提供代码的提示：

```ts
interface Foo {
  bar: number;
  bas: string;
}

const foo = <Foo>{
  // 编译器将会提供关于 Foo 属性的代码提示
  // 但是开发人员也很容易忘记添加所有的属性
  // 同样，如果 Foo 被重构，这段代码也可能被破坏（例如，一个新的属性被添加）。
};
```

这也会存在一个同样的问题，如果你忘记了某个属性，编译器同样也不会发出错误警告。使用一种更好的方式：

```ts
interface Foo {
  bar: number;
  bas: string;
}

const foo: Foo = {
  // 编译器将会提供 Foo 属性的代码提示
};
```

在某些情景下，你可能需要创建一个临时的变量，但至少，你不会使用一个承诺（可能是假的），而是依靠类型推断来检查你的代码。

#### 4）双重断言

类型断言，尽管我们已经证明了它并不是那么安全，但它也还是有用武之地。如下一个非常实用的例子所示，当使用者了解传入参数更具体的类型时，类型断言能按预期工作：

```ts
function handler(event: Event) {
  const mouseEvent = event as MouseEvent;
}
```

然而，如下例子中的代码将会报错，尽管使用者已经使用了类型断言：

```ts
function handler(event: Event) {
  const element = event as HTMLElement; // Error: 'Event' 和 'HTMLElement' 中的任何一个都不能赋值给另外一个
}
```

如果你仍然想使用那个类型，你可以使用双重断言。首先断言成兼容所有类型的 `any`，编译器将不会报错：

```ts
function handler(event: Event) {
  const element = (event as any) as HTMLElement; // ok
}
```



#### 5）TypeScript是怎么确定单个断言是否足够

​	当 `S` 类型是 `T` 类型的子集，或者 `T` 类型是 `S` 类型的子集时，`S` 能被成功断言成 `T`。这是为了在进行类型断言时提供额外的安全性，完全毫无根据的断言是危险的，如果你想这么做，你可以使用 `any`。



### 11. Freshness

​	为了能让检查对象字面量类型更容易，TypeScript 提供 「[Freshness](https://github.com/Microsoft/TypeScript/pull/3823)」 的概念（它也被称为更严格的对象字面量检查）用来确保对象字面量在结构上类型兼容。

​	结构类型非常方便。考虑如下例子代码，它可以让你非常便利的从 JavaScript 迁移至 TypeScript，并且会提供类型安全：

```js
function logName(something: { name: string }) {
  console.log(something.name);
}

const person = { name: 'matt', job: 'being awesome' };
const animal = { name: 'cow', diet: 'vegan, but has milk of own specie' };
const randow = { note: `I don't have a name property` };

logName(person); // ok
logName(animal); // ok
logName(randow); // Error: 没有 `name` 属性
```

但是，结构类型有一个缺点，它能误导你认为某些东西接收的数据比它实际的多。如下例，TypeScript 发出错误警告：

```ts
function logName(something: { name: string }) {
  console.log(something.name);
}

logName({ name: 'matt' }); // ok
logName({ name: 'matt', job: 'being awesome' }); // Error: 对象字面量只能指定已知属性，`job` 属性在这里并不存在。
```

:::warning

**WARNING**

请注意，这种错误提示，只会发生在对象字面量上。

:::

​	如果没有这种错误提示，我们可能会去寻找函数的调用 `logName({ name: 'matt', job: 'being awesome' })`，继而会认为 `logName` 可能会使用 `job` 属性做一些事情，然而实际上 `logName` 并没有使用它。

另外一个使用比较多的场景是与具有可选成员的接口一起使用，如果没有这样的对象字面量检查，当你输入错误单词的时候，并不会发出错误警告：

```ts
function logIfHasName(something: { name?: string }) {
  if (something.name) {
    console.log(something.name);
  }
}

const person = { name: 'matt', job: 'being awesome' };
const animal = { name: 'cow', diet: 'vegan, but has milk of own species' };

logIfHasName(person); // okay
logIfHasName(animal); // okay

logIfHasName({ neme: 'I just misspelled name to neme' }); // Error: 对象字面量只能指定已知属性，`neme` 属性不存在。
```

​	之所以只对对象字面量进行类型检查，因为在这种情况下，那些实际上并没有被使用到的属性有可能会拼写错误或者会被误用。

#### 1）允许额外的属性

一个类型能够包含索引签名，以明确表明可以使用额外的属性：

```ts
let x: { foo: number, [x: string]: any };

x = { foo: 1, baz: 2 }; // ok, 'baz' 属性匹配于索引签名
```



#### 2）用例：React State

​	Facebook ReactJS 为对象的 Freshness 提供了一个很好的用例，通常在组件中，你只使用少量属性，而不是传入所有，来调用 `setState`：

```ts
// 假设
interface State {
  foo: string;
  bar: string;
}

// 你可能想做：
this.setState({ foo: 'Hello' }); // Error: 没有属性 'bar'

// 因为 state 包含 'foo' 与 'bar'，TypeScript 会强制你这么做：
this.setState({ foo: 'Hello', bar: this.state.bar });
```

如果你想使用 Freshness，你可能需要将所有成员标记为可选，这仍然会捕捉到拼写错误：

```ts
// 假设
interface State {
  foo?: string;
  bar?: string;
}

// 你可能想做
this.setState({ foo: 'Hello' }); // Yay works fine!

// 由于 Freshness，你也可以防止错别字
this.setState({ foos: 'Hello' }}; // Error: 对象只能指定已知属性

// 仍然会有类型检查
this.setState({ foo: 123 }}; // Error: 无法将 number 类型赋值给 string 类型
```



### 12. 类型保护

类型保护允许你使用更小范围下的对象类型。

#### 1）typeof

​	TypeScript 熟知 JavaScript 中 `instanceof` 和 `typeof` 运算符的用法。如果你在一个条件块中使用这些，TypeScript 将会推导出在条件块中的的变量类型。如下例所示，TypeScript 将会辨别 `string` 上是否存在特定的函数，以及是否发生了拼写错误：

```ts
function doSome(x: number | string) {
  if (typeof x === 'string') {
    // 在这个块中，TypeScript 知道 `x` 的类型必须是 `string`
    console.log(x.subtr(1)); // Error: 'subtr' 方法并没有存在于 `string` 上
    console.log(x.substr(1)); // ok
  }

  x.substr(1); // Error: 无法保证 `x` 是 `string` 类型
}
```

#### 2）instanceof

这有一个关于 `class` 和 `instanceof` 的例子：

```ts
class Foo {
  foo = 123;
  common = '123';
}

class Bar {
  bar = 123;
  common = '123';
}

function doStuff(arg: Foo | Bar) {
  if (arg instanceof Foo) {
    console.log(arg.foo); // ok
    console.log(arg.bar); // Error
  }
  if (arg instanceof Bar) {
    console.log(arg.foo); // Error
    console.log(arg.bar); // ok
  }
}

doStuff(new Foo());
doStuff(new Bar());
```

TypeScript 甚至能够理解 `else`。当你使用 `if` 来缩小类型时，TypeScript 知道在其他块中的类型并不是 `if` 中的类型：

```ts
class Foo {
  foo = 123;
}

class Bar {
  bar = 123;
}

function doStuff(arg: Foo | Bar) {
  if (arg instanceof Foo) {
    console.log(arg.foo); // ok
    console.log(arg.bar); // Error
  } else {
    // 这个块中，一定是 'Bar'
    console.log(arg.foo); // Error
    console.log(arg.bar); // ok
  }
}

doStuff(new Foo());
doStuff(new Bar());
```



#### 3）in

`in` 操作符可以安全的检查一个对象上是否存在一个属性，它通常也被作为类型保护使用：

```ts
interface A {
  x: number;
}

interface B {
  y: string;
}

function doStuff(q: A | B) {
  if ('x' in q) {
    // q: A
  } else {
    // q: B
  }
}
```



#### 4）字面量类型保护

当你在联合类型里使用字面量类型时，你可以检查它们是否有区别：

```ts
type Foo = {
  kind: 'foo'; // 字面量类型
  foo: number;
};

type Bar = {
  kind: 'bar'; // 字面量类型
  bar: number;
};

function doStuff(arg: Foo | Bar) {
  if (arg.kind === 'foo') {
    console.log(arg.foo); // ok
    console.log(arg.bar); // Error
  } else {
    // 一定是 Bar
    console.log(arg.foo); // Error
    console.log(arg.bar); // ok
  }
}
```

#### 5）使用定义的类型保护

JavaScript 并没有内置非常丰富的、运行时的自我检查机制。当你在使用普通的 JavaScript 对象时（使用结构类型，更有益处），你甚至无法访问 `instanceof` 和 `typeof`。在这种情景下，你可以创建*用户自定义的类型保护函数*，这仅仅是一个返回值为类似于`someArgumentName is SomeType` 的函数，如下：

```ts
// 仅仅是一个 interface
interface Foo {
  foo: number;
  common: string;
}

interface Bar {
  bar: number;
  common: string;
}

// 用户自己定义的类型保护！
function isFoo(arg: Foo | Bar): arg is Foo {
  return (arg as Foo).foo !== undefined;
}

// 用户自己定义的类型保护使用用例：
function doStuff(arg: Foo | Bar) {
  if (isFoo(arg)) {
    console.log(arg.foo); // ok
    console.log(arg.bar); // Error
  } else {
    console.log(arg.foo); // Error
    console.log(arg.bar); // ok
  }
}

doStuff({ foo: 123, common: '123' });
doStuff({ bar: 123, common: '123' });
```

### 13. 字面量类型

字面量是 JavaScript 本身提供的一个准确变量。

#### 1）字符串字面量

> **字符串字面量做类型**：

```ts
let foo: 'Hello';
foo = 'Bar'; // Error: 'bar' 不能赋值给类型 'Hello'
```

> **与联合类型组合创建一个实用的抽象**：

```ts
type CardinalDirection = 'North' | 'East' | 'South' | 'West';

function move(distance: number, direction: CardinalDirection) {
  // ...
}

move(1, 'North'); // ok
move(1, 'Nurth'); // Error
```



#### 2）其他字面量类型

TypeScript 同样也提供 `boolean` 和 `number` 的字面量类型：

```ts
type OneToFive = 1 | 2 | 3 | 4 | 5;
type Bools = true | false;
```



#### 3）推断

通常，你会得到一个类似于 `Type string is not assignable to type 'foo'` 的错误，如下：

```ts
function iTakeFoo(foo: 'foo') {}
const test = {
  someProp: 'foo'
};

iTakeFoo(test.someProp); // Error: Argument of type string is not assignable to parameter of type 'foo'
```

这是由于 `test` 被推断为 `{ someProp: string }`，我们可以采用一个简单的类型断言来告诉 TypeScript 你想推断的字面量：

```ts
function iTakeFoo(foo: 'foo') {}

const test = {
  someProp: 'foo' as 'foo'
};

iTakeFoo(test.someProp); // ok
```

或者使用类型注解的方式，来帮助 TypeScript 推断正确的类型：

```ts
function iTakeFoo(foo: 'foo') {}

type Test = {
  someProp: 'foo';
};

const test: Test = {
  // 推断 `someProp` 永远是 'foo'
  someProp: 'foo'
};

iTakeFoo(test.someProp); // ok
```

#### 4）使用用例

TypeScript 枚举类型是基于数字的，你可以使用带字符串字面量的联合类型，来模拟一个基于字符串的枚举类型，就好像上文中提出的 `CardinalDirection`。你甚至可以使用下面的函数来生成 `key: value` 的结构：

```ts
// 用于创建字符串列表映射至 `K: V` 的函数
function strEnum<T extends string>(o: Array<T>): { [K in T]: K } {
  return o.reduce((res, key) => {
    res[key] = key;
    return res;
  }, Object.create(null));
}
```

然后，你就可以使用 `keyof`、`typeof` 来生成字符串的联合类型。下面是一个完全的例子：

```ts
// 用于创建字符串列表映射至 `K: V` 的函数
function strEnum<T extends string>(o: Array<T>): { [K in T]: K } {
  return o.reduce((res, key) => {
    res[key] = key;
    return res;
  }, Object.create(null));
}

// 创建 K: V
const Direction = strEnum(['North', 'South', 'East', 'West']);

// 创建一个类型
type Direction = keyof typeof Direction;

// 简单的使用
let sample: Direction;

sample = Direction.North; // Okay
sample = 'North'; // Okay
sample = 'AnythingElse'; // ERROR!
```



#### 5）辨析联合类型

我们将会在此书的稍后章节讲解它。



### 14. readonly

​	TypeScript 类型系统允许你在一个接口里使用 `readonly` 来标记属性。它能让你以一种更安全的方式工作（不可预期的改变是很糟糕的）：

```ts
function foo(config: { readonly bar: number, readonly bas: number }) {
  // ..
}

const config = { bar: 123, bas: 123 };
foo(config);

// 现在你能够确保 'config' 不能够被改变了
```

当然，你也可以在 `interface` 和 `type` 里使用 `readonly`：

```ts
type Foo = {
  readonly bar: number;
  readonly bas: number;
};

// 初始化
const foo: Foo = { bar: 123, bas: 456 };

// 不能被改变
foo.bar = 456; // Error: foo.bar 为仅读属性
```

​	你也能指定一个类的属性为只读，然后在声明时或者构造函数中初始化它们，如下所示：

```ts
class Foo {
  readonly bar = 1; // OK
  readonly baz: string;
  constructor() {
    this.baz = 'hello'; // OK
  }
}
```



#### 1）Readonly

这有一个 `Readonly` 的映射类型，它接收一个泛型 `T`，用来把它的所有属性标记为只读类型：

```ts
type Foo = {
  bar: number;
  bas: number;
};

type FooReadonly = Readonly<Foo>;

const foo: Foo = { bar: 123, bas: 456 };
const fooReadonly: FooReadonly = { bar: 123, bas: 456 };

foo.bar = 456; // ok
fooReadonly.bar = 456; // Error: bar 属性只读
```

#### 2）其他的使用用例

> **ReactJS**

​	`ReactJS` 是一个喜欢用不变数据的库，你可以标记你的 `Props` 和 `State` 为不可变数据：

```ts
interface Props {
  readonly foo: number;
}

interface State {
  readonly bar: number;
}

export class Something extends React.Component<Props, State> {
  someMethod() {
    // 你可以放心，没有人会像下面这么做
    this.props.foo = 123; // Error: props 是不可变的
    this.state.baz = 456; // Error: 你应该使用 this.setState()
  }
}
```

然而，你并没有必要这么做，`React` 的声明文件已经标记这些为 `readonly`（通过传入泛型参数至一个内部包装，来把每个属性标记为 `readonly`，如上例子所示），

```ts
export class Something extends React.Component<{ foo: number }, { baz: number }> {
  someMethod() {
    this.props.foo = 123; // Error: props 是不可变的
    this.state.baz = 456; // Error: 你应该使用 this.setState()
  }
}
```

> **绝对的不可变**

你甚至可以把索引签名标记为只读：

```ts
interface Foo {
  readonly [x: number]: number;
}

// 使用

const foo: Foo = { 0: 123, 2: 345 };
console.log(foo[0]); // ok（读取）
foo[0] = 456; // Error: 属性只读
```

如果你想以不变的方式使用原生 JavaScript 数组，可以使用 TypeScript 提供的 `ReadonlyArray<T>` 接口：

```ts
let foo: ReadonlyArray<number> = [1, 2, 3];
console.log(foo[0]); // ok
foo.push(4); // Error: ReadonlyArray 上不存在 `push`，因为他会改变数组
foo = foo.concat(4); // ok, 创建了一个复制
```

> **自动推断**

在一些情况下，编译器能把一些特定的属性推断为 `readonly`，例如在一个 `class` 中，如果你有一个只含有 `getter` 但是没有 `setter` 的属性，他能被推断为只读：

```ts
class Person {
  firstName: string = 'John';
  lastName: string = 'Doe';

  get fullName() {
    return this.firstName + this.lastName;
  }
}

const person = new Person();

console.log(person.fullName); // John Doe
person.fullName = 'Dear Reader'; // Error, fullName 只读
```



#### 3）与const的不同

`const`

- 用于变量；
- 变量不能重新赋值给其他任何事物。

`readonly`

- 用于属性；
- 用于别名，可以修改属性；

简单的例子 1：

```ts
const foo = 123; // 变量
let bar: {
  readonly bar: number; // 属性
};
```

简单的例子 2：

```ts
const foo: {
  readonly bar: number;
} = {
  bar: 123
};

function iMutateFoo(foo: { bar: number }) {
  foo.bar = 456;
}

iMutateFoo(foo);
console.log(foo.bar); // 456
```

​	`readonly` 能确保“我”不能修改属性，但是当你把这个属性交给其他并没有这种保证的使用者（允许出于类型兼容性的原因），他们能改变它。当然，如果 `iMutateFoo` 明确的表示，他们的参数不可修改，那么编译器会发出错误警告：

```ts
interface Foo {
  readonly bar: number;
}

let foo: Foo = {
  bar: 123
};

function iTakeFoo(foo: Foo) {
  foo.bar = 456; // Error: bar 属性只读
}

iTakeFoo(foo);
```

### 15. 泛型

设计泛型的关键目的是在成员之间提供有意义的约束，这些成员可以是：

- 类的实例成员
- 类的方法
- 函数参数
- 函数返回值

#### 1）动机和示例

​	下面是对一个先进先出的数据结构——队列，在 `TypeScript` 和 `JavaScript` 中的简单实现。

```ts
class Queue {
  private data = [];
  push = item => this.data.push(item);
  pop = () => this.data.shift();
}
```

​	在上述代码中存在一个问题，它允许你向队列中添加任何类型的数据，当然，当数据被弹出队列时，也可以是任意类型。在下面的示例中，看起来人们可以向队列中添加`string` 类型的数据，但是实际上，该用法假定的是只有 `number` 类型会被添加到队列里。

```ts
class Queue {
  private data = [];
  push = item => this.data.push(item);
  pop = () => this.data.shift();
}

const queue = new Queue();

queue.push(0);
queue.push('1'); // Oops，一个错误

// 一个使用者，走入了误区
console.log(queue.pop().toPrecision(1));
console.log(queue.pop().toPrecision(1)); // RUNTIME ERROR
```

​	一个解决的办法（事实上，这也是不支持泛型类型的唯一解决办法）是为这些约束创建特殊类，如快速创建数字类型的队列：

```ts
class QueueNumber {
  private data = [];
  push = (item: number) => this.data.push(item);
  pop = (): number => this.data.shift();
}

const queue = new QueueNumber();

queue.push(0);
queue.push('1'); // Error: 不能推入一个 `string` 类型，只能是 `number` 类型

// 如果该错误得到修复，其他将不会出现问题
```

​	当然，快速也意味着痛苦。例如当你想创建一个字符串的队列时，你将不得不再次修改相当大的代码。我们真正想要的一种方式是无论什么类型被推入队列，被推出的类型都与推入类型一样。当你使用泛型时，这会很容易：

```ts
// 创建一个泛型类
class Queue<T> {
  private data: T[] = [];
  push = (item: T) => this.data.push(item);
  pop = (): T | undefined => this.data.shift();
}

// 简单的使用
const queue = new Queue<number>();
queue.push(0);
queue.push('1'); // Error：不能推入一个 `string`，只有 number 类型被允许
```

​	另外一个我们见过的例子：一个 `reverse` 函数，现在在这个函数里提供了函数参数与函数返回值的约束：

```ts
function reverse<T>(items: T[]): T[] {
  const toreturn = [];
  for (let i = items.length - 1; i >= 0; i--) {
    toreturn.push(items[i]);
  }
  return toreturn;
}

const sample = [1, 2, 3];
let reversed = reverse(sample);

reversed[0] = '1'; // Error
reversed = ['1', '2']; // Error

reversed[0] = 1; // ok
reversed = [1, 2]; // ok
```

​	在此章节中，你已经了解在*类*和*函数*上使用泛型的例子。一个值得补充一点的是，你可以为创建的成员函数添加泛型：

```ts
class Utility {
  reverse<T>(items: T[]): T[] {
    const toreturn = [];
    for (let i = items.length; i >= 0; i--) {
      toreturn.push(items[i]);
    }
    return toreturn;
  }
}
```

:::tip

**TIP**

​	你可以随意调用泛型参数，当你使用简单的泛型时，泛型常用 `T`、`U`、`V` 表示。如果在你的参数里，不止拥有一个泛型，你应该使用一个更语义化名称，如 `TKey` 和 `TValue` （通常情况下，以 `T` 作为泛型的前缀，在其他语言如 C++ 里，也被称为模板）

:::

#### 2）误用的泛型

​	我见过开发者使用泛型仅仅是为了它的 hack。当你使用它时，你应该问问自己：你想用它来提供什么样的约束。如果你不能很好的回答它，你可能会误用泛型，如：

```ts
declare function foo<T>(arg: T): void;
```

​	在这里，泛型完全没有必要使用，因为它仅用于单个参数的位置，使用如下方式可能更好：

```ts
declare function foo(arg: any): void;
```



#### 3）设计模式方便通用

考虑如下函数：

```ts
declare function parse<T>(name: string): T;
```

​	在这种情况下，泛型 `T` 只在一个地方被使用了，它并没有在成员之间提供约束 `T`。这相当于一个如下的类型断言：

```ts
declare function parse(name: string): any;

const something = parse('something') as TypeOfSomething;
```

​	仅使用一次的泛型并不比一个类型断言来的安全。它们都给你使用 API 提供了便利。

​	另一个明显的例子是，一个用于加载 json 返回值函数，它返回你任何传入类型的 `Promise`：

```ts
const getJSON = <T>(config: { url: string; headers?: { [key: string]: string } }): Promise<T> => {
  const fetchConfig = {
    method: 'GET',
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...(config.headers || {})
  };
  return fetch(config.url, fetchConfig).then<T>(response => response.json());
};
```

​	请注意，你仍然需要明显的注解任何你需要的类型，但是 `getJSON<T>` 的签名 `config => Promise<T>` 能够减少你一些关键的步骤（你不需要注解 `loadUsers` 的返回类型，因为它能够被推出来）：

```ts
type LoadUserResponse = {
  user: {
    name: string;
    email: string;
  }[];
};

function loaderUser() {
  return getJSON<LoadUserResponse>({ url: 'https://example.com/users' });
}
```

​	与此类似：使用 `Promise<T>` 作为一个函数的返回值比一些如：`Promise<any>` 的备选方案要好很多。

#### 4）配合 axios 使用

通常情况下，我们会把后端返回数据格式单独放入一个 interface 里：

```ts
// 请求接口数据
export interface ResponseData<T = any> {
  /**
   * 状态码
   * @type { number }
   */
  code: number;

  /**
   * 数据
   * @type { T }
   */
  result: T;

  /**
   * 消息
   * @type { string }
   */
  message: string;
}
```

当我们把 API 单独抽离成单个模块时：

```ts
// 在 axios.ts 文件中对 axios 进行了处理，例如添加通用配置、拦截器等
import Ax from './axios';

import { ResponseData } from './interface.ts';

export function getUser<T>() {
  return Ax.get<ResponseData<T>>('/somepath')
    .then(res => res.data)
    .catch(err => console.error(err));
}
```

​	接着我们写入返回的数据类型 `User`，这可以让 TypeScript 顺利推断出我们想要的类型：

```ts
interface User {
  name: string;
  age: number;
}

async function test() {
  // user 被推断出为
  // {
  //  code: number,
  //  result: { name: string, age: number },
  //  message: string
  // }
  const user = await getUser<User>();
}
```



### 16. 类型推断

​	TypeScript 能根据一些简单的规则推断（检查）变量的类型，你可以通过实践，很快的了解它们。

#### 1）定义变量

变量的类型，由定义推断：

```ts
let foo = 123; // foo 是 'number'
let bar = 'hello'; // bar 是 'string'

foo = bar; // Error: 不能将 'string' 赋值给 `number`
```

这是一个从右向左流动类型的示例。

#### 2）函数返回类型

返回类型能被 `return` 语句推断，如下所示，推断函数返回为一个数字：

```ts
function add(a: number, b: number) {
  return a + b;
}
```

这是一个从底部流出类型的例子。



#### 3）赋值

​	函数参数类型/返回值也能通过赋值来推断。如下所示，`foo` 的类型是 `Adder`，他能让 `foo` 的参数 `a`、`b` 是 `number` 类型。

```ts
type Adder = (a: number, b: number) => number;
let foo: Adder = (a, b) => a + b;
```

这个事实可以用下面的代码来证明，TypeScript 会发出正如你期望发出的错误警告：

```ts
type Adder = (a: number, b: number) => number;
let foo: Adder = (a, b) => {
  a = 'hello'; // Error：不能把 'string' 类型赋值给 'number' 类型
  return a + b;
};
```

这是一个从左向右流动类型的示例。

如果你创建一个函数，并且函数参数为一个回调函数，相同的赋值规则也适用于它。从 `argument` 至 `parameter` 只是变量赋值的另一种形式。

```ts
type Adder = (a: number, b: number) => number;
function iTakeAnAdder(adder: Adder) {
  return adder(1, 2);
}

iTakeAnAdder((a, b) => {
  a = 'hello'; // Error: 不能把 'string' 类型赋值给 'number' 类型
  return a + b;
});
```

#### 4）结构化

这些简单的规则也适用于结构化的存在（对象字面量），例如在下面这种情况下 `foo` 的类型被推断为 `{ a: number, b: number }`：

```ts
const foo = {
  a: 123,
  b: 456
};

foo.a = 'hello'; // Error：不能把 'string' 类型赋值给 'number' 类型
```

数组也一样：

```ts
const bar = [1, 2, 3];
bar[0] = 'hello'; // Error：不能把 'string' 类型赋值给 'number' 类型
```



#### 5）解构

这些也适用于解构中：

```ts
const foo = {
  a: 123,
  b: 456
};
let { a } = foo;

a = 'hello'; // Error：不能把 'string' 类型赋值给 'number' 类型
```

数组中：

```ts
const bar = [1, 2];
let [a, b] = bar;

a = 'hello'; // Error：不能把 'string' 类型赋值给 'number' 类型
```

如果函数参数能够被推断出来，那么解构亦是如此。在如下例子中，函数参数能够被解构为 `a/b` 成员：

```ts
type Adder = (number: { a: number; b: number }) => number;
function iTakeAnAdder(adder: Adder) {
  return adder({ a: 1, b: 2 });
}

iTakeAnAdder(({ a, b }) => {
  // a, b 的类型能被推断出来
  a = 'hello'; // Error：不能把 'string' 类型赋值给 'number' 类型
  return a + b;
});
```

#### 6）类型保护

​	在前面章节[类型保护](https://jkchao.github.io/typescript-book-chinese/typings/typeGuard.html)中，我们已经知道它如何帮助我们改变和缩小类型范围（特别是在联合类型下）。类型保护只是一个块中变量另一种推断形式。



#### 7）警告

> **小心使用参数**

​	如果类型不能被赋值推断出来，类型也将不会流入函数参数中。例如如下的一个例子，编译器并不知道 `foo` 的类型，所它也就不能推断出 `a` 或者 `b` 的类型。

```ts
const foo = (a, b) => {
  /* do something */
};
```

​	然而，如果 `foo` 添加了类型注解，函数参数也就能被推断（`a`，`b` 都能被推断为 `number` 类型）：

```ts
type TwoNumberFunction = (a: number, b: number) => void;
const foo: TwoNumberFunction = (a, b) => {
  /* do something */
};
```



> **小心使用返回值**

​	尽管 TypeScript 一般情况下能推断函数的返回值，但是它可能并不是你想要的。例如如下的 `foo` 函数，它的返回值为 `any`：

```ts
function foo(a: number, b: number) {
  return a + addOne(b);
}

// 一些使用 JavaScript 库的特殊函数
function addOne(a) {
  return a + 1;
}
```

​	这是因为返回值的类型被一个缺少类型定义的 `addOne` 函数所影响（`a` 是 `any`，所以 `addOne` 返回值为 `any`，`foo` 的返回值是也是 `any`）。

:::tip

**TIP**

​	我发现最简单的方式是明确的写上函数返回值，毕竟这些注解是一个定理，而函数是注解的一个证据。

:::

​	这里还有一些其他可以想象的情景，但是有一个好消息是有编译器选项 `noImplicitAny` 可以捕获这些 bug。

> **`noImplicitAny`**

​	选项 `noImplicitAny` 用来告诉编译器，当无法推断一个变量时发出一个错误（或者只能推断为一个隐式的 `any` 类型），你可以：

- 通过显式添加 `:any` 的类型注解，来让它成为一个 `any` 类型；
- 通过一些更正确的类型注解来帮助 TypeScript 推断类型。



### 17. 类型兼容性

类型兼容性用于确定一个类型是否能赋值给其他类型。

如 `string` 类型与 `number` 类型不兼容：

```ts
let str: string = 'Hello';
let num: number = 123;

str = num; // Error: 'number' 不能赋值给 'string'
num = str; // Error: 'string' 不能赋值给 'number'
```

#### 1）安全性

​	TypeScript 类型系统设计比较方便，它允许你有一些不正确的行为。例如：任何类型都能被赋值给 `any`，这意味着告诉编译器你可以做任何你想做的事情：

```ts
let foo: any = 123;
foo = 'hello';

foo.toPrecision(3);
```

#### 2）结构化

​	TypeScript 对象是一种结构类型，这意味着只要结构匹配，名称也就无关紧要了：

```ts
interface Point {
  x: number;
  y: number;
}

class Point2D {
  constructor(public x: number, public y: number) {}
}

let p: Point;

// ok, 因为是结构化的类型
p = new Point2D(1, 2);
```

​	这允许你动态创建对象（就好像你在 `vanilla JS` 中使用一样），并且它如果能被推断，该对象仍然具有安全性。

```ts
interface Point2D {
  x: number;
  y: number;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

const point2D: Point2D = { x: 0, y: 10 };
const point3D: Point3D = { x: 0, y: 10, z: 20 };
function iTakePoint2D(point: Point2D) {
  /* do something */
}

iTakePoint2D(point2D); // ok, 完全匹配
iTakePoint2D(point3D); // 额外的信息，没关系
iTakePoint2D({ x: 0 }); // Error: 没有 'y'
```



#### 3）变体

​	对类型兼容性来说，变体是一个利于理解和重要的概念。

​	对一个简单类型 `Base` 和 `Child` 来说，如果 `Child` 是 `Base` 的子类，`Child` 的实例能被赋值给 `Base` 类型的变量。

:::tip

**TIP**

这是多态性。

:::

在由 `Base` 和 `Child` 组合的复杂类型的类型兼容性中，它取决于相同场景下的 `Base` 与 `Child` 的变体：

- 协变（Covariant）：只在同一个方向；
- 逆变（Contravariant）：只在相反的方向；
- 双向协变（Bivariant）：包括同一个方向和不同方向；
- 不变（Invariant）：如果类型不完全相同，则它们是不兼容的。

:::tip

**TIP**

​	对于存在完全可变数据的健全的类型系统（如 JavaScript），`Invariant` 是一个唯一的有效可选属性，但是如我们所讨论的，*便利性*迫使我们作出一些不是很安全的选择。

:::

关于协变和逆变的更多内容，请参考：[协变与逆变](https://jkchao.github.io/typescript-book-chinese/tips/covarianceAndContravariance.html)。

#### 4）函数

当你在比较两个函数时，这有一些你需要考虑的事情。

> **返回类型**

协变（Covariant）：返回类型必须包含足够的数据。

```ts
interface Point2D {
  x: number;
  y: number;
}
interface Point3D {
  x: number;
  y: number;
  z: number;
}

let iMakePoint2D = (): Point2D => ({ x: 0, y: 0 });
let iMakePoint3D = (): Point3D => ({ x: 0, y: 0, z: 0 });

iMakePoint2D = iMakePoint3D;
iMakePoint3D = iMakePoint2D; // ERROR: Point2D 不能赋值给 Point3D
```

> **参数数量**

​	更少的参数数量是好的（如：函数能够选择性的忽略一些多余的参数），但是你得保证有足够的参数被使用了：

```ts
const iTakeSomethingAndPassItAnErr = (x: (err: Error, data: any) => void) => {
  /* 做一些其他的 */
};

iTakeSomethingAndPassItAnErr(() => null); // ok
iTakeSomethingAndPassItAnErr(err => null); // ok
iTakeSomethingAndPassItAnErr((err, data) => null); // ok

// Error: 参数类型 `(err: any, data: any, more: any) => null` 不能赋值给参数类型 `(err: Error, data: any) => void`
iTakeSomethingAndPassItAnErr((err, data, more) => null);
```

> **可选的和rest参数**

​	可选的（预先确定的）和 Rest 参数（任何数量的参数）都是兼容的：

```ts
let foo = (x: number, y: number) => {};
let bar = (x?: number, y?: number) => {};
let bas = (...args: number[]) => {};

foo = bar = bas;
bas = bar = foo;
```

:::tip

**Note**

​	可选的（上例子中的 `bar`）与不可选的（上例子中的 `foo`）仅在选项为 `strictNullChecks` 为 `false` 时兼容。

:::

>  **函数参数类型**

双向协变（Bivariant）：旨在支持常见的事件处理方案。

```ts
// 事件等级
interface Event {
  timestamp: number;
}
interface MouseEvent extends Event {
  x: number;
  y: number;
}
interface KeyEvent extends Event {
  keyCode: number;
}

// 简单的事件监听
enum EventType {
  Mouse,
  Keyboard
}
function addEventListener(eventType: EventType, handler: (n: Event) => void) {
  // ...
}

// 不安全，但是有用，常见。函数参数的比较是双向协变。
addEventListener(EventType.Mouse, (e: MouseEvent) => console.log(e.x + ',' + e.y));

// 在安全情景下的一种不好方案
addEventListener(EventType.Mouse, (e: Event) => console.log((<MouseEvent>e).x + ',' + (<MouseEvent>e).y));
addEventListener(EventType.Mouse, <(e: Event) => void>((e: MouseEvent) => console.log(e.x + ',' + e.y)));

// 仍然不允许明确的错误，对完全不兼容的类型会强制检查
addEventListener(EventType.Mouse, (e: number) => console.log(e));
```

​	同样的，你也可以把 `Array<Child>` 赋值给 `Array<Base>` （协变），因为函数是兼容的。数组的协变需要所有的函数 `Array<Child>` 都能赋值给 `Array<Base>`，例如 `push(t: Child)` 能被赋值给 `push(t: Base)`，这都可以通过函数参数双向协变实现。

​	下面的代码对于其他语言的开发者来说，可能会感到很困惑，因为他们认为是有错误的，可是 Typescript 并不会报错：

```ts
interface Point2D {
  x: number;
  y: number;
}
interface Point3D {
  x: number;
  y: number;
  z: number;
}

let iTakePoint2D = (point: Point2D) => {};
let iTakePoint3D = (point: Point3D) => {};

iTakePoint3D = iTakePoint2D; // ok, 这是合理的
iTakePoint2D = iTakePoint3D; //  error 不能将类型“(point: Point3D) => void”分配给类型“(point: Point2D) => void”。
```



#### 5）枚举

- 枚举与数字类型相互兼容

```ts
enum Status {
  Ready,
  Waiting
}

let status = Status.Ready;
let num = 0;

status = num;
num = status;
```

- 来自于不同枚举的枚举变量，被认为是不兼容的：

```ts
enum Status {
  Ready,
  Waiting
}
enum Color {
  Red,
  Blue,
  Green
}

let status = Status.Ready;
let color = Color.Red;

status = color; // Error
```



#### 6）类

- 仅仅只有实例成员和方法会相比较，构造函数和静态成员不会被检查。

```ts
class Animal {
  feet: number;
  constructor(name: string, numFeet: number) {}
}

class Size {
  feet: number;
  constructor(meters: number) {}
}

let a: Animal;
let s: Size;

a = s; // OK
s = a; // OK
```

- 私有的和受保护的成员必须来自于相同的类。

```ts
class Animal {
  protected feet: number;
}

class Cat extends Animal {}

let animal: Animal;
let cat: Cat;

animal = cat; // ok
cat = animal; // ok

class Size {
  protected feet: number;
}

let size: Size;

animal = size; // ERROR
size = animal; // ERROR
```



#### 7）泛型

TypeScript 类型系统基于变量的结构，仅当类型参数在被一个成员使用时，才会影响兼容性。如下例子中，`T` 对兼容性没有影响：

```ts
interface Empty<T> {}

let x: Empty<number>;
let y: Empty<string>;

x = y; // ok
```

当 `T` 被成员使用时，它将在实例化泛型后影响兼容性：

```ts
interface Empty<T> {
  data: T;
}

let x: Empty<number>;
let y: Empty<string>;

x = y; // Error
```

如果尚未实例化泛型参数，则在检查兼容性之前将其替换为 `any`：

```ts
let identity = function<T>(x: T): T {
  // ...
};

let reverse = function<U>(y: U): U {
  // ...
};

identity = reverse; // ok, 因为 `(x: any) => any` 匹配 `(y: any) => any`
```

类中的泛型兼容性与前文所提及一致：

```ts
class List<T> {
  add(val: T) {}
}

class Animal {
  name: string;
}
class Cat extends Animal {
  meow() {
    // ..
  }
}

const animals = new List<Animal>();
animals.add(new Animal()); // ok
animals.add(new Cat()); // ok

const cats = new List<Cat>();
cats.add(new Animal()); // Error
cats.add(new Cat()); // ok
```



#### 8）脚本不变性

​	我们说过，不变性可能是唯一一个听起来合理的选项，这里有一个关于 `contra` 和 `co` 的变体，被认为对数组是不安全的。

```ts
class Animal {
  constructor(public name: string) {}
}

class Cat extends Animal {
  meow() {
    console.log('cat');
  }
}

let animal = new Animal('animal');
let cat = new Cat('cat');

// 多态
// Animal <= Cat

animal = cat; // ok
cat = animal; // ERROR: 类型 "Animal" 中缺少属性 "meow"，但类型 "Cat" 中需要该属性。

// 演示每个数组形式
let animalArr: Animal[] = [animal];
let catArr: Cat[] = [cat];

// 明显的坏处，逆变
// Animal <= Cat
// Animal[] >= Cat[]
catArr = animalArr; //  error 不能将类型“Animal[]”分配给类型“Cat[]”。
catArr[0].meow(); // 允许，但是会在运行时报错

// 另外一个坏处，协变
// Animal <= Cat
// Animal[] <= Cat[]
animalArr = catArr; // ok，协变

animalArr.push(new Animal('another animal')); // 仅仅是 push 一个 animal 至 carArr 里
catArr.forEach(c => c.meow()); // 允许，但是会在运行时报错。
```



### 18. Never

:::tip

**TIP**

[一个关于never的介绍视频](https://egghead.io/lessons/typescript-use-the-never-type-to-avoid-code-with-dead-ends-using-typescript)

:::

​	程序语言的设计确实应该存在一个底部类型的概念，当你在分析代码流的时候，这会是一个理所当然存在的类型。TypeScript 就是这样一种分析代码流的语言（😎），因此它需要一个可靠的，代表永远不会发生的类型。

`never` 类型是 TypeScript 中的底层类型。它自然被分配的一些例子：

- 一个从来不会有返回值的函数（如：如果函数内含有 `while(true) {}`）；
- 一个总是会抛出错误的函数（如：`function foo() { throw new Error('Not Implemented') }`，`foo` 的返回类型是 `never`）；

你也可以将它用做类型注解：

```ts
let foo: never; // ok
```

但是，`never` 类型仅能被赋值给另外一个 `never`：

```ts
let foo: never = 123; // Error: number 类型不能赋值给 never 类型

// ok, 作为函数返回类型的 never
let bar: never = (() => {
  throw new Error('Throw my hands in the air like I just dont care');
})();
```

很棒，现在让我们看看它的关键用例。



#### 1）用例：详细的检查

```ts
function foo(x: string | number): boolean {
  if (typeof x === 'string') {
    return true;
  } else if (typeof x === 'number') {
    return false;
  }

  // 如果不是一个 never 类型，这会报错：
  // - 不是所有条件都有返回值 （严格模式下）
  // - 或者检查到无法访问的代码
  // 但是由于 TypeScript 理解 `fail` 函数返回为 `never` 类型
  // 它可以让你调用它，因为你可能会在运行时用它来做安全或者详细的检查。
  return fail('Unexhaustive');
}

function fail(message: string): never {
  throw new Error(message);
}
```

​	`never` 仅能被赋值给另外一个 `never` 类型，因此你可以用它来进行编译时的全面的检查，我们将会在[辨析联合类型](https://jkchao.github.io/typescript-book-chinese/typings/discrominatedUnion.html)中讲解它。



#### 2）与`void`的差异

​	一旦有人告诉你，`never` 表示一个从来不会优雅的返回的函数时，你可能马上就会想到与此类似的 `void`，然而实际上，`void` 表示没有任何类型，`never` 表示永远不存在的值的类型。

​	当一个函数返回空值时，它的返回值为 void 类型，但是，当一个函数永不返回时（或者总是抛出错误），它的返回值为 never 类型。void 类型可以被赋值（在 strictNullChecking 为 false 时），但是除了 never 本身以外，其他任何类型不能赋值给 never。



### 19. 辨析联合类型

​	当类中含有[字面量成员](https://jkchao.github.io/typescript-book-chinese/typings/literals.html)时，我们可以用该类的属性来辨析联合类型。

​	作为一个例子，考虑 `Square` 和 `Rectangle` 的联合类型 `Shape`。`Square` 和 `Rectangle`有共同成员 `kind`，因此 `kind` 存在于 `Shape` 中。

```ts
interface Square {
  kind: 'square';
  size: number;
}

interface Rectangle {
  kind: 'rectangle';
  width: number;
  height: number;
}

type Shape = Square | Rectangle;
```

​	如果你使用类型保护风格的检查（`==`、`===`、`!=`、`!==`）或者使用具有判断性的属性（在这里是 `kind`），TypeScript 将会认为你会使用的对象类型一定是拥有特殊字面量的，并且它会为你自动把类型范围变小：

```ts
function area(s: Shape) {
  if (s.kind === 'square') {
    // 现在 TypeScript 知道 s 的类型是 Square
    // 所以你现在能安全使用它
    return s.size * s.size;
  } else {
    // 不是一个 square ？因此 TypeScript 将会推算出 s 一定是 Rectangle
    return s.width * s.height;
  }
}
```



#### 1）详细检查

通常，联合类型的成员有一些自己的行为（代码）：

```ts
interface Square {
  kind: 'square';
  size: number;
}

interface Rectangle {
  kind: 'rectangle';
  width: number;
  height: number;
}

// 有人仅仅是添加了 `Circle` 类型
// 我们可能希望 TypeScript 能在任何被需要的地方抛出错误
interface Circle {
  kind: 'circle';
  radius: number;
}

type Shape = Square | Rectangle | Circle;
```

一个可能会让你的代码变差的例子：

```ts
function area(s: Shape) {
  if (s.kind === 'square') {
    return s.size * s.size;
  } else if (s.kind === 'rectangle') {
    return s.width * s.height;
  }

  // 如果你能让 TypeScript 给你一个错误，这是不是很棒？
}
```

你可以通过一个简单的向下思想，来确保块中的类型被推断为与 `never` 类型兼容的类型。例如，你可以添加一个更详细的检查来捕获错误：

```ts
function area(s: Shape) {
  if (s.kind === 'square') {
    return s.size * s.size;
  } else if (s.kind === 'rectangle') {
    return s.width * s.height;
  } else {
    // Error: 'Circle' 不能被赋值给 'never'
    const _exhaustiveCheck: never = s;
  }
}
```

它将强制你添加一种新的条件：

```ts
function area(s: Shape) {
  if (s.kind === 'square') {
    return s.size * s.size;
  } else if (s.kind === 'rectangle') {
    return s.width * s.height;
  } else if (s.kind === 'circle') {
    return Math.PI * s.radius ** 2;
  } else {
    // ok
    const _exhaustiveCheck: never = s;
  }
}
```



#### 2）Switch

:::tip

**TIP**

你可以通过`Switch`来实现以上例子

:::

```ts
function area(s: Shape) {
  switch (s.kind) {
    case 'square':
      return s.size * s.size;
    case 'rectangle':
      return s.width * s.height;
    case 'circle':
      return Math.PI * s.radius ** 2;
    default:
      const _exhaustiveCheck: never = s;
  }
}
```



#### 3）strictNullChecks

​	如果你使用 `strictNullChecks` 选项来做详细的检查，你应该返回 `_exhaustiveCheck` 变量（类型是 `never`），否则 TypeScript 可能会推断返回值为 `undefined`：

```ts
function area(s: Shape) {
  switch (s.kind) {
    case 'square':
      return s.size * s.size;
    case 'rectangle':
      return s.width * s.height;
    case 'circle':
      return Math.PI * s.radius ** 2;
    default:
      const _exhaustiveCheck: never = s;
      return _exhaustiveCheck;
  }
}
```



#### 4）Redux

Redux 库正是使用的上述例子。

以下是添加了 TypeScript 类型注解的[redux 要点](https://github.com/reduxjs/redux#the-gist)。

```ts
import { createStore } from 'redux';

type Action =
  | {
      type: 'INCREMENT';
    }
  | {
      type: 'DECREMENT';
    };

/**
 * This is a reducer, a pure function with (state, action) => state signature.
 * It describes how an action transforms the state into the next state.
 *
 * The shape of the state is up to you: it can be a primitive, an array, an object,
 * or even an Immutable.js data structure. The only important part is that you should
 * not mutate the state object, but return a new object if the state changes.
 *
 * In this example, we use a `switch` statement and strings, but you can use a helper that
 * follows a different convention (such as function maps) if it makes sense for your
 * project.
 */
function counter(state = 0, action: Action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
let store = createStore(counter);

// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// However it can also be handy to persist the current state in the localStorage.

store.subscribe(() => console.log(store.getState()));

// The only way to mutate the internal state is to dispatch an action.
// The actions can be serialized, logged or stored and later replayed.
store.dispatch({ type: 'INCREMENT' });
// 1
store.dispatch({ type: 'INCREMENT' });
// 2
store.dispatch({ type: 'DECREMENT' });
// 1
```

​	与 TypeScript 一起使用可以有效的防止拼写错误，并且能提高重构和书写文档化代码的能力。



### 20. 索引签名

可以用字符串访问 JavaScript 中的对象（TypeScript 中也一样），用来保存对其他对象的引用。

例如：

```ts
let foo: any = {};
foo['Hello'] = 'World';
console.log(foo['Hello']); // World
```

我们在键 `Hello` 下保存了一个字符串 `World`，除字符串外，它也可以保存任意的 JavaScript 对象，例如一个类的实例。

```ts
class Foo {
  constructor(public message: string) {}
  log() {
    console.log(this.message);
  }
}

let foo: any = {};
foo['Hello'] = new Foo('World');
foo['Hello'].log(); // World
```

当你传入一个其他对象至索引签名时，JavaScript 会在得到结果之前会先调用 `.toString` 方法：

```ts
let obj = {
    toString() {
        console.log('toString called');
        return 'Hello';
    }
};

let foo = {};
foo[obj] = 'World'; // toString called
console.log(foo[obj]); //toString called World
```

:::tip

只要索引位置使用了 `obj`，`toString` 方法都将会被调用。

:::

​	数组有点稍微不同，对于一个 `number` 类型的索引签名，JavaScript 引擎将会尝试去优化（这取决于它是否是一个真的数组、存储的项目结构是否匹配等）。因此，`number` 应该被考虑作为一个有效的对象访问器（这与 `string` 不同），如下例子：

```ts
let foo = ['World'];
console.log(foo[0]); // World
```

​	因此，这就是 JavaScript。现在让我们看看 TypeScript 对这些概念更优雅的处理。



#### 1）TypeScript索引签名

​	JavaScript 在一个对象类型的索引签名上会隐式调用 `toString` 方法，而在 TypeScript 中，无法直接用obj类型作为索引，并不会调用对象的`toString`方法。

```ts
const obj = {
  toString() {
    return 'Hello';
  }
};

const foo: any = {};

// ERROR: 类型“{ toString(): string; }”不能作为索引类型使用。
foo[obj] = 'World';

// FIX: TypeScript 强制你必须明确这么做：
foo[obj.toString()] = 'World';
```

​	强制用户必须明确的写出 `toString()` 的原因是：在对象上默认执行的 `toString` 方法是有害的。例如 v8 引擎上总是会返回 `[object Object]`

```js
const obj = { message: 'Hello' };
let foo = {};

// ERROR: 索引签名必须为 string, number....
foo[obj] = 'World';
console.log(foo); // { '[object Object]': 'World' }

// 这里实际上就是你存储的地方
console.log(foo['[object Object]']); // World
```

当然，数字类型是被允许的，这是因为：

- 需要对数组 / 元组完美的支持；
- 即使你在上例中使用 `number` 类型的值来替代 `obj`，`number` 类型默认的 `toString` 方法实现的很友好（不是 `[object Object]`）。

如下所示：

```ts
console.log((1).toString()); // 1
console.log((2).toString()); // 2
```

因此，我们有以下结论：

:::tip

**TIP**

TypeScript 的索引签名必须是 `string` 或者 `number`。

`symbols` 也是有效的，TypeScript 支持它。在接下来我们将会讲解它。

:::

#### 2）声明一个索引签名

​	在上文中，我们通过使用 `any` 来让 TypeScript 允许我们可以做任意我们想做的事情。实际上，我们可以明确的指定索引签名。例如：假设你想确认存储在对象中任何内容都符合 `{ message: string }` 的结构，你可以通过 `[index: string]: { message: string }` 来实现。

```ts
const foo: {
  [index: string]: { message: string };
} = {};

// 储存的东西必须符合结构
// ok
foo['a'] = { message: 'some message' };

// Error, 必须包含 `message`
foo['a'] = { messages: 'some message' };

// 读取时，也会有类型检查
// ok
foo['a'].message;

// Error: messages 不存在
foo['a'].messages;
```

:::tip

**TIP**

​	索引签名的名称（如：`{ [index: string]: { message: string } }` 里的 `index` ）除了可读性外，并没有任何意义。例如：如果有一个用户名，你可以使用 `{ username: string}: { message: string }`，这有利于下一个开发者理解你的代码。

:::

`number` 类型的索引也支持：`{ [count: number]: 'SomeOtherTypeYouWantToStoreEgRebate' }`。



#### 3）所有成员都必须符合字符串的索引签名

当你声明一个索引签名时，所有明确的成员都必须符合索引签名：

```ts
// ok
interface Foo {
  [key: string]: number;
  x: number;
  y: number;
}

// Error
interface Bar {
  [key: string]: number;
  x: number;
  y: string; // Error: y 属性必须为 number 类型
}
```

这可以给你提供安全性，任何以字符串的访问都能得到相同结果。

```ts
interface Foo {
  [key: string]: number;
  x: number;
}

let foo: Foo = {
  x: 1,
  y: 2
};

// 直接
foo['x']; // number

// 间接
const x = 'x';
foo[x]; // number
```



#### 4）使用一组有限的字符串字面量

​	一个索引签名可以通过映射类型来使索引字符串为联合类型中的一员，如下所示：

```ts
type Index = 'a' | 'b' | 'c';
type FromIndex = { [k in Index]?: number };

const good: FromIndex = { b: 1, c: 2 };

// Error:
// 不能将类型“{ b: number; c: number; d: number; }”分配给类型“FromIndex”。
// 对象文字可以只指定已知属性，并且“d”不在类型“FromIndex”中。
const bad: FromIndex = { b: 1, c: 2, d: 3 };
```

​	这通常与 `keyof/typeof` 一起使用，来获取变量的类型，在下一章节中，我们将解释它。

变量的规则一般可以延迟被推断：

```ts
type FromSomeIndex<K extends string> = { [key in K]: number };
```



#### 5）同时拥有`string`和`number`类型的索引签名

这并不是一个常见的用例，但是 TypeScript 支持它。

`string` 类型的索引签名比 `number` 类型的索引签名更严格。这是故意设计，它允许你有如下类型：

```ts
interface ArrStr {
  [key: string]: string | number; // 必须包括所用成员类型
  [index: number]: string; // 字符串索引类型的子级

  // example
  length: number;
}
```



#### 6）设计模式：索引签名的嵌套

:::tip

**TIP**

添加索引签名时，需要考虑的 API。

:::

​	在 JavaScript 社区你将会见到很多滥用索引签名的 API。如 JavaScript 库中使用 CSS 的常见模式：

```ts
interface NestedCSS {
  color?: string; // strictNullChecks=false 时索引签名可为 undefined
  [selector: string]: string | NestedCSS;
}

const example: NestedCSS = {
  color: 'red',
  '.subclass': {
    color: 'blue'
  }
};
```

​	尽量不要使用这种把字符串索引签名与有效变量混合使用。如果属性名称中有拼写错误，这个错误不会被捕获到：

```ts
const failsSilently: NestedCSS = {
  colour: 'red' // 'colour' 不会被捕捉到错误
};
```

取而代之，我们把索引签名分离到自己的属性里，如命名为 `nest`（或者 `children`、`subnodes` 等）：

```ts
interface NestedCSS {
    color?: string;
    nest?: {
        [selector: string]: NestedCSS;
    };
}

const example: NestedCSS = {
    color: 'red',
    nest: {
        '.subclass': {
            color: 'blue'
        }
    }
}

const failsSliently: NestedCSS = {
    colour: 'red'  // TS Error: 不能将类型“{ colour: string; }”分配给类型“NestedCSS”。
                    // 对象文字只能指定已知的属性，但“colour”中不存在类型“NestedCSS”。
}
```



#### 7）索引签名中排除某些属性

​	有时，你需要把属性合并至索引签名（虽然我们并不建议这么做，你应该使用上文中提到的嵌套索引签名的形式），如下例子：

```ts
type FieldState = {
    value: string;
};

type FromState = {
    isValid: boolean; // Error: 类型“boolean”的属性“isValid”不能赋给“string”索引类型“FieldState”。
    [filedName: string]: FieldState;
};
```

TypeScript 会报错，因为添加的索引签名，并不兼容它原有的类型，使用交叉类型可以解决上述问题：

```ts
type FieldState = {
  value: string;
};

type FormState = { isValid: boolean } & { [fieldName: string]: FieldState };
```

请注意尽管你可以声明它至一个已存在的 TypeScript 类型上，但是你不能创建如下的对象：

```ts
type FieldState = {
  value: string;
};

type FormState = { isValid: boolean } & { [fieldName: string]: FieldState };

// 将它用于从某些地方获取的 JavaScript 对象
declare const foo: FormState;

const isValidBool = foo.isValid;
const somethingFieldState = foo['something'];
type FieldState = {
    value: string;
};

type FormState = { isValid: boolean } & { [fieldName: string]: FieldState };

// 将它用于从某些地方获取的 JavaScript 对象
declare const foo: FormState;

const isValidBool = foo.isValid;
const somethingFieldState = foo['something'];

// 使用它来创建一个对象时，将不会工作
const bar: FormState = {
    // 'isValid' 不能赋值给 'FieldState'
    isValid: false
};
// 使用它来创建一个对象时，将不会工作
const bar: FormState = {
  // 'isValid' 不能赋值给 'FieldState'
  isValid: false
};
```

### 21. 流动的类型

**关键动机**： 当改变其中一个时，其他相关会自动更新，并且当事情变糟糕时，会得到一个友好提示。

#### 1）复制类型和值

> 错误写法

​	复制类型时无法直接进行赋值操作。因为`const`仅仅赋值了`Foo`到一个变量空间，所以无法把`Bar`当作一个类型声明使用。

```ts
class Foo { }
const Bar = Foo;
let bar: Bar; // Error: “Bar”表示值，但在此处用作类型
```

> 正确写法

通过使用`import`关键字

```ts
namespace importing {
    export class Foo { }
}

import Bar = importing.Foo;
let bar: Bar; // ok
```



#### 2）捕获变量的类型

通过`typeof`捕获变量类型，可以在类型注解中使用变量。

```ts
let foo = 123;
let bar: typeof foo; // 'bar' 类型与 'foo' 类型相同（在这里是： 'number'）

bar = 456; // ok
bar = '789'; // Error: 不能将类型“string”分配给类型“number”。
```



#### 3）捕获类成员的类型

通过先声明变量然后通过`typeof`捕获类成员的类型：

```ts
class Foo {
    foo: number; // 我们想要捕获的类型
}

declare let _foo: Foo;

// 与之前做法相同
let bar: typeof _foo.foo;
```



#### 4）捕获字符串类型

通过`const`定义变量，通过`typeof`捕获其类型

```ts
// 捕获字符串的类型与值
const foo = 'Hello World';

// 使用一个捕获的类型
let bar: typeof foo;

// bar 仅能被赋值 'Hello World'
bar = 'Hello World'; // ok
bar = 'anything else'; // Error 不能将类型“"anything else"”分配给类型“"Hello World"”
```



#### 5）捕获键的名称

通过`keyof`捕获一个类型的键，通过`typeof`捕获键的类型：

```ts
const colors = {
    red: 'red',
    blue: 'blue'
  };
  
  type Colors = keyof typeof colors;
  
  let color: Colors; // color 的类型是 'red' | 'blue'
  color = 'red'; // ok
  color = 'blue'; // ok
  color = 'anythingElse'; // Error 不能将类型“"anythingElse"”分配给类型“"red" | "blue"”
```



### 22. 异常处理

​	JS有一个`Error`的类，用于处理异常。可以通过`throw`关键字来抛出错误。然后通过`try/catch`块来捕获错误。

```js
try {
    throw new Error('Something bad happened');
} catch (e) {
    console.log(e); // Something bad happened
}
```

#### 1）错误子类型

除了内置的`Error`类外，还有一些额外的内置错误，都继承于`Error`类；

> **RangeError**: 数字类型变量或者参数超出其有效范围报错

```ts
// 使用过多参数调用 console
console.log.apply(console, new Array(1000000000)); // RangeError: 数组长度无效
```

![image-20220426202632775](https://cdn.jsdelivr.net/gh/option-star/imgs/202204262026989.png)



> **ReferenceError**: 引用无效报错

```ts
'use strict';
console.log(notValidVar); // ReferenceError: notValidVar 未定义
```

![image-20220426202814697](https://cdn.jsdelivr.net/gh/option-star/imgs/202204262028801.png)



> **SyntaxError**: 解析无效JavaScript代码

```ts
1 *** 3   // SyntaxError: 无效的标记 *
```

![image-20220426202931280](https://cdn.jsdelivr.net/gh/option-star/imgs/202204262029381.png)

> **URLError**: 传入无效参数至`encodeURL`和`decodeURL()`

```ts
decodeURI('%'); // URIError: URL 异常
```

![image-20220426203216990](https://cdn.jsdelivr.net/gh/option-star/imgs/202204262032099.png)



#### 2）使用Error

> 错误示范

​	仅仅抛出一个原始字符串，这样会导致极差的调试体验，并且在分析日志时，变得错综复杂

```ts
try {
    throw 'Something bad happened';
} catch (e) {
    console.log(e); // Something bad happened
}
```

> 正确示范

通过`Error`对象，能自动跟踪堆栈的属性构建以及生成位置

```ts
try {
    throw new Error('Something bad happened');
} catch (e) {
    console.log(e); 
}
```

![image-20220426204722070](https://cdn.jsdelivr.net/gh/option-star/imgs/202204262047179.png)



#### 3）你并不需要throw抛出一个错误

​	`Error`对象作为传递的参数。用第一个参数作为错误对象进行回调处理。

```ts
function myFunction (callback: (e: Error)) {
  doSomethingAsync(function () {
    if (somethingWrong) {
      callback(new Error('This is my error'));
    } else {
      callback();
    }
  })
}
```





#### 4）示例

> **不清除从哪里抛出错误**

```ts
try {
  const foo = runTask1();
  const bar = runTask2();
} catch (e) {
  console.log('Error:', e);
}
```



> **优雅地捕获错误**

```ts
let foo: number; // Notice 使用 let 并且显式注明类型注解

try {
  foo = runTask1();
} catch (e) {
  console.log('Error:', e);
}

try {
  const bar = runTask2(foo);
} catch (e) {
  console.log('Error:', e);
}
```



> **没有在类型系统中很好地表示**

```ts
function validate(
  value: number
): {
  error?: string;
} {
  if (value < 0 || value > 100) {
    return { error: 'Invalid value' };
  }
}
```



:::tip

**TIP**

除非你想用以非常通用（try/catch）的方式处理错误，否则不要抛出错误。

:::



### 23. 混合

:::tip

**混合**是一个函数：

- 传入一个构造函数
- 创建一个带新功能，并且扩展构造函数的新类
- 返回这个新类。

:::

```ts
// 所有 mixins 都需要
type Constructor<T = {}> = new (...args: any[]) => T;

/////////////
// mixins 例子
////////////

// 添加属性的混合例子
function TimesTamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    timestamp = Date.now();
  };
}

// 添加属性和方法的混合例子
function Activatable<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    isActivated = false;

    activate() {
      this.isActivated = true;
    }

    deactivate() {
      this.isActivated = false;
    }
  };
}

///////////
// 组合类
///////////

// 简单的类
class User {
  name = '';
}

// 添加 TimesTamped 的 User
const TimestampedUser = TimesTamped(User);

// Tina TimesTamped 和 Activatable 的类
const TimestampedActivatableUser = TimesTamped(Activatable(User));

//////////
// 使用组合类
//////////

const timestampedUserExample = new TimestampedUser();
console.log(timestampedUserExample.timestamp);

const timestampedActivatableUserExample = new TimestampedActivatableUser();
console.log(timestampedActivatableUserExample.timestamp);
console.log(timestampedActivatableUserExample.isActivated);
```

#### 1）创建一个构造函数

混合一个类，并且使用新功能扩展它。

定义构造函数的类型：

```ts
type Constructor<T = {}> = new (...args: any[]) => T;
```



#### 2）扩展一个类并且返回它

```ts
// 添加属性的混合例子
function TimesTamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    timestamp = Date.now();
  };
}
```



### 24. ThisType

通过 `ThisType` 我们可以在对象字面量中键入 `this`，并提供通过上下文类型控制 `this` 类型的便捷方式。它只有在 `--noImplicitThis` 的选项下才有效。

现在，在对象字面量方法中的 `this` 类型，将由以下决定：

- 如果这个方法显式指定了 `this` 参数，那么 `this` 具有该参数的类型。（下例子中 `bar`）
- 否则，如果方法由带 `this` 参数的签名进行上下文键入，那么 `this` 具有该参数的类型。（下例子中 `foo`）
- 否则，如果 `--noImplicitThis` 选项已经启用，并且对象字面量中包含由 `ThisType<T>` 键入的上下文类型，那么 `this` 的类型为 `T`。
- 否则，如果 `--noImplicitThis` 选项已经启用，并且对象字面量中不包含由 `ThisType<T>` 键入的上下文类型，那么 `this` 的类型为该上下文类型。
- 否则，如果 `--noImplicitThis` 选项已经启用，`this` 具有该对象字面量的类型。
- 否则，`this` 的类型为 `any`。

一些例子：

> 举例

```ts
// Compile with --noImplicitThis

type Point = {
  x: number;
  y: number;
  moveBy(dx: number, dy: number): void;
};

let p: Point = {
  x: 10,
  y: 20,
  moveBy(dx, dy) {
    this.x += dx; // this has type Point
    this.y += dy; // this has type Point
  }
};

let foo = {
  x: 'hello',
  f(n: number) {
    this; // { x: string, f(n: number): void }
  }
};

let bar = {
  x: 'hello',
  f(this: { message: string }) {
    this; // { message: string }
  }
};
```

类似的方式，当使用 `--noImplicitThis` 时，函数表达式赋值给 `obj.xxx` 或者 `obj[xxx]` 的目标时，在函数中 `this` 的类型将会是 `obj`：

```ts
// Compile with --noImplicitThis

obj.f = function(n) {
  return this.x - n; // 'this' has same type as 'obj'
};

obj['f'] = function(n) {
  return this.x - n; // 'this' has same type as 'obj'
};
```

通过 API 转换参数的形式来生成 `this` 的值的情景下，可以通过创建一个新的 `ThisType<T>` 标记接口，可用于在上下文中表明转换后的类型。尤其是当字面量中的上下文类型为 `ThisType<T>` 或者是包含 `ThisType<T>` 的交集时，显得尤为有效，对象字面量方法中 `this` 的类型即为 `T`。

```ts
// Compile with --noImplicitThis

type ObjectDescriptor<D, M> = {
  data?: D;
  methods?: M & ThisType<D & M>; // Type of 'this' in methods is D & M
};

function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
  let data: object = desc.data || {};
  let methods: object = desc.methods || {};
  return { ...data, ...methods } as D & M;
}

let obj = makeObject({
  data: { x: 0, y: 0 },
  methods: {
    moveBy(dx: number, dy: number) {
      this.x += dx; // Strongly typed this
      this.y += dy; // Strongly typed this
    }
  }
});

obj.x = 10;
obj.y = 20;
obj.moveBy(5, 5);
```

在上面的例子中，`makeObject` 参数中的对象属性 `methods` 具有包含 `ThisType<D & M>` 的上下文类型，因此对象中 `methods` 属性下的方法的 `this` 类型为 `{ x: number, y: number } & { moveBy(dx: number, dy: number): number }`。

`ThisType<T>` 的接口，在 `lib.d.ts` 只是被声明为空的接口，除了可以在对象字面量上下文中可以被识别以外，该接口的作用等同于任意空接口。



## 三、JSX

### 1. 支持JSX

TypeScript支持JSX转换和代码分析。

> JSX的作用

- 使用相同代码，既能检查你的JS, 同时检查你的HTML视图层部分
- 让视图层了解运行 时的上下文
- 复用JS设计模式维护HTML部分，代替创建新的可替代品

这能够减少错误的可能性，并且增强用户界面的可维护性。



### 2. React JSX

#### 1）建立

- 使用文件后缀 `.tsx`（替代 `.ts`）；
- 在你的 `tsconfig.json` 配置文件的 `compilerOptions` 里设置选项 `"jsx": "react"`；
- 在你的项目里为 `JSX` 和 `React` 安装声明文件：`npm i -D @types/react @types/react-dom`；
- 导入 `react` 到你的 `.tsx` 文件（`import * as React from 'react'`）。



#### 2）HTML标签 vs 组件

​	渲染HTML标签与组件，源码层面区别在于`React.createElement('div')` vs `React.createElement(MyComponent)`. 采用哪种方式解析取决于首字母大小写。



#### 3）类型检查

> **HTML标签**

`react-jsx.d.ts`中定义了所有主要标签的类型。

```ts
declare namespace JSX {
  interface IntrinsicElements {
    a: React.HTMLAttributes;
    abbr: React.HTMLAttributes;
    div: React.HTMLAttributes;
    span: React.HTMLAttributes;

    // 其他
  }
}
```

> **函数式组件**

`React.FunctionComponent`接口定义函数组件。

```ts
type Props = {
  foo: string;
};

const MyComponent: React.FunctionComponent<Props> = props => {
  return <span>{props.foo}</span>;
};

<MyComponent foo="bar" />;
```

> **类组件**

​	根据组件的`props`属性对组件进行类型检查。`react.d.ts`定义了`React.Component<Props, State>`, 可通过`Props`和`State`声明扩展。

```ts
type Props = {
  foo: string;
};

class MyComponent extends React.Component<Props, {}> {
  render() {
    return <span>{this.props.foo}</span>;
  }
}

<MyComponent foo="bar" />;
```



> **接受组件的实例**

`React.ReactElement<T>` : 通过传入`<T/>`, 来注解类组件的实例化结果。

```ts
class MyAwesomeComponent extends React.Component {
  render() {
    return <div>Hello</div>;
  }
}

const foo: React.ReactElement<MyAwesomeComponent> = <MyAwesomeComponent />; // Okay
const bar: React.ReactElement<MyAwesomeComponent> = <NotMyAwesomeComponent />; // Error!
```



> **接受一个可以在Props起作用，并使用JSX渲染的组件**

`React.Component<Props>` : 可以接受用作Props类型和使用JSX渲染的组件。

```ts
const X: React.Component<Props> = foo; // from somewhere

// Render X with some props:
<X {...props} />;
```

> **可渲染的接口**

`React.ReactNode` : 接受可渲染的内容

```ts
type Props = {
  header: React.ReactNode;
  body: React.ReactNode;
};

class MyComponent extends React.Component<Props, {}> {
  render() {
    return (
      <div>
        {this.props.header}
        {this.props.body}
      </div>
    );
  }
}

<MyComponent header={<h1>Header</h1>} body={<i>body</i>} />
```



> **泛型组件**

```ts
// 一个泛型组件
type SelectProps<T> = { items: T[] };
class Select<T> extends React.Component<SelectProps<T>, any> {}

// 使用
const Form = () => <Select<string> items={['a', 'b']} />;
```



> **泛型函数**

```ts
function foo<T>(x: T): T {
  return x;
}
```

**问题**： 不能使用箭头泛型函数

```ts
const foo = <T>(x: T) => T; // Error: T 标签没有关闭
```

**解决方法**： 泛型参数使用`extends`

```ts
const foo = <T extends {}>(x: T) => x;
```



> **强类型的Refs**

```ts
class Example extends React.Component {
  example() {
    // ... something
  }

  render() {
    return <div>Foo</div>;
  }
}

class Use {
  exampleRef: Example | null = null;

  render() {
    return <Example ref={exampleRef => (this.exampleRef = exampleRef)} />;
  }
}
```



#### 4）默认Props

```ts
class Hello extends React.Component<{
  /**
   * @default 'TypeScript'
   */
  compiler?: string;
  framework: string;
}> {
  static defaultProps = {
    compiler: 'TypeScript'
  };
  render() {
    const compiler = this.props.compiler!;
    return (
      <div>
        <div>{compiler}</div>
        <div>{this.props.framework}</div>
      </div>
    );
  }
}

ReactDOM.render(
  <Hello framework="React" />, // TypeScript React
  document.getElementById('root')
);
```



## 四、TypeScript错误提示

### 1. 捕获不能有类型注解的简短变量

例子：

```ts
try {
  something();
} catch (e) {
  // 捕获不能有类型注解的简短变量
  // ...
}
```

TypeScript 正在保护你免受 JavaScript 代码的侵害，取而代之，使用类型保护：

```ts
try {
  something();
} catch (e) {
  // 捕获不能有类型注解的简短变量
  if (e instanceof Error) {
    // do...
  }
}
```

### 2. 接口`ElementClass` 不能同时扩展类型别名 `Component` 和 `Component`

当在编译上下文中同时含有两个 `react.d.ts`（`@types/react/index.d.ts`）会发生这种情况。

修复：

- 删除 `node_modules` 和任何 `package-lock`（或者 `yarn lock`），然后再一次 `npm install`；
- 如果这不能工作，查找无效的模块（你所使用的所用用到了 `react.d.ts` 模块应该作为 `peerDependency` 而不是作为 `dependency` 使用）并且把这个报告给相关模块。



## 五、TIPs

### 1. 基于字符串的枚举

​	在公共的键下收集一些字符串的集合，可以通过字符串字面量类型与联合类型组合使用创建基于字符串枚举类型的方式。

### 2. 名义化类型

> **概念**

**名义化类型**：尽管变量具有相同的结构，也需要把它们视为不同的类型

#### 1) 使用字面量类型

> **实现**

```ts
// 泛型 Id 类型
type Id<T extends string> = {
  type: T;
  value: string;
};

// 特殊的 Id 类型
type FooId = Id<'foo'>;
type BarId = Id<'bar'>;

// 可选：构造函数
const createFoo = (value: string): FooId => ({ type: 'foo', value });
const createBar = (value: string): BarId => ({ type: 'bar', value });

let foo = createFoo('sample');
let bar = createBar('sample');
console.log(foo, bar);

foo = bar; // Error 不能将类型“"bar"”分配给类型“"foo"”
foo = foo; // Okey
```

> **优点**

- 不需要类型断言

> **缺点**

- 需要服务器序列化支持



#### 2) 使用枚举

> **枚举性质**

​	如果两个枚举命名不同，则类型不同



> **示例**

```ts
// FOO
enum FooIdBrand {
  _ = ''
}
type FooId = FooIdBrand & string;

// BAR
enum BarIdBrand {
  _ = ''
}
type BarId = BarIdBrand & string;

// user

let fooId: FooId;
let barId: BarId;

// 类型安全
fooId = barId; // error 不能将类型“BarIdBrand”分配给类型“FooIdBrand”。
barId = fooId; // error 不能将类型“FooIdBrand”分配给类型“BarIdBrand”。

// 创建一个新的
fooId = 'foo' as FooId;
barId = 'bar' as BarId;

// 两种类型都与基础兼容
let str: string;
str = fooId;
str = barId;
```



> **注意**

```ts
{ _ = '' }
```

​	其作用强制推断出这是基于字符串的枚举，而不是一个数字类型的枚举。否则直接`{}`默认为数字类型枚举



#### 3) 使用接口

> **实现思路**

- 在类型上添加一个不用的属性，用来打破类型的兼容性。
- 在新建或向下转换类型的时候使用断言。

**注意**： 不用属性的命名： 使用`_`前缀和`Brand`后缀

> **示例**

```ts
// FOO
interface FooId extends String {
  _fooIdBrand: string; // 防止类型错误
}

// BAR
interface BarId extends String {
  _barIdBrand: string; // 防止类型错误
}

// 使用
let fooId: FooId;
let barId: BarId;

// 类型安全
fooId = barId; // error 类型 "BarId" 中缺少属性 "_fooIdBrand"，但类型 "FooId" 中需要该属性。
barId = fooId; // error 类型 "FooId" 中缺少属性 "_barIdBrand"，但类型 "BarId" 中需要该属性。
fooId = <FooId>barId; // error 类型 "BarId" 中缺少属性 "_fooIdBrand"，但类型 "FooId" 中需要该属性。
barId = <BarId>fooId; // error 类型 "FooId" 中缺少属性 "_barIdBrand"，但类型 "BarId" 中需要该属性。
 
// 创建新的
fooId = 'foo' as any;
barId = 'bar' as any;

// 如果你需要以字符串作为基础
var str: string;
str = fooId as any;
str = barId as any;
```



### 3. 状态函数

**状态函数**: 其他语言，通过使用`static`关键字来增加函数变量的生命周期，使其超出函数的调用范围。而JS中，可通过使用包裹着本地变量的抽象变量来实现。

> C语言实现

```c
void called () {
    static count = 0;
    count++;
    printf("Called : %d", count);
}

int main () {
    called(); // Called : 1
    called(); // Called : 2
    return 0;
}
```

> JS实现

```ts
const { called } = new class {
  count = 0;
  called = () => {
    this.count++;
    console.log(`Called : ${this.count}`);
  };
}();

called(); // Called : 1
called(); // Called : 2
```



### 4. Bind是有害的

> **原因**

在`lib.d.ts`中`bind`的定义：

```ts
bind(thisArg: any, ...argArray: any[]): any
```

​	由于`bind`的返回值是`any`，回导致在原始函数调用签名上将会完全失去类型的安全检查。

> **示例**

```ts
function twoParams(a: number, b: number) {
  return a + b;
}

let curryOne = twoParams.bind(null, 123);
curryOne(456); // ok
curryOne('456'); // ok
```

​	如上所示，失去了类型的安全检查。



> **解决** ： 使用类型注解的箭头函数

```ts
function twoParams(a: number, b: number) {
  return a + b;
}

let curryOne = (x: number) => twoParams(123, x);
curryOne(456); // ok
curryOne('456'); // Error
```



> **类成员的应用**

```ts
// 错误示范
class Adder {
  constructor(public a: string) {}

  add(b: string): string {
    return this.a + b;
  }
}

function useAdd(add: (x: number) => number) {
  return add(456);
}

let adder = new Adder('mary had a little 🐑');
useAdd(adder.add.bind(adder)); // 没有编译的错误
useAdd(x => adder.add(x)); // Error: number 不能分配给 string
```

```ts
// 解决方法1
class Adder {
  constructor(public a: string) {}

  // 此时，这个函数可以安全传递
  add = (b: string): string => {
    return this.a + b;
  };
}
```

```ts
// 解决方法2 ： 通过手动指定要绑定的变量的类型
const add: typeof adder.add = adder.add.bind(adder);
```

### 5. 柯里化

使用一系列的箭头函数：

```ts
// 一个柯里化函数
let add = (x: number) => (y: number) => x + y;

// 简单使用
add(123)(456);

// 部分应用
let add123 = add(123);

// fully apply the function
add123(456);
```



### 6. 泛型的示例化类型

**目标**： 想要一个类： `Foo<number>`

```ts
class Foo<T> {
  foo: T;
}
```



#### 1) 具体类型替代泛型

通过拷贝到新变量里，并且用具体类型代替泛型的类型注解。

```ts
class Foo<T> {
  foo: T;
}

const FooNumber = Foo as { new (): Foo<number> }; // ref 1
```



#### 2) 继承

```ts
class FooNumber extends Foo<number> {}
```

:::warning

​	如果基类上使用修饰器，继承类可能没有与基类相同的行为（不再被修饰器包裹）

:::



#### 4) 断言模式

通过该方式，并不会产生一个单独的类

```ts
function id<T>(x: T) {
  return x;
}

const idNum = id as { (x: number): number };
```



### 7. 对象字面量的惰性初始化

> **问题**：

```ts
let foo = {};
foo.bar = 123; // Error: Property 'bar' does not exist on type '{}'
foo.bas = 'Hello World'; // Error: Property 'bas' does not exist on type '{}'
```

> **原因**：

​	在TypeScript中，在解析`let foo = {}`这段赋值语句时，会进行“类型推断”：它会认为等号左边`foo`的类型即为等号右边`{}`的类型。由于`{}`本没有任何属性，所以会报错。

> **最好解决方案**： 在赋值的同时，添加属性及其对应的值

```ts
let foo = {
  bar: 123,
  bas: 'Hello World'
};
```



> **快速解决方案**: 类型断言

```ts
let foo = {} as any;
foo.bar = 123;
foo.bas = 'Hello World';
```



> **折中解决方案** : 创建`interface`，可确保类型安全

```ts
interface Foo {
  bar: number;
  bas: string;
}

let foo = {} as Foo;
foo.bar = 123;
foo.bas = 'Hello World';

// 然后我们尝试这样做：
foo.bar = 'Hello Stranger'; // 错误：你可能把 `bas` 写成了 `bar`，不能为数字类型的属性赋值字符串
```

### 8. 类是有用的

> **错误示范**：

```ts
let someProperty;

function foo() {
  // 一些初始化代码
}

foo();
someProperty = 123; // 其他初始化代码

// 一些其它未导出

// later
export function someMethod() {}
```

> **通过类来组织代码**

```ts
class Foo {
  public someProperty;

  constructor() {
    // 一些初始化内容
  }

  public someMethod() {
    // ..code
  }

  public someUtility() {
    // .. code
  }
}

export = new Foo();
```



### 9. `export default`被认为是有害的

> **不推荐写法**

```ts
// foo.ts
class Foo {}
export default Foo;
```

```ts
// bar.ts
import Foo from './foo';
```

> **推荐写法**

```ts
// foo.ts
export class Foo {}
```

```ts
// bar.ts
import { Foo } from './Foo';
```



> **原因**：

#### 1) 可发现性差

​	默认导出的可发现性非常差，你不能智能的辨别一个模块它是否有默认导出。



#### 2) 自动完成

​	可通过在`import { /* here */ } from './foo'`的`here`位置获取模块的信息。



#### 3) CommonJS互用

​	对于必须使用 `const { default } = require('module/foo')` 而不是 `const { Foo } = require('module/foo')` 的 CommonJS 的用户来说，这会是一个糟糕的体验。当你导入一个模块时，你很可能想重命名 `default` 作为导入的名字。



#### 4) 防止拼写错误

​	当你在开发时使用 `import Foo from './foo'` 时，并不会得到有关于拼写的任何错误，其他人可能会这么写 `import foo from './foo'`；



#### 5) 动态导入

在动态的 `import` 中，默认导出会以 `default` 的名字暴露自己，如：

```ts
const HighChart = await import('https://code.highcharts.com/js/es-modules/masters/highcharts.src.js');
HighChart.default.chart('container', { ... }); // Notice `.default`
```



#### 6) 再次导出

​	再次导出是没必要的，但是在 `npm` 包的根文件 `index` 却是很常见。如：`import Foo from './foo'；export { Foo }`（默认导出）VS `export * from './foo'` （命名导出）。



### 10. 减少`setter`属性的使用

```ts
class Foo {
  a: number;
  b: number;
  set bar(value: { a: number; b: number }) {
    this.a = value.a;
    this.b = value.b;
  }
}

let foo = new Foo();
```

​	这并不是 `setter` 的一个好的使用场景，当开发人员阅读第一段代码时，不知道将要更改的所有内容的上下文。然而，当开发者使用 `foo.setBar(value)`，他可能会意识到在 `foo` 里可能会引起一些改变。

### 11. 创建数组

> **创建**

```ts
const foo: string[] = [];
```



> **填充数据**： `Array.prototype.fill`

```ts
const foo: string[] = new Array(3).fill('');
console.log(foo); // 会输出 ['','','']
```

### 12. 谨慎使用`--outFile`

应该谨慎使用 `--outFile` 选项：

- 运行时的错误；
- 快速编译；
- 全局作用域；
- 难以分析；
- 难以扩展；
- `_references`；
- 代码重用；
- 多目标；
- 单独编译；

> **具体详细看[这里](https://jkchao.github.io/typescript-book-chinese/tips/outFileCaution.html#%E8%BF%90%E8%A1%8C%E6%97%B6%E7%9A%84%E9%94%99%E8%AF%AF)**



### 13. 静态构造函数

TS中的`class`没有静态构造函数的功能，但可以通过调用自己来获取相同的效果：

```ts
class MyClass {
  static initalize() {
    //
  }
}

MyClass.initalize();
```



### 14. 单例模式

> **作用**：

解决所有代码必须写到`class`中的问题。

> **实现** ： `namespace`

```ts
namespace Singleton {
  // .. 其他初始化的代码

  export function someMethod() {}
}

// 使用
Singleton.someMethod();
```



> **实现**： `export`

```ts
// someFile.ts
// ... any one time initialization goes here ...
export function someMethod() {}

// Usage
import { someMethod } from './someFile';
```



### 15. 函数参数

> 函数参数： 形式一

```ts
function foo(flagA: boolean, flagB: boolean) {
  // 函数主体
}
```

**缺点**： 很容易错误的调用它，如 `foo(flagB, flagA)`，并且你并不会从编译器得到想要的帮助。

> 函数参数： 形式二

```ts
function foo(config: { flagA: boolean; flagB: boolean }) {
  const { flagA, flagB } = config;
}
```

**优点**： 有利于发现错误及代码审查。



#### 16. Truthy

> 除`0`意外的数字，被推断为`true`

```ts
if (123) {
  // 将会被推断出 `true`
  console.log('Any number other than 0 is truthy');
}
```

> `!!`转化为布尔类型

```ts
// ReactJS
{
  !!someName && <div>{someName}</div>;
}
```



#### 16. 构建环境切换

通过`webpack`进行环境切换

```ts
/**
 * This interface makes sure we don't miss adding a property to both `prod` and `test`
 */
interface Config {
  someItem: string;
}

/**
 * We only export a single thing. The config.
 */
export let config: Config;

/**
 * `process.env.NODE_ENV` definition is driven from webpack
 *
 * The whole `else` block will be removed in the emitted JavaScript
 *  for a production build
 */
if (process.env.NODE_ENV === 'production') {
  config = {
    someItem: 'prod'
  };
  console.log('Running in prod');
} else {
  config = {
    someItem: 'test'
  };
  console.log('Running in test');
}
```



### 16. 类型安全的`Event Emitter`

通常来说，在 Node.js 与传统的 JavaScript 里，你有一个单一的 Event Emitter，你可以用它来为不同的事件添加监听器。

```ts
const emitter = new EventEmitter();

// Emit
emitter.emit('foo', foo);
emitter.emit('bar', bar);

// Listen
emitter.on('foo', foo => console.log(foo));
emitter.on('bar', bar => console.log(bar));
```

实际上，在 `EventEmitter` 内部以映射数组的形式存储数据：

```ts
{ foo: [fooListeners], bar: [barListeners] }
```

为了事件的类型安全，你可以为每个事件类型创建一个 emitter：

```ts
const onFoo = new TypedEvent<Foo>();
const onBar = new TypedEvent<Bar>();

// Emit:
onFoo.emit(foo);
onBar.emit(bar);

// Listen:
onFoo.on(foo => console.log(foo));
onBar.on(bar => console.log(bar));
```

> **优点**

- 事件的类型，能以变量的形式被发现。
- Event Emitter 非常容易被重构。
- 事件数据结构是类型安全的。











## 参考

1. [深入理解TypeScript](https://jkchao.github.io/typescript-book-chinese/?mode=light)