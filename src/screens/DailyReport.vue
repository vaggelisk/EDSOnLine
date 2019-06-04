<template>
    <div style="overflow:auto;height:100%;">
        <v-container fluid fill-height grid-list-md style="padding:5px;width:80%;">
            <v-layout fill-height column>
                <v-flex style="min-height:400px;">
                    <v-layout row fill-height>
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
                 <v-flex style="min-height:400px;">
                    <v-layout row fill-height>
                        <v-flex d-flex md7>
                            <FaultsWidget
                                v-bind:navigation="false"/>
                        </v-flex>
                        <v-flex d-flex m5>
                            <LoadDiagram
                                v-if="active"
                                v-bind:flat="true"
                                v-bind:active="active"
                                v-bind:chartData="loadDiagram" />
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex style="min-height:1000px;">
                    <v-card flat style="height:100%;">
                        <v-card-title  style="height:5%;width:100%;padding-top:5px;padding-bottom:5px; font-size: 24px !important;
                                                        font-weight: 500; line-height: 1 !important;letter-spacing: 0.02em !important; color:rgb(51,82,128);">Engine</v-card-title>
                        <v-card-actions fill-height style="height:95%;width:100%;padding-top:0px;padding-bottom:0px;">
                            <v-layout fill-height column>
                                <v-flex d-flex md3>
                                    <v-layout row fill-height>
                                        <v-flex d-flex md6>
                                            <TimelineChart
                                                v-bind:active="active"
                                                v-bind:chartOptions="chartData['ensp']"
                                                v-bind:title="titles['ensp']"/>
                                        </v-flex>
                                        <v-flex d-flex md6>
                                            <TimelineChart
                                                v-bind:active="active"
                                                v-bind:chartOptions="chartData['load']"
                                                v-bind:title="titles['load']"/>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                                <v-flex d-flex md3>
                                    <v-layout row fill-height>
                                        <v-flex d-flex md6>
                                            <TimelineChart
                                                v-bind:active="active"
                                                v-bind:chartOptions="chartData['shaftP']"
                                                v-bind:title="titles['shaftP']"/>
                                        </v-flex>
                                        <v-flex d-flex md6>
                                            <TimelineChart
                                                v-bind:active="active"
                                                v-bind:chartOptions="chartData['bsfc']"
                                                v-bind:title="titles['bsfc']"/>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                                <v-flex d-flex md3>
                                    <v-layout row fill-height>
                                        <v-flex d-flex md6>
                                            <TimelineChart
                                                v-bind:active="active"
                                                v-bind:chartOptions="chartData['pscav']"
                                                v-bind:title="titles['pscav']"/>
                                        </v-flex>
                                        <v-flex d-flex md6>
                                            <TimelineChart
                                                v-bind:active="active"
                                                v-bind:chartOptions="chartData['tscav']"
                                                v-bind:title="titles['tscav']"/>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                                <v-flex d-flex md3>
                                    <v-layout row fill-height>
                                        <v-flex d-flex md6>
                                            <TimelineChart
                                                v-bind:active="active"
                                                v-bind:chartOptions="chartData['soPresDispl']"
                                                v-bind:title="titles['soPresDispl']"/>
                                        </v-flex>
                                        <v-flex d-flex md6>
                                            <TimelineChart
                                                v-bind:active="active"
                                                v-bind:chartOptions="chartData['fRailPres']"
                                                v-bind:title="titles['fRailPres']"/>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </v-card-actions>
                    </v-card>
                </v-flex>
                <v-flex v-for="n in cylCount" :key="n" style="min-height:500px;">
                    <v-card flat style="height:100%;">
                        <v-card-title  style="height:10%;width:100%;padding-top:5px;padding-bottom:5px; font-size: 24px !important;
                                                        font-weight: 500; line-height: 1 !important;letter-spacing: 0.02em !important; color:rgb(51,82,128);">Cylinder {{n}}</v-card-title>
                        <v-card-actions fill-height style="height:90%;width:100%;padding-top:0px;padding-bottom:0px;">
                            <v-layout column fill-height>
                                <v-flex d-flex md6>
                                    <v-layout row>
                                        <v-flex d-flex md6>
                                            <TimelineChart
                                                v-bind:active="active"
                                                v-bind:chartOptions="chartData['pcomp'+n]"
                                                v-bind:title="titles['pcomp']"/>
                                        </v-flex>
                                        <v-flex d-flex md6>
                                            <TimelineChart
                                                v-bind:active="active"
                                                v-bind:chartOptions="chartData['pmax'+n]"
                                                v-bind:title="titles['pmax']"/>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                                <v-flex d-flex md6>
                                    <v-layout row>
                                        <v-flex d-flex md6>
                                            <TimelineChart
                                                v-bind:active="active"
                                                v-bind:chartOptions="chartData['pmaxPcomp'+n]"
                                                v-bind:title="titles['pmaxPcomp']"/>
                                        </v-flex>
                                        <v-flex d-flex md6>
                                            <TimelineChart
                                                v-bind:active="active"
                                                v-bind:chartOptions="chartData['tExhC'+n]"
                                                v-bind:title="titles['tExhC']"/>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>

                        </v-card-actions>
                    </v-card>
                </v-flex>
                <v-flex v-for="n in tcCount" :key="n" style="min-height:500px;">
                    <v-card flat style="height:100%;">
                        <v-card-title  style="height:10%;width:100%;padding-top:5px;padding-bottom:5px; font-size: 24px !important;
                                                        font-weight: 500; line-height: 1 !important;letter-spacing: 0.02em !important; color:rgb(51,82,128);">T/C {{n}}</v-card-title>
                        <v-card-actions fill-height style="height:90%;width:100%;padding-top:0px;padding-bottom:0px;">
                            <v-layout column fill-height>
                                <v-flex d-flex md6>
                                    <v-layout row>
                                        <v-flex d-flex md6>
                                            <TimelineChart
                                                v-bind:active="active"
                                                v-bind:chartOptions="chartData['tcspeed'+n]"
                                                v-bind:title="titles['tcspeed']"/>
                                        </v-flex>
                                        <v-flex d-flex md6>
                                            <TimelineChart
                                                v-bind:active="active"
                                                v-bind:chartOptions="chartData['tTurbIn'+n]"
                                                v-bind:title="titles['tTurbIn']"/>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                                <v-flex d-flex md6>
                                    <v-layout row>
                                        <v-flex d-flex md6>
                                            <TimelineChart
                                                v-bind:active="active"
                                                v-bind:chartOptions="chartData['tcTbroilIn'+n]"
                                                v-bind:title="titles['tcTbroilIn']"/>
                                        </v-flex>
                                        <v-flex d-flex md6>
                                            <TimelineChart
                                                v-bind:active="active"
                                                v-bind:chartOptions="chartData['tcTbroilO'+n]"
                                                v-bind:title="titles['tcTbroilO']"/>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>


                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>

