import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_URL } from '../../utils/constant';
import { validate } from '../../utils/validate';
import { Card, 
         Form, 
         Button, 
         Col} from 'react-bootstrap';

import './registration-view.scss';

const RegistrationView = () => {
    const [userData, setUserData] = React.useState({
        name: '',
        username : '',
        password: '',
        email: '',
        dob: ''
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");

    const handleChange = e => {
        const {name, value} = e.target;
        let error = validate(name, value);
        setErrors((prevErr) =>{
            return {
                ...prevErr,
                ...error
            }
        });

        setUserData((prevState) =>({
            ...prevState,
            [name] : value
        }));
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log(userData, new Date(userData.dob));
        const { name, username, password, email, dob } = userData; 

        axios.post(`${API_URL}/user`,{
            Name: name,
            Username: username,
            Password: password,
            Email: email,
            Birthday: new Date(dob)
        })
        .then(response =>{
            const data = response.data;
            setMessage("User registration was successful");
            setUserData({
                name: '',
                username : '',
                password: '',
                email: '',
                dob: ''
            });
            data && window.open('/', '_self'); 
         })
         .catch(error =>{
            setMessage("User registration failed with an error. Plaese try later");
            /*window.open('/', '_self');*/
            console.log(`Registration failed!!! ${error}`);
         });
    }

    return (
        <Col md={8} lg={6} className="mx-auto">
            <Card className="reg-container">
                <Card.Body>
                <Card.Title as="h1" className="text-center title">WELCOME TO MYFLIX</Card.Title>
                    {message && (
                            <div className="form-group">
                                <div className="alert alert-danger my-1 py-2" role="alert">
                                    {message}
                                </div>
                            </div>
                    )}
                    <Form>
                        <Form.Group controlId="name" className="mb-3">
                            <Form.Label>Name: </Form.Label>
                            <Form.Control 
                                type="text" 
                                name="name" 
                                value={userData.name || ''}
                                onChange={handleChange}
                                placeholder="Enter name here"
                                isInvalid={!!errors.name}
                                required />
                            <Form.Control.Feedback type="invalid">
                                {errors.username}
                            </Form.Control.Feedback>
                        </Form.Group>       
                        <Form.Group controlId="username" className="mb-3">
                            <Form.Label>Username: </Form.Label>
                            <Form.Control 
                                type="text" 
                                username="username" 
                                value={userData.username || ''}
                                onChange={handleChange}
                                placeholder="Enter username here"
                                isInvalid={!!errors.username}
                                required />
                            <Form.Control.Feedback type="invalid">
                                {errors.username}
                            </Form.Control.Feedback>
                        </Form.Group>                           
                        <Form.Group controlId="password" className="mb-3"> 
                            <Form.Label>Password: </Form.Label> 
                            <Form.Control 
                                type="password" 
                                name="password" 
                                value={userData.password || ''}
                                onChange={handleChange}
                                placeholder="Enter password here"
                                isInvalid={!!errors.password}
                                required />                       
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="email" className="mb-3"> 
                            <Form.Label>Email: </Form.Label> 
                            <Form.Control 
                                type="email" 
                                name="email" 
                                value={userData.email || ''}
                                onChange={handleChange}
                                placeholder="Enter email here"
                                isInvalid={!!errors.email}
                                required />                       
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="dob" className="mb-3"> 
                            <Form.Label>Date of Birth: </Form.Label> 
                            <Form.Control 
                                type="date"
                                name="dob" 
                                onChange={handleChange}
                                placeholder="Enter date of birth here"/>
                        </Form.Group>
                        <Button 
                            type="submit"
                            className="login-btn"
                            disabled={!userData.email && !userData.password}
                            onClick={handleSubmit}>
                                Register
                        </Button>
                    </Form>
                    <Link to='/'>
                        <Button variant="link" className="d-flex mx-auto">
                            Already have an account? Sign In
                        </Button>
                    </Link>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default RegistrationView;