<template>
 <v-container fluid fill-height grid-list-md style="padding:0px 10px 5px 10px;width:100%;height:100%;background-color:white;">
    <v-layout column fill-height>
      <v-flex d-flex md6>
        <highcharts v-if="load" style="height:100%;width:100%;" :options="chartOptions1"></highcharts>
      </v-flex>
      <v-flex d-flex md6>        
        <highcharts v-if="load" style="height:100%;width:100%;" :options="chartOptions2"></highcharts>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script> 

import {Chart} from 'highcharts-vue'
import More from 'highcharts/highcharts-more'
import Highcharts from 'highcharts'

import {globalStore} from "../main.js"

More(Highcharts)
    
export default {
    name: "EngineRawGraphs",
    components: {
      highcharts: Chart 
    },
    props:
    {
      parameters1:Array,
      parameters2:Array
    },
    data() {
      return {
        chartOptions1:
        {   
          time:{
            useUTC:false
          },       
          chart: {
            zoomType: 'xy'
          },
          title: {
            text: undefined
          },
          tooltip:{
            formatter: function () {
                return this.points.reduce(function (s, point) {
                    return s + '<br/>' + point.series.name + ': ' + point.y.toFixed(2);
                }, '<b>' + new Date(this.x).toTimeString().substring(0,5) + '</b>');
            },
            shared:true
          },
          yAxis: [],
          xAxis:{
            type:'datetime',
            title:
            {
              text:'Time',
              align:'high'
            },
            labels: {
              format: '{value:%H:%M}'
            },
            crosshair:true
          },
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom',
            floating: true,
          },
          series: []
        },
        chartOptions2:
        {   
          time:{
            useUTC:false
          },       
          chart: {
            zoomType: 'xy'
          },
          title: {
            text: undefined
          },
          tooltip:{
            formatter: function () {
                return this.points.reduce(function (s, point) {
                    return s + '<br/>' + point.series.name + ': ' + point.y.toFixed(2);
                }, '<b>' + new Date(this.x).toTimeString().substring(0,5) + '</b>');
            },
            shared:true
          },
          yAxis: [],
          xAxis:{
            type:'datetime',
            title:
            {
              text:'Time',
              align:'high'
            },
            labels: {
              format: '{value:%H:%M}'
            },
            crosshair:true
          },
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom',
            floating: true,
          },
          series: []
        },
        load: false   
      
      };
    },
    mounted()
    {
      
     // window.addEventListener('resize', this.onResize);

      setTimeout(() => {
        this.setData();});   
    },
    methods: 
    {
      // onResize(event)
      // {
      //     setTimeout(() => {
      //         this.chartOptions.chart.height =this.$refs['chartContainer'].clientHeight;
      //        });
      // },
      setData()
      {
        this.load=false;

        this.chartOptions1.series=[];
        this.chartOptions1.yAxis=[];

        this.chartOptions2.series=[];
        this.chartOptions2.yAxis=[];

        let timeStamps = Object.keys(globalStore.signals);

        if (timeStamps.indexOf('average')>-1)
          timeStamps.splice(timeStamps.indexOf('average'),1);

        for (let p=0;p<this.parameters1.length;p++)
        {
          let opp = false;

          if (p%2==1) opp = true;

          let yText='';

          if (Object.keys(globalStore.mapping).includes(this.parameters1[p]))
          {
            yText=globalStore.mapping[this.parameters1[p].replace('1','')]+' ['+ globalStore.units[this.parameters1[p]]+']';
          }
          else
          {
            let param = this.parameters1[p].substring(0,this.parameters1[p].length-1);

            yText= globalStore.mapping[param]+" "+this.parameters1[p].substring(this.parameters1[p].length-1)+' ['+globalStore.units[param]+']';
          }

          var axis={
            title: {
              text: yText,//globalStore.mapping[this.parameters1[p]]+' ['+globalStore.units[this.parameters1[p]]+']',
              align:'high'
            },
            opposite:opp
          };          

          this.chartOptions1.yAxis.push(axis);

          var item={  
              name:yText,                      
              type:'spline',
              data:[],
              marker:{
                  enabled:false
              },
              yAxis:p,
              animation: false,                        
              states: {
                  hover: {
                      enabled: false
                  },
                  normal:{
                  animation:false
                  }, 
                  inactive:{
                  opacity: 1
                  }
              }
          };

          for (let i=0;i<timeStamps.length;i++)
          {
            let val = globalStore.signals[timeStamps[i]][this.parameters1[p]];

            if(val!=-1000)
              item.data.push([new Date(timeStamps[i]).getTime(),val]); 
          }       

          this.chartOptions1.series.push(item);

        }

        for (let p=0;p<this.parameters2.length;p++)
        {
          let opp = false;

          if (p%2==1) opp = true;
          
          let yText='';

          if (Object.keys(globalStore.mapping).includes(this.parameters2[p]))
          {
            yText=globalStore.mapping[this.parameters2[p].replace('1','')]+' ['+ globalStore.units[this.parameters2[p]]+']';
          }
          else
          {
            let param = this.parameters2[p].substring(0,this.parameters2[p].length-1);

            yText= globalStore.mapping[param]+" "+this.parameters2[p].substring(this.parameter2[p].length-1)+' ['+globalStore.units[param]+']';
          }

          var axis={
            title: {
              text: yText,//globalStore.mapping[this.parameters1[p]]+' ['+globalStore.units[this.parameters1[p]]+']',
              align:'high'
            },
            opposite:opp
          };          

          this.chartOptions2.yAxis.push(axis);

          var item={  
              name:yText,                    
              type:'spline',
              data:[],
              marker:{
                  enabled:false
              },
              yAxis:p,
              animation: false,                        
              states: {
                  hover: {
                      enabled: false
                  },
                  normal:{
                  animation:false
                  }, 
                  inactive:{
                  opacity: 1
                  }
              }
          };

          for (let i=0;i<timeStamps.length;i++)
          {
            let val = globalStore.signals[timeStamps[i]][this.parameters2[p]];

            if(val!=-1000)
              item.data.push([new Date(timeStamps[i]).getTime(),val]); 
          }       

          this.chartOptions2.series.push(item);

        }
        
        this.load=true;
      }
    },
    computed: {
      dataLoaded: function () { return globalStore.type; }
    },
    watch: {
      dataLoaded : function()
      {
        setTimeout(() => {
            this.setData();}); 
      },
      parameters1 : function()
      {        
          setTimeout(() => {
              this.setData();}); 
      },
      parameters2 : function()
      {        
          setTimeout(() => {
              this.setData();}); 
      },
    }
};
</script>

<style scoped>
</style>

