import type { DatabaseOption } from './type';
import { editor } from 'monaco-editor';
import type { IDisposable } from 'monaco-editor';
import Vue from 'vue';
declare const _default: import('vue/types/vue').ExtendedVue<
  Vue<
    Record<string, any>,
    Record<string, any>,
    never,
    never,
    (
      event: string,
      ...args: any[]
    ) => Vue<Record<string, any>, Record<string, any>, never, never, any>
  >,
  {
    monacoEditor: editor.IStandaloneCodeEditor | null;
    monacoEditorDom: HTMLElement | null;
    completionItemProvider: IDisposable | null;
    monacoEditorDefaultOption: editor.IStandaloneEditorConstructionOptions;
  },
  {
    setMonacoEditorStyle(): void;
    initEditor(): void;
  },
  unknown,
  {
    value: string;
    triggerCharacters: string[];
    customKeywords: string[];
    databaseOptions: DatabaseOption[];
    width: number;
    height: number;
    monacoEditorOption: {};
    monacoEditorTheme: string;
  },
  {},
  import('vue/types/v3-component-options').ComponentOptionsMixin,
  import('vue/types/v3-component-options').ComponentOptionsMixin
>;
export default _default;
