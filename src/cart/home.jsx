

import React from "react"
import { connect } from 'react-redux';
import PropTypes from "prop-types"
import Im, { Map } from "immutable"
import { Result, Button, Row, Col } from 'antd';
// import Product from "./Product"
// import { isAuthorized } from "../core/plugins/auth/selectors"

export class CartDetail extends React.Component {
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

  componentDidMount() {
    
    // let { specSelectors, specActions } = this.props
    // const path = '/api/products'
    // const method =  'get'
    // this.getResolvedSubtree(path,method)
    // setTimeout(() => {
    //   this.getExec('/api/products','get')
    // }, 200)
    // console.log('call /api/products')
    // this.getExec('/api/products','get')
    this.getExec('/api/cart','get')
  }

  componentWillReceiveProps(nextProps) {
    const { productsResponse, userResponse, cartResponse } = nextProps
    console.log(nextProps)
    console.log(this.props)
    // const resolvedSubtree = this.getResolvedSubtree()
    if(productsResponse !== this.props.productsResponse || userResponse !== this.props.userResponse || cartResponse !== this.props.cartResponse  ) {
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
      let operation = ''
      const productsOp = Map({"tags":"app-controller","operationId":"products",
        "responses":{"200":{"description":"OK","content":{"*/*":{"schema":{"type":"array","items":{"$ref":"#/components/schemas/Product"}}}}}}
      });

      const CartOp = Map({"tags":["app-controller"],"operationId":"viewCart",
      "responses":{"200":{"description":"OK","content":{"*/*":{"schema":{"type":"string"}}}}}});

      if(path === '/api/products'){
        operation = productsOp
      }else if(path === '/api/cart'){
        operation = CartOp
      }

      console.log(specPath);
      console.log(operation);
      specActions.execute( { operation, path, method } )
      this.setState({ path,method })
  }

  render() {
    const { getComponent, authSelectors, errSelectors, specSelectors, authActions, userResponse, productsResponse, cartResponse } = this.props
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
  let data = ''
  let hasProduct = false
  let total = 0

  if(cartResponse && cartResponse.get('data') && cartResponse.get('status')!== 500){
    hasProduct = true
    const res = JSON.parse(cartResponse.get('data'))
    total = res.total
    data = res.data
  //   cartResponse.get('data').data.map(p => {
  //   total = element.get('total')
  //   data = element.get('data')
  // })
  }
    return (

      <Container className='swagger-ui'>

        {Topbar ? <Topbar /> : null}
        {executeInProgress ? <div className="loading-container"><div className="loading"></div></div> : null}

        {/* productsResponse */}
        <div className="ft_cart">
        { hasProduct ? ( total > 0 ? 
               <Row>
               <div class="container bg-light py-3 px-lg-5 py-lg-5">
   
                   <div class="row mb-3 py-2" >
                       <div class="col">
                           <h3>{`${total} items in your Shopping Cart`}</h3>
                       </div>
                       <div class="col text-right">
                           {/* <form method="POST" action="/cart/empty"> */}
                               {/* <Button class="btn btn-secondary" type="submit">Empty cart</Button> */}
                               {/* <a class="btn btn-info" href="/" role="button">Browse more products &rarr; </a> */}
                           {/* </form> */}
                           <Button type="primary" key="refresh" onClick={()=> window.location="/"}>
                            Browse more products &rarr; 
                           </Button>
                       </div>
                   </div>
                   <hr/>
   
                  { data.map(item => 
                    <Row>
                    <div class="col text-right">
                        <a href={`/product/${item.productID}`}>
                            <img class="img-fluid" style={{width: 'auto', maxHeight: '160px'}} src={`https://freetimehero.oss-ap-southeast-1.aliyuncs.com/${item.productPicture}`} />
                        </a>
                    </div>
                    <div class="col align-middle">
                        <strong>{item.productName}</strong><br/>
                        <small class="text-muted">{`SKU:  ${item.productID}`}</small>
                    </div>
                    <div class="col text-left">
                    {`Qty: ${item.quantity}`}
                        <br/>
                        <strong>{item.price}</strong>
                    </div>
                  </Row>
                  ) }
                   
                   <div class="row pt-2 my-3">
                       <div class="col text-center">
                           <p class="text-muted my-0">Shipping Cost: <strong> free </strong></p>
                           Total Cost: <strong> free </strong>
                       </div>
                   </div>
   
                   <hr/>
                   {/* <div class="row py-3 my-2">
                       <div class="col-12 col-lg-8 offset-lg-2">
                           <h3>Checkout</h3>
                           <form action="/cart/checkout" method="POST">
                               <div class="form-row">
                                   <div class="col-md-5 mb-3">
                                       <label for="email">E-mail Address</label>
                                       <input type="email" class="form-control" id="email"
                                              name="email" value="someone@example.com" required/>
                                   </div>
                                   <div class="col-md-5 mb-3">
                                       <label for="street_address">Street Address</label>
                                       <input type="text" class="form-control"  name="street_address"
                                              id="street_address" value="1600 Amphitheatre Parkway" required/>
                                   </div>
                                   <div class="col-md-2 mb-3">
                                       <label for="zip_code">Zip Code</label>
                                       <input type="text" class="form-control"
                                              name="zip_code" id="zip_code" value="94043" required pattern="\d{4,5}"/>
                                   </div>
   
                               </div>
                               <div class="form-row">
                                   <div class="col-md-5 mb-3">
                                       <label for="city">City</label>
                                       <input type="text" class="form-control" name="city" id="city"
                                              value="Mountain View" required/>
                                   </div>
                                   <div class="col-md-2 mb-3">
                                       <label for="state">State</label>
                                       <input type="text" class="form-control" name="state" id="state"
                                              value="CA" required/>
                                   </div>
                                   <div class="col-md-5 mb-3">
                                       <label for="country">Country</label>
                                       <input type="text" class="form-control" id="country"
                                              placeholder="Country Name"
                                              name="country" value="United States" required/>
                                   </div>
                               </div>
                               <div class="form-row">
                                   <div class="col-md-6 mb-3">
                                       <label for="credit_card_number">Credit Card Number</label>
                                       <input type="text" class="form-control" id="credit_card_number"
                                              name="credit_card_number"
                                              placeholder="0000-0000-0000-0000"
                                              value="4432-8015-6152-0454"
                                              required pattern="\d{4}-\d{4}-\d{4}-\d{4}"/>
                                   </div>
                                   <div class="col-md-2 mb-3">
                                       <label for="credit_card_expiration_month">Month</label>
                                       <select name="credit_card_expiration_month" id="credit_card_expiration_month"
                                               class="form-control">
                                           <option value="1">January</option>
                                           <option value="2">February</option>
                                           <option value="3">March</option>
                                           <option value="4">April</option>
                                           <option value="5">May</option>
                                           <option value="6">June</option>
                                           <option value="7">July</option>
                                           <option value="8">August</option>
                                           <option value="9">September</option>
                                           <option value="10">October</option>
                                           <option value="11">November</option>
                                           <option value="12">December</option>
                                       </select>
                                   </div>

                                   <div class="col-md-2 mb-3">
                                       <label for="credit_card_cvv">CVV</label>
                                       <input type="password" class="form-control" id="credit_card_cvv"
                                              autocomplete="off"
                                              name="credit_card_cvv" value="672" required pattern="\d{3}"/>
                                   </div>
                               </div>
                               <div class="form-row">
                                   <button class="btn btn-primary" type="submit">Place your order &rarr;</button>
                               </div>
                           </form>
                       </div>
                   </div> */}
   
               </div>
           </Row>
           : 
            <Result
            status="warning"
            title="Your shopping cart is empty!"
            extra={
            <Button type="primary" key="refresh" onClick={()=> window.location="/"}>
             Browse Products
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
  }
  return {
    // productsResponse: props.specSelectors.responseFor('/api/products', 'get'),
    cartResponse: props.specSelectors.responseFor('/api/cart', 'get'),
    // productsResponse: props.specSelectors.responses().getIn(['/api/products', 'get','body'], null),
    userResponse: props.specSelectors.responseFor('/user/info', 'get'),
    responses: props.specSelectors.responses(),
  }
}

export default connect(mapStateToProps, null)(CartDetail);