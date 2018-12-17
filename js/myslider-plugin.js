$.fn.wonderSlider = function(options) {
    //vars
        var param = $.extend({
        'boxWidth': 1500,
        'boxHeight': 700,
        'btnPause': false,
        'slideColumn': false,
        'speed': 1000,
        'borderColorActiveSlide': 'yellow',
        'intervalStart': false,
        'arrows': true,
        'generalSlide': true,
        'contrlInterval': true,
        'slideTape': false
    }, options);
      
    var $selector = this;
    
    $selector.css('width', param.boxWidth + 'px');
    $selector.css('height', param.boxHeight + 'px');
    
    var containerWidth = $selector.width();
    var containerHeight = $selector.height();
    var slideWith = $selector.find('.slide').width();
    var slideHeight = $selector.find('.slide').height();
    var slideAmount = $selector.find('.slide').length;
    var slideAmountOnSide = slideAmount / 2;
    var sideWidth = containerWidth / 2;
    var distanceWithSide = (sideWidth - slideWith) / slideAmountOnSide;
    var distanceHeightSide = (containerHeight / 3) / slideAmountOnSide;
    var count = 0;
    var htmlFirstSlide = $selector.find('.slide').eq(0).html();
    var actionRoadSLide = false;
    
    //controllers
    function slideDistance(i) {
        for (var i = 0; i <= slideAmount; i++) {
            if (slideAmount % 2 == 0) {
                if( i < slideAmountOnSide) {
                    $selector.find('.slide').eq(i).css('transform', 'translateX(' + (distanceWithSide * i - (slideWith / 2) + distanceWithSide) + 'px) translateY(' + (distanceHeightSide * i * (-1) + distanceHeightSide - distanceHeightSide * 2) + 'px)');
                    $selector.find('.slide').eq(i).css('z-index', slideAmount + 1 - i);
                } else if (i >= slideAmountOnSide) {
                    $selector.find('.slide').eq(i).css('transform', 'translateX(' + (distanceWithSide * i - containerWidth + 2 * slideWith - (slideWith / 2)) + 'px) translateY(' + (distanceHeightSide * i - slideAmountOnSide * distanceHeightSide * 2) + 'px)');
                }
            } else {
               if ( i <= slideAmountOnSide) {
                    $selector.find('.slide').eq(i).css('transform', 'translateX(' + (distanceWithSide * i - (slideWith / 2)) + 'px) translateY(' + (distanceHeightSide * i * (-1)) + 'px)');
                    $selector.find('.slide').eq(i).css('z-index', slideAmount + 1 - i);
                } else if (i > slideAmountOnSide) {
                    $selector.find('.slide').eq(i).css('transform', 'translateX(' + (distanceWithSide * i - containerWidth + slideWith * 2 - (slideWith / 2)) + 'px) translateY(' + (distanceHeightSide * i - slideAmountOnSide * distanceHeightSide * 2) + 'px)');

                }
            }
            
        }
    }
    
    function slideColumnDistance(d) {
        for (var d = 0; d <= slideAmount; d++) {
            if (slideAmount % 2 == 0) {
                if (d < slideAmountOnSide) {
                    $selector.find('.slide').eq(d).css('transform', 'translateX(' + containerWidth/4 + 'px) translateY(' + (distanceHeightSide * d * (-1) * 2 - distanceHeightSide) + 'px)');
                    $selector.find('.slide').eq(d).css('z-index', slideAmount + 1 - d);
                } else {
                    $selector.find('.slide').eq(d).css('transform', 'translateX(' + (containerWidth/4 * (-1) - slideWith) + 'px) translateY(' + (distanceHeightSide * d * (-1) * 2 + containerHeight - containerHeight/3 - distanceHeightSide) + 'px)');
                    $selector.find('.slide').eq(d).css('z-index', slideAmount + 1 - d);
                }
            } else {
                if (d < slideAmountOnSide) {
                    $selector.find('.slide').eq(d).css('transform', 'translateX(' + containerWidth/4 + 'px) translateY(' + (distanceHeightSide * d * (-1) * 2 - distanceHeightSide) + 'px)');
                    $selector.find('.slide').eq(d).css('z-index', slideAmount + 1 - d);
                } else if (d >= slideAmountOnSide) {
                    $selector.find('.slide').eq(d).css('transform', 'translateX(' + (containerWidth/4 * (-1) - slideWith) + 'px) translateY(' + (distanceHeightSide * d * (-1) * 2 + containerHeight - containerHeight/3) + 'px)');
                    $selector.find('.slide').eq(d).css('z-index', slideAmount + 1 - d);
                }
            }
        }
    }
    
    function slideTapeDistance(c) {
        for (var c = 0; c <= slideAmount; c++) {
            if (slideAmount % 2 == 0) {
                if (c <= slideAmountOnSide - 1) {
                    $selector.find('.slide').eq(c).css('transform', 'translateX(' + (distanceWithSide * c - (slideWith / 2) + distanceWithSide/2) + 'px) translateY(' + (slideHeight * (-0.5)) + 'px)');
                     $selector.find('.slide').eq(c).css('z-index', slideAmount + 1 - c);
                } else if (c >= slideAmountOnSide) {
                    $selector.find('.slide').eq(c).css('transform', 'translateX(' + (distanceWithSide * c - containerWidth + slideWith * 2 - (slideWith / 2) + distanceWithSide/2) + 'px) translateY(' + (slideHeight * (-0.5)) + 'px)');
                }
            } else {
                if (c <= slideAmountOnSide) {
                    $selector.find('.slide').eq(c).css('transform', 'translateX(' + (distanceWithSide * c - (slideWith / 2)) + 'px) translateY(' + (slideHeight * (-0.5)) + 'px)');
                     $selector.find('.slide').eq(c).css('z-index', slideAmount + 1 - c);
                } else if (c >= slideAmountOnSide) {
                    $selector.find('.slide').eq(c).css('transform', 'translateX(' + (distanceWithSide * c - containerWidth + slideWith * 2 - (slideWith / 2)) + 'px) translateY(' + (slideHeight * (-0.5)) + 'px)');
                }
            }
        }
    }
    
    function stepBySlide(j) {
        $selector.find('.slide').removeClass('active');
        $selector.find('.slide').eq(j).addClass('active');
        var htmlStringGeneralSlide = $('.slide').eq(j).html();
        $selector.find('.general-slide').html(htmlStringGeneralSlide);  
    }
    
    //init
        
    if (param.intervalStart == true) {
        roadSlide = setInterval(function() {
            count++;
            if (count >= slideAmount) count = 0;
            stepBySlide(count);
        }, param.speed);
        if (param.btnPause == true) $selector.append('<div class="btn-play-pause"></div>');
    }; //connect interval with a button
    
    if (param.contrlInterval == true) {
        $selector.append('<div class="btn-play-pause pause"></div>');
        actionRoadSLide = true;
    }; //controlled interval
    
    if (param.arrows == true) {
        $selector.append( '<div class="arrows left-arrow"></div>'
                        +'<div class="arrows right-arrow"></div>')
    }; //connect arrows
    
    $selector.find('.slide').css('border-color', param.borderColorActiveSlide); //active slide color
    
    if (param.generalSlide == true) {
        $selector.append('<div class="general-slide"></div>');
    } else {
        if (param.slideTape == true) {
            $selector.find('.btn-play-pause').addClass('tape-general');
            $selector.find('.arrows.left-arrow').addClass('tape-general');
            $selector.find('.arrows.right-arrow').addClass('tape-general');
            $selector.css('height', containerHeight / 2);
            $selector.find('.slide').addClass('tape-general');
        } else if (param.slideColumn == true) {
            $selector.find('.arrows.left-arrow').addClass('column-general'); 
            $selector.find('.arrows.right-arrow').addClass('column-general');   
            $selector.find('.slide').css('width', slideWith);
            $selector.css('width', containerWidth / 2);
            containerWidth = $selector.width() / 2;
        } else {
            $selector.css('height', containerHeight / 1.5);
            $selector.find('.slide').addClass('general');
            $selector.find('.arrows.right-arrow').addClass('general');
            $selector.find('.arrows.left-arrow').addClass('general');
            $selector.find('.btn-play-pause').addClass('general'); 
        }
    } //disable main slide

    
    if (param.slideTape == true) {
        slideTapeDistance(count);
        $selector.find('.general-slide').addClass('tape');
        $selector.find('.btn-play-pause').addClass('tape');
        $selector.find('.arrows.right-arrow').addClass('tape');
        $selector.find('.arrows.left-arrow').addClass('tape');
    } else if (param.slideColumn == true) {
        slideColumnDistance(count);
        $selector.find('.general-slide').addClass('column');
        $selector.find('.btn-play-pause').addClass('column');
        $selector.find('.arrows.right-arrow').addClass('column');
        $selector.find('.arrows.left-arrow').addClass('column');
    } else {
        slideDistance(count);
    }//slide layout
    
    //actions
    
    $selector.find('.slide').eq(0).addClass('active');
    $selector.find('.general-slide').html(htmlFirstSlide);
    
    $selector.find('.slide').click(function() {
        $selector.find('.slide').removeClass('active');
        $(this).addClass('active');
        count = $(this).index();
        var htmlStringGeneralSlide = $(this).html();
        $selector.find('.general-slide').html(htmlStringGeneralSlide);
    });
    
    $selector.find('.btn-play-pause').click(function() {
        if (!actionRoadSLide) {
            $(this).addClass('pause');
            clearInterval(roadSlide);
            actionRoadSLide = true;
        } else {
            $(this).removeClass('pause');
            roadSlide = setInterval(function() {
                count++;
                if (count >= slideAmount) count = 0;
                stepBySlide(count);
            }, param.speed);
            actionRoadSLide = false;
        }
    });
    
    $selector.find('.arrows.right-arrow').click(function() {
        count++;
        if (count >= slideAmount) count = 0;
        stepBySlide(count);
    });
    
    $selector.find('.arrows.left-arrow').click(function() {
        count--;
        if (count < 0) count = slideAmount - 1;
        stepBySlide(count);
    }); 
}
