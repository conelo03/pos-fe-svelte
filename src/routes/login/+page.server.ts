import { apiPost } from "$lib/api.js";
import { fail, redirect } from "@sveltejs/kit";

export const actions = {
  default: async ({ request, url }) => {
    const data = await request.formData();
    const dataObject = Object.fromEntries(data) as {
      username: string;
      password: string;
    };

    const res: any = await apiPost("/auth/login", dataObject);
    if (res.token) {
      return {
        success: true,
        token: res.token,
        user: res.user,
      };
    }
    return fail(400, {
      username: dataObject.username,
      password: dataObject.password,
      error: res.error,
    });
  },
};
