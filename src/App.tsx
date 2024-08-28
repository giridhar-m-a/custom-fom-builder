import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from './components/ui/theme-provider';
import { TooltipProvider } from './components/ui/tooltip';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import NewForm from './pages/NewForm';
import ReduxProvider from './store/ReduxProvider';
import AdminLayout from './layouts/AdminLayout';
import Forms from './pages/Forms';
import ViewSubmissions from './pages/ViewSubmissions';
import FormPage from './pages/FormPage';

const Routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: 'about-us', element: <Home /> },
      { path: '/form/:id', element: <FormPage /> },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { path: 'new-form', element: <NewForm /> },
      { path: 'edit-form/:id', element: <NewForm /> },
      { path: '/admin', element: <Forms /> },
      { path: 'submissions/:id', element: <ViewSubmissions /> },
    ],
  },
]);

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <TooltipProvider>
          <Toaster position="top-center" reverseOrder={false} />
          <ReduxProvider>
            <RouterProvider router={Routes} />
          </ReduxProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