import TimelineChart from  '../controls/TimelineChart'
import LoadDiagram from  '../controls/LoadDiagram'

import EngineState from '../controls/EngineState'
import SubsystemState from '../controls/SubsystemState'
import FaultsWidget from '../controls/FaultsWidget'
import Gauge from '../controls/Gauge'

import {globalStore} from "../main.js"

  export default {
    name: "Daily Report",
    components: {
        TimelineChart,
        LoadDiagram,
        EngineState,
        SubsystemState,
        FaultsWidget,
        Gauge
    },
    data () {
      return {
        chartData:{},
        titles:{},
        subSystemData:[],
        engineData:{
            cylinders:[],
            elements:[],
            engineKPI:0,
            engineColor:0
        },
        loadDiagram:{},
        gaugeData:{},
        cylCount:6,
        tcCount:1,
        active:false
      }
    },
    created() {
    },
    computed: {
        dataLoaded: function () { return globalStore.type; },
        // active: function()
        // {
        //     if (this.$route.name=="Daily Report")
        //     {
        //         console.log('true');
        //         return true;
        //     }
        //     else
        //     {
        //         console.log('false');
        //          return false;}
        // }
    },
    mounted() {

        this.active = false;

        let params=['ensp','shaftP','load','pscav','tscav','soPresDispl','fRailPres','bsfc',
        'pcomp', 'pmax','pmaxPcomp','tExhC','tcspeed', 'tTurbIn', 'tcTbroilIn', 'tcTbroilO'];

        for (let p=0;p<params.length;p++)
        {
            // for (let c=1;c<=this.cylCount;c++)
            // {
                this.$set(this.titles,params[p]/*+c*/,globalStore.mapping[params[p]]/*+' '+c*/);
            //}

        }

        this.active = true;

        this.setData();

    },
    methods: {
        setData()
        {

            let timeStamps = Object.keys(globalStore.signals);

            let timestamp = timeStamps[timeStamps.length-1];

            if (timeStamps.indexOf('average')>-1)
                timeStamps.splice(timeStamps.indexOf('average'),1);

            this.$set(this.engineData, 'engineColor',globalStore.reference[timestamp]['eng_KPI_color']);

            let kpi = globalStore.reference[timestamp]['eng_KPI']*100;

            if (kpi.toFixed(1)!='100.0') this.$set(this.engineData, 'engineKPI',kpi.toFixed(1));
            else this.$set(this.engineData, 'engineKPI',kpi.toFixed(0));

            this.engineData.cylinders=[];

            for (let c=1;c<=this.cylCount;c++)
                this.engineData.cylinders.push(globalStore.reference[timestamp]['cyl'+c+'_KPI_color']);

            let names = ['Turbines','Compressors','A/F','A/C'];
            let tags = ['turb','comp','ac','af'];

            this.engineData.elements=[];

            for (let el=0;el<names.length;el++)
            {
                let sum=0;

                for (let t=1;t<=this.tcCount;t++)
                {
                    sum+=globalStore.reference[timestamp][tags[el]+t+'_KPI_color'];
                }

                this.engineData.elements.push({
                            name:names[el],
                            color:sum/this.tcCount});
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

            let params=['ensp','shaftP','load','bsfc','pscav','tscav','soPresDispl','fRailPres'];
            let refs = ['','shaftP','','bsfc','pscav','tscav','soPresSetpoint','fRailPresSet'];

            for (let p=0;p<params.length;p++)
            {
                this.$set(this.chartData,params[p],{
                    time:{
                        useUTC:false
                    },
                    chart:{
                        height:500,
                        zoomType: 'xy'
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
                        text:'['+globalStore.units[params[p]]+']',
                        align:'high'
                        }
                    },
                    tooltip:{
                        formatter: function () {
                            return this.points.reduce(function (s, point) {
                            if (point.series.type=='line')
                            {
                                return s + '<br/>' + point.series.name + ': ' + point.y.toFixed(2);
                            }
                            else
                            {
                                return s + '<br/>' + point.series.name + ': ' + point.point.low.toFixed(2) + ' - ' + point.point.high.toFixed(2);
                            }
                            }, '<b>' + new Date(this.x).toTimeString().substring(0,5) + '</b>');
                        },
                        shared:true
                    },
                    legend:{
                        enabled:false
                    },
                    title:{
                        text:undefined
                    },
                    series: [{
                        name:'Value',
                        type:'line',
                        color:'transparent',
                        animation: false,
                        data:[],
                        marker:
                        {
                            radius:3
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
                        name:'Acceptable Range',
                        type:'arearange',
                        animation: false,
                        data:[],
                        marker:{
                            enabled:false
                        },
                        color:'rgb(219, 219, 219)',
                        fillOpacity: 0.6,
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
                    let val,rfr ;

                    val= globalStore.signals[timeStamps[i]][params[p]];

                    if (params[p]=='fRailPres') rfr =  globalStore.signals[timeStamps[i]][refs[p]];
                    else if ((Object.keys(globalStore.reference).includes(timeStamps[i]))&&(refs[p]!=''))
                    {
                        rfr = globalStore.reference[timeStamps[i]][refs[p]];
                    }
                    else rfr =-1000;

                    let color = 'rgb(51,82,128)';

                    let dt = new Date(timeStamps[i]);

                    if ((val!=-1000)&&(rfr!=-1000)&&(Object.keys(globalStore.limits).includes(params[p])))
                    {
                        let minLimit = globalStore.limits[params[p]][0], maxLimit = globalStore.limits[params[p]][1];

                        if ((minLimit!=null)&&(maxLimit!=null))
                        {

                            let temp = ( (val -  rfr)/val) * 100;

                            if ((temp > minLimit) && (temp < maxLimit)) color='rgb(60, 171, 48)';
                            else color ='rgb(205, 57, 64)';

                            let min = rfr/(1 - minLimit/100);
                            let max = rfr/(1 - maxLimit/100);

                            this.chartData[params[p]].series[1].data.push({
                                x:dt,
                                low:min,
                                high:max});
                        }
                    }

                    if (val!=-1000)
                        this.chartData[params[p]].series[0].data.push({
                            x:dt,
                            y:val,
                            color:color
                        });


                    }

            }

            params=['pcomp', 'pmax','pmaxPcomp','tExhC'];
            refs =['pcomp', 'pmax','pmaxPcomp','tExhC'];

            for (let c=1;c<=this.cylCount;c++)
            {
                for (let p=0;p<params.length;p++)
                {
                    this.$set(this.chartData,params[p]+c,{
                        time:{
                            useUTC:false
                        },
                        chart:{
                            height:500,
                            zoomType: 'xy'
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
                            text:'['+globalStore.units[params[p]]+']',
                            align:'high'
                            }
                        },
                        tooltip:{
                            formatter: function () {
                                return this.points.reduce(function (s, point) {
                                if (point.series.type=='line')
                                {
                                    return s + '<br/>' + point.series.name + ': ' + point.y.toFixed(2);
                                }
                                else
                                {
                                    return s + '<br/>' + point.series.name + ': ' + point.point.low.toFixed(2) + ' - ' + point.point.high.toFixed(2);
                                }
                                }, '<b>' + new Date(this.x).toTimeString().substring(0,5) + '</b>');
                            },
                            shared:true
                        },
                        legend:{
                            enabled:false
                        },
                        title:{
                            text:undefined
                        },
                        series: [{
                            name:'Value',
                            type:'line',
                            color:'transparent',
                            animation: false,
                            data:[],
                            marker:
                            {
                                radius:3
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
                            name:'Acceptable Range',
                            type:'arearange',
                            animation: false,
                            data:[],
                            marker:{
                                enabled:false
                            },
                            color:'rgb(219, 219, 219)',
                            fillOpacity: 0.6,
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
                        let val,rfr ;

                        val= globalStore.signals[timeStamps[i]][params[p]+c];

                        if (Object.keys(globalStore.reference).includes(timeStamps[i]))
                            rfr = globalStore.reference[timeStamps[i]][refs[p]+c];
                        else rfr =-1000;

                        // if (params[p]=='fRailPres') rfr =  globalStore.signals[timeStamps[i]][refs[p]];
                        // else if (Object.keys(globalStore.reference).includes(timeStamps[i]))
                        // {
                        //     if (elCount[p]==0) rfr = globalStore.reference[timeStamps[i]][refs[p]];
                        //     else rfr = this.average(refs[p], elCount[p],globalStore.reference,timeStamps[i]);
                        // }

                        let color = 'rgb(51,82,128)';

                        let dt = new Date(timeStamps[i]);

                        if ((val!=-1000)&&(rfr!=-1000)&&(Object.keys(globalStore.limits).includes(params[p])))
                        {
                            let minLimit = globalStore.limits[params[p]][0], maxLimit = globalStore.limits[params[p]][1];

                            if ((minLimit!=null)&&(maxLimit!=null))
                            {

                                let temp = ( (val -  rfr)/val) * 100;

                                if ((temp > minLimit) && (temp < maxLimit)) color='rgb(60, 171, 48)';
                                else color ='rgb(205, 57, 64)';

                                let min = rfr/(1 - minLimit/100);
                                let max = rfr/(1 - maxLimit/100);

                                this.chartData[params[p]+c].series[1].data.push({
                                    x:dt,
                                    low:min,
                                    high:max});
                            }
                        }

                        if (val!=-1000)
                            this.chartData[params[p]+c].series[0].data.push({
                                x:dt,
                                y:val,
                                color:color
                            });


                        }

                    }

            }

            params=['tcspeed', 'tTurbIn', 'tcTbroilIn', 'tcTbroilO'];
            refs =['tcspeed', 'tTurbIn', 'tcTbroilIn', 'tcTbroilO'];

            for (let c=1;c<=this.tcCount;c++)
            {
                for (let p=0;p<params.length;p++)
                {
                    this.$set(this.chartData,params[p]+c,{
                        time:{
                            useUTC:false
                        },
                        chart:{
                            height:500,
                            zoomType: 'xy'
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
                            text:'['+globalStore.units[params[p]]+']',
                            align:'high'
                            }
                        },
                        tooltip:{
                            formatter: function () {
                                return this.points.reduce(function (s, point) {
                                if (point.series.type=='line')
                                {
                                    return s + '<br/>' + point.series.name + ': ' + point.y.toFixed(2);
                                }
                                else
                                {
                                    return s + '<br/>' + point.series.name + ': ' + point.point.low.toFixed(2) + ' - ' + point.point.high.toFixed(2);
                                }
                                }, '<b>' + new Date(this.x).toTimeString().substring(0,5) + '</b>');
                            },
                            shared:true
                        },
                        legend:{
                            enabled:false
                        },
                        title:{
                            text:undefined
                        },
                        series: [{
                            name:'Value',
                            type:'line',
                            color:'transparent',
                            animation: false,
                            data:[],
                            marker:
                            {
                                radius:3
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
                            name:'Acceptable Range',
                            type:'arearange',
                            animation: false,
                            data:[],
                            marker:{
                                enabled:false
                            },
                            color:'rgb(219, 219, 219)',
                            fillOpacity: 0.6,
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
                        let val,rfr ;

                        val= globalStore.signals[timeStamps[i]][params[p]+c];

                        if (Object.keys(globalStore.reference).includes(timeStamps[i]))
                            rfr = globalStore.reference[timeStamps[i]][refs[p]+c];
                        else rfr =-1000;

                        // if (params[p]=='fRailPres') rfr =  globalStore.signals[timeStamps[i]][refs[p]];
                        // else if (Object.keys(globalStore.reference).includes(timeStamps[i]))
                        // {
                        //     if (elCount[p]==0) rfr = globalStore.reference[timeStamps[i]][refs[p]];
                        //     else rfr = this.average(refs[p], elCount[p],globalStore.reference,timeStamps[i]);
                        // }

                        let color = 'rgb(51,82,128)';

                        let dt = new Date(timeStamps[i]);

                        if ((val!=-1000)&&(rfr!=-1000)&&(Object.keys(globalStore.limits).includes(params[p])))
                        {
                            let minLimit = globalStore.limits[params[p]][0], maxLimit = globalStore.limits[params[p]][1];

                            if ((minLimit!=null)&&(maxLimit!=null))
                            {

                                let temp = ( (val -  rfr)/val) * 100;

                                if ((temp > minLimit) && (temp < maxLimit)) color='rgb(60, 171, 48)';
                                else color ='rgb(205, 57, 64)';

                                let min = rfr/(1 - minLimit/100);
                                let max = rfr/(1 - maxLimit/100);

                                this.chartData[params[p]+c].series[1].data.push({
                                    x:dt,
                                    low:min,
                                    high:max});
                            }
                        }

                        if (val!=-1000)
                            this.chartData[params[p]+c].series[0].data.push({
                                x:dt,
                                y:val,
                                color:color
                            });


                        }

                    }

            }

            this.setLoadDiagram();

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
                
        },
        setLoadDiagram()
        {
            this.loadDiagram = {
                chart:{
                    height:340
                },
                legend:{
                    enabled:true
                },
                tooltip:{
                    formatter: function () {
                        return this.points.reduce(function (s, point) {
                            return s + '<br/>' + point.series.name + ': ' + point.y.toFixed(0);
                        }, '<b>' + this.x + ' rpm</b>');
                    },
                    shared:true
                },
                title:{
                    text:undefined
                },
                xAxis:
                {
                    title:
                    {
                    text:'Engine speed [rpm]',
                    align:'high'
                    },
                    crosshair:true
                },
                yAxis:{
                    title:
                    {
                    text:'Shaft power [kW]',
                    align:'high'
                    }
                },
                series: [{
                    name:'Measured',
                    type:'scatter',
                    data:[],
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
                },
                {
                    name:'Reference',
                    type:'scatter',
                    data: [],
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
                },
                {
                    name:'Shop Tests',
                    type:'spline',
                    data:[],
                    animation: false,
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
                    name:'Sea Trials',
                    type:'line',
                    data:[],
                    animation: false,
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
                    name:'Engine Limit',
                    type:'line',
                    data: [] ,
                    animation: false,
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
            }

            var temp = Object.keys(globalStore.reference);

            let timestamp = temp[temp.length-1];

            this.loadDiagram.series[0].data =[[globalStore.signals[timestamp]['ensp'],globalStore.signals[timestamp]['shaftP']]];
            this.loadDiagram.series[1].data =[[globalStore.signals[timestamp]['ensp'],globalStore.reference[timestamp]['shaftP']]];

            this.loadDiagram.series[2].data=[];
            for (let i=0;i<globalStore.loadDiagram.spVal1.length;i++)
            {
                this.loadDiagram.series[2].data.push([globalStore.loadDiagram['spVal1'][i],globalStore.loadDiagram['spVal7'][i]])
            }

            this.loadDiagram.series[3].data=[];
            for (let i=0;i<globalStore.loadDiagram.stVal1.length;i++)
            {
                this.loadDiagram.series[3].data.push([globalStore.loadDiagram['stVal1'][i],globalStore.loadDiagram['stVal2'][i]])
            }

            this.loadDiagram.series[4].data=[];

            let rpmMin = globalStore.loadDiagram['otVal3'];
            let rpmMcr = globalStore.loadDiagram['otVal2'];
            let mcr97 =  globalStore.loadDiagram['otVal4'];
            let mcr =    globalStore.loadDiagram['otVal1'];
            let rpm105 = globalStore.loadDiagram['otVal5'];

            let RPMStep = 5.0;

            let load = (globalStore.signals[timestamp]['shaftP']/ mcr) * 100;

            this.loadDiagram.series[4].data.push([rpmMin, 0]);

            let aPWR;
            let aRPM = rpmMin;

            do
            {
                aPWR = mcr97 * Math.pow((aRPM / (0.97 * rpmMcr)), 2.0);
                this.loadDiagram.series[4].data.push([aRPM, aPWR ]);
                aRPM = aRPM + RPMStep;
            } while (aRPM <= 0.97 * rpmMcr);

            this.loadDiagram.series[4].data.push([ 0.97 * rpmMcr, mcr97 ]);
            this.loadDiagram.series[4].data.push([ rpmMcr, mcr ]);

            this.loadDiagram.series[4].data.push([ rpm105, mcr ]);

            this.loadDiagram.series[4].data.push([ rpm105, 0 ]);

        }

    },
    watch:
    {
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
