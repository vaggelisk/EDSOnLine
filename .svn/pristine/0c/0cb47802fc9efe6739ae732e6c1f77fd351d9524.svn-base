<template>
  <div>
    <!-- <dx-data-grid id="rawTable"
      :data-source="employees"
      :show-column-lines="true"
      :show-row-lines="true"
      :show-borders="false"
      :row-alternation-enabled="true"
    >
        <dx-column v-for="field in dataFields" 
            :key="field"
            :data-field="field"
        />
    </dx-data-grid> -->

     <dx-data-grid id="rawTable"
      :data-source="signals"
      :show-column-lines="true"
      :show-row-lines="true"
      :show-borders="false"
      :row-alternation-enabled="true"
      :column-auto-width="true">
        <dx-column v-for="field in signalFields" 
            :key="field"
            :data-field="field"
            data-type="number"
            format='#.##'
        />
    </dx-data-grid>
  </div>
</template>

<script>  
    
import { DxDataGrid, DxColumn } from 'devextreme-vue/data-grid';
import { DxCheckBox } from 'devextreme-vue/check-box';

import {globalStore} from "../main.js"

export default {
  name: "EngineRawTable",
  components: {
    DxDataGrid,
    DxColumn,
    DxCheckBox
  },
  data() {
    return {
      signalFields:['ensp','ME_Power_perc','ME_Power_kW','fcon','STW','SOG','soPresDispl','fRailPres','pscav','tscav','pcomp','pmax','tcspeed1','tTurbIn1','tTurbO1'],
      signals:[]      
    };
  },
  mounted()
  { 
    this.setData();
  },
  methods:
  {
    setData()
    {   
      let timeStamps = Object.keys(globalStore.signals);

      this.signals=[];

      for (let i=0;i<timeStamps.length;i++)
      {
        this.signals.push(globalStore.signals[timeStamps[i]]);
      }

    }

  },
  computed: {
    dataLoaded: function () { return globalStore.type; }
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
}
</style>
<style>

.dx-datagrid-headers .dx-header-row 
{
    background-color:rgb(51,82,128);
    color:white;
}

</style>

