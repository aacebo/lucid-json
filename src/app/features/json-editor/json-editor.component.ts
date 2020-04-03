import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
  ElementRef,
  ViewChild,
  Input,
  ChangeDetectorRef,
  ViewEncapsulation,
  OnDestroy,
} from '@angular/core';

import CodeMirror from 'codemirror';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/lint/lint.js';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/addon/scroll/simplescrollbars.js';

@Component({
  selector: 'luc-json-editor',
  templateUrl: './json-editor.component.html',
  styleUrls: ['./json-editor.component.scss'],
  host: { class: 'luc-json-editor' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class JsonEditorComponent implements AfterViewInit, OnDestroy {
  @Input()
  get value() { return this._value; }
  set value(v) {
    this._value = v;
    this._cdr.markForCheck();
  }
  private _value?: string;

  @ViewChild('textarea')
  readonly textarea: ElementRef<HTMLTextAreaElement>;

  editor: CodeMirror.EditorFromTextArea;

  constructor(private readonly _cdr: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.editor = CodeMirror.fromTextArea(this.textarea.nativeElement, {
      lineNumbers: true,
      theme: 'dracula',
      mode: 'application/json',
      readOnly: false,
      lint: true,
      tabSize: 2,
      autofocus: true,
      foldGutter: true,
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
      viewportMargin: Infinity,
      autoCloseBrackets: true,
    });

    this.editor.on('change', this.onEditorChange.bind(this));
    this.editor.setValue(this.value || '');
    setTimeout(() => this.editor.refresh());
  }

  ngOnDestroy() {
    if (this.editor) {
      this.editor.off('change', this.onEditorChange.bind(this));
    }
  }

  private onEditorChange(editor: CodeMirror.EditorFromTextArea) {
    const v = editor.getValue();

    if (v !== this.value) {
      this.value = v;
    }
  }
}
