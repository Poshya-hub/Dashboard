import p from '../../Images/P.png';
import { MailOutlined, BellFilled } from '@ant-design/icons';
import { Image, Typography, Space, Badge, ColorPicker } from 'antd';
import { useContext } from "react";
import { DataContext } from '../../App';

function AppHeader() {
    const { setColor } = useContext(DataContext);

    const handleColorChange = (color) => {
        if (color) {
            const hexColor = color.toHexString(); 
            setColor(hexColor);
        } else {
            console.log("Color object is undefined or does not have a hex property");
        }
    };

    return (
        <div className="AppHeader">
            <Image
                width={50}
                src={p}
            />
            <Typography.Title type="secondary">
                DASHBOARD
            </Typography.Title>
            <Space>
                <ColorPicker size='small' onChange={handleColorChange} />
                <Badge count={10} dot>
                    <MailOutlined style={{ fontSize: 24 }} />
                </Badge>
                <Badge count={20}>
                    <BellFilled style={{ fontSize: 24 }} />
                </Badge>
            </Space>
        </div>
    );
}

export default AppHeader;