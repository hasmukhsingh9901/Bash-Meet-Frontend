import {
    LockOutlined,
    MailOutlined,
    PhoneOutlined,
    UserOutlined,
  } from "@ant-design/icons";
  import { Button, Checkbox, Form, Input, message, Typography } from "antd";
  import { Link } from "react-router-dom";
  
  const { Title } = Typography;

const SignUpForm = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
      // Form submission logic
      console.log("Received values:", values);
      message.success("Registration Successful!");
    };
  
    const phoneNumberValidator = (_, value) => {
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!value) {
        return Promise.reject(new Error("Please input your phone number"));
      }
      if (!phoneRegex.test(value)) {
        return Promise.reject(
          new Error("Please enter a valid 10-digit Indian phone number")
        );
      }
      return Promise.resolve();
    };
  return (
    <div className="signup-container p-6 max-w-md mx-auto h-screen flex flex-col justify-center">
    <Form
      form={form}
      name="signup"
      onFinish={onFinish}
      scrollToFirstError
      layout="vertical"
      className="bg-white p-6 rounded-lg shadow-md"
    >
      <Title level={2} className="text-center mb-6">
        Sign Up
      </Title>

      {/* Full Name */}
      <Form.Item
        name="fullName"
        rules={[
          {
            required: true,
            message: "Please input your full name",
          },
          {
            min: 2,
            message: "Name must be at least 2 characters",
          },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Full Name" />
      </Form.Item>

      {/* Email */}
      <Form.Item
        name="email"
        rules={[
          {
            type: "email",
            message: "The input is not a valid email!",
          },
          {
            required: true,
            message: "Please input your email!",
          },
        ]}
      >
        <Input prefix={<MailOutlined />} placeholder="Email Address" />
      </Form.Item>

      {/* Phone Number */}
      <Form.Item
        name="phone"
        rules={[
          {
            validator: phoneNumberValidator,
          },
        ]}
      >
        <Input prefix={<PhoneOutlined />} placeholder="Phone Number" />
      </Form.Item>

      {/* Password */}
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
          {
            min: 8,
            message: "Password must be at least 8 characters",
          },
        ]}
        hasFeedback
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Create Password"
        />
      </Form.Item>

      {/* Confirm Password */}
      <Form.Item
        name="confirmPassword"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Passwords do not match"));
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Confirm Password"
        />
      </Form.Item>

      {/* Terms and Conditions */}
      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(
                    new Error("Please accept the terms and conditions")
                  ),
          },
        ]}
      >
        <Checkbox>I have read and agree to the terms and conditions</Checkbox>
      </Form.Item>

      {/* Submit Button */}
      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full">
          Create Account
        </Button>
      </Form.Item>
      <div className="text-center ">
        <p>
          Already have an account?{" "}
          <Link to="/sign-in" className="text-blue-500">
            Sign Up
          </Link>
        </p>
      </div>
    </Form>
  </div>
  )
}

export default SignUpForm