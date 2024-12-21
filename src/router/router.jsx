
import { createBrowserRouter } from 'react-router-dom';
import MainLayOut from '../mainLayOut/MainLayOut';
import Home from '../pages/Home';
import ErrorPage from '../pages/ErrorPage';

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
      }
    ]
    },
  ]);

  export default router;