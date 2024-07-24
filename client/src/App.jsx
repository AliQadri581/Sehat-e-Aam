import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Loader from './Admin/common/Loader';
import SignIn from './UI/pages/signIn';
import SignUp from './UI/pages/signUp';
import PageTitle from './Admin/components/PageTitle';
import Dashboard from './Admin/pages/Dashboard/dashBoard';
import AllUsers from './Admin/pages/Users/allUsers.jsx';
import Home from './UI/pages/Home.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedInUser } from './Redux/api/apiServices.jsx';
import { jwtDecode } from 'jwt-decode';
import { userLoggedIn, userLoggedOut } from './Redux/reducers/userReducers.jsx';
import UserDetails from './Admin/components/Tables/userDetails.jsx';
import ProtectedRoute from './UI/components/protectedRoute.jsx';
import TestListing from './UI/pages/TestListing.jsx';
import LabTests from './UI/pages/labTests.jsx';
import MyLabTests from './UI/pages/MyLabTests.jsx';
import UpdateTests from './UI/pages/UpdateTests.jsx';



function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // jason web tokens
  const jwtCookieToken = document.cookie
    .split(';')
    .some((item) => item.includes('jwt'));

  const decodeJWT = (token) => {
    return jwtDecode(token);
  };

  const { user, loading } = useSelector((s) => s.userReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    const getCurrentUser = async () => {
      if (jwtCookieToken) {
        console.log('logged in');

        const tokenPayload = decodeJWT(
          document.cookie
            .split(';')
            .find((item) => item.startsWith('jwt'))
            .split('=')[1],
        );
        const data = await getLoggedInUser(tokenPayload.id);
        dispatch(userLoggedIn(data));
      } else {
        dispatch(userLoggedOut());
        console.log('not logged in');
      }
    };

    getCurrentUser();
  }, [jwtCookieToken]);
  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="Home page |" />
              <Home />
            </>
          }
        />

        
          <Route
            path='/TestListing'
            element ={
              <>
                <PageTitle title="Test Listing |" />
                <TestListing />
              </>
            }
            
          />

          <Route
            path='/labtest'
            element ={
              <>
                <PageTitle title="Lab Tests |" />
                <LabTests />
              </>
            }
            
          />


          <Route
            path='/MyLabTests'
            element ={
              <>
                <PageTitle title="My Lab Tests |" />
                <MyLabTests />
              </>
            }
            
          />

          <Route
              path='/UpdateTest/:id'
              element={
                  <>
                      <PageTitle title="Update Tests |" />
                      <UpdateTests />
                  </>
              }
          />

        <Route
          element={<ProtectedRoute isAuthenticated={user ? false : true} />}
        >
          <Route
            path="/sign-up"
            element={
              <>
                <PageTitle title="Registeration |" />
                <SignUp />
              </>
            }
          />
          <Route
            path="/sign-in"
            element={
              <>
                <PageTitle title="Sign-In |" />
                <SignIn />
              </>
            }
          />

        </Route>

        {/* Admin dashboard route */}
        <Route
          element={
            <ProtectedRoute
              isAuthenticated={user ? true : false}
              adminRoute={true}
              isAdmin={user?.role === 'Admin' ? true : false}
            />
          }
        >
          <Route path="/dashBoard" element={<Dashboard />} />
          <Route
            path="/manage-users"
            element={
              <>
                <PageTitle title="All Users | Data" />
                <AllUsers />
              </>
            }
          />


          <Route
            path="/user-details/:modal/:userId"
            element={
              <>
                <PageTitle title="User Details |" />
                <UserDetails />
              </>
            }
          />
          </Route>
          
          
          

        {/* admin routes end */}
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
