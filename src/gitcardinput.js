import React from "react";

class Githubinput extends React.Component{
    state = {
        username: ""
    }
    inputHandler = (e) => {
        this.setState({
            username:e.target.value
        })
    }
    SubmitHandler = (e) => {
        e.preventDefault();
        this.props.clickHandler(this.state.username)
    }
    render(){
        return(
            <div className="col m12">
                <div className="card" style={{ padding: 15 }}>
                    <form id="userForm" onSubmit={(e) => this.SubmitHandler(e)}>
                    <div className="input-field">
                        <input
                        onChange={(e) => this.inputHandler(e)}
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
            </div>
        )
    }
    
}


export default Githubinput;
