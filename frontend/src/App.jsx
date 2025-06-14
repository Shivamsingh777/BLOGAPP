import React, { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Blogs from './pages/Blogs'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import YourBlog from './pages/YourBlog'
import Comments from './pages/Comments'
import CreateBlog from './pages/CreateBlog'
import UpdateBlog from './pages/UpdatedBlog'
import BlogView from './pages/BlogView'
import Footer from './components/Footer'
import SearchList from './pages/SearchList'
function App() {
const router = createBrowserRouter([
  {
    path:"/",
    element:<><Navbar/><Home/><Footer/></>
  },
  {
    path:"/blogs",
    element:<><Navbar/><Blogs/><Footer/></>
  },
  {
    path:"/about",
    element:<><Navbar/><About/><Footer/></>
  },
  {
    path:"/search",
    element:<><Navbar/><SearchList/><Footer/></>
  },
  {
    path:"/signup",
    element:<><Navbar/><Signup/></>
  },
  {
    path:"/blogs/:blogId",
    element:<><Navbar/><BlogView/></>
  },
  {
    path:"/login",
    element:<><Navbar/><Login/></>
  },
  {
    path:"/dashboard",
    element:<><Navbar/><Dashboard/></>,
    children:[
      {
        path:'profile',
        element:<Profile />
      },
       {
        path:'your-blog',
        element:<YourBlog />
      },
       {
        path:'comments',
        element:<Comments />
      },
       {
        path:'write-blog',
        element:<CreateBlog />
      },
      {
        path:"write-blog",
        element:<CreateBlog/>
      },
      {
        path:"write-blog/:blogId",
        element:<UpdateBlog/>
      }
    ]
  }
])
  return (
    <>
   <RouterProvider router={router}/>

    </>
  )
}

export default App