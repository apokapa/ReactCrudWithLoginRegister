import React from 'react';
import TextInput from '../common/TextInput';
import NumericInput from '../common/NumericInput';
import DropdownInput from '../common/DropdownInput';

//Presentaion component....
const ProductForm = ({product, onSave, onChange, saving, errors,categories}) => {
  return (
    <div className="col-sm-8 col-sm-push-2">
    <form>
      <h4>Manage/Add Product</h4>
      <hr />
      <br/>
      <TextInput
        name="Name"
        label="Name"
        value={product.Name}
        onChange={onChange}
        error={errors.Name}
        placeholder="e.g Television (5 characters minimum)"
      />

      <DropdownInput
        name="CategoryId"
        label="CategoryId"
        value={product.CategoryId}
        defaultOption="Select Category"
        options={categories}
        onChange={onChange} error={errors.CategoryId}
      />

      <NumericInput
        name="Price"
        label="Price (€)"
        value={product.Price}
        onChange={onChange}
        error={errors.Price}
        placeholder="e.g 400"
       />
      <hr />
      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Saving...' : 'Save'}
        className="btn btn-block btn-primary"
        onClick={onSave}
       />
       <hr />
    </form>
    </div>
  );
};

ProductForm.propTypes = {
  product: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default ProductForm;
