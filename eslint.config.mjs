import eslint from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import ts_eslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';
import jsdocPlugin from 'eslint-plugin-jsdoc';

export default ts_eslint.config(
	{
		plugins: {
			'@stylistic': stylistic,
		}
	},
	eslint.configs.recommended,
	...ts_eslint.configs.recommended,
	...svelte.configs['flat/recommended'],
	jsdocPlugin.configs['flat/recommended-typescript'],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parserOptions: {
				parser: ts_eslint.parser
			}
		}
	},
	{
		rules: {
			'@typescript-eslint/adjacent-overload-signatures': 'error',
			'@typescript-eslint/dot-notation': 'off',
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/explicit-member-accessibility': [
				'off',
				{
					'accessibility': 'explicit'
				}
			],
			'@stylistic/member-delimiter-style': [
				'error',
				{
					'multiline': {
						'delimiter': 'semi',
						'requireLast': true
					},
					'singleline': {
						'delimiter': 'comma'
					}
				}
			],
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-inferrable-types': [
				'error',
				{
					'ignoreParameters': true
				}
			],

			'no-shadow': 'off',
			'@typescript-eslint/no-shadow': 'error',

			'no-unused-expressions': 'off',
			'@typescript-eslint/no-unused-expressions': 'error',

			'@typescript-eslint/no-unused-vars': [
				'warn',
				{ 'argsIgnorePattern': '^_' }
			],
			'@typescript-eslint/prefer-for-of': 'error',
			'@typescript-eslint/prefer-function-type': 'error',
			'@typescript-eslint/prefer-namespace-keyword': 'error',

			'@stylistic/quotes': [
				'error',
				'single',
				{ 'allowTemplateLiterals': true }
			],

			'@stylistic/semi': [
				'error',
				'always'
			],
			'@stylistic/type-annotation-spacing': 'error',
			'@typescript-eslint/unified-signatures': 'warn',
			'arrow-body-style': 'off',
			'arrow-parens': [
				'error',
				'as-needed'
			],
			'brace-style': [
				'error',
				'1tbs'
			],
			'comma-dangle': [
				'error', {
					'arrays': 'ignore',
					'objects': 'ignore',
					'imports': 'ignore',
					'exports': 'ignore',
					'functions': 'never'
				}
			],
			'complexity': 'off',
			'constructor-super': 'error',
			'curly': ['error', 'multi-line', 'consistent'],
			'dot-notation': 'off',
			'eol-last': 'error',
			'eqeqeq': ['error', 'always', {'null': 'ignore'}],
			'guard-for-in': 'error',
			'id-denylist': [
				'error',
				'any',
				'Number',
				'number',
				'String',
				'string',
				'Boolean',
				'boolean',
				'Undefined',
				'undefined'
			],
			'id-match': 'error',
			'@stylistic/indent': ['warn', 'tab'],
			'jsdoc/require-jsdoc': 'off',
			'jsdoc/check-alignment': 'error',
			'jsdoc/check-indentation': 'off',
			'jsdoc/check-tag-names': 'off', // Off because it warns about @type
			'jsdoc/newline-after-description': 'off',
			'jsdoc/no-types': 'error',
			'key-spacing': ['warn', { 'beforeColon': false }],
			'max-classes-per-file': 'off',
			'max-len': [
				'warn',
				{
					'code': 140,
					'tabWidth': 2,
				}
			],
			'new-parens': 'error',
			'no-bitwise': 'off',
			'no-caller': 'error',
			'no-cond-assign': 'error',
			'no-console': [
				'warn',
				{
					'allow': [
						'dir',
						'log',
						'warn',
						'error'
					]
				}
			],
			'no-debugger': 'error',
			'no-eval': 'error',
			'no-fallthrough': 'warn',
			'no-multiple-empty-lines': 'warn',
			'no-new-wrappers': 'error',
			'no-restricted-imports': [
				'error',
				'rxjs/Rx'
			],
			'no-throw-literal': 'error',
			'no-undef-init': 'error',
			'no-underscore-dangle': 'off',
			'no-unsafe-finally': 'error',
			'no-unused-labels': 'error',
			'no-use-before-define': 'off',
			'no-var': 'error',
			'object-shorthand': 'off',
			'prefer-arrow/prefer-arrow-functions': 'off',
			'prefer-const': 'error',
			'radix': 'error',
			'space-before-function-paren': [
				'error',
				{
					'anonymous': 'never',
					'asyncArrow': 'always',
					'named': 'never'
				}
			],
			'spaced-comment': 'off',

			'no-mixed-spaces-and-tabs': ['warn', 'smart-tabs'],
			'no-trailing-spaces': 'off', // Don't need ESLint's rule, so turn it off
			'svelte/no-trailing-spaces': 'error',
			'svelte/button-has-type': 'warn',
			'svelte/html-quotes': ['error', {'prefer': 'double'}],
			'svelte/no-spaces-around-equal-signs-in-attribute': 'error',
			'svelte/prefer-class-directive': 'off', // Until more flexible. See https://github.com/sveltejs/eslint-plugin-svelte/issues/689
			'svelte/block-lang': ['error', {'script': 'ts'}],
		}
	},
	{
		ignores: ['build/', '.svelte-kit/', 'dist/']
	}
);
