import { ShoppingCartOutlined, ShoppingOutlined, UserOutlined, DollarCircleOutlined } from "@ant-design/icons";
import { Card, Space, Statistic, Table, Typography } from "antd"
import { useEffect, useState } from "react";
import { getInventory, getOrders, getRevenue, getUsers } from "../../API";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

function Dashboard() {

    const [orders, setOrders] = useState(0)
    const [inventory, setInventory] = useState(0)
    const [customers, setCustomers] = useState(0)
    const [revenue, setRevenue] = useState(0)

    useEffect(() => {
        getOrders().then((res) => {
            setOrders(res.total)
        });
        getRevenue().then((res) => {
            setRevenue(res.total)
        })
        getInventory().then((res) => {
            setInventory(res.total)
        })
        getUsers().then((res) => {
            setCustomers(res.total)
        })
    })

    return(
        <Space size={20} direction="vertical">
            <Typography.Title level={4}>Dashboard</Typography.Title>
            <Space direction="horizontal" className="cards">
                <DashboardCard 
                    icon={
                    <ShoppingCartOutlined 
                        style={{
                            color: "green", 
                            backgroundColor:'rgba(0,255,0,0.25)', 
                            borderRadius:20,
                            fontSize: 24,
                            padding: 8,
                            }}
                        />
                    }
                    title={"Orders"} 
                    value={orders} 
                />
                <DashboardCard 
                    icon={
                    <ShoppingOutlined
                        style={{
                            color: "blue", 
                            backgroundColor:'rgba(0,0,255,0.25)', 
                            borderRadius:20,
                            fontSize: 24,
                            padding: 8
                            }}
                        />
                    }
                    title={"Inventory"} 
                    value={inventory} 
                />
                <DashboardCard 
                    icon={
                    <UserOutlined
                        style={{
                            color: "purple", 
                            backgroundColor:'rgba(0,255,255,0.25)', 
                            borderRadius:20,
                            fontSize: 24,
                            padding: 8
                            }}
                        />
                    }
                    title={"Customer"} 
                    value={customers} 
                />
                <DashboardCard 
                    icon={
                    <DollarCircleOutlined
                        style={{
                            color: "red", 
                            backgroundColor:'rgba(255,255,0,0.25)', 
                            borderRadius:20,
                            fontSize: 24,
                            padding: 8
                            }}
                        />
                    }
                    title={"Revenue"} 
                    value={revenue} 
                />
            </Space>
            <Space className="recentOrderAndChart">
                <RecentOrder />
                <DashboardChart/>
            </Space>
        </Space>
    );
}

function DashboardCard({icon, title, value}){
    return(
        <Card>
            <Space direction="horizontal">  
                {icon}
                <Statistic title={title} value={value} />
            </Space>
        </Card>
    );
}

function RecentOrder(){
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        getOrders().then((res) => {
            setDataSource(res.products);
            setLoading(false)
        });
    },[])

    return (
        <>
            <Typography.Text strong className="table" style={{padding: '10px !important'}}>Recent Orders</Typography.Text>
            <Table 
                columns={[
                    {
                        title: 'Title',
                        dataIndex: 'title'
                    },
                    {
                        title: 'Quantity',
                        dataIndex: 'quantity'
                    },
                    {
                        title: 'Price',
                        dataIndex: 'price'
                    }
                ]}
                loading={loading}
                dataSource={dataSource}
                pagination={false}
            />
        </>
    )
    
}

function DashboardChart(){

    const [revenueData, setRevenueData] = useState({
        labels:[],
        datasets:[]
    })

    useEffect(() => {
        getRevenue().then((res) => { 
            const labels = res.carts.map((cart) => {
                return `User-${cart.userId}`;
            });
            const data = res.carts.map((cart) => {
                return cart.discountedTotal;
            });
            const dataSource = {
                labels,
                datasets: [
                  {
                    label: 'Revenue',
                    data: data,
                    backgroundColor: 'rgba(255, 0, 0, 11)',
                  }
                ],
              };
              setRevenueData(dataSource)
         })
    },[])

    const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Order Revenue',
      },
    },
  };

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    return <Card className="chart">
                <Bar options={options} data={revenueData} />
            </Card>
}

export default Dashboard