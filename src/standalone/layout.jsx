

import React from "react"
import PropTypes from "prop-types"
import oauth2Authorize from "core/oauth2-authorize"
import Im from "immutable"
// import { isAuthorized } from "../core/plugins/auth/selectors"

export default class StandaloneLayout extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      executeInProgress: false
    }
  }
  static propTypes = {
    errSelectors: PropTypes.object.isRequired,
    errActions: PropTypes.object.isRequired,
    specActions: PropTypes.object.isRequired,
    specSelectors: PropTypes.object.isRequired,
    layoutSelectors: PropTypes.object.isRequired,
    layoutActions: PropTypes.object.isRequired,
    getComponent: PropTypes.func.isRequired
  }

  mapStateToProps(state, props) {
    
    return {
      fooresponse: props.specSelectors.responseFor('/api/foos', 'get'),
      userresponse: props.specSelectors.responseFor('/user/info', 'get'),

    }
  }

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.requestResolvedSubtree()
  //     setTimeout(() => {
  //       this.getResolvedSubtree('/user/info','get')
  //     }, 40)
  //   }, 40)
    
  // }

  componentWillReceiveProps(nextProps) {
    const { fooresponse, userresponse } = nextProps
    // const resolvedSubtree = this.getResolvedSubtree()
    if(fooresponse !== this.props.fooresponse || userresponse !== this.props.userresponse ) {
      this.setState({ executeInProgress: false })
    }

    // if(resolvedSubtree === undefined) {
    //   this.requestResolvedSubtree()
    // }
  }

  // requestResolvedSubtree =()=> {
  //   let { specSelectors, specActions } = this.props
  //   // const path = '/api/foos'
  //   // const method = 'get'
  //   const taggedOps = specSelectors.taggedOperations()
  //   let specPath = Im.List([])
  //   taggedOps.map( (tagObj, tag) => {
  //     const operations = tagObj.get("operations")
  //     console.log(operations)
  //     operations.map( op => {
  //       const path = op.get("path")
  //       const method = op.get("method")
  //       // if(path === op.get("path") && method === op.get("method"))
  //       // {
  //       specPath = Im.List(["paths", path, method])
  //       // specPath.push(["paths", path, method])
  //       console.log(path)
  //       console.log(method)
  //       console.log(specPath)
  //       specActions.requestResolvedSubtree(specPath.toJS())
  //       // }
  //     })
  //   }
  //   )
    
  // }

  getResolvedSubtree =(path, method)=> {
    let { specSelectors, specActions } = this.props
    // const path = '/api/foos'
    // const method = 'get'
    const taggedOps = specSelectors.taggedOperations()
    let operation
    taggedOps.map( (tagObj, tag) => {
      const operations = tagObj.get("operations")
      operations.map( op => {
        if(path === op.get("path") && method === op.get("method"))
        {
        const specPath = Im.List(["paths", path, method])
        console.log(path)
        console.log(method)
        console.log(specPath)
        operation = specSelectors.specResolvedSubtree(specPath.toJS())
        console.log(operation)
        }
      })
    }
    )

    specActions.validateParams( [path, method] )

    if ( specSelectors.validateBeforeExecute([path, method]) ) {
      this.setState({ executeInProgress: true })
      specActions.execute( { operation, path, method } )
      this.setState({ path,method })
    } else {
      // deferred by 40ms, to give element class change time to settle.
      specActions.clearValidateParams( [path, method] )
      setTimeout(() => {
        specActions.validateParams([path, method])
      }, 40)
    }
  }

  authorize = (state, name) => {
    console.log(state)
    console.log(name)
    let { authActions, errActions, getConfigs, authSelectors } = this.props
    let configs = getConfigs()
    let authConfigs = authSelectors.getConfigs()

    errActions.clear({authId: name,type: "auth", source: "auth"})
    oauth2Authorize({auth: state, authActions, errActions, configs, authConfigs })
  }

  logout =(name) => {

    let { authActions, errActions } = this.props

    errActions.clear({authId: name, type: "auth", source: "auth"})
    authActions.logout([ name ])
  }

  render() {
    const { getComponent, authSelectors, errSelectors, fooresponse, userresponse } = this.props
    let { executeInProgress } = this.state
    console.log(this.state);
    console.log(this.props);
    let Container = getComponent("Container")
    let Row = getComponent("Row")
    let Col = getComponent("Col")

    const Button = getComponent("Button")
    const Topbar = getComponent("Topbar", true)
    const BaseLayout = getComponent("BaseLayout", true)

    const authorizableDefinitions = authSelectors.definitionsToAuthorize()
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
    let isAuthorized = false;
    let isValid = false;

    // authActions.showDefinitions(authorizableDefinitions)

    console.log(authorizableDefinitions)
    if(authorizableDefinitions.size > 0){
      authorizableDefinitions.map(( definition, key ) => {
        console.log(definition)
        console.log(key)
      let oauthDefinitions = definition.filter( schema => schema.get("type") === "oauth2")
      console.log(oauthDefinitions)
   
        if(oauthDefinitions && oauthDefinitions.size){
          definition.filter( schema => schema.get("type") === "oauth2")
                      .map( (schema2, name2) =>{
                        name = name2
                        schema = schema2
                      }
                      ).toArray()
        }

        let authorizedAuth = authSelectors.authorized().get(name)
        isAuthorized = !!authorizedAuth
        let errors = errSelectors.allErrors().filter( err => err.get("authId") === name)
        isValid = !errors.filter( err => err.get("source") === "validation").size
    
        console.log(authorizedAuth)
        console.log(isAuthorized)
        console.log(errors)
        console.log(isValid)
      })
    }

    console.log(authConfigs.appName)
    console.log(name)
    console.log(schema)
    console.log(clientId)
    console.log(clientSecret)
    console.log(username)
    console.log(passwordType)

    // this.setState({
    //   appName: authConfigs.appName,
    //   name: name,
    //   schema: schema,
    //   scopes: ["read", "write",],
    //   clientId: clientId,
    //   clientSecret: clientSecret,
    //   username: username,
    //   password: "",
    //   passwordType: passwordType
    // })

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
  
  let status = ''
  let headers = ''
  let notDocumented = ''
  let isError = ''
  let body=[]
  let userbody=[]
  let duration = ''
  console.log('userresponse');
  console.log(userresponse);
  console.log('fooresponse');
  console.log(fooresponse);
  if(!!userresponse && userresponse.get("statusCode") === 200){
   status = userresponse.get("status")
  // const url = curlRequest.get("url")
   headers = userresponse.get("headers").toJS()
   notDocumented = userresponse.get("notDocumented")
   isError = userresponse.get("error")
   userbody = userresponse.get("body").toJS()
   duration = userresponse.get("duration")
  }else if(!!userresponse && userresponse.get("statusCode") !== 200){
    isError = userresponse.get("error")
    status = userresponse.get("status")
  }

  if(!!fooresponse && fooresponse.get("statusCode") === 200){
    status = fooresponse.get("status")
   // const url = curlRequest.get("url")
    headers = fooresponse.get("headers").toJS()
    notDocumented = fooresponse.get("notDocumented")
    isError = fooresponse.get("error")
    body = fooresponse.get("body").toJS()
    duration = fooresponse.get("duration")
   }else if(!!fooresponse && fooresponse.get("statusCode") !== 200){
    isError = fooresponse.get("error")
    status = fooresponse.get("status")
  }
  const { user_name } = userbody || '';
  console.log(headers)
    return (

      <Container className='swagger-ui'>
        {/* <Link href="http://localhost:8080/auth/realms/freetimehero/protocol/openid-connect/auth?response_type=code&client_id=freetimehero&redirect_uri=http%3A%2F%2Flocalhost%3A3200%2Foauth2-redirect.html&scope=read%20write&state=RnJpIEp1biAyNiAyMDIwIDE5OjE0OjEwIEdNVCswNzAwIChJbmRvY2hpbmEgVGltZSk%3D&realm=freetimehero">Login</Link> */}
        { //isValid &&
          ( isAuthorized ? <Button className="btn modal-btn auth authorize" onClick={ () => this.logout(name) }>Logout</Button>
        : (<Button className="btn modal-btn auth authorize" onClick={ () => this.authorize(state, name) }>Login</Button>)
          )
        }
        {user_name}
      {body.map(b => <li key={b.id}>{b.name}</li>)}
         <Button className="btn modal-btn auth authorize" onClick={ () => this.getResolvedSubtree('/api/product/OLJCESPC7Z','get') }>Get Product</Button>
         <Button className="btn modal-btn auth authorize" onClick={ () => this.getResolvedSubtree('/user/info','get') }>Get User</Button>
        {Topbar ? <Topbar /> : null}
        {executeInProgress ? <div className="loading-container"><div className="loading"></div></div> : null}
        <BaseLayout /> 
        {/* <Row>
          <Col>
            <OnlineValidatorBadge />
          </Col>
        </Row> */}
      </Container>
    )
  }

}
