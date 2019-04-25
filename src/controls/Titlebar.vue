<template>
    <v-toolbar fixed flat id="titleBar" :height=40 style="top:60px;">
        <div v-for="(item,index) in breadCrumbList" v-bind:key="item">        
            <div class="titleBtn" v-if="index>0">></div>
            <!-- <v-btn flat class="titleBtn" v-if="item=='User Settings'" v-on:click="navTo('Dashboard')">
                <v-icon dark left>arrow_back</v-icon>Back
            </v-btn> -->
            <v-btn flat class="titleBtn" v-show="userLogged" v-if="item=='Vessel View'" v-on:click="navTo(item)">{{selVessel}}</v-btn>
            <v-btn flat class="titleBtn"  v-show="userLogged" v-else v-on:click="navTo(item)"> {{item}}</v-btn>
        </div>
        <v-spacer />
        <div class="titleBtn" style="margin-right:10px;">{{timeStamp}}</div>
         <v-select v-show="userLogged" dark v-model="select" :items="dropDownList" flat solo primar
            background-color='rgb(51,82,128)'
            style="height:100%; max-width:200px; margin-top:15px; margin-bottom:5px; font-size:18px;">
        </v-select> 
        <v-dialog v-model="dialog" max-width="300px">
            <v-date-picker
                :allowed-dates="allowedDates"
                v-model="datePicked"
                color='rgb(51,82,128)'
                full-width/>         
        </v-dialog>   
    </v-toolbar>
</template>

<script>

import {globalStore} from "../main.js"
import {getData} from "../getData.js";

var apiService;

export default {
    name: 'Titlebar',
    components: {
    },
    props:
    {
    },
    created()
    {
        // this.datePicked = new Date().toISOString().slice(0,10);
        
        apiService = new getData( );

        this.select='Last Update';

        var temp = Object.keys(globalStore.reference);

        if (temp.indexOf('average')>-1)
            temp.splice(temp.indexOf('average'),1);

        this.timeStamp = temp[temp.length-1];

        
    },
    data () {
        return {
            allowedDateList:['2019-04-12','2019-04-13','2019-04-14','2019-04-15','2019-04-16','2019-04-17','2019-04-18'],
            breadCrumbList:['Dashboard'],
            dropDownList:['Last Update','Today','Select Date'],
            select:'',
            dialog:false ,
            datePicked: '',
            timeStamp:'test'
        }
    },
    computed: {    
        currPath: function () {
            return  this.$route.path;
        },        
        selVessel: function () { return globalStore.selectedVessel; },
        userLogged: function () { return globalStore.userLogged; }
    },
    watch: {
        currPath : function() {

            let name = this.$route.name;

            // if ((name=='Dashboard')||(name=='User Settings'))
            // {
            //     this.breadCrumbList =[];
            //     this.breadCrumbList.push(name);
            // }
            // else 
            if (this.breadCrumbList.includes(name))
            {
                let index = this.breadCrumbList.indexOf(name);

                this.breadCrumbList = this.breadCrumbList.slice(0,index+1);
            }
            else 
            {
                this.breadCrumbList.push(name);
            }

        },
        select:function()
        {
            if (this.select!='')
            { 
                if (this.select=='Select Date')
                {
                    this.dialog=true;
                }
                else 
                {
                    if (this.select=='Last Update') apiService.getLastUpdate();
                    else apiService.getToday();  
                    
                    setTimeout(() => {
                        var temp = Object.keys(globalStore.reference);

                        if (temp.indexOf('average')>-1)
                            temp.splice(temp.indexOf('average'),1);

                        this.timeStamp = temp[temp.length-1];}, 400); 
                }

                this.select = '';

            }

           

        
            
        },
        datePicked:function()
        {
            apiService.getDate(this.datePicked.replace(/-/g,''));
            
            this.dialog=false;

            
            setTimeout(() => {
                var temp = Object.keys(globalStore.reference);

                if (temp.indexOf('average')>-1)
                    temp.splice(temp.indexOf('average'),1);

                this.timeStamp = new Date(temp[temp.length-2]).toISOString().slice(0, 10);}, 400); 
        }
    },
    methods:
    {        
        navTo(screen)
        {
            this.$router.push( { name: screen  } )
        },
        allowedDates(val)
        {
            if (this.allowedDateList.includes(val)) return true;
            else return false;
        }
    }
}
</script>

<style scoped>
#titleBar
{
  background-color:rgb(244,244,244);
  padding:0px;  
  font-size: 24px;
  color:rgb(51,82,128);
}

.titleBtn
{
  color:rgb(51,82,128);
  font-size:20px;
  text-transform: none;     
  display: inline-block;
}
</style>

<style>

.v-input__slot 
{
    min-height:0px;
}

</style>