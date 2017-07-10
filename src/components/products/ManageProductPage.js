import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {categoriesFormattedForDropdown} from '../../selectors/selectors';
import * as productsActions from '../../actions/productsActions';
import ProductForm from './ProductForm';
import toastr from 'toastr';

export class ManageProductPage extends React.Component {

 constructor(props, context) {
    super(props, context);

    //Initial local state
    this.state = {
      product: Object.assign({}, props.product),
      errors: {},
      saving: false
    };

    //Bindings
    this.updateProductState = this.updateProductState.bind(this);
    this.saveProduct = this.saveProduct.bind(this);
  }

  //For when product is loaded from url path
   componentWillReceiveProps(nextProps) {
    if (this.props.product.Id != nextProps.product.Id) {
      this.setState({product: Object.assign({}, nextProps.product)});
    }
  }

  //for form fields binding
  updateProductState(event) {
    const field = event.target.name;
    let product = this.state.product;
    product[field] = event.target.value;
    return this.setState({product: product});
  }

   //Client Validation
   productFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.product.Name.length < 5) {
      errors.Name = 'Name must be at least 5 characters.';
      formIsValid = false;
    }

    if (this.state.product.Price <= 0 || this.state.product.Price==='') {
      errors.Price = 'Price must be filled with a positive number';
      formIsValid = false;
    }

    this.setState({errors: errors});
    return formIsValid;
  }

  //Save product event
   saveProduct(event) {
    event.preventDefault();

    if (!this.productFormIsValid()) {
      toastr.warning('Please follow validation rules and resubmit your form');
      return;
    }

    this.setState({saving: true});

    this.props.actions.saveProduct(this.state.product)
      .then(() => this.redirect())
      .catch(error => {
        this.setState({saving: false});
      });
  }

  //Redirect to products page after succesfull save
  redirect() {
    this.setState({saving: false});
    console.log(this.state.product)
    toastr.info('Product saved!');

    this.context.router.push('/products');
  }

  //Render form and friends , pass props
  render() {
    return (
      <ProductForm
             onChange={this.updateProductState}
             onSave={this.saveProduct}
             product={this.state.product}
             errors={this.state.errors}
             saving={this.state.saving}
             categories={this.props.categories}
      />
    );
  }
}

//Page props
ManageProductPage.propTypes = {
  product: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router.
ManageProductPage.contextTypes = {
  router: PropTypes.object
};

//Get product by id
function getProductById(products, Id) {
  const product = products.filter(product => product.Id == Id);
  if (product) return product[0]; //Missed FirstOrDefault?
  return null;
}

function mapStateToProps(state, ownProps) {
  const productId = ownProps.params.Id; // from the path `/product/:Id`

  let product = {Id: '', Name: '',CategoryId:'', Price: ''};

  if (productId && state.products.length > 0) {
    product = getProductById(state.products, productId);
  }

  return {
    product: product,
    categories: categoriesFormattedForDropdown(state.categories)
  };
}

//Bind form to productsAction specifically... we dont need others.
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(productsActions, dispatch)
  };
}

//Redux doing magic
export default connect(mapStateToProps, mapDispatchToProps)(ManageProductPage);

