import axios         from 'axios';
import router from './router'
import {globalStore}            from "./main.js"

const API_URL = 'http://localhost:8092';
const API_URL_REMOTE = 'http://eds2.propulsionanalytics.com';

export class getData {

    constructor(){
        // this.getConstants();

        this.getFaults();

        this.getFilterAlerts();

        this.getConstantsFromRemote();

        this.getLastUpdate();
    }

    getFilterAlerts()
    {
        axios.get(API_URL_REMOTE+'/rule').then(response => {
            globalStore.alertFilters = response.data;
        })

    }

    getFaults()
    {
      axios.get(API_URL_REMOTE+'/fault/fakeFaults').then(response => {
        globalStore.faults = JSON.parse(response.data).aggrEvents;
      })

    }

    getConstants()
    {
        axios.get(API_URL+'/GetWiDEData/limits').then(response => {
            globalStore.limits = response.data;
        });

        axios.get(API_URL+'/GetWiDEData/mapping').then(response => {
            globalStore.mapping = response.data;
        });

        axios.get(API_URL+'/GetWiDEData/units').then(response => {
            globalStore.units = response.data;
        });

        axios.get(API_URL+'/GetWiDEData/loadDiagram').then(response => {
            globalStore.loadDiagram = response.data;
        });

        axios.get(API_URL+"/EDSEvents/60" ).then(response => {
            globalStore.events = response.data;
        });

    }

    getConstantsFromRemote()
    {
        axios.get(API_URL_REMOTE+'/GetWiDEData/const/limits').then(response => {
            globalStore.limits = JSON.parse(response.data.data.limits);

        });

        axios.get(API_URL_REMOTE+'/GetWiDEData/const/mapping').then(response => {
            globalStore.mapping = JSON.parse(response.data.data.mapping);
        });

        axios.get(API_URL_REMOTE+'/GetWiDEData/const/units').then(response => {
            globalStore.units =  JSON.parse( response.data.data.units );
        });

        axios.get(API_URL_REMOTE+'/GetWiDEData/const/loadDiagram').then(response => {
            globalStore.loadDiagram = JSON.parse(response.data.data.loadDiagram);
        });

        this.getMapData();

        // axios.get(API_URL+"/GetWiDEData/faultData" ).then(response => {
        //     var list=[];

        //     var faults = JSON.parse(response.data.faults);

        //     for (var f in faults)
        //         list.push(JSON.parse(faults[f]));

        //     globalStore.faults = list;
        // });

        // axios.get(API_URL+"/GetWiDEData/dashboardData" ).then(response => {
        //     var obj = JSON.parse(response.data.sigs);

        //     obj.date = new Date(response.data.signalDate);

        //     globalStore.dashboard =obj;
        // });

    }

