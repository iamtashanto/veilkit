/**
 * Veilkit - Presets Engine
 * 18 Ready-Made, Customizable, Responsive Skeleton Layout Presets
 * 40 Ready-Made, Customizable, Responsive Skeleton Layout Presets
 * Supports shape styles: rounded | pill | square | sharp | glass
 */

import { PresetProps, SkeletonProps } from './types';
import { PresetProps, SkeletonProps, VeilPresetName } from './types';
import { createSkeletonElement, createSkeletonParagraph } from './primitives';

export const PRESET_NAMES: VeilPresetName[] = [
  'card',
  'product-card',
  'product-grid',
  'list',
  'list-item',
  'table',
  'profile',
  'profile-header',
  'feed-post',
  'article',
  'comment-thread',
  'chat',
  'dashboard',
  'form',
  'media-card',
  'navbar',
  'sidebar',
  'settings-page',
  'product-detail',
  'news-feed',
  'inbox-list',
  'notification-list',
  'order-list',
  'kpi-card',
  'chart-bar',
  'chart-line',
  'chart-pie',
  'search-results',
  'video-player',
  'music-player',
  'stories-row',
  'reels',
  'tabs',
  'calendar',
  'kanban',
  'timeline',
  'map-card',
  'pricing-card',
  'testimonial',
  'faq-accordion',
];

