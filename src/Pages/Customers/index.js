import { Table, Typography, Space, Avatar, Rate } from "antd"
import { useEffect, useState } from "react";
import { getUsers } from "../../API";

function Customers() {
    const [loading, setLoading] = useState(false)
    const [datasource, setDataSource] = useState([])

    useEffect(()=>{
        setLoading(true)
        getUsers().then(res=>{
            setDataSource(res.users);
            setLoading(false)
        })
    }, [])
    
    return(
        <Space size={20} direction="vertical">
            <Typography.Title level={4}>Customers</Typography.Title>
            <Table 
                loading={loading}
                columns={[
                    {
                        title: 'FirstName',
                        dataIndex: 'firstName'
                    },
                    {
                        title: 'LastName',
                        dataIndex: 'lastName',
                    },
                    {
                        title: 'Age',
                        dataIndex: 'age'
                    },
                    {
                        title: 'Gender',
                        dataIndex: 'gender'
                    },
                    {
                        title: 'Phone',
                        dataIndex: 'phone'
                    },
                    {
                        title: 'BirthDate',
                        dataIndex: 'birthDate'
                    },
                    {
                        title: 'BloodGroup',
                        dataIndex: 'bloodGroup'
                    },
                    {
                        title: 'Height',
                        dataIndex: 'height'
                    },
                    {
                        title: 'Weight',
                        dataIndex: 'weight'
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
export default Customers