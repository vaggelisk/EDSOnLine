<template>
  <v-container fluid grid-list-md fill-height style="padding:0px 10px 5px 10px;width:100%;">
    <v-layout row v-if="userLogged">
        <v-flex d-flex md6>
            <v-layout column fill-height style="overflow:auto;">
                <DashboardCard
                    v-if="cardData.engineKPI"
                    v-bind:cardData="cardData">
                </DashboardCard>
            </v-layout>
        </v-flex>
        <v-flex d-flex md6>
            <Map 
                v-if="cardData['points']"
                v-bind:points="cardData['points']"                
                v-bind:route="cardData['route']"
                v-bind:zoom="2"/>
        </v-flex>
    </v-layout>
   <v-dialog v-model="dialog" persistent max-width="400px">
        <v-card>
          <v-card-title>
            <span class="headline">User Login</span>
            <!--<span class="headline">{{globalStore.type}}</span>-->
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout column>
                <v-flex md6>
                    <v-text-field v-model="email" label="Email"></v-text-field>
                </v-flex>
                <v-flex md6>
                    <v-text-field
                        v-model="password"
                        :append-icon="show ? 'visibility' : 'visibility_off'"
                        :type="show ? 'text' : 'password'"
                        label="Password"
                        @click:append="show = !show">
                    </v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="rgb(51,82,128)" flat @click="close()">Close</v-btn>
            <v-btn color="rgb(51,82,128)" flat @click="userLogin()">Login</v-btn>
          </v-card-actions>
            <v-alert
                class='alert'
                :value="alert"
                type="error"
                transition="scale-transition"
                color='rgb(205, 57, 64)'
                outline
                dismissible
                @input="closeAlert">
                The email and password you entered are not correct.
            </v-alert>
        </v-card>
      </v-dialog>
  </v-container>
</template>

<script>

import axios from 'axios'
import DashboardCard from '../controls/DashboardCard'
// import DashboardCardHor from '../controls/DashboardCardHor'
import Map from '../controls/Map'

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {globalStore} from "../main.js"

