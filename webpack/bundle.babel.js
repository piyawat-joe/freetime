/**
 * @prettier
 */

import configBuilder from "./_config-builder"

const result = configBuilder(
  {
    minimize: true,
    mangle: true,
    sourcemaps: true,
    includeDependencies: true,
  },
  {
    entry: {
      "ui-bundle": [
        // "./src/polyfills.js", // TODO: remove?
        "./src/core/index.js",
      ],
    },

    output: {
      library: "SwaggerUIBundle",
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
      "timerange": {
          root: 'timerange',
          commonjs2: 'timerange',
          commonjs: 'timerange',
          amd: 'timerange'
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
      "moment": {
          root: 'moment',
          commonjs2: 'moment',
          commonjs: 'moment',
          amd: 'moment'
      },
      "@ali/xform-core": {
          root: 'XFormCore',
          commonjs2: '@ali/xform-core',
          commonjs: '@ali/xform-core',
          amd: '@ali/xform-core'
      },
      "@ali/xform-antd": {
          "root": "XForm",
          "commonjs2": "@ali/xform-antd",
          "commonjs": "@ali/xform-antd",
          "amd": "@ali/xform-antd"
      },
      "react-intl": {
          root: 'react-intl',
          commonjs2: 'react-intl',
          commonjs: 'react-intl',
          amd: 'react-intl'
      },
      "base64-js": {
          root: 'base64-js',
          commonjs2: 'base64-js',
          commonjs: 'base64-js',
          amd: 'base64-js'
      },
      "esprima": {
        root: 'esprima',
        commonjs2: 'esprima',
        commonjs: 'esprima',
        amd: 'esprima'
    },
  }
  }
)

export default result
