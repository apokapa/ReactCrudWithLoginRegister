// This component handles the App template used on every page.
import React, {PropTypes} from 'react';
import Header from './common/Header';
import Footer from './common/Footer';
import {connect} from 'react-redux';


//Parent component
class App extends React.Component {

  //Render header with props passed , childred and footer
  render() {
    return (
      <div>
      <div className="container-fluid">
        <Header
          loading={this.props.loading}
          account={this.props.account}
        />
         <div>
        {this.props.children}
         </div>
         
      </div>
      <Footer />
      </div>
     

    );
  }
}

//Props
App.propTypes = {
  children: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

//Get account login status and laoding from state...
function mapStateToProps(state, ownProps) {
  return {
    loading: state.ajaxCallsInProgress > 0,
    account: state.account > 0
  };
}

export default connect(mapStateToProps)(App);
