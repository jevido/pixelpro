<template>
<div class="border-dashed border-2 w-full h-32 rounded"
	@dragover.prevent="enterDropZone"
	@dragleave.prevent="leaveDropZone"
  @drop="onDrop"
	:class="hover ? colorClass : 'border-gray-300'"
>
  <div class="m-2 block text-grey p-10 text-center">Drop your files here</div>
</div>
</template>

<script>
const { ipcRenderer } = require('electron');

export default {
  data() {
    return {
      hover: false,
			colorClass: 'border-pink-300'
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
			this.colorClass = 'border-'+color+'-600'
		},
    enterDropZone: function() {
      this.hover = true
    }
	}
}
</script>