export function createPreset(props: PresetProps): HTMLElement {
  const container = document.createElement('div');
  container.className = `veil-preset veil-preset-${props.name} ${props.className || ''}`.trim();
  container.setAttribute('aria-hidden', 'true');
  container.style.width = props.width !== undefined ? (typeof props.width === 'number' ? `${props.width}px` : props.width) : '100%';
  container.style.boxSizing = 'border-box';

  const shape = props.shape || 'rounded';
  let shapeRadius: string | undefined = undefined;
  if (shape === 'pill') shapeRadius = '9999px';
  else if (shape === 'square') shapeRadius = '4px';
  else if (shape === 'sharp') shapeRadius = '0px';

  if (shape === 'glass') {
    container.style.backdropFilter = 'blur(10px)';
    (container.style as any).webkitBackdropFilter = 'blur(10px)';
    container.style.background = 'rgba(255, 255, 255, 0.08)';
    container.style.border = '1px solid rgba(255, 255, 255, 0.18)';
    container.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.08)';
  }

  const baseProps: SkeletonProps = {
    animation: props.animation,
    theme: props.theme,
    direction: props.direction,
    speed: props.speed,
    radius: shapeRadius,
  };

  switch (props.name) {
    case 'card': {
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '12px';
      container.style.padding = '16px';
      container.style.borderRadius = '12px';
      container.style.borderRadius = shapeRadius || '12px';
      container.style.border = '1px solid rgba(0,0,0,0.08)';

      const img = createSkeletonElement({ ...baseProps, type: 'rect', height: '180px', radius: '8px' });
      const img = createSkeletonElement({ ...baseProps, type: 'rect', height: '180px', radius: shapeRadius || '8px' });
      const title = createSkeletonElement({ ...baseProps, type: 'heading', width: '70%', height: '24px' });
      const text = createSkeletonParagraph(2, baseProps);
      const btn = createSkeletonElement({ ...baseProps, type: 'button', width: '110px', height: '36px' });

      container.append(img, title, text, btn);
      break;
    }

    case 'product-card': {
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '10px';
      container.style.padding = '14px';
      container.style.borderRadius = '12px';
      container.style.borderRadius = shapeRadius || '12px';
      container.style.border = '1px solid rgba(0,0,0,0.06)';

      const img = createSkeletonElement({ ...baseProps, type: 'rect', height: '200px', radius: '10px' });
      const img = createSkeletonElement({ ...baseProps, type: 'rect', height: '200px', radius: shapeRadius || '10px' });
      const badge = createSkeletonElement({ ...baseProps, type: 'badge', width: '50px', height: '18px' });
      const title = createSkeletonElement({ ...baseProps, type: 'line', width: '85%', height: '18px' });
      const price = createSkeletonElement({ ...baseProps, type: 'line', width: '40%', height: '22px' });
      const btn = createSkeletonElement({ ...baseProps, type: 'button', width: '100%', height: '38px' });

      container.append(img, badge, title, price, btn);
      break;
    }

    case 'product-grid': {
      const itemsCount = props.items || 4;
      const cols = props.columns || 2;
      const columns = props.columns || 2;
      container.style.display = 'grid';
      container.style.gridTemplateColumns = `repeat(${cols}, minmax(0, 1fr))`;
      container.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
      container.style.gap = '16px';

      for (let i = 0; i < itemsCount; i++) {
        const item = createPreset({ ...props, name: 'product-card' });
        item.style.setProperty('--veil-stagger-idx', String(i));
        const item = createPreset({ ...props, name: 'product-card', width: '100%' });
        container.appendChild(item);
      }
      break;
    }

    case 'list': {
      const count = props.items || 4;
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '12px';

      for (let i = 0; i < count; i++) {
        const row = createSkeletonElement({ ...baseProps, type: 'line', width: `${95 - (i % 3) * 15}%`, height: '18px' });
        container.appendChild(row);
      }
      break;
    }

    case 'list-item': {
      container.style.display = 'flex';
      container.style.alignItems = 'center';
      container.style.gap = '14px';
      container.style.padding = '10px 0';

      const avatar = createSkeletonElement({ ...baseProps, type: 'circle', width: '44px', height: '44px' });
      const content = document.createElement('div');
      content.style.flex = '1';
      content.style.display = 'flex';
      content.style.flexDirection = 'column';
      content.style.gap = '6px';
      const textGroup = document.createElement('div');
      textGroup.style.display = 'flex';
      textGroup.style.flexDirection = 'column';
      textGroup.style.gap = '6px';
      textGroup.style.flex = '1';

      const title = createSkeletonElement({ ...baseProps, type: 'line', width: '55%', height: '16px' });
      const subtitle = createSkeletonElement({ ...baseProps, type: 'line', width: '35%', height: '12px' });
      content.append(title, subtitle);
      const primary = createSkeletonElement({ ...baseProps, type: 'line', width: '60%', height: '16px' });
      const secondary = createSkeletonElement({ ...baseProps, type: 'line', width: '40%', height: '12px' });

      const action = createSkeletonElement({ ...baseProps, type: 'icon', width: '24px', height: '24px' });
      container.append(avatar, content, action);
      textGroup.append(primary, secondary);
      container.append(avatar, textGroup);
      break;
    }

    case 'list': {
      const count = props.items || 5;
    case 'table': {
      const rows = props.items || 5;
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '8px';
      container.style.padding = '12px';
      container.style.borderRadius = shapeRadius || '8px';
      container.style.border = '1px solid rgba(0,0,0,0.06)';

      for (let i = 0; i < count; i++) {
        const item = createPreset({ ...props, name: 'list-item' });
        item.style.setProperty('--veil-stagger-idx', String(i));
        container.appendChild(item);
      }
      break;
    }
      const header = document.createElement('div');
      header.style.display = 'grid';
      header.style.gridTemplateColumns = '2fr 1fr 1fr 1fr';
      header.style.gap = '12px';
      header.style.paddingBottom = '8px';
      header.style.borderBottom = '2px solid rgba(0,0,0,0.08)';

    case 'table': {
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '10px';
      container.style.width = '100%';

      // Header row
      const headerRow = document.createElement('div');
      headerRow.style.display = 'flex';
      headerRow.style.gap = '16px';
      headerRow.style.paddingBottom = '8px';
      headerRow.style.borderBottom = '2px solid rgba(0,0,0,0.06)';
      const cols = props.columns || 4;
      for (let c = 0; c < cols; c++) {
        const th = createSkeletonElement({ ...baseProps, type: 'line', width: `${100 / cols}%`, height: '20px' });
        headerRow.appendChild(th);
      for (let c = 0; c < 4; c++) {
        header.appendChild(createSkeletonElement({ ...baseProps, type: 'line', height: '16px' }));
      }
      container.appendChild(headerRow);
      container.appendChild(header);

      // Body rows
      const rows = props.items || 5;
      for (let r = 0; r < rows; r++) {
        const row = document.createElement('div');
        row.style.display = 'flex';
        row.style.gap = '16px';
        row.style.display = 'grid';
        row.style.gridTemplateColumns = '2fr 1fr 1fr 1fr';
        row.style.gap = '12px';
        row.style.padding = '8px 0';
        row.style.borderBottom = '1px solid rgba(0,0,0,0.04)';
        for (let c = 0; c < cols; c++) {
          const td = createSkeletonElement({ ...baseProps, type: 'line', width: `${100 / cols}%`, height: '14px' });
          row.appendChild(td);

        for (let c = 0; c < 4; c++) {
          row.appendChild(createSkeletonElement({ ...baseProps, type: 'line', height: '14px' }));
        }
        row.style.setProperty('--veil-stagger-idx', String(r));
        container.appendChild(row);
      }
      break;
    }

    case 'profile': {
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.alignItems = 'center';
      container.style.gap = '12px';
      container.style.gap = '14px';
      container.style.padding = '24px';
      container.style.textAlign = 'center';
      container.style.borderRadius = shapeRadius || '16px';
      container.style.border = '1px solid rgba(0,0,0,0.06)';

      const avatar = createSkeletonElement({ ...baseProps, type: 'circle', width: '80px', height: '80px' });
      const avatar = createSkeletonElement({ ...baseProps, type: 'circle', width: '88px', height: '88px' });
      const name = createSkeletonElement({ ...baseProps, type: 'heading', width: '160px', height: '22px' });
      const bio = createSkeletonParagraph(2, { ...baseProps, width: '240px' });
      const btn = createSkeletonElement({ ...baseProps, type: 'button', width: '120px', height: '36px' });
      const bio = createSkeletonParagraph(2, baseProps);
      const btnGroup = document.createElement('div');
      btnGroup.style.display = 'flex';
      btnGroup.style.gap = '10px';
      btnGroup.append(
        createSkeletonElement({ ...baseProps, type: 'button', width: '100px', height: '34px' }),
        createSkeletonElement({ ...baseProps, type: 'button', width: '100px', height: '34px' }),
      );

      container.append(avatar, name, bio, btn);
      container.append(avatar, name, bio, btnGroup);
      break;
    }

    case 'profile-header': {
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '16px';
      container.style.borderRadius = shapeRadius || '16px';
      container.style.overflow = 'hidden';
      container.style.border = '1px solid rgba(0,0,0,0.06)';

      const cover = createSkeletonElement({ ...baseProps, type: 'rect', height: '140px', radius: '10px' });
      const userRow = document.createElement('div');
      userRow.style.display = 'flex';
      userRow.style.alignItems = 'flex-end';
      userRow.style.gap = '16px';
      userRow.style.marginTop = '-40px';
      userRow.style.paddingLeft = '20px';
      const banner = createSkeletonElement({ ...baseProps, type: 'rect', height: '140px', radius: '0' });
      const body = document.createElement('div');
      body.style.display = 'flex';
      body.style.alignItems = 'flex-end';
      body.style.gap = '16px';
      body.style.padding = '0 20px 20px 20px';
      body.style.marginTop = '-40px';

      const avatar = createSkeletonElement({ ...baseProps, type: 'circle', width: '72px', height: '72px' });
      avatar.style.border = '4px solid white';
      const avatar = createSkeletonElement({ ...baseProps, type: 'circle', width: '80px', height: '80px' });
      const info = document.createElement('div');
      info.style.display = 'flex';
      info.style.flexDirection = 'column';
      info.style.gap = '6px';
      info.style.flex = '1';
      info.append(
        createSkeletonElement({ ...baseProps, type: 'heading', width: '140px', height: '20px' }),
        createSkeletonElement({ ...baseProps, type: 'line', width: '200px', height: '14px' }),
      );

      const meta = document.createElement('div');
      meta.style.display = 'flex';
      meta.style.flexDirection = 'column';
      meta.style.gap = '6px';
      meta.style.flex = '1';
      const name = createSkeletonElement({ ...baseProps, type: 'heading', width: '140px', height: '20px' });
      const handle = createSkeletonElement({ ...baseProps, type: 'line', width: '90px', height: '14px' });
      meta.append(name, handle);

      userRow.append(avatar, meta);
      const bio = createSkeletonParagraph(2, baseProps);

      container.append(cover, userRow, bio);
      body.append(avatar, info);
      container.append(banner, body);
      break;
    }

    case 'feed-post': {
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '12px';
      container.style.padding = '16px';
      container.style.borderRadius = '12px';
      container.style.border = '1px solid rgba(0,0,0,0.06)';
      container.style.borderRadius = shapeRadius || '12px';
      container.style.border = '1px solid rgba(0,0,0,0.08)';

      const header = document.createElement('div');
      header.style.display = 'flex';
      header.style.alignItems = 'center';
      header.style.gap = '10px';
      const av = createSkeletonElement({ ...baseProps, type: 'circle', width: '40px', height: '40px' });
      const meta = document.createElement('div');
      meta.style.display = 'flex';
      meta.style.flexDirection = 'column';
      meta.style.gap = '4px';
      meta.append(
        createSkeletonElement({ ...baseProps, type: 'line', width: '110px', height: '14px' }),
        createSkeletonElement({ ...baseProps, type: 'line', width: '60px', height: '10px' }),
      header.append(
        createSkeletonElement({ ...baseProps, type: 'circle', width: '40px', height: '40px' }),
        createSkeletonElement({ ...baseProps, type: 'line', width: '120px', height: '16px' }),
      );
      header.append(av, meta);

      const body = createSkeletonParagraph(3, baseProps);
      const media = createSkeletonElement({ ...baseProps, type: 'rect', height: '180px', radius: '8px' });

      const text = createSkeletonParagraph(2, baseProps);
      const media = createSkeletonElement({ ...baseProps, type: 'rect', height: '220px', radius: shapeRadius || '8px' });
      const actions = document.createElement('div');
      actions.style.display = 'flex';
      actions.style.gap = '24px';
      actions.style.gap = '16px';
      actions.append(
        createSkeletonElement({ ...baseProps, type: 'icon', width: '20px', height: '20px' }),
        createSkeletonElement({ ...baseProps, type: 'icon', width: '20px', height: '20px' }),
        createSkeletonElement({ ...baseProps, type: 'icon', width: '20px', height: '20px' }),
        createSkeletonElement({ ...baseProps, type: 'button', width: '60px', height: '28px' }),
        createSkeletonElement({ ...baseProps, type: 'button', width: '60px', height: '28px' }),
      );

      container.append(header, body, media, actions);
      container.append(header, text, media, actions);
      break;
    }

    case 'article': {
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '16px';

      const hero = createSkeletonElement({ ...baseProps, type: 'rect', height: '240px', radius: '10px' });
      const title = createSkeletonElement({ ...baseProps, type: 'heading', width: '80%', height: '32px' });
      const byline = createSkeletonElement({ ...baseProps, type: 'line', width: '30%', height: '14px' });
      const p1 = createSkeletonParagraph(4, baseProps);
      const p2 = createSkeletonParagraph(3, baseProps);
      const title = createSkeletonElement({ ...baseProps, type: 'heading', width: '85%', height: '36px' });
      const meta = document.createElement('div');
      meta.style.display = 'flex';
      meta.style.gap = '12px';
      meta.append(
        createSkeletonElement({ ...baseProps, type: 'circle', width: '32px', height: '32px' }),
        createSkeletonElement({ ...baseProps, type: 'line', width: '140px', height: '14px' }),
      );
      const heroImg = createSkeletonElement({ ...baseProps, type: 'rect', height: '260px', radius: shapeRadius || '10px' });
      const body1 = createSkeletonParagraph(4, baseProps);
      const body2 = createSkeletonParagraph(3, baseProps);

      container.append(hero, title, byline, p1, p2);
      container.append(title, meta, heroImg, body1, body2);
      break;
    }

    case 'comment-thread': {
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '14px';
      container.style.gap = '16px';

      const count = props.items || 3;
      for (let i = 0; i < count; i++) {
        const item = createPreset({ ...props, name: 'list-item' });
        item.style.setProperty('--veil-stagger-idx', String(i));
        container.appendChild(item);
        if (i === 1) {
          // Nested reply
          const reply = createPreset({ ...props, name: 'list-item' });
          reply.style.marginLeft = '40px';
          container.appendChild(reply);
        }
      for (let i = 0; i < 3; i++) {
        const comment = document.createElement('div');
        comment.style.display = 'flex';
        comment.style.gap = '12px';
        if (i === 1) comment.style.marginLeft = '40px';

        const avatar = createSkeletonElement({ ...baseProps, type: 'circle', width: '36px', height: '36px' });
        const body = document.createElement('div');
        body.style.display = 'flex';
        body.style.flexDirection = 'column';
        body.style.gap = '6px';
        body.style.flex = '1';
        body.append(
          createSkeletonElement({ ...baseProps, type: 'line', width: '120px', height: '14px' }),
          createSkeletonParagraph(2, baseProps),
        );

        comment.append(avatar, body);
        container.appendChild(comment);
      }
      break;
    }

    case 'chat': {
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '12px';
      container.style.gap = '14px';
      container.style.padding = '16px';

      const messages = [
        { isSelf: false, width: '60%' },
        { isSelf: true, width: '45%' },
        { isSelf: false, width: '75%' },
        { isSelf: true, width: '50%' },
      const bubbles = [
        { align: 'flex-start', w: '65%' },
        { align: 'flex-end', w: '50%' },
        { align: 'flex-start', w: '80%' },
        { align: 'flex-end', w: '40%' },
      ];

      for (let i = 0; i < messages.length; i++) {
        const msg = messages[i]!;
        const row = document.createElement('div');
        row.style.display = 'flex';
        row.style.gap = '8px';
        row.style.justifyContent = msg.isSelf ? 'flex-end' : 'flex-start';

        if (!msg.isSelf) {
          row.appendChild(createSkeletonElement({ ...baseProps, type: 'circle', width: '28px', height: '28px' }));
        }

        const bubble = createSkeletonElement({
          ...baseProps,
          type: 'rect',
          width: msg.width,
          height: '36px',
          radius: '16px',
        });
        row.appendChild(bubble);

        row.style.setProperty('--veil-stagger-idx', String(i));
        container.appendChild(row);
      for (const b of bubbles) {
        const bubble = document.createElement('div');
        bubble.style.display = 'flex';
        bubble.style.justifyContent = b.align;
        const msg = createSkeletonElement({ ...baseProps, type: 'rect', width: b.w, height: '42px', radius: shapeRadius || '18px' });
        bubble.appendChild(msg);
        container.appendChild(bubble);
      }
      break;
    }

    case 'dashboard': {
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '16px';

      // 4 stat cards
      const statsRow = document.createElement('div');
      statsRow.style.display = 'grid';
      statsRow.style.gridTemplateColumns = 'repeat(auto-fit, minmax(180px, 1fr))';
      statsRow.style.gap = '12px';
      const statGrid = document.createElement('div');
      statGrid.style.display = 'grid';
      statGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
      statGrid.style.gap = '12px';

      for (let i = 0; i < 4; i++) {
        const statCard = document.createElement('div');
        statCard.style.padding = '14px';
        statCard.style.borderRadius = '10px';
        statCard.style.border = '1px solid rgba(0,0,0,0.06)';
        statCard.style.display = 'flex';
        statCard.style.flexDirection = 'column';
        statCard.style.gap = '8px';

        statCard.append(
          createSkeletonElement({ ...baseProps, type: 'line', width: '50%', height: '14px' }),
          createSkeletonElement({ ...baseProps, type: 'heading', width: '70%', height: '24px' }),
      for (let i = 0; i < 3; i++) {
        const stat = document.createElement('div');
        stat.style.padding = '16px';
        stat.style.borderRadius = shapeRadius || '10px';
        stat.style.border = '1px solid rgba(0,0,0,0.06)';
        stat.style.display = 'flex';
        stat.style.flexDirection = 'column';
        stat.style.gap = '8px';
        stat.append(
          createSkeletonElement({ ...baseProps, type: 'line', width: '60%', height: '14px' }),
          createSkeletonElement({ ...baseProps, type: 'heading', width: '80%', height: '28px' }),
        );
        statsRow.appendChild(statCard);
        statGrid.appendChild(stat);
      }

      // 2 chart blocks
      const chartRow = document.createElement('div');
      chartRow.style.display = 'grid';
      chartRow.style.gridTemplateColumns = 'repeat(auto-fit, minmax(280px, 1fr))';
      chartRow.style.gap = '16px';

      const chart1 = createSkeletonElement({ ...baseProps, type: 'rect', height: '220px', radius: '10px' });
      const chart2 = createSkeletonElement({ ...baseProps, type: 'rect', height: '220px', radius: '10px' });
      chartRow.append(chart1, chart2);

      container.append(statsRow, chartRow);
      const chartBlock = createSkeletonElement({ ...baseProps, type: 'rect', height: '200px', radius: shapeRadius || '10px' });
      container.append(statGrid, chartBlock);
      break;
    }

    case 'form': {
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '16px';
      container.style.padding = '20px';
      container.style.borderRadius = '12px';
      container.style.borderRadius = shapeRadius || '12px';
      container.style.border = '1px solid rgba(0,0,0,0.06)';

      const title = createSkeletonElement({ ...baseProps, type: 'heading', width: '40%', height: '26px' });
      container.appendChild(title);

      for (let i = 0; i < 3; i++) {
        const group = document.createElement('div');
        group.style.display = 'flex';
        group.style.flexDirection = 'column';
        group.style.gap = '6px';
        group.append(
          createSkeletonElement({ ...baseProps, type: 'line', width: '25%', height: '12px' }),
          createSkeletonElement({ ...baseProps, type: 'line', width: '30%', height: '14px' }),
          createSkeletonElement({ ...baseProps, type: 'input', width: '100%', height: '40px' }),
        );
        container.appendChild(group);
      }

      const btn = createSkeletonElement({ ...baseProps, type: 'button', width: '140px', height: '40px' });
      container.appendChild(btn);
      const submit = createSkeletonElement({ ...baseProps, type: 'button', width: '140px', height: '40px' });
      container.appendChild(submit);
      break;
    }

    case 'media-card': {
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '10px';
      container.style.gap = '16px';
      container.style.padding = '12px';
      container.style.borderRadius = shapeRadius || '12px';
      container.style.border = '1px solid rgba(0,0,0,0.06)';

      const thumb = createSkeletonElement({ ...baseProps, type: 'rect', height: '180px', radius: '10px' });
      const metaRow = document.createElement('div');
      metaRow.style.display = 'flex';
      metaRow.style.gap = '12px';

      const avatar = createSkeletonElement({ ...baseProps, type: 'circle', width: '38px', height: '38px' });
      const details = document.createElement('div');
      details.style.flex = '1';
      details.style.display = 'flex';
      details.style.flexDirection = 'column';
      details.style.gap = '6px';
      details.append(
        createSkeletonElement({ ...baseProps, type: 'line', width: '85%', height: '16px' }),
        createSkeletonElement({ ...baseProps, type: 'line', width: '50%', height: '12px' }),
      const thumb = createSkeletonElement({ ...baseProps, type: 'rect', width: '140px', height: '90px', radius: shapeRadius || '8px' });
      const meta = document.createElement('div');
      meta.style.display = 'flex';
      meta.style.flexDirection = 'column';
      meta.style.gap = '8px';
      meta.style.flex = '1';
      meta.append(
        createSkeletonElement({ ...baseProps, type: 'heading', width: '80%', height: '18px' }),
        createSkeletonElement({ ...baseProps, type: 'line', width: '60%', height: '14px' }),
        createSkeletonElement({ ...baseProps, type: 'line', width: '40%', height: '12px' }),
      );
      metaRow.append(avatar, details);

      container.append(thumb, metaRow);
      container.append(thumb, meta);
      break;
    }

    case 'navbar': {
      container.style.display = 'flex';
      container.style.alignItems = 'center';
      container.style.justifyContent = 'space-between';
      container.style.padding = '12px 20px';
      container.style.borderBottom = '1px solid rgba(0,0,0,0.06)';
      container.style.borderBottom = '1px solid rgba(0,0,0,0.08)';

      const logo = createSkeletonElement({ ...baseProps, type: 'rect', width: '100px', height: '28px', radius: '6px' });
      const navLinks = document.createElement('div');
      navLinks.style.display = 'flex';
      navLinks.style.gap = '20px';
      const brand = createSkeletonElement({ ...baseProps, type: 'heading', width: '110px', height: '24px' });
      const links = document.createElement('div');
      links.style.display = 'flex';
      links.style.gap = '18px';
      for (let i = 0; i < 4; i++) {
        navLinks.appendChild(createSkeletonElement({ ...baseProps, type: 'line', width: '60px', height: '14px' }));
        links.appendChild(createSkeletonElement({ ...baseProps, type: 'line', width: '60px', height: '14px' }));
      }
      const right = document.createElement('div');
      right.style.display = 'flex';
      right.style.alignItems = 'center';
      right.style.gap = '12px';
      right.append(
        createSkeletonElement({ ...baseProps, type: 'input', width: '140px', height: '32px' }),
        createSkeletonElement({ ...baseProps, type: 'circle', width: '32px', height: '32px' }),
      );

      container.append(logo, navLinks, right);
      const cta = createSkeletonElement({ ...baseProps, type: 'button', width: '90px', height: '34px' });
      container.append(brand, links, cta);
      break;
    }

    case 'sidebar': {
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.justifyContent = 'space-between';
      container.style.padding = '20px 16px';
      container.style.width = '220px';
      container.style.height = '450px';
      container.style.borderRight = '1px solid rgba(0,0,0,0.06)';
      container.style.padding = '18px 14px';
      container.style.height = '100%';
      container.style.minHeight = '320px';
      container.style.borderRight = '1px solid rgba(0,0,0,0.08)';

      const top = document.createElement('div');
      top.style.display = 'flex';
      top.style.flexDirection = 'column';
      top.style.gap = '16px';
      top.appendChild(createSkeletonElement({ ...baseProps, type: 'rect', width: '120px', height: '32px', radius: '6px' }));
      top.appendChild(createSkeletonElement({ ...baseProps, type: 'heading', width: '100px', height: '22px' }));

      for (let i = 0; i < 5; i++) {
        const navItem = document.createElement('div');
        navItem.style.display = 'flex';
        navItem.style.alignItems = 'center';
        navItem.style.gap = '10px';
        navItem.append(
          createSkeletonElement({ ...baseProps, type: 'icon', width: '20px', height: '20px' }),
          createSkeletonElement({ ...baseProps, type: 'line', width: '90px', height: '14px' }),
        );
        top.appendChild(navItem);
      }

      const footer = document.createElement('div');
      footer.style.display = 'flex';
      footer.style.alignItems = 'center';
      footer.style.gap = '10px';
      footer.append(
        createSkeletonElement({ ...baseProps, type: 'circle', width: '36px', height: '36px' }),
        createSkeletonElement({ ...baseProps, type: 'line', width: '80px', height: '14px' }),
      );

      container.append(top, footer);
      break;
    }

    case 'settings-page': {
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '24px';
      container.style.padding = '24px';

      const title = createSkeletonElement({ ...baseProps, type: 'heading', width: '220px', height: '30px' });
      container.appendChild(title);

      for (let i = 0; i < 3; i++) {
        const section = document.createElement('div');
        section.style.display = 'flex';
        section.style.alignItems = 'center';
        section.style.justifyContent = 'space-between';
        section.style.padding = '14px 0';
        section.style.borderBottom = '1px solid rgba(0,0,0,0.06)';

        const textGroup = document.createElement('div');
        textGroup.style.display = 'flex';
        textGroup.style.flexDirection = 'column';
        textGroup.style.gap = '6px';
        textGroup.append(
          createSkeletonElement({ ...baseProps, type: 'line', width: '160px', height: '16px' }),
          createSkeletonElement({ ...baseProps, type: 'line', width: '240px', height: '12px' }),
        );

        const control = createSkeletonElement({ ...baseProps, type: 'button', width: '50px', height: '28px', radius: '14px' });
        section.append(textGroup, control);
        container.appendChild(section);
      }
      break;
    }

    // === NEW PRESETS (19 - 40) ===

    case 'product-detail': {
      container.style.display = 'grid';
      container.style.gridTemplateColumns = '1fr 1.2fr';
      container.style.gap = '24px';
      container.style.padding = '20px';

      const left = document.createElement('div');
      left.style.display = 'flex';
      left.style.flexDirection = 'column';
      left.style.gap = '12px';
      const mainImg = createSkeletonElement({ ...baseProps, type: 'rect', height: '280px', radius: shapeRadius || '12px' });
      const thumbRow = document.createElement('div');
      thumbRow.style.display = 'flex';
      thumbRow.style.gap = '8px';
      for (let i = 0; i < 4; i++) {
        thumbRow.appendChild(createSkeletonElement({ ...baseProps, type: 'rect', width: '60px', height: '60px', radius: '6px' }));
      }
      left.append(mainImg, thumbRow);

      const right = document.createElement('div');
      right.style.display = 'flex';
      right.style.flexDirection = 'column';
      right.style.gap = '14px';
      const title = createSkeletonElement({ ...baseProps, type: 'heading', width: '85%', height: '32px' });
      const rating = createSkeletonElement({ ...baseProps, type: 'badge', width: '120px', height: '20px' });
      const price = createSkeletonElement({ ...baseProps, type: 'heading', width: '100px', height: '28px' });
      const desc = createSkeletonParagraph(3, baseProps);
      const btn = createSkeletonElement({ ...baseProps, type: 'button', width: '180px', height: '44px' });
      right.append(title, rating, price, desc, btn);

      container.append(left, right);
      break;
    }

    case 'news-feed': {
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '16px';

      for (let i = 0; i < 3; i++) {
        const item = document.createElement('div');
        item.style.display = 'flex';
        item.style.gap = '16px';
        item.style.paddingBottom = '16px';
        item.style.borderBottom = '1px solid rgba(0,0,0,0.06)';

        const textCol = document.createElement('div');
        textCol.style.display = 'flex';
        textCol.style.flexDirection = 'column';
        textCol.style.gap = '8px';
        textCol.style.flex = '1';
        textCol.append(
          createSkeletonElement({ ...baseProps, type: 'badge', width: '80px', height: '16px' }),
          createSkeletonElement({ ...baseProps, type: 'heading', width: '90%', height: '20px' }),
          createSkeletonParagraph(2, baseProps),
        );

        const img = createSkeletonElement({ ...baseProps, type: 'rect', width: '120px', height: '90px', radius: shapeRadius || '8px' });
        item.append(textCol, img);
        container.appendChild(item);
      }
      break;
    }

    case 'inbox-list': {
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.border = '1px solid rgba(0,0,0,0.06)';
      container.style.borderRadius = shapeRadius || '8px';

      for (let i = 0; i < 4; i++) {
        const row = document.createElement('div');
        row.style.display = 'flex';
        row.style.alignItems = 'center';
        row.style.gap = '14px';
        row.style.padding = '12px 16px';
        row.style.borderBottom = '1px solid rgba(0,0,0,0.04)';

        const star = createSkeletonElement({ ...baseProps, type: 'icon', width: '18px', height: '18px' });
        const sender = createSkeletonElement({ ...baseProps, type: 'line', width: '120px', height: '14px' });
        const snippet = createSkeletonElement({ ...baseProps, type: 'line', width: '280px', height: '14px' });
        const time = createSkeletonElement({ ...baseProps, type: 'badge', width: '50px', height: '16px' });

        row.append(star, sender, snippet, time);
        container.appendChild(row);
      }
      break;
    }

    case 'notification-list': {
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '10px';

      for (let i = 0; i < 3; i++) {
        const notif = document.createElement('div');
        notif.style.display = 'flex';
        notif.style.alignItems = 'flex-start';
        notif.style.gap = '12px';
        notif.style.padding = '12px';
        notif.style.borderRadius = shapeRadius || '8px';
        notif.style.background = 'rgba(0,0,0,0.02)';

        const dot = createSkeletonElement({ ...baseProps, type: 'circle', width: '10px', height: '10px' });
        dot.style.marginTop = '6px';
        const avatar = createSkeletonElement({ ...baseProps, type: 'circle', width: '38px', height: '38px' });
        const content = document.createElement('div');
        content.style.display = 'flex';
        content.style.flexDirection = 'column';
        content.style.gap = '4px';
        content.style.flex = '1';
        content.append(
          createSkeletonElement({ ...baseProps, type: 'line', width: '75%', height: '14px' }),
          createSkeletonElement({ ...baseProps, type: 'line', width: '40%', height: '12px' }),
        );

        notif.append(dot, avatar, content);
        container.appendChild(notif);
      }
      break;
    }

    case 'order-list': {
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '14px';

      for (let i = 0; i < 2; i++) {
        const order = document.createElement('div');
        order.style.display = 'flex';
        order.style.flexDirection = 'column';
        order.style.gap = '12px';
        order.style.padding = '16px';
        order.style.borderRadius = shapeRadius || '10px';
        order.style.border = '1px solid rgba(0,0,0,0.08)';

        const orderHeader = document.createElement('div');
        orderHeader.style.display = 'flex';
        orderHeader.style.justifyContent = 'space-between';
        orderHeader.append(
          createSkeletonElement({ ...baseProps, type: 'line', width: '140px', height: '16px' }),
          createSkeletonElement({ ...baseProps, type: 'badge', width: '80px', height: '22px' }),
        );

        const itemsRow = document.createElement('div');
        itemsRow.style.display = 'flex';
        itemsRow.style.gap = '10px';
        for (let j = 0; j < 3; j++) {
          itemsRow.appendChild(createSkeletonElement({ ...baseProps, type: 'rect', width: '50px', height: '50px', radius: '6px' }));
        }

        const footer = document.createElement('div');
        footer.style.display = 'flex';
        footer.style.justifyContent = 'space-between';
        footer.style.alignItems = 'center';
        footer.append(
          createSkeletonElement({ ...baseProps, type: 'heading', width: '90px', height: '20px' }),
          createSkeletonElement({ ...baseProps, type: 'button', width: '110px', height: '32px' }),
        );

        order.append(orderHeader, itemsRow, footer);
        container.appendChild(order);
      }
      break;
    }

    case 'kpi-card': {
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '12px';
      container.style.padding = '18px';
      container.style.borderRadius = shapeRadius || '12px';
      container.style.border = '1px solid rgba(0,0,0,0.06)';

      const top = document.createElement('div');
      top.style.display = 'flex';
      top.style.justifyContent = 'space-between';
      top.style.alignItems = 'center';
      top.append(
        createSkeletonElement({ ...baseProps, type: 'line', width: '90px', height: '14px' }),
        createSkeletonElement({ ...baseProps, type: 'icon', width: '20px', height: '20px' }),
      );

      const val = createSkeletonElement({ ...baseProps, type: 'heading', width: '140px', height: '36px' });
      const trend = createSkeletonElement({ ...baseProps, type: 'badge', width: '70px', height: '18px' });

      container.append(top, val, trend);
      break;
    }

    case 'chart-bar': {
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '16px';
      container.style.padding = '18px';
      container.style.borderRadius = shapeRadius || '12px';
      container.style.border = '1px solid rgba(0,0,0,0.06)';

      const head = createSkeletonElement({ ...baseProps, type: 'heading', width: '140px', height: '20px' });
      const barsWrap = document.createElement('div');
      barsWrap.style.display = 'flex';
      barsWrap.style.alignItems = 'flex-end';
      barsWrap.style.justifyContent = 'space-between';
      barsWrap.style.height = '140px';
      barsWrap.style.padding = '0 10px';

      const heights = ['40%', '75%', '55%', '90%', '65%', '80%', '50%'];
      for (const h of heights) {
        const bar = createSkeletonElement({ ...baseProps, type: 'rect', width: '22px', height: h, radius: '4px' });
        barsWrap.appendChild(bar);
      }

      container.append(head, barsWrap);
      break;
    }

    case 'chart-line': {
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '14px';
      container.style.padding = '18px';
      container.style.borderRadius = shapeRadius || '12px';
      container.style.border = '1px solid rgba(0,0,0,0.06)';

      const head = createSkeletonElement({ ...baseProps, type: 'heading', width: '150px', height: '20px' });
      const lineArea = createSkeletonElement({ ...baseProps, type: 'rect', height: '140px', radius: '8px' });
      container.append(head, lineArea);
      break;
    }

    case 'chart-pie': {
      container.style.display = 'flex';
      container.style.alignItems = 'center';
      container.style.gap = '20px';
      container.style.padding = '20px';
      container.style.borderRadius = shapeRadius || '12px';
      container.style.border = '1px solid rgba(0,0,0,0.06)';

      const circle = createSkeletonElement({ ...baseProps, type: 'circle', width: '120px', height: '120px' });
      const legend = document.createElement('div');
      legend.style.display = 'flex';
      legend.style.flexDirection = 'column';
      legend.style.gap = '10px';
      legend.style.flex = '1';

      for (let i = 0; i < 3; i++) {
        const row = document.createElement('div');
        row.style.display = 'flex';
        row.style.alignItems = 'center';
        row.style.gap = '8px';
        row.append(
          createSkeletonElement({ ...baseProps, type: 'circle', width: '12px', height: '12px' }),
          createSkeletonElement({ ...baseProps, type: 'line', width: '90px', height: '14px' }),
        );
        legend.appendChild(row);
      }

      container.append(circle, legend);
      break;
    }

    case 'search-results': {
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '18px';

      const searchInput = createSkeletonElement({ ...baseProps, type: 'input', height: '42px', radius: shapeRadius || '24px' });
      container.appendChild(searchInput);

      for (let i = 0; i < 3; i++) {
        const res = document.createElement('div');
        res.style.display = 'flex';
        res.style.flexDirection = 'column';
        res.style.gap = '6px';
        res.append(
          createSkeletonElement({ ...baseProps, type: 'line', width: '160px', height: '12px' }),
          createSkeletonElement({ ...baseProps, type: 'heading', width: '70%', height: '20px' }),
          createSkeletonParagraph(2, baseProps),
        );
        container.appendChild(res);
      }
      break;
    }

    case 'video-player': {
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '14px';

      const screen = createSkeletonElement({ ...baseProps, type: 'rect', height: '240px', radius: shapeRadius || '12px' });
      const title = createSkeletonElement({ ...baseProps, type: 'heading', width: '80%', height: '24px' });
      const channel = document.createElement('div');
      channel.style.display = 'flex';
      channel.style.alignItems = 'center';
      channel.style.justifyContent = 'space-between';
      const chLeft = document.createElement('div');
      chLeft.style.display = 'flex';
      chLeft.style.alignItems = 'center';
      chLeft.style.gap = '10px';
      chLeft.append(
        createSkeletonElement({ ...baseProps, type: 'circle', width: '40px', height: '40px' }),
        createSkeletonElement({ ...baseProps, type: 'line', width: '120px', height: '14px' }),
      );
      const subBtn = createSkeletonElement({ ...baseProps, type: 'button', width: '100px', height: '36px' });
      channel.append(chLeft, subBtn);

      container.append(screen, title, channel);
      break;
    }

    case 'music-player': {
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.alignItems = 'center';
      container.style.gap = '14px';
      container.style.padding = '20px';
      container.style.borderRadius = shapeRadius || '16px';
      container.style.border = '1px solid rgba(0,0,0,0.06)';

      const album = createSkeletonElement({ ...baseProps, type: 'rect', width: '180px', height: '180px', radius: shapeRadius || '12px' });
      const song = createSkeletonElement({ ...baseProps, type: 'heading', width: '160px', height: '20px' });
      const artist = createSkeletonElement({ ...baseProps, type: 'line', width: '100px', height: '14px' });
      const progress = createSkeletonElement({ ...baseProps, type: 'line', width: '100%', height: '6px' });

      const controls = document.createElement('div');
      controls.style.display = 'flex';
      controls.style.alignItems = 'center';
      controls.style.gap = '20px';
      controls.append(
        createSkeletonElement({ ...baseProps, type: 'icon', width: '24px', height: '24px' }),
        createSkeletonElement({ ...baseProps, type: 'circle', width: '48px', height: '48px' }),
        createSkeletonElement({ ...baseProps, type: 'icon', width: '24px', height: '24px' }),
      );

      container.append(album, song, artist, progress, controls);
      break;
    }

    case 'stories-row': {
      container.style.display = 'flex';
      container.style.gap = '16px';
      container.style.overflowX = 'auto';
      container.style.padding = '8px 0';

      for (let i = 0; i < 5; i++) {
        const story = document.createElement('div');
        story.style.display = 'flex';
        story.style.flexDirection = 'column';
        story.style.alignItems = 'center';
        story.style.gap = '6px';
        story.append(
          createSkeletonElement({ ...baseProps, type: 'circle', width: '60px', height: '60px' }),
          createSkeletonElement({ ...baseProps, type: 'line', width: '48px', height: '10px' }),
        );
        container.appendChild(story);
      }
      break;
    }

    case 'reels': {
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.justifyContent = 'flex-end';
      container.style.height = '340px';
      container.style.padding = '20px';
      container.style.borderRadius = shapeRadius || '16px';
      container.style.border = '1px solid rgba(0,0,0,0.1)';
      container.style.position = 'relative';

      const author = document.createElement('div');
      author.style.display = 'flex';
      author.style.alignItems = 'center';
      author.style.gap = '10px';
      author.append(
        createSkeletonElement({ ...baseProps, type: 'circle', width: '36px', height: '36px' }),
        createSkeletonElement({ ...baseProps, type: 'line', width: '100px', height: '14px' }),
      );
      const text = createSkeletonParagraph(2, baseProps);

      container.append(author, text);
      break;
    }

    case 'tabs': {
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '16px';

      const tabHeader = document.createElement('div');
      tabHeader.style.display = 'flex';
      tabHeader.style.gap = '20px';
      tabHeader.style.borderBottom = '2px solid rgba(0,0,0,0.06)';
      tabHeader.style.paddingBottom = '8px';

      for (let i = 0; i < 4; i++) {
        tabHeader.appendChild(createSkeletonElement({ ...baseProps, type: 'line', width: '70px', height: '16px' }));
      }

      const body = createSkeletonParagraph(3, baseProps);
      container.append(tabHeader, body);
      break;
    }

    case 'calendar': {
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '12px';
      container.style.padding = '16px';
      container.style.borderRadius = shapeRadius || '12px';
      container.style.border = '1px solid rgba(0,0,0,0.06)';

      const calHeader = document.createElement('div');
      calHeader.style.display = 'flex';
      calHeader.style.justifyContent = 'space-between';
      calHeader.append(
        createSkeletonElement({ ...baseProps, type: 'heading', width: '120px', height: '20px' }),
        createSkeletonElement({ ...baseProps, type: 'line', width: '60px', height: '20px' }),
      );

      const grid = document.createElement('div');
      grid.style.display = 'grid';
      grid.style.gridTemplateColumns = 'repeat(7, 1fr)';
      grid.style.gap = '8px';

      for (let i = 0; i < 28; i++) {
        grid.appendChild(createSkeletonElement({ ...baseProps, type: 'rect', height: '24px', radius: '4px' }));
      }

      container.append(calHeader, grid);
      break;
    }

    case 'kanban': {
      container.style.display = 'grid';
      container.style.gridTemplateColumns = 'repeat(3, 1fr)';
      container.style.gap = '14px';

      for (let col = 0; col < 3; col++) {
        const column = document.createElement('div');
        column.style.display = 'flex';
        column.style.flexDirection = 'column';
        column.style.gap = '10px';
        column.style.padding = '12px';
        column.style.borderRadius = shapeRadius || '10px';
        column.style.background = 'rgba(0,0,0,0.03)';

        const colHead = createSkeletonElement({ ...baseProps, type: 'heading', width: '80px', height: '16px' });
        column.appendChild(colHead);

        for (let card = 0; card < 2; card++) {
          const c = document.createElement('div');
          c.style.display = 'flex';
          c.style.flexDirection = 'column';
          c.style.gap = '8px';
          c.style.padding = '10px';
          c.style.borderRadius = shapeRadius || '6px';
          c.style.background = '#fff';
          c.style.border = '1px solid rgba(0,0,0,0.06)';
          c.append(
            createSkeletonElement({ ...baseProps, type: 'line', width: '85%', height: '14px' }),
            createSkeletonElement({ ...baseProps, type: 'badge', width: '50px', height: '16px' }),
          );
          column.appendChild(c);
        }

        container.appendChild(column);
      }
      break;
    }

    case 'timeline': {
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '18px';
      container.style.padding = '10px 0';

      for (let i = 0; i < 3; i++) {
        const item = document.createElement('div');
        item.style.display = 'flex';
        item.style.gap = '14px';

        const dotCol = document.createElement('div');
        dotCol.style.display = 'flex';
        dotCol.style.flexDirection = 'column';
        dotCol.style.alignItems = 'center';
        dotCol.append(
          createSkeletonElement({ ...baseProps, type: 'circle', width: '16px', height: '16px' }),
          createSkeletonElement({ ...baseProps, type: 'rect', width: '2px', height: '40px' }),
        );

        const content = document.createElement('div');
        content.style.display = 'flex';
        content.style.flexDirection = 'column';
        content.style.gap = '4px';
        content.style.flex = '1';
        content.append(
          createSkeletonElement({ ...baseProps, type: 'line', width: '90px', height: '12px' }),
          createSkeletonElement({ ...baseProps, type: 'heading', width: '60%', height: '18px' }),
          createSkeletonElement({ ...baseProps, type: 'line', width: '85%', height: '14px' }),
        );

        item.append(dotCol, content);
        container.appendChild(item);
      }
      break;
    }

    case 'map-card': {
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.borderRadius = shapeRadius || '14px';
      container.style.overflow = 'hidden';
      container.style.border = '1px solid rgba(0,0,0,0.08)';

      const mapArea = createSkeletonElement({ ...baseProps, type: 'rect', height: '160px', radius: '0' });
      const cardBody = document.createElement('div');
      cardBody.style.display = 'flex';
      cardBody.style.justifyContent = 'space-between';
      cardBody.style.alignItems = 'center';
      cardBody.style.padding = '14px';

      const left = document.createElement('div');
      left.style.display = 'flex';
      left.style.flexDirection = 'column';
      left.style.gap = '6px';
      left.append(
        createSkeletonElement({ ...baseProps, type: 'heading', width: '140px', height: '18px' }),
        createSkeletonElement({ ...baseProps, type: 'line', width: '200px', height: '12px' }),
      );

      const btn = createSkeletonElement({ ...baseProps, type: 'button', width: '90px', height: '34px' });
      cardBody.append(left, btn);

      container.append(mapArea, cardBody);
      break;
    }

    case 'pricing-card': {
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '16px';
      container.style.padding = '24px';
      container.style.borderRadius = shapeRadius || '16px';
      container.style.border = '1px solid rgba(0,0,0,0.08)';

      const badge = createSkeletonElement({ ...baseProps, type: 'badge', width: '70px', height: '22px' });
      const price = createSkeletonElement({ ...baseProps, type: 'heading', width: '130px', height: '38px' });
      const desc = createSkeletonElement({ ...baseProps, type: 'line', width: '80%', height: '14px' });

      const featureList = document.createElement('div');
      featureList.style.display = 'flex';
      featureList.style.flexDirection = 'column';
      featureList.style.gap = '10px';
      for (let i = 0; i < 4; i++) {
        const f = document.createElement('div');
        f.style.display = 'flex';
        f.style.alignItems = 'center';
        f.style.gap = '8px';
        f.append(
          createSkeletonElement({ ...baseProps, type: 'icon', width: '16px', height: '16px' }),
          createSkeletonElement({ ...baseProps, type: 'line', width: '70%', height: '14px' }),
        );
        featureList.appendChild(f);
      }

      const cta = createSkeletonElement({ ...baseProps, type: 'button', width: '100%', height: '42px' });
      container.append(badge, price, desc, featureList, cta);
      break;
    }

    case 'testimonial': {
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '16px';
      container.style.padding = '20px';
      container.style.borderRadius = shapeRadius || '14px';
      container.style.border = '1px solid rgba(0,0,0,0.06)';

      const quote = createSkeletonParagraph(3, baseProps);
      const author = document.createElement('div');
      author.style.display = 'flex';
      author.style.alignItems = 'center';
      author.style.gap = '12px';
      author.append(
        createSkeletonElement({ ...baseProps, type: 'circle', width: '42px', height: '42px' }),
        createSkeletonElement({ ...baseProps, type: 'line', width: '120px', height: '16px' }),
      );

      container.append(quote, author);
      break;
    }

    case 'faq-accordion': {
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '12px';

      for (let i = 0; i < 3; i++) {
        const item = document.createElement('div');
        item.style.display = 'flex';
        item.style.flexDirection = 'column';
        item.style.gap = '8px';
        item.style.padding = '14px 16px';
        item.style.borderRadius = shapeRadius || '8px';
        item.style.border = '1px solid rgba(0,0,0,0.06)';

        const q = document.createElement('div');
        q.style.display = 'flex';
        q.style.justifyContent = 'space-between';
        q.style.alignItems = 'center';
        q.append(
          createSkeletonElement({ ...baseProps, type: 'line', width: '75%', height: '16px' }),
          createSkeletonElement({ ...baseProps, type: 'icon', width: '16px', height: '16px' }),
        );
        item.appendChild(q);

        if (i === 0) {
          const a = createSkeletonParagraph(2, baseProps);
          item.appendChild(a);
        }
        container.appendChild(item);
      }
      break;
    }

    case 'file-explorer': {
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '10px';
      container.style.padding = '12px';

      for (let i = 0; i < 5; i++) {
        const fileRow = document.createElement('div');
        fileRow.style.display = 'flex';
        fileRow.style.alignItems = 'center';
        fileRow.style.gap = '10px';
        fileRow.style.marginLeft = `${(i % 3) * 16}px`;
        fileRow.append(
          createSkeletonElement({ ...baseProps, type: 'icon', width: '16px', height: '16px' }),
          createSkeletonElement({ ...baseProps, type: 'line', width: `${100 + (i * 20)}px`, height: '14px' }),
        );
        container.appendChild(fileRow);
      }
      break;
    }

    case 'code-block': {
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '8px';
      container.style.padding = '16px';
      container.style.borderRadius = shapeRadius || '8px';
      container.style.background = 'rgba(0,0,0,0.05)';

      const widths = ['40%', '70%', '55%', '85%', '30%', '60%'];
      for (const w of widths) {
        container.appendChild(createSkeletonElement({ ...baseProps, type: 'line', width: w, height: '12px' }));
      }
      break;
    }
  }

  return container;
}
