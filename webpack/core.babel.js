/**
 * @prettier
 */

import configBuilder from "./_config-builder"

const result = configBuilder(
  {
    minimize: true,
    mangle: true,
    sourcemaps: true,
    includeDependencies: false,
  },
  {
    entry: {
      "ui-bundle": [
        "./src/polyfills.js", // TODO: remove?
        "./src/core/index.js",
      ],
    },

    output: {
      library: "SwaggerUICore",
    },
    externals: {
      'react': {
          root: 'React',
          commonjs2: 'react',
          commonjs: 'react',
          amd: 'react'
      },
      // 'prop-types': {
      //     root: 'PropTypes',
      //     commonjs2: 'prop-types',
      //     commonjs: 'prop-types',
      //     amd: 'prop-types'
      // },
      'react-dom': {
          root: 'ReactDOM',
          commonjs2: 'react-dom',
          commonjs: 'react-dom',
          amd: 'react-dom'
      },
      "classnames": {
          root: 'classnames',
          commonjs2: 'classnames',
          commonjs: 'classnames',
          amd: 'classnames'
      },
      "redux": {
        root: 'redux',
        commonjs2: 'redux',
        commonjs: 'redux',
        amd: 'redux'
    },
      // 'react-dom/server': {
      //     root: 'ReactDOM',
      //     commonjs2: 'react-dom',
      //     commonjs: 'react-dom',
      //     amd: 'react-dom'
      // },
      // 'Keycloak':{
      //     root: 'Keycloak',
      //     commonjs2: 'Keycloak',
      //     commonjs: 'Keycloak',
      //     amd: 'Keycloak'
      // },
      'react-redux': {
          root: 'ReactRedux',
          commonjs2: 'react-redux',
          commonjs: 'react-redux',
          amd: 'react-redux'
      },
      'react-router-dom':{
          root: 'react-router-dom',
          commonjs2: 'react-router-dom',
          commonjs: 'react-router-dom',
          amd: 'react-router-dom'
      },
      'history':{
        root: 'history',
        commonjs2: 'history',
        commonjs: 'history',
        amd: 'history'
    },
      "@ali/yodajs": {
          root: 'Yoda',
          commonjs2: '@ali/yodajs',
          commonjs: '@ali/yodajs',
          amd: '@ali/yodajs'
      },
      "antd": {
          root: 'antd',
          commonjs2: 'antd',
          commonjs: 'antd',
          amd: 'antd'
      },
      "lodash": {
          root: 'lodash',
          commonjs2: 'lodash',
          commonjs: 'lodash',
          amd: 'lodash'
      },
      // "@ali/mirrorz": {
      //     root: 'mirrorz',
      //     commonjs2: '@ali/mirrorz',
      //     commonjs: '@ali/mirrorz',
      //     amd: '@ali/mirrorz'
      // },
      // "@ali/mirror-editor-core": {
      //     root: 'XEditor',
      //     commonjs2: '@ali/mirror-editor-core',
      //     commonjs: '@ali/mirror-editor-core',
      //     amd: '@ali/mirror-editor-core'
      // },
      // "moment": {
      //     root: 'moment',
      //     commonjs2: 'moment',
      //     commonjs: 'moment',
      //     amd: 'moment'
      // },
      // "react-intl/locale-data/th": {
      //     root: 'react-intl/locale-data/th',
      //     commonjs2: 'react-intl/locale-data/th',
      //     commonjs: 'react-intl/locale-data/th',
      //     amd: 'react-intl/locale-data/th'
      // },
      // "react-intl/locale-data/en": {
      //     root: 'react-intl/locale-data/en',
      //     commonjs2: 'react-intl/locale-data/en',
      //     commonjs: 'react-intl/locale-data/en',
      //     amd: 'react-intl/locale-data/en'
      // },
      // "react-intl/locale-data/zh": {
      //     root: 'react-intl/locale-data/zh',
      //     commonjs2: 'react-intl/locale-data/zh',
      //     commonjs: 'react-intl/locale-data/zh',
      //     amd: 'react-intl/locale-data/zh'
      // },

    }
  }
)

export default result
