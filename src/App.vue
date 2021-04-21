<template>
  <main class="flex bg-gray-100">
    <SideBar class="min-h-screen" />
    <router-view class="flex-grow" 
			@dragover.prevent="enterDropZone"
			@dragleave.prevent="leaveDropZone"
			@drop="onDrop"
			:class="hover ? hoverClass : ''"
		/>
  </main>
</template>

<script setup>
  import SideBar from '@/components/SideBar.vue'
</script>
<script>
	const { ipcRenderer } = require('electron');

	export default {
		data() {
			return {
				hover: false,
				hoverClass: 'border-dashed border-4'
			};
		},
		methods: {
			onDrop: function(ev) {
				this.hover = false;
				for (let file of ev.dataTransfer.files) {
					ipcRenderer.send('upload', file.path)
				}
			},
			leaveDropZone: function() {
				this.hover = false;
				let availableColors = ['red','pink','blue', 'green', 'yellow', 'indigo', 'purple'];
				let color = availableColors[Math.floor(Math.random() * availableColors.length)]
				this.hoverClass = 'border-dashed border-4 border-'+color+'-600'
			},
			enterDropZone: function() {
				this.hover = true
			}
		}
	}
</script>
