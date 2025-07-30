import type { Meta, StoryObj } from '@storybook/react';
import { MultiScope } from './index';

const meta = {
  title: 'Paper.js/MultiScope',
  component: MultiScope,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Paper.js 多 Scope 示例

这个组件演示了如何在同一个 React 应用中使用多个独立的 Paper.js Scope。每个 Scope 都有自己的画布和独立的图形上下文。

### 主要特性：

- **独立的 Scope**：两个独立的 Paper.js Scope，互不干扰
- **不同的内容类型**：一个 Scope 展示几何图形，另一个展示文本和路径
- **独立的动画**：每个 Scope 可以有自己的动画循环
- **资源管理**：正确的 Scope 创建和清理机制

### Scope 的作用：

1. **隔离性**：不同 Scope 中的对象不会相互影响
2. **上下文管理**：每个 Scope 维护自己的工具、视图和项目状态
3. **内存管理**：可以独立地创建和销毁 Scope，避免内存泄漏

### Scope 的方法
- get 是静态方法, 可以通过 id 获取 Scope
- execute 可以执行 js 代码，包括处理为当前 Scope 增加图元
- activate 激活选择的 Scope
- install 用途未知???
- remove 删除 Scope（包括资源），d.ts 文件没有暴露
- clear  仅清理 Scope 资源，d.ts 文件没有暴露

### 技术要点：

**多 Scope 管理**：
\`\`\`typescript
// 创建独立的 Scope
const scope1 = new paper.PaperScope();
const scope2 = new paper.PaperScope();

// 激活特定的 Scope
scope1.activate();
// 在 scope1 中创建对象...

scope2.activate();
// 在 scope2 中创建对象...
\`\`\`

**资源清理**：
\`\`\`typescript
// 组件卸载时清理 Scope
useEffect(() => {
  return () => {
    scope1?.remove();
    scope2?.remove();
  };
}, []);
\`\`\`
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: { type: 'range', min: 400, max: 1200, step: 50 },
      description: 'Canvas 的宽度'
    },
    height: {
      control: { type: 'range', min: 200, max: 600, step: 50 },
      description: 'Canvas 的高度'
    },
    animated: {
      control: 'boolean',
      description: '是否启用动画效果'
    }
  }
} satisfies Meta<typeof MultiScope>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基础示例
export const Default: Story = {
  args: {
    width: 800,
    height: 400,
    animated: true
  }
};
