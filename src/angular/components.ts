import { Component, ElementRef, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import type { VeilPrimitiveType, VeilAnimationName, VeilThemeName, VeilSpinnerType } from '../core/types';
import { createSkeletonElement, createSkeletonParagraph } from '../core/primitives';
import { createSpinner } from '../core/spinners';
import { createProgressElement } from '../core/progress';
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
  selector: 'veil-spinner',
  standalone: true,
  template: ``,
})
export class VeilSpinnerComponent implements OnInit {
  @Input() type: VeilSpinnerType = 'ring';
  @Input() size?: string | number = 28;
  @Input() color?: string;

  constructor(private el: ElementRef<HTMLElement>) {
    injectStyles();
  }

  ngOnInit(): void {
    const spinner = createSpinner({
      type: this.type,
      size: this.size,
      color: this.color,
    });
    this.el.nativeElement.appendChild(spinner);
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
