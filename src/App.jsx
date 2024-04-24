import { ToastBar } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import LocationList from "./commponents/Body/LocationList";
import Header from "./commponents/header/Header";
import AppLayout from "./commponents/AppLayput/AppLayout";
import Hotels from "./commponents/Hotels";
import HotelProvider from "./commponents/Context/HotelProvider";
import SingleHotel from "./commponents/SingleHotel";
import Bookmark from "./commponents/Bookmark/Bookmark";
import BookmarksProvider from "./commponents/Context/BookmarkProvider";
import BookmarksList from "./commponents/Bookmark/BookmarksList";
import SingleBookmark from "./commponents/Bookmark/SingleBookmark";
import AddNewBookmark from "./commponents/Bookmark/AddNewBookmark";
import Login from "./commponents/UserLoginLOgout/Login";
import AuthCOntextProvider from "./commponents/Context/AuthContextProvider";
import ProtectedRout from "./proectedRout/ProtectedRout";

function App() {
  return (
    <div>
      <AuthCOntextProvider>
        <BookmarksProvider>
          <HotelProvider>
            <Header />
            <Routes>
              <Route path="/" element={<LocationList />} />
              <Route path="/hotels" element={<AppLayout />}>
                <Route index element={<Hotels />} />
                <Route path=":id" element={<SingleHotel />} />
              </Route>
              <Route path="/Login" element={<Login />} />
              <Route path="/bookmark" element={<ProtectedRout><Bookmark /></ProtectedRout>}>
                <Route index element={<BookmarksList />} />
                <Route path=":id" element={<SingleBookmark />} />
                <Route path="/bookmark/add" element={<AddNewBookmark />} />
              </Route>
            </Routes>
          </HotelProvider>
        </BookmarksProvider>
      </AuthCOntextProvider>
    </div>
  );
}

export default App;
