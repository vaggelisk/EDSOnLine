<template>
  <v-container fluid fill-height grid-list-md style="padding:0px 10px 5px 10px;width:100%;height:100%;background-color:white;">
    <v-layout column fill-height>        
        <dx-data-grid 
            id="rawTable"
            ref='sigTable'
            :data-source="signals"
            :show-column-lines="true"
            :show-row-lines="true"
            :show-borders="false"
            :word-wrap-enabled="true"
            :row-alternation-enabled="true"
            :column-auto-width="true"
            :customizeColumns="customColumns"
            @cellPrepared="customCell">
            <dx-paging :page-size="10"/>
            <!-- <dx-column v-for="field in signalFields"
                :key="field"
                :data-field="field"
                data-type="number"
                format='#.##'
            /> -->
        </dx-data-grid>   
        <div style="width:100%;height:48px;display:flex;justify-content:center;align-items:center;">
            <v-dialog v-model="dialog" width="600" height="800">
                <template v-slot:activator="{ on }">
                    <v-btn flat style="color:white; background-color: rgb(51,82,128);"
                    v-on="on" @click="openDialog">
                        Select Columns
                    </v-btn>
                </template>
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
                                        <v-select
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
                        <v-btn style="color:white; background-color: rgb(51,82,128);" @click="okDialog()">
                            OK
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>  

    </v-layout>
   </v-container>
</template>

<script>

import { DxDataGrid, DxColumn, DxPaging, DxScrolling} from 'devextreme-vue/data-grid';

import {globalStore} from "../main.js"

export default {
  name: "EngineRawTable",
  components: {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxScrolling
  },
  data() {
    return {
        selected:['ensp','ME_Power_perc','ME_Power_kW','fcon','STW','SOG','soPresDispl','fRailPres','pscav','tscav','pcomp','pmax','tcspeed1','tTurbIn1','tTurbO1'],
        signalFieldsForCancel: [],
        signals:[],
        columns:[],
        dialog: false,
        signalFieldsOverall: [],
        signalFields:  ['ensp','ME_Power_perc','ME_Power_kW','fcon','STW','SOG','soPresDispl','fRailPres','pscav','tscav','pcomp','pmax','tcspeed1','tTurbIn1','tTurbO1'],
        gridShow:false
   };
  },
 computed: {
        dataLoaded: function () { return globalStore.type; },
    },
  created()
  {
    this.setData();

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
  mounted()
  {
   
  },
  methods:
  {
      openDialog() {
        //  console.log("o dialog anoixe");
        this.signalFieldsForCancel = this.signalFields;
        // console.log(this.signalFieldsForCancel);

      },
      theListChanged(a, b, c) {
          this.signalFields.splice(a, 1, c);
      },
      selectText(item)
      {
          return globalStore.mapping[item.replace('1','')];
      },
      customColumns(columns)
      {
        for (let i=1;i<columns.length;i++)
        {
            columns[i].caption=globalStore.mapping[this.signalFields[i-1].replace('1','')];
        }
      },
      cancelDialog() {
          this.dialog = false;
          this.$set.signalFields(this.signalFieldsForCancel);
      },

      okDialog() {

           setTimeout(() => {
            this.setData();}, 400); 

          this.dialog = false;
      },

    setData()
    {
        this.gridShow = false;

        let timeStamps = Object.keys(globalStore.signals);
      
        if (timeStamps.indexOf('average')>-1)
          timeStamps.splice(timeStamps.indexOf('average'),1);

        this.signals=[];

        for (let i=0;i<timeStamps.length;i++)
        {
            let item= {timeStamp:timeStamps[i]};

            for (let s=0;s<this.signalFields.length;s++)
            {
                if (globalStore.signals[timeStamps[i]][this.signalFields[s]]!=-1000)
                    item[this.signalFields[s]]= Number(globalStore.signals[timeStamps[i]][this.signalFields[s]]).toFixed(2);
                else item[this.signalFields[s]]='N/A';
            }
            this.signals.push(item);
            //this.signals.push(globalStore.signals[timeStamps[i]]);
        }

           
        this.gridShow = true;   

    }

  },

  watch: {
      dataLoaded : function()
      {
          
        setTimeout(() => {
            this.setData();}, 400); 
      }
  }


};
</script>

<style scoped>

#rawTable{
  font-size: 16px;
  font-family:'Roboto', 'sans seriff';
  height:calc(100%-48px) !important;
}
</style>
<style>

.dx-datagrid-headers .dx-header-row
{
    background-color:rgb(51,82,128);
    color:white;
}

</style>

