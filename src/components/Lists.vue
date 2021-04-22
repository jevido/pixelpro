<template>
	<section class="px-4 sm:px-6 lg:px-4 xl:px-6 pt-4 pb-4 sm:pb-6 lg:pb-4 xl:pb-6 space-y-4">
		<header class="flex items-center justify-between">
			<h2 class="text-lg leading-6 font-medium text-black">My lists</h2>
			<button class="bg-blue-200 hover:bg-blue-400 hover:text-blue-800 group flex items-center rounded-md bg-blue-100 text-blue-600 text-sm font-medium px-4 py-2">
				<svg class="group-hover:text-blue-600 text-blue-500 mr-2" width="12" height="20" fill="currentColor">
					<path fill-rule="evenodd" clip-rule="evenodd" d="M6 5a1 1 0 011 1v3h3a1 1 0 110 2H7v3a1 1 0 11-2 0v-3H2a1 1 0 110-2h3V6a1 1 0 011-1z"/>
				</svg>
				New
			</button>
		</header>
		<form class="relative">
			<svg width="20" height="20" fill="currentColor" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
				<path fill-rule="evenodd" clip-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
			</svg>
			<input class="focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-10" type="text" v-model="searchTerm" placeholder="Filter lists" />
		</form>
		<ul v-if="items.length == 0" class="grid grid-cols-1 gap-4">
			<li class="group block h-100 rounded-lg text-center p-4 border border-blue-200">
				You have no lists
			</li>
		</ul>
		<ul v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
			<li v-for="item in filterByName" :key="item.id">
				<router-link :to="'/list/'+ item.id" class="group block h-100 rounded-lg p-4 hover:bg-blue-400 hover:border-transparent hover:shadow-lg border border-blue-200">
					<dl class="grid p-4items-center">
						<div>
							<dt class="sr-only">Title</dt>
							<dd class="group-hover:text-white leading-6 font-medium text-black text-center">
								{{item.title}}
							</dd>
						</div>
					</dl>
				</router-link>
			</li>
		</ul>
	</section>
</template>

<script>
export default {
	data() {
		return {
			items: [],
			searchTerm: ""
		}
	},
	computed: {
		filterByName() {				
			return this.items.filter(item => {
				return item.title.toLowerCase().includes(this.searchTerm);
			});
		}
	},
	mounted: async function() {
		let items = await fetch('https://pixeldrain.com/api/user/lists').then(response => {
			if (response.status == 200) {
				return response.json()
			} else {
				console.debug(response);
			}
		})

		if (items?.lists.length > 0) {
			this.items = items.lists
		}
	}
}
</script>
