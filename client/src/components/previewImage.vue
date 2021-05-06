<template>
  <div class="flex flex-col items-center px-4 pt-4">
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
      }
    }
  }
</script>

<style>
</style>
