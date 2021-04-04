<template>
  <div class="overflow-hidden rounded-lg shadow-lg justify-items-center">
    <div class="px-6 py-8 md:px-8 w-3/4 m-auto">
      <h2 class="text-2xl font-semibold text-center text-gray-700">PixelPro</h2>
      <p class="text-xl text-center text-gray-600">Welcome back!</p>

      <div class="flex items-center justify-between mt-4">
        <span class="w-1/5 border-b lg:w-1/4"></span>
        <span href="#" class="text-xs text-center text-gray-500 uppercase">Login with email or username</span>
        <span class="w-1/5 border-b lg:w-1/4"></span>
      </div>

      <div class="mt-4">
        <label class="block mb-2 text-sm font-medium text-gray-600" for="loginEmailAddress">Email Address / Username</label>
        <input v-model="form.emailOrUsername" id="loginEmailAddress" class="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring" type="email">
      </div>

      <div class="mt-4">
        <div class="flex justify-between">
          <label class="block mb-2 text-sm font-medium text-gray-600" for="loginPassword">Password</label>
          <a href="#" class="text-xs text-gray-500 hover:underline" tabindex="-1">Forgot Password?</a>
        </div>

        <input v-model="form.password" id="loginPassword" class="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring" type="password">
      </div>

      <div class="mt-8">
        <button
          class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
          @click="login(form)">
          Login
        </button>
      </div>
        
      <div class="flex items-center justify-between mt-4">
        <span class="w-1/5 border-b md:w-1/4"></span>
        <a href="#" class="text-xs text-gray-500 uppercase hover:underline">or sign up</a>
        <span class="w-1/5 border-b md:w-1/4"></span>
      </div>
    </div>
  </div>
</template>

<script>
  import { store } from '@/store.js';
  export default {
    data() {
      return {
        form: {
          emailOrUsername: '',
          password: ''
        },
        userdata: {}
      }
    },
    methods: {
      async login(formdata) {
        if (formdata.emailOrUsername == '' || formdata.password == '') {
         return;
        }

        let formData = new FormData();
        formData.append('username', formdata.emailOrUsername);
        formData.append('password', formdata.password);

        let loginData = await fetch('https://pixeldrain.com/api/user/login', {
          method: 'POST',
          body: formData,
        });

        if (loginData.ok) {
          

          await fetch('https://pixeldrain.com/api/user')
            .then(response => response.json())
            .then(data => {
              store.set('userdata', data)
              window.location.refresh();
            });
        }
      }
    }
  }
</script>