import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import * as accountActions from '../../actions/accountActions';
import {connect} from 'react-redux';
import toastr from 'toastr';

//For the sake of simplicity this page will not be broken down into smaller components...
class RegisterPage extends React.Component {

   constructor(props, context) {
    super(props, context);

    //set local state
    this.state = {
      user: {username: "", password:""},
      confirmPassword: "",
      saving: false
    };


    //Set bindings
    this.onChangeUpdateUserState = this.onChangeUpdateUserState.bind(this); //better performance than bind it on render
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
    this.onClickUserRegister = this.onClickUserRegister.bind(this);
    this.onClickForgotPassword = this.onClickForgotPassword.bind(this);
 
  }

  //Bind input value changes
  onChangeUpdateUserState(event) {
    const field = event.target.name;
    let user = this.state.user;
    user[field] = event.target.value;
    return this.setState({user: user});
  }

  //Bind confirmPassword value changes
  onChangeConfirmPassword(event) {

    let confirmPassword = event.target.value;
    this.setState({ confirmPassword : confirmPassword });

  }


  //Login Info toast
  onClickForgotPassword(event) {
    event.preventDefault();
    toastr.info("Hey I m here to help! Try username: 'monty' with password: 'python'");
  }

 //Login action dispatch event
 onClickUserRegister(event) {
    event.preventDefault();
    this.setState({saving: true});

    if (this.state.user.password===this.state.confirmPassword){
    this.props.dispatch(accountActions.registerUser(this.state.user) )
      .then(() => this.redirect())
      .catch(error => {

        this.setState({saving: false});
        toastr.error(error);
      });
    }
    else
    {
      this.setState({saving: false});
      toastr.error("Password and confirm password dont match");
    }

  }

  //Redirect to products on successfull login
  //To Do: Redirect to page where he is redirected from...
  redirect() {
    toastr.success("Succesfull Register!");
    this.setState({saving: false});
    this.context.router.push('/');
  }

  //To Do: break it down into form and friends
  render() {
    return (
      <div className="col-sm-4 col-sm-push-4">
      <h3>Register Page...</h3>
      <hr />
      <div className="form-group">
      <div className="field">
        <input
          type="text"
          name="username"
          className="form-control"
          placeholder="Choose username"
          onChange={this.onChangeUpdateUserState}
          value={this.state.user.username}/>
       </div>
        <hr />
      <div className="field">
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Choose password"
          onChange={this.onChangeUpdateUserState}
          value={this.state.user.password}
          />
       </div>
       <br />
       <div className="field">
         <input
          type="password"
          name="confrimPassword"
          className="form-control"
          placeholder="Choose Life! Confirm password"
          onChange={this.onChangeConfirmPassword}
          value={this.state.confirmPassword}
          />
       </div>
       <hr />
       </div>
        <input
          type="submit"
          className="btn btn-block btn-primary"
          value={this.state.saving ? 'Validating...' : 'Register'}
          onClick={this.onClickUserRegister}
        />
        <hr />
    </div>
    );
  }
}

//Pull in the React Router context so router is available on this.context.router for redirect()
 RegisterPage.contextTypes = {
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
export default connect(mapStateToProps)(RegisterPage);
