import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home/Home';
import OurMenu from '../pages/OurMenu/OurMenu';
import OrderedFood from '../pages/OrderedFood/OrderedFood';
import Login from '../pages/Login/Login';
import SignUp from '../pages/SignUp/SignUp';
import Dashboard from '../layouts/Dashboard';
import Cart from '../pages/Dashboard/Cart/Cart';

const Routes = createBrowserRouter ([
    {
        path: '/',
        element: <MainLayout/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: 'menu',
                element: <OurMenu/>
            },
            {
                path: 'ordered-food/:tabCategory',
                element: <OrderedFood/>
            },
            {
                path: 'login',
                element: <Login/>
            },
            {
                path: 'signup',
                element: <SignUp/>
            },
        ]

    },
    {
        path: 'dashboard',
        element: <Dashboard/>,
        children: [
            {
                path: 'cart',
                element: <Cart/>
            }
        ]
    }
])

export default Routes;