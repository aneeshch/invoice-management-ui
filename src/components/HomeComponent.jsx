import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';


const HomeComponent = () => (
    <div className='home-page'>
        <p><Button type="primary" size='large'><Link to="/invoices/list">Invoices</Link></Button></p>
        <p><Button type="primary" size='large'><Link to="/items/list">Items</Link></Button></p>
        <p><Button type="primary" size='large'><Link to="/users/list">Users</Link></Button></p>
    </div>
);

export default HomeComponent;