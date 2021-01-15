import React from 'react';
import moment from 'moment';
import { Button, Table, message } from 'antd';

import { Redirect } from 'react-router-dom';
import { getData } from '../middleware/fetchMiddleware';

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'user',
        key: 'user',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Invoice Date',
        dataIndex: 'invoiceDate',
        key: 'invoiceDate',
        render: date=><span>{moment(date).format('DD-MM-YYYY')}</span>
    },
    {
        title: 'Total',
        dataIndex: 'total',
        key: 'total',
    },
    {
        title: 'Items',
        dataIndex: 'items',
        key: 'items',
        render: text => <pre>{JSON.stringify(text, null, 2)}</pre>,
    }
];


class InvoiceList extends React.Component {

    state = {
        invoicesList: [],
        redirectToNewInvoicePage: false,
    };

    async componentDidMount() {
        try{
            const data = await getData(`/invoices`);
            if (data.statusCode === 200) {
                this.setState({
                    invoicesList: data.invoices,
                });
            }
        } catch(err) {
            console.log(err);
            message.error('Something went wrong');
        }
        
    }

    handleAddClick = () => {
        this.setState({
            redirectToNewInvoicePage: true,
        });
    }


    render() {
        const { handleAddClick } = this;
        const { invoicesList, redirectToNewInvoicePage } = this.state;
        if (redirectToNewInvoicePage) {
            return (
                <Redirect to='/invoice' />
            )
        }

        return (
            <div className='listing-page'>
                <Button type="primary" onClick={handleAddClick}>
                    Create Invoice
                </Button>
                <Table dataSource={invoicesList} columns={columns} />
            </div>
        );
    };
};

export default InvoiceList;