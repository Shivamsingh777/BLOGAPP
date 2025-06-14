import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { Input } from "./ui/input";
import { ChartColumnBig, LogOut, Search, User } from "lucide-react";
import { Button } from "./ui/button";
import { FaMoon, FaRegEdit, FaSun } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/themeSlice";
import { setUser } from "../redux/authSlice";
import axios from "axios";
import { LiaCommentSolid } from "react-icons/lia";
import userLogo from "../assets/user.jpg";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { toast } from "sonner";

import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import ResponsiveMenu from "./ResponsiveMenu";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const { theme } = useSelector((store) => store.theme);
  const [searchTerm, setSearchTerm] = useState("");
  const [openNav, setOpenNav] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleNav = () => {
    setOpenNav(!openNav)
  }
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
    }
  };
  const logoutHandler = async (e) => {
    try {
      const res = await axios.get("http://localhost:8080/api/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/");
        dispatch(setUser(null));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  return (
    <div className="p-5 px-7 fixed w-full dark:bg-gray-800 dark:border-b-gray-600 border-b-gray-300 border-2 bg-white z-50">
      <div className="max-w7x1 mx-auto flex justify-between items-center  px-4 md:px-0">
        <div className="flex gap-7 items-center">
          <Link to={"/"}>
            <div className="flex gap-2 items-center">
              <img src={Logo} alt="" className="w-7 h-7 md:h-10 dark:invert" />
              <h1 className="font-bold text-3xl md:text-4xl">Blog.com</h1>
            </div>
          </Link>
          <div className="relative hidden md:block">
            <Input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-700 dark:bg-gray-900 bg-gray-300 w-[300px] hidden md:block"
            />
            <Button onClick={handleSearch} className="absolute right-0 top-0">
              <Search />
            </Button>
          </div>
        </div>
        <nav className="flex md:gap-7 gap-4 items-center">
          <ul className="hidden md:flex gap-7 item-center text-xl font-semibold">
            <Link to={"/"}>
              <li>Home</li>
            </Link>
            <Link to={"/blogs"}>
              <li>Blog</li>
            </Link>
            <Link to={"/about"}>
              {" "}
              <li>About</li>
            </Link>
          </ul>
          <div className="flex">
            <Button onClick={() => dispatch(toggleTheme())}>
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </Button>
            {user ? (
              <div className="ml-7 flex gap-3 items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar>
                      <AvatarImage
                        src={user.photoUrl || userLogo}
                        className="w-7 rounded-full"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="start">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() => navigate("/dashboard/profile")}
                    >
                      <User />
                      Profile
                      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => navigate("/dashboard/your-blog")}
                    >
                      <ChartColumnBig />
                      Your Blog
                      <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => navigate("/dashboard/comments")}
                    >
                      <LiaCommentSolid />
                      Comments
                      <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => navigate("/dashboard/write-blog")}
                    >
                      <FaRegEdit />
                      Write Blog
                      <DropdownMenuShortcut>⌘W</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <LogOut />
                      Log out
                      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                {/* )
} */}

                <Button className="hidden md:block" onClick={logoutHandler}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="ml-7 md:flex gap-2">
                <Link to="login">
                  <Button>Login</Button>
                </Link>
                <Link className="hidden md:block" to="/signup">
                  <Button>Signup</Button>
                </Link>
              </div>
            )}
          </div>
          {openNav ? (
            <HiMenuAlt3 onClick={toggleNav} className="w-7 h-7 md:hidden" />
          ) : (
            <HiMenuAlt1 onClick={toggleNav} className="w-7 h-7 md:hidden" />
          )}
        </nav>
        <ResponsiveMenu openNav={openNav} logoutHandler={logoutHandler}/>
      </div>
    </div>
  );
};

export default Navbar;
