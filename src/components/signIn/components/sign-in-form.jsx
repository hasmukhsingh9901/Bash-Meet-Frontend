import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message, Typography } from "antd";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;
const SignInForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    // Login logic
    console.log("Login values:", values);
    message.success("Login Successful!");
  };

  return (
    <div className="signup-container p-6 max-w-md mx-auto h-screen flex flex-col justify-center">
      <Form
        form={form}
        name="signin"
        onFinish={onFinish}
        layout="vertical"
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <Title level={2} className="text-center mb-6">
          Sign In
        </Title>

        {/* Email Input */}
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: "Please enter a valid email!",
            },
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder="Email Address"
            size="large"
          />
        </Form.Item>

        {/* Password Input */}
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Password"
            size="large"
          />
        </Form.Item>

        {/* Remember Me and Forgot Password */}
        <div className="flex justify-between items-center mb-4">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Link to="/forgot-password" className="text-blue-500">
            Forgot Password?
          </Link>
        </div>

        {/* Submit Button */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            size="large"
          >
            Sign In
          </Button>
        </Form.Item>

        {/* Sign Up Link */}
        <div className="text-center">
          <Text>
            Don&apos;t have an account?{" "}
            <Link to="/" className="text-blue-500">
              Sign Up
            </Link>
          </Text>
        </div>
      </Form>
    </div>
  );
};

export default SignInForm;
