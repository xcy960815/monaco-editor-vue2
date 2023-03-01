import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
// import nodeResolve from "rollup-plugin-node-resolve";
import { nodeResolve } from '@rollup/plugin-node-resolve';
import vue from 'rollup-plugin-vue';
import filesize from 'rollup-plugin-filesize';
// import buble from 'rollup-plugin-buble'
import babel from '@rollup/plugin-babel';
import livereload from 'rollup-plugin-livereload';
import replace from 'rollup-plugin-replace';
import del from 'rollup-plugin-delete';
import { DEFAULT_EXTENSIONS } from '@babel/core';

const isProduction = process.env.NODE_ENV === 'production';

export default async () => ({
  input: 'src/index.ts',
  inlineDynamicImports: true,
  output: [
    {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'Vue2MonacoEditor',
      exports: 'named', // 关闭 Mixing named and default exports  警告
      globals: {
        vue: 'vue',
        'monaco-editor': 'monaco-editor',
        'monaco-editor/esm/vs/basic-languages/sql/sql.js':
          'monaco-editor/esm/vs/basic-languages/sql/sql.js',
        'monaco-editor/esm/vs/editor/contrib/find/findController':
          'monaco-editor/esm/vs/editor/contrib/find/findController',
        'monaco-editor/esm/vs/editor/contrib/hover/hover':
          'monaco-editor/esm/vs/editor/contrib/hover/hover',
      },
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: false,
      globals: {
        vue: 'vue',
        'monaco-editor': 'monaco-editor',
        'monaco-editor/esm/vs/basic-languages/sql/sql.js':
          'monaco-editor/esm/vs/basic-languages/sql/sql.js',
        'monaco-editor/esm/vs/editor/contrib/find/findController':
          'monaco-editor/esm/vs/editor/contrib/find/findController',
        'monaco-editor/esm/vs/editor/contrib/hover/hover':
          'monaco-editor/esm/vs/editor/contrib/hover/hover',
      },
    },
  ],

  context: 'window', // 屏蔽 'THIS_IS_UNDEFINED' 警告

  plugins: [
    isProduction &&
      del({
        targets: ['dist'],
      }),
    json(),
    nodeResolve(),
    commonjs(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    vue({
      css: true,
      compileTemplate: true,
    }),
    typescript({
      useTsconfigDeclarationDir: true,
      extensions: ['.js', '.ts', '.tsx', '.vue'],
    }),
    postcss({
      plugins: [require('autoprefixer')],
      // 把 css 插入到 style 中
      inject: true,
      // 把 css 放到和js同一目录
      // extract: true
      // Minimize CSS, boolean or options for cssnano.
      minimize: isProduction,
      // Enable sourceMap.
      sourceMap: !isProduction,
      // This plugin will process files ending with these extensions and the extensions supported by custom loaders.
      extensions: ['.sass', '.less', '.scss', '.css'],
    }),
    babel({
      skipPreflightCheck: true,
      exclude: 'node_modules/**',
      babelHelpers: 'runtime',
      // babel 默认不支持 ts 需要手动添加
      extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx', '.vue'],
    }),

    isProduction && (await import('rollup-plugin-terser')).terser(),
    filesize(),
    // 热更新
    !isProduction && livereload(),
  ],
  external: [
    'monaco-editor',
    'vue',
    'monaco-editor/esm/vs/basic-languages/sql/sql.js',
    'monaco-editor/esm/vs/editor/contrib/find/findController',
    'monaco-editor/esm/vs/editor/contrib/hover/hover',
  ],
});
