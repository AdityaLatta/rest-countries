import "./App.css";

import {
    createBrowserRouter,
    RouterProvider,
    Route,
    createRoutesFromChildren,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import CountryDetails from "./pages/CountryDetails";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter(
    createRoutesFromChildren(
        <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/country/:name" element={<CountryDetails />} />
            <Route path="*" element={<NotFound />} />
        </Route>
    )
);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
