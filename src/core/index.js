import deepExtend from "deep-extend"

import System from "./system"
import ApisPreset from "./presets/apis"
import AllPlugins from "./plugins/all"
import { parseSearch } from "./utils"
import win from "./window"

// if (process.env.NODE_ENV !== "production" && typeof window !== "undefined") {
//   win.Perf = require("react-dom/lib/ReactPerf")
// }

// eslint-disable-next-line no-undef
const { GIT_DIRTY, GIT_COMMIT, PACKAGE_VERSION, HOSTNAME, BUILD_TIME } = buildInfo

export default function SwaggerUI(opts) {

  win.versions = win.versions || {}
  win.versions.swaggerUi = {
    version: PACKAGE_VERSION,
    gitRevision: GIT_COMMIT,
    gitDirty: GIT_DIRTY,
    buildTimestamp: BUILD_TIME,
    machine: HOSTNAME
  }

  const defaults = {
    // Some general settings, that we floated to the top
    dom_id: null, // eslint-disable-line camelcase
    domNode: null,
    spec: {"openapi":"3.0.1","info":{"title":"My App","description":"Some long and useful description","version":"v1"},"servers":[{"url":"http://localhost:8081/","description":"Generated server url"}],"paths":{"/user/info":{"get":{"tags":["user-info-controller"],"operationId":"getUserInfo","responses":{"200":{"description":"OK","content":{"*/*":{"schema":{"type":"object","additionalProperties":{"type":"object"}}}}}},"security":[{"security_auth":[]}]}},"/api/product/{id}":{"get":{"tags":["app-controller"],"operationId":"product","parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"}}],"responses":{"200":{"description":"OK","content":{"*/*":{"schema":{"type":"string"}}}}}}},"/api/exception":{"get":{"tags":["app-controller"],"operationId":"exception","responses":{"200":{"description":"OK","content":{"*/*":{"schema":{"type":"string"}}}}}}},"/api/exception2":{"get":{"tags":["app-controller"],"operationId":"excpetion2","responses":{"200":{"description":"OK","content":{"*/*":{"schema":{"type":"string"}}}}}}},"/api/checkout":{"get":{"tags":["app-controller"],"operationId":"checkout","responses":{"200":{"description":"OK","content":{"*/*":{"schema":{"type":"string"}}}}}}},"/api/products":{"get":{"tags":["app-controller"],"operationId":"products","responses":{"200":{"description":"OK","content":{"*/*":{"schema":{"type":"array","items":{"$ref":"#/components/schemas/Product"}}}}}}}},"/api/cart":{"get":{"tags":["app-controller"],"operationId":"viewCart","responses":{"200":{"description":"OK","content":{"*/*":{"schema":{"type":"string"}}}}}}},"/api/productcart":{"get":{"tags":["app-controller"],"operationId":"viewProductCart","responses":{"200":{"description":"OK","content":{"*/*":{"schema":{"type":"string"}}}}}}},"/api/add_cart":{"get":{"tags":["app-controller"],"operationId":"addToCart","parameters":[{"name":"product_id","in":"query","required":true,"schema":{"type":"string"}},{"name":"quantity","in":"query","required":true,"schema":{"type":"integer","format":"int32"}}],"responses":{"200":{"description":"OK","content":{"*/*":{"schema":{"type":"string"}}}}}}},"/api/cart_size":{"get":{"tags":["app-controller"],"operationId":"getCartSize","responses":{"200":{"description":"OK","content":{"*/*":{"schema":{"type":"string"}}}}}}}},"components":{"schemas":{"Product":{"type":"object","properties":{"id":{"type":"string"},"name":{"type":"string"},"description":{"type":"string"},"picture":{"type":"string"},"price":{"type":"number","format":"double"},"categories":{"type":"array","items":{"type":"string"}}}}},"securitySchemes":{"security_auth":{"type":"oauth2","flows":{"authorizationCode":{"authorizationUrl":"http://localhost:8080/auth/realms/freetimehero/protocol/openid-connect/auth","tokenUrl":"http://localhost:8080/auth/realms/freetimehero/protocol/openid-connect/token","scopes":{"read":"reade scope","write":"write scope","admin":"admin scope"}}}}}}},
    url: "",
    urls: null,
    layout: "BaseLayout",
    docExpansion: "list",
    maxDisplayedTags: null,
    filter: null,
    validatorUrl: "https://validator.swagger.io/validator",
    oauth2RedirectUrl: `${window.location.protocol}//${window.location.host}/oauth2-redirect.html`,
    configs: {},
    custom: {},
    displayOperationId: false,
    displayRequestDuration: false,
    deepLinking: false,
    requestInterceptor: (a => a),
    responseInterceptor: (a => a),
    showMutatedRequest: true,
    defaultModelRendering: "example",
    defaultModelExpandDepth: 1,
    defaultModelsExpandDepth: 1,
    showExtensions: false,
    showCommonExtensions: false,
    withCredentials: undefined,
    supportedSubmitMethods: [
      "get",
      "put",
      "post",
      "delete",
      "options",
      "head",
      "patch",
      "trace"
    ],

    // Initial set of plugins ( TODO rename this, or refactor - we don't need presets _and_ plugins. Its just there for performance.
    // Instead, we can compile the first plugin ( it can be a collection of plugins ), then batch the rest.
    presets: [
      ApisPreset
    ],

    // Plugins; ( loaded after presets )
    plugins: [
    ],

    // Initial state
    initialState: { },

    // Inline Plugin
    fn: { },
    components: { },
  }

  let queryConfig = parseSearch()

  const domNode = opts.domNode
  delete opts.domNode

  const constructorConfig = deepExtend({}, defaults, opts, queryConfig)

  const storeConfigs = {
    system: {
      configs: constructorConfig.configs
    },
    plugins: constructorConfig.presets,
    state: deepExtend({
      layout: {
        layout: constructorConfig.layout,
        filter: constructorConfig.filter
      },
      spec: {
        spec: "",
        url: constructorConfig.url
      }
    }, constructorConfig.initialState)
  }

  if(constructorConfig.initialState) {
    // if the user sets a key as `undefined`, that signals to us that we
    // should delete the key entirely.
    // known usage: Swagger-Editor validate plugin tests
    for (var key in constructorConfig.initialState) {
      if(
        constructorConfig.initialState.hasOwnProperty(key)
        && constructorConfig.initialState[key] === undefined
      ) {
        delete storeConfigs.state[key]
      }
    }
  }

  let inlinePlugin = ()=> {
    return {
      fn: constructorConfig.fn,
      components: constructorConfig.components,
      state: constructorConfig.state,
    }
  }

  var store = new System(storeConfigs)
  store.register([constructorConfig.plugins, inlinePlugin])

  var system = store.getSystem()

  const downloadSpec = (fetchedConfig) => {
    let localConfig = system.specSelectors.getLocalConfig ? system.specSelectors.getLocalConfig() : {}
    let mergedConfig = deepExtend({}, localConfig, constructorConfig, fetchedConfig || {}, queryConfig)

    // deep extend mangles domNode, we need to set it manually
    if(domNode) {
      mergedConfig.domNode = domNode
    }

    store.setConfigs(mergedConfig)
    system.configsActions.loaded()

    if (fetchedConfig !== null) {
      if (!queryConfig.url && typeof mergedConfig.spec === "object" && Object.keys(mergedConfig.spec).length) {
        system.specActions.updateUrl("")
        system.specActions.updateLoadingStatus("success")
        system.specActions.updateSpec(JSON.stringify(mergedConfig.spec))
      } else if (system.specActions.download && mergedConfig.url && !mergedConfig.urls) {
        system.specActions.updateUrl(mergedConfig.url)
        system.specActions.download(mergedConfig.url)
      }
    }

    if(mergedConfig.domNode) {
      system.render(mergedConfig.domNode, "App")
    } else if(mergedConfig.dom_id) {
      let domNode = document.querySelector(mergedConfig.dom_id)
      system.render(domNode, "App")
    } else if(mergedConfig.dom_id === null || mergedConfig.domNode === null) {
      // do nothing
      // this is useful for testing that does not need to do any rendering
    } else {
      console.error("Skipped rendering: no `dom_id` or `domNode` was specified")
    }

    return system
  }

  const configUrl = queryConfig.config || constructorConfig.configUrl

  if (!configUrl || !system.specActions || !system.specActions.getConfigByUrl || system.specActions.getConfigByUrl && !system.specActions.getConfigByUrl({
    url: configUrl,
    loadRemoteConfig: true,
    requestInterceptor: constructorConfig.requestInterceptor,
    responseInterceptor: constructorConfig.responseInterceptor,
  }, downloadSpec)) {
    return downloadSpec()
  } else {
    system.specActions.getConfigByUrl(configUrl, downloadSpec)
  }

  return system
}

// Add presets
SwaggerUI.presets = {
  apis: ApisPreset,
}

// All Plugins
SwaggerUI.plugins = AllPlugins
