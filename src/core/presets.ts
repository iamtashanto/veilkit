/**
 * Veilkit - Presets Engine
 * 18 Ready-Made, Customizable, Responsive Skeleton Layout Presets
 */

import { PresetProps, SkeletonProps } from './types';
import { createSkeletonElement, createSkeletonParagraph } from './primitives';

export function createPreset(props: PresetProps): HTMLElement {
  const container = document.createElement('div');
  container.className = `veil-preset veil-preset-${props.name} ${props.className || ''}`.trim();
  container.setAttribute('aria-hidden', 'true');
  container.style.width = props.width !== undefined ? (typeof props.width === 'number' ? `${props.width}px` : props.width) : '100%';
  container.style.boxSizing = 'border-box';

  const baseProps: SkeletonProps = {
    animation: props.animation,
    theme: props.theme,
    direction: props.direction,
    speed: props.speed,
  };

  switch (props.name) {
    case 'card': {
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '12px';
      container.style.padding = '16px';
      container.style.borderRadius = '12px';
      container.style.border = '1px solid rgba(0,0,0,0.08)';

      const img = createSkeletonElement({ ...baseProps, type: 'rect', height: '180px', radius: '8px' });
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
      container.style.border = '1px solid rgba(0,0,0,0.06)';

      const img = createSkeletonElement({ ...baseProps, type: 'rect', height: '200px', radius: '10px' });
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
      container.style.display = 'grid';
      container.style.gridTemplateColumns = `repeat(${cols}, minmax(0, 1fr))`;
      container.style.gap = '16px';

      for (let i = 0; i < itemsCount; i++) {
        const item = createPreset({ ...props, name: 'product-card' });
        item.style.setProperty('--veil-stagger-idx', String(i));
        container.appendChild(item);
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

      const title = createSkeletonElement({ ...baseProps, type: 'line', width: '55%', height: '16px' });
      const subtitle = createSkeletonElement({ ...baseProps, type: 'line', width: '35%', height: '12px' });
      content.append(title, subtitle);

      const action = createSkeletonElement({ ...baseProps, type: 'icon', width: '24px', height: '24px' });
      container.append(avatar, content, action);
      break;
    }

    case 'list': {
      const count = props.items || 5;
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '8px';

      for (let i = 0; i < count; i++) {
        const item = createPreset({ ...props, name: 'list-item' });
        item.style.setProperty('--veil-stagger-idx', String(i));
        container.appendChild(item);
      }
      break;
    }

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
      }
      container.appendChild(headerRow);

      // Body rows
      const rows = props.items || 5;
      for (let r = 0; r < rows; r++) {
        const row = document.createElement('div');
        row.style.display = 'flex';
        row.style.gap = '16px';
        row.style.padding = '8px 0';
        row.style.borderBottom = '1px solid rgba(0,0,0,0.04)';
        for (let c = 0; c < cols; c++) {
          const td = createSkeletonElement({ ...baseProps, type: 'line', width: `${100 / cols}%`, height: '14px' });
          row.appendChild(td);
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
      container.style.padding = '24px';
      container.style.textAlign = 'center';

      const avatar = createSkeletonElement({ ...baseProps, type: 'circle', width: '80px', height: '80px' });
      const name = createSkeletonElement({ ...baseProps, type: 'heading', width: '160px', height: '22px' });
      const bio = createSkeletonParagraph(2, { ...baseProps, width: '240px' });
      const btn = createSkeletonElement({ ...baseProps, type: 'button', width: '120px', height: '36px' });

      container.append(avatar, name, bio, btn);
      break;
    }

    case 'profile-header': {
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '16px';

      const cover = createSkeletonElement({ ...baseProps, type: 'rect', height: '140px', radius: '10px' });
      const userRow = document.createElement('div');
      userRow.style.display = 'flex';
      userRow.style.alignItems = 'flex-end';
      userRow.style.gap = '16px';
      userRow.style.marginTop = '-40px';
      userRow.style.paddingLeft = '20px';

      const avatar = createSkeletonElement({ ...baseProps, type: 'circle', width: '72px', height: '72px' });
      avatar.style.border = '4px solid white';

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
      break;
    }

    case 'feed-post': {
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '12px';
      container.style.padding = '16px';
      container.style.borderRadius = '12px';
      container.style.border = '1px solid rgba(0,0,0,0.06)';

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
      );
      header.append(av, meta);

      const body = createSkeletonParagraph(3, baseProps);
      const media = createSkeletonElement({ ...baseProps, type: 'rect', height: '180px', radius: '8px' });

      const actions = document.createElement('div');
      actions.style.display = 'flex';
      actions.style.gap = '24px';
      actions.append(
        createSkeletonElement({ ...baseProps, type: 'icon', width: '20px', height: '20px' }),
        createSkeletonElement({ ...baseProps, type: 'icon', width: '20px', height: '20px' }),
        createSkeletonElement({ ...baseProps, type: 'icon', width: '20px', height: '20px' }),
      );

      container.append(header, body, media, actions);
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

      container.append(hero, title, byline, p1, p2);
      break;
    }

    case 'comment-thread': {
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '14px';

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
      }
      break;
    }

    case 'chat': {
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '12px';

      const messages = [
        { isSelf: false, width: '60%' },
        { isSelf: true, width: '45%' },
        { isSelf: false, width: '75%' },
        { isSelf: true, width: '50%' },
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
        );
        statsRow.appendChild(statCard);
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
      break;
    }

    case 'form': {
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '16px';
      container.style.padding = '20px';
      container.style.borderRadius = '12px';
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
          createSkeletonElement({ ...baseProps, type: 'input', width: '100%', height: '40px' }),
        );
        container.appendChild(group);
      }

      const btn = createSkeletonElement({ ...baseProps, type: 'button', width: '140px', height: '40px' });
      container.appendChild(btn);
      break;
    }

    case 'media-card': {
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '10px';

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
      );
      metaRow.append(avatar, details);

      container.append(thumb, metaRow);
      break;
    }

    case 'navbar': {
      container.style.display = 'flex';
      container.style.alignItems = 'center';
      container.style.justifyContent = 'space-between';
      container.style.padding = '12px 20px';
      container.style.borderBottom = '1px solid rgba(0,0,0,0.06)';

      const logo = createSkeletonElement({ ...baseProps, type: 'rect', width: '100px', height: '28px', radius: '6px' });
      const navLinks = document.createElement('div');
      navLinks.style.display = 'flex';
      navLinks.style.gap = '20px';
      for (let i = 0; i < 4; i++) {
        navLinks.appendChild(createSkeletonElement({ ...baseProps, type: 'line', width: '60px', height: '14px' }));
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

      const top = document.createElement('div');
      top.style.display = 'flex';
      top.style.flexDirection = 'column';
      top.style.gap = '16px';
      top.appendChild(createSkeletonElement({ ...baseProps, type: 'rect', width: '120px', height: '32px', radius: '6px' }));

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
  }

  return container;
}
