import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Output,
  EventEmitter,
  Input,
  OnInit,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { UniFormFieldControlBase, uniFormFieldProvider } from '@uniform/components';
import { editor, IPosition } from 'monaco-editor';

@Component({
  selector: 'luc-json-editor',
  template: ``,
  styleUrls: ['./json-editor.component.scss'],
  host: { class: 'luc-json-editor' },
  providers: [uniFormFieldProvider(JsonEditorComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class JsonEditorComponent extends UniFormFieldControlBase<string> implements OnInit, AfterViewInit, OnDestroy {
  @Input()
  get options() { return this._options; }
  set options(v) {
    this._options = v;

    if (this._editor) {
      this._editor.updateOptions(this._options);
    }
  }
  private _options: editor.IStandaloneEditorConstructionOptions = {
    theme: 'vs-dark',
    contextmenu: false,
    tabSize: 2,
    detectIndentation: false,
    insertSpaces: true,
    scrollBeyondLastLine: false,
  };

  @Input()
  get focus() { return this._focus; }
  set focus(v) {
    this._focus = coerceBooleanProperty(v);

    if (this._editor && this._focus && !this._editor.hasTextFocus()) {
      this._editor.focus();
    }
  }
  private _focus?: boolean;

  @Output() cursorChange = new EventEmitter<IPosition>();
  @Output() save = new EventEmitter<void>();

  get value() { return this._value; }
  set value(v) {
    this._value = v;
    this.onChange(v);

    if (v !== this._editor.getValue()) {
      this._editor.setValue(v || '');
    }
  }
  protected _value?: string;

  get editor() { return this._editor; }
  private _editor: editor.IStandaloneCodeEditor;

  get model() { return this._model; }
  private _model: editor.ITextModel;

  ngOnInit() {
    super.ngOnInit();
    this._model = monaco.editor.createModel(this.value || '', 'json');
    this._editor = monaco.editor.create(this.el.nativeElement, {
      ...this._options,
      model: this._model,
    });

    this._model.updateOptions({
      tabSize: this._options.tabSize,
      insertSpaces: this._options.insertSpaces,
    });

    this._editor.onDidChangeCursorPosition(this._onCursorPositionChange.bind(this));
    this._editor.onDidChangeModelContent(this._onEditorChange.bind(this));
  }

  ngAfterViewInit() {
    this._editor.focus();
    setTimeout(() => this._editor.layout());
  }

  ngOnDestroy() {
    this._editor.dispose();
    this._model.dispose();
  }

  private _onEditorChange(_: editor.IModelContentChangedEvent) {
    const v = this._editor.getValue();

    if (v !== this.value) {
      this.value = v;
    }
  }

  private _onCursorPositionChange(e: editor.ICursorPositionChangedEvent) {
    this.cursorChange.emit({
      column: e.position.column,
      lineNumber: e.position.lineNumber,
    });
  }
}
