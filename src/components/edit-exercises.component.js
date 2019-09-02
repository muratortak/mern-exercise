import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class EditExercises extends Component {
    constructor(props) {
        super(props);

        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            userName: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    // This function is a React LifCycle Method
    // This method will be called right before anything displayed on the Page.
    componentDidMount() {
        axios.get('http://localhost:5000/exercises/' + this.props.match.params.id) // getting the id form the url ??
            .then(res => {
                this.setState({
                    userName: res.data.userName,
                    description: res.data.description,
                    duration: res.data.duration,
                    date: new Date(res.data.date)
                });
            })
            .catch(err => console.log(err));

        axios.get('http://localhost:5000/users/')
            .then(response => {
                if(response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.userName)
                    });
                }
            });
    }

    onChangeUserName(e) {
        this.setState({
            userName: e.target.value
        });
    }
    
    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            //There is going to be a calender and will pass the date directly
            date: date
        });
    }

    onSubmit(e) {
        // This will prevent the default HTML form submit behaviour from taking place.
        // We are going to define a new behaviour.
        e.preventDefault();

        const exercise = {
            userName: this.state.userName,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }
        console.log(exercise);

        axios.post('http://localhost:5000/exercises/update/'+this.props.match.params.id, exercise)
            .then(res => console.log(res.data));

        window.location = '/';
    }

    render() {
        return (
            <div>
                <h3>Edit Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.userName}
                            onChange={this.onChangeUserName}>
                                {
                                    this.state.users.map(user => {
                                        return <option 
                                            key={user}
                                            // > {user} is the text
                                            value={user} > {user} 
                                            </option>
                                    })
                                }
                            </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            />
                    </div>
                    <div className="form-group">
                        <label>Duration: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                            />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}