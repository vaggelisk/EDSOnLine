<template>
  <v-app>
    <Topbar
        v-bind:userName="'admin'"
        v-bind:companyName="'Enterprise Shipping & Trading S.A.​'"/>        

    <v-content fluid style="background-color:rgb(244,244,244);height:100vh;">     
      <Titlebar/>  
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Topbar from './controls/Topbar'
import Titlebar from './controls/Titlebar'

import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.compact.css';

export default {
  name: 'App',
  components: {
    Topbar,
    Titlebar
  },
  data () {
    return {
      //
    }
  }, 
  created()
  {
  }
}
</script>

<style scoped>

</style>

