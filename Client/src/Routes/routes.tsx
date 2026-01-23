import { createBrowserRouter } from "react-router-dom";
import App from "../app/Layout/App";
import ReviewPage from "../ReviewPage/ReviewPage";
import HomePage from "../HomePage/HomePage";
import NewsPage from "../NewsPage/NewsPage";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'recenzii', element: <ReviewPage /> },
            { path: 'stiri', element: <NewsPage/> },

        ]
    }
])

