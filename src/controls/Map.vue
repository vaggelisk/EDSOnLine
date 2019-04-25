<template>
    <v-card flat fill-height style="height:100%;">
        <v-card-actions fill-height style="height:100%;">   
            <dx-map
                provider="bing"
                :zoom="zoom"
                height="100%"
                width="100%"
                :controls="false"
                :center="points[0]">                
                <dx-marker v-for="point in points" :key="point" :iconSrc="dot">
                    <dx-location :lat="point.lat" :lng="point.lng" />
                    <dx-tooltip :text="point.tooltip" />
                </dx-marker>
                <dx-marker v-for="point in route" :key="point" :iconSrc="dotRoute">
                    <dx-location :lat="point.lat" :lng="point.lng" />
                </dx-marker>
            </dx-map>
             <!-- <baidu-map style="width:100%; height:100%;"  ak="YOUR_APP_KEY"
                :center="{lng: 116.404, lat: 39.915}" :zoom="3" :scroll-wheel-zoom="true">
                <bm-point-collection 
                    :points="points" 
                    shape="BMAP_POINT_SHAPE_SQUARE" 
                    color="rgb(51,82,128)" 
                    size="BMAP_POINT_SIZE_NORMAL"/>
                <bm-label v-for="item in points" v-bind:key="item" 
                    :content="item.text"
                    :position="{lng: item.lng, lat: item.lat}"                    
                    :offset="{width: 5, height: 5}"
                    :labelStyle="{color: 'white', fontSize : '14px', border: 'rgb(51,82,128)', background: 'rgb(51,82,128)', padding:'5px'}"/>
            </baidu-map> -->
        </v-card-actions>
    </v-card>
</template>

<script>

    import {
        DxMap, DxMarker, DxLocation, DxTooltip, DxRoute 
    } from 'devextreme-vue/map';
    
    // import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
    // import {BmPolyline,BmPointCollection, BmLabel} from 'vue-baidu-map'

    export default {
        name: "Map",
        components: {
            // BaiduMap, 
            // BmPolyline,
            // BmPointCollection, 
            // BmLabel
            DxMap,
            DxMarker, 
            DxLocation, 
            DxTooltip, 
            DxRoute 
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
                dotRoute:require('../assets/blueDotRoute.png')
            }
        },
        methods: {
        },
        mounted() {
        }, 
        watch:
        {
        }
    }
</script>

<style scoped>
</style>


