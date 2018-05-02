<template>
	<div id="app">
		<router-view name="navigation"></router-view>
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'app'
	}
</script>

<style>
	body {
		box-sizing: border-box;
		margin: 0;
	}
	a {
		color: #545455;
		cursor: pointer;
		text-decoration: unset;
	}

</style>