

import React from "react"
import { connect } from 'react-redux';
import PropTypes from "prop-types"
import Im, { OrderedMap } from "immutable"
import { getList } from "core/utils"
import { Result, Button, Row, Col, Select, BackTop } from 'antd';
// import Product from "./Product"
// import { isAuthorized } from "../core/plugins/auth/selectors"
const { Option } = Select;
const eachMap = (iterable, fn) => iterable.valueSeq().filter(Im.Map.isMap).map(fn)
const style = {
  height: 40,
  width: 40,
  lineHeight: '40px',
  borderRadius: 4,
  backgroundColor: '#1088e9',
  color: '#fff',
  textAlign: 'center',
  fontSize: 14,
};
export class ProductDetail extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      executeInProgress: false,
      id: props.id,
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
    const { specActions, specSelectors, id } = this.props
    console.log('call /api/product/{id}'+id)
    console.log(this.props)
    if(id){
      this.getExec('/api/product/{id}','get', id)
    }

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
    const { productResponse, addCartResponse, id: productId } = nextProps
    console.log(nextProps)
    console.log(this.props)
    let id='';
    let name='';
    let description='';
    let content='';
    let picture='';
    let price='';
    let categories='';
    let hasProduct = false;
    let isFound = false;
    // const resolvedSubtree = this.getResolvedSubtree()
    if(productId !== this.props.id){
      let tempId
      if(!!productId){
        tempId = productId
      }else if(!!this.props.id){
        tempId = this.props.id
      }
      if(!!tempId){
        this.onSetID(tempId)
        this.getExec('/api/product/{id}','get', tempId)
      }
    }else if(productResponse !== this.props.productResponse) {
      if(productResponse && productResponse.get('body') && productResponse.get('status') !== 500){
        hasProduct = true;
        console.log(productId)
        console.log(productResponse)
        const element = productResponse.get('body')
      //  productResponse.get('body').filter(p => p.get('id') === productId /*this.props.match.params.id*/).forEach(element => {
        id = element.get('id')
        name = element.get('name')
        description = element.get('description')
        content = element.get('content')
        picture = element.get('picture')
        price = element.get('price')
        categories = element.get('categories')
        isFound = true;
      // })
      }
      this.setState({ executeInProgress: false, hasProduct, id, name, description, content, picture, price, categories, isFound })
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

  onSetID = (id) =>{
   const { specSelectors, specActions } = this.props
   const productParam = OrderedMap({"name":"id","in":"path","required":true,"schema":{"type":"string"}})
   console.log(id)
   specActions.changeParamByIdentity(["/api/product/{id}","get"],productParam , id)
  //  this.setState({ id: id })
  }

  getExec =(path, method, id)=> {
    const { specSelectors, specActions /* ,operation, path, method */} = this.props
    console.log(this.props)
    // const { id } = this.state
      this.setState({ executeInProgress: true })
      const taggedOps = specSelectors.taggedOperations()

     const opera = taggedOps.map( (tagObj, tag) => {
         const operations = tagObj.get("operations")
         console.log(operations)
         const op = operations.find( op => op.get("path") === path)
         console.log(path)
         console.log(op)
         if(op){
         const specPath = Im.List(["paths", path, method])
         const operation = op.get("operation")
         const parameters = operation.get("parameters")
         console.log(parameters)
         console.log(op.get("path"))
         console.log(op.get("method"))
         console.log(operation)
         const changeParam = specActions.changeParamByIdentity(["/api/product/{id}","get"],parameters.get(0) , id)
         console.log(changeParam)
         specActions.execute( { operation, path, method } )
         }
      })
      console.log(opera)
      // const path = opera.get("path")
      // const method = opera.get("method")
      
      // console.log(parameters)
      // const operation = specSelectors.specResolvedSubtree(specPath.toJS())
      // let operation = ''
      // const productsOp = OrderedMap({"tags":"app-controller","operationId":"products",
      //   "responses":{"200":{"description":"OK","content":{"*/*":{"schema":{"type":"array","items":{"$ref":"#/components/schemas/Product"}}}}}}
      // });
      // console.log(specPath)
      // const productsOp = OrderedMap({"tags":["app-controller"],"operationId":"product","parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"}}],
      // "responses":{"200":{"description":"OK","content":{"*/*":{"schema":{"type":"string"}}}}}})
      // const productParam = OrderedMap({"name":"id","in":"path","required":true,"schema":{"type":"string"}})
      // console.log(productParam)
      // const changeParam = specActions.changeParamByIdentity(["/api/product/{id}","get"],productParam , 'OLJCESPC7Z')
      // console.log(changeParam)
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
        // this.setState({addCartOp, productIdParam,quantityParam})
  
      //   specActions.changeParamByIdentity(onChangeKey,productIdParam , id /*this.props.match.params.id*/)
      //   specActions.changeParamByIdentity(onChangeKey,quantityParam , quantity)

      // if(path === '/api/product/{id}'){
      //   operation = productsOp
      // }else if(path === '/api/add_cart'){
      //   operation = addCartOp
      // }

      // console.log(specPath);
      // console.log(operation);
      // specActions.execute( { operation, path, method } )

      // console.log(operation)
      // console.log(path)
      // console.log(method)
      // specActions.validateParams( [path, method] )
      // console.log(specSelectors.taggedOperations())
      // console.log()
      // specActions.execute( { operation, path, method } )

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
      content,
      picture,
      price,
      categories,
      hasProduct,
      isFound } = this.state
    console.log(this.state);
    console.log(this.props);
    console.log(specSelectors?.securityDefinitions())
    console.log(specSelectors?.taggedOperations())
    // const {
    //   authActions: { authorize },
    //   specSelectors: { specJson, isOAS3 }
    // } = this.props
    // console.log(authorize);
    // console.log(specJson);
    // console.log(isOAS3);

    let Container = getComponent("Container")
    const Topbar = getComponent("Topbar", true)
    const BaseLayout = getComponent("BaseLayout", true)
    const Link = getComponent("Link")
    
   //  let Row = getComponent("Row")
   //  let Col = getComponent("Col")

    // const Button = getComponent("Button")
   

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

        {/* {Topbar ? <Topbar /> : null} */}
        {executeInProgress ? <div className="loading-container"><div className="loading"></div></div> : null}

        {/* productsResponse */}
        {!!id ? 
        <div className="ft_product">
        
        <div style={{margin: '0 auto'}}>
        <header id="header-faq" className="clearfix">
        <h1 className="page-title">{name}</h1>
                            
        <div className="doc-status"><span>Last Updated: Aug 25, 2019</span>
            <i className="divider"></i>
        </div>
        </header>
        <article className="product-description markdown-body">
        <div lang="en-US" className="icms-help-docs-content">
      <div dangerouslySetInnerHTML={{__html: content}} />
      </div></article>
      </div>

      <BackTop>
            <div style={style}>UP</div>
          </BackTop>

        </div>
        : 
        <Result
            status="warning"
            title="There are some network problems."
            extra={
            <Button type="primary" key="refresh" onClick={()=> window.location="/"}>
              Try again
            </Button>
            }
            />
        }
      </Container>
    )
  }

}

const mapStateToProps = (state, props) => {
  console.log(state)
  console.log(props)
  if(props.specSelectors?.responses()?.size > 0){
    console.log(props.specSelectors?.responses()?.getIn(['/api/product/{id}', 'get','body'], null))
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
    productResponse: props.specSelectors?.responseFor('/api/product/{id}', 'get'),
    addCartResponse: props.specSelectors?.responseFor('/api/add_cart', 'get'),
    // productsResponse: props.specSelectors.responses().getIn(['/api/products', 'get','body'], null),
    userResponse: props.specSelectors?.responseFor('/user/info', 'get'),
    responses: props.specSelectors?.responses(),
  }
}

export default connect(mapStateToProps, null)(ProductDetail);