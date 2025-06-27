# AIJudgeDAO 🏛️

*[English](#english) | [中文](#中文)*

---

## 中文

### 📖 项目简介

AIJudgeDAO 是一个基于区块链的去中心化AI仲裁平台，结合了人工智能分析和人工仲裁的双重保障机制。该平台通过智能合约实现争议解决的全流程自动化，确保公正、透明、高效的争议处理。

### ✨ 核心特性

- 🤖 **AI辅助判决**: 集成Gemini AI进行初步案例分析
- 🎲 **公平随机选择**: 使用Fisher-Yates算法随机选择仲裁员面板
- ⚖️ **加权投票系统**: 基于质押金额的权重投票机制
- 📊 **声誉系统**: 动态调整仲裁员声誉，激励公正投票
- 🔗 **Chainlink集成**: 支持Automation和Functions服务
- 🌐 **Web3原生**: 完整的区块链交互和钱包连接
- 📱 **响应式设计**: 适配桌面和移动设备
- 🎨 **统一UI设计**: 一致的颜色方案和组件样式
- 🧭 **直观导航**: 顶部导航栏和移动端底部导航

### 🏗️ 系统架构

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  DisputeRegistry │    │  VerdictManager │    │ RuleSetRegistry │
│                 │    │                 │    │                 │
│ • 争议提交       │    │ • 仲裁员管理     │    │ • 规则集管理     │
│ • 证据管理       │    │ • 面板选择       │    │ • 多司法管辖     │
│ • 状态跟踪       │    │ • 投票系统       │    │ • 版本控制       │
│ • AI判决集成     │    │ • 声誉系统       │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Frontend      │
                    │                 │
                    │ • React/Next.js │
                    │ • Web3集成      │
                    │ • 响应式UI      │
                    │ • 多语言支持    │
                    └─────────────────┘
```

### 🔄 完整工作流程

#### 合约状态流转
```
None → Submitted → EvidencePending → AwaitingAI → AIProposed → Voting → Resolved → Closed
```

#### 详细处理流程

1. **争议提交阶段** (`submitDispute`)
   - 用户选择适用的规则集 (General/Smart Contract/DAO Governance)
   - 填写争议详情和上传案例文档到IPFS
   - 合约记录争议基本信息
   - 状态: `None` → `Submitted`

2. **证据收集阶段** (`addEvidence`)
   - 争议双方可以提交补充证据
   - 证据文件上传到IPFS并记录哈希
   - 支持多种文件格式 (PDF, DOC, TXT, 图片等)
   - 状态: `Submitted` → `EvidencePending`

3. **AI分析阶段** (`attachAIVerdict`)
   - Chainlink Functions调用Gemini AI分析案例
   - AI基于证据和规则集提供判决建议
   - 包含置信度评分和详细推理过程
   - 状态: `EvidencePending` → `AIProposed`

4. **仲裁员投票阶段**
   - **面板选择** (`selectPanel`): 基于声誉和质押权重随机选择3-5名仲裁员
   - **投票过程** (`castVote`): 仲裁员审议证据和AI建议后投票
   - **加权计算**: 投票权重基于仲裁员的质押金额
   - **理由记录**: 每个投票都需要提供详细理由
   - 状态: `AIProposed` → `Voting`

5. **判决执行阶段** (`finalize`)
   - 投票期结束后计算加权投票结果
   - 生成最终判决和执行方案
   - 更新仲裁员声誉评分
   - 分发奖励和执行惩罚
   - 状态: `Voting` → `Resolved` → `Closed`

### 🎨 UI/UX 改进

#### 统一的颜色方案
- **主色调**: Purple-600 (紫色) - 用于主要操作按钮
- **次要色**: Slate-700 (深灰) - 用于次要操作按钮
- **信息色**: Blue-600 (蓝色) - 用于信息提示按钮
- **成功色**: Green-600 (绿色) - 用于成功状态按钮
- **警告色**: Yellow-600 (黄色) - 用于警告状态按钮
- **危险色**: Red-600 (红色) - 用于危险操作按钮

#### 导航系统
- **顶部导航**: 包含Logo、主要功能链接、Web3连接和语言切换
- **底部导航**: 移动端友好的快速访问导航
- **面包屑导航**: 清晰的页面层级指示

#### 响应式设计
- **桌面端**: 完整的功能布局和详细信息展示
- **移动端**: 优化的触摸界面和简化的操作流程
- **平板端**: 自适应的中等屏幕布局

#### 完整的页面系统
- **主页** (`/`) - 项目介绍和快速导航
- **争议提交** (`/dispute/new`) - 完整的争议提交表单，支持IPFS文件上传
- **争议详情** (`/dispute/[id]`) - 争议详情展示和状态跟踪
- **争议历史** (`/dispute/history`) - 历史争议列表和筛选
- **仲裁员注册** (`/arbiter/register`) - 仲裁员注册和质押流程
- **仲裁员仪表板** (`/arbiter/dashboard`) - 仲裁员工作台和统计信息
- **仲裁面板** (`/arbiter/panel/[id]`) - 投票界面和案例审议
- **组件演示** (`/demo`) - UI组件展示和使用方法

#### 合约集成状态
- ✅ **争议提交**: 完整的合约调用和IPFS集成
- ✅ **仲裁员注册**: 质押机制和权限管理
- ✅ **投票系统**: 加权投票和共识机制
- ✅ **状态管理**: 7个状态的完整生命周期
- ✅ **AI集成**: Chainlink Functions集成准备

### 🚀 快速开始

#### 环境要求

- Node.js >= 18.0.0
- npm 或 yarn
- MetaMask 钱包
- 测试网ETH (Sepolia推荐)

#### 安装步骤

1. **克隆项目**
   ```bash
   git clone https://github.com/your-username/ai-judgedao.git
   cd ai-judgedao
   ```

2. **安装依赖**
   ```bash
   cd frontend
   npm install
   ```

3. **配置环境变量**
   ```bash
   cp .env.example .env.local
   ```
   
   编辑 `.env.local` 文件：
   ```env
   NEXT_PUBLIC_DISPUTE_REGISTRY_ADDRESS=0x...
   NEXT_PUBLIC_VERDICT_MANAGER_ADDRESS=0x...
   NEXT_PUBLIC_RULE_SET_REGISTRY_ADDRESS=0x...
   NEXT_PUBLIC_CHAIN_ID=11155111
   ```

4. **启动开发服务器**
   ```bash
   npm run dev
   ```

5. **访问应用**
   
   打开浏览器访问 `http://localhost:3000`

#### 合约部署

1. **编译合约**
   ```bash
   # 使用 Hardhat 或 Foundry
   npx hardhat compile
   ```

2. **部署到测试网**
   ```bash
   npx hardhat run scripts/deploy.js --network sepolia
   ```

3. **更新合约地址**
   
   将部署后的合约地址更新到 `.env.local` 文件中

### 📁 项目结构

```
ai-judgedao/
├── contract/                 # 智能合约
│   ├── DisputeRegistry.sol   # 争议注册合约
│   ├── VerdictManager.sol    # 判决管理合约
│   ├── RuleSetRegistry.sol   # 规则集注册合约
│   └── DisputeStatusLib.sol  # 状态库
├── frontend/                 # 前端应用
│   ├── app/                  # Next.js 应用路由
│   ├── components/           # React 组件
│   ├── lib/                  # 工具库
│   ├── types/                # TypeScript 类型
│   └── public/               # 静态资源
└── docs/                     # 项目文档
```

### 🛠️ 技术栈

**区块链层**
- Solidity ^0.8.20
- OpenZeppelin Contracts
- Chainlink (Automation, Functions)

**前端层**
- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- Ethers.js 6

**开发工具**
- Hardhat / Foundry
- ESLint
- Prettier

### 🧪 测试

```bash
# 运行前端测试
cd frontend
npm run test

# 运行合约测试
npx hardhat test

# 类型检查
npm run type-check

# 代码覆盖率
npm run test:coverage
```

### 🚀 部署指南

#### 测试网部署 (Sepolia)

1. **准备工作**
   ```bash
   # 获取测试ETH
   # 访问 https://sepoliafaucet.com/

   # 配置私钥 (请勿在生产环境中使用)
   export PRIVATE_KEY="your_private_key_here"
   ```

2. **部署合约**
   ```bash
   # 部署所有合约
   npx hardhat run scripts/deploy-all.js --network sepolia

   # 验证合约
   npx hardhat verify --network sepolia DEPLOYED_ADDRESS
   ```

3. **配置前端**
   ```bash
   # 更新环境变量
   echo "NEXT_PUBLIC_DISPUTE_REGISTRY_ADDRESS=0x..." >> .env.local
   echo "NEXT_PUBLIC_VERDICT_MANAGER_ADDRESS=0x..." >> .env.local
   ```

#### 主网部署

⚠️ **警告**: 主网部署需要真实的ETH，请确保充分测试后再部署

```bash
# 使用多重签名钱包
# 进行安全审计
# 设置时间锁
npx hardhat run scripts/deploy-mainnet.js --network mainnet
```

### 🔧 故障排除

#### 常见问题

**Q: MetaMask连接失败**
```bash
A: 检查网络配置，确保选择了正确的测试网络
   清除浏览器缓存和MetaMask缓存
```

**Q: 合约调用失败**
```bash
A: 检查合约地址是否正确
   确保钱包有足够的ETH支付gas费
   检查合约是否已正确部署
```

**Q: 前端页面空白**
```bash
A: 检查控制台错误信息
   确保所有环境变量已正确配置
   重新安装依赖: rm -rf node_modules && npm install
```

#### 调试技巧

```bash
# 启用详细日志
DEBUG=* npm run dev

# 检查合约状态
npx hardhat console --network sepolia

# 监听合约事件
npx hardhat run scripts/listen-events.js --network sepolia
```

### 📚 API文档

#### 合约接口

**DisputeRegistry**
- `submitDispute(address, uint256, string)` - 提交争议
- `addEvidence(uint256, string)` - 添加证据
- `disputes(uint256)` - 查询争议信息

**VerdictManager**
- `registerArbiter(uint256)` - 注册仲裁员
- `selectPanel(uint256)` - 选择仲裁员面板
- `castVote(uint256, bool, uint256, string)` - 投票
- `finalize(uint256)` - 最终化判决

#### REST API

- `POST /api/dispute/submit` - 提交争议
- `POST /api/arbiter/register` - 注册仲裁员
- `POST /api/panel/select` - 选择面板
- `POST /api/vote/cast` - 投票
- `POST /api/verdict/finalize` - 最终化判决

### 🔒 安全注意事项

- 🔐 **私钥安全**: 永远不要在代码中硬编码私钥
- 🛡️ **合约审计**: 主网部署前进行专业安全审计
- 🔍 **权限管理**: 使用多重签名钱包管理关键权限
- ⏰ **时间锁**: 重要操作设置时间锁延迟
- 📊 **监控**: 部署后持续监控合约状态

### 🗺️ 路线图

#### Phase 1 - 核心功能 ✅
- [x] 基础争议提交和管理
- [x] 仲裁员注册和选择
- [x] 投票和判决系统
- [x] Web3集成

#### Phase 2 - 增强功能 🚧
- [ ] Chainlink VRF集成
- [ ] IPFS存储优化
- [ ] 移动端应用
- [ ] 多链支持

#### Phase 3 - 生态建设 📋
- [ ] DAO治理代币
- [ ] 质押奖励机制
- [ ] 合作伙伴集成
- [ ] 开发者API

### 🤝 贡献指南

我们欢迎所有形式的贡献！

#### 如何贡献

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

#### 贡献类型

- 🐛 Bug修复
- ✨ 新功能开发
- 📚 文档改进
- 🎨 UI/UX优化
- 🧪 测试用例
- 🌐 国际化翻译

### 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

### 🙏 致谢

- [OpenZeppelin](https://openzeppelin.com/) - 安全的智能合约库
- [Chainlink](https://chain.link/) - 去中心化预言机网络
- [Next.js](https://nextjs.org/) - React 全栈框架
- [Ethers.js](https://ethers.org/) - 以太坊JavaScript库

### 📞 联系方式

- 项目链接: [https://github.com/your-username/ai-judgedao](https://github.com/your-username/ai-judgedao)
- 问题反馈: [Issues](https://github.com/your-username/ai-judgedao/issues)
- 讨论区: [Discussions](https://github.com/your-username/ai-judgedao/discussions)

---

## English

### 📖 Project Overview

AIJudgeDAO is a blockchain-based decentralized AI arbitration platform that combines artificial intelligence analysis with human arbitration for dual-layer protection. The platform automates the entire dispute resolution process through smart contracts, ensuring fair, transparent, and efficient dispute handling.

### ✨ Key Features

- 🤖 **AI-Assisted Judgment**: Integrated Gemini AI for preliminary case analysis
- 🎲 **Fair Random Selection**: Fisher-Yates algorithm for random arbiter panel selection
- ⚖️ **Weighted Voting System**: Stake-based weighted voting mechanism
- 📊 **Reputation System**: Dynamic arbiter reputation adjustment to incentivize fair voting
- 🔗 **Chainlink Integration**: Support for Automation and Functions services
- 🌐 **Web3 Native**: Complete blockchain interaction and wallet connectivity
- 📱 **Responsive Design**: Desktop and mobile device compatibility

### 🏗️ System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  DisputeRegistry │    │  VerdictManager │    │ RuleSetRegistry │
│                 │    │                 │    │                 │
│ • Dispute Submit │    │ • Arbiter Mgmt  │    │ • Rule Mgmt     │
│ • Evidence Mgmt  │    │ • Panel Select  │    │ • Multi-Jurisd  │
│ • Status Tracking│    │ • Voting System │    │ • Version Ctrl  │
│ • AI Integration │    │ • Reputation    │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Frontend      │
                    │                 │
                    │ • React/Next.js │
                    │ • Web3 Integration│
                    │ • Responsive UI │
                    │ • Multi-language│
                    └─────────────────┘
```

### 🔄 Workflow

1. **Dispute Submission** → Users submit dispute cases and related evidence
2. **AI Analysis** → Gemini AI performs preliminary case analysis
3. **Panel Selection** → Random selection of qualified arbiter panel
4. **Voting Phase** → Arbiters cast weighted votes with reasoning
5. **Verdict Generation** → Vote tallying and final verdict generation
6. **Reputation Update** → Arbiter reputation update based on voting consensus

### 🚀 Quick Start

#### Prerequisites

- Node.js >= 18.0.0
- npm or yarn
- MetaMask wallet
- Testnet ETH (Sepolia recommended)

#### Installation

1. **Clone Repository**
   ```bash
   git clone https://github.com/your-username/ai-judgedao.git
   cd ai-judgedao
   ```

2. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Configure Environment**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local`:
   ```env
   NEXT_PUBLIC_DISPUTE_REGISTRY_ADDRESS=0x...
   NEXT_PUBLIC_VERDICT_MANAGER_ADDRESS=0x...
   NEXT_PUBLIC_RULE_SET_REGISTRY_ADDRESS=0x...
   NEXT_PUBLIC_CHAIN_ID=11155111
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Access Application**
   
   Open browser and visit `http://localhost:3000`

#### Contract Deployment

1. **Compile Contracts**
   ```bash
   # Using Hardhat or Foundry
   npx hardhat compile
   ```

2. **Deploy to Testnet**
   ```bash
   npx hardhat run scripts/deploy.js --network sepolia
   ```

3. **Update Contract Addresses**
   
   Update deployed contract addresses in `.env.local`

### 📁 Project Structure

```
ai-judgedao/
├── contract/                 # Smart Contracts
│   ├── DisputeRegistry.sol   # Dispute Registry Contract
│   ├── VerdictManager.sol    # Verdict Manager Contract
│   ├── RuleSetRegistry.sol   # Rule Set Registry Contract
│   └── DisputeStatusLib.sol  # Status Library
├── frontend/                 # Frontend Application
│   ├── app/                  # Next.js App Router
│   ├── components/           # React Components
│   ├── lib/                  # Utility Libraries
│   ├── types/                # TypeScript Types
│   └── public/               # Static Assets
└── docs/                     # Project Documentation
```

### 🛠️ Tech Stack

**Blockchain Layer**
- Solidity ^0.8.20
- OpenZeppelin Contracts
- Chainlink (Automation, Functions)

**Frontend Layer**
- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- Ethers.js 6

**Development Tools**
- Hardhat / Foundry
- ESLint
- Prettier

### 🧪 Testing

```bash
# Run frontend tests
cd frontend
npm run test

# Run contract tests
npx hardhat test

# Type checking
npm run type-check

# Code coverage
npm run test:coverage
```

### 🚀 Deployment Guide

#### Testnet Deployment (Sepolia)

1. **Preparation**
   ```bash
   # Get test ETH
   # Visit https://sepoliafaucet.com/

   # Configure private key (DO NOT use in production)
   export PRIVATE_KEY="your_private_key_here"
   ```

2. **Deploy Contracts**
   ```bash
   # Deploy all contracts
   npx hardhat run scripts/deploy-all.js --network sepolia

   # Verify contracts
   npx hardhat verify --network sepolia DEPLOYED_ADDRESS
   ```

3. **Configure Frontend**
   ```bash
   # Update environment variables
   echo "NEXT_PUBLIC_DISPUTE_REGISTRY_ADDRESS=0x..." >> .env.local
   echo "NEXT_PUBLIC_VERDICT_MANAGER_ADDRESS=0x..." >> .env.local
   ```

#### Mainnet Deployment

⚠️ **Warning**: Mainnet deployment requires real ETH. Ensure thorough testing before deployment.

```bash
# Use multi-signature wallet
# Conduct security audit
# Set up timelock
npx hardhat run scripts/deploy-mainnet.js --network mainnet
```

### 🔧 Troubleshooting

#### Common Issues

**Q: MetaMask connection failed**
```bash
A: Check network configuration, ensure correct testnet is selected
   Clear browser cache and MetaMask cache
```

**Q: Contract call failed**
```bash
A: Verify contract address is correct
   Ensure wallet has sufficient ETH for gas fees
   Check if contract is properly deployed
```

**Q: Frontend shows blank page**
```bash
A: Check console for error messages
   Ensure all environment variables are configured
   Reinstall dependencies: rm -rf node_modules && npm install
```

#### Debugging Tips

```bash
# Enable verbose logging
DEBUG=* npm run dev

# Check contract state
npx hardhat console --network sepolia

# Listen to contract events
npx hardhat run scripts/listen-events.js --network sepolia
```

### 📚 API Documentation

#### Contract Interfaces

**DisputeRegistry**
- `submitDispute(address, uint256, string)` - Submit dispute
- `addEvidence(uint256, string)` - Add evidence
- `disputes(uint256)` - Query dispute info

**VerdictManager**
- `registerArbiter(uint256)` - Register arbiter
- `selectPanel(uint256)` - Select arbiter panel
- `castVote(uint256, bool, uint256, string)` - Cast vote
- `finalize(uint256)` - Finalize verdict

#### REST API

- `POST /api/dispute/submit` - Submit dispute
- `POST /api/arbiter/register` - Register arbiter
- `POST /api/panel/select` - Select panel
- `POST /api/vote/cast` - Cast vote
- `POST /api/verdict/finalize` - Finalize verdict

### 🔒 Security Considerations

- 🔐 **Private Key Security**: Never hardcode private keys in code
- 🛡️ **Contract Auditing**: Conduct professional security audits before mainnet deployment
- 🔍 **Permission Management**: Use multi-signature wallets for critical permissions
- ⏰ **Timelock**: Set timelock delays for important operations
- 📊 **Monitoring**: Continuously monitor contract status after deployment

### 🗺️ Roadmap

#### Phase 1 - Core Features ✅
- [x] Basic dispute submission and management
- [x] Arbiter registration and selection
- [x] Voting and verdict system
- [x] Web3 integration

#### Phase 2 - Enhanced Features 🚧
- [ ] Chainlink VRF integration
- [ ] IPFS storage optimization
- [ ] Mobile application
- [ ] Multi-chain support

#### Phase 3 - Ecosystem Building 📋
- [ ] DAO governance token
- [ ] Staking reward mechanism
- [ ] Partner integrations
- [ ] Developer API

### 🤝 Contributing

We welcome all forms of contributions!

#### How to Contribute

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

#### Contribution Types

- 🐛 Bug fixes
- ✨ New feature development
- 📚 Documentation improvements
- 🎨 UI/UX optimization
- 🧪 Test cases
- 🌐 Internationalization

### 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

### 🙏 Acknowledgments

- [OpenZeppelin](https://openzeppelin.com/) - Secure smart contract library
- [Chainlink](https://chain.link/) - Decentralized oracle network
- [Next.js](https://nextjs.org/) - React full-stack framework
- [Ethers.js](https://ethers.org/) - Ethereum JavaScript library

### 📞 Contact

- Project Link: [https://github.com/your-username/ai-judgedao](https://github.com/your-username/ai-judgedao)
- Report Issues: [Issues](https://github.com/your-username/ai-judgedao/issues)
- Discussions: [Discussions](https://github.com/your-username/ai-judgedao/discussions)

---

<div align="center">

**Built with ❤️ for the decentralized future**

*为去中心化的未来而构建*

</div>
