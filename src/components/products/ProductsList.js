import React, {PropTypes} from 'react';
import ProductsListRow from './ProductsListRow';
import {Link} from 'react-router';

//Presentation component for product list....
const ProductsList = ({products,deleteProduct}) => {
  return (
    <table className="table table-striped">
      <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>CategoryId</th>
        <th>Price</th>
        <th></th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      {products.map( product =>
       <ProductsListRow key={product.Id} product={product}
                        deleteProduct={deleteProduct} />
      )}
      </tbody>
    </table>
  );
};


ProductsList.propTypes = {
  products: PropTypes.array.isRequired
};

export default ProductsList;
