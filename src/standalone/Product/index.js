import React from 'react';
// import moment from 'moment';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
const { Meta } = Card;

class Product extends React.PureComponent {
  render() {
    const { getComponent, item, onSetId } = this.props
    // const Link = getComponent("Link")
    const id = item.get('id')  
    const name = item.get('name')
    const description = item.get('description') 
    const picture = item.get('picture') 
    const price = item.get('price')
    const categories = item.get('categories')
    
    return (
      <Link style={{color: "gray"}} onClick={onSetId(id)} /* href={`/product/${id}`} */ >
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src={`https://freetimehero.oss-ap-southeast-1.aliyuncs.com/${picture}`}/>}
          >
            <Meta title={name} description={`SGD ${price}`} />
          </Card>
         </Link> 
        // <div key={id} class="col-md-4">
        //                 <div class="card mb-4 box-shadow">
        //                     <a href={`/product/${id}`} >
        //                         <img class="card-img-top" alt =""
        //                              style={{width:'100%', height:'auto'}}
        //                              src={`http://localhost:8090${picture}`}/>
        //                     </a>
        //                     <div class="card-body">
        //                         <h5 class="card-title" >{name}</h5>
        //                         <div class="d-flex justify-content-between align-items-center">
        //                             <div class="btn-group">
        //                                 <a href={`/product/${id}`}>
        //                                     <button type="button" class="btn btn-sm btn-outline-secondary">Buy</button>
        //                                 </a>
        //                             </div>
        //                             <small class="text-muted">
        //                             {`SGD ${price}`}
        //                             </small>
                                
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
                    
    );
  }
}
export default Product;
