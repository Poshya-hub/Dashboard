import { AppstoreOutlined, ShopOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import {Menu} from "antd"
import { useEffect, useState } from "react";
import {useLocation, useNavigate} from "react-router-dom"

function SideMenu() {

    const navigate=useNavigate();
    const location=useLocation();
    const [selectedKeys, setSelectedKeys] = useState('/')

    useEffect(() => {
        const pathName = location.pathname
        console.log(pathName)
        setSelectedKeys(pathName)
    }, [location.pathname])

    return( 
        <div className="SideMenu">
            <Menu
                className="SideMenuVertical"
                mode="vertical"
                onClick={(item)=>{
                    navigate(item.key)
                }}
                selectedKeys={selectedKeys}
                items={[
                    {
                        label: "Dashboard",
                        icon: <AppstoreOutlined />,
                        key: '/'
                    },
                    {
                        label: "Inventory",
                        icon: <ShopOutlined />,
                        key: '/inventory'
                    },
                    {
                        label: "Orders",
                        key: '/orders',
                        icon: <ShoppingCartOutlined />
                    },
                    {
                        label: "Customers",
                        key: '/customers',
                        icon: <UserOutlined />
                    }
                ]}
            />
        </div>
    );
}
export default SideMenu