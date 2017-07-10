import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as productsActions from '../../actions/productsActions';
import ProductsList from './ProductsList';
import {browserHistory} from 'react-router';
import toastr from 'toastr';

//Parent component of list,row
//Products list page
class ProductsPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.redirectToAddProductsPage = this.redirectToAddProductsPage.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    
 
  }

    //Initial local state
   

  //add product page
  redirectToAddProductsPage() {
    browserHistory.push('/product');
  }

  //Delete product action dispatcher , passed down as prop to deleteProduct button
  deleteProduct(product) {



        this.props.actions.deleteProduct(product.Id)
        .then(() =>{
          toastr.warning('Product Deleted!')
 
        }
        )
        .catch(error => {
            toastr.info(error)

        }); 
  }

  //Render list...
  render() {
    const {products} = this.props;
    return (
      <div>
        <h3>My Products...</h3>
        <hr />
        <ProductsList 
              products={products} 
              deleteProduct={this.deleteProduct}/>
        <input type="submit"
               value="Add Product"
               className="btn btn-block btn-success"
               onClick={this.redirectToAddProductsPage}/>
         <hr />
      </div>
      
    );
  }
}

//Page comp props
ProductsPage.propTypes = {
  products: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    products: state.products
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(productsActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage);

