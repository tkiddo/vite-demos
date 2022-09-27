## vite使用demo

### [vite config](https://cn.vitejs.dev/config/)

## start

- install

```shell
npm install vite -D
```

- npm scripts
```json
{
  "scripts": {
    "build": "vite build",
    "dev": "vite"
  },
}
```

## demo-style

- install

```shell
npm install sass less -D
```

直接使用即可，无须更多配置

## demo-devServer

配置开发服务器选项

[配置选项](https://cn.vitejs.dev/config/server-options.html#server-https)

## demo-static

静态文件引入

- public文件夹内文件以绝对路径引入，打包时会直接复制

- 非public文件按打包处理

## demo-env

环境变量与模式

为了防止意外地将一些环境变量泄漏到客户端，只有以 VITE_ 为前缀的变量才会暴露给经过 vite 处理的代码

## demo-react

```
npm install @vitejs/plugin-react -D
```

```js
//vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
```


