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
        <v-btn v-if="screen=='table'" flat style="color:white; background-color: rgb(51,82,128);height:30px;" @click="openDialog">
          Select Columns
        </v-btn>
        <v-btn v-if="screen=='table'" flat style="color:white; background-color: rgb(51,82,128);height:30px;">
          Download
        </v-btn>
        <v-spacer/>
        <v-radio-group v-model="screen" row style="display:flex;justify-content:flex-end;align-items:center;">
          <v-radio flat value="table" label="Table of measurements" color="rgb(51,82,128)"/>
          <v-radio flat value="graphs" label="Graphs" color="rgb(51,82,128)"/>
        </v-radio-group>
      </div>
      <EngineRawTable class="tabItem" v-if="screen=='table'" v-bind:signalFields="signalFields"/>
      <EngineRawGraphs class="tabItem" v-if="screen=='graphs'"
        v-bind:parameters1="signalFields.slice(0,5)"
        v-bind:parameters2="signalFields.slice(5,10)"/>
      <v-dialog v-model="dialog" width="600" height="800">
        <v-card style="width:600px;height:800px;">
          <v-card-title primary class="title" style="height:5%;">
              Select Column
          </v-card-title>
          <v-card-text  style="height:90%;overflow:auto;">
            <v-layout column fill-height>
              <v-flex d-flex v-for="(s, index) in signalFields" v-bind:key="index">
                <v-layout row>
                  <v-flex d-flex xs4 style="align-items:center;">
                    Column {{index + 1}}: 
                  </v-flex>
                  <v-flex d-flex xs8>
                    <v-autocomplete
                        v-model="selected[index]"
                        :items="signalFieldsOverall"
                        :value="s"
                        item-text="title"
                        item-value="param"
                        v-on:change="theListChanged( index, s , selected[index])"/>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>                    
          </v-card-text>
          <v-card-actions style="height:5%;">
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="cancelDialog">
                Cancel
            </v-btn>
            <v-btn style="color:white; background-color: rgb(51,82,128);" @click="okDialog">
                OK
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
        screen:'table',        
        dialog: false,
        signalFields:  ['ensp','ME_Power_perc','ME_Power_kW','fcon','STW','SOG','soPresDispl','fRailPres','pscav','tscav','pcomp','pmax','tcspeed1','tTurbIn1','tTurbO1'],
        selected:['ensp','ME_Power_perc','ME_Power_kW','fcon','STW','SOG','soPresDispl','fRailPres','pscav','tscav','pcomp','pmax','tcspeed1','tTurbIn1','tTurbO1'],        
        signalFieldsOverall: [],
        signalFieldsForCancel: []
      }
    },
    created()
    {
      let allSigs = Object.keys(globalStore.signals[Object.keys(globalStore.signals)[0]]);
      for (let i=0;i<allSigs.length;i++)
      {
        if (Object.keys(globalStore.mapping).includes(allSigs[i]))
        {
          this.signalFieldsOverall.push({
              param:allSigs[i],
              title:globalStore.mapping[allSigs[i]]
          });
        }
        else
        {
          let param = allSigs[i].substring(0,allSigs[i].length-1);

          this.signalFieldsOverall.push({
              param:allSigs[i],
              title:globalStore.mapping[param]+" "+allSigs[i].substring(allSigs[i].length-1)
          });
        }
          
      }

    },
    mounted() {
      if (globalStore.selectedVessel=='') 
        this.$router.push( { path:  'dashboard'} );
    },
    methods: {
      openDialog() {
        
        this.signalFieldsForCancel = this.signalFields.slice(0);
        this.dialog=true;
      },
      theListChanged(a, b, c) {
        this.signalFields.splice(a, 1, c);
      },
      cancelDialog() {
        this.signalFields= this.signalFieldsForCancel.slice(0);
        
        this.dialog = false;
      },
      okDialog() {
        this.dialog = false;
      },
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
