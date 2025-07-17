
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
        element: <PrivateRoute><AvailableFood/></PrivateRoute>
      },
      {
        path: '/add-food',
        element: <PrivateRoute><AddFood/></PrivateRoute>
      },
      {
        path: '/manage-my-foods',
        element:<PrivateRoute><ManageMyFoods/></PrivateRoute>
      },
      {
        path: '/update-food/:id',
        element: <PrivateRoute><UpdateFood/></PrivateRoute>
      },
      {
        path: '/food/:id',
        element: <PrivateRoute><FoodDetails/></PrivateRoute>
      },
      {
        path: '/my-food-request',
        element:<PrivateRoute><MyFoodRequest/></PrivateRoute>
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