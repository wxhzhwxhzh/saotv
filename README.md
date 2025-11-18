# SaoTV 互联网在线TV

一个功能强大的在线流媒体播放器，支持 M3U8 链接播放，具有现代化的界面设计和丰富的功能。

## 🌟 主要特性

- **🎬 流媒体播放** - 支持 M3U8 和其他视频格式的在线播放
- **🎨 主题切换** - 支持明暗主题切换，保护眼睛
- **📺 预设频道** - 内置多个推荐频道，一键播放
- **📜 播放历史** - 自动记录播放历史，方便快速访问
- **📱 响应式设计** - 完美适配桌面和移动设备
- **⚡ 实时状态** - 显示播放状态和当前链接信息

## 🚀 快速开始

### 安装与运行

1. **克隆或下载项目**
   ```bash
   # 如果是从 Git 仓库克隆
   git clone [repository-url]
   cd SaoTV
   ```

2. **直接运行**
   - 直接用浏览器打开 `index.html` 文件
   - 或者使用本地服务器运行（推荐）

3. **使用本地服务器**
   ```bash
   # 使用 Python 3
   python -m http.server 8000
   
   # 使用 Node.js (需要安装 http-server)
   npx http-server
   
   # 使用 PHP
   php -S localhost:8000
   ```
   然后在浏览器中访问 `http://localhost:8000`

## 📖 使用说明

### 播放视频

1. **手动输入链接**
   - 在输入框中输入 M3U8 或其他视频链接
   - 点击"播放"按钮或按回车键开始播放

2. **使用预设频道**
   - 在左侧边栏选择推荐频道
   - 点击频道名称即可快速播放

3. **播放历史**
   - 在播放历史区域可以查看之前的播放记录
   - 点击历史记录可快速重新播放
   - 支持删除单个记录或清空所有历史

### 界面功能

- **主题切换** - 点击右上角的太阳/月亮图标切换明暗主题
- **状态显示** - 实时显示当前播放状态（等待播放/播放中/已暂停等）
- **链接显示** - 显示当前播放的视频链接
- **清空功能** - 快速清空输入框内容

## 🛠️ 技术栈

- **前端框架**: HTML5, CSS3, JavaScript (ES6+)
- **样式框架**: 原生 CSS (CSS Variables, Flexbox, Grid)
- **视频播放**: HLS.js (用于 M3U8 流媒体播放)
- **UI 库**: jQuery (用于 DOM 操作和事件处理)
- **图标**: Emoji 图标系统

## 📁 项目结构

```
SaoTV/
├── index.html          # 主页面文件
├── main.css           # 样式文件（当前为空，样式内嵌在 HTML 中）
├── fav.png            # 网站图标
└── README.md          # 项目说明文档
```

## 🎨 界面预览

### 主要界面组件

1. **导航栏**
   - 项目标题和图标
   - IPTV 资源链接
   - 主题切换按钮

2. **侧边栏**
   - 推荐频道列表
   - 快速频道切换

3. **主内容区**
   - 视频播放器
   - 输入控制区
   - 播放历史记录

## 🔧 配置说明

### 添加自定义频道

编辑 `index.html` 文件中的 `channels` 对象：

```javascript
const channels = {
  "channels": [
    {
      "name": "频道名称",
      "url": "频道链接"
    }
    // 添加更多频道...
  ]
};
```

### 主题自定义

项目使用 CSS Variables 实现主题切换，可以在 `:root` 和 `[data-theme="light"]` 选择器中修改颜色变量：

```css
:root {
  --bg-primary: #1a1a2e;     /* 主背景色 */
  --accent: #3498db;         /* 主题色 */
  /* 更多颜色变量... */
}
```

## 🌐 浏览器兼容性

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## 📝 更新日志

### v1.0.0
- 初始版本发布
- 支持 M3U8 流媒体播放
- 实现明暗主题切换
- 添加播放历史功能
- 响应式设计支持

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request 来改进项目！

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🔗 相关链接

- [IPTV 资源](https://iptv-org.github.io/) - 获取更多 IPTV 频道资源
- [HLS.js 文档](https://hls-js.com/) - HLS.js 官方文档
- [jQuery 文档](https://jquery.com/) - jQuery 官方文档

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 提交 Issue
- 发送邮件
- 项目讨论区

---

**SaoTV** - 让在线观看变得简单而美好！ 🎉