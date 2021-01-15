import React from 'react';
import { Button, Table, message } from 'antd';

import { Redirect } from 'react-router-dom';
import { getData } from '../middleware/fetchMiddleware';

const columns = [
    {
        title: 'First Name',
        dataIndex: 'firstName',
        key: 'firstName',
    },
    {
        title: 'Last Name',
        dataIndex: 'lastName',
        key: 'lastName',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Telephone No',
        dataIndex: 'telephoneNo',
        key: 'telephoneNo',
    }
];


class ListComponent extends React.Component {

    state = {
        usersList: [],
        redirectToNewUserPage: false,
    };

    async componentDidMount() {
        try{
            const data = await getData(`/users`);
            if (data.statusCode === 200) {
                this.setState({
                    usersList: data.users,
                });
            }
        } catch(err) {
            console.log(err);
            message.error('Something went wrong');
        }
        
    }

    handleAddClick = () => {
        localStorage.removeItem('jwt');
        this.setState({
            redirectToNewUserPage: true,
        });
    }


    render() {
        const { handleAddClick } = this;
        const { usersList, redirectToNewUserPage } = this.state;
        if (redirectToNewUserPage) {
            return (
                <Redirect to='/user' />
            )
        }

        return (
            <div className='listing-page'>
                <Button type="primary" onClick={handleAddClick}>
                    Add User
                </Button>
                <Table dataSource={usersList} columns={columns} />
            </div>
        );
    };
};

export default ListComponent;