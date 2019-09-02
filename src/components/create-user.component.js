import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUsers extends Component {
    constructor(props) {
        super(props);

        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            userName: '',
        }
    }

    onChangeUserName(e) {
        this.setState({
            userName: e.target.value
        });
    }

    onSubmit(e) {
        // This will prevent the default HTML form submit behaviour from taking place.
        // We are going to define a new behaviour.
        e.preventDefault();

        const user = {
            userName: this.state.userName,
        }
        console.log(user);
        
        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data));

        this.setState({
            userName: ''
        });
    }

    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.userName}
                            onChange={this.onChangeUserName}
                            />
                    </div>
                    <div className="fomr-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}