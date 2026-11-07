/**
 * Veilkit - Accessibility & Localization Engine
 * Screen-reader announcements, polite live regions, and WCAG AA compliance
 */

const DEFAULT_LABELS: Record<string, Record<string, string>> = {
  en: {
    loading: 'Loading content, please wait…',
    loaded: 'Content loaded.',
    progress: 'Loading progress',
    busy: 'Busy',
  },
  es: {
    loading: 'Cargando contenido, por favor espere…',
    loaded: 'Contenido cargado.',
    progress: 'Progreso de carga',
    busy: 'Ocupado',
  },
  fr: {
    loading: 'Chargement du contenu, veuillez patienter…',
    loaded: 'Contenu chargé.',
    progress: 'Progression du chargement',
    busy: 'Occupé',
  },
  de: {
    loading: 'Inhalt wird geladen, bitte warten…',
    loaded: 'Inhalt geladen.',
    progress: 'Ladefortschritt',
    busy: 'Beschäftigt',
  },
  ja: {
    loading: 'コンテンツを読み込んでいます…',
    loaded: '読み込みが完了しました。',
    progress: '読み込み状況',
    busy: '処理中',
  },
  zh: {
    loading: '正在加载内容，请稍候…',
    loaded: '内容加载完成。',
    progress: '加载进度',
    busy: '忙碌中',
  },
  ar: {
    loading: 'جاري تحميل المحتوى، يرجى الانتظار…',
    loaded: 'تم تحميل المحتوى.',
    progress: 'تقدم التحميل',
    busy: 'مشغول',
  },
};

let currentLocale = 'en';
const customLabels: Record<string, string> = {};

/**
 * Configure active localization language
 */
export function setLocale(locale: string): void {
  currentLocale = locale;
}

/**
 * Get current active locale
 */
export function getLocale(): string {
  return currentLocale;
}

/**
 * Register or override accessibility label strings
 */
export function setLabels(labels: Record<string, string>): void {
  Object.assign(customLabels, labels);
}

/**
 * Resolves a localized label for screen readers
 */
export function getLabel(key: 'loading' | 'loaded' | 'progress' | 'busy' | string): string {
  if (customLabels[key]) return customLabels[key];
  const dict = DEFAULT_LABELS[currentLocale] || DEFAULT_LABELS.en;
  return dict[key] || DEFAULT_LABELS.en[key] || 'Loading…';
}

/**
 * Marks a container element with accessible loading attributes
 */
export function applyA11yLoading(container: HTMLElement, label?: string): HTMLElement {
  container.setAttribute('aria-busy', 'true');

  let srNode = container.querySelector('.veil-sr-only') as HTMLElement;
  if (!srNode) {
    srNode = document.createElement('span');
    srNode.className = 'veil-sr-only';
    srNode.setAttribute('role', 'status');
    srNode.setAttribute('aria-live', 'polite');
    container.appendChild(srNode);
  }
  srNode.textContent = label || getLabel('loading');
  return srNode;
}

/**
 * Clears accessible loading state from container
 */
export function removeA11yLoading(container: HTMLElement): void {
  container.removeAttribute('aria-busy');
  const srNode = container.querySelector('.veil-sr-only');
  if (srNode) {
    srNode.remove();
  }
}
