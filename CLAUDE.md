# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个专注于Paper.js学习的Storybook项目，使用React + TypeScript构建。项目主要目的是通过Storybook创建Paper.js相关的组件和示例。

## 关键命令

### 开发和构建
- `pnpm dev` - 启动Vite开发服务器
- `pnpm build` - TypeScript编译 + Vite生产构建
- `pnpm preview` - 预览生产构建

### Storybook
- `pnpm storybook` - 启动Storybook开发服务器（端口6006）
- `pnpm build-storybook` - 构建Storybook静态文件

### 代码质量
- `pnpm lint` - 运行ESLint检查（包含TypeScript规则，零警告策略）

## 技术架构

### 核心技术栈
- **构建工具**: Vite + React Plugin
- **UI库**: React 18 + TypeScript
- **样式**: Less + CSS
- **文档**: Storybook 9.0.18 with React-Vite框架
- **图形库**: Paper.js 0.12.18（核心依赖）

### 项目结构特点
- `src/stories/` - Storybook组件目录，每个组件包含：
  - `index.tsx` - React组件实现
  - `index.stories.ts` - Storybook配置
  - `index.less` - 组件样式
- Storybook使用`react-docgen-typescript`自动生成文档
- 所有story文件使用`satisfies Meta<typeof Component>`模式确保类型安全

### 环境要求
- Node.js版本：v20.13.1
- 包管理器：pnpm（推荐）

### TypeScript配置
- 严格模式启用，包含未使用变量和参数检查
- 使用ES2020目标，支持现代JavaScript特性
- 启用bundler模式模块解析

## 其他
- 任何问题都使用中文进行答复