# RESOURCES.md — 可信来源清单

规则：**所有教学内容都要以此为据**，不要凭记忆下结论。本地路径都相对 `C:\coding\multica`。

## 一手来源（Local，仓库内）

### 官方文档站正文（中文版齐全，优先读 `.zh.mdx`）

| 主题 | 文件 |
| --- | --- |
| 产品全景 / 概念表 | `apps/docs/content/docs/index.zh.mdx`、`concepts.zh.mdx` |
| 端到端工作原理（产品视角） | `apps/docs/content/docs/how-multica-works.zh.mdx` |
| 架构（代码视角，含分层表与执行路径） | `apps/docs/content/docs/developers/architecture.zh.mdx` |
| Issue 模型 | `issues.zh.mdx`、`assigning-issues.zh.mdx`、`mentioning-agents.zh.mdx`、`comments.zh.mdx` |
| Run 生命周期与触发 | `tasks.zh.mdx`、`triggering-agents.zh.mdx` |
| Agent 与 Runtime | `agents.zh.mdx`、`agents-create.zh.mdx`、`daemon-runtimes.zh.mdx`、`install-agent-runtime.zh.mdx`、`providers.zh.mdx` |
| Skill / Squad / Autopilot | `skills.zh.mdx`、`squads.zh.mdx`、`autopilots.zh.mdx` |
| 权限与安全 | `security-model.zh.mdx`、`members-roles.zh.mdx`、`auth-tokens.zh.mdx` |
| 集成 | `github-integration.zh.mdx`、`vcs-integration.zh.mdx`、`channels.zh.mdx`、`slack-bot-integration.zh.mdx`、`lark-bot-integration.zh.mdx`、`dingtalk-bot-integration.zh.mdx`、`telegram-bot-integration.zh.mdx` |
| 自部署 | `self-host-quickstart.zh.mdx`、`environment-variables.zh.mdx` |
| CLI | `cli.zh.mdx` |
| 故障排查 | `troubleshooting.zh.mdx` |
| 开发规范（命名、术语、中文文案） | `developers/conventions.zh.mdx`、`developers/contributing.zh.mdx` |

### 仓库根目录文档

| 文件 | 内容 |
| --- | --- |
| `README.md` / `README.zh.md` | 功能全表、provider 清单（26 个 CLI）、架构 ASCII 图、技术栈表 |
| `VISION.md` / `VISION.zh.md` | 产品愿景与命名由来（Multiplexed Information and Computing Agent） |
| `AGENTS.md` | **最重要的一份工程契约**：包边界、状态规则、API 兼容、数据库迁移规则、UUID 规则、桌面端规则、测试规则 |
| `CONTRIBUTING.md` | 本地开发最短路径、worktree、测试 |
| `CLI_AND_DAEMON.md` / `CLI_INSTALL.md` | CLI 安装与 daemon 操作、profile |
| `SELF_HOSTING.md` / `SELF_HOSTING_ADVANCED.md` / `SELF_HOSTING_AI.md` | 自部署三级深度 |
| `apps/mobile/AGENTS.md`、`apps/mobile/README.md` | 移动端独立规则 |
| `server/cmd/migrate/README.md` | 迁移 runner 的工程约定（事务、并发索引、advisory lock） |

### 源码定位（读代码的入口）

| 想知道什么 | 从哪开始 |
| --- | --- |
| 有哪几个可执行入口 | `server/cmd/`（`server`、`multica`、`migrate`、`maintenance`、`backfill_*`） |
| 全部 HTTP 路由 | `server/cmd/server/router.go` |
| 中间件 | `server/internal/middleware/` |
| Run 的业务主线 | `server/internal/service/task.go` |
| daemon 主体与轮询循环 | `server/internal/daemon/daemon.go` |
| daemon 与 server 的 HTTP 客户端 | `server/internal/daemon/client.go` |
| 领取 / 开始 / 完成 task 的 handler | `server/internal/handler/daemon.go` |
| agent CLI 适配层 | `server/pkg/agent/agent.go`（接口）＋每个 provider 一个文件 |
| 手写 SQL 与 sqlc 生成物 | `server/pkg/db/queries/`、`server/pkg/db/generated/` |
| 数据库迁移 | `server/migrations/` |
| 实时事件常量 | `server/pkg/protocol/events.go` |
| 两条 WebSocket 通道 | `server/internal/realtime/`、`server/internal/daemonws/` |
| 调度器与 cron 作业 | `server/internal/scheduler/` |
| 集成（Git / IM） | `server/internal/integrations/` |
| 插件契约 | `server/pkg/plugincontract/manifest.go`、`packages/plugin-sdk/` |
| 前端 API 边界 | `packages/core/api/client.ts`、`packages/core/api/schema.ts` |
| 前端实时同步 | `packages/core/realtime/use-realtime-sync.ts` |
| 平台适配 | `apps/web/platform/navigation.tsx`、`apps/desktop/src/renderer/src/platform/` |

## 二手来源（Web，用于补充与验证）

- 上游仓库：<https://github.com/multica-ai/multica>
- 官网 / 云服务：<https://multica.ai>
- 本地上游提交：`67d61a2073bad0fbb7140fd2000f1ab7ec0a4f25`（`main`，2026-09 下载）
- Star 历史 / 趋势：<https://www.star-history.com/multica-ai/multica>

## 社区（获取智慧的地方）

技术判断力来自和真人过招，不是读文档读出来的。按门槛从低到高：

- **Discord（官方，最活跃）**：<https://discord.gg/W8gYBn226t> —— 适合问「这个报错有人遇到过吗」。
- **GitHub Issues / Discussions**：<https://github.com/multica-ai/multica/issues> —— 提问前先搜；提 bug 请附 `daemon.log` 与 Run 的执行日志。
- **X（Twitter）**：关注官方账号动态，发版很快（多数工作日都发）。

## 本课程自产的参考资料

- `diagrams/` 下 8 张设计图（架构 / 分层 / 生命周期 / 时序 / 流程 / 数据流 / 部署 / 权限链）。
- `reference/` 下 5 份速查文档（术语表、代码地图、Run 状态与错误码、命令与环境变量、图表索引）。
