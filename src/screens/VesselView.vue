<template>
   <v-container fluid fill-height grid-list-md style="padding:0px 10px 5px 10px;width:100%;">
    <v-layout row >
       <v-flex d-flex md3>
           <VesselInfo
                v-bind:vesselData="vesselData"/>
       </v-flex>       
       <v-flex d-flex md9>
            <v-layout column fill-height>
                <v-flex d-flex md6  style="max-height:50%;">
                    <v-layout row>
                        <v-flex d-flex md3>
                             <v-card flat fill-height style="height:100%;width:100%;">
                                <v-card-actions fill-height style="height:100%;padding:0px;">   
                                    <v-layout column fill-height>
                                        <v-flex d-flex md6  style="padding:0px;">
                                            <Gauge
                                                v-bind:data="gaugeData['ensp']"/>
                                        </v-flex>
                                        <v-flex d-flex md6 style="padding:0px;">                                            
                                            <Gauge
                                                v-bind:data="gaugeData['load']"/>
                                        </v-flex>
                                    </v-layout>                                    
                                </v-card-actions>
                            </v-card>
                        </v-flex>
                        <v-flex d-flex md3>
                            <EngineState
                                v-bind:data="engineData"/>
                        </v-flex>
                        <v-flex d-flex md6>
                            <SubsystemState
                                v-bind:data="subSystemData"/>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex d-flex md6  style="max-height:50%;">
                    <v-layout row>
                        <v-flex d-flex md6>
                            <PerformanceWidget
                                v-bind:cardData="cardData"                                
                                v-bind:gaugeData="gaugeData"/>
                        </v-flex>
                        <v-flex d-flex md6>
                            <FaultsWidget
                                v-bind:navigation="true"/>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
       </v-flex>    
    </v-layout>
  </v-container>
</template>

<script>

import VesselInfo from '../controls/VesselInfo'
import EngineState from '../controls/EngineState'
import SubsystemState from '../controls/SubsystemState'
import PerformanceWidget from '../controls/PerformanceWidget'
import FaultsWidget from '../controls/FaultsWidget'
import Gauge from '../controls/Gauge'

import {globalStore} from "../main.js"

