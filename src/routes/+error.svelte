<script>
  export let error;
  export let status;
</script>

<svelte:head>
  <title>{status} - Not Found</title>
</svelte:head>

<div class="flex flex-col items-center justify-center min-h-screen text-center">
  <h1 class="text-6xl font-bold text-red-600">{status}</h1>
  <h2 class="text-2xl font-semibold mt-4">
    {status === 404 ? "Page Not Found" : "Something went wrong"}
  </h2>
  <p class="mt-2 text-gray-600">
    {error?.message || "Sorry, we couldn't find what you were looking for."}
  </p>

  <a
    href="/"
    class="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
  >
    ⬅ Back to Home
  </a>
</div>
