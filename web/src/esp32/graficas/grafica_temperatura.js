import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5radar from "@amcharts/amcharts5/radar";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

import {Get_Temperatura_API} from '../api_rest/endpoints'



export let generalGraficaTemperatura = ()=> {
    var root = am5.Root.new("chartdiv1");

    root.setThemes([
        am5themes_Animated.new(root)
    ]);


    var chart = root.container.children.push(am5radar.RadarChart.new(root, {
        panX: false,
        panY: false,
        startAngle: 160,
        endAngle: 380
    }));


    var axisRenderer = am5radar.AxisRendererCircular.new(root, {
        innerRadius: -40
    });

    axisRenderer.grid.template.setAll({
        stroke: root.interfaceColors.get("background"),
        visible: true,
        strokeOpacity: 0.8
    });

    var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
        maxDeviation: 0,
        min: 0,
        max: 50,
        strictMinMax: true,
        renderer: axisRenderer
    }));


    var axisDataItem = xAxis.makeDataItem({});

    var clockHand = am5radar.ClockHand.new(root, {
        pinRadius: am5.percent(20),
        radius: am5.percent(100),
        bottomWidth: 40
    })

    var bullet = axisDataItem.set("bullet", am5xy.AxisBullet.new(root, {
        sprite: clockHand
    }));

    xAxis.createAxisRange(axisDataItem);

    var label = chart.radarContainer.children.push(am5.Label.new(root, {
        fill: am5.color(0xffffff),
        centerX: am5.percent(50),
        textAlign: "center",
        centerY: am5.percent(50),
        fontSize: "3em"
    }));

    axisDataItem.set("value", 0);
        bullet.get("sprite").on("rotation", function () {
        var value = axisDataItem.get("value");
        var text = Math.round(axisDataItem.get("value")).toString();
        var fill = am5.color(0x000000);
        xAxis.axisRanges.each(function (axisRange) {
            if (value >= axisRange.get("value") && value <= axisRange.get("endValue")) {
            fill = axisRange.get("axisFill").get("fill");
            }
    })

    label.set("text", Math.round(value).toString());
        clockHand.pin.animate({ key: "fill", to: fill, duration: 500, easing: am5.ease.out(am5.ease.cubic) })
        clockHand.hand.animate({ key: "fill", to: fill, duration: 500, easing: am5.ease.out(am5.ease.cubic) })
    });

    setInterval(function () {
        var value = Get_Temperatura_API()
        axisDataItem.animate({
            key: "value",
            to: value,
            duration: 500,
            easing: am5.ease.out(am5.ease.cubic)
        });
    }, 2000)

    chart.bulletsContainer.set("mask", undefined);


    var bandsData = [ {
        title: "",
        color: "#5278d0",
        lowScore: 0,
        highScore: 10
        }, {
        title: "",
        color: "#3ccc8b",
        lowScore: 10,
        highScore: 35
        }, {
        title: "",
        color: "#ffa31e",
        lowScore: 35,
        highScore: 50
        }, 
    ];

    am5.array.each(bandsData, function (data) {
    var axisRange = xAxis.createAxisRange(xAxis.makeDataItem({}));

    axisRange.setAll({
        value: data.lowScore,
        endValue: data.highScore
    });

    axisRange.get("axisFill").setAll({
        visible: true,
        fill: am5.color(data.color),
        fillOpacity: 0.8
    });

    axisRange.get("label").setAll({
        text: data.title,
        inside: true,
        radius: 15,
        fontSize: "0.9em",
        fill: root.interfaceColors.get("background")
    });
    });


    // Make stuff animate on load
    chart.appear(1000, 100);
}