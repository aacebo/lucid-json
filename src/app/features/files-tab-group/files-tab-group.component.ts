import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { File } from '../../resources/file';

@Component({
  selector: 'luc-files-tab-group',
  templateUrl: './files-tab-group.component.html',
  styleUrls: ['./files-tab-group.component.scss'],
  host: { class: 'luc-files-tab-group' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FilesTabGroupComponent {
  @Input() active: string;
  @Input() paths: string[] = [];
  @Input() files: { [path: string]: File } = { };

  @Output() textChange = new EventEmitter<{ e: string; path: string; }>();
  @Output() activeChange = new EventEmitter<string>();

  readonly tree$ = new BehaviorSubject(false);

  onViewTree() {
    this.tree$.next(true);
  }

  onTextChange(e: string) {
    this.textChange.emit({ e, path: this.active });
  }

  onTabChange(e: number) {
    this.activeChange.emit(this.paths[e]);
  }
}
