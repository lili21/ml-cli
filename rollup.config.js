import babel from 'rollup-plugin-babel'

export default {
  banner: '#!/usr/bin/env node',
  input: 'src/index',
  output: {
    file: 'dist/lls.js',
    format: 'cjs'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ]
}
