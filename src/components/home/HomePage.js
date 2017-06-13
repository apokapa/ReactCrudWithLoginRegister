import React, {PropTypes} from 'react';

//Simple homepage
class HomePage extends React.Component {
  render() {
    return (
      <div>

        <div className="jumbotron text-center">
        <h1>My First React App</h1>
        <p>Components! Components everywhere!!!</p> 
        </div>
        <div className="container">
          <div className="row">
            <div className="col-sm-3">
              <h3>Basic CRUD!</h3>
              <p>With CReate Update Delete !</p>
            </div>
            <div className="col-sm-3">
              <h3>Login/Logout flow</h3>
              <p>Basic login/logout flow</p>
            </div>
            <div className="col-sm-2">
              <h3>Mock Api!</h3>
              <p>Async and delay simulation</p>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default HomePage;
