import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
  OnDestroy,
} from '@angular/core';
import { UniFormFieldControlBase, uniFormFieldProvider } from '@uniform/components';

import CodeMirror from 'codemirror';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/lint/lint.js';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/addon/scroll/simplescrollbars.js';
import 'codemirror/addon/selection/active-line.js';
import 'codemirror/addon/selection/mark-selection.js';

@Component({
  selector: 'luc-json-editor',
  template: `<textarea #textarea></textarea>`,
  styleUrls: ['./json-editor.component.scss'],
  host: { class: 'luc-json-editor' },
  providers: [uniFormFieldProvider(JsonEditorComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class JsonEditorComponent extends UniFormFieldControlBase<string> implements OnDestroy {
  @ViewChild('textarea')
  get textarea() { return this._textarea; }
  set textarea(v) {
    this._textarea = v;
    this.editor = CodeMirror.fromTextArea(this.textarea.nativeElement, {
      lineNumbers: true,
      theme: '3024-night',
      mode: 'application/json',
      readOnly: false,
      lint: true,
      tabSize: 2,
      autofocus: true,
      foldGutter: true,
      scrollbarStyle: 'overlay',
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
      viewportMargin: Infinity,
      autoCloseBrackets: true,
      styleActiveLine: false,
    });

    this.editor.on('change', this.onEditorChange.bind(this));
    this.editor.setValue(this.value || '');
    setTimeout(() => this.editor.refresh());
  }
  private _textarea: ElementRef<HTMLTextAreaElement>;

  get value() { return this._value; }
  set value(v) {
    this._value = v;

    if (this.editor && v && v !== this.editor.getValue()) {
      this.editor.setValue(v);
      this.cdr.markForCheck();
    }
  }
  protected _value?: string;

  editor: CodeMirror.EditorFromTextArea;

  ngOnDestroy() {
    if (this.editor) {
      this.editor.off('change', this.onEditorChange.bind(this));
    }
  }

  private onEditorChange(editor: CodeMirror.EditorFromTextArea) {
    const v = editor.getValue();

    if (v !== this.value) {
      this.value = v;
      this.onChange(v);
    }
  }
}
