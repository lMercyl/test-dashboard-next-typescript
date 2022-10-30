import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main-container">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default Layout;
