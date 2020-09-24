// import FreetimeLayout from "./layout"
import CartLayout from "./home"
import TopbarPlugin from "../header"
// import TopbarPlugin from "plugins/topbar"
// import ConfigsPlugin from "corePlugins/configs"

// the Standalone preset

export default [
  TopbarPlugin,
  // ConfigsPlugin,
  () => {
    return {
      components: { CartLayout }
    }
  }
]
