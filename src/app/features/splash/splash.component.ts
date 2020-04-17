import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { UniKeyboard } from '@uniform/components';

@Component({
  selector: 'luc-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplashComponent {
  @Input()
  get mac() { return this._mac; }
  set mac(v: boolean) {
    this._mac = coerceBooleanProperty(v);

    this.hotkeys = [
      { keys: [this._key, 'Alt', 'N'], description: 'New File' },
      { keys: [this._key, 'Alt', 'O'], description: 'Open File' },
      { keys: [this._key, 'Alt', 'E'], description: 'Export File' },
      { keys: [this._key, 'Alt', 'I'], description: 'Import File' },
    ];

    this._cdr.markForCheck();
  }
  private _mac?: boolean;

  hotkeys: {
    readonly keys: string[];
    readonly description: string;
  }[] = [];

  private get _key() {
    return this.mac ? UniKeyboard.Command : 'Ctrl';
  }

  constructor(private readonly _cdr: ChangeDetectorRef) { }
}
