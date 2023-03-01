import * as monaco from 'monaco-editor';
import type { DatabaseOption, SuggestOption } from './type';
export declare class SqlSnippets {
  private monaco;
  private customKeywords;
  private databaseKeywords;
  private databaseOptions;
  private sortText;
  constructor(customKeywords?: Array<string>, databaseOptions?: Array<DatabaseOption>);
  /**
   * 动态设置数据库表&&数据库字段
   * @param {*} databaseOptions 数据库数据
   * @example [{ databaseName: '', tableOptions: [{ tableName: '', fielsOptions: [ {  fieldName: "" ,fieldType: "" ,fieldComment: "" ,databaseName: "" ,tableName: ""  }] }] }]
   */
  private setDatabaseOption;
  /**
   * @desc 获取关于光标所有的文本
   * @param { monaco.editor.ITextModel } model
   * @param { monaco.Position } position
   * @returns {
   *  textBeforePointer：光标前面当前行文本
   *  textBeforePointerMulti:光标前第一行到光标位置所有的文本
   *  textAfterPointer:光标后当前行文本
   *  textAfterPointerMulti:光标后到最后一行 最后一列 所有的文本
   * }
   */
  getTextByCursorPosition: (
    model: monaco.editor.ITextModel,
    position: monaco.Position,
  ) => {
    textBeforePointer: string;
    textBeforePointerMulti: string;
    textAfterPointer: string;
    textAfterPointerMulti: string;
  };
  /**
   * @desc monaco提示方法
   * @param { monaco.editor.ITextModel } model
   * @param { monaco.Position } position
   */
  provideCompletionItems(
    model: monaco.editor.ITextModel,
    position: monaco.Position,
  ): Promise<{
    suggestions: SuggestOption[];
  }>;
  /**
   * @desc 获取自定义联想建议
   * @param { boolean } startsWith$ 是否以$开头
   * @returns { Array<SuggestOption> }
   */
  private getCustomSuggestions;
  /**
   * @desc 获取数据库库名联想建议
   * @returns { Array<SuggestOption> } []
   */
  getDatabaseOptionsSuggestions: () => Array<SuggestOption>;
  /**
   * 获取数据库关键字联想建议
   * @returns { Array<SuggestOption> } []
   */
  getKeywordOptionsSuggestions: () => Array<SuggestOption>;
  /**
   * @desc 获取数据库表名建议
   * @return { Array<SuggestOption> } []
   */
  getTableOptionsSuggestions: () => Array<SuggestOption>;
  /**
   * @desc 通过数据库名 来获取 当前数据库下面的 table 联想选项
   * @param { string } databaseName
   * @returns { Array<SuggestOption> } []
   */
  getTableOptionsSuggestByDatabaseName: (databaseName: string) => Array<SuggestOption>;
  /**
   * @desc 获取所有表字段
   * @return {Array<SuggestOption>} []
   */
  getFieldOptionsSuggestions: () => Array<SuggestOption>;
  /**
   * @desc 根据别名获取所有表字段
   * @return {Array<SuggestOption>} []
   */
  getFieldOptionsSuggestByTableAlia: () => Array<SuggestOption>;
  /**
   * @desc 获取sql中所有的表名和别名
   * @param {*} sqlText SQL字符串
   * @return {Array<{tableName: string, tableAlia: string }>} []
   */
  getTableNameAndTableAlia: (sqlText: string) => Array<{
    tableName: string;
    tableAlia: string;
  }>;
}
