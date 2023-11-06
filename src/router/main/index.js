import routeCompany from "./company";
import routeAdmin from "./admin";
import routeError from "./error";

const mainRoutes = [
  routeCompany,
  // routeAdmin,
  ...routeError,
]

export default mainRoutes
