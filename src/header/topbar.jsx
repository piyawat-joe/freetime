import React, { cloneElement } from "react"
import { connect } from 'react-redux';
import oauth2Authorize from "core/oauth2-authorize"
import PropTypes from "prop-types"
import { Input,Row,Col } from 'antd'

//import "./topbar.less"
import Logo from "./logo_small.svg"
import {parseSearch, serializeSearch} from "../core/utils"
const { Search } = Input;
export class Topbar extends React.Component {

  static propTypes = {
    layoutActions: PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props, context)
    this.state = { 
      url: props.specSelectors.url(), 
      selectedIndex: 0,
      isAuthorized: false
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    const { isAuthorized } = nextProps
    if(isAuthorized && isAuthorized !== this.props.isAuthorized){
        this.getExec('/user/info','get')
    }
    // this.setState({ isAuthorized })
  }

  onUrlChange =(e)=> {
    let {target: {value}} = e
    this.setState({url: value})
  }

  loadSpec = (url) => {
    this.props.specActions.updateUrl(url)
    this.props.specActions.download(url)
  }

  onUrlSelect =(e)=> {
    let url = e.target.value || e.target.href
    this.loadSpec(url)
    this.setSelectedUrl(url)
    e.preventDefault()
  }

  downloadUrl = (e) => {
    this.loadSpec(this.state.url)
    e.preventDefault()
  }

