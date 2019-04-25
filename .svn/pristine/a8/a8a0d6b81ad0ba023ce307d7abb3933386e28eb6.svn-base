<template>
  <!-- <v-tabs v-model="active" style="height:100%;width:100%;">
    <v-tab v-for="title in tabTitles" :key="title" ripple style="text-transform:none;">
      <span >{{title}}</span>
    </v-tab>
    <v-tab-item class="tabItem"><EngineRawTable/></v-tab-item>
    <v-tab-item class="tabItem"><EngineRawGraphs/></v-tab-item>
  </v-tabs> -->
  <v-container fluid fill-height grid-list-md style="padding:0px 10px 5px 10px;height:100%;width:100%;background-color:white;"> 
    <v-layout column fill-height>
      <div style="width:100%;height:48px;display:flex;align-items:center;">
        <v-radio-group v-model="screen" row style="display:flex;justify-content:flex-end;align-items:center;">
          <v-radio flat value="table" label="Table of measurements" color="rgb(51,82,128)"/>
          <v-radio flat value="graphs" label="Graphs" color="rgb(51,82,128)"/>
        </v-radio-group>
      </div>
      <EngineRawTable class="tabItem" v-if="screen=='table'"/>
      <EngineRawGraphs class="tabItem" v-if="screen=='graphs'"/>
    </v-layout>
  </v-container>   
</template>

<script>
  import EngineRawTable         from "./EngineRawTable"
  import EngineRawGraphs  from "./EngineRawGraphs"
  
  import {globalStore} from "../main.js"

  export default {
    name: "EngineRaw",
    components: {
      EngineRawTable,
      EngineRawGraphs
    },
    props:{
    },
    data () {
      return {
        tabTitles: [
          'Table of measurements','Graphs'
        ],
        screen:'table'
      }
    },
    created() {  
    },
    mounted() {
      if (globalStore.selectedVessel=='') 
              this.$router.push( { path:  'dashboard'} );
    },
    methods: {
    },
    watch:
    {
    }

  }

</script>

<style scoped>

.tabItem
{
  height: calc(100vh - 96px);
}

</style>
