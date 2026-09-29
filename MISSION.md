# Mission: 读懂并能驾驭 Multica

## Why

我打算把 Multica 当成自己的「AI 队友调度台」来用：让 Claude Code、Codex 这类编码工具不再散落在十几个终端窗口里，而是像同事一样接任务、报进度、交回评审。要把它用好、改得动、出了问题能自己排查，我必须先把这套系统的每个部件读通——而不是只会照着 README 点几下。

## Success looks like

- 能用自己的话讲清 Workspace / Issue / Run / Agent / Runtime / Squad / Skill / Autopilot 之间的关系，以及 Multica 与「多开几个终端」的本质差别在哪。
- 能在自己的机器上把这套服务端跑起来（自部署 + 本地开发两条路都跑通过一次），并能读懂 `/readyz`、`daemon status` 这类健康输出的含义。
- 能按「请求 → 中间件 → handler → service → SQL」的路径，在 `server/` 里自己定位一个接口的实现，并说清它改了哪张表。
- 能画出并解释 Run 从 `queued` 到 `completed` 的完整链路，包括谁签发凭据、谁 spawn 工具、失败时怎么重试。
- 能读懂前端 `core / ui / views` 三层的分工，并在 `packages/core` 里找到某条实时事件最终改动了哪个 query cache。
- 能用 CLI 和一个脚本化的方式（而不是手点界面）创建 Issue、指派智能体、查看执行日志。
- 面对「智能体跑了但没动」「任务一直 queued」这类问题时，能按顺序列出排查步骤和对应的日志/状态字段。

## Constraints

- 有 Oracle 数据库与 Python 编程基础，刷过 LeetCode 简单题；没有写过 Go，也没写过后端微服务。
- 时间零散，每次学习尽量控制在 30-40 分钟以内，一次只吃透一个主题。
- 学习材料要能本地打开（离线可用），并且能反复回看。
- 一切结论必须能在源码里找到出处，不接受「大概是这样」。

## Out of scope

- 成为 Go 或 TypeScript 的语言专家；只需要能读懂并按现有模式改。
- Kubernetes / Helm 的深度运维；知道有这条部署路径、会读 chart 的 values 即可。
- 移动端（`apps/mobile`）的深度改造；本次只要求了解它为什么与 Web 分家。
- 参与 Multica 上游开发流程（PR 规范、发版节奏）的细节。
