
import { createBrowserRouter } from 'react-router-dom';
import MainLayOut from '../mainLayOut/MainLayOut';
import Navber from '../components/Navber';

  const router = createBrowserRouter([
    {
      path: "/",
      element:<MainLayOut/>,
      children: [
        {
        path: '/',
        element: <Navber/>
      }
    ]
    },
  ]);

  export default router;