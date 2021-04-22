<template>
  <main class="justify-center items-center">
    <pre>{{userData}}</pre>
  </main>
</template>

<script>
  import { store } from '@/store.js'

  let userData = store.get('userdata');

  if (userData == null || userData == {}) {
    window.location = '/login'
  }

  export default {
    data: () => {
      return {
        userData: userData,
      }
    }
  }
</script>