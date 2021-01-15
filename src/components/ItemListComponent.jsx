import React from 'react';
import { Button, Table, message } from 'antd';

import { Redirect } from 'react-router-dom';
import { getData } from '../middleware/fetchMiddleware';

const columns = [
    {
        title: 'Name',
        dataIndex: 'itemName',
        key: 'itemName',
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
    }
];


class ItemListComponent extends React.Component {

    state = {
        itemsList: [],
        redirectToNewItemPage: false,
    };

    async componentDidMount() {
        try{
            const data = await getData(`/items`);
            if (data.statusCode === 200) {
                this.setState({
                    itemsList: data.items,
                });
            }
        } catch(err) {
            console.log(err);
            message.error('Something went wrong');
        }
        
    }

    handleAddClick = () => {
        this.setState({
            redirectToNewItemPage: true,
        });
    }


    render() {
        const { handleAddClick } = this;
        const { itemsList, redirectToNewItemPage } = this.state;
        if (redirectToNewItemPage) {
            return (
                <Redirect to='/item' />
            )
        }

        return (
            <div className='listing-page'>
                <Button type="primary" onClick={handleAddClick}>
                    Add Item
                </Button>
                <Table dataSource={itemsList} columns={columns} />
            </div>
        );
    };
};

export default ItemListComponent;