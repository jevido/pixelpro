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

	// The dragStart, drag, dragend and dragexit Instance events will not be fired in this particular code and hence have been excluded from the same. 
	// All of these Instance Events are fired on the Drag Target and in this case, drag Target does not exist in the application. 
	// The Drag Operation for files is initiated from outside the application from within the native filesystem dialog. 
	// All of the Instance events used in the above code are triggered on the Drop Target which lies within the application.

	export default {
		data() {
			return {
				dragCounter: 0, // Used as reference for preventing the dragleave being fired when hovering over child elements
				hover: false,
				hoverClass: 'border-dashed border-4 border-blue-600'
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
				this.counter--;
				
				let availableColors = ['red','pink','blue', 'green', 'yellow', 'indigo', 'purple'];
				let color = availableColors[Math.floor(Math.random() * availableColors.length)]

				if (this.dragCounter === 0) {
					this.hover = false;
					this.hoverClass = 'border-dashed border-4 border-'+color+'-600'
				}
			},
			enterDropZone: function() {
				this.dragCounter++
				this.hover = true
			}
		}
	}
</script>