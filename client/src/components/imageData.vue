<template>
  <div class="px-6">
    <h2 class="mt-6 mb-4 text-2xl text-center text-cda-light">
      Data
    </h2>
    <p v-if="imagedata == ''" class="mt-6 text-2xl text-center text-cda-dark">
      Choose an image from the file-tree to see the data.
    </p>
    <div v-else class="mt-5">
      <dl class="sm:divide-y sm:divide-gray-200" v-for="item, key in imagedata.data">
        <div class="grid grid-cols-3 gap-4 py-2">
          <dt class="font-bold text-cda-dark">
            {{ key  }}
          </dt>
          <dd class="col-span-2 font-medium text-cda-light">
            {{ item }}
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script>
  export default {
    name: "imageData",
    data(){
      return {
        imagedata: ""
      }
    },
    props:
    {
      path: {
        type: String,
      }
    },
    watch:
    {
      path: 'getData'
    },
    methods:
    {
      getData(){
        this.axios({method: 'post',url: import.meta.env.VITE_APP_SERVER +'/data',data: {filepath: this.path}})
        .then((response) => {
        this.imagedata = response.data
        })
      },
    }
  }
</script>

<style>
</style>
