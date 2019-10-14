//set the margins
var margin = {top: 50, right: 160, bottom: 80, left: 50},
width = 700 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

//set dek and head to be as wide as SVG
d3.select('#dek')
.style('width', width+'px');
d3.select('#headline')
.style('width',width+'px');

//write out your source text here
var sourcetext= "Source: Google Trend / Quandl";

// set the type of number here, n is a number with a comma, .2% will get you a percent, .2f will get you 2 decimal points
var NumbType = d3.format(".2f");

// color array
var bluescale4 = ["#8BA9D0", "#6A90C1", "#066CA9", "#004B8C"];

//color function pulls from array of colors stored in color.js
var color = d3.scale.ordinal().range(bluescale4);

//define the approx. number of x scale ticks
var xscaleticks = 5;

//defines a function to be used to append the title to the tooltip.  you can set how you want it to display here.
var maketip = function (d) {			               
var tip = '<p class="tip3">' + d.name + '<p class="tip1">' + NumbType(d.value) + '</p> <p class="tip3">'+  formatDate(d.date)+'</p>';
return tip;}

//define your year format here, first for the x scale, then if the date is displayed in tooltips
var parseDate = d3.time.format("%d.%m.%y").parse;
var formatDate = d3.time.format("%b %d, '%y");

//create an SVG
var svg = d3.select("#graphic").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");  

//make a rectangle so there is something to click on
svg.append("svg:rect")
.attr("width", width)
.attr("height", height)
.attr("class", "plot");

//make a clip path for the graph  
var clip = svg.append("svg:clipPath")
.attr("id", "clip")
.append("svg:rect")
.attr("x", 0)
.attr("y", 0)
.attr("width", width)
.attr("height", height);   

// force data to update when menu is changed    
var menu = d3.select("#menu select")
.on("change", change);    

//suck in the data, store it in a value called formatted, run the redraw function
d3.csv("/assets/2019-10-14/google-trend.csv", function(data) {
formatted = data;
redraw();
});

d3.select(window)
.on("keydown", function() { altKey = d3.event.altKey; })
.on("keyup", function() { altKey = false; });
var altKey;

// set terms of transition that will take place
// when a new economic indicator is chosen   
function change() {
d3.transition()
.duration(altKey ? 7500 : 1500)
.each(redraw);
}