export default {
  name: "VesselView",
  components: { 
      VesselInfo,
      SubsystemState,
      EngineState,
      PerformanceWidget,
      FaultsWidget,
      Gauge
   },
   data: function () {
        return {  
            cardData:{}, 
            subSystemData:[], 
            engineData:{
                cylinders:[],
                elements:[],
                engineKPI:0,
                engineColor:0    
            },
            gaugeData:{},
            vesselData:{},
            load:false
        }
    },    
    mounted() {

        if (globalStore.selectedVessel=='') 
                this.$router.push( { path:  'dashboard'} );
                
        this.setData();        
 
    },
    methods:
    {
        average: function(param, count, data, timestamp)
        {
            let sum =0;

            for (let i=1;i<=count;i++)
            {   
                if (data[timestamp][param+i]!=-1000) sum+=data[timestamp][param+i];
                else count--;
            }

            
            if ((sum==0)||(count==0)) return -1000;
            else return sum/count;
        }, 
        setData()
        {        
            var temp = Object.keys(globalStore.reference);

            let timestamp = temp[temp.length-1];

            if (temp.indexOf('average')>-1)
                temp.splice(temp.indexOf('average'),1);

            let last = temp[temp.length-1];

            //vessel data
            this.$set(this.vesselData,'showMap',false);

            this.$set(this.vesselData,'timeStamp', {
                    label:'Timestamp',
                    value:last,
                    unit:'',
                    format:null
                });

            if ((globalStore.type != 'last')&&(globalStore.type != 'today'))
            {
                this.vesselData['timeStamp'].value = new Date(temp[temp.length-2]).toISOString().slice(0, 10);
            }

            let params=['LAT','LON']

            for (let p=0;p<params.length;p++)
            {
                this.$set(this.cardData,params[p],{
                    label:globalStore.mapping[params[p]],
                    value:globalStore.signals[last][params[p]],
                    unit:'['+globalStore.units[params[p]]+']',
                    format:2
                });
            }
            
            params=['ME_Torque_perc','ME_Power_perc','ensp','STW','SOG','Slip_STW','Slip_SOG' ,'COG','Wind_Speed','Wind_direction_relative','Water_Depth','Rudder_angle'];

            for (let p=0;p<params.length;p++)
            {
                this.$set(this.vesselData,params[p],{
                    label:globalStore.mapping[params[p]],//params[p],
                    value:globalStore.signals[timestamp][params[p]],
                    unit:'['+globalStore.units[params[p]]+']',
                    format:2
                });

            }

            this.$set(this.vesselData,'route',[]);
            let timeStamps = Object.keys(globalStore.signals);

            if (timeStamps.indexOf('average')>-1)
                timeStamps.splice(timeStamps.indexOf('average'),1);
            

            
            params=['ME_Power_perc','ensp','STW'];

            for (let i=0;i<timeStamps.length;i++) 
            {
                // let html ='<b>'+timeStamps[i]+' Energy Triumph</b><br>';

                // for (let p=0;p<params.length;p++)
                // {
                //     if (globalStore.signals[timeStamps[i]][params[p]]!=-1000)
                //         html += globalStore.mapping[params[p]]+': '+ globalStore.signals[timeStamps[i]][params[p]].toFixed(2)+' ['+globalStore.units[params[p]]+']<br>';
                //     else  html += globalStore.mapping[params[p]]+': - ['+globalStore.units[params[p]]+']<br>';
                // }
                
                // html +='Faults: 0<br>Tickets: -'
                if ( globalStore.signals[timeStamps[i]]['LON']!=-1000)
                {
                    this.vesselData.route.push({
                    // 'date':timeStamps[i],
                        'coords':[ globalStore.signals[timeStamps[i]]['LON'], globalStore.signals[timeStamps[i]]['LAT']],
                    // 'color':0,
                        //'html':html,
                    // 'status':'running'
                    });

                }
                


            }

            this.$set(this.vesselData,'points',[]);          
            
            if(globalStore.signals[last]['LAT']!=-1000)
            {
                let html ='<b>'+last+' Energy Triumph</b><br>';

                for (let p=0;p<params.length;p++)
                {
                    //if (globalStore.signals[timeStamps[i]][params[p]]!=-1000)
                    html += globalStore.mapping[params[p]]+': '+ globalStore.signals[last][params[p]].toFixed(2)+' ['+globalStore.units[params[p]]+']<br>';
                   // else  html += globalStore.mapping[params[p]]+': - ['+globalStore.units[params[p]]+']<br>';
                }
                
                html +='Faults: 0<br>Tickets: -'

                this.vesselData['points'].push({
                    'coords':[ globalStore.signals[last]['LON'], globalStore.signals[last]['LAT']],
                    'html':html
                });
            }

            console.log(this.vesselData['points']);
            // else
            // {
            //     this.vesselData['points'].push({
            //         lat:globalStore.signals[timestamp]['LAT'],
            //         lng:globalStore.signals[timestamp]['LON'],
            //         tooltip:'Energy Triumph'
            //     });

            // }

            // this.$set(this.vesselData,'route',[]);
            
            // let timeStamps = Object.keys(globalStore.signals);

            // if (timeStamps.indexOf('average')>-1)
            //     timeStamps.splice(timeStamps.indexOf('average'),1);
            

            // for (let i=0;i<timeStamps.length;i++)
            // {
            //     this.vesselData.route.push({
            //         lat:globalStore.signals[timeStamps[i]]['LAT'],
            //         lng:globalStore.signals[timeStamps[i]]['LON']
            //     });
            // }
            
            this.$set(this.vesselData,'showMap',true);

            //KPIs
            
            let cylCount =6;
            let tcCount =1;

            this.$set(this.engineData, 'engineColor',globalStore.reference[timestamp]['eng_KPI_color']);

            let kpi = globalStore.reference[timestamp]['eng_KPI']*100;

            if (kpi.toFixed(1)!='100.0') this.$set(this.engineData, 'engineKPI',kpi.toFixed(1));
            else this.$set(this.engineData, 'engineKPI',kpi.toFixed(0));

            this.engineData.cylinders=[];

            for (let c=1;c<=cylCount;c++)
                this.engineData.cylinders.push(globalStore.reference[timestamp]['cyl'+c+'_KPI_color']);

            let names = ['Turbines','Compressors','A/F','A/C'];
            let tags = ['turb','comp','ac','af'];

            this.engineData.elements=[];

            for (let el=0;el<names.length;el++)
            {
                let sum=0;
                
                for (let t=1;t<=tcCount;t++)
                {
                    sum+=globalStore.reference[timestamp][tags[el]+t+'_KPI_color'];   
                }

                this.engineData.elements.push({
                            name:names[el],
                            color:sum/tcCount});           
            }

            names = [['Servo Oil','Exhaust Gas','Piston Running'],['Fuel Injection','Scavenge Air','Automation & Control']];
            tags = [['so_KPI_color','egs_KPI_color','pr_KPI_color'],['fi_KPI_color','sac_KPI_color','ca_KPI_color']];

            for (let col =0;col<names.length;col++)
            {
                let column = [];

                for (let sys =0;sys<names[col].length;sys++)
                {
                    column.push({
                        system:names[col][sys],
                        value:globalStore.reference[timestamp][tags[col][sys]]});
                }

                this.subSystemData.push(column);
            }

            //gauges
            this.$set(this.gaugeData, 'load', {
                value:globalStore.signals[timestamp]['load']*100,
                rangeLimit:100,
                startValue:10,
                endValue:110,
                tickInterval:10,
                format:1,
                unit:'[%]',
                title:'Load'
            });

            this.$set(this.gaugeData, 'ensp', {
                value:globalStore.signals[timestamp]['ensp'],
                rangeLimit:75,
                startValue:15,
                endValue:90,
                tickInterval:15,
                format:1,
                unit:'[rpm]',
                title:'Engine Speed'
            });

            this.$set(this.gaugeData, 'bsfc', {
                value:globalStore.signals[timestamp]['bsfc'],
                rangeLimit:190,
                startValue:150,
                endValue:210,
                tickInterval:10,
                format:1,
                unit:'[g/kWh]',
                title:'SFOC'
            });

            //performance Data
            params=['pcomp', 'pmax','tcspeed', 'tTurbIn','pscav','bsfc'];
            let refs = ['pcomp', 'pmax','tcspeed', 'tTurbIn','pscav','bsfc'];
            let elCount=[cylCount,cylCount, tcCount,tcCount, 0,0];
            
            for (let p=0;p<params.length;p++)
            {
                let val, rfr;

                if (elCount[p]>0)
                    val = this.average(params[p], elCount[p], globalStore.signals, timestamp);
                else 
                    val = globalStore.signals[timestamp][params[p]];
                
                 if (elCount[p]>0)
                    rfr = this.average(refs[p], elCount[p], globalStore.reference, timestamp);
                else 
                    rfr = globalStore.reference[timestamp][refs[p]];

                let color =-10;

                if ((val!=-1000)&&(rfr!=-1000)&&(Object.keys(globalStore.limits).includes(params[p])))
                {
                    let minLimit = globalStore.limits[params[p]][0], maxLimit = globalStore.limits[params[p]][1];

                    let temp = ( (val -  rfr)/val) * 100;

                    if ((temp > minLimit) && (temp < maxLimit)) color=0;
                    else color =20;
                }

                this.$set(this.cardData,params[p],{
                    value:val,
                    ref: rfr,
                    title:globalStore.mapping[params[p]],
                    unit:globalStore.units[params[p]],
                    format:2,
                    color:color
                }); 
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
                this.setData();}); 
        }
    }

}
</script>

<style scoped>

</style>
