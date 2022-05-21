import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5radar from "@amcharts/amcharts5/radar";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

import {Get_Humedad_API} from '../api_rest/endpoints'



export let generalGraficaHumedad = ()=> {
    
    var root = am5.Root.new("chartdiv");

    var chart = root.container.children.push(
        am5radar.RadarChart.new(root, {
          panX: false,
          panY: false,
          startAngle: 180,
          endAngle: 360
        })
    );
    
    root.setThemes([
        am5themes_Animated.new(root)
    ]);

    // Creara las etiquetas exteriores de la gráfica 
    // Generar el intervalo
      
    chart.getNumberFormatter().set("numberFormat", "#'%'");

    var axisRenderer = am5radar.AxisRendererCircular.new(root, {
        innerRadius: -40
    });

    axisRenderer.grid.template.setAll({
        stroke: root.interfaceColors.get("background"),
        visible: true,
        strokeOpacity: 0.8
    });

    var xAxis = chart.xAxes.push(
        am5xy.ValueAxis.new(root, {
          maxDeviation: 0,
          min: 0,
          max: 100,
          strictMinMax: true,
          renderer: axisRenderer
        })
    );

    // Generar el puntero

    var axisDataItem = xAxis.makeDataItem({});

    var clockHand = am5radar.ClockHand.new(root, {
        pinRadius: 50,
        radius: am5.percent(100),
        innerRadius: 50,
        bottomWidth: 0,
        topWidth: 0
    });
      
    clockHand.pin.setAll({
        fillOpacity: 0,
        strokeOpacity: 0.5,
        stroke: am5.color(0x000000),
        strokeWidth: 1,
        strokeDasharray: [2, 2]
    });
    clockHand.hand.setAll({
        fillOpacity: 0,
        strokeOpacity: 0.5,
        stroke: am5.color(0x000000),
        strokeWidth: 0.5
    });
      
    var bullet = axisDataItem.set(
        "bullet",
        am5xy.AxisBullet.new(root, {
          sprite: clockHand
        })
    );
      
    xAxis.createAxisRange(axisDataItem);

    //Generar el intervalo donde se posiciona el putero  

    var label = chart.radarContainer.children.push(
        am5.Label.new(root, {
          centerX: am5.percent(50),
          textAlign: "center",
          centerY: am5.percent(50),
          fontSize: "1.5em"
        })
      );
      
      axisDataItem.set("value", 0);
      bullet.get("sprite").on("rotation", function () {
        var value = axisDataItem.get("value");
        label.set("text", Math.round(value).toString() + "%");
      });

    //Creamos la animación para la gráfica
    setInterval(function () {

        var value = Get_Humedad_API()
      
        axisDataItem.animate({
          key: "value",
          to: value,
          duration: 500,
          easing: am5.ease.out(am5.ease.cubic)
        });
      
        axisRange0.animate({
          key: "endValue",
          to: value,
          duration: 500,
          easing: am5.ease.out(am5.ease.cubic)
        });
      
        axisRange1.animate({
          key: "value",
          to: value,
          duration: 500,
          easing: am5.ease.out(am5.ease.cubic)
        });
    }, 3000);
      
    chart.bulletsContainer.set("mask", undefined);
      
    var colorSet = am5.ColorSet.new(root, {});
      
    var axisRange0 = xAxis.createAxisRange(
        xAxis.makeDataItem({
          above: true,
          value: 0,
          endValue: 0
        })
    );
      
    axisRange0.get("axisFill").setAll({
        visible: true,
        fill: am5.color("#4e73df")
    });
      
    axisRange0.get("label").setAll({
        forceHidden: true
    });
      
    var axisRange1 = xAxis.createAxisRange(
        xAxis.makeDataItem({
          above: true,
          value: 0,
          endValue: 100
        })
    );
    
    axisRange1.get("axisFill").setAll({
        visible: true,
        fill: am5.color("#b2b7bf")
    });
      
    axisRange1.get("label").setAll({
        forceHidden: true
    });
      
      // Make stuff animate on load
    chart.appear(1000, 100);

    


}