    getMapData()
    {
        let points ={
            "20190410": {
              "date": "20190410",
              "coords": [
                23.24929354166668,
                34.04302239583331
              ],
              "color": 0,
              "html": "<b>2019-04-11 Energy Triumph</b><br>Power: 41.19 [%]<br>Crank Shaft Rotational Speed: 57.78 [rpm]<br>Speed Through Water: 12.77 [kn]<br>Faults: 0<br>Tickets: -",
              "status": "running"
            },
            "20190411": {
              "date": "20190411",
              "coords": [
                29.185041145833313,
                32.79866333333325
              ],
              "color": 0,
              "html": "<b>2019-04-12 Energy Triumph</b><br>Power: 41.86 [%]<br>Crank Shaft Rotational Speed: 58.00 [rpm]<br>Speed Through Water: 12.78 [kn]<br>Faults: 0<br>Tickets: -",
              "status": "running"
            },
            "20190412": {
              "date": "20190412",
              "coords": [
                32.32169968749994,
                31.471265937500004
              ],
              "color": 0,
              "html": "<b>2019-04-13 Energy Triumph</b><br>Power: 36.43 [%]<br>Crank Shaft Rotational Speed: 53.45 [rpm]<br>Speed Through Water: 11.63 [kn]<br>Faults: 0<br>Tickets: -",
              "status": "running"
            },
            "20190413": {
              "date": "20190413",
              "coords": [
                32.99630468750012,
                28.614972604166567
              ],
              "color": 0,
              "html": "<b>2019-04-14 Energy Triumph</b><br>Power: 34.83 [%]<br>Crank Shaft Rotational Speed: 51.10 [rpm]<br>Speed Through Water: 9.75 [kn]<br>Faults: 0<br>Tickets: -",
              "status": "running"
            },
            "20190414": {
              "date": "20190414",
              "coords": [
                35.91851666666669,
                24.339285729166626
              ],
              "color": 0,
              "html": "<b>2019-04-15 Energy Triumph</b><br>Power: 38.02 [%]<br>Crank Shaft Rotational Speed: 56.47 [rpm]<br>Speed Through Water: 12.58 [kn]<br>Faults: 0<br>Tickets: -",
              "status": "running"
            },
            "20190415": {
              "date": "20190415",
              "coords": [
                -1000,
                -1000
              ],
              "color": 0,
              "html": "<b>2019-04-16 Energy Triumph</b><br>Power: 41.95 [%]<br>Crank Shaft Rotational Speed: 58.41 [rpm]<br>Speed Through Water: 13.03 [kn]<br>Faults: 0<br>Tickets: -",
              "status": "running"
            },
            "20190416": {
              "date": "20190416",
              "coords": [
                41.350804687499945,
                15.825190312500002
              ],
              "color": 0,
              "html": "<b>2019-04-17 Energy Triumph</b><br>Power: 45.75 [%]<br>Crank Shaft Rotational Speed: 59.30 [rpm]<br>Speed Through Water: 12.54 [kn]<br>Faults: 0<br>Tickets: -",
              "status": "running"
            },
            "20190417": {
              "date": "20190417",
              "coords": [
                44.130838020833245,
                12.231196041666813
              ],
              "color": 0,
              "html": "<b>2019-04-18 Energy Triumph</b><br>Power: 51.09 [%]<br>Crank Shaft Rotational Speed: 60.96 [rpm]<br>Speed Through Water: 12.51 [kn]<br>Faults: 0<br>Tickets: -",
              "status": "running"
            },
            "20190418": {
              "date": "20190418",
              "coords": [
                49.10812802083325,
                13.117861145833437
              ],
              "color": 0,
              "html": "<b>2019-04-19 Energy Triumph</b><br>Power: 47.21 [%]<br>Crank Shaft Rotational Speed: 59.99 [rpm]<br>Speed Through Water: 12.68 [kn]<br>Faults: 0<br>Tickets: -",
              "status": "running"
            },
            "20190419": {
              "date": "20190419",
              "coords": [
                54.28389156250001,
                14.366255729166626
              ],
              "color": 0,
              "html": "<b>2019-04-20 Energy Triumph</b><br>Power: 43.57 [%]<br>Crank Shaft Rotational Speed: 58.72 [rpm]<br>Speed Through Water: 12.85 [kn]<br>Faults: 0<br>Tickets: -",
              "status": "running"
            },
            "20190420": {
              "date": "20190420",
              "coords": [
                59.32344125,
                12.715841874999938
              ],
              "color": 0,
              "html": "<b>2019-04-21 Energy Triumph</b><br>Power: 43.79 [%]<br>Crank Shaft Rotational Speed: 58.93 [rpm]<br>Speed Through Water: 12.86 [kn]<br>Faults: 0<br>Tickets: -",
              "status": "running"
            },
            "20190421": {
              "date": "20190421",
              "coords": [
                64.30258229166643,
                11.060906666666625
              ],
              "color": 0,
              "html": "<b>2019-04-22 Energy Triumph</b><br>Power: 44.58 [%]<br>Crank Shaft Rotational Speed: 59.41 [rpm]<br>Speed Through Water: 12.88 [kn]<br>Faults: 0<br>Tickets: -",
              "status": "running"
            },
            "20190422": {
              "date": "20190422",
              "coords": [
                69.3511440625,
                9.373102812500008
              ],
              "color": 0,
              "html": "<b>2019-04-23 Energy Triumph</b><br>Power: 41.83 [%]<br>Crank Shaft Rotational Speed: 58.36 [rpm]<br>Speed Through Water: 12.82 [kn]<br>Faults: 0<br>Tickets: -",
              "status": "running"
            },
            "20190423": {
              "date": "20190423",
              "coords": [
                74.36509270833336,
                7.721238541666681
              ],
              "color": 0,
              "html": "<b>2019-04-24 Energy Triumph</b><br>Power: 41.23 [%]<br>Crank Shaft Rotational Speed: 58.01 [rpm]<br>Speed Through Water: 12.77 [kn]<br>Faults: 0<br>Tickets: -",
              "status": "running"
            },
            "20190424": {
              "date": "20190424",
              "coords": [
                79.35733687499999,
                6.169749791666662
              ],
              "color": 0,
              "html": "<b>2019-04-25 Energy Triumph</b><br>Power: 43.26 [%]<br>Crank Shaft Rotational Speed: 58.72 [rpm]<br>Speed Through Water: 12.65 [kn]<br>Faults: 0<br>Tickets: -",
              "status": "running"
            },
            "20190425": {
              "date": "20190425",
              "coords": [
                84.22281062500001,
                5.855689583333331
              ],
              "color": 0,
              "html": "<b>2019-04-26 Energy Triumph</b><br>Power: 47.25 [%]<br>Crank Shaft Rotational Speed: 60.27 [rpm]<br>Speed Through Water: 13.13 [kn]<br>Faults: 0<br>Tickets: -",
              "status": "running"
            },
            "20190426": {
              "date": "20190426",
              "coords": [
                89.44029427083323,
                6.083810520833325
              ],
              "color": 0,
              "html": "<b>2019-04-27 Energy Triumph</b><br>Power: 42.50 [%]<br>Crank Shaft Rotational Speed: 58.12 [rpm]<br>Speed Through Water: 12.52 [kn]<br>Faults: 0<br>Tickets: -",
              "status": "running"
            },
            "20190427": {
              "date": "20190427",
              "coords": [
                94.59218020833336,
                6.307414999999994
              ],
              "color": 0,
              "html": "<b>2019-04-28 Energy Triumph</b><br>Power: 50.07 [%]<br>Crank Shaft Rotational Speed: 60.09 [rpm]<br>Speed Through Water: 12.36 [kn]<br>Faults: 0<br>Tickets: -",
              "status": "running"
            },
            "20190428": {
              "date": "20190428",
              "coords": [
                99.34243947916663,
                4.178442187500006
              ],
              "color": 0,
              "html": "<b>2019-04-29 Energy Triumph</b><br>Power: 42.64 [%]<br>Crank Shaft Rotational Speed: 58.20 [rpm]<br>Speed Through Water: 12.42 [kn]<br>Faults: 0<br>Tickets: -",
              "status": "running"
            },
            "20190429": {
              "date": "20190429",
              "coords": [
                103.48481447916562,
                1.1401753125000063
              ],
              "color": 0,
              "html": "<b>2019-04-30 Energy Triumph</b><br>Power: 47.47 [%]<br>Crank Shaft Rotational Speed: 60.14 [rpm]<br>Speed Through Water: 13.01 [kn]<br>Faults: 0<br>Tickets: -",
              "status": "running"
            },
            "20190430": {
              "date": "20190430",
              "coords": [
                104.83528135416687,
                1.5659432291666626
              ],
              "color": 0,
              "html": "<b>2019-05-01 Energy Triumph</b><br>Power: 34.36 [%]<br>Crank Shaft Rotational Speed: 52.17 [rpm]<br>Speed Through Water: 11.11 [kn]<br>Faults: 0<br>Tickets: -",
              "status": "running"
            },
            "20190501": {
              "date": "20190501",
              "coords": [
                109.6159265624994,
                3.7044917708333434
              ],
              "color": 0,
              "html": "<b>2019-05-02 Energy Triumph</b><br>Power: 42.89 [%]<br>Crank Shaft Rotational Speed: 58.63 [rpm]<br>Speed Through Water: 12.86 [kn]<br>Faults: 0<br>Tickets: -",
              "status": "running"
            },
            "20190502": {
              "date": "20190502",
              "coords": [
                114.24842208333312,
                6.190390625
              ],
              "color": 0,
              "html": "<b>2019-05-03 Energy Triumph</b><br>Power: 40.64 [%]<br>Crank Shaft Rotational Speed: 57.61 [rpm]<br>Speed Through Water: 12.93 [kn]<br>Faults: 0<br>Tickets: -",
              "status": "running"
            },
            "20190503": {
              "date": "20190503",
              "coords": [
                118.92176541666814,
                8.374765104166661
              ],
              "color": 0,
              "html": "<b>2019-05-04 Energy Triumph</b><br>Power: 40.81 [%]<br>Crank Shaft Rotational Speed: 57.80 [rpm]<br>Speed Through Water: 12.79 [kn]<br>Faults: 0<br>Tickets: -",
              "status": "running"
            },
            "20190504": {
              "date": "20190504",
              "coords": [
                124.06826093749997,
                9.161268229166662
              ],
              "color": 0,
              "html": "<b>2019-05-05 Energy Triumph</b><br>Power: 43.91 [%]<br>Crank Shaft Rotational Speed: 59.35 [rpm]<br>Speed Through Water: 13.16 [kn]<br>Faults: 0<br>Tickets: -",
              "status": "running"
            },
            "20190505": {
              "date": "20190505",
              "coords": [
                128.38262447916688,
                11.267878958333375
              ],
              "color": 0,
              "html": "<b>2019-05-06 Energy Triumph</b><br>Power: 46.60 [%]<br>Crank Shaft Rotational Speed: 60.38 [rpm]<br>Speed Through Water: 13.25 [kn]<br>Faults: 0<br>Tickets: -",
              "status": "running"
            },
            "20190506": {
              "date": "20190506",
              "coords": [
                133.42060635416624,
                12.6812780208335
              ],
              "color": 0,
              "html": "<b>2019-05-07 Energy Triumph</b><br>Power: 45.59 [%]<br>Crank Shaft Rotational Speed: 59.88 [rpm]<br>Speed Through Water: 13.17 [kn]<br>Faults: 0<br>Tickets: -",
              "status": "running"
            },
            "20190507": {
              "date": "20190507",
              "coords": [
                138.4896059375006,
                13.995343750000002
              ],
              "color": 0,
              "html": "<b>2019-05-08 Energy Triumph</b><br>Power: 48.81 [%]<br>Crank Shaft Rotational Speed: 60.74 [rpm]<br>Speed Through Water: 13.08 [kn]<br>Faults: 0<br>Tickets: -",
              "status": "running"
            },
            "20190508": {
              "date": "20190508",
              "coords": [
                143.63790166666683,
                15.201622291666622
              ],
              "color": 0,
              "html": "<b>2019-05-09 Energy Triumph</b><br>Power: 47.43 [%]<br>Crank Shaft Rotational Speed: 60.08 [rpm]<br>Speed Through Water: 12.99 [kn]<br>Faults: 0<br>Tickets: -",
              "status": "running"
            },
            "20190509": {
              "date": "20190509",
              "coords": [
                148.91305552083378,
                16.432326458333375
              ],
              "color": 0,
              "html": "<b>2019-05-10 Energy Triumph</b><br>Power: 47.10 [%]<br>Crank Shaft Rotational Speed: 60.04 [rpm]<br>Speed Through Water: 13.00 [kn]<br>Faults: 0<br>Tickets: -",
              "status": "running"
            },
            "20190510": {
              "date": "20190510",
              "coords": [
                154.18523916666751,
                17.6181040625
              ],
              "color": 0,
              "html": "<b>2019-05-11 Energy Triumph</b><br>Power: 47.59 [%]<br>Crank Shaft Rotational Speed: 60.04 [rpm]<br>Speed Through Water: 12.84 [kn]<br>Faults: 0<br>Tickets: -",
              "status": "running"
            },
            "20190511": {
              "date": "20190511",
              "coords": [
                159.48384500000066,
                18.657437604166688
              ],
              "color": 0,
              "html": "<b>2019-05-12 Energy Triumph</b><br>Power: 48.10 [%]<br>Crank Shaft Rotational Speed: 60.05 [rpm]<br>Speed Through Water: 12.74 [kn]<br>Faults: 0<br>Tickets: -",
              "status": "running"
            },
            "20190512": {
              "date": "20190512",
              "coords": [
                164.8799978125,
                19.547952395833374
              ],
              "color": 0,
              "html": "<b>2019-05-13 Energy Triumph</b><br>Power: 47.50 [%]<br>Crank Shaft Rotational Speed: 60.04 [rpm]<br>Speed Through Water: 12.95 [kn]<br>Faults: 0<br>Tickets: -",
              "status": "running"
            },
            "20190513": {
              "date": "20190513",
              "coords": [
                170.5940778124994,
                20.10719229166675
              ],
              "color": 0,
              "html": "<b>2019-05-14 Energy Triumph</b><br>Power: 47.29 [%]<br>Crank Shaft Rotational Speed: 60.04 [rpm]<br>Speed Through Water: 13.10 [kn]<br>Faults: 0<br>Tickets: -",
              "status": "running"
            },
            "20190514": {
              "date": "20190514",
              "coords": [
                176.16664604166684,
                20.393290729166683
              ],
              "color": 0,
              "html": "<b>2019-05-15 Energy Triumph</b><br>Power: 44.17 [%]<br>Crank Shaft Rotational Speed: 58.65 [rpm]<br>Speed Through Water: 12.66 [kn]<br>Faults: 0<br>Tickets: -",
              "status": "running"
            },
            "20190515": {
              "date": "20190515",
              "coords": [
                -178.39532291666626,
                20.497955416666752
              ],
              "color": 0,
              "html": "<b>2019-05-16 Energy Triumph</b><br>Power: 46.98 [%]<br>Crank Shaft Rotational Speed: 59.79 [rpm]<br>Speed Through Water: 12.77 [kn]<br>Faults: 0<br>Tickets: -",
              "status": "running"
            },
            "20190516": {},
            "20190517": {},
            "20190518": {
              "date": "20190518",
              "coords": [
                -162.43019114583376,
                20.2971284375
              ],
              "color": 0,
              "html": "<b>2019-05-19 Energy Triumph</b><br>Power: 45.44 [%]<br>Crank Shaft Rotational Speed: 58.75 [rpm]<br>Speed Through Water: 12.36 [kn]<br>Faults: 0<br>Tickets: -",
              "status": "running"
            },
            "20190519": {},
            "20190520": {
              "date": "20190520",
              "coords": [
                -157.91443875,
                21.287250104166688
              ],
              "color": 0,
              "html": "<b>2019-05-21 Energy Triumph</b><br>Power: - [%]<br>Crank Shaft Rotational Speed: - [rpm]<br>Speed Through Water: - [kn]<br>Faults: 0<br>Tickets: -",
              "status": "running"
            },
            "20190521": {
              "date": "20190521",
              "coords": [
                -157.91112760416686,
                21.284393854166627
              ],
              "color": 0,
              "html": "<b>2019-05-22 Energy Triumph</b><br>Power: - [%]<br>Crank Shaft Rotational Speed: - [rpm]<br>Speed Through Water: - [kn]<br>Faults: 0<br>Tickets: -",
              "status": "running"
            },
            "20190522": {
              "date": "20190522",
              "coords": [
                -157.912884375,
                21.286837187500062
              ],
              "color": 0,
              "html": "<b>2019-05-23 Energy Triumph</b><br>Power: - [%]<br>Crank Shaft Rotational Speed: - [rpm]<br>Speed Through Water: - [kn]<br>Faults: 0<br>Tickets: -",
              "status": "running"
            },
            "20190523": {
              "date": "20190523",
              "coords": [
                -157.91564281249936,
                21.28676604166675
              ],
              "color": 0,
              "html": "<b>2019-05-24 Energy Triumph</b><br>Power: - [%]<br>Crank Shaft Rotational Speed: - [rpm]<br>Speed Through Water: - [kn]<br>Faults: 0<br>Tickets: -",
              "status": "running"
            },
            "20190524": {
              "date": "20190524",
              "coords": [
                -157.91687,
                21.286517500000002
              ],
              "color": 0,
              "html": "<b>2019-05-25 Energy Triumph</b><br>Power: - [%]<br>Crank Shaft Rotational Speed: - [rpm]<br>Speed Through Water: - [kn]<br>Faults: 0<br>Tickets: -",
              "status": "running"
            },
            "20190525": {
              "date": "20190525",
              "coords": [
                -158.08715125000003,
                21.26548656249994
              ],
              "color": 0,
              "html": "<b>2019-05-26 Energy Triumph</b><br>Power: 18.55 [%]<br>Crank Shaft Rotational Speed: 38.84 [rpm]<br>Speed Through Water: 5.06 [kn]<br>Faults: 0<br>Tickets: -",
              "status": "running"
            },
            "20190526": {
              "date": "20190526",
              "coords": [
                -158.08899937499876,
                21.272066562499997
              ],
              "color": 0,
              "html": "<b>2019-05-27 Energy Triumph</b><br>Power: - [%]<br>Crank Shaft Rotational Speed: - [rpm]<br>Speed Through Water: - [kn]<br>Faults: 0<br>Tickets: -",
              "status": "running"
            },
            "20190527": {
              "date": "20190527",
              "coords": [
                -158.08897281250125,
                21.27202291666669
              ],
              "color": 0,
              "html": "<b>2019-05-28 Energy Triumph</b><br>Power: - [%]<br>Crank Shaft Rotational Speed: - [rpm]<br>Speed Through Water: - [kn]<br>Faults: 0<br>Tickets: -",
              "status": "running"
            },
            "20190529": {
              "date": "20190529",
              "coords": [
                -154.68401927083315,
                17.30186427083319
              ],
              "color": 0,
              "html": "<b>2019-05-30 Energy Triumph</b><br>Power: 28.36 [%]<br>Crank Shaft Rotational Speed: 50.23 [rpm]<br>Speed Through Water: 11.50 [kn]<br>Faults: 0<br>Tickets: -",
              "status": "running"
            },
            "20190530": {
              "date": "20190530",
              "coords": [
                -151.01553031250063,
                14.800870312499999
              ],
              "color": 0,
              "html": "<b>2019-05-31 Energy Triumph</b><br>Power: 34.93 [%]<br>Crank Shaft Rotational Speed: 54.47 [rpm]<br>Speed Through Water: 12.21 [kn]<br>Faults: 0<br>Tickets: -",
              "status": "running"
            }
          };

        // let date = new Date(2019,3,10);

        // let today = new Date();

        // while (date<=today)
        // {
        //     date.setDate(date.getDate() + 1);

        //     let currDate = date.toISOString().substring(0,10).replace(/-/g,'');

        //     axios.get(API_URL_REMOTE+'/GetWiDEData/'+currDate+'/'+'_sig').then(response => {
        //         let sig = JSON.parse(response.data.data.sigs);

        //         var temp = Object.keys(sig);

        //         let timestamp = temp[temp.length-1];

        //         if (temp.indexOf('average')>-1)
        //             temp.splice(temp.indexOf('average'),1);

        //         let last = temp[temp.length-1];

        //         let params=['ME_Power_perc','ensp','STW'];
        //         let html ='<b>'+last.slice(0,10)+' Energy Triumph</b><br>';

        //         for (let p=0;p<params.length;p++)
        //         {
        //             if (sig[timestamp][params[p]]!=-1000)
        //                 html += globalStore.mapping[params[p]]+': '+ sig[timestamp][params[p]].toFixed(2)+' ['+globalStore.units[params[p]]+']<br>';
        //             else  html += globalStore.mapping[params[p]]+': - ['+globalStore.units[params[p]]+']<br>';
        //         }

        //         html +='Faults: 0<br>Tickets: -'

        //         points[currDate]= {
        //             'date':currDate,
        //             'coords':[sig[last]['LON'],sig[last]['LAT']],
        //             'color':0,
        //             'html':html,
        //             'status':'running'
        //         };
        //     });

        // }

        //console.log(points);
        globalStore.mapData = points;

    }

