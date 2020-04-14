import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
  OnDestroy,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { UniFormFieldControlBase, uniFormFieldProvider } from '@uniform/components';
import { parse } from '@prantlf/jsonlint';

import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript.js';

import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/edit/matchbrackets.js';

import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/fold/foldgutter.js';

import 'codemirror/addon/lint/lint.js';
import 'codemirror/addon/lint/json-lint.js';
import 'codemirror/addon/hint/show-hint.js';

import 'codemirror/addon/selection/active-line.js';
import 'codemirror/addon/selection/mark-selection.js';

import 'codemirror/addon/dialog/dialog.js';

import 'codemirror/addon/search/jump-to-line.js';
import 'codemirror/addon/search/match-highlighter.js';
import 'codemirror/addon/search/search.js';
import 'codemirror/addon/search/searchcursor.js';

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
  @Input()
  get options() { return this._options; }
  set options(v) {
    this._options = v;

    if (v && this._editor) {
      for (const key of Object.getOwnPropertyNames(v)) {
        this._editor.setOption(key as keyof CodeMirror.EditorConfiguration, v[key]);
      }
    }
  }
  private _options: CodeMirror.EditorConfiguration = { };

  @Input()
  get focus() { return this._focus; }
  set focus(v) {
    this._focus = coerceBooleanProperty(v);

    if (this._editor && this._focus && !this._editor.hasFocus()) {
      this._editor.focus();
    }
  }
  private _focus?: boolean;

  @Output() cursorChange = new EventEmitter<CodeMirror.Position>();
  @Output() save = new EventEmitter<void>();

  @ViewChild('textarea')
  get textarea() { return this._textarea; }
  set textarea(v) {
    this._textarea = v;
    this._editor = CodeMirror.fromTextArea(this.textarea.nativeElement, {
      ...this.options,
      lineNumbers: true,
      theme: 'icecoder',
      mode: { name: 'javascript', json: true },
      readOnly: false,
      lint: {
        async: true,
        getAnnotations: this._getAnnotations.bind(this),
      },
      tabSize: 2,
      autofocus: true,
      foldGutter: true,
      dragDrop: false,
      scrollbarStyle: 'null',
      showHint: true,
      gutters: [
        'CodeMirror-linenumbers',
        'CodeMirror-foldgutter',
        'CodeMirror-lint-markers',
      ],
      viewportMargin: Infinity,
      autoCloseBrackets: true,
      matchBrackets: true,
      styleActiveLine: { nonEmpty: true },
    });

    this._editor.on('change', this._onEditorChange.bind(this));
    this._editor.on('cursorActivity', this._onEditorCursorChange.bind(this));
    this._editor.setValue(this.value || '');

    setTimeout(() => {
      this._editor.refresh();

      if (this._focus && !this._editor.hasFocus()) {
        this._editor.focus();
      }
    });
  }
  private _textarea: ElementRef<HTMLTextAreaElement>;

  get value() { return this._value; }
  set value(v) {
    this._value = v;

    if (this._editor && v && v !== this._editor.getValue()) {
      this._editor.setValue(v);
      this.cdr.markForCheck();
    }
  }
  protected _value?: string;

  private _editor: CodeMirror.EditorFromTextArea;

  ngOnDestroy() {
    if (this._editor) {
      this._editor.off('change', this._onEditorChange.bind(this));
      this._editor.off('cursorActivity', this._onEditorCursorChange.bind(this));
    }
  }

  private _onEditorChange(editor: CodeMirror.EditorFromTextArea) {
    const v = editor.getValue();

    if (v !== this.value) {
      this.value = v;
      this.onChange(v);
    }
  }

  private _onEditorCursorChange(editor: CodeMirror.EditorFromTextArea) {
    this.cursorChange.emit(editor.getCursor());
  }

  private _getAnnotations(
    text: string,
    update: CodeMirror.UpdateLintingCallback,
    _options: CodeMirror.LintStateOptions,
    editor: CodeMirror.EditorFromTextArea,
  ) {
    let errors: CodeMirror.Annotation[] = [];

    try {
      parse(text);
    } catch (err) {
      errors = [{
        from: { line: err.location.start.line, ch: err.location.start.column },
        to: { line: err.location.start.line, ch: err.location.start.column },
        message: err.message,
      }];
    }

    update(editor, errors);
  }
}
