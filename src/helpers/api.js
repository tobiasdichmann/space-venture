import axios from "axios";

const axiosBase = axios.create({ baseURL: "http://localhost:4444/" });

// ------------------------- BANNER ------------------------------------
// GET http://localhost:4444/banner
export const getBanner = () => {
  let response = axiosBase.get("banner")
    .then((r) => { return r.data; })
    .catch(error => { throw new Error("Der er desværre opstået en fejl med api'et") })

  return response;
};

// ------------------------- FOOTER ------------------------------------
// GET http://localhost:4444/footer
export const getFooter = () => {
  let response = axiosBase.get("footer")
    .then((r) => { return r.data; })
    .catch(error => { throw new Error("Der er desværre opstået en fejl med api'et") })

  return response;
};

// ------------------------- ABOUT -------------------------------------
// GET http://localhost:4444/about
export const getAbout = () => {
  let response = axiosBase.get("about")
    .then((r) => { return r.data; })
    .catch(error => { throw new Error("Der er desværre opstået en fejl med api'et") })

  return response;
};
// PUT http://localhost:5099/about/admin
export const editAbout = (aboutdata) => {
  let response = axiosBase.put("about/admin", aboutdata)
    .then((r) => { return r.data; })
    .catch(error => { throw new Error("Der er desværre opstået en fejl med api'et") })

  return response;
};

// ------------------------- TEAM --------------------------------------
// GET http://localhost:4444/team
export const getTeam = () => {
  let response = axiosBase.get("team")
    .then((r) => { return r.data; })
    .catch(error => { throw new Error("Der er desværre opstået en fejl med api'et") })

  return response;
};
// GET BY ID http://localhost:4444/team/617f7f19066b123e4c7c9415
export const getTeamMemberById = (ID) => {
  let response = axiosBase.get("team/" + ID)
    .then((r) => { return r.data; })
    .catch(error => { throw new Error("Der er desværre opstået en fejl med api'et") })

  return response;
};
// POST http://localhost:4444/team/admin
export const createTeamMember = (teamdata) => {
  let response = axiosBase.post("team/admin", teamdata)
    .then((r) => { return r.data; })
    .catch(error => { throw new Error("Der er desværre opstået en fejl med api'et") })

  return response;
};
// PUT BY ID http://localhost:4444/team/admin/617af9a11eed823f30d8a32c , formdata
export const editTeamMember = (updatedTeamMember, ID) => {
  let response = axiosBase.put("team/admin/" + ID, updatedTeamMember)
    .then((r) => { return r.data; })
    .catch(error => { throw new Error("Der er desværre opstået en fejl med api'et") })

  return response;
};
// DELETE BY ID http://localhost:4444/team/admin/617af9a11eed823f30d8a32c
export const deleteTeamMember = (ID) => {
  let response = axiosBase.delete("team/admin/" + ID)
    .then((r) => { return r.data; })
    .catch(error => { throw new Error("Der er desværre opstået en fejl med api'et") })

  return response;
};

// ------------------------ NEWSLETTER SUBSCRIPTION --------------------
// GET http://localhost:4444/newssubscription/admin
export const getSubscriptions = () => {
  let response = axiosBase.get("newssubscription/admin")
    .then((r) => { return r.data; })
    .catch(error => { throw new Error("Der er desværre opstået en fejl med api'et") })

  return response;
};
// POST http://localhost:4444/newssubscription
export const subscribeNews = (subscriptiondata) => {
  let response = axiosBase.post("newssubscription", subscriptiondata)
    .then((r) => { return r.data; })
    .catch(error => { throw new Error("Der er desværre opstået en fejl med api'et") })

  return response;
};
// DELETE BY ID http://localhost:4444/newssubscription/admin/6337f3166a3e05054471e82e
export const deleteSubscriptions = (ID) => {
  let response = axiosBase.delete("newssubscription/admin/" + ID)
    .then((r) => { return r.data; })
    .catch(error => { throw new Error("Der er desværre opstået en fejl med api'et") })

  return response;
};

// ------------------------- SPACECRAFT --------------------------------
// GET http://localhost:4444/spacecraft
export const getSpacecraft = () => {
  let response = axiosBase.get("spacecraft")
    .then((r) => { return r.data; })
    .catch(error => { throw new Error("Der er desværre opstået en fejl med api'et") })

  return response;
};
// PUT http://localhost:4444/spacecraft/admin
export const editSpacecraft = (updatedSpacecraft) => {
  let response = axiosBase.put("spacecraft/admin", updatedSpacecraft)
    .then((r) => { return r.data; })
    .catch(error => { throw new Error("Der er desværre opstået en fejl med api'et") })

  return response;
};

