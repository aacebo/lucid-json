import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import CodeMirror from 'codemirror';

@Component({
  selector: 'luc-actionbar',
  templateUrl: './actionbar.component.html',
  styleUrls: ['./actionbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionbarComponent {
  @Input() cursor?: CodeMirror.Position;
  @Input() errors = 5;

  @Output() minify = new EventEmitter<void>();
  @Output() beautify = new EventEmitter<void>();
}
