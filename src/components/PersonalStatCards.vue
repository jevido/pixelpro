<template>
  <div class="h-auto mb-6">
    <div class="px-6 py-6 md:grid md:grid-cols-4 gap-4 space-y-2 sm:space-y-4 md:space-y-2 lg:space-y-0">
      <div class="h-auto w-auto px-2 py-2 bg-white rounded transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100 hover:shadow-lg shadow border-b-8 border-pink-500 text-center">
        <button class="rounded-full bg-pink-200 p-2 focus:outline-none items-center justify-center">
          <svg viewBox="0 0 16 16" class="fill-current text-pink-400 w-8 h-8">
            <path d="M4.5 11a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zM3 10.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
            <path d="M16 11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V9.51c0-.418.105-.83.305-1.197l2.472-4.531A1.5 1.5 0 0 1 4.094 3h7.812a1.5 1.5 0 0 1 1.317.782l2.472 4.53c.2.368.305.78.305 1.198V11zM3.655 4.26 1.592 8.043C1.724 8.014 1.86 8 2 8h12c.14 0 .276.014.408.042L12.345 4.26a.5.5 0 0 0-.439-.26H4.094a.5.5 0 0 0-.44.26zM1 10v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1z"/>
          </svg>
        </button>
        <p class="text-3xl font-bold text-gray-600">{{ bandwidth }}</p>
        <p class="text-lg font-medium text-gray-600">Bandwidth</p>
      </div>
      <div class="h-auto w-auto px-2 py-2 bg-white rounded transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100 hover:shadow-lg shadow border-b-8 border-green-500 text-center">
          <button class="rounded-full bg-green-200 p-2 focus:outline-none items-center justify-center">
              <svg viewBox="0 0 20 20" class="users fill-current text-green-600 w-8 h-8"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path></svg>
          </button>
          <p class="text-3xl font-bold text-gray-600">{{ uploads }}</p>
          <p class="text-lg font-medium text-gray-600">File Uploads</p>
      </div>
      <div class="h-auto w-auto px-2 py-2 bg-white rounded transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100 hover:shadow-lg shadow border-b-8 border-yellow-500 text-center">
          <button class="rounded-full bg-yellow-200 p-2 focus:outline-none items-center justify-center">
              <svg viewBox="0 0 20 20" class="download fill-current text-yellow-600 w-8 h-8"><path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </button>
          <p class="text-3xl font-bold text-gray-600">{{ downloads }}</p>
          <p class="text-lg font-medium text-gray-600">Downloads</p>
      </div>
      <div class="h-auto w-auto px-2 py-2 bg-white rounded transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100 hover:shadow-lg shadow border-b-8 border-purple-500 text-center">
          <button class="rounded-full bg-purple-200 p-2 focus:outline-none items-center justify-center">
              <svg viewBox="0 0 17 17" class="exclamation fill-current text-purple-600 w-8 h-8">
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
              </svg>
          </button>
          <p class="text-3xl font-bold text-gray-600">{{ views }}</p>
          <p class="text-lg font-medium text-gray-600">Total Views</p>
      </div>
    </div>
  </div>
</template>

<script>
  function formatThousands(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  function formatDataVolume(amt, precision) {
    if (precision < 3) { precision = 3; }
    if (amt >= 1e18) {
      return (amt / 1e18).toPrecision(precision) + " EB";
    } else if (amt >= 1e15) {
      return (amt / 1e15).toPrecision(precision) + " PB";
    } else if (amt >= 1e12) {
      return (amt / 1e12).toPrecision(precision) + " TB";
    } else if (amt >= 1e9) {
      return (amt / 1e9).toPrecision(precision) + " GB";
    } else if (amt >= 1e6) {
      return (amt / 1e6).toPrecision(precision) + " MB";
    } else if (amt >= 1e3) {
      return (amt / 1e3).toPrecision(precision) + " kB";
    }
    return Math.floor(amt) + " B"
  }

  
  async function load(type) {
    let until = new Date();
    let today = new Date(); 
    until.setMonth(until.getMonth() - 12);

    const url = "https://pixeldrain.com/api/user/time_series/"+ type +
      "?start="+until.toISOString() +
      "&end="+today.toISOString() +
      "&interval=1440";

    const views = await fetch(url)
      .then(response => response.json())
      .then(data => {
        let total = 0
		    data.amounts.forEach(e => { total += e; });

        if (type == "views") {
          return formatThousands(total);
        } else if (type == "downloads") {
          return formatThousands(total);
        } else if (type == "bandwidth") {
          return formatDataVolume(total, 3);
        }
      });
    
    return views;
  }

  export default {
    data() {
      return {
        uploads: 0,
        downloads: 0,
        bandwidth: 0,
        views: 0
      }
    },
    mounted: async function() {
      this.downloads  = await load('downloads');
      this.bandwidth  = await load('bandwidth');
      this.views      = await load('views');
      let uploads     = await fetch('https://pixeldrain.com/api/user/files').then(response => response.json())
      this.uploads    = uploads.files.length;
    },
  }
</script>
