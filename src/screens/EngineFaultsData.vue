<template>
 <v-container fluid fill-height grid-list-md style="padding:0px 10px 5px 10px;height:100%;width:100%;background-color:white;"> 
    <v-layout v-if="fault!=undefined" column fill-height>
        <v-flex d-flex md3>
          <v-layout row>
            <v-flex d-flex md6>
              <v-layout column fill-height>
                <v-flex d-flex style="max-height:40px;">
                  <v-layout row>
                    <v-flex d-flex md5 class="fdTitle" style="align-items:center;">Possible Causes</v-flex>                    
                    <v-flex d-flex md4 class="fdTitle" style="align-items:center;">Maintenance Task</v-flex>
                    <v-flex d-flex md3 class="fdTitle" style="align-items:center;">Acknowledged</v-flex>
                  </v-layout>
                </v-flex>
                <v-flex d-flex v-for="(cause, index) in fault.events[0].causes" :key="cause" style="max-height:50px;">
                  <v-layout row>
                    <v-flex d-flex md5 style="border-style: solid;border-color:rgb(219,219,219);border-width:1px;">{{index+1}}. {{cause}}</v-flex>                    
                    <v-flex d-flex md4 style="border-style: solid;border-color:rgb(219,219,219);border-width:1px;justify-content:center;align-items:center;">                      
                      <img style="max-height:50px;max-width:50px;" :src=maintImg alt="">
                    </v-flex>
                    <v-flex d-flex md3 style="border-style: solid;border-color:rgb(219,219,219);border-width:1px;justify-content:center;align-items:center;">
                      <v-icon color='rgb(60, 171, 48)' style="max-height:50px;max-width:50px;">done</v-icon>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex d-flex md6 style="padding-left:10px;">
              <v-layout column fill-height>
                <v-flex d-flex style="max-height:40px;align-items:center;" class="fdTitle" >Comments
                </v-flex>
                <v-flex d-flex>
                  <v-textarea outline auto-grow/>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex d-flex md9>
          <v-layout row>
            <v-flex d-flex md4>
              <v-layout column fill-height>
                <v-flex d-flex md6>
                  <Card v-if="Panel1=='Card'"
                    v-bind:cardData="Panel1Data"
                    v-bind:flat="true"/>
                  <BarChart v-if="Panel1=='Bar'"
                    v-bind:chartOptions="Panel1Data"
                    v-bind:title="Panel1Title"
                    v-bind:active="active"
                    v-bind:flat="true"/>
                </v-flex>
                <v-flex d-flex md6>
                  <Card v-if="Panel2=='Card'"
                    v-bind:cardData="Panel2Data"
                    v-bind:flat="true"/>
                  <BarChart v-if="Panel2='Bar'"
                    v-bind:chartOptions="Panel2Data"
                    v-bind:title="Panel2Title"
                    v-bind:active="active"
                    v-bind:flat="true"/>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex d-flex md8>
              <Schematic
              v-bind:schematicSource="schematicSource"
              v-bind:points="points"
              v-bind:initWidth="initWidth"
              v-bind:initHeight="initHeight"
              v-bind:active="active"/>
            </v-flex>
          </v-layout>
        </v-flex>
    </v-layout>  
    <div v-else style="width:100%;height:100%;background-color:white;display:flex;justify-content:center;align-items:center;">
      <v-img
        :src="require('../assets/check-mark-circle3.png')" contain height="200"></v-img>
    </div>     
  </v-container>
  
</template>

<script>

import BarChart from  '../controls/BarChart'
import Schematic from  '../controls/Schematic'
import Card from '../controls/Card'

import {globalStore} from "../main.js"

