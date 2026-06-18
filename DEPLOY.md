# Mirror ME 部署说明

这个目录是完整的静态网页发布目录。上线时只需要发布本目录中的文件：

- `index.html`
- `styles.css`
- `app.js`
- `assets/`

推荐方式：

1. Netlify Drop：打开 `https://app.netlify.com/drop`，登录后拖入整个 `outputs` 文件夹或 `mirror-me-deploy.zip`，会生成公开网址。
2. Vercel：创建新项目并选择静态目录，发布目录选择 `outputs`。
3. GitHub Pages：把本目录内容放到仓库根目录或 `docs/` 目录，然后开启 Pages。

说明：当前网页使用浏览器本地存储保存账户和聊天记录，不需要数据库或后端服务。不同用户在线访问时，数据会分别保存在各自浏览器中。
