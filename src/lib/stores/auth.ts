import { writable } from "svelte/store";
import { browser } from "$app/environment";

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  role: string;
}

// bikin store kosong dulu
export const token = writable<string | null>(null);
export const user = writable<User | null>(null);

// hanya jalan di browser
if (browser) {
  // ambil dari localStorage waktu pertama kali load
  const storedToken = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  if (storedToken) token.set(storedToken);
  if (storedUser) user.set(JSON.parse(storedUser));

  // simpan token ke localStorage
  token.subscribe((val) => {
    if (val) localStorage.setItem("token", val);
    else localStorage.removeItem("token");
  });

  // simpan user ke localStorage
  user.subscribe((val) => {
    if (val) localStorage.setItem("user", JSON.stringify(val));
    else localStorage.removeItem("user");
  });
}
