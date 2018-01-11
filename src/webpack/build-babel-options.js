export default function BBO ({ isProd, babelrc, browsers }) {
  const options = Object.assign(
    {
      babelrc: false,
      presets: [
        [require.resolve('babel-preset-env'), {
          targets: { browsers },
          modules: false
        }],
        require.resolve('babel-preset-stage-2'),
        require.resolve('babel-preset-react')
      ],
      plugins: [
        require.resolve('babel-plugin-lodash'),
        require.resolve('babel-plugin-transform-runtime')
      ]
    },
    babelrc
  )

  if (isProd) {
    options.plugins = [
      ...options.plugins,
      require.resolve('babel-plugin-transform-react-constant-elements'),
      require.resolve('babel-plugin-transform-react-remove-prop-types')
    ]
  }

  return options
}
