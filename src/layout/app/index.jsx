import { Layout } from 'antd'
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

const Mainlayout = () => {
    return (
        <Layout>
            <Content style={{ padding: '16px' }}>
                <Outlet />
            </Content>
        </Layout>
    )
}

export default Mainlayout