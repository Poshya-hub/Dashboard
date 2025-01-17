import {Route, Routes} from 'react-router-dom';
import Dashboard from '../../Pages/Dashboard';
import Inventory from '../../Pages/Inventory'; 
import Orders from '../../Pages/Orders';
import Customers from '../../Pages/Customers';

function AppRoutes() {
    return(
        <div classNme="AppRoutes">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/customers" element={<Customers />} />
                </Routes>
        </div>
    );
}
export default AppRoutes