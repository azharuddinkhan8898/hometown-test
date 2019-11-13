import React from "react";
import Githubcard from "./githubcard";
import Githubinput from './gitcardinput';
import M from 'materialize-css';

function dynamicSort(property) {
  var sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function(a, b) {
    var result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
}

function search(nameKey, myArray){
  for (var i=0; i < myArray.length; i++) {
      if (myArray[i].login === nameKey) {
          return myArray[i];
      }
  }
}

class App extends React.Component {
  state = {
    users: [],
    username: ""
  };
  clickHandler = username => {
    // event.preventDefault();

    var resultObject = search(username, this.state.users);
    if(!resultObject){
      fetch("https://api.github.com/users/" + username)
            .then(res => res.json())
            .then(result => {
              console.log(result);
              if (result.message !== "Not Found") {
                const array = this.state.users;
                array.push(result);
                this.setState({
                  users: array
                });
              } else {
                M.toast({ html: "Username not found." });
              }

              document.getElementById("userForm").reset();
            });
    }
    else{
      M.toast({ html: "Username already exist." });
    }
  };
  deleteHandler = id => {
    const array = this.state.users;
    const newArray = array.filter(el => {
      return id !== el.id;
    });
    this.setState({
      users: newArray
    });
  };
  sort = val => {
    const array = this.state.users;
    console.log(array, val);
    array.sort(dynamicSort(val));
    this.setState({
      user: array
    });
  };
  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <Githubinput clickHandler = {this.clickHandler} />
            {/* <div className="col m12">
              <div className="card" style={{ padding: 15 }}>
                <form id="userForm" onSubmit={this.clickHandler}>
                  <div className="input-field">
                    <input
                      ref={input => (this.textInput = input)}
                      id="user_name"
                      type="text"
                      className="validate"
                      autoComplete="off"
                    />
                    <label htmlFor="user_name">Github username</label>
                  </div>
                  <button
                    type="submit"
                    className="waves-effect waves-light btn"
                    style={{ width: "100%" }}
                  >
                    Add user
                  </button>
                </form>
              </div>
            </div> */}
          </div>
          {this.state.users.length ? (
            <div className="sorting" style={{ padding: 10 }}>
              <button
                onClick={() => this.sort("location")}
                style={{ marginRight: 30 }}
                className="waves-effect waves-light btn"
              >
                Sort by location
              </button>
              <button
                onClick={() => this.sort("followers")}
                className="waves-effect waves-light btn"
              >
                sort by followers
              </button>
            </div>
          ) : null}
          <div className="row">
            <Githubcard
              users={this.state.users}
              deleteHandler={this.deleteHandler}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
