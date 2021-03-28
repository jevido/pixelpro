
<template>
  <div class="flex flex-col w-64 h-screen px-4 py-8 bg-white border-r dark:bg-gray-800 dark:border-gray-600">
    <h2 class="text-3xl font-semibold text-gray-800 dark:text-white">PixelPro</h2>

    <div class="relative mt-6">
      <span class="absolute inset-y-0 left-0 flex items-center pl-3">
        <svg class="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
          <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      </span>

      <input type="text" class="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" placeholder="Search uploads">
    </div>
    
    <div class="flex flex-col justify-between flex-1 mt-6">
      <nav>
        <router-link 
          v-for="item in routes" 
          active-class="text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          :key="item.path" 
          :to="item.path" 
          class="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700"
        >
          <span class="mx-4 font-medium">{{ item.navTitle }}</span>
        </router-link>

        <!-- <hr class="my-6 dark:border-gray-600" /> -->
      </nav>

      <div class="flex items-center px-4 -mx-2">
        <h4 class="mx-2 font-medium text-gray-800 dark:text-gray-200">
          <router-link to="/login">[ MY ACCOUNT ]</router-link></h4>
      </div>
    </div>
  </div>
</template>

<script>
  import { routes } from '@/routes.js'

  let navbar = routes.filter((item) => {
    return !item.meta.hidden;
  });

  export default {
    data: () => {
      return {
        routes: navbar
      }
    }
  }
</script>