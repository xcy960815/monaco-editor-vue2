<template>
  <div class="monaco-editor-vue2" ref="monaco-editor-vue2"></div>
</template>

<script lang="ts">
import { SqlSnippets } from './snippets';
import type { DatabaseOption, ThemeType } from './type';
import { editor, languages } from 'monaco-editor';
import type { IDisposable, Position } from 'monaco-editor';
import Vue, { PropType } from 'vue';

export default Vue.extend({
  name: 'monaco-editor-vue2',
  data() {
    return {
      // 编译器实例
      monacoEditor: null as editor.IStandaloneCodeEditor | null,
      // 编译器dom
      monacoEditorDom: null as HTMLElement | null,
      // 编译器提示
      completionItemProvider: null as IDisposable | null,
      // 编译器默认配置项
      monacoEditorDefaultOption: {
        acceptSuggestionOnCommitCharacter: false,
        suggestSelection: 'first',
        fontFamily: 'MONACO',
        lineHeight: 30,
        value: this.value,
        language: 'sql',
        theme: 'vs-dark',
        selectOnLineNumbers: true,
        contextmenu: false, // 关闭右键
        suggestOnTriggerCharacters: true,
        fontSize: 14,
        folding: false, // 是否折叠
        // 是否启用小地图
        minimap: {
          enabled: false,
        },
      } as editor.IStandaloneEditorConstructionOptions,
    };
  },
  props: {
    // 编译器的值
    value: {
      type: String,
      default: () => '',
    },

    // 触发字符
    triggerCharacters: {
      type: Array as PropType<Array<string>>,
      default: () => [],
    },

    // 自定义关键字
    customKeywords: {
      type: Array as PropType<Array<string>>,
      default: () => [],
    },

    // 数据库数据
    databaseOptions: {
      type: Array as PropType<Array<DatabaseOption>>,
      default: () => [],
    },

    // 编译器的width
    width: {
      type: Number,
      default: () => 0,
    },

    // 编译器的高
    height: {
      type: Number,
      default: () => 100,
      // required: true,
    },

    // 编译器配置项
    monacoEditorOption: {
      type: Object as PropType<editor.IStandaloneEditorConstructionOptions>,
      default: () => {
        return {};
      },
    },

    // 编译器主题
    monacoEditorTheme: {
      type: String as PropType<ThemeType>,
      default: 'vs',
    },
  },
  watch: {
    // 监听 编译器的值
    value: {
      handler: function (newSql: string) {
        const hasTextFocus = this.monacoEditor?.hasTextFocus();
        if (!hasTextFocus) this.monacoEditor?.setValue(newSql);
      },
    },

    // 监听 编译器的主题
    monacoEditorTheme: {
      handler: function (theme: ThemeType) {
        this.monacoEditor?.updateOptions({
          theme,
        });
      },
    },
    // 监听 编译器的宽高
    width: {
      handler: function () {
        this.setMonacoEditorStyle();
      },
    },
    height: {
      handler: function () {
        this.setMonacoEditorStyle();
      },
    },
  },
  model: {
    prop: 'value',
    event: 'update:value',
  },

  mounted() {
    // setTimeout(() => {
    //   console.log(this.databaseOptions);
    // }, 0);
    this.$nextTick(() => {
      this.monacoEditorDom = this.$refs['monaco-editor-vue2'] as HTMLElement;
      this.initEditor();
    });
  },

  methods: {
    // 设置 编译器 宽高
    setMonacoEditorStyle() {
      // 获取 monacoEditorDom 节点的父节点
      const parentElementWidth = window.getComputedStyle(
        this.monacoEditorDom!.parentElement!,
      ).width;

      const parentElementWidthNumber = Number(
        parentElementWidth.substring(0, parentElementWidth.length - 2),
      );
      // 设置父容器的宽高
      // this.monacoEditorDom!.parentElement!.style.width = `${
      //   this.width ? this.width : parentElementWidthNumber
      // }px`;

      // 设置 编译器 宽高
      this.monacoEditor?.layout({
        width: this.width ? this.width : parentElementWidthNumber,
        height: this.height,
      });
    },

    // 初始化 editor
    initEditor() {
      const sqlSnippets = new SqlSnippets(this.customKeywords, this.databaseOptions);

      this.completionItemProvider = languages.registerCompletionItemProvider('sql', {
        // 提示的触发字符
        triggerCharacters: [' ', '.', ...this.triggerCharacters],
        // 因为在js代码中 range 属性不配置也可以正常显示  所以 在这里避免代码抛错  使用了一个 别名
        provideCompletionItems: (model: editor.ITextModel, position: Position) =>
          sqlSnippets.provideCompletionItems(
            model,
            position,
          ) as languages.ProviderResult<languages.CompletionList>,
      });
      const monacoEditorOption =
        JSON.stringify(this.monacoEditorOption) === '{}'
          ? this.monacoEditorDefaultOption
          : this.monacoEditorOption;

      // 创建editor实例
      this.monacoEditor = editor.create(this.monacoEditorDom!, monacoEditorOption);
      // 渲染 编译器 宽高
      if (this.height) this.setMonacoEditorStyle();

      // 监听编译器里面的值的变化
      this.monacoEditor.onDidChangeModelContent(() => {
        this.$emit('update:value', this.monacoEditor?.getValue());
      });
    },
  },
  // 销毁时 销毁 编译器
  beforeDestroy() {
    this.monacoEditor?.dispose();
  },
});
</script>

<style lang="less" scoped>
.monaco-editor-vue2 {
  position: relative;
}
</style>
