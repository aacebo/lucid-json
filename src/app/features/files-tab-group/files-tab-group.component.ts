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
  @Input() active?: string;
  @Input() paths: string[] = [];
  @Input() files: { [path: string]: File } = { };

  @Output() edit = new EventEmitter<{ e: string; path: string; }>();
  @Output() activate = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();

  readonly tree$ = new BehaviorSubject(false);

  onViewTree() {
    this.tree$.next(true);
  }

  onTextChange(e: string) {
    this.edit.emit({ e, path: this.active });
  }

  onTabChange(e: number) {
    this.activate.emit(this.paths[e]);
  }

  onClose(e: string) {
    const idx = this.paths.indexOf(e);

    if (this.paths.length > 1) {
      this.activate.emit(this.paths[idx + 1]);
    }

    this.remove.emit(e);
  }
}
