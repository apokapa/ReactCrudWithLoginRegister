import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';

//Delete product component with DeleteFunction passed as prop from parent components
class DeleteProduct extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.delete = this.delete.bind(this);


    }
    
    delete(event) {
        event.preventDefault();
        this.props.deleteFunction(this.props.itemToDelete);
    }

    render() {
        return (
         
        <input
          type="submit"
          className="btn btn-block btn-danger"
          value={'Delete'}
          onClick={this.delete}
        />

        );
    }
}

DeleteProduct.propTypes = {
    deleteFunction: PropTypes.func.isRequired,
    itemToDelete: PropTypes.object.isRequired
};

export default DeleteProduct;