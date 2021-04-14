<template>
<div class="border-dashed border-2 w-full h-32 rounded"
	@mouseover="hover = true"
	@mouseleave="leaveDropZone"
	:class="hover ? colorClass : 'border-gray-300'"
>
  <div class="m-2 block text-grey p-10 text-center">Drop your files here</div>
</div>
</template>

<script>
export default {
  data() {
    return {
      hover: false,
			colorClass: 'border-pink-300'
    };
  },
	methods: {
		leaveDropZone: function() {
			this.hover = false;
			let availableColors = ['red','pink','blue', 'green', 'yellow', 'indigo', 'purple'];
			let color = availableColors[Math.floor(Math.random() * availableColors.length)]
			this.colorClass = 'border-'+color+'-300'
		}
	}
}
</script>