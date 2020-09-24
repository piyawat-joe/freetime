import React from "react"
import PropTypes from "prop-types"

export default class App extends React.Component {

  getLayout() {
    let { getComponent, layoutSelectors } = this.props
    console.log(this.props)
    console.log(layoutSelectors)
    const layoutName = layoutSelectors.current()
    console.log(layoutName)
    const Component = getComponent(layoutName, true)
    return Component ? Component : ()=> <h1> No layout defined for &quot;{layoutName}&quot; </h1>
  }

  render() {
    const Layout = this.getLayout()

    return (
      <Layout {...this.props}/>
    )
  }
}

App.propTypes = {
  getComponent: PropTypes.func.isRequired,
  layoutSelectors: PropTypes.object.isRequired,
}

App.defaultProps = {
}
