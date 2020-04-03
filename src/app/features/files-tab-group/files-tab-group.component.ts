import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { File } from '../../resources/file';

@Component({
  selector: 'luc-files-tab-group',
  templateUrl: './files-tab-group.component.html',
  styleUrls: ['./files-tab-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilesTabGroupComponent {
  @Input() active: string;
  @Input() paths: string[] = [];
  @Input() files: { [path: string]: File } = { };

  @Output() textChange = new EventEmitter<{ e: string; path: string; }>();

  readonly tree$ = new BehaviorSubject(false);

  onViewTree() {
    this.tree$.next(true);
  }

  onTextChange(e: string) {
    this.textChange.emit({ e, path: this.active });
  }
}
