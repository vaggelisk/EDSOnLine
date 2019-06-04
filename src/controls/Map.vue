<template>
    <v-card flat fill-height style="height:100%;">
        <v-card-actions fill-height style="height:100%;">  
            <MglMap ref="map" :accessToken="accessToken" :mapStyle="style" :zoom="zoom" @movestart="moveStart" @moveend="moveEnd"> 
                <MglNavigationControl position="top-right" /> 
                <MglGeojsonLayer :layer="geoJsonlayer"/>       
                <!-- <MglMarker :coordinates="points[0]"  anchor="bottom" @click="navTo('Energy Triumph')">
                    <v-icon slot="marker" color="rgb(51,82,128)">directions_boat</v-icon>
                </MglMarker>          -->
                 
                <MglMarker v-for="(point,index) in points" :key="point" :coordinates="point.coords"  anchor="bottom"
                    @click="navTo('Energy Triumph', point.date)" @mouseenter="showPopUp(point)" @mouseleave="hidePopUp()">
                    <v-icon v-if="index==0" v-show="showMarkers" slot="marker" color="rgb(51,82,128)">directions_boat</v-icon>
                    <!-- <v-icon v-if="index==0" v-show="showMarkers" slot="marker" :color="getColor(point.color)" >directions_boat</v-icon> -->
                    <v-icon v-else size=10 v-show="showMarkers" slot="marker" :color="getColor(point.color)" >lens</v-icon>
                </MglMarker>           
            </MglMap>          
        </v-card-actions>
    </v-card>
</template>

<script>

    import Mapbox from "mapbox-gl";
    import { MglMap, MglNavigationControl, MglGeojsonLayer, MglMarker, MglPopup  } from "vue-mapbox";
    
    import {globalStore} from "../main.js"
    
    export default {
        name: "Map",
        components: {
            Mapbox,
            MglMap,
            MglNavigationControl,
            MglGeojsonLayer,
            MglMarker,
            MglPopup 
        },
        props: {
            points:Array,
            route:Array, 
            zoom:Number,
            center:Object
        },
        data: function () {
            return {                
                dot:require('../assets/blueDot.png'),
                dotRoute:require('../assets/blueDotRoute.png'),
                accessToken:'pk.eyJ1IjoicHJvcHVsc2lvbmFuYWx5dGljcyIsImEiOiJjanZ4eDRsbWcwNXFnM3lwMTRxdjY5ZzJhIn0.Oh-dFes1bd77Wnl68NoT9g',
                style: 'mapbox://styles/mapbox/streets-v10',
                showMarkers:false,
                geoJsonlayer:{
                    "id": "route",
                    "type": "line",
                    "source": {
                        "type": "geojson",
                        "data": {
                            "type": "Feature",
                            "properties": {},
                            "geometry": {
                                "type": "LineString",
                                "coordinates": []
                            }
                        }
                    },
                    "layout": {
                        "line-join": "round",
                        "line-cap": "round"
                    },
                    "paint": {
                        "line-color": "rgb(51,82,128)",
                        "line-width": 4
                    }
                }  

            }
        },
        methods: {
            navTo(vesselName, date)
            {         
                this.$refs['map'].map.getCanvas().style.cursor = 'progress';
                
                globalStore.mapDate = date;
                            
                setTimeout(() => {
                    globalStore.selectedVessel = vesselName;
                    this.$router.push( { path:  'vessel-view'} );   }, 1000); 
            }, 
            moveStart()
            {
                this.showMarkers = false;
            }, 
            moveEnd()
            {
                this.showMarkers = true;
            },
            getColor(clr)
            {
                if (clr==0) return 'rgb(60, 171, 48)';
                else if (clr==10) return 'rgb(255, 184, 29)';
                else return 'rgb(205, 57, 64)';

            },
            showPopUp(marker)
            {
                var popup = new mapboxgl.Popup({
                    maxWidth:'500px',
                    anchor:'top',
                    closeButton: false,
                    closeOnClick: false
                });

                popup.setLngLat(marker.coords)
                    .setHTML(marker.html)
                    .addTo(this.$refs['map'].map);
    
                this.$refs['popup']= popup;
            },
            hidePopUp()
            {
                this.$refs['popup'].remove();
                
            }
        },
        created()
        {
            this.mapbox = Mapbox;          
            

            
           
        },
        mounted() {

            if (this.route.length>0)
            {
                var data =  
                {
                    type: "Feature",
                    properties: {},
                    geometry: {
                        type: "LineString",
                        coordinates: []
                    }
                };

                data.geometry.coordinates=this.route.map(function (item) {
                    return item.coords;
                });

                
                 setTimeout(() => {
                     this.$refs['map'].map.getSource('route').setData(data);},2000);   

                console.log(data);

            }


            setTimeout(() => {
                this.$refs['map'].map.panTo(this.points[0].coords);},2000);            
            
        }, 
        watch:
        {
            points: function ()
            {
                setTimeout(() => {
                    this.$refs['map'].map.panTo(this.points[0].coords);});

            },
            route: function ()
            {
                var data =  
                {
                    type: "Feature",
                    properties: {},
                    geometry: {
                        type: "LineString",
                        coordinates: []
                    }
                };

                data.geometry.coordinates=this.route.map(function (item) {
                    return item.coords;
                });



                this.$refs['map'].map.getSource('route').setData(data);
                this.$refs['map'].map.panTo(data.geometry.coordinates[data.geometry.coordinates.length-1]);
               
            }
        }
    }
</script>

<style scoped>

</style>


 