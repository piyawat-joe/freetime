

import React from "react"
import { connect } from 'react-redux';
import PropTypes from "prop-types"
import Im, { OrderedMap } from "immutable"
import { getList } from "core/utils"
import { Result, Button, Row, Col, Select } from 'antd';
// import Product from "./Product"
// import { isAuthorized } from "../core/plugins/auth/selectors"
const { Option } = Select;
const eachMap = (iterable, fn) => iterable.valueSeq().filter(Im.Map.isMap).map(fn)

export class ProductDetail extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      executeInProgress: false,
      id: '',
      quantity: 1,
      hasProduct: false,
      isFound: false
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

  componentDidMount() {
    
    // let { specSelectors, specActions } = this.props
    // const path = '/api/products'
    // const method =  'get'
    // this.getResolvedSubtree(path,method)
    // setTimeout(() => {
    //   this.getExec('/api/products','get')
    // }, 200)
    const { specActions, specSelectors } = this.props
    console.log('call /api/products')
    this.getExec('/api/products','get')
    // const onChangeKey = ["/api/add_cart","get"]
    // const addCartOp = specSelectors.specResolvedSubtree(["paths", "/api/add_cart", "get"])
    // let cartRarameters = getList(addCartOp, ["parameters"])
    // let productIdParam = ''
    // let quantityParam = ''
    //   eachMap(cartRarameters, (parameter, i) => {
    //     if(parameter.get("name") === 'product_id'){
    //       productIdParam = specSelectors.parameterWithMetaByIdentity(onChangeKey, parameter)
    //     }else if(parameter.get("name") === 'quantity'){
    //       quantityParam = specSelectors.parameterWithMetaByIdentity(onChangeKey, parameter)
    //     }
    //   }).toArray()

    //   console.log(addCartOp)
    //   console.log(cartRarameters)
    //   console.log(productIdParam)
    //   console.log(quantityParam)
    //   this.setState({addCartOp, productIdParam,quantityParam})

    //   specActions.changeParamByIdentity(onChangeKey,productIdParam , this.props.match.params.id)
    //   specActions.changeParamByIdentity(onChangeKey,quantityParam , 1)
  }

  componentWillReceiveProps(nextProps) {
    const { productsResponse, addCartResponse } = nextProps
    console.log(nextProps)
    console.log(this.props)
    let id='';
    let name='';
    let description='';
    let picture='';
    let price='';
    let categories='';
    let hasProduct = false;
    let isFound = false;
    // const resolvedSubtree = this.getResolvedSubtree()
    if(productsResponse !== this.props.productsResponse) {
      if(productsResponse && productsResponse.get('body') && productsResponse.get('status') !== 500){
        hasProduct = true;
       productsResponse.get('body').filter(p => p.get('id') === this.props.match.params.id).forEach(element => {
        id = element.get('id')
        name = element.get('name')
        description = element.get('description')
        picture = element.get('picture')
        price = element.get('price')
        categories = element.get('categories')
        isFound = true;
      })
      }
      this.setState({ executeInProgress: false, hasProduct, id, name, description, picture, price, categories, isFound })
    }else if(addCartResponse !== this.props.addCartResponse){
      if(addCartResponse && addCartResponse.get('data') && addCartResponse.get('status') !== 500){
        // console.log(addCartResponse.get('data'))
        window.location = '/cart'
      }
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
    const { specSelectors, specActions /* ,operation, path, method */} = this.props
    const { quantity } = this.state
      this.setState({ executeInProgress: true })
      const specPath = Im.List(["paths", path, method])
      // const operation = specSelectors.specResolvedSubtree(specPath.toJS())
      let operation = ''
      const productsOp = OrderedMap({"tags":"app-controller","operationId":"products",
        "responses":{"200":{"description":"OK","content":{"*/*":{"schema":{"type":"array","items":{"$ref":"#/components/schemas/Product"}}}}}}
      });

      const onChangeKey = ["/api/add_cart","get"]
      const addCartOp = specSelectors.specResolvedSubtree(["paths", "/api/add_cart", "get"])
      let cartRarameters = getList(addCartOp, ["parameters"])
      let productIdParam = ''
      let quantityParam = ''
        eachMap(cartRarameters, (parameter, i) => {
          if(parameter.get("name") === 'product_id'){
            productIdParam = specSelectors.parameterWithMetaByIdentity(onChangeKey, parameter)
          }else if(parameter.get("name") === 'quantity'){
            quantityParam = specSelectors.parameterWithMetaByIdentity(onChangeKey, parameter)
          }
        }).toArray()
  
        console.log(addCartOp)
        console.log(cartRarameters)
        console.log(productIdParam)
        console.log(quantityParam)
        // this.setState({addCartOp, productIdParam,quantityParam})
  
        specActions.changeParamByIdentity(onChangeKey,productIdParam , this.props.match.params.id)
        specActions.changeParamByIdentity(onChangeKey,quantityParam , quantity)

      if(path === '/api/products'){
        operation = productsOp
      }else if(path === '/api/add_cart'){
        operation = addCartOp
      }

      console.log(specPath);
      console.log(operation);
      // specActions.execute( { operation, path, method } )

      console.log(operation)
      console.log(path)
      console.log(method)
      // specActions.validateParams( [path, method] )
      specActions.execute( { operation, path, method } )

      // if ( specSelectors.validateBeforeExecute([path, method]) ) {
      //   // if(this.props.onExecute) {
      //   //   this.props.onExecute()
      //   // }
      //   console.log('validateBeforeExecute')
      //   specActions.execute( { operation, path, method } )
      // } else {
      //   // deferred by 40ms, to give element class change time to settle.
      //   console.log('clearValidateParams')
      //   specActions.clearValidateParams( [path, method] )
      //   setTimeout(() => {
      //     specActions.validateParams([path, method])
      //   }, 40)
      // }
      this.setState({ path,method })
  }

  onSelect = (value) => {
    const { specSelectors, specActions } = this.props
    const { id, quantityParam} = this.state
    console.log(`selected ${value}`)
    // const onChangeKey = ["/api/add_cart","get"]
    // const cartParam1 = OrderedMap({"name":"product_id","in":"query","required":true,"schema":{"type":"string"}});
    // specActions.changeParamByIdentity(onChangeKey,productIdParam , id)
    // const cartParam2 = OrderedMap({"name":"quantity","in":"query","required":true,"schema":{"type":"integer","format":"int32"}});
    // specActions.changeParamByIdentity(onChangeKey, quantityParam, value)
    
    this.setState({ quantity: value })
  }

  onSubmit = () => {
    const {id, quantity} = this.state
    console.log(this.state)
    this.getExec('/api/add_cart','get')
    //?product_id='+id+'&quantity='+quantity
  }

  render() {
    const { getComponent, authSelectors, errSelectors, specSelectors, authActions, userResponse, productsResponse } = this.props
    let { executeInProgress, 
      id,
      name,
      description,
      picture,
      price,
      categories,
      hasProduct,
      isFound } = this.state
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
  // let id='';
  // let name='';
  // let description='';
  // let picture='';
  // let price='';
  // let categories='';
  // let hasProduct = false;
  // let isFound = false;
  // if(productsResponse && productsResponse.get('body')){
  //   hasProduct = true;
  //  productsResponse.get('body').filter(p => p.get('id') === this.props.match.params.id).forEach(element => {
  //   id = element.get('id')
  //   name = element.get('name')
  //   description = element.get('description')
  //   picture = element.get('picture')
  //   price = element.get('price')
  //   categories = element.get('categories')
  //   isFound = true;
  // })
  // }
    return (

      <Container className='swagger-ui'>

        {Topbar ? <Topbar /> : null}
        {executeInProgress ? <div className="loading-container"><div className="loading"></div></div> : null}

        {/* productsResponse */}
        <div className="ft_product">
        { hasProduct ? ( isFound ? 
        <div class="container bg-light py-3 px-lg-5 py-lg-5">
                <Row style={{display: 'flex'}}>
                    <div >
                        <img class="img-fluid border" style={{ width: '60%', paddingLeft: '40px'}} src={`https://freetimehero.oss-ap-southeast-1.aliyuncs.com/${picture}`} />
                    </div>
                    <div >
                        <h2>{name}</h2>
                        <p class="text-muted">{`CNY ${price}`}</p>
                        <hr/>
                        <p/>
                        <h6>Product Description:</h6>
                         <p>{description}</p>
                        <hr/>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <label class="input-group-text" for="quantity">Quantity</label>
                                </div>
                                <Select defaultValue="1" style={{ width: 120 }} onChange={this.onSelect}>
                                <Option value="1">1</Option>
                                <Option value="2">2</Option>
                                <Option value="3">3</Option>
                                <Option value="4">4</Option>
                                <Option value="5">5</Option>
                                <Option value="10">10</Option>
                              </Select>
                                <Button type="primary" onClick={this.onSubmit}>Add to Cart</Button>
                            </div>
                    </div>
                </Row>

            </div>
            : 
            <Result
            status="warning"
            title="Page not Found."
            extra={
            <Button type="primary" key="refresh" onClick={()=> window.location="/"}>
              Back to home page
            </Button>
          }
          />
            )
            : 
            executeInProgress ? '' :
            // setTimeout(() => {
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

const mapStateToProps = (state, props) => {
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
    addCartResponse: props.specSelectors.responseFor('/api/add_cart', 'get'),
    // productsResponse: props.specSelectors.responses().getIn(['/api/products', 'get','body'], null),
    userResponse: props.specSelectors.responseFor('/user/info', 'get'),
    responses: props.specSelectors.responses(),
  }
}

export default connect(mapStateToProps, null)(ProductDetail);