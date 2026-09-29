# NOTES.md — 教学偏好与工作备注

## 用户画像

- 背景：Oracle 数据库 + Python 编程，刷过 LeetCode 简单题。
- 没有 Go、没有 TypeScript、没写过分布式后端。
- 提问风格偏「结论先行 + 能落地」，不喜欢铺垫。

## 教学决策（每次设计课程都要遵守）

- **一切从源码取证。** 每条技术结论都要能指到 `C:\coding\multica` 里的具体文件；课程里的路径都是相对仓库根目录的路径。
- **优先用已有类比。** 数据库概念优先映射到 Oracle（schema、序列、迁移、执行计划、`CONCURRENTLY` 索引 ≈ Oracle 的在线索引重建）；Python 概念优先映射到 Python（协程 vs goroutine 只点到为止，不展开语言细节）。
- **不教语言语法。** Go 与 TypeScript 只讲「读这篇文章需要知道的最小语法」，例如 Go 的接口是隐式实现、TS 的 `as T` 与 zod 校验的区别。
- **一次一主题。** 每节课一个可验证的小胜利，控制在 30-40 分钟。
- **必须含检索练习。** 每节课都要有需要回忆才能作答的题，而不是「读了就懂」的判断题。
- **产物要能离线打开。** 课程与图表都是本地 HTML，不依赖网络、不依赖服务端。

## 环境备注（这台机器上实测过的坑）

- PowerShell 直接 stdout 常常不回显 → 结果写文件再读。
- bash 工具的 PATH 是坏的（`dirname`/`ls`/`grep` 都可能缺失），复杂操作走 PowerShell 或写脚本文件。
- PortableGit 缺少 `git-remote-https`，**本机无法直接 `git clone https://…`**；Multica 是用 `codeload.github.com` 的 tarball 下载后用 Python `tarfile` 解压的（Windows 自带 `tar.exe` 曾静默漏解压，不可靠）。
- 调用外部程序用绝对路径；传给 Windows exe 的路径写成 `C:/...`。

## 课程产物位置

- 课程与图表根目录：`C:\coding\learning`
- 图表源 JSON：`C:\coding\learning\diagrams\_src\`（改图改这里，可重新渲染）
- 源码：`C:\coding\multica`
