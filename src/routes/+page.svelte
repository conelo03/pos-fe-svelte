<script lang="ts">
  import { goto } from "$app/navigation";
  import { token } from "$lib/stores/auth.js";
  import { onMount } from "svelte";

  onMount(() => {
    if ($token) {
      goto("/dashboard");
    } else {
      goto("/login");
    }
  });
</script>

<div class="min-h-screen bg-base-200 flex items-center justify-center">
	<span class="loading loading-spinner loading-lg text-primary"></span>
</div>

