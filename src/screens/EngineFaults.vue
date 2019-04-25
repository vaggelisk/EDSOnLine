<template>
  <v-container fluid grid-list-md fill-height style="padding:0px 10px 5px 10px;width:100%;">
    <v-layout row>
      <v-flex d-flex md4>
          <v-card>
            <v-card-title  primary class="title" style="height:5%;">Fault list</v-card-title>
            <v-card-actions fill-height style="height:95%;">
               <div class="title"  style="display:flex;justify-content:center;align-items:center;width:100%;height:100%;color:rgb(219,219,219);">No Faults Detected</div>         
            </v-card-actions> 
          </v-card>
      </v-flex>
      <v-flex d-flex md8>
        <v-tabs v-model="active" slider-color="rgb(51,82,128)" style="height:100%;width:100%;">
          <v-tab v-for="title in tabTitles" :key="title" ripple active-class='activeTab' style="text-transform:none;color:rgb(192,192,192);">
            <span>{{title}}</span>
          </v-tab>
          <v-tab-item class="tabItem">
            <EngineFaultsData />
          </v-tab-item>
          <v-tab-item class="tabItem">
            <EngineFaultsDetails />
          </v-tab-item>
        </v-tabs>
      </v-flex>
    </v-layout> 
  </v-container>
</template>

<script>

  import EngineFaultsData     from "./EngineFaultsData"
  import EngineFaultsDetails  from "./EngineFaultsDetails"

  
  import {globalStore} from "../main.js"

export default {
  name: 'EngineFaults',
  components: {
    EngineFaultsData ,  
    EngineFaultsDetails
  },
  data () {
    return {
        active: parseInt( this.$route.query.tab ),
        tabTitles: [
          'Fault Data','Details'
        ],
    }
  },
  mounted() {
    if (globalStore.selectedVessel=='') 
      this.$router.push( { path:  'dashboard'} );
  }
}
</script>

<style scoped>

.tabItem
{
  height: calc(100vh - 148px)
}


</style>