export const protectedRoutes = ["/dashboard", "/users", "/product"];

export const roleBasedRoutes: Record<string, string[]> = {
  customer: ["/dashboard", "/products"],
  admin: [
    "/dashboard",
    "/users",
    "/products",
    "/products/add",
    "/products/edit",
  ],
};

export const authRoutes = ["/login", "/register"];
