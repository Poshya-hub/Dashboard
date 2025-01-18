import p from '../../Images/P.png';
import { MailOutlined, BellFilled } from '@ant-design/icons';
import { Image, Typography, Space, Badge, ColorPicker, Drawer, List, notification } from 'antd';
import { useState, useContext, useEffect } from "react";
import { DataContext } from '../../App';
import { getComments, getOrders } from '../../API';

function AppHeader() {
    const { setColor } = useContext(DataContext);
    const [comments, setComments] = useState([]);
    const [orders, setOrders] = useState([]);
    const [commentsOpen, setCommentsOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);

    const handleColorChange = (color) => {
        if (color) {
            const hexColor = color.toHexString(); 
            setColor(hexColor);
        } else {
            console.log("Color object is undefined or does not have a hex property");
        }
    };

    useEffect(() => {
        getComments().then(res => {
            setComments(res.comments)
        })
        getOrders().then(res => {
            setOrders(res.products)
        })
    })

    return (
        <div className="AppHeader">
            <Image
                width={50}
                src={p}
            />
            <div type="secondary" strong className="appHeaderText">
                DASHBOARD
            </div>
            <Space>
                <ColorPicker size='small' onChange={handleColorChange} />
                <Badge count={comments.length} dot>
                    <MailOutlined style={{ fontSize: 24 }} onClick={() => {
                        setCommentsOpen(true)
                    }}/>
                </Badge>
                <Badge count={orders.length} >
                    <BellFilled style={{ fontSize: 24 }} onClick={() => {
                        setNotificationsOpen(true)
                    }}/>
                </Badge>
            </Space>
            <Drawer title="Comments" open={commentsOpen} onClose={() => {
                setCommentsOpen(false)
                }} 
                maskClosable 
            >
                <List dataSource={comments} renderItem={(item) => {
                    return <List.Item>{item.body}</List.Item>
                }}></List>
            </Drawer>
            <Drawer title="Notifications" open={notificationsOpen} onClose={() => {
                setNotificationsOpen(false)
            }} 
            maskClosable
            >
                <List dataSource={orders} renderItem={(item) => {
                    return (
                        <List.Item>
                            <Typography.Text strong>
                                {item.title} 
                            </Typography.Text>
                            &nbsp;has been ordered!
                        </List.Item>
                    )
                }}></List>
            </Drawer>
        </div>
    );
}

export default AppHeader;