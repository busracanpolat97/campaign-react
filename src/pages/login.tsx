import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

// import 'assets/styles/pages/home.scss';
import { RootState } from '../redux/store';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Col, Form, Input, Row, message } from 'antd';
import { ChangeEvent, useCallback } from 'react';
import { IUser, setUser } from '../redux/slices/userSlice';
import { useTranslation } from 'react-i18next';



type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};
const LoginPage = () => {
    // const { t } = useTranslation();
    // const roles = useSelector((state: RootState) => state.user.roles);
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const [form] = Form.useForm();
    const username = "admin"
    const password = "12345"
    
    const { t } = useTranslation();

    const onFinish = (values: any) => {
        if(values.username == username && values.password == password) {
            console.log("-----")
            const user : IUser = {
                login: true

            }
            localStorage.setItem('user', JSON.stringify(user))
            navigate(`/campaignList`)
            dispatch(setUser(user));
            message.success(t('notification.loginSuccess'));

        }
        else {
            message.error(t('notification.loginError'));
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='home' style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <div>
                <Row gutter={[16, 0]}><h2>Sign in to your account</h2></Row>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default LoginPage;
