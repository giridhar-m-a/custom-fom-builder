import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getFormBySlug } from '@/data/getFormData';
import { FormDetails } from '@/Types';
import CustomForm from '@/pages/Form';
import Header from './Header';

const Layout = () => {
  const location = useLocation();

  const { data: forms } = useQuery({
    queryKey: ['forms'],
    queryFn: () => getFormBySlug(location.pathname),
  });

  console.log(forms);

  let formData: FormDetails[] = [];
  if (!forms?.error) {
    formData = forms?.data || [];
  }

  return (
    <div className="app-class lg:block px-2 lg:px-0">
      <Header/>
      <Outlet />
      {formData.length > 0 && <CustomForm formData={formData[0]} />}
    </div>
  );
};

export default Layout;
