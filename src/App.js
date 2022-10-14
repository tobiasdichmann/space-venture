import "./components/styles/app.scss";
import { Route, Routes } from "react-router-dom";

// LAYOUT
import Layout from "./components/layout/Layout";
import AdminLayout from "./components/layout/admin/AdminLayout";

// PAGES
import Home from "./components/pages/Home";
import Spaceship from "./components/pages/Spaceship";
import Tours from "./components/pages/Tours";
import Tour from "./components/pages/Tour";
import Search from "./components/pages/Search";
import Gallery from "./components/pages/Gallery";
import Safety from "./components/pages/Safety";
import Contact from "./components/pages/Contact";
import Login from "./components/pages/Login";
import NoMatch from "./components/pages/NoMatch";
/* ----- */
import AdminHome from "./components/pages/admin/AdminHome";
import AdminSpaceship from './components/pages/admin/AdminSpaceship';
import AdminTours from "./components/pages/admin/AdminTours";
import AdminToursCreate from "./components/pages/admin/AdminToursCreate";
import AdminToursEdit from "./components/pages/admin/AdminToursEdit";
import AdminAbout from "./components/pages/admin/AdminAbout";
import AdminTeam from "./components/pages/admin/AdminTeam";
import AdminTeamCreate from "./components/pages/admin/AdminTeamCreate";
import AdminTeamEdit from "./components/pages/admin/AdminTeamEdit";
import AdminGallery from "./components/pages/admin/AdminGallery";
import AdminGalleryCreate from "./components/pages/admin/AdminGalleryCreate";
import AdminGalleryEdit from "./components/pages/admin/AdminGalleryEdit";
import AdminContact from './components/pages/admin/AdminContact';
import AdminNewsletter from "./components/pages/admin/AdminNewsletter";

function App() {
  return (
    // REMEMBER that <BrowserRouter> and <LoginContextProvider> is placed inside index.js

    <Routes>
      {/* -------------------- PUBLIC */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="spaceship" element={<Spaceship />} />
        <Route path="tours" element={<Tours />} />
        <Route path="tours/tour/:tourID" element={<Tour />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="safety" element={<Safety />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        {/* SEARCH */}
        <Route path="search/:q" element={<Search />} />
        {/* NoMatch have to always be at the bottom */}
        <Route path="*" element={<NoMatch />} />
      </Route>

      {/* -------------------- ADMIN */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminHome />} />
        <Route path="spaceship" element={<AdminSpaceship />} />
        <Route path="tours" element={<AdminTours />} />
        <Route path="tours/createtours" element={<AdminToursCreate />} />
        <Route path="tours/edittours/:tourID" element={<AdminToursEdit />} />
        <Route path="about" element={<AdminAbout />} />
        <Route path="team" element={<AdminTeam />} />
        <Route path="team/createteammember" element={<AdminTeamCreate />} />
        <Route path="team/editteammember/:teammemberID" element={<AdminTeamEdit />} />
        <Route path="gallery" element={<AdminGallery />} />
        <Route path="gallery/creategallery" element={<AdminGalleryCreate />} />
        <Route path="gallery/editgallery/:galleryID" element={<AdminGalleryEdit />} />
        <Route path="contact" element={<AdminContact />} />
        <Route path="newslettersubscriptions" element={<AdminNewsletter />} />
        {/* NoMatch have to always be at the bottom */}
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

export default App;
