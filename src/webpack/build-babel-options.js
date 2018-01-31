import { omit, assign } from 'lodash'

export default function BBO ({ isProd, babelrc, browsers }) {
  const options = assign(
    {
      babelrc: false,
      presets: [
        [require.resolve('babel-preset-env'), {
          targets: { browsers },
          modules: false
        }],
        require.resolve('babel-preset-stage-2'),
        require.resolve('babel-preset-react'),
        ...(babelrc.presets || [])
      ],
      plugins: [
        require.resolve('babel-plugin-lodash'),
        require.resolve('babel-plugin-transform-decorators-legacy'),
        require.resolve('babel-plugin-transform-runtime'),
        ...(babelrc.plugins || [])
      ]
    },
    omit(babelrc, ['presets', 'plugins'])
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
