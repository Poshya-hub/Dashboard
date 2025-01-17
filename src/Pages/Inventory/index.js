import { Table, Typography, Space, Avatar, Rate } from "antd"
import { useEffect, useState } from "react";
import { getInventory } from "../../API";

function Inventory() {
    const [loading, setLoading] = useState(false)
    const [datasource, setDataSource] = useState([])

    useEffect(()=>{
        setLoading(true)
        getInventory().then(res=>{
            setDataSource(res.products);
            setLoading(false)
        })
    }, [])
    
    return(
        <Space size={20} direction="vertical">
            <Typography.Title level={4}>Inventory</Typography.Title>
            <Table 
                loading={loading}
                columns={[
                    {
                        title: 'Thumbnail',
                        dataIndex: 'thumbnail',
                        render: (link) => {
                            return <Avatar src={link} />
                        }
                    },
                    {
                        title: 'Title',
                        dataIndex: 'title'
                    },
                    {
                        title: 'Price',
                        dataIndex: 'price',
                        render: (value) => <span>${value}</span>
                    },
                    {
                        title: 'Rating',
                        dataIndex: 'rating',
                        render: (rating) => {
                            return <Rate value={rating} allowhalf />
                        }
                    },
                    {
                        title: 'Stock',
                        dataIndex: 'stock'
                    },
                    {
                        title: 'Brand',
                        dataIndex: 'brand'
                    },
                    {
                        title: 'Category',
                        dataIndex: 'category'
                    }
            ]}
            dataSource={datasource}
            pagination={{
                pageSize:5
            }}
            />
        </Space>
    );
}
export default Inventory