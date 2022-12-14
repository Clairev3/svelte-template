import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import serve from "rollup-plugin-serve";

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'dist/main.js'
	},
	plugins: [
		svelte({
			compilerOptions: {
				dev: !production
			}
		}),
		css({ output: 'main.css' }),
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
		!production && serve(),
		!production && livereload('dist'),
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
