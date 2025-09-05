<script lang="ts">
  import { createQuery } from '@tanstack/svelte-query'

  let { 
    columns, 
    key = 'queries',
    queryFn, 
    filter = {}, 
    showIndex = false, 
    refreshHash = 0 
  } = $props()

  let params = $state({
    page: 1,
    limit: 10,
    ...filter
  })

  const queries = createQuery<any>({
    queryKey: [key, params],
    queryFn: () => queryFn(params),
  })

  $effect(() => {
    $queries.refetch()

    refreshHash
    filter
  })
</script>

{#if $queries.status === 'pending'}
  <p>Loading...</p>
{:else if $queries.status === 'error'}
  <p class="text-red-500">Error: {$queries.error.message}</p>
{:else}
  <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
    <table class="table table-zebra">
      <thead>
        <tr>
          {#if showIndex}
            <th>#</th>
          {/if}
          {#each columns as col}
            <th class={col.title === 'Actions' ? 'text-center' : ''}>
              {col.title}
            </th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each $queries.data.data.result as row, i}
          <tr>
            {#if showIndex}
              <td>
                {(params.page - 1) * params.limit + (i + 1)}
              </td>
            {/if}
            {#each columns as col}
              <td width={col?.cell && typeof col?.cell(row) === 'object' && col?.cell(row).component && '200px'}>
                {#if col.cell}
                  {#if typeof col.cell(row) === 'object' && col.cell(row).component}
                      <!-- <ActionColumn {...col.cell(row).props} /> -->
                    <!-- svelte-ignore svelte_component_deprecated -->
                    <svelte:component
                      this={col.cell(row).component}
                      {...col.cell(row).props} />
                  {:else}
                    {col.cell(row)}
                  {/if}
                {:else if col.accessorKey}
                  {row[col.accessorKey]}
                {/if}
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <!-- <div class="flex gap-2 mt-2">
    <div class="join">
      <button
        class="join-item btn"
        onclick={() => (params.page = Math.max(1, params.page - 1), $queries.refetch())} 
        disabled={params.page === 1}
      >«</button>
      <button class="join-item btn">
        Page {params.page} of {Math.ceil($queries.data?.data?.count / params.limit)}
      </button>
      <button
        class="join-item btn"
        onclick={() => (params.page = params.page + 1, $queries.refetch())}
        disabled={params.page * params.limit >= ($queries.data?.data?.count ?? 0)}
      >»</button>
    </div>
  </div> -->

  <div class="flex justify-end gap-2 mt-2">
    <div class="join">
      <button
        class="join-item btn"
        disabled={params.page === 1}
        onclick={() => {
          params.page = Math.max(1, params.page - 1)
          $queries.refetch()
        }}
      >
        «
      </button>
      {#each Array(Math.max(1, Math.ceil(($queries.data?.data?.count ?? 0) / params.limit))) as _, i}
        {#if i + 1 === params.page}
          <button class="join-item btn btn-active">{i + 1}</button>
        {:else if i + 1 === 1 || i + 1 === (Math.max(1, Math.ceil(($queries.data?.data?.count ?? 0) / params.limit))) || Math.abs(i + 1 - params.page) <= 1}
          <button
            class="join-item btn"
            onclick={() => {
              params.page = i + 1
              $queries.refetch()
            }}
          >
            {i + 1}
          </button>
        {:else if i + 1 === params.page - 2 || i + 1 === params.page + 2}
          <button class="join-item btn btn-disabled">...</button>
        {/if}
      {/each}

      <button
        class="join-item btn"
        disabled={params.page === (Math.max(1, Math.ceil(($queries.data?.data?.count ?? 0) / params.limit)))}
        onclick={() => {
          params.page = Math.min((Math.max(1, Math.ceil(($queries.data?.data?.count ?? 0) / params.limit))), params.page + 1)
          $queries.refetch()
        }}
      >
        »
      </button>
    </div>
  </div>
{/if}
