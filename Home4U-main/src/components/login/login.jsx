import React from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {

        console.log('handleSubmit called');
        const navigate = useNavigate();


        event.preventDefault();

        const { email, password } = this.state;
        console.log('email:', email);
        console.log('password:', password);

        fetch('http://localhost:3000/api/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
            .then(response => response.json()) // Add this line
            .then(data => {
                if (data.uid && data.username && data.email) {
                    // Save user data here
                    navigate('/'); // Redirect to main page
                } else {
                    // Handle login failure here
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    render() {
        return (
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="email"
                        placeholder="Username"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                    />

                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }
}

export default Login;