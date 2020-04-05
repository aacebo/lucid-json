import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
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
}
