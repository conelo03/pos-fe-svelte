import type { LayoutLoad } from "./$types.ts";

export const ssr = false;
export const load: LayoutLoad = async ({ url }: any) => {
  console.log("Running in browser only, no SSR", url.pathname);
  return {};
};
