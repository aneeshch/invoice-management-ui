import React from 'react';
import { Form, Input, Button, message, DatePicker, Select } from 'antd';
import { Redirect } from 'react-router-dom';
import { postData, getData } from '../middleware/fetchMiddleware';
const { Option } = Select;

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 8,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 8,
    },
};

class UserComponent extends React.Component {

    state = {
        redirectToListingPage: false,
        users: [],
        items: [],
        total: 0,
        lineItems: [{lineTtal: 0, price: 0}]
    };

    formRef = React.createRef();

    async componentDidMount() {
        try {
            const itemsData = await getData(`/items`);
            if (itemsData.statusCode === 200) {
                this.setState({
                    items: itemsData.items,
                });
            }
            const usersData = await getData(`/users`);
            if (usersData.statusCode === 200) {
                this.setState({
                    users: usersData.users,
                });
            }
        } catch (err) {
            console.log(err);
            message.error('Something went wrong');
        }
    }

    onFinish = async (values) => {
        try {
            console.log(values)
            const reqBody = {};
            reqBody.total = this.state.total;
            reqBody.invoiceDate = values.invoiceDate;
            reqBody.id = values.id;
            reqBody.user = values.user;
            reqBody.items = this.state.lineItems.map(eachLine=>({
                itemId: eachLine.id,
                quantity: eachLine.quantity
            }));
    // "items": [{
    //     "itemId": "6000710cf9ae06120766afd6",
    //     "quantity": 2
    // },
    // {
    //     "itemId": "60007113f9ae06120766afd7",
    //     "quantity": 3
    // }]
    console.log(reqBody)
    debugger
            let data = await postData('/invoice', reqBody)

            if (data.statusCode === 201) {
                message.success(data.message);
                this.setState({
                    redirectToListingPage: true
                });
            } else {
                message.error(data.message);
            }

        } catch (err) {
            console.log(err);
            message.error('Something went wrong');
        }
    };

    handleQuantityChange = (e, index) => {
        const qty = e.target.value;
        const prevItems = [...this.state.lineItems];
        let total = 0;
        const lineTotal = Number(qty) * Number(prevItems[index].price);
        prevItems[index] = {...prevItems[index], quantity: qty, lineTotal};
        prevItems.forEach(each=>{
            if (each.lineTotal) total+=each.lineTotal;
        });
        
        this.setState({
            lineItems: prevItems,
            total
        });
    }

    handleItemChange = (e, index) => {
        console.log(e.target.value)
        const [id,price] = e.target.value.split('-');
        const prevItems = [...this.state.lineItems];
        prevItems[index] = {...prevItems[index], price, id, dropdownValue: e.target.value};
        this.setState({
            lineItems: prevItems
        });
    }

    handleButtonClick = () => {
        const lines = [...this.state.lineItems];
        lines.push({lineTotal:0});
        this.setState({
            lineItems: lines
        });
    }

    render() {
        console.log(this.state.total)
        const { onFinish } = this;
        const { redirectToListingPage, users, total, items, lineItems } = this.state;
        if (redirectToListingPage) {
            return (
                <Redirect to='/invoices/list' />
            )
        }
        return (
            <div className='login-form' >
                <Form
                    {...layout}
                    ref={this.formRef}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Invoice ID"
                        name="id"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your id!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Invoice Date"
                        name="invoiceDate"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your invoice date!',
                            },
                        ]}
                    >
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label="User"
                        name="user"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your user!',
                            },
                        ]}
                    >
                        <Select allowClear>
                            {
                                users.map((eachUser) => <Option key={eachUser.id} value={eachUser.id}>{eachUser.firstName + ' ' + eachUser.lastName}</Option>)
                            }
                        </Select>
                    </Form.Item>

                    {
                        lineItems.map((eachLine, index) => {
                        return(<div className="bordered-div">
                        <Form.Item
                            label="Item"
                            // name="items"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your item!',
                                },
                            ]}
                        >
                            <select allowClear onChange={(e)=>this.handleItemChange(e,index)} value={this.state.lineItems[index].dropdownValue} defaultValue='select'>
                            <option key='key' value='select' disabled>Select</option>
                                {
                                    items.map((eachItem) => <option key={eachItem.id} value={eachItem.id + '-' + eachItem.price}>{eachItem.itemName}</option>)
                                }
                            </select>
                        </Form.Item>
                    
                        <Form.Item
                            label="Price"
                        >
                            {eachLine.price}
                                        </Form.Item>
                    
                        <Form.Item
                            label="Quantity"
                            // name="quantity"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your quantity!',
                                },
                            ]}
                        >
                            <input onChange={(e)=>this.handleQuantityChange(e, index)}/>
                        </Form.Item>
                    
                        <Form.Item
                            label="Line Total"
                        >
                            {eachLine.lineTotal}
                                        </Form.Item>
                    
                    </div>)
                        })
                    }

                    <Form.Item
                        label=" "
                    >
                        <Button onClick={this.handleButtonClick}>
                            Add Item
                        </Button>
                    </Form.Item>

                    <Form.Item
                        label="Invoice Total"
                    >
                        {total}
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Create Invoice
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    };
};

export default UserComponent;