  setSearch = (spec) => {
    let search = parseSearch()
    search["urls.primaryName"] = spec.name
    const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`
    if(window && window.history && window.history.pushState) {
      window.history.replaceState(null, "", `${newUrl}?${serializeSearch(search)}`)
    }
  }

  setSelectedUrl = (selectedUrl) => {
    const configs = this.props.getConfigs()
    const urls = configs.urls || []

    if(urls && urls.length) {
      if(selectedUrl)
      {
        urls.forEach((spec, i) => {
          if(spec.url === selectedUrl)
            {
              this.setState({selectedIndex: i})
              this.setSearch(spec)
            }
        })
      }
    }
  }

  componentDidMount() {
    const configs = this.props.getConfigs()
    const urls = configs.urls || []

    if(urls && urls.length) {
      var targetIndex = this.state.selectedIndex
      let primaryName = configs["urls.primaryName"]
      if(primaryName)
      {
        urls.forEach((spec, i) => {
          if(spec.name === primaryName)
            {
              this.setState({selectedIndex: i})
              targetIndex = i
            }
        })
      }

      this.loadSpec(urls[targetIndex].url)
    }
  }

  onFilterChange =(e) => {
    let {target: {value}} = e
    this.props.layoutActions.updateFilter(value)
  }

  authorize = () => {
    const { authActions, errActions, getConfigs, authSelectors, specSelectors, errSelectors } = this.props
    let authorized = authSelectors.authorized()
    console.log(authorized)
    let auth = authorized && authorized.get(name)
    let authConfigs = authSelectors.getConfigs() || {}
    let username = auth && auth.get("username") || ""
    let clientId = auth && auth.get("clientId") || authConfigs.clientId || ""
    let clientSecret = auth && auth.get("clientSecret") || authConfigs.clientSecret || ""
    let passwordType = auth && auth.get("passwordType") || "basic"
    let name = '';
    let schema = '';
    let isValid = false;

    console.log(authConfigs)
    const securityDefinitions = specSelectors.securityDefinitions()
    console.log(securityDefinitions)
    // let definitions = authSelectors.shownDefinitions()
    // console.log(definitions)

    const authorizableDefinitions = authSelectors.definitionsToAuthorize()
    console.log(authorizableDefinitions)
    // authActions.showDefinitions(authorizableDefinitions)
    if(authorizableDefinitions.size > 0){
      authorizableDefinitions.map(( definition, key ) => {
        console.log(definition)
        console.log(key)
      let oauthDefinitions = definition.filter( schema => schema.get("type") === "oauth2")
      console.log(oauthDefinitions)
   
        if(oauthDefinitions && oauthDefinitions.size){
          definition.filter( schema => schema.get("type") === "oauth2")
                      .map( (schem, key) =>{
                        name = key
                        schema = schem
                      }
                      ).toArray()
        }

        let errors = errSelectors.allErrors().filter( err => err.get("authId") === name)
        isValid = !errors.filter( err => err.get("source") === "validation").size
        console.log(name)
        console.log(errors)
        console.log(isValid)
      })
    }

    const state = {
      appName: authConfigs.appName,
      name: name,
      schema: schema,
      scopes: ["read", "write",],
      clientId: clientId,
      clientSecret: clientSecret,
      username: username,
      password: "",
      passwordType: passwordType
  }

    // let configs = getConfigs()
    // const specPath = Im.List(["components", 'securitySchemes', 'security_auth'])
    // const operation = specSelectors.specResolvedSubtree(specPath.toJS())
    // console.log(specPath);
    // console.log(operation);

    errActions.clear({authId: name,type: "auth", source: "auth"})
    oauth2Authorize({auth: state, authActions, errActions, configs: getConfigs(), authConfigs })
  }

  getExec =(path, method)=> {
    const { specSelectors, specActions /* ,operation, path, method */} = this.props
      // const operation = specSelectors.specResolvedSubtree(specPath.toJS())
      let operation = ''

      operation = specSelectors.specResolvedSubtree(["paths", path, method])
      console.log(operation)

      console.log(path)
      console.log(method)
      // specActions.validateParams( [path, method] )
      specActions.execute( { operation, path, method } )
      this.setState({ path,method })
  }

  logout =() => {

    let { authActions, errActions } = this.props

    errActions.clear({authId: 'security_auth', type: "auth", source: "auth"})
    authActions.logout([ 'security_auth' ])
  }

  render() {
    let { getComponent, specSelectors, getConfigs, authSelectors, isAuthorized, userResponse } = this.props
    // const { isAuthorized } = this.state
    const Button = getComponent("Button")
    const Link = getComponent("Link")

    let isLoading = specSelectors.loadingStatus() === "loading"
    let isFailed = specSelectors.loadingStatus() === "failed"

    let inputStyle = {}
    if(isFailed) inputStyle.color = "red"
    if(isLoading) inputStyle.color = "#aaa"

    const { urls } = getConfigs()
    let control = []
    let formOnSubmit = null

    if(urls) {
      let rows = []
      urls.forEach((link, i) => {
        rows.push(<option key={i} value={link.url}>{link.name}</option>)
      })

      control.push(
        <label className="select-label" htmlFor="select"><span>Select a definition</span>
          <select id="select" disabled={isLoading} onChange={ this.onUrlSelect } value={urls[this.state.selectedIndex].url}>
            {rows}
          </select>
        </label>
      )
    }
    else {
      formOnSubmit = this.downloadUrl
      control.push(<input className="download-url-input" type="text" onChange={ this.onUrlChange } value={this.state.url} disabled={isLoading} style={inputStyle} />)
      control.push(<Button className="download-url-button" onClick={ this.downloadUrl }>Explore</Button>)
    }


    
    console.log(isAuthorized)
    console.log(this.props)
    let user_name
    if( userResponse && userResponse.get('data') && userResponse.get('status') !== 500){
      const res = JSON.parse(userResponse.get('data'))
      user_name = res.user_name
    }

const style = { background: '#0092ff', padding: '8px 0' };
    return (    
<div class="lzd-header">

      <div class="lzd-header-content">

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Col className="gutter-row" span={8}>
      </Col>
      <Col className="gutter-row" span={8}>
      </Col>
      <Col className="gutter-row" span={8}>
      <div class="top-header" style={{marginLeft:'80%', display: 'flex'}}>
      { isAuthorized ?  ( 
        <>
       <div style={{color: "black", paddingRight:'10px' }}> {`Hi ${user_name}!`} </div>
        <Link style={{color: "gray"}} onClick={ () => this.logout() }>Logout</Link>  </>) : 
        (
        <div>
          {/* <Link style={{color: "gray", paddingRight:'10px' }} onClick={ () => this.authorize() }>Login/Signup</Link>  */}
          {/* <Link target="_blank" style={{color: "gray"}} href="http://localhost:8080/auth/realms/freetimehero/login-actions/registration?client_id=freetimehero">Signup</Link> */}
        </div>
        ) }
        {/* {user_name} */}
      {/* {body.map(b => <li key={b.id}>{b.name}</li>)} */}

      {/* <Button className="btn modal-btn auth authorize" onClick={ () => this.getExec('/api/products','get') }>Get Product</Button>
         <Button className="btn modal-btn auth authorize" onClick={ () => this.getExec('/user/info','get') }>Get User</Button> */}
         </div>
      </Col>
    </Row>

        <div class="lzd-logo-bar">
          <div class="logo-bar-content header-content">
            
    <Row >
      <Col className="gutter-row" xs={2} sm={4} md={4} lg={4} xl={4}>
      <div class="lzd-logo-content">
        <a href="/">
          <img src="//freetimehero.oss-ap-southeast-1.aliyuncs.com/img/freetime-logo.png" alt="Alibaba Cloud Logo"/>
          </a>
      </div>
      </Col>
      <Col className="gutter-row" xs={24} sm={24} md={12} lg={12} xl={12}>
      <div class="lzd-nav-search" data-spm="search">
        <div style={{padding: '0 20px'}} class="search-box--2I2a">
        <Search placeholder="input search text" onSearch={value => console.log(value)} enterButton />
        </div>
      </div>
      </Col>
      <Col className="gutter-row" xs={24} sm={24} md={8} lg={8} xl={8}>
      </Col>
    </Row>


              {/* <div class="lzd-nav-cart">
                  
                  
                <a href="/cart" data-spm="dcart"><span class="cart-icon"></span>
                <span class="cart-num" id="topActionCartNumber"></span></a>
              </div> */}

            
          </div>
        </div>
      </div>
 
  </div>

    )
  }
}

const mapStateToProps = (state, props) => {
  console.log(state)
  const authorizedAuth = props.authSelectors.authorized().get('security_auth')
  const isAuthorized = !!authorizedAuth
  // if(props.specSelectors.responses().size > 0){
    // console.log(props.specSelectors.responses().getIn(['/api/products', 'get','data'], null))
    // console.log(props.specSelectors.responses().getIn(['api/products', 'get'], null))
    // const iterator1 = props.specSelectors.responses().entries();
    // const products = props.specSelectors.responses().getIn(['/api/products', 'get','body'], null)
    // products.forEach(p => {
    //   console.log(p)
    //   console.log(p.get("id")) //forEach(p1 => console.log(p1))
    // })
    // console.log(state.get("spec"))
    // console.log(state.get("spec").get("responses"))
    // console.log(state.get("spec").get("responses").get('/api/products'))
    // console.log(state.get("spec").get("responses").getIn(['/api/products', 'get']))
  // }
  return {
    // productsResponse: props.specSelectors.responseFor('/api/products', 'get'),
    // productsResponse: props.specSelectors.responses().getIn(['/api/products', 'get','body'], null),
    userResponse: props.specSelectors.responseFor('/user/info', 'get'),
    isAuthorized
  }
}

export default connect(mapStateToProps, null)(Topbar);

// Topbar.propTypes = {
//   specSelectors: PropTypes.object.isRequired,
//   specActions: PropTypes.object.isRequired,
//   getComponent: PropTypes.func.isRequired,
//   getConfigs: PropTypes.func.isRequired
// }
