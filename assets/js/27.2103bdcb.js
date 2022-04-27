(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{680:function(s,t,n){"use strict";n.r(t);var a=n(12),e=Object(a.a)({},(function(){var s=this,t=s.$createElement,n=s._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[n("h2",{attrs:{id:"闭包"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#闭包"}},[s._v("#")]),s._v(" 闭包")]),s._v(" "),n("blockquote",[n("p",[s._v("闭包概念")])]),s._v(" "),n("p",[s._v("​\t闭包是支持头等函数实现词法绑定的一种方式，对js而言，其可以以函数作为参数和返回值，所以也存在闭包的概念。具体体现在现在当一个js函数返回值也是一个函数，且返回的函数使用了其外部作用域的变量，当外部函数执行结束后，尽管已经脱离了原来的执行上下文，所返回的函数依然可以使用引用的自由变量，这是因为其生成了一个捕获所引用自由变量的闭包，且存储在函数堆内存的scopes上。")]),s._v(" "),n("blockquote",[n("p",[s._v("闭包作用")])]),s._v(" "),n("p",[s._v("函数执行，产生一个私有的上下文，然后进栈")]),s._v(" "),n("ol",[n("li",[s._v("当函数执行完，一般情况下，当前形成的上下文都会被出栈释放，若上下文被释放，之前存储的私有变量也会被释放")]),s._v(" "),n("li",[s._v("如果当前上下文的堆内存，被当前上下文之外的事物所占用，则当前上下文不能出栈释放，会导致之前声明的私有变量也有被存储起来了。")])]),s._v(" "),n("p",[n("strong",[s._v("闭包")]),s._v(' ： 闭包是一种机制，函数执行产生的私有上下文，一方面可以保护里面的私有变量不被污染，一方面如果不被释放，私有变量及相关信息也会被保存起来，把"保护" + "保存"的机制，称之为闭包。')]),s._v(" "),n("h2",{attrs:{id:"实例"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#实例"}},[s._v("#")]),s._v(" 实例")]),s._v(" "),n("div",{staticClass:"language-js line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/*\n * EC(G)\n *   变量提升:\n *     var test;\n */")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// test=0x000;")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" test "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[s._v("i")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/*\n     * EC(AN) 「闭包」\n     *   作用域链:<EC(AN),EC(G)> \n     *   形参赋值:i=2 -> 4\n     *   变量提升:--\n     */")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/* \n         * EC(TEST)\n         *   作用域链:<EC(TEST),EC(AN)> \n         *   初始ARGUMENTS: {0:5,length:1} 实参集合\n         *   形参赋值:--\n         *   变量提升:--\n         */")]),s._v("\n        "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("alert")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("i "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*=")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//=>“4”")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//return 0x000; [[scope]]:EC(AN)")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("test")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("5")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br"),n("span",{staticClass:"line-number"},[s._v("19")]),n("br"),n("span",{staticClass:"line-number"},[s._v("20")]),n("br"),n("span",{staticClass:"line-number"},[s._v("21")]),n("br"),n("span",{staticClass:"line-number"},[s._v("22")]),n("br"),n("span",{staticClass:"line-number"},[s._v("23")]),n("br"),n("span",{staticClass:"line-number"},[s._v("24")]),n("br"),n("span",{staticClass:"line-number"},[s._v("25")]),n("br")])])])}),[],!1,null,null,null);t.default=e.exports}}]);