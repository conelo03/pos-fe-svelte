<script lang="ts">
  export let row: any;
  export let onView: (row: any) => void;
  export let onEdit: (row: any) => void;
  export let onDelete: (row: any) => void;
</script>

{#if onView} 
  <button class="text-green-500 mr-2" on:click={() => onView(row)}>View</button> 
{/if}
{#if onEdit} 
  <button class="text-blue-500 mr-2" on:click={() => onEdit(row)}>Edit</button> 
{/if}
{#if onDelete} 
  <button class="text-red-500 mr-2" on:click={() => onDelete(row)}>Delete</button> 
{/if}
