import vue from 'rollup-plugin-vue'
import typescript from 'rollup-plugin-typescript'

// export default {
//   input: 'src/MyComponent.vue',
//   output: {
//     format: 'esm',
//     file: 'dist/MyComponent.js'
//   },
//   external: ['vue'],
//   plugins: [
//     typescript({
//       tsconfig: false,
//       experimentalDecorators: true,
//       module: 'es2015'
//     }),
//     vue()
//   ]
// }

export default [
  // ESM build to be used with webpack/rollup.
  {
    input: 'src/index.ts',
    output: {
      format: 'esm',
      file: 'dist/library.esm.js'
    },
    plugins: [
    typescript({
      tsconfig: false,
      experimentalDecorators: true,
      module: 'es2015'
    }),
      vue()
    ]
  },
  // SSR build.
  {
    input: 'src/index.ts',
    output: {
      format: 'cjs',
      file: 'dist/library.ssr.js'
    },
    plugins: [
    typescript({
      tsconfig: false,
      experimentalDecorators: true,
      module: 'es2015'
    }),
      vue({ template: { optimizeSSR: true } })
    ]
  },
  // Browser build.
  {
    input: 'src/wrapper.ts',
    output: {
      format: 'iife',
      file: 'dist/library.js'
    },
    plugins: [
    typescript({
      tsconfig: false,
      experimentalDecorators: true,
      module: 'es2015'
    }),
      vue()
    ]
  }
]
