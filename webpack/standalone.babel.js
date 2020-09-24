/**
 * @prettier
 */

import configBuilder from "./_config-builder"

const result = configBuilder(
  {
    minimize: true,
    mangle: true,
    sourcemaps: true,
  },
  {
    entry: {
      "freetime": ["./src/standalone/index.js"],
    },

    output: {
      library: "freetimePreset",
    },
    externals: {
      'react': {
          root: 'React',
          commonjs2: 'react',
          commonjs: 'react',
          amd: 'react'
      },
      "antd": {
          root: 'antd',
          commonjs2: 'antd',
          commonjs: 'antd',
          amd: 'antd'
      },
      'react-redux': {
        root: 'ReactRedux',
        commonjs2: 'react-redux',
        commonjs: 'react-redux',
        amd: 'react-redux'
    },
    }
  }
)

export default result
