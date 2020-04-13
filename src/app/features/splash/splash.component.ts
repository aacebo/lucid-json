import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { UniKeyboard } from '@uniform/components';

@Component({
  selector: 'luc-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplashComponent implements OnInit {
  @Input() mac?: boolean;

  hotkeys: {
    readonly keys: string[];
    readonly description: string;
  }[] = [];

  private get _key() {
    return this.mac ? UniKeyboard.Command : 'Ctrl';
  }

  ngOnInit() {
    this.hotkeys = [
      { keys: [this._key, 'Alt', 'N'], description: 'New File' },
      { keys: [this._key, 'Alt', 'O'], description: 'Open File' },
    ];
  }
}
