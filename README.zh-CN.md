# Ein-Password-Generator

一个在 Chrome 扩展弹窗中生成高强度密码的工具。

- 仓库地址：`https://github.com/WFacai/Ein-Password-Generator`
- English README: `README.md`

## 功能特性

- 可配置密码长度
- 大写、小写、数字、符号独立开关
- 支持自定义符号集合
- 支持排除相似字符和易混淆符号
- 支持“字符不重复”模式
- 支持分隔符格式化，便于阅读
- 一键复制到剪贴板

## 技术栈

- Chrome Extension Manifest V3
- 原生 HTML/CSS/JavaScript
- 使用 `chrome.storage.sync` 保存配置
- 使用 `crypto.getRandomValues` 生成安全随机数

## 项目结构

- `EinPasswordGenerator_Unpacked/`：扩展源码目录
- `EinPasswordGenerator_Unpacked/manifest.json`：扩展清单文件
- `EinPasswordGenerator_Unpacked/popup.html`：弹窗界面
- `EinPasswordGenerator_Unpacked/popup.css`：弹窗样式
- `EinPasswordGenerator_Unpacked/popup.js`：密码生成逻辑

## 快速开始（Chrome）

1. 打开 `chrome://extensions/`
2. 开启“开发者模式”
3. 点击“加载已解压的扩展程序”
4. 选择 `EinPasswordGenerator_Unpacked` 目录

## 安全与发布说明

- 不要提交扩展私钥文件（`*.pem`）
- 不要提交打包产物（`*.crx`）到源码仓库
- `.gitignore` 已默认忽略以上文件
- 如果私钥曾公开过，建议立即重新生成并替换

## 许可证

MIT License，详见 `LICENSE`。
