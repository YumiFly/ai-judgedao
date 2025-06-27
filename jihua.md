功能
最小实现建议
争议提交     表单输入 + 储存 IPFS 链接(我觉得这里可以换成AWS的s3更符合参赛要求) + 链上记录 disputeId
Agent 仲裁  模拟调用 3 个 Agent 的判断（用 OpenAI API 或本地脚本）
VRF 模拟    前端随机或 JS VRF 模拟 Agent 抽选流程
链上写入     仲裁结果写入 Verdict 合约，可读可查
展示面板     显示争议、AI 判定过程、链上状态变化
Chainlink 接入  至少接入 Automation 或 Functions（演示结构）


TODO
- [ ] 争议提交
- [ ] Agent 仲裁
- [ ] VRF 模拟
- [ ] 链上写入
- [ ] 展示面板
- [ ] Chainlink 接入


DisputeRegistry.sol   提交争议、记录状态（Pending → Resolved）
Verdict.sol           记录仲裁结果（投票 Agent、时间戳、结果）
AgentManager.sol      模拟 Agent 抽选，可后续换为 Chainlink VRF
