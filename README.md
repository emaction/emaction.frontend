# emaction

[English README](https://github.com/emaction/emaction.frontend/blob/main/README.en.md)

emaction 是一个标准 web component，可以用在任何 html 页面中。

只需两行代码，即可为页面添加 emoji reaction 功能。

## 特别赞助

> **省流(Newsletter)：有关行业📱、代码👨‍💻、科研🔬的有趣内容，每个工作日更新。** **[点此订阅](https://shengliu.tech/)**

## 演示

[https://emaction.cool](https://emaction.cool)

## 开始使用

### 通过 CDN 引入（推荐）
```
<script type="module" src="https://cdn.jsdelivr.net/gh/emaction/frontend.dist@1.0.10/bundle.js"></script>
```
然后
```
<emoji-reaction></emoji-reaction>
```
就 Ok 啦！

### 通过 NPM 使用
```
npm install emaction
```

## 进阶配置

### 自定义 emoji

你可以通过 `availableArrayString` 属性指定自定义的 emoji

```
<emoji-reaction availableArrayString="👍,thumbs-up;😄,smile-face;🎉,party-popper;😕,confused-face;❤️,red-heart;🚀,rocket;👀,eyes;"></emoji-reaction>
```

### 自定义颜色主题

你可以通过 css 变量来指定背景颜色、字体颜色、边界颜色等，像下面这样：

```
<style>
  .reactions {
    --start-smile-border-color: #d0d7de;
    --start-smile-border-color-hover: #bbb;
    --start-smile-bg-color: #f6f8fa;
    --start-smile-svg-fill-color: #656d76;
    --reaction-got-not-reacted-bg-color: #fff;
    --reaction-got-not-reacted-bg-color-hover: #eaeef2;
    --reaction-got-not-reacted-border-color: #d0d7de;
    --reaction-got-not-reacted-text-color: #656d76;
    --reaction-got-reacted-bg-color: #ddf4ff;
    --reaction-got-reacted-bg-color-hover: #b6e3ff;
    --reaction-got-reacted-border-color: #0969da;
    --reaction-got-reacted-text-color: #0969da;
    --reaction-available-popup-bg-color: #fff;
    --reaction-available-popup-border-color: #d0d7de;
    --reaction-available-popup-box-shadow: #8c959f33 0px 8px 24px 0px;
    --reaction-available-emoji-reacted-bg-color: #ddf4ff;
    --reaction-available-emoji-bg-color-hover: #f3f4f6;
    --reaction-available-emoji-z-index: 100;
    --reaction-available-mask-z-index: 80;
  }
</style>
<emoji-reaction class="reactions"></emoji-reaction>
```

其中，`start-smile` 是指最左侧的那个小笑脸（点击它会弹出可选的 reaction），`reaction-got` 是指当前网页已经获得的 reaction，`reacted` 指当前用户针对当前网页点过的 reaction，`not-reacted` 则相反。`reaction-available` 是指当前页面支持的 reaction。

### 深色模式

你可以通过 `theme` 属性来指定深/浅色主题，有`dark`，`light`，`system` 三种选项，默认是 `light`。

### 自托管后端

你可以参考 [这个](https://github.com/emaction/emaction.backend) 后端仓库，来构建自己的后端服务，以存储自己的数据，并通过 `endpoint` 属性来指定后端接口地址。

### 自定义目标 id
目标 id 用来标识 reaction 所针对的目标（一般是所在页面）。一般情况下，你不需要指定目标 id，因为 emaction 会查找 canonical meta 来确定当前页面内容对应的规范链接。如果你确实需要自定义目标 id（比如想为页面内每个评论都添加 reaction），可以通过属性 `reactionTargetId`来指定。
