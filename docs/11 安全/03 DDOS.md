---
title: 安全03 DDOS攻击
sidebar: 'auto'
date: 2021-11-06
categories:
- 11安全
isShowComments: true
---



## DDOS是什么

DDOS（distributed denial of service 分布式停止服务）。利用合理的服务请求来占用过多的服务资源，从而使合法用户无法得到服务的响应。DDOS 不是一种攻击，而是一大类攻击的总称。网站运行的各个环节，都可以是攻击目标。只要把一个环节攻破，使得整个流程跑不起来，就达到了瘫痪服务的目的。

## 常见攻击方式

### 1. SYN Flood

该攻击通过向目标发送大量TCP“初始连接请求”SYN数据包利用TCP握手，目标服务器响应每个连接请求，然后等待握手最后一步，但是异步从未发生过，耗尽了进程中的目标资源。

### 2. HTTP Flood

此攻击类型同时在多个不同的计算机上反复按浏览器的刷新，大量HTTP请求泛滥服务器，导致拒绝服务。

## 防范

-   备份文件 ： 最低限度可以显示公告，告诉用户，网站出现问题
-   HTTP请求拦截
-   带宽扩容 + CDN （提高犯罪成本）



### 1. CDN

CDN 指的是网站的静态内容分发到多个服务器，用户就近访问，提高速度。因此，CDN 也是带宽扩容的一种方法，可以用来防御 DDOS 攻击。有个局限性： 网站的大部分内容必须可以静态缓存。



### 2. HTTP请求拦截

通过HTTP请求的IP地址和User Agent字段的特征，对恶意请求进行拦截。

可分为以下三个层次做：

1.   专用硬件（服务器前，架设硬件防火墙，专门过滤请求）
2.   本机防火墙（操作系统都带有软件的防火墙）
3.   web服务器进行过滤请求

```js
// nginx写法
location / {
    deny 1.2.3.4;
}
```



## 参考

1.   [DDOS 攻击的防范教程](http://www.ruanyifeng.com/blog/2018/06/ddos.html)

