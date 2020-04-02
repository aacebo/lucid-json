import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { ElectronService } from './core/services/electron';
import { ISystem, SystemService } from './resources/system';

@Component({
  selector: 'luc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(
    readonly systemService: SystemService,
    private readonly _electronService: ElectronService,
  ) { }

  ngOnInit() {
    this._electronService.on('system', (system: ISystem) => {
      this.systemService.setSystem(system);
    });

    this._electronService.on('open', () => {
      console.log('open');
    });
  }
}
