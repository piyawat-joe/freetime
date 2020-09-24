

import React from "react"
import PropTypes from "prop-types"
import Im, { Map } from "immutable"
import Product from "./Product"
import { Result, Button } from 'antd';
// import { isAuthorized } from "../core/plugins/auth/selectors"

export default class HomeLayout extends React.Component {
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
    console.log(state)
    if(props.specSelectors.responses().size > 0){
      console.log(props.specSelectors.responses().getIn(['/api/products', 'get','body'], null))
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
    }
    return {
      productsResponse: props.specSelectors.responseFor('/api/products', 'get'),
      // productsResponse: props.specSelectors.responses().getIn(['/api/products', 'get','body'], null),
      userResponse: props.specSelectors.responseFor('/user/info', 'get'),
      responses: props.specSelectors.responses(),
    }
  }

  componentDidMount() {
    
    // let { specSelectors, specActions } = this.props
    // const path = '/api/products'
    // const method =  'get'
    // this.getResolvedSubtree(path,method)
    // setTimeout(() => {
    //   this.getExec('/api/products','get')
    // }, 200)
    this.getExec('/api/products','get')
  }

  componentWillReceiveProps(nextProps) {
    const { productsResponse, userResponse } = nextProps
    // const resolvedSubtree = this.getResolvedSubtree()
    if(productsResponse !== this.props.productsResponse || userResponse !== this.props.userResponse ) {
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

  // getResolvedSubtree =(path, method)=> {
  //   let { specSelectors, specActions } = this.props
  //   // const path = '/api/foos'
  //   // const method = 'get'
  //   const taggedOps = specSelectors.taggedOperations()
  //   let operation
  //   taggedOps.map( (tagObj, tag) => {
  //     const operations = tagObj.get("operations")
  //     operations.map( op => {
  //       if(path === op.get("path") && method === op.get("method"))
  //       {
  //       const specPath = Im.List(["paths", path, method])
  //       console.log(path)
  //       console.log(method)
  //       console.log(specPath)
  //       operation = specSelectors.specResolvedSubtree(specPath.toJS())
  //       console.log(operation)
  //       }
  //     })
  //   }
  //   )

  //   // specActions.validateParams( [path, method] )
  //   console.log(operation)
  //   if ( specSelectors.validateBeforeExecute([path, method]) ) {
  //     this.setState({ executeInProgress: true })
  //     specActions.execute( { operation, path, method } )
  //     this.setState({ path,method })
  //   } else {
  //     // deferred by 40ms, to give element class change time to settle.
  //     specActions.clearValidateParams( [path, method] )
  //     setTimeout(() => {
  //       specActions.validateParams([path, method])
  //     }, 40)
  //   }
  // }

  getExec =(path, method)=> {
    let { specSelectors, specActions } = this.props
      this.setState({ executeInProgress: true })
      const specPath = Im.List(["paths", path, method])
      // const operation = specSelectors.specResolvedSubtree(specPath.toJS())
      
      const operation = Map({"tags":"app-controller","operationId":"products",
        "responses":{"200":{"description":"OK","content":{"*/*":{"schema":{"type":"array","items":{"$ref":"#/components/schemas/Product"}}}}}}
      });

      console.log(specPath);
      console.log(operation);
      specActions.execute( { operation, path, method } )
      this.setState({ path,method })
  }

  render() {
    const { getComponent, authSelectors, errSelectors, specSelectors, authActions, userResponse, productsResponse } = this.props
    let { executeInProgress } = this.state
    console.log(this.state);
    console.log(this.props);
    console.log(specSelectors.securityDefinitions())
    console.log(specSelectors.taggedOperations())
    // const {
    //   authActions: { authorize },
    //   specSelectors: { specJson, isOAS3 }
    // } = this.props
    // console.log(authorize);
    // console.log(specJson);
    // console.log(isOAS3);

    let Container = getComponent("Container")
    let Row = getComponent("Row")
    let Col = getComponent("Col")

    // const Button = getComponent("Button")
    const Topbar = getComponent("Topbar", true)
    const BaseLayout = getComponent("BaseLayout", true)
    const Link = getComponent("Link")

    // console.log(authConfigs.appName)
    // console.log(name)
    // console.log(schema)
    // console.log(clientId)
    // console.log(clientSecret)
    // console.log(username)
    // console.log(passwordType)

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

  
  // let status = ''
  // let headers = ''
  // let notDocumented = ''
  // let isError = ''
  // let body=[]
  // let userbody=[]
  // let duration = ''
  // console.log('userResponse');
  // console.log(userResponse);
  // console.log('productsResponse');
  // console.log(productsResponse);
  // console.log(specSelectors.responses().entries())
  // console.log(specSelectors.responses().has('api/products'))
  // console.log(specSelectors.responses().getIn(['api/products', 'get'], null))
  // if(!!userresponse && userresponse.get("statusCode") === 200){
  //  status = userresponse.get("status")
  // // const url = curlRequest.get("url")
  //  headers = userresponse.get("headers").toJS()
  //  notDocumented = userresponse.get("notDocumented")
  //  isError = userresponse.get("error")
  //  userbody = userresponse.get("body").toJS()
  //  duration = userresponse.get("duration")
  // }else if(!!userresponse && userresponse.get("statusCode") !== 200){
  //   isError = userresponse.get("error")
  //   status = userresponse.get("status")
  // }

  // if(!!fooresponse && fooresponse.get("statusCode") === 200){
  //   status = fooresponse.get("status")
  //  // const url = curlRequest.get("url")
  //   headers = fooresponse.get("headers").toJS()
  //   notDocumented = fooresponse.get("notDocumented")
  //   isError = fooresponse.get("error")
  //   body = fooresponse.get("body").toJS()
  //   duration = fooresponse.get("duration")
  //  }else if(!!fooresponse && fooresponse.get("statusCode") !== 200){
  //   isError = fooresponse.get("error")
  //   status = fooresponse.get("status")
  // }
  // const { user_name } = userbody || '';
  // console.log(headers)
    return (

      <Container className='swagger-ui'>

        {Topbar ? <Topbar /> : null}
        {executeInProgress ? <div className="loading-container"><div className="loading"></div></div> : null}

        {/* productsResponse */}
        <div style={{
          display: 'flex',
          margin: 'auto',
          width: '50%'
            }}>
          <img src="//freetimehero.oss-ap-southeast-1.aliyuncs.com/img/ali-cloud.png" alt="Alibaba cloud Logo"/><h1 style={{
          fontSize: 'xxx-large',
          padding: '20px'
        }}><strong>Hello Alibaba Cloud</strong></h1>
      </div>
        <hr/>
        <div className="ft_product">
        {
          // specSelectors.responses().getIn(['/api/products', 'get','body'], null)
          // console.log(productsResponse)
          
          productsResponse && productsResponse.get('body') && productsResponse.get('status') !== 500 ? productsResponse.get('body').map(p => (
            // console.log(p)
          
            // console.log(p.get("id"))
            <Product item={p} getComponent={getComponent}/>
      
          )) : 

          // setTimeout(() => {
            executeInProgress ? '' :
            <Result
            status="warning"
            title="There are some network problems."
            extra={
            <Button type="primary" key="refresh" onClick={()=> window.location="/"}>
              Try again
            </Button>
          }
          />
            // }, 2000)     
      }
        </div>
        {/* <BaseLayout /> */}
        {/* <Row>
          <Col>
            <OnlineValidatorBadge />
          </Col>
        </Row> */}
      </Container>
    )
  }

}
