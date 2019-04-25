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
                v-bind:points="cardData['points']"
                v-bind:zoom="2"/>
        </v-flex>
    </v-layout>
   <v-dialog v-model="dialog" persistent max-width="400px">
        <v-card>
          <v-card-title>
            <span class="headline">User Login</span>
            <span class="headline">{{globalStore.type}}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout column>
                <v-flex md6>
                    <v-text-field v-model="username" label="Username"></v-text-field>
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
                dismissible>
                The username and password you entered are not correct.
            </v-alert>
        </v-card>
      </v-dialog>
  </v-container>
</template>

<script>


import DashboardCard from '../controls/DashboardCard'
import DashboardCardHor from '../controls/DashboardCardHor'
import Map from '../controls/Map'

import {globalStore} from "../main.js"

export default {
  name: "Dashboard",
  components: {
      DashboardCard,
      DashboardCardHor,
      Map
   },
   data: function ()
   {
        return {
            cardData:{},
            dialog:false,
            username:'',
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
        userLogin()
        {
            if((this.username=='admin')&&(this.password=='admin'))
            {
                globalStore.userLogged=true;
                this.dialog = false;

                 setTimeout(() => {
                    this.setData();}, 400);
            }
            else
            {
                this.alert=true;
            }
        },
        close()
        {
            this.dialog = false;
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

            this.$set(this.cardData,'engineState',{
                    label:'Engine State',
                    value:globalStore.signals[timestamp]['engineStateText'],
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
                chart:{ backgroundColor:'transparent'},
                tooltip:{ enabled:false },
                legend:{
                    enabled:true,
                    align: 'center',
                    verticalAlign: 'bottom',
                    layout: 'horizontal', },
                title:{ text:undefined },
                xAxis: { labels:{ enabled:false} },
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
                this.cardData.bsfc.chartOptions.series[0].data.push([timeStamps[i], globalStore.signals[timeStamps[i]]['bsfc']]);

                if (Object.keys(globalStore.reference).includes(timeStamps[i]))
                    this.cardData.bsfc.chartOptions.series[1].data.push([timeStamps[i], globalStore.reference[timeStamps[i]]['bsfc']]);
            }


            this.$set(this.cardData,'sloc',{
                title:'SLOC',//globalStore.mapping['sloc'],
                unit:globalStore.units['sloc'],
                value: this.average('sloc',6, globalStore.signals, timestamp),
                format: 1
            });

            this.$set(this.cardData.sloc,'chartOptions', {
                chart:{ backgroundColor:'transparent'},
                tooltip:{ enabled:false },
                legend:{
                    enabled:true,
                    align: 'center',
                    verticalAlign: 'bottom',
                    layout: 'horizontal', },
                title:{ text:undefined },
                xAxis: { labels:{ enabled:false} },
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
                this.cardData.sloc.chartOptions.series[0].data.push([timeStamps[i], this.average('sloc',6, globalStore.signals,timeStamps[i])]);
            }

            this.$set(this.cardData,'points',[]);

            if(globalStore.signals[last]['LAT']!=-1000)
            {
                this.cardData['points'].push({
                    lat:globalStore.signals[last]['LAT'],
                    lng:globalStore.signals[last]['LON'],
                    tooltip:'Energy Triumph'
                });
            }
            else
            {
                this.cardData['points'].push({
                    lat:globalStore.signals[timestamp]['LAT'],
                    lng:globalStore.signals[timestamp]['LON'],
                    tooltip:'Energy Triumph'
                });

            }


            this.$set(this.cardData, 'engineColor',globalStore.reference[timestamp]['eng_KPI_color']);
            this.$set(this.cardData, 'engineKPI',globalStore.reference[timestamp]['eng_KPI']*100);

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
        }
    },
    watch: {
        userLogged : function() {
            this.dialog = ! globalStore.userLogged;
        },
        dataLoaded : function()
        {
            setTimeout(() => {
                this.setData();}, 400);
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
