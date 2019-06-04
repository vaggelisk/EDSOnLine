<template>
  <v-container fluid grid-list-md fill-height style="padding:0px 10px 5px 10px;width:100%;">
    <v-layout row>
      <v-flex d-flex md4>
          <v-card  >
            <v-card-title  primary class="title" style="height:5%;">Fault list</v-card-title>
            <v-card-text style="height:90%;">
              <v-layout v-if="currentFaults.length>0" column fill-height style="overflow:auto;">                            
                <FaultCard v-for="fault in currentFaults" :key="fault" v-on:faultChange="selFaultChange"
                  v-bind:currentFault="fault"
                  v-bind:kpi="kpi"
                  v-bind:selFaultId="selectedFaultId"/>
              </v-layout>
              <div v-else class="title"  style="display:flex;justify-content:center;align-items:center;width:100%;height:100%;color:rgb(219,219,219);">No Faults Detected</div>         
            </v-card-text> 
            <v-card-actions style="height:5%;">
              <v-btn style="color:white; background-color: rgb(51,82,128);">
                Request Remote Support
              </v-btn>
            </v-card-actions>
          </v-card>
      </v-flex>
      <v-flex d-flex md8>
        <v-tabs v-model="active" slider-color="rgb(51,82,128)" style="height:100%;width:100%;">
          <v-tab v-for="title in tabTitles" :key="title" ripple active-class='activeTab' style="text-transform:none;color:rgb(192,192,192);">
            <span>{{title}}</span>
          </v-tab>
          <v-tab-item class="tabItem">
            <EngineFaultsData
              v-bind:fault="selFault"
              v-bind:active="tabActive[0]"/>
          </v-tab-item>
          <v-tab-item class="tabItem">
            <EngineFaultsDetails
              v-bind:fault="selFault"
              v-bind:active="tabActive[1]"/>
          </v-tab-item>
        </v-tabs>
      </v-flex>
    </v-layout> 
  </v-container>
</template>

<script>

  import EngineFaultsData     from "./EngineFaultsData"
  import EngineFaultsDetails  from "./EngineFaultsDetails"

  import FaultCard from '../controls/FaultCard'

  
  import {globalStore} from "../main.js"

export default {
  name: 'EngineFaults',
  components: {
    EngineFaultsData ,  
    EngineFaultsDetails,
    FaultCard
  },
  data () {
    return {
        active: parseInt( this.$route.query.tab ),
        tabTitles: [
          'Fault Data','Details'
        ],
        currentFaults:[],
        kpi:{},
        selectedFaultId:-1,        
        tabActive:[false, false]
    }
  },
  created() {     
    
    this.tabActive[ parseInt( this.$route.query.tab )] = true;
  },
  mounted() {
    if (globalStore.selectedVessel=='') 
      this.$router.push( { path:  'dashboard'} );

    this.currentFaults = globalStore.faults;

    if (Object.keys(this.$route.params).includes('id')) this.selectedFaultId = this.$route.params.id; 
    else this.selectedFaultId = this.currentFaults[0].Id;
    //this.kpi= globalStore.events.kpi;   
  },
  methods:
  {
    // loadFaultData:function(item)
    // {
    //   console.log(item.Id);
    // }
    selFaultChange(event)
    {
      console.log(event);
      this.selectedFaultId=event;
    }
  }, 
  computed:
  {
    selFault:function()
    {
      var selected = this.currentFaults.filter(function(item){
          return item.Id == this.selectedFaultId;
        }, this);

      return selected[0];
    }
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
    }
  }

}
</script>

<style scoped>

.tabItem
{
  height: calc(100vh - 157px)
}


</style>