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
	a {
    color: #545455;
    cursor: pointer;
  }
	#app {
		width:512px;
		margin:0 auto;
	}
</style>