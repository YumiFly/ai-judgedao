# AIJudgeDAO UI 使用指南

## 🎨 设计系统

### 颜色方案

AIJudgeDAO 使用统一的颜色方案来确保界面的一致性和可用性：

#### 主要颜色
- **Primary (主色调)**: `purple-600` - 用于主要操作按钮
- **Secondary (次要色)**: `slate-700` - 用于次要操作按钮
- **Success (成功色)**: `green-600` - 用于成功状态和确认操作
- **Danger (危险色)**: `red-600` - 用于危险操作和错误状态
- **Warning (警告色)**: `yellow-600` - 用于警告提示
- **Info (信息色)**: `blue-600` - 用于信息提示和链接

#### 中性色
- **Background**: `slate-900` - 主背景色
- **Card Background**: `slate-800/50` - 卡片背景色
- **Border**: `slate-700` - 边框颜色
- **Text Primary**: `white` - 主要文字颜色
- **Text Secondary**: `slate-300` - 次要文字颜色
- **Text Muted**: `slate-400` - 弱化文字颜色

### 按钮样式

#### 使用方法

```tsx
import { Button } from "@/components/ui/button"

// 主要按钮
<Button className="btn-primary">主要操作</Button>

// 次要按钮
<Button className="btn-secondary">次要操作</Button>

// 成功按钮
<Button className="btn-success">确认</Button>

// 危险按钮
<Button className="btn-danger">删除</Button>

// 信息按钮
<Button className="btn-info">了解更多</Button>

// 警告按钮
<Button className="btn-warning">注意</Button>

// 轮廓按钮
<Button className="btn-outline">取消</Button>

// 幽灵按钮
<Button className="btn-ghost">返回</Button>
```

#### 按钮状态

所有按钮都支持以下状态：
- **Normal**: 默认状态
- **Hover**: 鼠标悬停状态
- **Active**: 点击状态
- **Disabled**: 禁用状态

### 卡片组件

#### 标准卡片

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

<Card className="card-dark">
  <CardHeader>
    <CardTitle className="text-white">卡片标题</CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-slate-300">卡片内容</p>
  </CardContent>
</Card>
```

### 表单组件

#### 输入框

```tsx
import { Input } from "@/components/ui/input"

<Input 
  className="input-dark" 
  placeholder="请输入内容..."
/>
```

#### 文本区域

```tsx
import { Textarea } from "@/components/ui/textarea"

<Textarea 
  className="textarea-dark" 
  placeholder="请输入详细描述..."
/>
```

## 🧭 导航系统

### 顶部导航

顶部导航包含以下元素：
- **Logo**: AIJudgeDAO 品牌标识
- **主导航**: 主要功能页面链接
- **Web3连接**: 钱包连接状态和按钮
- **语言切换**: 中英文切换

### 底部导航 (移动端)

移动端底部导航提供快速访问：
- **首页**: 返回主页
- **提交**: 提交争议
- **仲裁员**: 仲裁员注册
- **演示**: 组件演示

### 侧边导航

侧边导航组件提供详细的导航选项和状态信息。

## 📱 响应式设计

### 断点

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### 布局适配

#### 移动端 (< 768px)
- 单列布局
- 底部导航栏
- 简化的操作界面
- 触摸友好的按钮尺寸

#### 平板端 (768px - 1024px)
- 两列布局
- 顶部导航栏
- 中等尺寸的组件

#### 桌面端 (> 1024px)
- 多列布局
- 完整的功能展示
- 详细的信息面板

## 🎯 最佳实践

### 按钮使用

1. **主要操作**: 使用 `btn-primary`
2. **次要操作**: 使用 `btn-secondary` 或 `btn-outline`
3. **危险操作**: 使用 `btn-danger`
4. **确认操作**: 使用 `btn-success`
5. **信息链接**: 使用 `btn-info`

### 颜色使用

1. **保持一致性**: 相同类型的操作使用相同颜色
2. **语义化**: 颜色应该传达正确的语义信息
3. **对比度**: 确保文字和背景有足够的对比度
4. **可访问性**: 考虑色盲用户的使用体验

### 布局原则

1. **层次清晰**: 使用不同的字体大小和颜色建立视觉层次
2. **间距统一**: 使用一致的间距系统
3. **对齐规范**: 保持元素的对齐和平衡
4. **信息分组**: 相关信息放在一起

## 🔧 自定义样式

### 添加新的按钮样式

在 `globals.css` 中添加新的按钮类：

```css
.btn-custom {
  @apply bg-indigo-600 hover:bg-indigo-700 text-white border-transparent;
}
```

### 创建主题变体

可以通过修改 CSS 变量来创建不同的主题：

```css
:root {
  --primary-color: theme('colors.purple.600');
  --secondary-color: theme('colors.slate.700');
  /* 其他颜色变量 */
}
```

## 📋 组件清单

### 已实现的组件

- [x] 按钮组件 (Button)
- [x] 卡片组件 (Card)
- [x] 输入框组件 (Input)
- [x] 文本区域组件 (Textarea)
- [x] 徽章组件 (Badge)
- [x] 导航组件 (Navigation)
- [x] Web3连接组件 (Web3Connect)
- [x] 仲裁员注册组件 (ArbiterRegistration)
- [x] 仲裁面板组件 (ArbitrationPanel)
- [x] 最终判决组件 (FinalVerdictEnhanced)

### 计划中的组件

- [ ] 模态框组件 (Modal)
- [ ] 下拉菜单组件 (Dropdown)
- [ ] 标签页组件 (Tabs)
- [ ] 进度条组件 (Progress)
- [ ] 通知组件 (Toast)
- [ ] 加载组件 (Loading)

## 🎮 演示页面

访问 `/demo` 页面可以查看所有组件的实际效果：

1. **按钮样式演示**: 查看所有按钮样式
2. **Web3连接演示**: 测试钱包连接功能
3. **仲裁员注册演示**: 体验注册流程
4. **仲裁面板演示**: 查看投票界面
5. **最终判决演示**: 查看判决结果展示

## 📞 支持

如果在使用过程中遇到问题或有改进建议，请：

1. 查看 [GitHub Issues](https://github.com/your-username/ai-judgedao/issues)
2. 提交新的 Issue
3. 参与 [Discussions](https://github.com/your-username/ai-judgedao/discussions)

---

*最后更新: 2024年1月*
