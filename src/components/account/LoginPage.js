import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import * as accountActions from '../../actions/accountActions';
import {connect} from 'react-redux';
import toastr from 'toastr';

//For the sake of simplicity this page will not be broken down into smaller components...
class LoginPage extends React.Component {

   constructor(props, context) {
    super(props, context);

    //set local state
    this.state = {
      user: {username: "", password:""},
      saving: false
    };


    //Set bindings
    this.onChangeUpdateUserState = this.onChangeUpdateUserState.bind(this); //better performance than bind it on render
    this.onClickUserLogin = this.onClickUserLogin.bind(this);
    this.onClickForgotPassword = this.onClickForgotPassword.bind(this);

  }

  //Bind input value changes
  onChangeUpdateUserState(event) {
    const field = event.target.name;
    let user = this.state.user;
    user[field] = event.target.value;
    return this.setState({user: user});
  }

  //Login Info toast
  onClickForgotPassword(event) {
    event.preventDefault();
    toastr.info("Hey I m here to help! Try username: 'monty' with password: 'python'");
  }

 //Login action dispatch event
 onClickUserLogin(event) {

    this.setState({saving: true});
    this.props.dispatch(accountActions.loginUser(this.state.user) )
      .then(() => this.redirect())
      .catch(error => {

        this.setState({saving: false});
        toastr.error(error);
      });
  }

  //Redirect to products on successfull login
  //To Do: Redirect to page where he is redirected from...
  redirect() {
    toastr.success("Succesfull Login!");
    this.setState({saving: false});
    this.context.router.push('/products');
  }

  //To Do: break it down into form and friends
  render() {
    return (
      <div className="col-sm-4 col-sm-push-4">
      <h3>Login Page...</h3>
      <hr />
      <br />
      <div className="form-group">
      <div className="field">
        <input
          type="text"
          name="username"
          className="form-control"
          placeholder="username"
          onChange={this.onChangeUpdateUserState}
          value={this.state.user.username}/>
       </div>
       </div>
      <div className="form-group">
      <div className="field">
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="password"
          onChange={this.onChangeUpdateUserState}
          value={this.state.user.password}
          />
       </div>
       <hr />
       </div>
        <input
          type="submit"
          className="btn btn-block btn-primary"
          value={this.state.saving ? 'Logging in...' : 'Login'}
          onClick={this.onClickUserLogin}
        />
        <hr />
        <Link to={'/register'} className="btn btn-block btn-success">Register</Link>
        <hr />
        <input
          type="submit"
          className="btn btn-block btn-info"
          value="I forgot it :("
          onClick={this.onClickForgotPassword}
        />
         <hr />
    </div>
    );
  }
}

//Pull in the React Router context so router is available on this.context.router for redirect()
 LoginPage.contextTypes = {
    router: PropTypes.object
 };

//Access data from store
function mapStateToProps(state, ownProps) {
return{ 
  //To Do: change /login view or redirect depending on the user account login status
  account : state.account 
};
}

//dispatch is to Fire off actions 
//Default mapDispatchToProps
export default connect(mapStateToProps)(LoginPage);
