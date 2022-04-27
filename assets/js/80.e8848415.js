(window.webpackJsonp=window.webpackJsonp||[]).push([[80],{732:function(t,s,a){"use strict";a.r(s);var n=a(12),r=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"_01-进程与线程的概念"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_01-进程与线程的概念"}},[t._v("#")]),t._v(" 01 进程与线程的概念")]),t._v(" "),a("p",[t._v("从本质上说，进程和线程都是 CPU 工作时间片的一个描述：")]),t._v(" "),a("ul",[a("li",[t._v("进程描述了 CPU 在运行指令及加载和保存上下文所需的时间，放在应用上来说就代表了一个程序。")]),t._v(" "),a("li",[t._v("线程是进程中的更小单位，描述了执行一段指令所需的时间。")])]),t._v(" "),a("p",[a("strong",[t._v("进程是资源分配的最小单位，线程是CPU调度的最小单位。")])]),t._v(" "),a("p",[t._v("一个进程就是一个程序的运行实例。详细解释就是，启动一个程序的时候，操作系统会为该程序创建一块内存，用来存放代码、运行中的数据和一个执行任务的主线程，我们把这样的一个运行环境叫"),a("strong",[t._v("进程")]),t._v("。"),a("strong",[t._v("进程是运行在虚拟内存上的，虚拟内存是用来解决用户对硬件资源的无限需求和有限的硬件资源之间的矛盾的。从操作系统角度来看，虚拟内存即交换文件；从处理器角度看，虚拟内存即虚拟地址空间。")])]),t._v(" "),a("p",[t._v("如果程序很多时，内存可能会不够，操作系统为每个进程提供一套独立的虚拟地址空间，从而使得同一块物理内存在不同的进程中可以对应到不同或相同的虚拟地址，变相的增加了程序可以使用的内存。")]),t._v(" "),a("p",[t._v("进程和线程之间的关系有以下四个特点：")]),t._v(" "),a("p",[a("strong",[t._v("（1）进程中的任意一线程执行出错，都会导致整个进程的崩溃。")])]),t._v(" "),a("p",[a("strong",[t._v("（2）线程之间共享进程中的数据。")])]),t._v(" "),a("p",[a("strong",[t._v("（3）当一个进程关闭之后，操作系统会回收进程所占用的内存，")]),t._v(" 当一个进程退出时，操作系统会回收该进程所申请的所有资源；即使其中任意线程因为操作不当导致内存泄漏，当进程退出时，这些内存也会被正确回收。")]),t._v(" "),a("p",[a("strong",[t._v("（4）进程之间的内容相互隔离。")]),t._v(" 进程隔离就是为了使操作系统中的进程互不干扰，每一个进程只能访问自己占有的数据，也就避免出现进程 A 写入数据到进程 B 的情况。正是因为进程之间的数据是严格隔离的，所以一个进程如果崩溃了，或者挂起了，是不会影响到其他进程的。如果进程之间需要进行数据的通信，这时候，就需要使用用于进程间通信的机制了。")]),t._v(" "),a("p",[a("strong",[t._v("Chrome浏览器的架构图")]),t._v("： "),a("img",{attrs:{src:"https://gitee.com/ljcdzh/my_pic/raw/master/img/202203202018390.webp",alt:"img"}}),t._v(" 从图中可以看出，最新的 Chrome 浏览器包括：")]),t._v(" "),a("ul",[a("li",[t._v("1 个浏览器主进程")]),t._v(" "),a("li",[t._v("1 个 GPU 进程")]),t._v(" "),a("li",[t._v("1 个网络进程")]),t._v(" "),a("li",[t._v("多个渲染进程")]),t._v(" "),a("li",[t._v("多个插件进程")])]),t._v(" "),a("p",[t._v("这些进程的功能：")]),t._v(" "),a("ul",[a("li",[a("strong",[t._v("浏览器进程")]),t._v("：主要负责界面显示、用户交互、子进程管理，同时提供存储等功能。")]),t._v(" "),a("li",[a("strong",[t._v("渲染进程")]),t._v("：核心任务是将 HTML、CSS 和 JavaScript 转换为用户可以与之交互的网页，排版引擎 Blink 和 JavaScript 引擎 V8 都是运行在该进程中，默认情况下，Chrome 会为每个 Tab 标签创建一个渲染进程。出于安全考虑，渲染进程都是运行在沙箱模式下。")]),t._v(" "),a("li",[a("strong",[t._v("GPU 进程")]),t._v("：其实， GPU 的使用初衷是为了实现 3D CSS 的效果，只是随后网页、Chrome 的 UI 界面都选择采用 GPU 来绘制，这使得 GPU 成为浏览器普遍的需求。最后，Chrome 在其多进程架构上也引入了 GPU 进程。")]),t._v(" "),a("li",[a("strong",[t._v("网络进程")]),t._v("：主要负责页面的网络资源加载，之前是作为一个模块运行在浏览器进程里面的，直至最近才独立出来，成为一个单独的进程。")]),t._v(" "),a("li",[a("strong",[t._v("插件进程")]),t._v("：主要是负责插件的运行，因插件易崩溃，所以需要通过插件进程来隔离，以保证插件进程崩溃不会对浏览器和页面造成影响。")])]),t._v(" "),a("p",[t._v("所以，"),a("strong",[t._v("打开一个网页，最少需要四个进程")]),t._v("：1 个网络进程、1 个浏览器进程、1 个 GPU 进程以及 1 个渲染进程。如果打开的页面有运行插件的话，还需要再加上 1 个插件进程。")]),t._v(" "),a("p",[t._v("虽然多进程模型提升了浏览器的稳定性、流畅性和安全性，但同样不可避免地带来了一些问题：")]),t._v(" "),a("ul",[a("li",[a("strong",[t._v("更高的资源占用")]),t._v("：因为每个进程都会包含公共基础结构的副本（如 JavaScript 运行环境），这就意味着浏览器会消耗更多的内存资源。")]),t._v(" "),a("li",[a("strong",[t._v("更复杂的体系架构")]),t._v("：浏览器各模块之间耦合性高、扩展性差等问题，会导致现在的架构已经很难适应新的需求了。")])]),t._v(" "),a("h2",{attrs:{id:"_2-进程和线程的区别"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-进程和线程的区别"}},[t._v("#")]),t._v(" 2. 进程和线程的区别")]),t._v(" "),a("ul",[a("li",[t._v("进程可以看做独立应用，线程不能")]),t._v(" "),a("li",[t._v("资源：进程是cpu资源分配的最小单位（是能拥有资源和独立运行的最小单位）；线程是cpu调度的最小单位（线程是建立在进程的基础上的一次程序运行单位，一个进程中可以有多个线程）。")]),t._v(" "),a("li",[t._v("通信方面：线程间可以通过直接共享同一进程中的资源，而进程通信需要借助 进程间通信。")]),t._v(" "),a("li",[t._v("调度：进程切换比线程切换的开销要大。线程是CPU调度的基本单位，线程的切换不会引起进程切换，但某个进程中的线程切换到另一个进程中的线程时，会引起进程切换。")]),t._v(" "),a("li",[t._v("系统开销：由于创建或撤销进程时，系统都要为之分配或回收资源，如内存、I/O 等，其开销远大于创建或撤销线程时的开销。同理，在进行进程切换时，涉及当前执行进程 CPU 环境还有各种各样状态的保存及新调度进程状态的设置，而线程切换时只需保存和设置少量寄存器内容，开销较小。")])]),t._v(" "),a("h2",{attrs:{id:"_3-浏览器渲染进程的线程有哪些"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-浏览器渲染进程的线程有哪些"}},[t._v("#")]),t._v(" 3. 浏览器渲染进程的线程有哪些")]),t._v(" "),a("p",[t._v("浏览器的渲染进程的线程总共有五种： "),a("img",{attrs:{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d6e583f59dc742b9b4e88cf3a3b0f1d4~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp",alt:"img"}}),t._v(" "),a("strong",[t._v("（1)GUI渲染线程")]),t._v(" 负责渲染浏览器页面，解析HTML、CSS，构建DOM树、构建CSSOM树、构建渲染树和绘制页面；当界面需要"),a("strong",[t._v("重绘")]),t._v("或由于某种操作引发"),a("strong",[t._v("回流")]),t._v("时，该线程就会执行。")]),t._v(" "),a("p",[t._v("注意：GUI渲染线程和JS引擎线程是互斥的，当JS引擎执行时GUI线程会被挂起，GUI更新会被保存在一个队列中等到JS引擎空闲时立即被执行。")]),t._v(" "),a("p",[a("strong",[t._v("（2）JS引擎线程")]),t._v(" JS引擎线程也称为JS内核，负责处理Javascript脚本程序，解析Javascript脚本，运行代码；JS引擎线程一直等待着任务队列中任务的到来，然后加以处理，一个Tab页中无论什么时候都只有一个JS引擎线程在运行JS程序；")]),t._v(" "),a("p",[t._v("注意：GUI渲染线程与JS引擎线程的互斥关系，所以如果JS执行的时间过长，会造成页面的渲染不连贯，导致页面渲染加载阻塞。")]),t._v(" "),a("p",[a("strong",[t._v("（3）时间触发线程")]),t._v(" "),a("strong",[t._v("时间触发线程")]),t._v("属于浏览器而不是JS引擎，用来控制事件循环；当JS引擎执行代码块如setTimeOut时（也可是来自浏览器内核的其他线程,如鼠标点击、AJAX异步请求等），会将对应任务添加到事件触发线程中；当对应的事件符合触发条件被触发时，该线程会把事件添加到待处理队列的队尾，等待JS引擎的处理；")]),t._v(" "),a("p",[t._v("注意：由于JS的单线程关系，所以这些待处理队列中的事件都得排队等待JS引擎处理（当JS引擎空闲时才会去执行）；")]),t._v(" "),a("p",[a("strong",[t._v("（4）定时器触发进程")]),t._v(" "),a("strong",[t._v("定时器触发进程")]),t._v("即setInterval与setTimeout所在线程；浏览器定时计数器并不是由JS引擎计数的，因为JS引擎是单线程的，如果处于阻塞线程状态就会影响记计时的准确性；因此使用单独线程来计时并触发定时器，计时完毕后，添加到事件队列中，等待JS引擎空闲后执行，所以定时器中的任务在设定的时间点不一定能够准时执行，定时器只是在指定时间点将任务添加到事件队列中；")]),t._v(" "),a("p",[t._v("注意：W3C在HTML标准中规定，定时器的定时时间不能小于4ms，如果是小于4ms，则默认为4ms。")]),t._v(" "),a("p",[a("strong",[t._v("（5）异步http请求线程")])]),t._v(" "),a("ul",[a("li",[t._v("XMLHttpRequest连接后通过浏览器新开一个线程请求；")]),t._v(" "),a("li",[t._v("检测到状态变更时，如果设置有回调函数，异步线程就产生状态变更事件，将回调函数放入事件队列中，等待JS引擎空闲后执行；")])]),t._v(" "),a("h2",{attrs:{id:"_4-进程之前的通信方式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-进程之前的通信方式"}},[t._v("#")]),t._v(" 4. 进程之前的通信方式")]),t._v(" "),a("p",[a("strong",[t._v("（1）管道通信")])]),t._v(" "),a("p",[t._v("管道是一种最基本的进程间通信机制。"),a("strong",[t._v("管道就是操作系统在内核中开辟的一段缓冲区，进程1可以将需要交互的数据拷贝到这段缓冲区，进程2就可以读取了。")])]),t._v(" "),a("p",[t._v("管道的特点：")]),t._v(" "),a("ul",[a("li",[t._v("只能单向通信")]),t._v(" "),a("li",[t._v("只能血缘关系的进程进行通信")]),t._v(" "),a("li",[t._v("依赖于文件系统")]),t._v(" "),a("li",[t._v("生命周期随进程")]),t._v(" "),a("li",[t._v("面向字节流的服务")]),t._v(" "),a("li",[t._v("管道内部提供了同步机制")])]),t._v(" "),a("p",[a("strong",[t._v("（2）消息队列通信")])]),t._v(" "),a("p",[t._v("消息队列就是一个消息的列表。用户可以在消息队列中添加消息、读取消息等。消息队列提供了一种从一个进程向另一个进程发送一个数据块的方法。 每个数据块都被认为含有一个类型，接收进程可以独立地接收含有不同类型的数据结构。可以通过发送消息来避免命名管道的同步和阻塞问题。但是消息队列与命名管道一样，每个数据块都有一个最大长度的限制。")]),t._v(" "),a("p",[t._v("使用消息队列进行进程间通信，可能会收到数据块最大长度的限制约束等，这也是这种通信方式的缺点。如果频繁的发生进程间的通信行为，那么进程需要频繁地读取队列中的数据到内存，相当于间接地从一个进程拷贝到另一个进程，这需要花费时间。")]),t._v(" "),a("p",[a("strong",[t._v("（3）信号量通信")])]),t._v(" "),a("p",[t._v("共享内存最大的问题就是多进程竞争内存的问题，就像类似于线程安全问题。我们可以使用信号量来解决这个问题。信号量的本质就是一个计数器，用来实现进程之间的互斥与同步。例如信号量的初始值是 1，然后 a 进程来访问内存1的时候，我们就把信号量的值设为 0，然后进程b 也要来访问内存1的时候，看到信号量的值为 0 就知道已经有进程在访问内存1了，这个时候进程 b 就会访问不了内存1。所以说，信号量也是进程之间的一种通信方式。")]),t._v(" "),a("p",[a("strong",[t._v("（4）信号通信")])]),t._v(" "),a("p",[t._v("信号（Signals ）是Unix系统中使用的最古老的进程间通信的方法之一。操作系统通过信号来通知进程系统中发生了某种预先规定好的事件（一组事件中的一个），它也是用户进程之间通信和同步的一种原始机制。")]),t._v(" "),a("p",[a("strong",[t._v("（5）共享内存通信")])]),t._v(" "),a("p",[t._v("共享内存就是映射一段能被其他进程所访问的内存，这段共享内存由一个进程创建，但多个进程都可以访问（使多个进程可以访问同一块内存空间）。共享内存是最快的 IPC 方式，它是针对其他进程间通信方式运行效率低而专门设计的。它往往与其他通信机制，如信号量，配合使用，来实现进程间的同步和通信。")]),t._v(" "),a("p",[a("strong",[t._v("（6）套接字通信")])]),t._v(" "),a("p",[t._v("上面说的共享内存、管道、信号量、消息队列，他们都是多个进程在一台主机之间的通信，那两个相隔几千里的进程能够进行通信吗？答是必须的，这个时候 Socket 这家伙就派上用场了，例如我们平时通过浏览器发起一个 http 请求，然后服务器给你返回对应的数据，这种就是采用 Socket 的通信方式了。")]),t._v(" "),a("h2",{attrs:{id:"_5-僵尸进程和孤儿进程是什么"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-僵尸进程和孤儿进程是什么"}},[t._v("#")]),t._v(" 5. 僵尸进程和孤儿进程是什么？")]),t._v(" "),a("ul",[a("li",[a("strong",[t._v("孤儿进程")]),t._v("：父进程退出了，而它的一个或多个进程还在运行，那这些子进程都会成为孤儿进程。孤儿进程将被init进程(进程号为1)所收养，并由init进程对它们完成状态收集工作。")]),t._v(" "),a("li",[a("strong",[t._v("僵尸进程")]),t._v("：子进程比父进程先结束，而父进程又没有释放子进程占用的资源，那么子进程的进程描述符仍然保存在系统中，这种进程称之为僵死进程。")])]),t._v(" "),a("h2",{attrs:{id:"_6-死锁产生的原因-如果解决死锁的问题"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_6-死锁产生的原因-如果解决死锁的问题"}},[t._v("#")]),t._v(" 6. 死锁产生的原因？ 如果解决死锁的问题？")]),t._v(" "),a("p",[t._v("所谓死锁，是指多个进程在运行过程中因争夺资源而造成的一种僵局，当进程处于这种僵持状态时，若无外力作用，它们都将无法再向前推进。")]),t._v(" "),a("p",[t._v("系统中的资源可以分为两类：")]),t._v(" "),a("ul",[a("li",[t._v("可剥夺资源，是指某进程在获得这类资源后，该资源可以再被其他进程或系统剥夺，CPU和主存均属于可剥夺性资源；")]),t._v(" "),a("li",[t._v("不可剥夺资源，当系统把这类资源分配给某进程后，再不能强行收回，只能在进程用完后自行释放，如磁带机、打印机等。")])]),t._v(" "),a("p",[a("strong",[t._v("产生死锁的原因：")])]),t._v(" "),a("p",[a("strong",[t._v("（1）竞争资源")])]),t._v(" "),a("ul",[a("li",[t._v("产生死锁中的竞争资源之一指的是"),a("strong",[t._v("竞争不可剥夺资源")]),t._v("（例如：系统中只有一台打印机，可供进程P1使用，假定P1已占用了打印机，若P2继续要求打印机打印将阻塞）")]),t._v(" "),a("li",[t._v("产生死锁中的竞争资源另外一种资源指的是"),a("strong",[t._v("竞争临时资源")]),t._v("（临时资源包括硬件中断、信号、消息、缓冲区内的消息等），通常消息通信顺序进行不当，则会产生死锁")])]),t._v(" "),a("p",[a("strong",[t._v("（2）进程间推进顺序非法")])]),t._v(" "),a("p",[t._v("若P1保持了资源R1，P2保持了资源R2，系统处于不安全状态，因为这两个进程再向前推进，便可能发生死锁。例如，当P1运行到P1：Request（R2）时，将因R2已被P2占用而阻塞；当P2运行到P2：Request（R1）时，也将因R1已被P1占用而阻塞，于是发生进程死锁")]),t._v(" "),a("p",[a("strong",[t._v("产生死锁的必要条件：")])]),t._v(" "),a("ul",[a("li",[t._v("互斥条件：进程要求对所分配的资源进行排它性控制，即在一段时间内某资源仅为一进程所占用。")]),t._v(" "),a("li",[t._v("请求和保持条件：当进程因请求资源而阻塞时，对已获得的资源保持不放。")]),t._v(" "),a("li",[t._v("不剥夺条件：进程已获得的资源在未使用完之前，不能剥夺，只能在使用完时由自己释放。")]),t._v(" "),a("li",[t._v("环路等待条件：在发生死锁时，必然存在一个进程——资源的环形链。")])]),t._v(" "),a("p",[a("strong",[t._v("预防死锁的方法：")])]),t._v(" "),a("ul",[a("li",[t._v("资源一次性分配：一次性分配所有资源，这样就不会再有请求了（破坏请求条件）")]),t._v(" "),a("li",[t._v("只要有一个资源得不到分配，也不给这个进程分配其他的资源（破坏请保持条件）")]),t._v(" "),a("li",[t._v("可剥夺资源：即当某进程获得了部分资源，但得不到其它资源，则释放已占有的资源（破坏不可剥夺条件）")]),t._v(" "),a("li",[t._v("资源有序分配法：系统给每类资源赋予一个编号，每一个进程按编号递增的顺序请求资源，释放则相反（破坏环路等待条件）")])]),t._v(" "),a("h2",{attrs:{id:"_7-如何实现浏览器内多个标签页之间的通信"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_7-如何实现浏览器内多个标签页之间的通信"}},[t._v("#")]),t._v(" 7. 如何实现浏览器内多个标签页之间的通信?")]),t._v(" "),a("p",[t._v("实现多个标签页之间的通信，本质上都是通过中介者模式来实现的。因为标签页之间没有办法直接通信，因此我们可以找一个中介者，让标签页和中介者进行通信，然后让这个中介者来进行消息的转发。通信方法如下：")]),t._v(" "),a("ul",[a("li",[a("strong",[t._v("使用 websocket 协议")]),t._v("，因为 websocket 协议可以实现服务器推送，所以服务器就可以用来当做这个中介者。标签页通过向服务器发送数据，然后由服务器向其他标签页推送转发。")]),t._v(" "),a("li",[a("strong",[t._v("使用 ShareWorker 的方式")]),t._v("，shareWorker 会在页面存在的生命周期内创建一个唯一的线程，并且开启多个页面也只会使用同一个线程。这个时候共享线程就可以充当中介者的角色。标签页间通过共享一个线程，然后通过这个共享的线程来实现数据的交换。")]),t._v(" "),a("li",[a("strong",[t._v("使用 localStorage 的方式")]),t._v("，我们可以在一个标签页对 localStorage 的变化事件进行监听，然后当另一个标签页修改数据的时候，我们就可以通过这个监听事件来获取到数据。这个时候 localStorage 对象就是充当的中介者的角色。")]),t._v(" "),a("li",[a("strong",[t._v("使用 postMessage 方法")]),t._v("，如果我们能够获得对应标签页的引用，就可以使用postMessage 方法，进行通信。")])]),t._v(" "),a("h2",{attrs:{id:"_8-对service-worker的理解"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_8-对service-worker的理解"}},[t._v("#")]),t._v(" 8. 对Service Worker的理解")]),t._v(" "),a("p",[t._v("Service Worker 是运行在浏览器背后的"),a("strong",[t._v("独立线程")]),t._v("，一般可以用来实现缓存功能。使用 Service Worker的话，传输协议必须为 "),a("strong",[t._v("HTTPS")]),t._v("。因为 Service Worker 中涉及到请求拦截，所以必须使用 HTTPS 协议来保障安全。")]),t._v(" "),a("p",[t._v("Service Worker 实现缓存功能一般分为三个步骤：首先需要先注册 Service Worker，然后监听到 "),a("code",[t._v("install")]),t._v(" 事件以后就可以缓存需要的文件，那么在下次用户访问的时候就可以通过拦截请求的方式查询是否存在缓存，存在缓存的话就可以直接读取缓存文件，否则就去请求数据。以下是这个步骤的实现：")]),t._v(" "),a("div",{staticClass:"language-javascript line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// index.js")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("navigator"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("serviceWorker"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  navigator"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("serviceWorker\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("register")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'sw.js'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("registration")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'service worker 注册成功'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("catch")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("err")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'servcie worker 注册失败'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// sw.js")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 监听 `install` 事件，回调中缓存所需文件")]),t._v("\nself"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("addEventListener")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'install'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("e")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  e"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("waitUntil")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n    caches"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("open")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'my-cache'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("cache")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" cache"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("addAll")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./index.html'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./index.js'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 拦截所有请求事件")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 如果缓存中已经有请求的数据就直接用缓存，否则去请求数据")]),t._v("\nself"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("addEventListener")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'fetch'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("e")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  e"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("respondWith")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n    caches"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("match")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("e"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("request"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("response")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("response"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" response\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n      console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'fetch source'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n复制代码\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br"),a("span",{staticClass:"line-number"},[t._v("13")]),a("br"),a("span",{staticClass:"line-number"},[t._v("14")]),a("br"),a("span",{staticClass:"line-number"},[t._v("15")]),a("br"),a("span",{staticClass:"line-number"},[t._v("16")]),a("br"),a("span",{staticClass:"line-number"},[t._v("17")]),a("br"),a("span",{staticClass:"line-number"},[t._v("18")]),a("br"),a("span",{staticClass:"line-number"},[t._v("19")]),a("br"),a("span",{staticClass:"line-number"},[t._v("20")]),a("br"),a("span",{staticClass:"line-number"},[t._v("21")]),a("br"),a("span",{staticClass:"line-number"},[t._v("22")]),a("br"),a("span",{staticClass:"line-number"},[t._v("23")]),a("br"),a("span",{staticClass:"line-number"},[t._v("24")]),a("br"),a("span",{staticClass:"line-number"},[t._v("25")]),a("br"),a("span",{staticClass:"line-number"},[t._v("26")]),a("br"),a("span",{staticClass:"line-number"},[t._v("27")]),a("br"),a("span",{staticClass:"line-number"},[t._v("28")]),a("br"),a("span",{staticClass:"line-number"},[t._v("29")]),a("br"),a("span",{staticClass:"line-number"},[t._v("30")]),a("br"),a("span",{staticClass:"line-number"},[t._v("31")]),a("br"),a("span",{staticClass:"line-number"},[t._v("32")]),a("br"),a("span",{staticClass:"line-number"},[t._v("33")]),a("br")])]),a("p",[t._v("打开页面，可以在开发者工具中的 "),a("code",[t._v("Application")]),t._v(" 看到 Service Worker 已经启动了： "),a("img",{attrs:{src:"https://gitee.com/ljcdzh/my_pic/raw/master/img/202203202018473.webp",alt:"img"}}),t._v(" 在 Cache 中也可以发现所需的文件已被缓存： "),a("img",{attrs:{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a223ee3c073d47188ecee7c410ee557c~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp",alt:"img"}})])])}),[],!1,null,null,null);s.default=r.exports}}]);