// all the meat goes in the redraw function
function redraw() {

// create data nests based on economic indicator (series)
var nested = d3.nest()
.key(function(d) { return d.type; })
.map(formatted)

// get value from menu selection
// the option values are set in HTML and correspond
//to the [type] value we used to nest the data  
var series = menu.property("value");

// only retrieve data from the selected series, using the nest we just created
var data = nested[series];

// for object constancy we will need to set "keys", one for each type of data (column name) exclude all others.
color.domain(d3.keys(data[0]).filter(function(key) { return (key !== "date" && key !== "type"); }));

var linedata = color.domain().map(function(name) {
return {name: name,
values: data.map(function(d) {
return {name:name, date: parseDate(d.date), value: parseFloat(d[name],10)};
})
};
});


//make an empty variable to stash the last values into so i can sort the legend
var lastvalues=[];

//setup the x and y scales
var x = d3.time.scale()
.domain([
d3.min(linedata, function(c) { return d3.min(c.values, function(v) { return v.date; }); }),
d3.max(linedata, function(c) { return d3.max(c.values, function(v) { return v.date; }); })
])
.range([0, width]);

var y = d3.scale.linear()
.domain([
d3.min(linedata, function(c) { return d3.min(c.values, function(v) { return v.value; }); }),
d3.max(linedata, function(c) { return d3.max(c.values, function(v) { return v.value; }); })
])
.range([height, 0]);

//will draw the line		
var line = d3.svg.line()
.x(function(d) { return x(d.date); })
.y(function(d) { return y(d.value); });

//define the zoom
var zoom = d3.behavior.zoom()
.x(x)
.y(y)
.scaleExtent([1,8])
.on("zoom", zoomed);

//call the zoom on the SVG
svg.call(zoom);

//create and draw the x axis
var xAxis = d3.svg.axis()
.scale(x)
.orient("bottom")
.tickPadding(8)
.ticks(xscaleticks);

svg.append("svg:g")
.attr("class", "x axis");

//create and draw the y axis                  
var yAxis = d3.svg.axis()
.scale(y)
.orient("left")
.tickSize(0-width)
.tickPadding(8);

svg.append("svg:g")
.attr("class", "y axis");

//bind the data
var thegraph = svg.selectAll(".thegraph")
.data(linedata)

//append a g tag for each line and set of tooltip circles and give it a unique ID based on the column name of the data     
var thegraphEnter=thegraph.enter().append("g")
.attr("clip-path", "url(#clip)")
.attr("class", "thegraph")
.attr('id',function(d){ return d.name+"-line"; })
.style("stroke-width",2.5)
.on("mouseover", function (d) {                                  
d3.select(this)                          //on mouseover of each line, give it a nice thick stroke
.style("stroke-width",'6px');

var selectthegraphs = $('.thegraph').not(this);     //select all the rest of the lines, except the one you are hovering on and drop their opacity
d3.selectAll(selectthegraphs)
.style("opacity",0.2);

var getname = document.getElementById(d.name);    //use get element cause the ID names have spaces in them
var selectlegend = $('.legend').not(getname);    //grab all the legend items that match the line you are on, except the one you are hovering on

d3.selectAll(selectlegend)    // drop opacity on other legend names
.style("opacity",.2);

d3.select(getname)
.attr("class", "legend-select");  //change the class on the legend name that corresponds to hovered line to be bolder        	
})
.on("mouseout",	function(d) {        //undo everything on the mouseout
d3.select(this)
.style("stroke-width",'2.5px');

var selectthegraphs = $('.thegraph').not(this);
d3.selectAll(selectthegraphs)
.style("opacity",1);

var getname = document.getElementById(d.name);
var getname2= $('.legend[fakeclass="fakelegend"]')
var selectlegend = $('.legend').not(getname2).not(getname);

d3.selectAll(selectlegend)
.style("opacity",1);

d3.select(getname)
.attr("class", "legend");        	
});

//actually append the line to the graph
thegraphEnter.append("path")
.attr("class", "line")
.style("stroke", function(d) { return color(d.name); })
.attr("d", function(d) { return line(d.values[0]); })
.transition()
.duration(2000)
.attrTween('d',function (d){
var interpolate = d3.scale.quantile()
.domain([0,1])
.range(d3.range(1, d.values.length+1));
return function(t){
return line(d.values.slice(0, interpolate(t)));
};
});

//then append some 'nearly' invisible circles at each data point  
thegraph.selectAll("circle")
.data( function(d) {return(d.values);} )
.enter()
.append("circle")
.attr("class","tipcircle")
.attr("cx", function(d,i){return x(d.date)})
.attr("cy",function(d,i){return y(d.value)})
.attr("r",12)
.style('opacity', 1e-6)//1e-6
.attr ("title", maketip);

//append the legend
var legend = svg.selectAll('.legend')
.data(linedata);

var legendEnter=legend
.enter()
.append('g')
.attr('class', 'legend')
.attr('id',function(d){ return d.name; })
.on('click', function (d) {                           //onclick function to toggle off the lines        	
if($(this).css("opacity") == 1){				  //uses the opacity of the item clicked on to determine whether to turn the line on or off        	

var elemented = document.getElementById(this.id +"-line");   //grab the line that has the same ID as this point along w/ "-line"  use get element cause ID has spaces
d3.select(elemented)
.transition()
.duration(1000)
.style("opacity",0)
.style("display",'none');

d3.select(this)
.attr('fakeclass', 'fakelegend')
.transition()
.duration(1000)
.style ("opacity", .2);
} else {

var elemented = document.getElementById(this.id +"-line");
d3.select(elemented)
.style("display", "block")
.transition()
.duration(1000)
.style("opacity",1);

d3.select(this)
.attr('fakeclass','legend')
.transition()
.duration(1000)
.style ("opacity", 1);}
});

//create a scale to pass the legend items through
var legendscale= d3.scale.ordinal()
.domain(lastvalues)
.range([0,30,60,90,120,150,180,210]);

//actually add the circles to the created legend container
legendEnter.append('circle')
.attr('cx', width +20)
.attr('cy', function(d){return legendscale(d.values[d.values.length-1].value);})
.attr('r', 7)
.style('fill', function(d) {
return color(d.name);
});

//add the legend text
legendEnter.append('text')
.attr('x', width+35)
.attr('y', function(d){return legendscale(d.values[d.values.length-1].value);})
.text(function(d){ return d.name; });

// set variable for updating visualization
var thegraphUpdate = d3.transition(thegraph);

// change values of path and then the circles to those of the new series
thegraphUpdate.select("path")
.attr("d", function(d, i) {       

//must be a better place to put this, but this works for now
lastvalues[i]=d.values[d.values.length-1].value;         
lastvalues.sort(function (a,b){return b-a});
legendscale.domain(lastvalues);

return line(d.values); });

thegraphUpdate.selectAll("circle")
.attr ("title", maketip)
.attr("cy",function(d,i){return y(d.value)})
.attr("cx", function(d,i){return x(d.date)});


// and now for legend items
var legendUpdate=d3.transition(legend);

legendUpdate.select("circle")
.attr('cy', function(d, i){  
return legendscale(d.values[d.values.length-1].value);});

legendUpdate.select("text")
.attr('y',  function (d) {return legendscale(d.values[d.values.length-1].value);});


// update the axes,   
d3.transition(svg).select(".y.axis")
.call(yAxis);   

d3.transition(svg).select(".x.axis")
.attr("transform", "translate(0," + height + ")")
.call(xAxis);

//make my tooltips work
$('circle').tipsy({opacity:.9, gravity:'n', html:true});


//define the zoom function
function zoomed() {

svg.select(".x.axis").call(xAxis);
svg.select(".y.axis").call(yAxis);

svg.selectAll(".tipcircle")
.attr("cx", function(d,i){return x(d.date)})
.attr("cy",function(d,i){return y(d.value)});

svg.selectAll(".line")
.attr("class","line")
.attr("d", function (d) { return line(d.values)});
}

//end of the redraw function
}