// ----------------------------- TOURS ---------------------------------
// GET ALL http://localhost:4444/tours
export const getTours = () => {
  let response = axiosBase.get("tours")
    .then((r) => { return r.data; })
    .catch(error => { throw new Error("Der er desværre opstået en fejl med api'et") })

  return response;
};
// GET BY SEARCH http://localhost:4444/tours/soeg/xxxx
export const getToursSearch = (q) => { // q = query
  let response = axiosBase.get("tours/soeg/" + q)
    .then((r) => { return r.data; })
    .catch(error => { throw new Error("Der er desværre opstået en fejl med api'et") })

  return response;
};
// GET BY ID http://localhost:4444/tours/617af72128fc8765b05fbbc5
export const getTourById = (ID) => {
  let response = axiosBase.get("tours/" + ID)
    .then((r) => { return r.data; })
    .catch(error => { throw new Error("Der er desværre opstået en fejl med api'et") })

  return response;
};
// POST http://localhost:4444/tours/admin , formdata
export const createTour = (newTour) => {
  let response = axiosBase.post("tours/admin", newTour)
    .then((r) => { return r.data; })
    .catch(error => { throw new Error("Der er desværre opstået en fejl med api'et") })

  return response;
};
// PUT BY ID http://localhost:4444/tours/admin/617af72128fc8765b05fbbc5 , formdata
export const editTour = (updatedTour, ID) => {
  let response = axiosBase.put("tours/admin/" + ID, updatedTour)
    .then((r) => { return r.data; })
    .catch(error => { throw new Error("Der er desværre opstået en fejl med api'et") })

  return response;
};
// DELETE BY ID http://localhost:4444/tours/admin/617af72128fc8765b05fbbc5
export const deleteTour = (ID) => {
  let response = axiosBase.delete("tours/admin/" + ID)
    .then((r) => { return r.data; })
    .catch(error => { throw new Error("Der er desværre opstået en fejl med api'et") })

  return response;
};

// ------------------------- GALLERY ------------------------------------
// GET http://localhost:4444/gallery
export const getGallery = () => {
  let response = axiosBase.get("gallery")
    .then((r) => { return r.data; })
    .catch(error => { throw new Error("Der er desværre opstået en fejl med api'et") })

  return response;
};
// GET BY ID http://localhost:4444/gallery/617f7d2d066b123e4c7c9402
export const getGalleryById = (ID) => {
  let response = axiosBase.get("gallery/" + ID)
    .then((r) => { return r.data; })
    .catch(error => { throw new Error("Der er desværre opstået en fejl med api'et") })

  return response;
};
// POST http://localhost:4444/gallery/admin , formdata
export const createGallery = (newGallery) => {
  let response = axiosBase.post("gallery/admin", newGallery)
    .then((r) => { return r.data; })
    .catch(error => { throw new Error("Der er desværre opstået en fejl med api'et") })

  return response;
};
// PUT BY ID http://localhost:4444/gallery/admin , formdata
export const editGallery = (updatedGallery, ID) => {
  let response = axiosBase.put("gallery/admin/" + ID, updatedGallery)
    .then((r) => { return r.data; })
    .catch(error => { throw new Error("Der er desværre opstået en fejl med api'et") })

  return response;
};
// DELETE BY ID http://localhost:4444/gallery/admin/6179aad9016d9c6bb0cafefd
export const deleteGallery = (ID) => {
  let response = axiosBase.delete("gallery/admin/" + ID)
    .then((r) => { return r.data; })
    .catch(error => { throw new Error("Der er desværre opstået en fejl med api'et") })

  return response;
};

// ------------------------- SAFETY -------------------------------------
// GET http://localhost:4444/safety
export const getSafety = () => {
  let response = axiosBase.get("safety")
    .then((r) => { return r.data; })
    .catch(error => { throw new Error("Der er desværre opstået en fejl med api'et") })

  return response;
};

// -------------------------- CONTACT -----------------------------------
// GET http://localhost:4444/contact/admin
export const getMessage = () => {
  let response = axiosBase.get("contact/admin")
    .then((r) => { return r.data; })
    .catch(error => { throw new Error("Der er desværre opstået en fejl med api'et") })

  return response;
};
// GET BY ID http://localhost:4444/gallery/617f7d2d066b123e4c7c9402
export const getContactById = (ID) => {
  let response = axiosBase.get("gallery/" + ID)
    .then((r) => { return r.data; })
    .catch(error => { throw new Error("Der er desværre opstået en fejl med api'et") })

  return response;
};
// POST http://localhost:4444/contact
export const sendMessage = (messagedata) => {
  let response = axiosBase.post("contact", messagedata)
    .then((r) => { return r.data; })
    .catch(error => { throw new Error("Der er desværre opstået en fejl med api'et") })

  return response;
};
// DELETE BY ID http://localhost:4444/contact/admin/6337f2ec6a3e05054471e829
export const deleteMessage = (ID) => {
  let response = axiosBase.delete("contact/admin/" + ID)
    .then((r) => { return r.data; })
    .catch(error => { throw new Error("Der er desværre opstået en fejl med api'et") })

  return response;
};