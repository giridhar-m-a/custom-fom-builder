import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="app-class lg:block px-2 lg:px-0">
      <Outlet />
    </div>
  );
};

export default AdminLayout;