svg.append("svg:text")
.attr("text-anchor", "start")
.attr ("x", 0-margin.left)
.attr("y", height+margin.bottom-10)
.text (sourcetext)
.attr ("class","source"); 	
# jquery.tipsy.js:
// tipsy, facebook style tooltips for jquery
// version 1.0.0a
// (c) 2008-2010 jason frame [jason@onehackoranother.com]
// released under the MIT license

(function($) {

    function maybeCall(thing, ctx) {
        return (typeof thing == 'function') ? (thing.call(ctx)) : thing;
    }

    // CAUTION the current implementation does not allow for tipsied elements to stay out of DOM (in between events)
    // i.e. don't remove, store, then re-insert tipsied elements (and why would you want to do that anyway?)
    var garbageCollect = (function() {
        var currentInterval;
        var to = null;
        var tipsies = [];

        function _do() {
            for (var i = 0; i < tipsies.length;) {
                var t = tipsies[i];
                // FIXME? the 2nd (non-paranoid) check is from the link below, it should be replaced if a better way is found
                // http://stackoverflow.com/questions/4040715/check-if-cached-jquery-object-is-still-in-dom
                if (t.options.gcInterval === 0 || t.$element.closest('body').length === 0) {
                    t.hoverState = 'out';
                    t.hide();
                    tipsies.splice(i,1);
                } else {
                    i++;
                }
            }
        }
        function _loop() {
            to = setTimeout(function() { _do(); _loop(); }, currentInterval);
        }

        return function(t) {
            if (t.options.gcInterval === 0) return;

            if (to && t.options.gcInterval < currentInterval) {
                clearTimeout(to); to = null;
                currentInterval = t.options.gcInterval;
            }
            tipsies.push(t);
            if (!to) _loop();
        };
    })();

    function Tipsy(element, options) {
        this.$element = $(element);
        this.options = options;
        this.enabled = true;
        this.fixTitle();
        garbageCollect(this);
    }


    Tipsy.prototype = {
        show: function() {
            var title = this.getTitle();
            if (title && this.enabled) {
                var $tip = this.tip();

                $tip.find('.tipsy-inner')[this.options.html ? 'html' : 'text'](title);
                $tip[0].className = 'tipsy'; // reset classname in case of dynamic gravity
                $tip.remove().css({top: 0, left: 0, visibility: 'hidden', display: 'block'}).prependTo(document.body);

                var pos = $.extend({}, this.$element.offset(), {
                    width: this.$element[0].offsetWidth || 0,
                    height: this.$element[0].offsetHeight || 0
                });

                if (typeof this.$element[0].nearestViewportElement == 'object') {
                    // SVG
  				var el = this.$element[0];
                    var rect = el.getBoundingClientRect();
					pos.width = rect.width;
					pos.height = rect.height;
                }


                var actualWidth = $tip[0].offsetWidth,
                    actualHeight = $tip[0].offsetHeight,
                    gravity = maybeCall(this.options.gravity, this.$element[0]);

                var tp;
                switch (gravity.charAt(0)) {
                    case 'n':
                        tp = {top: pos.top + pos.height + this.options.offset, left: pos.left + pos.width / 2 - actualWidth / 2};
                        break;
                    case 's':
                        tp = {top: pos.top - actualHeight - this.options.offset, left: pos.left + pos.width / 2 - actualWidth / 2};
                        break;
                    case 'e':
                        tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth - this.options.offset};
                        break;
                    case 'w':
                        tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width + this.options.offset};
                        break;
                }

                if (gravity.length == 2) {
                    if (gravity.charAt(1) == 'w') {
                        tp.left = pos.left + pos.width / 2 - 15;
                    } else {
                        tp.left = pos.left + pos.width / 2 - actualWidth + 15;
                    }
                }

                $tip.css(tp).addClass('tipsy-' + gravity);
                $tip.find('.tipsy-arrow')[0].className = 'tipsy-arrow tipsy-arrow-' + gravity.charAt(0);
                if (this.options.className) {
                    $tip.addClass(maybeCall(this.options.className, this.$element[0]));
                }

                if (this.options.fade) {
                    $tip.stop().css({opacity: 0, display: 'block', visibility: 'visible'}).animate({opacity: this.options.opacity});
                } else {
                    $tip.css({visibility: 'visible', opacity: this.options.opacity});
                }

                var t = this;
                var set_hovered  = function(set_hover){
                    return function(){
                        t.$tip.stop();
                        t.tipHovered = set_hover;
                        if (!set_hover){
                            if (t.options.delayOut === 0 && t.options.trigger != 'manual') {
                                t.hide();
                            } else {
                                setTimeout(function() {
                                    if (t.hoverState == 'out') t.hide(); }, t.options.delayOut);
                            }
                        }
                    };
                };
               $tip.hover(set_hovered(true), set_hovered(false));
            }
        },

        hide: function() {
            if (this.options.fade) {
                this.tip().stop().fadeOut(function() { $(this).remove(); });
            } else {
                this.tip().remove();
            }
        },

        fixTitle: function() {
            var $e = this.$element;

            if ($e.attr('title') || typeof($e.attr('original-title')) != 'string') {
                $e.attr('original-title', $e.attr('title') || '').removeAttr('title');
            }
            if (typeof $e.context.nearestViewportElement == 'object'){                                                        
                if ($e.children('title').length){
                    $e.append('<original-title>' + ($e.children('title').text() || '') + '</original-title>')
                        .children('title').remove();
                }
            }
        },

        getTitle: function() {

            var title, $e = this.$element, o = this.options;
            this.fixTitle();

            if (typeof o.title == 'string') {
                var title_name = o.title == 'title' ? 'original-title' : o.title;
                if ($e.children(title_name).length){
                    title = $e.children(title_name).html();
                } else{
                    title = $e.attr(title_name);
                    if (typeof title == 'undefined') title = ''
                }

            } else if (typeof o.title == 'function') {
                title = o.title.call($e[0]);
            }
            title = ('' + title).replace(/(^\s*|\s*$)/, "");
            return title || o.fallback;
        },

        tip: function() {
            if (!this.$tip) {
                this.$tip = $('<div class="tipsy"></div>').html('<div class="tipsy-arrow"></div><div class="tipsy-inner"></div>');
            }
            return this.$tip;
        },

        validate: function() {
            if (!this.$element[0].parentNode) {
                this.hide();
                this.$element = null;
                this.options = null;
            }
        },

        enable: function() { this.enabled = true; },
        disable: function() { this.enabled = false; },
        toggleEnabled: function() { this.enabled = !this.enabled; }
    };

    $.fn.tipsy = function(options) {

        if (options === true) {
            return this.data('tipsy');
        } else if (typeof options == 'string') {
            $(this).each(function(i,el){
              if ($(el).data('tipsy')) {
                  tipsy = $(el).data('tipsy')
                  tipsy[options]();
              }
            });
            return this;
        }

        options = $.extend({}, $.fn.tipsy.defaults, options);

        if (options.hoverlock && options.delayOut === 0) {
            options.delayOut = 100;
        }

        function get(ele) {
            var tipsy = $.data(ele, 'tipsy');
            if (!tipsy) {
                tipsy = new Tipsy(ele, $.fn.tipsy.elementOptions(ele, options));
                $.data(ele, 'tipsy', tipsy);
            }
            return tipsy;
        }

        function enter() {
            var tipsy = get(this);
            tipsy.hoverState = 'in';
            if (options.delayIn === 0) {
                tipsy.show();
            } else {
                tipsy.fixTitle();
                setTimeout(function() { if (tipsy.hoverState == 'in') tipsy.show(); }, options.delayIn);
            }
        }

        function leave() {
            var tipsy = get(this);
            tipsy.hoverState = 'out';
            if (options.delayOut === 0) {
                tipsy.hide();
            } else {
                var to = function() {
                    if (!tipsy.tipHovered || !options.hoverlock){
                        if (tipsy.hoverState == 'out') tipsy.hide();
                    }
                };
                setTimeout(to, options.delayOut);
            }    
        }

        if (!options.live) this.each(function() { get(this); });

        if (options.trigger != 'manual') {
            var binder = options.live ? 'live' : 'bind',
                eventIn = options.trigger == 'hover' ? 'mouseenter' : 'focus',
                eventOut = options.trigger == 'hover' ? 'mouseleave' : 'blur';
            this[binder](eventIn, enter)[binder](eventOut, leave);
        }

        return this;

    };

    $.fn.tipsy.defaults = {
        className: null,
        delayIn: 0,
        delayOut: 0,
        fade: false,
        fallback: '',
        gcInterval: 0,
        gravity: 'n',
        html: false,
        live: false,
        offset: 0,
        opacity: 0.8,
        title: 'title',
        trigger: 'hover',
        hoverlock: false
    };

    // Overwrite this method to provide options on a per-element basis.
    // For example, you could store the gravity in a 'tipsy-gravity' attribute:
    // return $.extend({}, options, {gravity: $(ele).attr('tipsy-gravity') || 'n' });
    // (remember - do not modify 'options' in place!)
    $.fn.tipsy.elementOptions = function(ele, options) {
        return $.metadata ? $.extend({}, options, $(ele).metadata()) : options;
    };

    $.fn.tipsy.autoNS = function() {
        return $(this).offset().top > ($(document).scrollTop() + $(window).height() / 2) ? 's' : 'n';
    };

    $.fn.tipsy.autoWE = function() {
        return $(this).offset().left > ($(document).scrollLeft() + $(window).width() / 2) ? 'e' : 'w';
    };

    /**
     * yields a closure of the supplied parameters, producing a function that takes
     * no arguments and is suitable for use as an autogravity function like so:
     *
     * @param margin (int) - distance from the viewable region edge that an
     *        element should be before setting its tooltip's gravity to be away
     *        from that edge.
     * @param prefer (string, e.g. 'n', 'sw', 'w') - the direction to prefer
     *        if there are no viewable region edges effecting the tooltip's
     *        gravity. It will try to vary from this minimally, for example,
     *        if 'sw' is preferred and an element is near the right viewable
     *        region edge, but not the top edge, it will set the gravity for
     *        that element's tooltip to be 'se', preserving the southern
     *        component.
     */
     $.fn.tipsy.autoBounds = function(margin, prefer) {
		return function() {
			var dir = {ns: prefer[0], ew: (prefer.length > 1 ? prefer[1] : false)},
                boundTop = $(document).scrollTop() + margin,
                boundLeft = $(document).scrollLeft() + margin,
                $this = $(this);

			if ($this.offset().top < boundTop) dir.ns = 'n';
			if ($this.offset().left < boundLeft) dir.ew = 'w';
			if ($(window).width() + $(document).scrollLeft() - $this.offset().left < margin) dir.ew = 'e';
			if ($(window).height() + $(document).scrollTop() - $this.offset().top < margin) dir.ns = 's';

			return dir.ns + (dir.ew ? dir.ew : '');
		};
    };
})(jQuery);