import axios         from 'axios';
import {globalStore}            from "./main.js"

const API_URL = 'http://localhost:8092';

export class getData {

    constructor( ){
        this.getConstants();

        this.getLastUpdate(); 
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

    }

    getLastUpdate()
    {
        let url = API_URL+'/GetWiDEData/last';

        this.getData(url);

        globalStore.type = 'last';

    }

    getToday()
    {
        let url = API_URL+'/GetWiDEData/today';
        
        this.getData(url);        

        globalStore.type = 'today';
    }

    getDate(date)
    {
        let url = API_URL+'/GetWiDEData/'+date;
        
        this.getData(url);

        globalStore.type = date;
    }

    getData(url)
    {
        axios.get(url+'_sig').then(response => {   
            globalStore.signals = JSON.parse(response.data.sigs);
            
            //console.log(url+' '+ response.data.sigs);
        });

        axios.get(url+'_ref').then(response => {   
            globalStore.reference = JSON.parse(response.data.reference);     

            //console.log(url+' '+response.data.reference);
        });

    }



}
