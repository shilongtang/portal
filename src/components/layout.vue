<template>
  <div style="position: relative;min-height: 100%;">
    <topbar></topbar>
    <sidebar></sidebar>
    <container></container>
    <footbar></footbar>
  </div>
</template>

<script>
  import topbar from './topbar'
  import sidebar from './sidebar'
  import footbar from './footbar'
  import container from './container'

  export default {
    name: 'layout',
    components: {topbar, sidebar, footbar,container}
  }
</script>

