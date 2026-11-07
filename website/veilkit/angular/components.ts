import { Component, ElementRef, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import type {
  VeilPrimitiveType,
  VeilAnimationName,
  VeilThemeName,
  VeilSpinnerType,
  VeilPresetName,
  VeilShapeStyle,
  ButtonStatus,
  ButtonLoadingStyle,
} from '../core/types';
import { createSkeletonElement, createSkeletonParagraph } from '../core/primitives';
import { createPreset } from '../core/presets';
import { createSpinner } from '../core/spinners';
import { createProgressElement } from '../core/progress';
import { wrapLoadingButton } from '../core/button';
import { injectStyles } from '../core/css';

@Component({
  selector: 'veil-skeleton',
  standalone: true,
  template: ``,
})
export class VeilSkeletonComponent implements OnInit, OnChanges {
  @Input() type: VeilPrimitiveType = 'rect';
  @Input() width?: string | number;
  @Input() height?: string | number;
  @Input() radius?: string | number;
  @Input() lines?: number;
  @Input() animation: VeilAnimationName = 'shimmer';
  @Input() theme: VeilThemeName = 'light';
  @Input() circle: boolean = false;

  constructor(private el: ElementRef<HTMLElement>) {
    injectStyles();
  }

  ngOnInit(): void {
    this.render();
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.render();
  }

  private render(): void {
    const native = this.el.nativeElement;
    native.innerHTML = '';
    const shape = this.circle ? 'circle' : this.type;
    const node = this.lines
      ? createSkeletonParagraph(this.lines, {
          width: this.width,
          animation: this.animation,
          theme: this.theme,
        })
      : createSkeletonElement({
          type: shape,
          width: this.width,
          height: this.height,
          radius: this.radius,
          animation: this.animation,
          theme: this.theme,
        });

    native.appendChild(node);
  }
}

@Component({
  selector: 'veil-preset',
  standalone: true,
  template: ``,
})
export class VeilPresetComponent implements OnInit, OnChanges {
  @Input() name: VeilPresetName = 'card';
  @Input() items?: number;
  @Input() columns?: number;
  @Input() shape: VeilShapeStyle = 'rounded';
  @Input() animation: VeilAnimationName = 'shimmer';
  @Input() theme: VeilThemeName = 'light';
  @Input() width?: string | number;

  constructor(private el: ElementRef<HTMLElement>) {
    injectStyles();
  }

  ngOnInit(): void {
    this.render();
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.render();
  }

  private render(): void {
    const native = this.el.nativeElement;
    native.innerHTML = '';
    const preset = createPreset({
      name: this.name,
      items: this.items,
      columns: this.columns,
      shape: this.shape,
      animation: this.animation,
      theme: this.theme,
      width: this.width,
    });
    native.appendChild(preset);
  }
}

@Component({
  selector: 'veil-spinner',
  standalone: true,
  template: ``,
})
export class VeilSpinnerComponent implements OnInit, OnChanges {
  @Input() type: VeilSpinnerType = 'ring';
  @Input() size?: string | number = 28;
  @Input() color?: string;
  @Input() secondaryColor?: string;
  @Input() speed?: string | number;
  @Input() glass: boolean = false;
  @Input() label?: string;

  constructor(private el: ElementRef<HTMLElement>) {
    injectStyles();
  }

  ngOnInit(): void {
    this.render();
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.render();
  }

  private render(): void {
    const native = this.el.nativeElement;
    native.innerHTML = '';
    const spinner = createSpinner({
      type: this.type,
      size: this.size,
      color: this.color,
      secondaryColor: this.secondaryColor,
      speed: this.speed,
      glass: this.glass,
      label: this.label,
    });
    native.appendChild(spinner);
  }
}

@Component({
  selector: 'veil-loading-button',
  standalone: true,
  template: `<button #btn class="veil-button"><ng-content></ng-content></button>`,
})
export class VeilLoadingButtonComponent implements OnInit, OnChanges {
  @Input() status?: ButtonStatus;
  @Input() loading: boolean = false;
  @Input() styleType: ButtonLoadingStyle = 'spinner-left';
  @Input() spinner: VeilSpinnerType = 'ring';
  @Input() loadingText?: string;
  @Input() successText?: string;
  @Input() errorText?: string;
  @Input() resetAfter: number = 2000;

  private controller: ReturnType<typeof wrapLoadingButton> | null = null;

  constructor(private el: ElementRef<HTMLElement>) {
    injectStyles();
  }

  ngOnInit(): void {
    const button = this.el.nativeElement.querySelector('button');
    if (button) {
      this.controller = wrapLoadingButton(button, {
        status: this.status,
        loading: this.loading,
        styleType: this.styleType,
        spinner: this.spinner,
        loadingText: this.loadingText,
        successText: this.successText,
        errorText: this.errorText,
        resetAfter: this.resetAfter,
      });
    }
  }

  ngOnChanges(_changes: SimpleChanges): void {
    if (!this.controller) return;
    if (this.status) {
      this.controller.setStatus(this.status, this.loadingText);
    } else {
      this.controller.setLoading(this.loading, this.loadingText);
    }
  }
}

@Component({
  selector: 'veil-progress',
  standalone: true,
  template: ``,
})
export class VeilProgressBarComponent implements OnInit {
  @Input() value?: number;
  @Input() circular: boolean = false;
  @Input() size?: string | number;
  @Input() color?: string;

  constructor(private el: ElementRef<HTMLElement>) {
    injectStyles();
  }

  ngOnInit(): void {
    const prog = createProgressElement({
      value: this.value,
      circular: this.circular,
      size: this.size,
      color: this.color,
    });
    this.el.nativeElement.appendChild(prog);
  }
}