    getLastUpdate()
    {
        let url = API_URL+'/GetWiDEData/last';
        let url_remote = API_URL_REMOTE+'/GetWiDEData/last/';

        // this.getData(url);

        this.getDataFromRemote(url_remote, 'last');

        //globalStore.type = 'last';

    }

    getToday()
    {
        let url = API_URL+'/GetWiDEData/today';
        let url_remote = API_URL_REMOTE+'/GetWiDEData/today/';

        // this.getData(url);

        this.getDataFromRemote(url_remote,'today');

        //globalStore.type = 'today';
    }

    getDate(date)
    {
        // let url = API_URL+'/GetWiDEData/'+date;
        let url_remote = API_URL_REMOTE+'/GetWiDEData/'+date+'/';

        // this.getData(url);

        this.getDataFromRemote(url_remote, date);

        //globalStore.type = date;
    }

    getDataFromRemote(url_remote,type) {

        document.body.style.cursor = 'progress';

        if ((type=='today') || (type=='last'))
            axios.get(url_remote+'_sig').then(response => {
                globalStore.signals = JSON.parse(response.data.data.sigs);
                this.checkEngineStatus();
            });

        axios.get(url_remote+'_ref').then(response => {
            globalStore.reference = JSON.parse(response.data.data.reference);
            globalStore.type = type;
            document.body.style.cursor = 'default';
        });

    }

