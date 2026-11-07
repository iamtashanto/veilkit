import { defineComponent, h, ref, onMounted, onUnmounted, watch, PropType } from 'vue';
import {
  VeilThemeName,
  VeilAnimationName,
  VeilPrimitiveType,
  VeilSpinnerType,
  VeilPresetName,
  VeilShapeStyle,
  ButtonStatus,
  ButtonLoadingStyle,
  ButtonPressFeedback,
  ButtonResultAnimation,
} from '../core/types';
import { injectStyles } from '../core/css';
import { createSpinner } from '../core/spinners';
import { createPreset } from '../core/presets';
import { createProgressElement } from '../core/progress';
import { overlayController } from '../core/overlay';
import { createAutoMeasureOverlay } from '../core/measure';
import { wrapLoadingButton } from '../core/button';
import { createLazyImage } from '../core/lazy-image';

export const VSkeleton = defineComponent({
  name: 'VSkeleton',
  props: {
    type: { type: String as PropType<VeilPrimitiveType>, default: 'rect' },
    width: { type: [String, Number] },
    height: { type: [String, Number] },
    radius: { type: [String, Number] },
    count: { type: Number, default: 1 },
    gap: { type: [String, Number], default: '0.5rem' },
    lines: { type: Number },
    lastLineWidth: { type: [String, Number], default: '65%' },
    animation: { type: String as PropType<VeilAnimationName>, default: 'shimmer' },
    theme: { type: String as PropType<VeilThemeName>, default: 'light' },
    shape: { type: String as PropType<VeilShapeStyle> },
    circle: { type: Boolean, default: false },
    label: { type: String, default: 'Loading' },
  },
  setup(props, { slots }) {
    onMounted(() => injectStyles());

    return () => {
      const shape = props.circle ? 'circle' : (props.lines ? 'line' : props.type);
      const totalLines = props.lines || (props.count > 1 ? props.count : 1);

      if (totalLines > 1) {
        const defaultWidths = ['100%', '94%', '88%', '75%'];
        return h(
          'div',
          {
            class: 'veil-lines-group',
            role: 'status',
            'aria-label': props.label,
            style: { display: 'flex', flexDirection: 'column', gap: typeof props.gap === 'number' ? `${props.gap}px` : props.gap },
          },
          [
            h('span', { class: 'veil-sr-only' }, props.label),
            ...Array.from({ length: totalLines }).map((_, i) => {
              const isLast = i === totalLines - 1;
              const w = isLast ? props.lastLineWidth : (defaultWidths[i % defaultWidths.length] || '95%');
              return h('div', {
                key: i,
                class: 'veil-skeleton',
                'data-veil-shape': 'line',
                'data-veil-anim': props.animation,
                'data-veil-theme': props.theme,
                'aria-hidden': 'true',
                style: {
                  width: typeof w === 'number' ? `${w}px` : w,
                  '--veil-stagger-idx': i,
                },
              });
            }),
          ],
        );
      }

      return h(
        'div',
        {
          class: 'veil-skeleton',
          'data-veil-shape': shape,
          'data-veil-anim': props.animation,
          'data-veil-theme': props.theme,
          role: 'status',
          'aria-label': props.label,
          style: {
            width: typeof props.width === 'number' ? `${props.width}px` : props.width,
            height: typeof props.height === 'number' ? `${props.height}px` : props.height,
            borderRadius: props.circle ? '50%' : (typeof props.radius === 'number' ? `${props.radius}px` : props.radius),
          },
        },
        [
          h('span', { class: 'veil-sr-only' }, props.label),
          slots.default ? slots.default() : null,
        ],
      );
    };
  },
});

export const VSkeletonPreset = defineComponent({
  name: 'VSkeletonPreset',
  props: {
    name: { type: String as PropType<VeilPresetName>, required: true },
    items: { type: Number },
    columns: { type: Number },
    shape: { type: String as PropType<VeilShapeStyle>, default: 'rounded' },
    animation: { type: String as PropType<VeilAnimationName>, default: 'shimmer' },
    theme: { type: String as PropType<VeilThemeName>, default: 'light' },
    width: { type: [String, Number] },
  },
  setup(props) {
    const root = ref<HTMLElement | null>(null);

    onMounted(() => {
      if (!root.value) return;
      const el = createPreset({
        name: props.name,
        items: props.items,
        columns: props.columns,
        shape: props.shape,
        animation: props.animation,
        theme: props.theme,
        width: props.width,
      });
      root.value.replaceWith(el);
    });

    return () => h('div', { ref: root, class: 'veil-preset-vue' });
  },
});

export const VVeil = defineComponent({
  name: 'VVeil',
  props: {
    loading: { type: Boolean, required: true },
    cacheKey: { type: String },
    persistCache: { type: Boolean, default: false },
    reveal: { type: String, default: 'fade' },
  },
  setup(props, { slots }) {
    const root = ref<HTMLElement | null>(null);
    let overlayInstance: ReturnType<typeof createAutoMeasureOverlay> | null = null;

    watch(
      () => props.loading,
      (loading) => {
        if (!root.value) return;
        if (loading) {
          overlayInstance = createAutoMeasureOverlay(root.value, {
            cacheKey: props.cacheKey,
            persistCache: props.persistCache,
            reveal: props.reveal as any,
          });
        } else if (overlayInstance) {
          overlayInstance.destroy();
          overlayInstance = null;
        }
      },
      { immediate: true },
    );

    onUnmounted(() => {
      if (overlayInstance) overlayInstance.destroy();
    });

    return () => h('div', { ref: root, class: 'veil-vue-wrapper', style: { position: 'relative' } }, slots.default?.());
  },
});

