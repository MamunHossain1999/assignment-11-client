
import { createBrowserRouter } from 'react-router-dom';
import MainLayOut from '../mainLayOut/MainLayOut';
import Home from '../pages/Home';
import ErrorPage from '../pages/ErrorPage';
import Register from '../Authontication/Register';
import Login from '../Authontication/Login';

  const router = createBrowserRouter([
    {
      path: "/",
      element:<MainLayOut/>,
      children: [
        {
        path: '/',
        element: <Home/>
      },
      {
        path: '*',
        element: <ErrorPage/>
      },
      {
        path: '/register',
        element: <Register/>
      },
      {
        path: '/login',
        element: <Login/>
      }
    ]
    },
  ]);

  export default router;