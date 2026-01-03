import { createBrowserRouter } from 'react-router-dom';
import GuestLayouts from './layouts/GuestLayouts';
import Users from './Users/Users';
import AddUser from './Users/AddUser';
import EditUser from './Users/EditUser';
import NotFound from './Users/NotFound';

import Login from './Users/Login';
import Register from './Users/Register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <GuestLayouts />,
    children: [
      { index: true, element: <Users /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'users/add', element: <AddUser /> },
      { path: 'users/edit/:id', element: <EditUser /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default router;