    getData(url)
    {
       axios.get(url+'_sig').then(response => {
            globalStore.signals = JSON.parse(response.data.sigs);
        });


        axios.get(url+'_ref').then(response => {
            globalStore.reference = JSON.parse(response.data.reference);
        });

    }

    checkDate(date)
    {
        document.body.style.cursor = 'progress';

        globalStore.checkedDate = false;
        globalStore.validDate = false;

        axios.get(API_URL_REMOTE+'/GetWiDEData/'+date+'/'+'_sig')
        .then(response => {
            globalStore.signals = JSON.parse(response.data.data.sigs);
            this.checkEngineStatus();
            globalStore.validDate = true;
            globalStore.checkedDate = true;
            document.body.style.cursor = 'default';
        })
        .catch(error => {
            globalStore.validDate = false;
            globalStore.checkedDate = true;
            document.body.style.cursor = 'default';
        });
    }

    checkEngineStatus()
    {
        var temp = Object.keys(globalStore.signals);

        let timestamp = temp[temp.length-1];

        let stateText = globalStore.signals[timestamp]['engineStateText'];

        if (stateText==undefined)
        {
            if (globalStore.signals[timestamp]['engineState']==-1000) router.push( { path:  'dashboard'} );
        }
        else
        {
            if ((stateText!='Running')&&(stateText!='Slowdown')) router.push( { path:  'dashboard'} );
        }

    }



}
