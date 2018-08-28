<script>
	import Spiner from './Spinner.vue'
	import ModalError from './ModalError.vue'


	export default {
		name: 'login',
		components:{
			Spiner,
			ModalError
		},
		data(){
			return {
				spiner: false,
				userInfo: {
					user: '',
					password: ''
				},
				errorMessage: '',
				error: false

			}
		},
		computed:{
			logged(){
				return this.$store.getters.logged
			},
			url(){
				return window.url
			}
		},
		created(){
			localStorage.removeItem('tokenCS')
			localStorage.removeItem('userId')
			localStorage.removeItem('rol')
			this.$store.dispatch('setLogged', false)
		},
		methods: {
			forgotPassword(){
				this.$router.push('/recuperar-contrasena')
			},
			register(){
				this.$router.push('/registro')
			},
			login(){
				let self = this

				if(this.userInfo.user == '' || this.userInfo.password == ''){
					this.error = true
					this.errorMessage = 'Debes ingresar las credenciales.'
					setTimeout(function(){
						self.error = false
					}, 2000)

					return false
				}
				
				if(this.userInfo.user != '' || this.userInfo.password != ''){

					this.spiner = true

					setTimeout(function(){
						axios.post(apiUrl + '/authenticate',  self.userInfo)
							.then(res => {
								self.spiner = false
								if(res.status == 200){

									axios.defaults.headers.common['Authorization'] = "Bearer " + res.data.token;

									window.token = res.data.token
									localStorage.tokenCS = res.data.token
									localStorage.rol = res.data.rol
									localStorage.user = res.data.user_id ? JSON.stringify(res.data.user_id) : ''
									self.$router.replace('/cotizaciones')
									self.$store.dispatch('setLogged', true)
									self.$store.dispatch('setUser', res.data.user_id ? res.data.user_id : null)

									// window.location.reload()
								}
							})
							.catch(err => {
								self.spiner = false
								self.error = true

								if(err && err.response && err.response.data && err.response.data.code == 422){
									self.errorMessage = 'Las credenciales son necesarias para ingresar.'
								}

								if(err && err.response && err.response.data && err.response.data.status == 401){
									self.errorMessage = 'Las credenciales son incorrectas.'
								}


								setTimeout(function(){
									self.error = false
								}, 3000)
							})
					},500)
					
				}
				


			}
		}
	}
</script>

<template class="padding0">
	<section class="back-pattern height100vh padding0" style="padding-top: 0px !important;">

	<ModalError v-if="error" :msg="errorMessage"></ModalError>
	<Spiner v-if="spiner"></Spiner>
		<article class="font1-3em flex flex-center relative flex-middle height100vh">
			<transition appear name="custom-classes-transition" appear-active-class="animated flipInY" enter-active-class="animated flipInY" leave-active-class="">
				<article class="relative login" style="top:-20px;">
					<div class="margin-bottom10">
						<figure class="center-block" style="width: 140px;">
							<img class="width100" src="./dist/img/logo-tenerife.png" alt="Logo tenerife">
						</figure>
					</div>
					<div id="login-form" class="flex flex-column flex-middle flex-center">
						<div class="flex width100 margin-bottom10">
							<h3 class="color-white font-normal font1em">Usuario</h3>
						</div>
						<div class="relative center-block margin-bottom15">
							<span>
								<span class="ion-person color-darkgray font1-3em margin10" style="position:absolute; left:0px; top:1`px;"></span>
							</span>
							<input placeholder="Usuario" type="text"
							class=" my-input back-white margin-bottom25 color-black"
							  v-model="userInfo.user" style="width: 300px; padding-left:30px;">
						</div>
						<div class="flex width100 margin-bottom10">
							<h3 class="color-white font-normal font1em">Contraseña</h3>
						</div>
						<div class="relative center-block margin-bottom30">
							<span>
								<span class="ion-locked color-darkgray font1em" style="position:absolute; left:10px; top:15px;"></span>
							</span>
							<input placeholder="Contraseña" type="password"
							class=" my-input back-white  color-black"
							 v-model="userInfo.password" style="width: 300px; padding-left:27px;">
						</div>
						<button class="my-btn pointer back-yellow text-uppercase color-black font-bold"
						 style="width:200px;" @click="login">
							Ingresar
						</button>

					</div>
					
				</article>
			</transition>
		</article>
	</section>
</template>


<style>
	  .loader-wrap{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0,0,0,.8);
  z-index: 100000000000;
}
.loader {
  color: #ff9000;
  position: relative;
  font-size: 20px;
  margin: 100px auto;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  position: relative;
  text-indent: -9999em;
  -webkit-animation: load4 1.3s infinite linear;
  animation: load4 1.3s infinite linear;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}
@-webkit-keyframes load4 {
  0%,
  100% {
    box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;
  }
  12.5% {
    box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }
  25% {
    box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }
  37.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  50% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  62.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
  }
  75% {
    box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
  }
  87.5% {
    box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
  }
}
@keyframes load4 {
  0%,
  100% {
    box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;
  }
  12.5% {
    box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }
  25% {
    box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }
  37.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  50% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  62.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
  }
  75% {
    box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
  }
  87.5% {
    box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
  }


}
</style>