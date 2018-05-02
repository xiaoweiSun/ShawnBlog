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
		text-decoration: none;
	}
  pre {
    margin: 1em 0;
    font-size: 12px;
    background-color: #eee;
    border: 1px solid #ddd;
    padding: 5px;
    line-height: 1.5em;
    color: #444;
    overflow: auto;
    -webkit-box-shadow: rgba(0,0,0,0.07) 0 1px 2px inset;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
  }

</style>