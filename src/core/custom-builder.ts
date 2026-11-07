/**
 * Veilkit - Custom Skeleton Builder & Declarative Layout Engine
 * Allows developers to create custom skeleton layouts matching their website's exact UI structure.
 */

import {
  CustomSkeletonConfig,
  CustomSkeletonNode,
  SkeletonProps,
} from './types';
import { createSkeletonElement } from './primitives';
import { injectStyles } from './css';

export function createCustomSkeleton(config: CustomSkeletonConfig): HTMLElement {
  injectStyles();
  const root = document.createElement('div');
  root.className = `veil-custom-skeleton ${config.className || ''}`.trim();
  root.setAttribute('role', 'status');
  root.setAttribute('aria-busy', 'true');
  root.setAttribute('aria-label', 'Loading content');

  if (config.theme) {
    if (typeof config.theme === 'string') {
      root.setAttribute('data-veil-theme', config.theme);
    }
  }

  root.style.display = 'flex';
  root.style.flexDirection = 'column';
  root.style.gap = typeof config.gap === 'number' ? `${config.gap}px` : (config.gap || '12px');
  root.style.width = '100%';

  if (config.style) {
    Object.assign(root.style, config.style);
  }

  const baseProps: Partial<SkeletonProps> = {
    animation: config.animation || 'shimmer',
    theme: config.theme,
    direction: config.direction,
  };

  const shapeRadius =
    config.shape === 'pill'
      ? '9999px'
      : config.shape === 'square'
      ? '4px'
      : config.shape === 'sharp'
      ? '0px'
      : undefined;

  function renderNode(node: CustomSkeletonNode): HTMLElement {
    const count = node.count || 1;
    const nodeRadius = node.radius ? (typeof node.radius === 'number' ? `${node.radius}px` : node.radius) : shapeRadius;

    if (node.type === 'row' || node.type === 'col' || node.type === 'card') {
      const container = document.createElement('div');
      container.className = `veil-layout-${node.type} ${node.className || ''}`.trim();
      container.style.display = 'flex';
      container.style.flexDirection = node.type === 'row' ? 'row' : 'column';
      container.style.gap = typeof node.gap === 'number' ? `${node.gap}px` : (node.gap || '12px');
      container.style.width = node.width ? (typeof node.width === 'number' ? `${node.width}px` : node.width) : '100%';

      if (node.height) {
        container.style.height = typeof node.height === 'number' ? `${node.height}px` : node.height;
      }

      if (node.align === 'center') {
        container.style.alignItems = 'center';
      } else if (node.align === 'end') {
        container.style.alignItems = 'flex-end';
      } else if (node.align === 'between') {
        container.style.justifyContent = 'space-between';
      }

      if (node.type === 'card') {
        container.style.padding = '16px';
        container.style.borderRadius = nodeRadius || '12px';
        container.style.background = 'var(--veil-card-bg, rgba(255, 255, 255, 0.03))';
        container.style.border = '1px solid var(--veil-card-border, rgba(255, 255, 255, 0.08))';
      }

      if (node.style) {
        Object.assign(container.style, node.style);
      }

      if (node.children) {
        for (const child of node.children) {
          container.appendChild(renderNode(child));
        }
      }
      return container;
    }

    if (count > 1) {
      const group = document.createElement('div');
      group.style.display = 'flex';
      group.style.flexDirection = 'column';
      group.style.gap = typeof node.gap === 'number' ? `${node.gap}px` : (node.gap || '8px');
      group.style.width = '100%';
      for (let i = 0; i < count; i++) {
        const item = renderSingleLeaf(node, nodeRadius);
        group.appendChild(item);
      }
      return group;
    }

    return renderSingleLeaf(node, nodeRadius);
  }

  function renderSingleLeaf(node: CustomSkeletonNode, nodeRadius?: string): HTMLElement {
    let primitiveType: any = 'rect';
    let width = node.width;
    let height = node.height;
    let radius = nodeRadius;

    switch (node.type) {
      case 'avatar':
        primitiveType = 'circle';
        width = width || 44;
        height = height || 44;
        radius = '50%';
        break;
      case 'heading':
        primitiveType = 'heading';
        width = width || '70%';
        height = height || 24;
        radius = radius || '6px';
        break;
      case 'line':
        primitiveType = 'line';
        width = width || '100%';
        height = height || 14;
        radius = radius || '4px';
        break;
      case 'button':
        primitiveType = 'button';
        width = width || 120;
        height = height || 40;
        radius = radius || '8px';
        break;
      case 'badge':
        primitiveType = 'badge';
        width = width || 64;
        height = height || 22;
        radius = radius || '9999px';
        break;
      case 'image':
      case 'rect':
      default:
        primitiveType = 'rect';
        width = width || '100%';
        height = height || 160;
        radius = radius || '8px';
        break;
    }

    const el = createSkeletonElement({
      ...baseProps,
      type: primitiveType,
      width,
      height,
      radius,
      style: node.style,
      className: node.className,
    });
    return el;
  }

  for (const node of config.nodes) {
    root.appendChild(renderNode(node));
  }

  return root;
}

