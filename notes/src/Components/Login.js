
import React from 'react';
import axios from 'axios';


class Signin extends React.Component {
  state = {
    username: '',
    password: '',
  };

  render() {
    return (
      <form className="main-container"onSubmit={this.submitHandler}>
        <div >
          <h1>Log-in Here!</h1>
          <label>Username</label>
          <input
            value={this.state.username}
            onChange={this.inputChangeHandler}
            name="username"
            type="text"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            value={this.state.password}
            onChange={this.inputChangeHandler}
            name="password"
            type="password"
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    );
  }

  submitHandler = event => {
    event.preventDefault();
    axios.post('http://127.0.0.1:8000/accounts/login/', this.state, {
        headers: {
          'Authorization': `Token ${DjangoCSRFToken}`,
        }
      })
      .then(response => {
        this.props.history.push('/notes')
      })
      .catch(err => {
        console.log('bad panda!')
      });
    }

  inputChangeHandler = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };
}

export default Signin;