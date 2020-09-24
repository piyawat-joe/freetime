import React, { Component } from "react"
import ReactDOM from "react-dom"
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { connect, Provider } from "react-redux"
import omit from "lodash/omit"
import NotFoundPage from '../../routers/NotFoundPage';
export const history = createBrowserHistory();
const SystemWrapper = (getSystem, ComponentToWrap ) => class extends Component {
  render() {
    console.log('SystemWrapper')
    console.log(getSystem())
    console.log(ComponentToWrap)
    console.log(this.props)
    console.log(this.context)
    return <ComponentToWrap {...getSystem() } {...this.props} {...this.context} />
  }
}

const RootWrapper = (reduxStore, ComponentToWrap) => class extends Component {
  
  render() {
    console.log('RootWrapper')
    console.log(reduxStore)
    console.log(ComponentToWrap)
    console.log(this.props)
    console.log(this.context)
    return (
      <Provider store={reduxStore}>
        {/* <Router history={history}>
          <div>
            <Switch>
              <Route component={ComponentToWrap} {...this.props} {...this.context} path="/" exact={true}/>
              <Route path="/product/:id" component={EditExpensePage} />
              <Route component={Home} path="/cart" exact={true}/>
              <Route component={NotFoundPage} />
            </Switch>
          </div>
        </Router> */}
        {/* <ComponentToWrap {...this.props} {...this.context} /> */}
      </Provider>
    )
  }
}

const makeContainer = (getSystem, component, reduxStore) => {
  const mapStateToProps = function(state, ownProps) {
    const propsForContainerComponent = Object.assign({}, ownProps, getSystem())
    const ori = component.prototype.mapStateToProps || (state => { return {state} })
    return ori(state, propsForContainerComponent)
  }
  console.log(getSystem)
  console.log(component)
  console.log(reduxStore)
  let wrappedWithSystem = SystemWrapper(getSystem, component, reduxStore)
  let connected = connect( mapStateToProps )(wrappedWithSystem)
  if(reduxStore)
    return RootWrapper(reduxStore, connected)
  return connected
}

const handleProps = (getSystem, mapping, props, oldProps) => {
  for (let prop in mapping) {
    let fn = mapping[prop]
    if(typeof fn === "function")
      fn(props[prop], oldProps[prop], getSystem())
  }
}

export const makeMappedContainer = (getSystem, getStore, memGetComponent, getComponents, componentName, mapping) => {

  return class extends Component {

    constructor(props, context) {
      super(props, context)
      handleProps(getSystem, mapping, props, {})
    }

    componentWillReceiveProps(nextProps) {
      handleProps(getSystem, mapping, nextProps, this.props)
    }

    render() {
      let cleanProps = omit(this.props, mapping ? Object.keys(mapping) : [])
      let Comp = memGetComponent(componentName, "root")
      return <Comp {...cleanProps}/>
    }

  }

}

export const render = (getSystem, getStore, getComponent, getComponents, domNode) => {
  // console.log(getSystem)
  // console.log(getStore())
  // console.log(getComponents("App"))
  // console.log(getComponents)
  // console.log(domNode)
  // let App = (getComponent(getSystem, getStore, getComponents, "App", "root"))

  // const mapStateToProps = (state, props) => ({
  //   id: props.match.params.id // state.expenses.find((expense) => expense.id === props.match.params.id)
  // });

  // const mapStateToProps= function(state, ownProps) {
  //   console.log(ownProps)
  //   const propsForContainerComponent = Object.assign({}, ownProps , getSystem())
  //   // const propsForContainerComponent = Object.assign({}, ownProps)
  //   const ori = getComponents("App").prototype.mapStateToProps || (state => { return {state} })
  //   return ori(state, ownProps)
  // }
  let wrappedWithSystem = SystemWrapper(getSystem, getComponents("App"), getStore())
  console.log(wrappedWithSystem)

  // const Component = (getComponent(getSystem, getStore, getComponents, "ProductLayout"))
  let wrappedWithSystem2 = SystemWrapper(getSystem, getComponents("ProductLayout"), getStore())
  console.log(wrappedWithSystem2)

  let wrappedWithSystem3 = SystemWrapper(getSystem, getComponents("CartLayout"), getStore())
  console.log(wrappedWithSystem3)

  let wrappedWithSystem4 = SystemWrapper(getSystem, getComponents("BaseLayout"), getStore())
  console.log(wrappedWithSystem4)
  
  // let connected = connect( mapStateToProps )(wrappedWithSystem)

  // let connectedProduct = connect( mapStateToProps )(wrappedWithSystem2)

  // const Home = () => (
  //   <div>
  //     <h2>Home</h2>
  //   </div>
  // );
  const Home = ({ match }) => (
    <div>
      <h3>{match.params.id}</h3>
    </div>
  )
  // console.log(this.props)
  // console.log(this.context)

  const App = (
    <Provider store={getStore()}>
     <Router history={history}>
     <div>

      {/* <Header />  */}
        <Switch>
          <Route component={wrappedWithSystem} path="/" exact={true}/>
          <Route path="/product/:id" component={wrappedWithSystem} exact={true}/>
          <Route component={wrappedWithSystem3} path="/cart" exact={true}/>
          <Route component={wrappedWithSystem4} path="/swagger" />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Router> 
    {/* <ComponentToWrap {...this.props} {...this.context} /> */}
  </Provider>
  )
  console.log(App)
  ReactDOM.render(App, domNode)
  // ReactDOM.render(( <App/> ), domNode)
}

// Render try/catch wrapper
const createClass = component => class extends Component {
  render() {
    return component(this.props)
  }
}

const Fallback = ({ name }) => <div style={{ // eslint-disable-line react/prop-types
    padding: "1em",
    "color": "#aaa"
  }}>😱 <i>Could not render { name === "t" ? "this component" : name }, see the console.</i></div>

const wrapRender = (component) => {
  const isStateless = component => !(component.prototype && component.prototype.isReactComponent)

  const target = isStateless(component) ? createClass(component) : component

  const ori = target.prototype.render

  target.prototype.render = function render(...args) {
    try {
      return ori.apply(this, args)
    } catch (error) {
      console.error(error) // eslint-disable-line no-console
      return <Fallback error={error} name={target.name} />
    }
  }

  return target
}

export const getComponent = (getSystem, getStore, getComponents, componentName, container, config = {}) => {

  if(typeof componentName !== "string")
    throw new TypeError("Need a string, to fetch a component. Was given a " + typeof componentName)

    // getComponent has a config object as a third, optional parameter
    // using the config object requires the presence of the second parameter, container
    // e.g. getComponent("JsonSchema_string_whatever", false, { failSilently: true })
  let component = getComponents(componentName)

  if(!component) {
    if (!config.failSilently) {
      getSystem().log.warn("Could not find component:", componentName)
    }
    return null
  }

  if(!container)
    return wrapRender(component)

  if(container === "root")
    return makeContainer(getSystem, component, getStore())

  // container == truthy
  return makeContainer(getSystem, wrapRender(component))
}
