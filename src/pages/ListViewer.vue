<template>
	<ul>
		<li v-for="file in files" :key="file.id" class="w-full">
      <a href="#" @click="openUrl('https://pixeldrain.com/u/'+ file.id)" class="border-b border-l border-gray-400 bg-white rounded-b p-4 flex flex-col justify-between leading-normal hover:bg-blue-200">
        <div class="mb-1">
          <p v-if="!file.can_edit" class="text-sm text-gray-600 flex items-center">
            <svg class="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
            </svg>
            Cannot edit file
          </p>
          <div class="text-gray-900 font-bold text-xl mb-2">{{file.name}}</div>
          <p v-if="file.description" class="text-gray-700 text-base">{{file.description}}</p>
        </div>
        <div class="flex items-center">
          <img class="w-10 h-10 rounded-full mr-4" :src="'https://pixeldrain.com/api/file/'+file.id+'/thumbnail'" alt="Avatar of Writer">
          <div class="text-sm">
            <p class="text-gray-900 leading-none">Views: {{file.views}} &amp; Downloads: {{file.downloads}}</p>
            <p class="text-gray-600">Uploaded at: {{file.humanUploadedDate}} &amp; Last viewed at: {{file.humanLastViewedDate}}</p>
          </div>
        </div>
      </a>
		</li>
	</ul>

</template>

<script>
const { shell } = require('electron')

export default {
	data() {
		return {
			files: []
		}
	},
	mounted: async function() {
		let id = this.$route.params.id;
		let response = await fetch('https://pixeldrain.com/api/list/'+id).then(response => response.json())
		if (response.success) {
			for (let file of response.files) {
				let uDate = new Date(file.date_upload);
				let vDate = new Date(file.date_last_view);
				file.humanUploadedDate = `${uDate.getDate()}-${uDate.getMonth()}-${uDate.getFullYear()} ${uDate.getHours()}:${uDate.getMinutes()}`;
				file.humanLastViewedDate = `${vDate.getDate()}-${vDate.getMonth()}-${vDate.getFullYear()} ${vDate.getHours()}:${vDate.getMinutes()}`;

				// TODO: add, calculated expiry date
				
			}
			this.files = response.files;
			this.title = response.title
		} else {
			console.debug(response);
		}
	},
	methods: {
		openUrl: (url) => {
			shell.openExternal(url);
		},
	}
}
</script>