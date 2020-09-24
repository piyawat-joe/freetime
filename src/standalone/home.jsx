

import React from "react"
import PropTypes from "prop-types"
import Im, { Map } from "immutable"
import Product from "./Product"
import ProductDetail from "../Product/home"
import { Result, Button, Row, Col, Input,List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined, RightOutlined } from '@ant-design/icons';
// import { isAuthorized } from "../core/plugins/auth/selectors"
const { Search } = Input;

// const left = {
//     float: 'left',
//     width: '50%',
//     height: '100%',
//     overflow: 'scroll'
// }
// const right = {
//     float: 'left',
//     width: '50%',
//     height: '100%',
//     overflow: 'scroll'
// }

export default class HomeLayout extends React.Component {
  constructor(props, context) {
    super(props, context)
    console.log(props)
    this.state = {
      executeInProgress: false,
      mMenu: 24,
      mDetail: 0,
      id: props.match.params.id,
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
    let productsResponse
    let id
    if(props.specSelectors.responses().size > 0){
      productsResponse= props.specSelectors.responseFor('/api/products', 'get')
        if(productsResponse && productsResponse.get('body') && productsResponse.get('status') !== 500){
          console.log(productsResponse.get('body'))
          console.log(productsResponse.get('body').get(0))
          if(!props.match.params.id){
          id = productsResponse.get('body').get(0).get('id')
          console.log(id)
          const url = 'product/'+id
          var refresh = window.location.protocol + "//" + window.location.host + '/' + url
          window.history.pushState({ path: refresh }, '', refresh)
          }else{
            id = props.match.params.id
          }
      }
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
      productsResponse: productsResponse,
      id: id,
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
    console.log(this.props.match.params.id)
    this.getExec('/api/products','get')
  }

  componentWillReceiveProps(nextProps) {
    const { productsResponse, userResponse, id } = nextProps
    // const resolvedSubtree = this.getResolvedSubtree()
    if(productsResponse !== this.props.productsResponse || userResponse !== this.props.userResponse ) {
      this.setState({ executeInProgress: false, id: id })
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

  // onclickHandle = () =>{
  //   this.setState({ mMenu:0,mDetail:24 })
  // }

  onBackHandle = () =>{
    this.setState({ mMenu:24,mDetail:0 })
  }

  onSetId = (id) => {
    this.setState({id});
    const url = 'product/'+id
    var refresh = window.location.protocol + "//" + window.location.host + '/' + url;    
    window.history.pushState({ path: refresh }, '', refresh);
  }

  render() {
    const { getComponent, authSelectors, errSelectors, specSelectors, authActions, userResponse, productsResponse, specActions } = this.props
    let { executeInProgress, mDetail, mMenu, id } = this.state
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
    // let Row = getComponent("Row")
    // let Col = getComponent("Col")

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

        <div class="lzd-home">

        <div class="lzd-home-content">
        <Row >
      {/* <Col className="gutter-row" xs={24} sm={24} md={6} lg={6} xl={6}>
          <img src="//freetimehero.oss-ap-southeast-1.aliyuncs.com/img/ali-cloud.png" alt="Alibaba cloud Logo"/>
      </Col> */}
      <Col className="gutter-row" xs={24} sm={24} md={24} lg={24} xl={24}>
      <h1 style={{
          fontSize: 'xxx-large',
          padding: '0 20px'
        }}><strong>Hello Alibaba Cloud</strong></h1>
        </Col>
    </Row>



      {/* <Button type='primary' onClick={this.onclickHandle}>Show</Button> */}
      <div className="ft_product">
        {
          // specSelectors.responses().getIn(['/api/products', 'get','body'], null)
          // console.log(productsResponse)
          
          productsResponse && productsResponse.get('body') ?
          // && productsResponse.get('status') !== 500 ? 
          
          // productsResponse.get('body').map(p => (
          //   // console.log(p)
          
          //   // console.log(p.get("id"))
          //   <Product item={p} getComponent={getComponent} onSetId={this.onSetId}/>
            
          // )) 

          // const listData = [];
          // for (let i = 0; i < 23; i++) {
          //   listData.push({
          //     href: 'https://ant.design',
          //     title: `ant design part ${i}`,
          //     avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          //     description:
          //       'Ant Design, a design language for background applications, is refined by Ant UED Team.',
          //     content:
          //       'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
          //   });
          // }
          <Row >
            <Col className="gutter-row" xs={mMenu} sm={mMenu} md={6} lg={6} xl={6} 
            style={{
              width: '250px',
              // overflowY: 'scroll',
              overflow: 'scroll',
              position: 'fixed',
              height: '100%'
            }}
            >
              <List
              itemLayout="horizontal"
              dataSource={productsResponse.get('body')}
              renderItem={item => (
                <List.Item
                key={item.get('id')}
                style={id === item.get('id') ? {backgroundColor: '#288db8', padding: '10px'} : {backgroundColor: '#ddf1fa', padding: '10px'}}
                onClick={() => {
                  this.setState({ mMenu:0,mDetail:24 })
                  this.onSetId(item.get('id'))
                }
                }
                extra={
                  id === item.get('id') ? <RightOutlined /> : null
                }
                >
                  <List.Item.Meta
                    title={<a href={item.id}>{item.get('name')}</a>}
                    description={item.get('description')}
                  />
                </List.Item>
              )}
            />    
            </Col>
            <Col className="gutter-row" xs={mDetail} sm={mDetail} md={18} lg={18} xl={18}
            style={{
              margin: '0 0 250px 250px',
              // overflowY: 'scroll',
              overflow: 'scroll',
              position: 'fixed',
              height: '100%'
            }}
            >
            <Row>
              <Col className="gutter-row" xs={mDetail} sm={mDetail} md={0} lg={0} xl={0}>
              <Button type='primary' onClick={this.onBackHandle}>back</Button>
              </Col>
            </Row>
            {!!id ? 
            <ProductDetail
              id={id}
              getComponent={getComponent}
              authSelectors={authSelectors}
              errSelectors={errSelectors}
              specSelectors={specSelectors}
              specActions={specActions}
              authActions={authActions}
              userResponse={userResponse}
              productsResponse={productsResponse}
              /> 
              : ''}
            </Col>      
            </Row>
          : 

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
        
   

    </div>
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
