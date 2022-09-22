<template>
  <div>
    <router-view name="header-view"></router-view>
    <div class="user-view">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.user-view {
  height: 100%;
}
</style>