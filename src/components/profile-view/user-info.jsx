import React from 'react';
import { Card } from 'react-bootstrap';

const UserInfo = ({ name, email, username }) => {
    return ( 
        <Card>
            <Card.Body>
                <h4>User Info</h4>
                <p>Username: {username}</p>
                <p>Name: {name}</p>
                <p>e-mail: {email}</p>
            </Card.Body>           
        </Card>
    );
}
 
export default UserInfo;