<template>
  <div class="hello">
    <h1>{{ slogan }}</h1>
    <img src="../assets/logo.png" alt=""/>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    slogan: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
