# 前端监控平台

## 功能

### 用户行为录制与回放

核型原理：利用 rrweb 录制用户行为 -> 转换为 json -> 上报后台 -> cms 查看与回放

## 架构

h5 端只有一个页面和简单的按钮，服务端简单的上报和查询接口，技术采用 nestjs ，数据库暂时采用写入本地 json 文件。cms 端有一个页面点击查询用户行为和错误堆栈的。h5 端和 cms 端采用 react 技术栈。

## 安装

```bash
$ npm install
```

## 运行

```bash
# development
$ npm run dev

```
