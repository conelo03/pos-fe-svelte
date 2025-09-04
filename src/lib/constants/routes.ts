export const protectedRoutes = ["/dashboard", "/product"];

export const roleBasedRoutes: Record<string, string[]> = {
  user: ["/dashboard", "/products"],
  admin: ["/dashboard", "/products", "/products/add", "/products/edit"],
};

export const authRoutes = ["/login", "/register"];
