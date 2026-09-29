# 学习记录 0001 — 第一次通读

- 日期：2026-09-29
- 本次范围：搭好课程与图表骨架，走完 0001–0014 全部课程的第一遍
- 源码版本：`67d61a2073bad0fbb7140fd2000f1ab7ec0a4f25`（`main`，2026-09 下载）

## 本次确立了什么（不再需要重新推导）

1. **Multica 不含模型、不执行代码。** 它是调度台：服务端管协作数据与调度，daemon 跑在你自己机器上，真正干活的是你已登录的 Agent CLI（26 种）。
2. **Issue : Run = 1 : N。** 代码里 Run 叫 `task`，表名 `agent_task_queue`。把"意图"和"执行"分开是理解整个系统所有设计的前提。
3. **Agent ≠ Runtime。** Agent 是配置（逻辑身份，你手建）；Runtime 是某台机上某个 CLI 的实际安装（daemon 扫出来注册）。"Agent 正常但派活失败"几乎总是 Runtime 离线。
4. **Run 有八个状态**，其中两个是 Multica 区别于普通任务队列的地方：`deferred`（有 `fire_at` 就排期）与 `waiting_local_directory`（本地目录被占，daemon 停车等待）。每个状态转移都对应一条 `task:*` 实时事件。
5. **凭据逐级收窄**：会话/PAT（`mul_`）→ daemon 令牌（`mdt_`）→ 运行令牌（`mat_`）。`mat_` 绑定 (agent_id, task_id)，库里只存 SHA-256 哈希，用完即弃。这是"敢让 AI 在你机器上跑"的工程前提。
6. **数据库是唯一事实源，WebSocket 只是加速器。** 丢事件不影响正确性，重查即可恢复。
7. **前端实时事件只 patch/invalidate TanStack Query 缓存**，绝不写 Zustand 里的服务端数据（`AGENTS.md` · State Rules）。
8. **迁移三条硬规则**：不用外键与级联；索引一律 `CONCURRENTLY` 且每个独占一个单语句文件、事务外执行；条件跳过的迁移也永久记账，后续 DDL 必须幂等。
9. **安全边界就是运行 daemon 的那个 OS 用户。** Multica 明确不做文件系统沙箱（`security-model.zh.mdx`），要求自建外层隔离（专用用户 / 容器 / VM）。
10. **CLI 与 daemon 是同一个二进制**（`server/cmd/multica/`），所以 `.gitignore` 里既有 `server/daemon` 又有 `server/multica`。

## Oracle / Python 背景的对照收获

| Multica 的做法 | Oracle 里的对应物 |
| --- | --- |
| `CREATE INDEX CONCURRENTLY` | `CREATE INDEX ... ONLINE` |
| 并发索引必须事务外执行 | Oracle DDL 隐式提交，压根不存在此约束 → 这是 PG 特有坑 |
| 表达式索引要 `ANALYZE` | `DBMS_STATS.GATHER_TABLE_STATS` |
| 手写 SQL + sqlc 生成 | 预编译存储过程 + 强类型接口 |
| 中间件链 | `LOGON` 触发器 + 审计策略包 |
| 迁移版本表 `schema_migrations` | Flyway/Liquibase 的版本表 |
| Profile（配置/端口/工作区根全隔离） | 多套 `TNS_ADMIN` + `tnsnames.ora` |
| 插件的 Action / Hook 分离"能力"与"触发" | 包 + job 分离：`PKG_X.DO_WORK` 与"谁来调"无关 |

## 还没搞懂 / 下次要追的问题

1. **`mat_` 令牌过期但 Run 还在跑怎么办？** 疑在 daemon 的续期 / 看门狗逻辑里，尚未读。
2. **Hermes 记忆与 `state.db` 在 Windows 上降级的具体行为**（无符号链接权限时数据库保持任务局部）。
3. **实时层重连后怎么补错过的片段**：`stream_retention.go` 只看了文件名，未读实现。
4. **`agent_task_queue` 是否需要分区**：现在是索引 + GC + 保留策略控增长，值得算一笔账。
5. **插件没有 `agents:write` scope 是有意的边界还是未实现**。

## 下一步（按性价比排序）

1. 挑一个梯度 M 的改动真的做一次（第 14 课第六节），走完 `make check`。
2. 把 `make selfhost` 与 `make setup/start/down` 两条路各跑通一次（MISSION 硬指标）。
3. 用 CLI 脚本化建一条 Issue 并指派，观察 `queued → running → completed` 的完整事件流。
