// import { Suspense, lazy, useEffect, useState } from 'react';
// import { Route, Routes } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';
// import ECommerce from './pages/Dashboard/ECommerce';
// import SignIn from './pages/Authentication/SignIn';
// import SignUp from './pages/Authentication/SignUp';
// import Loader from './common/Loader';
// import routes from './routes';

// const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

// function App() {
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     setTimeout(() => setLoading(false), 1000);
//   }, []);
import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ECommerce from './pages/Dashboard/ECommerce';
import Loader from './common/Loader';
import routes from './routes';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import { token, getAuthToken } from '../src/pages//UiElements/host';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check token expiration on component mount
    checkTokenExpiration();
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const checkTokenExpiration = () => {
    const authToken = localStorage.getItem('authToken');
    const expiryTime = localStorage.getItem('expiryTime');
    const loginTime = localStorage.getItem('loginTime');
    token(authToken); // Update the token in host.tsx
    // console.log('Current token:', authToken);
    // console.log('Expiry time:', expiryTime);
    if (expiryTime && loginTime) {
      const loginTimes = parseInt(loginTime, 10); // Get the login time from localStorage
      const currentTime = Math.floor(Date.now() / 1000);
      const tokenExpiration = loginTimes + 3600; // Calculate the token expiration time (3600 seconds = 1 hour)

      // console.log('Login time:', loginTimes);
      // console.log('Token expiration:', tokenExpiration);
      // console.log('Current time:', currentTime);

      if (currentTime > tokenExpiration) {
        console.log('Token expired, logging out...');
        logoutUser();
      }
    }
  };

  
  const logoutUser = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('expiryTime');
    localStorage.removeItem('loginTime'); // Remove expiryTime on logout
    navigate('/auth/signin'); // Redirect to login page
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      <Routes>
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        {getAuthToken() ? (
          <Route element={<DefaultLayout />}>
            <Route index element={<ECommerce />} />
            {routes.map(({ path, component: Component }) => (
              <Route
                key={path}
                path={path}
                element={
                  <Suspense fallback={<Loader />}>
                    <Component />
                  </Suspense>
                }
              />
            ))}
          </Route>
        ) : (
          <Route
            path="*"
            element={<Navigate to="/auth/signin" />}
            key="root-login"
          />
        )}
      </Routes>
    </>
  );
}

export default App;
