import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { IPosition } from 'monaco-editor';

@Component({
  selector: 'luc-actionbar',
  templateUrl: './actionbar.component.html',
  styleUrls: ['./actionbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionbarComponent {
  @Input() active?: string;
  @Input() cursor?: IPosition;
  @Input() lines = 0;
  @Input() length = 0;

  @Output() minify = new EventEmitter<string>();
  @Output() beautify = new EventEmitter<string>();
}
