import { createBrowserRouter } from "react-router-dom";

import Dashboard from '../dashboard'

export default createBrowserRouter([
    {
        path: '/',
        Component: Dashboard
    }
])