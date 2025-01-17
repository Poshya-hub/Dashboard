import logo from './logo.svg';
import './App.css';
import AppHeader from './Components/AppHeader';
import AppFooter from './Components/AppFooter';
import SideMenu from './Components/SideMenu';
import PageContent from './Components/PageContent';
import { Space } from 'antd';
import { useState, createContext } from "react";

export const DataContext = createContext();

function App() {
  const [color, setColor] = useState('#cbcdd1');

  return (
    <div className="App">
      <DataContext.Provider value={{ color, setColor }}>
        <AppHeader />
      </DataContext.Provider>
      <Space className='SideMenuAndPageContent' style={{ backgroundColor: color }}>
        <SideMenu />
        <PageContent />
      </Space>
      <AppFooter />
    </div>
  );
}

export default App;