 <template>
  <div id="app">

	  <HeaderComponent ></HeaderComponent>

    <router-view style="padding-top:60px;" :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue'

export default {
  name: 'app',
  components: {
    HeaderComponent
  },
  computed:{
    logged(){
      return this.$store.getters.logged
    }
  }
}
</script>
