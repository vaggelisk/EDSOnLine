<template>
  <v-tabs v-model="active" slider-color="rgb(51,82,128)" style="height:100%;width:100%;">
    <v-tab v-for="title in tabTitles" :key="title" ripple active-class='activeTab' style="text-transform:none;color:rgb(192,192,192);">
      <span>{{title}}</span>
    </v-tab>
    <v-tab-item class="tabItem">
      <EngineParameters
        v-bind:active="tabActive[0]"/>
    </v-tab-item>
    <v-tab-item class="tabItem">
      <EngineGraphs
        v-bind:active="tabActive[1]"/>
    </v-tab-item>
    <v-tab-item class="tabItem">
      <EngineRaw
        v-bind:active="tabActive[2]"/>
    </v-tab-item>
    <v-tab-item class="tabItem">
      <OperationalGraphs
        v-bind:active="tabActive[3]"/>
    </v-tab-item>
  </v-tabs>
</template>

<script>
  import EngineGraphs         from "./EngineGraphs"
  import EngineParameters  from "./EngineParameters"
  import EngineRaw      from "./EngineRaw"
  import OperationalGraphs         from "./OperationalGraphs"
  
  import {globalStore} from "../main.js"

  export default {
    name: "EnginePerformance",
    components: {
      EngineParameters,
      EngineRaw,
      EngineGraphs,
      OperationalGraphs
    },

    data () {
      return {
        active: parseInt( this.$route.query.tab ),
        tabTitles: [
          'Performance Parameters','Performance Graphs', 'Raw Data', 'Operational Graphs'
        ],
        tabActive:[false, false, false, false]
      }
    },
    created() {     
     
      this.tabActive[ parseInt( this.$route.query.tab )] = true;
    },
    mounted() {
      if (globalStore.selectedVessel=='') 
        this.$router.push( { path:  'dashboard'} );
    },
    methods: {
    },
    watch:
    {
      active : function()
      {
        for (let i=0;i<this.tabActive.length;i++)
        {
          if (i==this.active) this.tabActive[i]=true;
          else this.tabActive[i]=false;
        }
        console.log(this.active);
      }
    }

  }

</script>

<style scoped>

.tabItem
{
  height: calc(100vh - 148px)
}

</style>

<style>

.activeTab
{
  color:rgb(51,82,128) !important;
  opacity:1 !important;
}

</style>