export const VSpinner = defineComponent({
  name: 'VSpinner',
  props: {
    type: { type: String as PropType<VeilSpinnerType>, default: 'ring' },
    size: { type: [String, Number], default: 28 },
    color: { type: String },
    secondaryColor: { type: String },
    speed: { type: [String, Number] },
    glass: { type: Boolean, default: false },
    label: { type: String, default: 'Loading' },
  },
  setup(props) {
    const root = ref<HTMLElement | null>(null);

    onMounted(() => {
      if (!root.value) return;
      const el = createSpinner({
        type: props.type,
        size: props.size,
        color: props.color,
        secondaryColor: props.secondaryColor,
        speed: props.speed,
        glass: props.glass,
        label: props.label,
      });
      root.value.appendChild(el);
    });

    return () => h('div', { ref: root, class: 'veil-spinner-vue', style: { display: 'inline-flex' } });
  },
});

export const VProgressBar = defineComponent({
  name: 'VProgressBar',
  props: {
    value: { type: Number },
    circular: { type: Boolean, default: false },
    size: { type: [String, Number] },
    color: { type: String },
  },
  setup(props) {
    const root = ref<HTMLElement | null>(null);

    onMounted(() => {
      if (!root.value) return;
      const el = createProgressElement(props);
      root.value.appendChild(el);
    });

    return () => h('div', { ref: root, class: 'veil-progress-vue' });
  },
});

export const VOverlay = defineComponent({
  name: 'VOverlay',
  props: {
    visible: { type: Boolean, default: false },
    blur: { type: Boolean, default: true },
    message: { type: String },
    spinner: { type: String as PropType<VeilSpinnerType>, default: 'ring' },
  },
  setup(props, { slots }) {
    const root = ref<HTMLElement | null>(null);

    watch(
      () => props.visible,
      (val) => {
        if (!root.value) return;
        if (val) {
          overlayController.show(root.value, {
            blur: props.blur,
            message: props.message,
            spinner: props.spinner,
          });
        } else {
          overlayController.hide(root.value);
        }
      },
    );

    onUnmounted(() => {
      if (root.value) overlayController.hide(root.value);
    });

    return () => h('div', { ref: root, class: 'veil-overlay-vue', style: { position: 'relative' } }, slots.default?.());
  },
});

export const VLoadingButton = defineComponent({
  name: 'VLoadingButton',
  props: {
    status: { type: String as PropType<ButtonStatus> },
    loading: { type: Boolean, default: false },
    styleType: { type: String as PropType<ButtonLoadingStyle>, default: 'spinner-left' },
    spinner: { type: String as PropType<VeilSpinnerType>, default: 'ring' },
    loadingText: { type: String },
    successText: { type: String },
    errorText: { type: String },
    resetAfter: { type: Number, default: 2000 },
    progress: { type: Number },
    pressFeedback: { type: String as PropType<ButtonPressFeedback>, default: 'press-scale' },
    resultAnimation: { type: String as PropType<ButtonResultAnimation>, default: 'checkmark' },
  },
  setup(props, { slots }) {
    const btnRef = ref<HTMLButtonElement | null>(null);
    let controller: ReturnType<typeof wrapLoadingButton> | null = null;

    onMounted(() => {
      if (!btnRef.value) return;
      controller = wrapLoadingButton(btnRef.value, {
        status: props.status,
        loading: props.loading,
        styleType: props.styleType,
        spinner: props.spinner,
        loadingText: props.loadingText,
        successText: props.successText,
        errorText: props.errorText,
        resetAfter: props.resetAfter,
        progress: props.progress,
        pressFeedback: props.pressFeedback,
        resultAnimation: props.resultAnimation,
      });
    });

    watch(
      () => props.loading,
      (loading) => {
        if (controller) controller.setLoading(loading, props.loadingText);
      () => [props.status, props.loading],
      () => {
        if (!controller) return;
        if (props.status) {
          controller.setStatus(props.status);
        } else {
          controller.setLoading(props.loading, props.loadingText);
        }
      },
    );

    onUnmounted(() => {
      if (controller) controller.destroy();
    });

    return () => h('button', { ref: btnRef, class: 'veil-button' }, slots.default?.());
  },
});

export const VLazyImage = defineComponent({
  name: 'VLazyImage',
  props: {
    src: { type: String, required: true },
    alt: { type: String, default: '' },
    width: { type: [String, Number] },
    height: { type: [String, Number] },
    radius: { type: [String, Number] },
  },
  setup(props) {
    const root = ref<HTMLElement | null>(null);

    onMounted(() => {
      if (!root.value) return;
      const el = createLazyImage(props);
      root.value.appendChild(el);
    });

    return () => h('div', { ref: root, class: 'veil-lazy-img-vue' });
  },
});
