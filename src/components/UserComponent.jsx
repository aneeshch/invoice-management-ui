import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { Redirect } from 'react-router-dom';
import { postData } from '../middleware/fetchMiddleware';

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
    };

    formRef = React.createRef();

    onFinish = async (values) => {
        try {
            let data = await postData('/user', values)

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

    render() {
        const { onFinish } = this;
        const { redirectToListingPage } = this.state;
        if (redirectToListingPage) {
            return (
                <Redirect to='/users/list' />
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
                        label="Firstname"
                        name="firstName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your first name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Lastname"
                        name="lastName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your last name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="TelephoneNo"
                        name="telephoneNo"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone no!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your address!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Add User
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    };
};

export default UserComponent;