
import { createBrowserRouter } from 'react-router-dom';
import MainLayOut from '../mainLayOut/MainLayOut';
import Home from '../pages/Home';
import ErrorPage from '../pages/ErrorPage';
import Register from '../Authontication/Register';
import Login from '../Authontication/Login';
import AvailableFood from '../pages/AvailableFood';
import PrivateRoute from '../pages/PrivateRoute';
import AddFood from '../pages/AddFood';
import ManageMyFoods from '../pages/ManageMyFoods';
import MyFoodRequest from '../pages/MyFoodRequest';
import FoodDetails from '../pages/FoodDetails';
import UpdateFood from '../pages/UpdateFood';
import ThemeController from '../themeControl/ThemeCortroller';


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
        path: '/available-foods',
        element: <AvailableFood/>
      },
      {
        path: '/add-food',
        element: <AddFood/>
      },
      {
        path: '/manage-my-foods',
        element:<ManageMyFoods/>
      },
      {
        path: '/update-food/:id',
        element: <UpdateFood/>
      },
      {
        path: '/food/:id',
        element: <FoodDetails/>
      },
      {
        path: '/my-food-request',
        element:<MyFoodRequest/>
      },
      {
        path: '/darkLight',
        element: <ThemeController/>
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