export default {
  name: 'EngineFaultsData',
  components: {
     Schematic,
     BarChart,
     Card
  },
  props:
  {
    fault:Object,
    active:Boolean
  },
  data () {
    return {
        maintImg: require('../assets/icon-maintenance_light.png'),        
        Panel1Title: "Title 1",
        Panel2Title: "Title 2",          
        Panel1 : 'Bar',
        Panel2 : 'Card',
        Panel1Data : {},
        Panel2Data: {},
        schematicSource: require('../assets/fuel-injection-schematic-light.png'),
        points: {},        
        initWidth: 1820,
        initHeight: 1134,
        faultData:{},
        idName: "FuelInjection",
    }
  },
  computed:
  {
  },
  methods:{
    setData()
    {
      let component = this.fault.component;

      if (component=='Servo Oil') 
      {
        this.schematicSource = require('../assets/servo-oil-schematic-light.png');

        this.points={
          "Servo Oil Rail": {x:56, y:540, color:0},
          "VCU": {x:1001, y:252, color:0},
          "Exhaust Valve": {x:1624, y:295, color:0},
          "Servo oil pumps": {x:1293, y:900, color:0}};
      }
      else if (component=='Fuel Injection')
      {
        this.schematicSource = require('../assets/fuel-injection-schematic-light.png');

        this.points =  {
          "Fuel Rail": {x:36, y:565, color:0},
          "Injectors": {x:1285,y:741, color:0},
          "Fuel Pumps": {x:1539,y:312, color:0}};
      }
      else if (component == 'Piston Running')
      {
        this.schematicSource = require('../assets/piston-schematic-light.png');

        this.points = {
          "Piston Rings": {x:1053, y:528, color:0},
          "Cylinder Liner": {x:693, y:298, color:0}};
      }
      else if (component == 'Gas Admission') 
      {
        this.schematicSource = require('../assets/gas-admission-schematic-light.png');
        
        this.points = {
            "Gas Admission Valve Exhaust Side": {x:596, y:723, color:0},
            "Knock Sensor": {x:1015, y:443, color:0},
            "Piston Underside Sensor": {x:738, y:1004, color:0},
            "Pilot Fuel Injectors": {x:702, y:382, color:0},
            "Gas Admission Valve Fuel Side": {x:1127, y:723, color:0}};
      }
      else {
        this.schematicSource = require('../assets/scavenge-exhaust-schematic-light.png');

        this.points = {
          "Waste Gate": {x:459, y:354, color:0},
          "Turbine": {x:444, y:640, color:0},
          "Scavenge Air Cooler": {x:609, y:860, color:0},
          "Scavenge Ports": {x:187, y:836, color:0},
          "Air Flaps": {x:414, y:815, color:0},
          "Compressor": {x:614, y:640, color:0},
          "Filter": {x:654, y:473, color:0}};
      } 
      
      this.points[this.fault.subComponent].color = this.fault.color;
      
      let length = this.fault.events.length;

      this.faultData = this.fault.events[length-1]; 

      if (this.faultData.tag == "Comp") this.setPanel();
      else if (this.faultData.tag ==  "R") this.setRPanel();
      else this.setEHCPanel();
    },
    setPanel: function()
    {
      var template = this.faultData.Template;

      var list1 =  this.faultData.Panel1;

      if (template == 7)
      {
          //this.Panel1Title = "Failure trending";
      }
      else if (template < 4)
      {
          // this.Panel1Title = list1[0];
          
          this.addCard(list1, 'Panel1', 'Panel1Data');
      }
      else
      {                
          var tmp = list1[0];
          // if (!(tmp[0] in this.engMap["EDS_Mapping"])) title1 = tmp[0];
          // else if (!('elementIndex' in this.engMap["EDS_Mapping"][tmp[0]])) title1 = this.engMap["EDS_Mapping"][tmp[0]]['shortName'];
          // else  title1 = this.engMap["EDS_Mapping"][tmp[0]]['combinedName'];


          this.Panel1Title =globalStore.mapping['pmax']+' Cylinder '+this.fault.index;
          //this.Panel1Title = tmp[0];
          if (template < 6) this.addBarChart(list1, 'Panel1', 'Panel1Data');
      }

      var list2 =  this.faultData.Panel2;


      if (list2.Length == 0)
      {
          this.Panel2Title = "";
      }
      else if (template == 2)
      {
          // this.Panel2Title = list2[0];
          this.addCard(list2, 'Panel2', 'Panel2Data');
      }
      else 
      {
          var tmp = list2[0];

          // if (!(tmp[0] in this.engMap["EDS_Mapping"])) title2 = tmp[0];
          // else if (!('elementIndex' in this.engMap["EDS_Mapping"][tmp[0]])) title2 = this.engMap["EDS_Mapping"][tmp[0]]['shortName'];
          // else  title2 = this.engMap["EDS_Mapping"][tmp[0]]['combinedName'];


          this.Panel2Title=globalStore.mapping['tExhC']+' '+this.fault.index;
          //this.Panel2Title=tmp[0];
          if ((template == 1) || (template == 4)) this.addBarChart(list2, 'Panel2', 'Panel2Data');
      }           

    },
    addCard: function(list, cardBool, cardData)
    {     
      this[cardData] = {          
        value:list[1],
        ref: list[2],
        title:list[0],
        unit:"",
        format:1,
        color:list[3]
      }

      this[cardBool] = 'Card';
    },
    addBarChart: function(list,cardBool, chartData)
    { 
      this[chartData]={
        time:{
            useUTC:false
          },  
          chart:{
            height:0,          
            zoomType: 'xy'
          },
          legend:{
            enabled:false
          },
          tooltip:{
            formatter: function () {
                return new Date(this.x).toTimeString().substring(0,5) +': '+this.point.y.toFixed(2);
            }
          },
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
          yAxis:{
            title:
            {
              text:'',
              align:'high'
            }
          },
          title:{
              text:undefined
          },
          series: [{                        
              type:'column',
              animation: false,
              data:[],
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
          }]
        };


      if (list[2] == 0) this[chartData].yAxis.title.text="Values";
      else if (list[2] == 1) this[chartData].yAxis.title.text="Diff.";
      else this[chartData].yAxis.title.text= "% Diff.";      
        
      // this[chartData].arrangements ={};
      // this[chartData].arrangements.name =title;
      
      
      // this[chartData].values = [];

      let param = list[0][0];

      let exp = 0, val;
      let limit = list[4];
      
      let faultDate = new Date( this.faultData["Date"]);
      
      let minus30Date = new Date(faultDate.getTime() - 30 *60000);

      for (var item in this.fault.data[param])
      { 
          let dt = new Date(item);

          if ((dt<=faultDate)&&(dt>=minus30Date))
          {
              exp = 0;
              val = this.fault.data[param][item];

              let type = list[3];

              if (type == 2)
              {
                  //let hcParam = this.engMap["EHC_Mapping"][param]["parameterTag"];
                  let hcParam = 'out2';

                  var ehcExp = this.fault.ehcTl.filter(function(ehcItem){
                      return ehcItem.Time == item;
                  });

                  exp = ehcExp[0]['Exp'][hcParam][0];
              }
              else if (type == 1)
              {
                  let isoParam = param + "_ISO";

                    var shopExp = this.fault.ehcTl.filter(function(shopItem){
                      return shopItem.Time == item;
                  });

                  exp = shopExp[0]['shopTest'][isoParam];
              }
              else if (type == 6) exp = list[4];
              else if (type == 0)
              {
                  if (param == "soPresDispl") exp =  this.fault.data["soPresSetpoint"][item];
                  else if (param.Contains("fRailPres")) exp =  this.fault.data["fRailPresSet"][item];
              }
              else if (type == 5)
                  exp = this.fault.data["PistonUndersidereference"][item];

              if ((exp != 0) && (exp != -1000) && (val != -1000))
              {
                  let barValue=0, color = 'rgb(60, 171, 48)';

                  if (type == 0) barValue = val;
                  else if (type == 1) barValue = val - exp;
                  else barValue = ((val - exp) / val) * 100;

                  if (limit > 0)
                  {
                      if (barValue > limit) color ='rgb(205, 57, 64)';
                  }
                  else
                  {
                      if (barValue < limit) color ='rgb(205, 57, 64)';
                  }

                  this[chartData].series[0].data.push({
                      x: dt,
                      y: barValue,
                      color: color});
              }
          }
      }

      this[cardBool] = 'Bar';
    },   
    setRPanel: function()
    {
      var template = this.faultData.Template;

      var list1 = this.faultData.Panel1;

      if (template == 8)
      {
          this.Panel1Title = "Liner Wall Temperature";
          
          this.addRAreaChart('Panel1', 'Panel1Data');

          this.Panel2Title = 'Fault progress';

          this.addRBarChart('Panel2', 'Panel2Data');
      }
    },
    addRAreaChart:function(cardBool, chartData)
    {
      this[chartData]={
        time:{
            useUTC:false
          },  
          chart:{
            height:0,          
            zoomType: 'xy'
          },
          legend:{
            enabled:true
          },
          tooltip:{            
            shared:true,
            formatter: function () {
               return this.points.reduce(function (s, point) {
                  return s + '<br/>' + point.series.name + ': ' + point.y.toFixed(2);
                }, '<b>' + new Date(this.x).toTimeString().substring(0,5) + '</b>');
            }
          },
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
            crosshair: true
          },
          yAxis:{
            title:
            {
              text:'['+globalStore.units['tlineraft']+']',
              align:'high'
            }
          },
          title:{
              text:undefined
          },
          series: []
        };
      
      
      let faultDate = new Date( this.faultData["Date"]);
      
      let minus30Date = new Date(faultDate.getTime() - 30 *60000);
      let index=0;

      for (var param in this.fault.data)
      {
        this[chartData].series.push({                        
            type:'line',
            name:param,
            animation: false,
            marker:{
                enabled:false
            },                    
            data:[],
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
        });

        var keys = Object.keys(this.fault.data[param]).sort((a, b) => (new Date(a).getTime() > new Date(b).getTime()) ? 1 : -1);

        for (let i=0;i<keys.length;i++)
        { 
          let dt = new Date(keys[i]);

          if ((dt<=faultDate)&&(dt>=minus30Date))
          {
            this[chartData].series[index].data.push({
                x: dt,
                y: this.fault.data[param][keys[i]]});        

          }
        }

        index++;
      }
      
      this[cardBool] = 'Bar';

    },
    addRBarChart:function(cardBool, chartData)
    {
      this[chartData]={
        time:{
            useUTC:false
          },  
          chart:{
            height:0,          
            zoomType: 'xy'
          },
          legend:{
            enabled:false
          },
          tooltip:{
            formatter: function () {
                return new Date(this.x).toTimeString().substring(0,5) +': '+this.point.y.toFixed(2);
            }
          },
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
          yAxis:{
            visible:false
          },
          title:{
              text:undefined
          },
          series: [{                        
              type:'column',
              animation: false,
              data:[],
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
          }]
        };

      let faultDate = new Date( this.faultData["Date"]);
      
      let dt = new Date(faultDate.getTime() - 30 *60000);

      while (dt<=faultDate)
      {
        var temp = this.fault.events.filter(function(item){
          return new Date(item.Date).getTime() == dt.getTime() ;
        });

        let val, color;

        if (temp.length == 0)
        {
          val = 5;
          color = 'rgb(60, 171, 48)';
        }
        else 
        {
          val = temp[0].color;

          if (val==10) color = 'rgb(255, 184, 29)';
          else color =  'rgb(205, 57, 64)';
        }

        this[chartData].series[0].data.push({
          x: dt,
          y: val,
          color: color });    
          
        dt = new Date(dt.getTime() + 60000);

      }
      
      this[cardBool] = 'Bar';

    },
    setEHCPanel: function()
    {
        var template = this.faultData.Template;

        var list1 = this.faultData.Panel1;

        if (template < 4)
        {                
            //this.Panel1Title = list1[0];
            
            this.addCard(list1, 'Panel1', 'Panel1Data');
        }
        else
        {
          var tmp = list1[0];
            // let param1 = this.faultData.Panel1[0];
            
            // var title1 = this.faultData.element + " " + this.faultData.index + " " + this.engMap["EHC_Mapping"][param1.replace("_ISO", "")]["parameterName"];
          this.Panel1Title = tmp[0];
          if (template < 6) this.addEHCBarChart(list1, 'Panel1', 'Panel1Data');
        }

        var list2 = this.faultData.Panel2;

        if (list2.Length == 0)
        {
            this.Panel2Title = "";
        }
        else if (template == 2)
        {
            //this.Panel2Title = list2[0];
            this.addCard(list2, 'Panel2', 'Panel2Data');
        }
        else
        {
            let param2 = this.faultData.Panel2[0];
            var title2 = this.faultData.element+ " " + this.faultData.index+ " " + this.engMap["EHC_Mapping"][param2.replace("_ISO", "")]["parameterName"];
        
            if ((template == 1) || (template == 4)) this.addEHCBarChart(list2, 'Panel2', 'Panel2Data');               

        }


    },
    addEHCBarChart: function(list,cardBool, chartData)
    {
        // this[chartData]={};
        // this[chartData].arrangements ={};
        // this[chartData].arrangements.name =title;

        this[chartData]={
          time:{
            useUTC:false
          },  
          chart:{
            height:0,          
            zoomType: 'xy'
          },
          legend:{
            enabled:false
          },
          tooltip:{
            formatter: function () {
                return new Date(this.x).toTimeString().substring(0,5) +': '+this.point.y.toFixed(2);
            }
          },
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
          yAxis:{
            title:
            {
              text:'Values',
              align:'high'
            }
          },
          title:{
              text:undefined
          },
          series: [{                        
              type:'column',
              animation: false,
              data:[],
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
          }]
        };
        
        //this[chartData].arrangements.yaxis = "Values";
        
        this[chartData].values = [];

        let param = list[0];

        let exp = 0, val;
        
        let faultDate = new Date(this.faultData["Date"]);
         
        let minus30Date = new Date(this.faultDate.getTime() - 30 *60000);

        if (list[1]=='EHC')
        {
            let hcParam ='';// this.engMap["EHC_Mapping"][param]["parameterTag"];
            let index = 0;//this.engMap["EHC_Mapping"][param]["elementIndex"];
            
            for (var item in this.fault.data[param])
            { 
                let dt = new Date(item);

                if ((dt<=faultDate)&&(dt>=minus30Date))
                {
                    val = this.fault.data[param][item];

                    var selected = this.fault.ehcTl.filter(function(ehcItem){
                        return ehcItem.Time == item;
                    }, this);

                    let color = 'rgb(60, 171, 48)';

                    if (selected[0].Over.hcParam.index==20)  color ='rgb(205, 57, 64)';

                    this[chartData].series[0].data.push({
                      x: dt,
                      y: val,
                      color: color});
                }
                
            }
        }
        else if (list[1]=='Shop')
        {
            let lower = list[3];
            let upper = list[4];
            for (var item in this.fault.data[param])
            { 
                let dt = new Date(item);
         
                if ((dt<=faultDate)&&(dt>=minus30Date))
                {
                    val = this.fault.data[param][item];

                    var selected = this.fault.ehcTl.filter(function(shopItem){
                      return shopItem.Time == item;
                    });

                    exp = selected[0].shopTest[param];
                    let perc =  ((val - exp) / val) * 100;

                    if ((exp != -1000) && (val != -1000))
                    {
                        let color= 'rgb(60, 171, 48)';

                        if ((perc < lower) || (perc > upper)) color ='rgb(205, 57, 64)';

                        this[chartData].series[0].data.push({
                            x: dt,
                            y: val,
                            color: color});
                    }


                }
            }

        }
        
        this[cardBool] = 'Bar';
    }
  },
  watch:
  {
    fault:function()
    {
      this.setData();
    }
  }

}
</script>

<style scoped>
.fdTitle
{
  font-size: 18px;
  color:rgb(115,115,115);
}

</style>