# Multica 精读课

一套从源码出发的 **Multica**（multica-ai/multica）系统精读课程。目标不是"会点按钮"，而是**读懂整个系统**：它为什么这样分层、一次 Run 从点击到交付经过了哪些环节、凭据在哪一步收窄、出问题时该按什么顺序排查。

> 全部内容为**离线可打开的静态 HTML**，用浏览器直接打开 `index.html` 即可开始，无需服务器、无需联网。

## 课程主线（14 课）

| # | 课程 | 主题 |
| --- | --- | --- |
| 01 | [它到底解决了什么问题](lessons/0001-what-is-multica.html) | 名字由来、边界（不提供模型）、三层拆分 |
| 02 | [领域模型：八个名词](lessons/0002-domain-model.html) | Workspace / Issue / Run / Agent / Runtime / Squad / Skill / Autopilot |
| 03 | [仓库分层与依赖方向](lessons/0003-repo-layers.html) | views → core + ui 的硬规则，为什么这样切 |
| 04 | [一个请求的旅行](lessons/0004-backend-request-path.html) | router → middleware → handler → service → sqlc → Postgres |
| 05 | [Run 生命周期](lessons/0005-run-lifecycle.html) | 八状态状态机，含"等待本地目录"这个反直觉状态 |
| 06 | [一次 Run 的端到端时序](lessons/0006-run-sequence.html) | 凭据链 `mul_` → `mdt_` → `mat_` 逐级收窄 |
| 07 | [daemon 调度](lessons/0007-daemon.html) | 推 + 拉双保险、心跳、并发与唤醒 |
| 08 | [CLI 与 daemon](lessons/0008-cli-and-daemon.html) | 同一个二进制、两副面孔 |
| 09 | [实时同步](lessons/0009-realtime.html) | 两条 WebSocket 通道与事件粒度 |
| 10 | [数据库与迁移](lessons/0010-database-migrations.html) | 589 个迁移文件、并发索引、**全篇 Oracle 对照** |
| 11 | [权限与安全边界](lessons/0011-security.html) | 三层边界；官方明确**不做**文件系统沙箱 |
| 12 | [自部署与本地开发](lessons/0012-selfhost.html) | 拓扑、Makefile 目标、健康检查 |
| 13 | [集成与插件契约](lessons/0013-integrations-plugins.html) | manifest、scope、Action/Hook 分离 |
| 14 | [故障排查](lessons/0014-troubleshooting.html) | 按状态分诊 + 三个梯度的实战改动 |

## 目录结构

```
index.html                课程目录页（入口）
MISSION.md                学习目标与验收标准
NOTES.md                  教学偏好与协作约定
RESOURCES.md              可信来源清单 + 源码入口点表
assets/                   课程样式与交互脚本（纯前端，file:// 可用）
lessons/                  14 课正文
reference/                5 份速查：术语表 / 代码地图 / Run 状态 / 命令与环境变量 / 图表索引
diagrams/                 8 张设计图（HTML）+ _src/ 原始规格 JSON
learning-records/         学习记录
```

## 8 张设计图

| # | 图 | 类型 |
| --- | --- | --- |
| 01 | 系统架构总览 | architecture |
| 02 | 仓库分层与依赖方向 | architecture |
| 03 | Run 生命周期 | lifecycle |
| 04 | 一次 Run 端到端时序 | sequence |
| 05 | daemon 唤醒与领取 Run | workflow |
| 06 | 实时事件数据流 | dataflow |
| 07 | 自部署拓扑 | architecture |
| 08 | 权限校验链 | workflow |

每张图都由 `diagrams/_src/*.json` 规格生成，重新渲染即可改图。

## 怎么用这套课

1. 打开 `index.html`，按顺序读。
2. 每课结尾有**单选题**（点选项立刻判对错）和**回忆题**（先自己讲一遍再展开对照）——这两步别跳过，它们是这套课的核心机制。
3. 卡住时查 `reference/`，需要全局视角时看 `diagrams/`。
4. 每课都标注了结论对应的源码文件，配合 `multica` 源码对照阅读。

## 关于来源

所有结论都可溯源到 Multica 仓库的具体文件（`server/cmd/server/router.go`、`server/pkg/protocol/events.go`、`server/cmd/migrate/README.md`、`apps/docs/content/docs/security-model.zh.mdx` 等）。课程为个人学习笔记性质，与 Multica 项目方无隶属关系。

仓库中的 Multica 源码遵循其自身的许可证；本仓库内容为独立整理的学习材料。
