import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const privateRoutePrefixes = [
  "/admin",
  "/teacher",
  "/student",
];

const noIndexRoutes = [
  "/login",
  "/forgot-password",
  "/verify-otp",
  "/reset-password",
];

function RouteSeo() {
  const { pathname } = useLocation();

  useEffect(() => {
    let robotsMeta = document.querySelector(
      'meta[name="robots"]'
    );

    if (!robotsMeta) {
      robotsMeta = document.createElement("meta");
      robotsMeta.setAttribute("name", "robots");
      document.head.appendChild(robotsMeta);
    }

    const isPrivateRoute = privateRoutePrefixes.some(
      (prefix) =>
        pathname === prefix ||
        pathname.startsWith(`${prefix}/`)
    );

    const shouldNoIndex =
      isPrivateRoute || noIndexRoutes.includes(pathname);

    if (shouldNoIndex) {
      robotsMeta.setAttribute(
        "content",
        "noindex, nofollow, noarchive"
      );
    } else {
      robotsMeta.setAttribute(
        "content",
        "index, follow, max-image-preview:large"
      );
    }
  }, [pathname]);

  return null;
}

export default RouteSeo;