export class SkeletonBuilder {
  private config: CustomSkeletonConfig;

  constructor(options?: Partial<CustomSkeletonConfig>) {
    this.config = {
      nodes: [],
      animation: options?.animation || 'shimmer',
      theme: options?.theme || 'auto',
      shape: options?.shape || 'rounded',
      direction: options?.direction,
      gap: options?.gap || 12,
      className: options?.className,
      style: options?.style,
    };
  }

  row(builderFn: (row: SkeletonBuilder) => void, gap?: number | string): this {
    const sub = new SkeletonBuilder();
    builderFn(sub);
    this.config.nodes.push({
      type: 'row',
      gap,
      children: sub.config.nodes,
    });
    return this;
  }

  col(builderFn: (col: SkeletonBuilder) => void, gap?: number | string): this {
    const sub = new SkeletonBuilder();
    builderFn(sub);
    this.config.nodes.push({
      type: 'col',
      gap,
      children: sub.config.nodes,
    });
    return this;
  }

  card(builderFn: (card: SkeletonBuilder) => void, gap?: number | string): this {
    const sub = new SkeletonBuilder();
    builderFn(sub);
    this.config.nodes.push({
      type: 'card',
      gap,
      children: sub.config.nodes,
    });
    return this;
  }

  avatar(size: number | string = 44): this {
    this.config.nodes.push({ type: 'avatar', width: size, height: size });
    return this;
  }

  heading(width: number | string = '65%', height: number | string = 24): this {
    this.config.nodes.push({ type: 'heading', width, height });
    return this;
  }

  lines(count: number = 3, gap: number | string = 8): this {
    this.config.nodes.push({ type: 'line', count, gap });
    return this;
  }

  button(width: number | string = 120, height: number | string = 40): this {
    this.config.nodes.push({ type: 'button', width, height });
    return this;
  }

  rect(width: number | string = '100%', height: number | string = 160, radius?: number | string): this {
    this.config.nodes.push({ type: 'rect', width, height, radius });
    return this;
  }

  badge(width: number | string = 70, height: number | string = 22): this {
    this.config.nodes.push({ type: 'badge', width, height });
    return this;
  }

  toConfig(): CustomSkeletonConfig {
    return this.config;
  }

  build(): HTMLElement {
    return createCustomSkeleton(this.config);
  }

  toCode(framework: 'react' | 'vue' | 'svelte' | 'angular' | 'html' = 'react'): string {
    if (framework === 'react') {
      return `import { Skeleton, SkeletonGroup } from 'veilkit/react';

export function CustomSkeleton() {
  return (
    <SkeletonGroup animation="${this.config.animation || 'shimmer'}" theme="${this.config.theme || 'auto'}">
      ${JSON.stringify(this.config.nodes, null, 2)}
    </SkeletonGroup>
  );
}`;
    }
    return JSON.stringify(this.config, null, 2);
  }
}