export default {
  name: "Dashboard",
  components: {
      DashboardCard,
      // DashboardCardHor,
      Map
   },
   data: function ()
   {
        return {
            cardData:{},
            dialog:false,
            email:'',
            password:'',
            show: false,
            alert:false
        }
    },
    created()
    {
    },
    computed: {
        userLogged: function () { return globalStore.userLogged; },
        dataLoaded: function () { return globalStore.type; }
    },
    mounted()
    {
        this.dialog = ! globalStore.userLogged;

        setTimeout(() => {
            this.setData();}, 400);
    },
    methods: {
        closeAlert(v) {
            this.alert = false;
        },
        userLogin()
        {
            // globalStore.userLogged = true;
            // this.dialog = false;
            // setTimeout(() => {
            //     this.setData();
            // }, 400);
            if (this.password.length <= 0) {
                this.alert = true;
            }
            else {
                axios.post('http://eds2.propulsionanalytics.com/login', {
                        email: this.email,
                        password: this.password,
                        },  {withCredentials: true}
                    )
                    .then(
                        (response) => {
                            if (response.status === 200) {

                                this.setAlerts(response.data.notifications);
                                globalStore.userLogged = true;
                                this.dialog = false;

                                setTimeout(() => {
                                    this.setData();
                                }, 400);
                            } else {
                                this.alert = true;
                            }
                        },
                        (error) => {
                            this.alert = true;
                        }
                    );
            }
        },
        close()
        {    
            this.dialog = false;
        }, 
        setDatawDashData()
        {
            // var temp = Object.keys(globalStore.reference);

            // let timestamp = temp[temp.length-1];

            // if (temp.indexOf('average')>-1)
            //     temp.splice(temp.indexOf('average'),1);

            // let last = temp[temp.length-1];


            this.$set(this.cardData, 'name', 'Energy Triumph');
            this.$set(this.cardData, 'lastUpdate',globalStore.dashboard.date.toISOString().slice(0, 10));

            // if ((globalStore.type != 'last')&&(globalStore.type != 'today'))
            // {
            //     this.cardData['lastUpdate'] = new Date(temp[temp.length-2]).toISOString().slice(0, 10);
            // }
            let params=['LAT','LON']

            for (let p=0;p<params.length;p++)
            {
                this.$set(this.cardData,params[p],{
                    label:globalStore.mapping[params[p]],
                    value:globalStore.dashboard[params[p]],
                    unit:'',
                    format:4
                });
            }

            params=['ME_Power_perc','ensp','STW'];

            for (let p=0;p<params.length;p++)
            {
                this.$set(this.cardData,params[p],{
                    label:globalStore.mapping[params[p]],
                    value:globalStore.dashboard[params[p]],
                    unit:'['+globalStore.units[params[p]]+']',
                    format:2
                });
            }

            this.$set(this.cardData,'engineState',{
                    label:'Engine State',
                    value:globalStore.dashboard['engineStateText'],
                    unit:'',
                    format:null,
                    state:globalStore.dashboard['engineState']
                });

            this.$set(this.cardData,'bsfc',{
                title:globalStore.mapping['bsfc'],
                unit:globalStore.units['bsfc'],
                value: globalStore.dashboard['bsfc'][globalStore.dashboard['bsfc'].length-1],
                format: 1
            });

            this.$set(this.cardData.bsfc,'chartOptions', {
                chart:{ backgroundColor:'transparent'},
                tooltip:{
                    formatter: function () {
                        return this.points.reduce(function (s, point) {
                            return s + '<br/>' + point.series.name + ': ' + point.y.toFixed(2);
                        },'');
                    },
                    shared:true
                },
                legend:{
                    enabled:true,
                    align: 'center',
                    verticalAlign: 'bottom',
                    layout: 'horizontal', },
                title:{ text:undefined },
                xAxis: { 
                    labels:{ enabled:false},
                    crosshair:true
                },
                yAxis: {
                    labels:{ enabled:false },
                    title:{ text:undefined}},
                series: [{
                    name:'Values',
                    type:'line',
                    data:[],
                    marker:{
                        enabled:false
                    },
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
                },
                {
                    name:'Ref',
                    type:'line',
                    data:[],
                    marker:{
                        enabled:false
                    },
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
            });

            for (let i=0;i<globalStore.dashboard['bsfcRef'].length;i++)
            {
                this.cardData.bsfc.chartOptions.series[0].data.push([i, globalStore.dashboard['bsfc'][i]]);

                this.cardData.bsfc.chartOptions.series[1].data.push([i, globalStore.dashboard['bsfcRef'][i]]);
            }

            this.$set(this.cardData,'sloc',{
                title:'SLOC',
                unit:globalStore.units['sloc'],
                value: globalStore.dashboard['sloc'][globalStore.dashboard['sloc'].length-1],
                format: 1
            });

            this.$set(this.cardData.sloc,'chartOptions', {
                chart:{ backgroundColor:'transparent'},                
                tooltip:{
                    formatter: function () {
                        return this.points.reduce(function (s, point) {
                            return s + '<br/>' + point.series.name + ': ' + point.y.toFixed(2);
                        },'');
                    },
                    shared:true
                },
                legend:{
                    enabled:true,
                    align: 'center',
                    verticalAlign: 'bottom',
                    layout: 'horizontal', },
                title:{ text:undefined },
                xAxis: { 
                    labels:{ enabled:false},
                    crosshair:true
                },
                yAxis: {
                    labels:{ enabled:false },
                    title:{ text:undefined}},
                series: [{
                    name:'Values',
                    type:'line',
                    data:[],
                    marker:{
                        enabled:false
                    },
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
                }
                ]
            });

            for (let i=0;i<globalStore.dashboard['sloc'].length;i++)
            {
                this.cardData.sloc.chartOptions.series[0].data.push([i, globalStore.dashboard['sloc'][i]]);

            }

            this.$set(this.cardData,'points',[]);

            if(globalStore.dashboard['LAT']!=-1000)
            {
                this.cardData['points'].push({
                    lat:globalStore.dashboard['LAT'],
                    lng:globalStore.dashboard['LON'],
                    tooltip:'Energy Triumph'
                });
            }
            // else
            // {
            //     this.cardData['points'].push({
            //         lat:globalStore.signals[timestamp]['LAT'],
            //         lng:globalStore.signals[timestamp]['LON'],
            //         tooltip:'Energy Triumph'
            //     });

            // }


            this.$set(this.cardData, 'engineColor',0);//globalStore.reference[timestamp]['eng_KPI_color']);

            let kpi = globalStore.dashboard['eng_KPI']*100;

            if (kpi.toFixed(1)!='100.0') this.$set(this.cardData, 'engineKPI',kpi.toFixed(1));
            else this.$set(this.cardData, 'engineKPI',kpi.toFixed(0));

            document.body.style.cursor = 'default';

        },
        setData()
        {
            var temp = Object.keys(globalStore.reference);

            let timestamp = temp[temp.length-1];

            if (temp.indexOf('average')>-1)
                temp.splice(temp.indexOf('average'),1);

            let last = temp[temp.length-1];


            this.$set(this.cardData, 'name', 'Energy Triumph');
            this.$set(this.cardData, 'lastUpdate',last);

            if ((globalStore.type != 'last')&&(globalStore.type != 'today'))
            {
                this.cardData['lastUpdate'] = new Date(temp[temp.length-2]).toISOString().slice(0, 10);
            }
            let params=['LAT','LON']

            for (let p=0;p<params.length;p++)
            {
                this.$set(this.cardData,params[p],{
                    label:globalStore.mapping[params[p]],
                    value:globalStore.signals[last][params[p]],
                    unit:'',
                    format:4
                });
            }

            params=['ME_Power_perc','ensp','STW'];

            for (let p=0;p<params.length;p++)
            {
                this.$set(this.cardData,params[p],{
                    label:globalStore.mapping[params[p]],
                    value:globalStore.signals[timestamp][params[p]],
                    unit:'['+globalStore.units[params[p]]+']',
                    format:2
                });
            }

            let nvg = true;
            let stateText = globalStore.signals[timestamp]['engineStateText'];

            if (stateText==undefined)
            {
                if (globalStore.signals[timestamp]['engineState']==-1000) nvg=false;
            }
            else 
            {
                if ((stateText!='Running')&&(stateText!='Slowdown')) nvg= false;
            }                

            this.$set(this.cardData,'engineState',{
                    label:'Engine State',
                    value:stateText,
                    unit:'',
                    format:null,
                    nav:nvg
                });
                
            this.$set(this.cardData,'faults',{
                label:'Faults',
                value:'0',
                unit:'',
                format:null
            });
            
            this.$set(this.cardData,'tickets',{
                label:'Tickets',
                value:'-',
                unit:'',
                format:null
            });

            this.$set(this.cardData,'version',{
                    label:'EDS Version',
                    value:'1.4.2.3',
                    unit:'',
                    format:null
                });
            this.$set(this.cardData,'bsfc',{
                title:globalStore.mapping['bsfc'],
                unit:globalStore.units['bsfc'],
                value: globalStore.signals[timestamp]['bsfc'],
                format: 1
            });

            this.$set(this.cardData.bsfc,'chartOptions', {
                time:{
                    useUTC:false
                },  
                chart:{ backgroundColor:'transparent'},
                tooltip:{
                    formatter: function () {
                        return this.points.reduce(function (s, point) {
                            return s + '<br/>' + point.series.name + ': ' + point.y.toFixed(2);
                        //}, '<b>' + this.x + '</b>');
                        }, '<b>' + new Date(this.x).toTimeString().substring(0,5) + '</b>');
                    },
                    shared:true
                },
                legend:{
                    enabled:true,
                    align: 'center',
                    verticalAlign: 'bottom',
                    layout: 'horizontal', },
                title:{ text:undefined },
                xAxis: { 
                    type:'datetime',
                    labels:{ enabled:false},
                    crosshair:true
                },
                yAxis: {
                    labels:{ enabled:false },
                    title:{ text:undefined}},
                series: [{
                    name:'Values',
                    type:'line',
                    data:[],
                    marker:{
                        enabled:false
                    },
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
                },
                {
                    name:'Ref',
                    type:'line',
                    data:[],
                    marker:{
                        enabled:false
                    },
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
            });

            let timeStamps = Object.keys(globalStore.signals);

            if (timeStamps.indexOf('average')>-1)
                timeStamps.splice(timeStamps.indexOf('average'),1);

            for (let i=0;i<timeStamps.length;i++)
            {
                
                let dt = new Date(timeStamps[i]);

                if (globalStore.signals[timeStamps[i]]['bsfc']!=-1000)
                    this.cardData.bsfc.chartOptions.series[0].data.push([dt, globalStore.signals[timeStamps[i]]['bsfc']]);

                if ((Object.keys(globalStore.reference).includes(timeStamps[i]))&&( globalStore.reference[timeStamps[i]]['bsfc']!=-1000))
                    this.cardData.bsfc.chartOptions.series[1].data.push([dt, globalStore.reference[timeStamps[i]]['bsfc']]);
            }


            this.$set(this.cardData,'sloc',{
                title:'SLOC',//globalStore.mapping['sloc'],
                unit:globalStore.units['sloc'],
                value: this.average('sloc',6, globalStore.signals, timestamp),
                format: 1
            });

            this.$set(this.cardData.sloc,'chartOptions', {
                chart:{ backgroundColor:'transparent'},                
                tooltip:{
                    formatter: function () {
                        return this.points.reduce(function (s, point) {
                            return s + '<br/>' + point.series.name + ': ' + point.y.toFixed(2);
                        }, '<b>' + new Date(this.x).toTimeString().substring(0,5) + '</b>');
                    },
                    shared:true
                },
                legend:{
                    enabled:true,
                    align: 'center',
                    verticalAlign: 'bottom',
                    layout: 'horizontal', },
                title:{ text:undefined },
                xAxis: { 
                    labels:{ enabled:false},
                    crosshair:true
                },
                yAxis: {
                    labels:{ enabled:false },
                    title:{ text:undefined}},
                series: [{
                    name:'Values',
                    type:'line',
                    data:[],
                    marker:{
                        enabled:false
                    },
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
                }
                ]
            });

            for (let i=0;i<timeStamps.length;i++)
            {
                let avg = this.average('sloc',6, globalStore.signals,timeStamps[i]);

                if(avg!=-1000)
                    this.cardData.sloc.chartOptions.series[0].data.push([timeStamps[i], avg]);
            }

            
            this.$set(this.cardData,'fcon',{
                title:globalStore.mapping['fcon'],
                unit:'t/day',//globalStore.units['fcon'],
                value: (24/1000)*globalStore.signals[timestamp]['fcon'],
                format: 1
            });

            this.$set(this.cardData.fcon,'chartOptions', {
                time:{
                    useUTC:false
                },  
                chart:{ backgroundColor:'transparent'},
                tooltip:{
                    formatter: function () {
                        return this.points.reduce(function (s, point) {
                            return s + '<br/>' + point.series.name + ': ' + point.y.toFixed(2);
                        //}, '<b>' + this.x + '</b>');
                        }, '<b>' + new Date(this.x).toTimeString().substring(0,5) + '</b>');
                    },
                    shared:true
                },
                legend:{
                    enabled:true,
                    align: 'center',
                    verticalAlign: 'bottom',
                    layout: 'horizontal', },
                title:{ text:undefined },
                xAxis: { 
                    type:'datetime',
                    labels:{ enabled:false},
                    crosshair:true
                },
                yAxis: {
                    labels:{ enabled:false },
                    title:{ text:undefined}},
                series: [{
                    name:'Values',
                    type:'line',
                    data:[],
                    marker:{
                        enabled:false
                    },
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
                },
                {
                    name:'Ref',
                    type:'line',
                    data:[],
                    marker:{
                        enabled:false
                    },
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
            });

            for (let i=0;i<timeStamps.length;i++)
            {
                
                let dt = new Date(timeStamps[i]);

                if (globalStore.signals[timeStamps[i]]['fcon']!=-1000)
                    this.cardData.fcon.chartOptions.series[0].data.push([dt, (24/1000)*globalStore.signals[timeStamps[i]]['fcon']]);

                if ((Object.keys(globalStore.reference).includes(timeStamps[i]))&&( globalStore.reference[timeStamps[i]]['fcon']!=-1000))
                    this.cardData.fcon.chartOptions.series[1].data.push([dt, (24/1000)*globalStore.reference[timeStamps[i]]['fcon']]);
            }

            //this.$set(this.cardData,'points',[]);

            // if(globalStore.signals[last]['LAT']!=-1000)
            // {
            //     this.cardData['points'].push({
            //         lat:globalStore.signals[last]['LAT'],
            //         lng:globalStore.signals[last]['LON'],
            //         tooltip:'Energy Triumph'
            //     });
            // }
            // else
            // {
            //     this.cardData['points'].push({
            //         lat:globalStore.signals[timestamp]['LAT'],
            //         lng:globalStore.signals[timestamp]['LON'],
            //         tooltip:'Energy Triumph'
            //     });

            // }

            this.$set(this.cardData,'points',[]);
            
            let now = new Date(last);

            for (let i=0;i<15;i++)
            {
                now.setDate(now.getDate() - 1);

                let currDate = now.toISOString().substring(0,10).replace(/-/g,'');       

                if (Object.keys(globalStore.mapData).includes(currDate))
                    this.cardData['points'].push(globalStore.mapData[currDate]);
            }
           // this.$set(this.cardData,'points',globalStore.mapData);

            this.$set(this.cardData,'route',[]);                        

            // for (let i=0;i<timeStamps.length;i++)
            // {
            //     this.cardData.route.push({
            //         lat:globalStore.signals[timeStamps[i]]['LAT'],
            //         lng:globalStore.signals[timeStamps[i]]['LON']
            //     });
            // }


            this.$set(this.cardData, 'engineColor',globalStore.reference[timestamp]['eng_KPI_color']);

            let kpi = globalStore.reference[timestamp]['eng_KPI']*100;

            if (kpi.toFixed(1)!='100.0') this.$set(this.cardData, 'engineKPI',kpi.toFixed(1));
            else this.$set(this.cardData, 'engineKPI',kpi.toFixed(0));

            document.body.style.cursor = 'default';           

        },
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
        setAlerts(notif)
        {
            for (let i=0;i<notif.length;i++)
            {
                var sel =  globalStore.faults.filter(function(item){
                      return item.fault == notif[i].faultName;
                }).filter(function(item){
                      return (item.element+" "+item.index) == notif[i].faultComponent;
                });

                console.log(sel);

                if (sel.length>0)
                {
                    for (let s=0;s<sel.length;s++)
                        globalStore.alerts.push({                    
                            Id:sel[s].Id,
                            Vessel:notif[i].faultVessel,
                            Engine:notif[i].faultEngine,
                            Component:notif[i].faultComponent,
                            Subsystem:sel[s].component,
                            Fault:notif[i].faultName,
                            Date:notif[i].faultDatetime.date
                        });

                }


                
            }

        }
    },
    watch: {
        userLogged : function() {

            if (this.userLogged) 
            { 
                // console.log('login');              

                // setTimeout(() => {
                //     axios.post('http://eds2.propulsionanalytics.com/profile').then(response => {
                //         console.log(response.status);
                //     });
                // }, 4000);
            }

            
            this.dialog = ! globalStore.userLogged;
        },
        dataLoaded : function()
        {
            setTimeout(() => {
                this.setData();
                
               });
        }
    }
}
</script>

<style scoped>
.alert
 {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width:300px;
    height:100px;
    background-color:white;
    /* color: rgb(33,33,33);
    background-color:transparent; */
}

</style>
