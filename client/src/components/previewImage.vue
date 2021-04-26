<template>
  <div class="flex flex-col items-center px-4">
    <h2 class="mt-6 mb-4 text-2xl text-center text-cda-light">
      Image
    </h2>
    <img :src="image" />
  </div>
</template>

<script>
  export default {
    name: "previewImage",
    data(){
      return {
        image: ""
      }
    },
    props:
    {
      path:
      {
        type: String,
      }
    },
    watch:
    {
      path: 'getImage'
    },
    methods:
    {
      getImage(){
        this.axios({method: 'post',url: import.meta.env.VITE_APP_SERVER +'/image',data: {filepath: this.path}})
        .then((response) => {this.image = 'data:image/*;base64,' + response.data})
      },
    }
  }
</script>

<style>
</style>
