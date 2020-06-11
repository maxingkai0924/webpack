//初始化参数
//初始化方法

var rd = {
	_colorgradient: null,
	_type: null,
	//数据的大小
	_datawidth: 0,
	_dataheight: 0,
	//图层像素
	_imageData: null,
	//地图上绘制的矩形
	_rectangle: null,
	//画板容器
	_container: null,
	//画板
	_canvas: null,
	//画板内容
	_canvasctx: null,
	//图层
	_layer: new Array(),
	//透明度
	opacity: 1,

	//WGS84数据
	data: null,
	//WGS84数据范围
	bounds: null,

};
var BOUNDARY = 0.01;
var myMap;
var RD_OCEAN_COLOR_EL = [
	[30, [10, 25, 68]],


	[33, [10, 25, 250]],

	[33.5, [24, 255, 93]],

	[34, [255, 233, 102]],

	[34.5, [255, 233, 15]],
	 [34.5, [255, 233, 15]],
	  [34.5, [255, 233, 15]],
[34.5, [255, 233, 15]],
	 [35, [255, 15, 15]] 
]; 
var RD_OCEAN_COLOR_T = [
    [30, [10, 25, 68]],
    [30, [10, 25, 68]],
    [30, [10, 25, 68]],
    [33, [10, 25, 250]],
    [33, [10, 25, 250]],
    [33, [10, 25, 250]],
    [33.5, [24, 255, 93]],
    [33.5, [24, 255, 93]],
    [33.5, [24, 255, 93]],
    [34, [255, 233, 102]],
    [34, [255, 233, 102]],
    [34, [255, 233, 102]],
    [34.5, [255, 233, 15]],
    [34.5, [255, 233, 15]],
    [34.5, [255, 233, 15]],
    [35, [255, 15, 15]]
];
var mc = null;
var imgLayer;
var render = {
	drawstart: function(data, msg, arcMap) {
		myMap = arcMap;
		imgLayer = msg.imgLayer;
		rd._colorgradient = null;
		try {
			clearLayer();
		} catch (e) {}
		if (mc == null)
			//	mc = define_mapcom();
	
		var area = "";
		var bigArray = [];
		//        rd.clearColorBar();
		bigArray.push(data);
		
		setColorRange({
			max: data[0].header.uv[0],
			min: data[0].header.uv[1]
		});
		for (var i = 0; i < bigArray.length; i++) {
			var arr = bigArray[i];
			createLayer(arr);
		}
	}
};

function setColorRange(mostvalue) {
	RD_OCEAN_COLOR = RD_OCEAN_COLOR_EL
	var dif = parseFloat(mostvalue.max) - parseFloat(mostvalue.min);
	var dl = dif / RD_OCEAN_COLOR.length;
	for (var i = 0; i < RD_OCEAN_COLOR.length; i++) {
		RD_OCEAN_COLOR[i][0] = mostvalue.min + (dl * i);
	}
}
function clearLayer() {
	rd._container.parentElement.removeChild(rd._container);
	rd._container = null;
	for (var i = 0; i < rd._layer.length; i++) {
	}
	rd._layer.length = 0;
}
function createLayer(arr) {
	rd.data = arr[0].data;
	rd.bounds = {
		north: arr[0].header.la1,
		east: arr[0].header.lo1,
		south: arr[0].header.la2,
		west: arr[0].header.lo2
	};
	var west = rd.bounds.west > rd.bounds.east ? rd.bounds.east : rd.bounds.west;
	var south = rd.bounds.south > rd.bounds.north ? rd.bounds.north : rd.bounds.south;
	var east = rd.bounds.west > rd.bounds.east ? rd.bounds.west : rd.bounds.east;
	var north = rd.bounds.south > rd.bounds.north ? rd.bounds.south : rd.bounds.north;

	rd._datawidth = parseInt(arr[0].header.nx);
	rd._dataheight = parseInt(arr[0].header.ny);
	if (rd._container == null)
		rd._container = getContainer(rd._datawidth, rd._dataheight);
	rd._canvas = createcanvas(rd._container);
	rd._canvasctx = rd._canvas.getContext("2d");

	rd._imageData = rd._canvasctx.getImageData(0, 0, rd._datawidth, rd._dataheight);
	for (var i = 0; i < rd._datawidth; i++) {
		for (var j = 0; j < rd._dataheight; j++) {
			var ndata = null;
			var n = j * rd._datawidth + i;
			ndata = rd.data[n];
			if (ndata != null) {
				var colorgradient = null;

				colorgradient = segmentedColorScale(RD_OCEAN_COLOR);

				var rgba = colorgradient(ndata, 255);

				var m = (j * rd._imageData.width + i) * 4;
				rd._imageData.data[m] = rgba[0];
				rd._imageData.data[m + 1] = rgba[1];
				rd._imageData.data[m + 2] = rgba[2];
				rd._imageData.data[m + 3] = rgba[3];
			}
		}
	}
	rd._canvasctx.globalAlpha = 1;
	rd._canvasctx.putImageData(rd._imageData, 0, 0);
	//rd.rendCanvas.getContext("2d").putImageData(rd._imageData,0, 0);
	var img = convertCanvasToImage(rd._canvasctx);
	
	var MapImage = new esri.layers.MapImage({
		'extent': {
			'xmin': 99.5,
			'ymin': -13,//south,-9.5
			'xmax': east,
			'ymax': 49.5,//north,51.5
			'spatialReference': {
				'wkid': 4326  
			}
		},
		'href': img.src
	});
	
	imgLayer.addImage(MapImage)
	
}

function convertCanvasToImage(canvas) {
	var image = new Image();
	image.src = canvas.canvas.toDataURL("image/png");
	return image;
}

function createcanvas(c) {
	var e = document.createElement("canvas");
	
	e.width = rd._datawidth;
	e.height = rd._dataheight;
	//c.style.position = "relative";
	c.appendChild(e);
	c.style.display="none";
	return e;
}

function getContainer(width, height) {
	var c = document.createElement("div");
	c.setAttribute("style", "width: " + width + "px; height: " + height + "px; margin: 0px;");
	document.body.appendChild(c);
	return c;
};

function colorInterpolator(start, end) {
	var r = start[0],
		g = start[1],
		b = start[2];
	var Δr = end[0] - r,
		Δg = end[1] - g,
		Δb = end[2] - b;
	return function(i, a) {
		return [Math.floor(r + i * Δr), Math.floor(g + i * Δg), Math.floor(b + i * Δb), a];
	};
}

function segmentedColorScale(segments) {
	var points = [],
		interpolators = [],
		ranges = [];
	for (var i = 0; i < segments.length - 1; i++) {
		points.push(segments[i + 1][0]);
		interpolators.push(colorInterpolator(segments[i][1], segments[i + 1][1]));
		ranges.push([segments[i][0], segments[i + 1][0]]);
	}

	return function(point, alpha) {
		var i;
		for (i = 0; i < points.length - 1; i++) {
			if (point <= points[i]) {
				break;
			}
		}
		var range = ranges[i];
		return interpolators[i](proportion(point, range[0], range[1]), alpha);
	};
}

function clamp(x, low, high) {
	return Math.max(low, Math.min(x, high));
}

function proportion(x, low, high) {
	return (clamp(x, low, high) - low) / (high - low);
}
