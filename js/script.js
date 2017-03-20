function days(birthday){
	var dayOfBirth = birthday.valueOf();
	var today = new Date();
	today = today.valueOf();
	return Math.floor((today - dayOfBirth)/86400000);
}
function condition(days, biorhythm, birthday){
	var CON = new Array();
	var DATES = new Array();
	var dayOfMonth = birthday.getDate();
	for(var i = 0; i < days+16; i++){
		CON[i] = (Math.sin((i * Math.PI) / biorhythm*2));
		DATES[i] = birthday.valueOf()+(86400000*i);
	}
	var line = new Array();
	
	var d;
	var c;
	for (var i = 0; i < 32; i++){
		d = new Date(DATES[days-16+i]);
		d = (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate());
		c = CON[days-16+i];
		var nazwa = "line_"+i;
		var nazwa = new Array();
		nazwa[0] = d;
		nazwa[1] = c;
		line[i] = nazwa;
	}
		return line;
}
function drawChart(phy, men, int, today){
  var axis0Date0 = new Date(today-16*86400000);
  var axis0Date1 = new Date(axis0Date0.valueOf()+31*86400000);
  var phyLine=phy;
  var menLine=men;
  var intLine=int;
  var todayBar = [[today.toDateString(), -1], [today.toDateString(), 1]];
  var axis0 = [[axis0Date0.toDateString(), 0], [axis0Date1.toDateString(), 0]];
  	var plot1 = $.jqplot('chart', [todayBar, phyLine, menLine, intLine, axis0], {
    	title:'<h3>Today '+today.toLocaleDateString()+'</h3>',
    	seriesDefaults: {
            rendererOptions: {
            	smooth: true,
            	animation: {
            		show: true
            	}
            },
        showMarker: false
        },
    	series:[
    		{
                renderer: $.jqplot.BarRenderer,
                showHighlight: false,
                rendererOptions: {
                    barWidth: 10,
                    barPadding: -5,
                    barMargin: 0,
                    highlightMouseOver: false
                },
                color: 'lightgray'
            },
    		{
    			lineWidth:3,
    			color: 'red'
    		},
    		{
    			lineWidth:3,
    			color: 'green'
    		},
    		{
    			lineWidth:3,
    			color: 'blue'
    		},
    		{
    			lineWidth:1,
    			color: 'black'
    		}
    		],
    	axes:{
        	xaxis:{
        	    renderer:$.jqplot.DateAxisRenderer,
        	    tickInterval: "1 days",
        	    drawMajorGridlines: true,
        	    tickOptions: {
                    formatString: "%d",
                }
                },
            yaxis:{
        	    renderer: $.jqplot.LogAxisRenderer,
                pad: 1,
                tickOptions: {
                	formatString: " ",
                    showMark: false
                }
          	}
        },
    });
}
function chartPercentage(days, biorhythm){
	var condition = (Math.sin((days * Math.PI) / biorhythm*2));
	return Math.round(condition*100);
}
function chartPercentageShow(chartPercentage){
	var chartPercentage = chartPercentage;
	if (chartPercentage >= 0){
		$("#chartPercentage").append('<p class="legend-green">'+chartPercentage+'%</p>');
	} else {
		$("#chartPercentage").append('<p class="legend-red">'+chartPercentage+'%</p>');
	}
}

$(document).ready(function(){
	$(".graph").hide();
	var todayDate = new Date();
	var phy = 23.00,
		men = 28.00,
		int = 33.00;
	var birthday;
	$("#birthdayPicker").birthdayPicker();
	$("#checkDate").click(function(){
		if($(".birthDay").val() != ""){
			$("#error").html("");
			$("#chart").remove();
			$("#chartPercentage").remove();
			$(".graph").prepend('<div id="chart" class="jqplot-target"></div>');
			$(".legend-percentage").prepend('<div id="chartPercentage"></div>');
			$(".graph").show();

			birthday = new Date($(".birthDay").val());
			var phyLine = condition(days(birthday), phy, birthday),
				menLine = condition(days(birthday), men, birthday),
				intLine = condition(days(birthday), int, birthday);
				console.log(days(birthday));
			drawChart(phyLine, menLine, intLine, todayDate);
			chartPercentageShow(chartPercentage(days(birthday), phy));
			chartPercentageShow(chartPercentage(days(birthday), men));
			chartPercentageShow(chartPercentage(days(birthday), int));
		} else {
			$("#error").css("color", "red");
			$("#error").html("You must enter a full date");
		}
	});
});



