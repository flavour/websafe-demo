(function(){

var module = angular.module('map_service', []);

module.factory('MapFunctions', [
    '$rootScope',
    '$http',
    function ($rootScope, $http) {
        var geoserver_url = 'http://localhost:8080/geoserver/websafe/wms';

        // define some constants
        var map = $rootScope.map;
        var view = map.getView();
        var workspace = 'websafe:';
        var proj = 'EPSG:4326';
        var version = '1.1.1';

        return {
            addLayer : function(layer_name){
                var layer = new ol.layer.Image({
                    source: new ol.source.ImageWMS({
                        url: geoserver_url,
                        params: {
                            'SERVICE': 'WMS',
                            'VERSION': version,
                            'LAYERS': workspace + layer_name,
                            'SRS': proj
                        },
                        serverType: 'geoserver'
                    })
                });

                map.addLayer(layer);
            },

            getLayers : function(){
                var layers = [];

                map.getLayers().forEach(function(layer) {
                    /*
                    if (!(layer.source_ instanceof ol.source.OSM) &&
                        layer.get('metadata') &&
                        (layer.get('visible')) && // don't return layers that are not visible
                        !(layer.get('metadata').hidden) &&  // don't get 'internal' layers such as the feature modify vector layer
                        !(layer.get('metadata').differences_layer)){
                            layers.push(layer);
                    }
                    */
                    layers.push(layer);
                });

                return layers;
            },

            zoomToExtent : function(extent){
                var center = ol.extent.getCenter(extent);
                var duration = 2000;
                var start = +new Date();

                var pan = ol.animation.pan({
                    duration: duration,
                    source: map.getView().getCenter(),
                    start: start
                });

                var zoom = ol.animation.zoom({
                    duration: duration,
                    resolution: map.getView().getResolution()
                });

                map.beforeRender(zoom, pan);

                view.setResolution(75);
                view.setCenter(ol.proj.transform(center, 'EPSG:4326', 'EPSG:3857'));
            }
        }
    }
]);

})();