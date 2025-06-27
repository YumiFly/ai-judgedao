# Contributing to AIJudgeDAO

*[English](#english) | [中文](#中文)*

---

## 中文

### 🎯 贡献指南

感谢您对AIJudgeDAO项目的关注！我们欢迎各种形式的贡献，无论是代码、文档、设计还是想法。

### 📋 贡献类型

#### 🐛 Bug报告
- 使用清晰的标题描述问题
- 提供详细的重现步骤
- 包含错误截图或日志
- 说明预期行为和实际行为

#### ✨ 功能请求
- 描述功能的用途和价值
- 提供详细的使用场景
- 考虑实现的复杂性
- 讨论可能的替代方案

#### 🔧 代码贡献
- Fork项目并创建分支
- 遵循代码规范
- 添加必要的测试
- 更新相关文档

### 🛠️ 开发环境设置

1. **Fork并克隆项目**
   ```bash
   git clone https://github.com/your-username/ai-judgedao.git
   cd ai-judgedao
   ```

2. **安装依赖**
   ```bash
   cd frontend
   npm install
   ```

3. **设置开发环境**
   ```bash
   cp .env.example .env.local
   # 配置必要的环境变量
   ```

4. **运行开发服务器**
   ```bash
   npm run dev
   ```

### 📝 代码规范

#### JavaScript/TypeScript
```javascript
// 使用有意义的变量名
const disputeId = 123
const arbiterAddress = "0x..."

// 添加类型注解
interface DisputeData {
  id: number
  status: DisputeStatus
}

// 使用async/await而不是Promise链
async function submitDispute(data: DisputeData): Promise<void> {
  try {
    const result = await contractHelpers.submitDispute(data)
    console.log('Dispute submitted:', result)
  } catch (error) {
    console.error('Failed to submit dispute:', error)
  }
}
```

#### Solidity
```solidity
// 使用明确的可见性修饰符
function submitDispute(
    address respondent,
    uint256 ruleSetId,
    string calldata caseURI
) external returns (uint256 id) {
    // 实现逻辑
}

// 添加详细的注释
/**
 * @notice 提交新的争议案例
 * @param respondent 被申请人地址
 * @param ruleSetId 适用的规则集ID
 * @param caseURI 案例描述的IPFS URI
 * @return id 生成的争议ID
 */
```

### 🧪 测试要求

#### 前端测试
```bash
# 运行所有测试
npm run test

# 运行特定测试文件
npm run test -- DisputeForm.test.tsx

# 生成覆盖率报告
npm run test:coverage
```

#### 合约测试
```bash
# 运行合约测试
npx hardhat test

# 运行特定测试
npx hardhat test test/DisputeRegistry.test.js

# 生成gas报告
REPORT_GAS=true npx hardhat test
```

### 📚 文档要求

- 所有公共函数必须有JSDoc注释
- README文件需要保持最新
- 重要的设计决策需要记录
- API变更需要更新文档

### 🔄 提交流程

1. **创建分支**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **提交更改**
   ```bash
   git add .
   git commit -m "feat: add new dispute resolution feature"
   ```

3. **推送分支**
   ```bash
   git push origin feature/your-feature-name
   ```

4. **创建Pull Request**
   - 使用清晰的标题
   - 详细描述更改内容
   - 链接相关的Issue
   - 请求代码审查

### 📋 提交信息规范

使用[Conventional Commits](https://www.conventionalcommits.org/)格式：

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**类型说明：**
- `feat`: 新功能
- `fix`: Bug修复
- `docs`: 文档更新
- `style`: 代码格式化
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

**示例：**
```
feat(arbitration): add weighted voting system

Implement stake-based weighted voting for arbiters
- Add vote weight calculation
- Update voting statistics
- Add reputation system integration

Closes #123
```

### 🎨 UI/UX贡献

- 遵循现有的设计系统
- 确保响应式设计
- 考虑可访问性
- 提供设计稿或原型

### 🌐 国际化贡献

- 翻译文件位于 `frontend/messages/`
- 保持翻译的准确性和一致性
- 考虑文化差异
- 测试不同语言的UI布局

### ❓ 获取帮助

- 查看[Issues](https://github.com/your-username/ai-judgedao/issues)
- 参与[Discussions](https://github.com/your-username/ai-judgedao/discussions)
- 联系维护者

---

## English

### 🎯 Contribution Guidelines

Thank you for your interest in contributing to AIJudgeDAO! We welcome all forms of contributions, whether it's code, documentation, design, or ideas.

### 📋 Types of Contributions

#### 🐛 Bug Reports
- Use clear titles to describe the issue
- Provide detailed reproduction steps
- Include error screenshots or logs
- Explain expected vs actual behavior

#### ✨ Feature Requests
- Describe the purpose and value of the feature
- Provide detailed use cases
- Consider implementation complexity
- Discuss possible alternatives

#### 🔧 Code Contributions
- Fork the project and create a branch
- Follow coding standards
- Add necessary tests
- Update relevant documentation

### 🛠️ Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/ai-judgedao.git
   cd ai-judgedao
   ```

2. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Setup Environment**
   ```bash
   cp .env.example .env.local
   # Configure necessary environment variables
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

### 📝 Coding Standards

#### JavaScript/TypeScript
```javascript
// Use meaningful variable names
const disputeId = 123
const arbiterAddress = "0x..."

// Add type annotations
interface DisputeData {
  id: number
  status: DisputeStatus
}

// Use async/await instead of Promise chains
async function submitDispute(data: DisputeData): Promise<void> {
  try {
    const result = await contractHelpers.submitDispute(data)
    console.log('Dispute submitted:', result)
  } catch (error) {
    console.error('Failed to submit dispute:', error)
  }
}
```

#### Solidity
```solidity
// Use explicit visibility modifiers
function submitDispute(
    address respondent,
    uint256 ruleSetId,
    string calldata caseURI
) external returns (uint256 id) {
    // Implementation logic
}

// Add detailed comments
/**
 * @notice Submit a new dispute case
 * @param respondent Address of the respondent
 * @param ruleSetId ID of the applicable rule set
 * @param caseURI IPFS URI of the case description
 * @return id Generated dispute ID
 */
```

### 🧪 Testing Requirements

#### Frontend Testing
```bash
# Run all tests
npm run test

# Run specific test file
npm run test -- DisputeForm.test.tsx

# Generate coverage report
npm run test:coverage
```

#### Contract Testing
```bash
# Run contract tests
npx hardhat test

# Run specific test
npx hardhat test test/DisputeRegistry.test.js

# Generate gas report
REPORT_GAS=true npx hardhat test
```

### 📚 Documentation Requirements

- All public functions must have JSDoc comments
- README files need to stay current
- Important design decisions need documentation
- API changes require documentation updates

### 🔄 Submission Process

1. **Create Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add new dispute resolution feature"
   ```

3. **Push Branch**
   ```bash
   git push origin feature/your-feature-name
   ```

4. **Create Pull Request**
   - Use clear title
   - Describe changes in detail
   - Link related Issues
   - Request code review

### 📋 Commit Message Convention

Use [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation update
- `style`: Code formatting
- `refactor`: Code refactoring
- `test`: Test related
- `chore`: Build process or auxiliary tool changes

**Example:**
```
feat(arbitration): add weighted voting system

Implement stake-based weighted voting for arbiters
- Add vote weight calculation
- Update voting statistics
- Add reputation system integration

Closes #123
```

### 🎨 UI/UX Contributions

- Follow existing design system
- Ensure responsive design
- Consider accessibility
- Provide design mockups or prototypes

### 🌐 Internationalization Contributions

- Translation files located in `frontend/messages/`
- Maintain translation accuracy and consistency
- Consider cultural differences
- Test UI layout with different languages

### ❓ Getting Help

- Check [Issues](https://github.com/your-username/ai-judgedao/issues)
- Join [Discussions](https://github.com/your-username/ai-judgedao/discussions)
- Contact maintainers

---

<div align="center">

**Thank you for contributing to AIJudgeDAO! 🙏**

*感谢您为AIJudgeDAO做出贡献！*

</div>
