import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// This is a functional React Component -- This is different than Class Components. Functional React Component lacks State and Lifecycle Methods
// If all you need to do is accept Props and return JSX, you should use a Functional Component instead of Class Component.
const Exercise = props => (
    <tr>
        <td>{props.exercise.userName}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0, 10)}</td>
        <td>
            <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => {props.deleteExercise(props.exercise._id)}}>delete</a>
        </td>
    </tr>
)

// This is a class Component
export default class EditExercises extends Component {
    constructor(props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = {exercises: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/exercises/')
            .then(res => {
                if(res.data.length > 0) {
                    this.setState({ exercises: res.data});
                }
            })
            .catch(err => console.log(err));
    }

    deleteExercise(id) {
        axios.delete('http://localhost:5000/exercises/'+id)
            .then(res => console.log(res.data));

        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        });
    }

    exerciseList() {
        return this.state.exercises.map(currentExercise => {
            return <Exercise exercise={currentExercise} deleteExercise={this.deleteExercise} key={currentExercise._id}/>
        })
    }

    render() {
        return (
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.exerciseList() }
                    </tbody>
                </table>
            </div>
        )
    }
}