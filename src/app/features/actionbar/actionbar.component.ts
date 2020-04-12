import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import CodeMirror from 'codemirror';

@Component({
  selector: 'luc-actionbar',
  templateUrl: './actionbar.component.html',
  styleUrls: ['./actionbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionbarComponent {
  @Input() active?: string;
  @Input() cursor?: CodeMirror.Position;
  @Input() errors = 5;
  @Input() lines = 0;
  @Input() length = 0;

  @Output() minify = new EventEmitter<string>();
  @Output() beautify = new EventEmitter<string>();
}
