<script>
  import Filters from './Filters.vue'
  import Spinner from './Spinner.vue'
  import ModalError from './ModalError.vue'



  export default {
    name: 'carrousel',
    data() {
      return {
        spin: false,
        money:'',
        error: false,
        selectType: '',
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
      Filters,
      Spinner,
      ModalError
    },
    computed: {
      apiUrl(){
        return window.apiUrl
      },
      slidesAct(){
        return this.slides
      }
    },
    watch:{
      money(val){
        if(val.length > 3){
          // val.split()
        }
      }
    },
    methods:{
      hideFilter(){
        this.$parent.$emit('showFilter')
      },
      onLastSlide(){
      console.log('hola last')
      },
      onAfterSlideChange(){
      console.log('hola after')
      },
      onBeforeSlideChange(){
        console.log('hola before')
      },
      goBlocks(slide){

        let self = this
        localStorage.lastBlockSelected = slide.type
        // this.$router.push({name: 'product-select-detail'})

        this.spin = true
        axios.post(apiUrl + '/api/descriptions_by_type', {'type' : localStorage.getItem('lastBlockSelected')})
        .then(response=>{
          console.log(response)

          self.productsOfImg = response.data.descriptions

          if(response.data.descriptions.length  == 0){
            self.error = true
            self.selectType = localStorage.lastBlockSelected
            setTimeout(function(){
              self.error = false
              self.spin = false
            }, 4000)
            return false
          }


          axios.post(apiUrl + '/api/products_by_name',  { name: response.data.descriptions[0].name })
            .then(res =>{
              self.spin = false

              if(res.data.length == 0){
                // self.errorMsg = `No se encuentra disponible. Elige otro opción`
                 self.error = true
                 self.selectType = localStorage.lastBlockSelected
                 setTimeout(function(){
                  self.error = false
                 }, 4000)
                 return false
              }

              let data = res.data
              data.forEach(item => item.selected = false)
              data[0].selected =true
              data.forEach(item => item.searched = response.data.descriptions[0].name)

              localStorage.lastProductDetail = JSON.stringify(data)
              self.$router.push({name: 'product-detail'})

            })
            .catch(err =>{
              self.spin = false
              self.error = true
              setTimeout(function(){
                  self.error = false
                 }, 4000)

            })

        })
        .catch(err=>{
          self.spin = false
          self.error = true
          setTimeout(function(){
            self.error = false
           }, 4000)
          // console.log(err.response.data)
        })

      }
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


      // for(var i = 0; i < 50; i++){
      //   this.slides.push({
      //       name: 'Marmol Crema Marfil Blanco',
      //       count: 796,
      //       id: 0,
      //       imgUrl: './dist/img/img-1.jpg'
      //     })
      // }
      // this.spin = true
      // axios.post(apiUrl + '/api/main_page')
      //   .then(res =>{
      //     console.log(res)
          
      //     self.slides = res.data
      //     setTimeout(function(){
      //       self.spin = false
      //     }, 2000)
      //   })
      //   .catch(err =>{
      //     console.log(err.response)
      //     setTimeout(function(){
      //       self.spin = false
      //     }, 500)

      //   })




    },
    mounted() {
      
     let self = this
      this.$on('hideFilter', function(data){
        self.showfilters = false
        if(data.status){

        }
      })

      this.$on('filtered', function(data){
        self.showfilters = false
        if(data.status){
          self.slides = data.datos
        }
      })

      this.$on('showFilter', function(data){
        self.showfilters = true
        if(data.status){

        }
      })
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
