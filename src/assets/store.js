import { defineStore } from 'pinia';
export const listPhotos = defineStore("listPhotos", {
  state: () => ({
    photos: [],
    length:10,
    sortObj:{
    sortBy:"id",
    sortOrder:"asc"
    },
    albumIds:[],
    realLength:31
  }),
  actions: {
    async getPhotos() {
      let queryString = "";
        let that = this;
        this.albumIds.forEach(function(id,index,ids){
          if(!ids[index])
              return;
          if(!queryString)
              queryString+="?albumId="+id;
          else
              queryString +="&albumId="+id;
      });
      
      if(this.length<this.realLength){
      await fetch("https://jsonplaceholder.typicode.com/photos"+queryString).then(
          function(response){
              return response.json()
        }).then(function(data){
          that.realLength = data.length < 31 ? 31 : data.length;
          if(that.length>that.realLength)
            that.length = that.realLength;
          else
            that.length += 20;
          that.photos = data.slice(0,that.length);
      });
    }
    },
  },
 /* getters: {
    getPhotos(state) {
      return this.photos;
    },
  },*/
});
