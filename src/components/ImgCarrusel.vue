<script>
  import Spinner from './Spinner.vue'



  export default {
    name: 'carrousel',
    data() {
      return {
        spin: false,
        swiperOption: {
        },
        showfilters: false,
        slides: [
          {
            img_url: 'https://www.amei.mx/wp-content/uploads/2016/08/Scotiabank-logo.jpg',
            name: ''
          },
          {
            img_url: 'https://i.pinimg.com/736x/a2/49/f3/a249f3137789ca1074e9dfbea7def112--chloe-perfume-brand-identity.jpg',
            name: ''
          },
          {
            img_url: 'https://cdn.shopify.com/s/files/1/0259/7733/products/chloe_love_story_sensuelle_1024x1024.jpg?v=1493696787',
            name: ''
          }
          ,
          {
            img_url: 'https://opticlasa.com/attachments/Product/2071512/main/CHLOE-CE142S-816-01_thumb-list.jpg',
            name: ''
          }
          ,
          {
            img_url: 'https://i0.wp.com/wearandwhere.co.uk/wp-content/uploads/2017/09/Range_Lifestyle_Image2_2048x-4.jpg',
            name: ''
          }
        ]
      }
    },
    components:{
      Spinner,
    },
    computed: {
      
      slidesAct(){
        return this.slides
      }
    },
    watch:{
      
    },
    methods:{
      
      
    },
    created(){
      let self = this
      

      axios.get('http://201.163.87.236/ipad/')
            .then(res =>{
              console.log(res)
            })
            .catch(err =>{
              console.log(err)
            })

    },
    mounted() {
      
     
    }
  }
</script>

<style type="text/css">
  .carousel-3d-container figure {
    margin: 0;
  }
  .carousel-3d-container figcaption {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    bottom: 0;
    position: absolute;
    bottom: 0;
    padding: 15px;
    font-size: 12px;
    min-width: 100%;
    box-sizing: border-box;
  }

.carousel-3d-slide{
  overflow:inherit !important;
  border:0;
  box-shadow:0 0 20px #000;

}

.carousel-3d-container{
  overflow:inherit !important;
}
  .carousel-3d-container figcaption {
      background-color: rgba(0, 0, 0, 0);
      color: black;
      bottom: 0;
      position: relative;
      bottom: 0px;
      padding: 15px;
      font-size: 12px;
      min-width: 100%;
      box-sizing: border-box;
    }

    /*4772133032097914*/
    /*.grid-five{
      display:grid;
      grid-template-columns:20% 15% 30% 15% 20%;
    }*/
</style>

<!-- The ref attr used to find the swiper instance -->
<template >
<section class="back-white height100vh hola" style="overflow:hidden;">
   <!-- <Filters></Filters> -->
   <article class=" back-white padding20">
     
   </article>


    <Spinner v-if="spin"></Spinner>
   <!--  <ModalError v-if="error" :msg="errorMsg" :productNot="selectType" alert="true"></ModalError> -->
    <section class="padding20 back-white relative" style="top:40px;">
          <carousel-3d :controls-visible="true" autoplay="true" width="600" height="350"  :controls-prev-html="'&#10092;'" :controls-next-html="'&#10093;'" 
                       :controls-width="30" :controls-height="60" :clickable="false" >
            <slide v-for="(slide, i) in slides" :index="i">
              <figure class="width100 height100 poiter">
                <img :src="slide.img_url" class="width100 height100">
              </figure>
            </slide>
           
          </carousel-3d>


    </section>
</section>
 
</template>
