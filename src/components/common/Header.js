import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import Loader from './Loader';
import LogoutBtn from './LogoutBtn';

//Presentaion component....
//Header excepts loading status and account login status to change accordingly
const Header = ({loading, account}) => {
  return (
    <nav className="navbar navbar-inverse">
      <div className="navbar-header">
      <Link to="/" className="navbar-brand" href="/">React CRUD</Link>
      </div>
      <ul className="nav navbar-nav">
      <li><Link to="/" activeClassName="active">Home</Link></li>
      <li><Link to="/products" activeClassName="active">Products</Link></li>
      {account >0 ? <LogoutBtn />:<li><Link to="/login" activeClassName="active">Login</Link></li>}
      {loading >0 ? <Loader interval={100} dots={50}/>:""}
      </ul>
    </nav>
  );
};


Header.propTypes = {
  loading: PropTypes.bool.isRequired,
  account: PropTypes.bool.isRequired
};


export default Header;
