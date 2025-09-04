<script lang="ts">
	import { onMount } from 'svelte';
	
	export let message = '';
	export let type = 'info';
	export let duration = 4000;
	export let onClose = () => {};
	
	let visible = false;
	
	const typeClasses: any = {
		success: 'alert-success',
		error: 'alert-error',
		warning: 'alert-warning',
		info: 'alert-info'
	};
	
	const icons: any = {
		success: 'fa-check-circle',
		error: 'fa-exclamation-triangle', 
		warning: 'fa-exclamation-circle',
		info: 'fa-info-circle'
	};
	
	onMount(() => {
		visible = true;
		const timer = setTimeout(() => {
			visible = false;
			setTimeout(onClose, 300);
		}, duration);
		
		return () => clearTimeout(timer);
	});
</script>

{#if visible}
	<div class="toast toast-top toast-end z-50">
		<div class="alert {typeClasses[type] || 'alert-info'} shadow-lg">
			<i class="fas {icons[type] || 'fa-info-circle'}"></i>
			<span>{message}</span>
		</div>
	</div>
{/if}