import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as accountActions from '../../actions/accountActions';
import toastr from 'toastr';

//Logout button Component made the wrong way , componets need to be dumb and just pass props down to them from parent components
//ToDo: pass function from parent
class LogoutBtn extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onClickLogout = this.onClickLogout.bind(this);
    }

    //Dispatches logout action event and redirect to homepage
    onClickLogout(){
        this.props.dispatch(accountActions.logout());
        this.redirect();
    }

    //Redirect
    redirect() {
        toastr.info('Logged out...');
        this.context.router.push('/');
    }

    //Render button
    render() {
        return (
            <li><a href="#" activeClassName="active" onClick={this.onClickLogout}>Logout</a></li>
        );
    }
}

//Pull in the React Router context so router is available on this.context.router for redirect();
 LogoutBtn.contextTypes = {
    router: PropTypes.object
 };

function mapStateToProps(state, ownProps) {return{ };}

export default connect(mapStateToProps)(LogoutBtn);