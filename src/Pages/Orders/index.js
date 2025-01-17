import { Table, Typography, Space, Avatar, Rate } from "antd"
import { useEffect, useState } from "react";
import { getOrders } from "../../API";
import { Link } from "react-router-dom";

function Orders() {
    const [loading, setLoading] = useState(false)
    const [datasource, setDataSource] = useState([])

    useEffect(()=>{
        setLoading(true)
        getOrders().then(res=>{
            setDataSource(res.products);
            setLoading(false)
        })
    }, [])
    
    return(
        <Space size={20} direction="vertical">
            <Typography.Title level={4}>Orders</Typography.Title>
            <Table 
                loading={loading}
                columns={[
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
                        title: 'DiscountedTotal',
                        dataIndex: 'discountedTotal',
                        render: (value) => <span>${value}</span>
                    },
                    {
                        title: 'Quantity',
                        dataIndex: 'quantity',
                    },
                    {
                        title: 'Total',
                        dataIndex: 'total'
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
export default Orders