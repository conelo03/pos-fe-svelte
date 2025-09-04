<script lang="ts">
  import { onMount } from 'svelte';
  import '../app.css'
  import { token, user } from '$lib/stores/auth.js';
  import { goto } from '$app/navigation';
  import { protectedRoutes, roleBasedRoutes, authRoutes } from '$lib/constants/routes.js';

  let { children } = $props()

  onMount(() => {
    const path = window.location.pathname;
    const currentToken = $token;
    const currentUser = $user;

    if (authRoutes.includes(path) && currentToken) {
      goto('/dashboard');
      return;
    }

    if (protectedRoutes.some(r => path.startsWith(r))) {
      if (!currentToken) {
        goto('/login');
        return;
      }

      if (currentUser) {
        const allowed = roleBasedRoutes[currentUser.role] || [];
        const isAllowed = allowed.some(r => path.startsWith(r));

        if (!isAllowed) {
          goto('/');
        }
      }
    }
  });
</script>

{@render children()}

