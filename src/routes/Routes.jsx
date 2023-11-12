import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home/Home';
import OurMenu from '../pages/OurMenu/OurMenu';
import OrderedFood from '../pages/OrderedFood/OrderedFood';

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
        ]

    }
])

export default Routes;