import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import SigninPage from './pages/SigninPage';
import TodoPage from './pages/TodoPage';
import RootLayout from './pages/RootLayout';
import ErrorPage from './pages/404Page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/signup', element: <SignupPage /> },
      { path: '/signin', element: <SigninPage /> },
      { path: '/todo', element: <TodoPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
