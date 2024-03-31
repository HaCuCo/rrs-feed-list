import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import summary from 'rollup-plugin-summary';
import { uglify } from 'rollup-plugin-uglify';

export default {
  input: ['src/RssFeedList.ts'],
  output: {
    file: 'dist/rss-feed-list.js',
    format: 'es'
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    postcss(),
    terser(),
    uglify(),
    summary()
  ]
};
