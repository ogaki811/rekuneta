$(window).load(function(){

/*  COMMON  */
    $('.toTop').click(function(){
        var bodyHeight = $('body').height();
        $('html,body').animate({scrollTop:0},300);
        return false;
    });

    $('#icons .searchOpener').live('click', function(){
        if($('#searchBar').hasClass('hidden')){
            $('#searchBar').removeClass();
        }
        else{
            $('#searchBar').addClass('hidden');
        }
        return false;
    })


/*  商品詳細 (SK-SP-030 & SK-SP-038)  */
    if($('#prodSlide').length){
        $('#prodSlide').bxSlider({
            adaptiveHeight:true
        });
    };
    $('.prodNbInput').change(function(){
        $('.prodNb').val($(this).val());
    });
    var fixButtons = function(){
        if($('#prodBtnsFixed').length){
            var showButtons = $('#prodBtns,#mycBtns').offset().top;
            var scrollValue = $(window).scrollTop();

            if(scrollValue > showButtons){
                $('#prodBtnsFixed').stop().show();
            }else{
                $('#prodBtnsFixed').stop().hide();
            }
        }
    };

    $('input').on('focusin', function(){
        var placeHolder = $(this).attr('placeholder');
        $(this).data('placeHolder', placeHolder );
        $(this).attr('placeholder', '');
        $(this).css({'font-size':'100% !important'});
    });
    $('input').on('blur', function() {
        var placeHolder = $(this).data('placeHolder');
        $(this).attr('placeholder', placeHolder);
        $(this).css({'font-size':'100% !important'});
    });

/*  クイックオーダー (SK-SP-020)  */
    $('.removeThis').live('click', function(){
        $(this).parent().find('input[type="text"]').val('');
        // var nbLines = $(this).parent().parent().find('.quickSearchLine').length;
        // if(nbLines > 1){
            // $(this).parent('.quickSearchLine').remove();
        // }
        return false;
    });

/*  カート (SK-SP-050)  */
    $('.goNext').live('click', function(){
        $('.popup').show().stop().animate({'opacity':1},400);
        return false;
    });
    $('.cancel').live('click', function(){
        $('.popup').stop().animate({'opacity':0},400, function(){
            $('.popup').hide();
        });
        return false;
    });
    var popupCenter = function(){
        if($('.cautionOrder').length){
            var thisHeight = $('.cautionOrder').outerHeight() / 2;
            $('.cautionOrder').css({'margin-top':'-'+thisHeight+'px'})
        }
        if($('.folderChange').length){
            var thisHeight = $('.folderChange').outerHeight() / 2;
            $('.folderChange').css({'margin-top':'-'+thisHeight+'px'})
        }
    };
    $('#allProds .closed').live('click', function(){
        var totalHeight = 0;
        $(this).closest('#allProds').find('article').each(function(){
            totalHeight += $(this).outerHeight();
        });
        $(this).closest('#allProds').find('.allProdsContainer').animate({
            height:totalHeight+'px'
        }, 300);
        $(this).removeClass('closed').addClass('opened');
        return false;
    });

    $('#allProds .opened').live('click', function(){
        $(this).closest('#allProds').find('.allProdsContainer').animate({height:'0px'}, 300);
        $(this).removeClass('opened').addClass('closed');
        return false;
    });
/*
    var removeFromCart = function(prodId){
        $.ajax({
            url:'',
            data:{prodId:prodId},
            type:'POST',
            success:function(){}
        });
    }
    $('.removeFromCart').live('click', function(){
        var prodId = $(this).closest('.prodId').val();
        removeFromCart(prodId);
        $(this).closest('article').animate({opacity:0},600, function(){
            $(this).hide();
            var totalHeight = 0;
            var thisHeight = $(this).outerHeight();
            $(this).closest('#allProds').find('article').each(function(){
                totalHeight += $(this).outerHeight();
            });
            totalHeight = totalHeight - thisHeight;
            $(this).closest('.allProdsContainer').animate({
                height:totalHeight+'px'
            }, 300);
            if(totalHeight == 0){
                $(this).closest('.opened').removeClass('opened').addClass('closed');
            }
            $(this).remove();
        });
        return false;
    });
*/
    $('.deliveryLine .removeThis').live('click', function(){
        $(this).parent('.deliveryLine').find('input').val('');
        return false;
    });



/*  マイカタログ：フォルダ (SK-SP-081)  */
    $('.writeComm').live('click', function(){
        var thisProdCode = $(this).closest('.specs').find('.getProdCode').html();
        console.log(thisProdCode);
        $('.folderChange').find('.code').val(thisProdCode);
        $('.popup').show().stop().animate({'opacity':1},400);
        return false;
    });
    $('.closePopup').live('click', function(){
        $('.folderChange').find('.code').val('');
        $('.popup').stop().animate({'opacity':0},400, function(){
            $('.popup').hide();
        });
        return false;
    });





/*  FUNCTIONS CALL  */
    fixButtons();
    popupCenter();


/*  SCROLL EVENT  */
    $(window).scroll(function(){
        fixButtons();
    });

/*  RESIZE EVENT  */
    $(window).resize(function(){
        popupCenter();
    });


/*--------------------------------------------------------*/
/*                         USEFULL                        */
/*--------------------------------------------------------*/

// Scroll to top :
    $('.to_top').click(function(){
        var bodyHeight = $('body').height();
        var scrollSpeed = bodyHeight/1.2;
        $('html,body').animate({scrollTop:0},scrollSpeed);
        return false;
    });

// Anchor links :
    $('#selector a').live('click', function(){
        var goTo = $(this).attr('href');
        goTo = $(goTo).offset().top;
        // var headSize = $('#header').height();
        // goTo = goTo + headSize;
        $('html,body').animate({scrollTop:goTo},400);
        return false;
    });

// Scroll Event :


// Resize window function :
    $(window).resize(function(){
        // Do something
    });

// If is not IE8 :
    if(navigator.userAgent.indexOf('MSIE 8.') == -1){
        // Do something
    };

// Check if an element exists
    if($('#selector').length){
        // Do something
    };

// Check if current browser is mobile
    var isMobile = function(){
        return /(iphone|ipod|ipad|android|blackberry|windows ce|palm|symbian)/i.test(navigator.userAgent);
    };
    if(isMobile()){
        // Do something
    };

// SetTimeOut function :
    setTimeout(function(){
        // Do something
    },200);


// SetInterval function :
    setInterval(function(){
        // Do something
    },200);

// Change all .png by .gif for ie8 :
    if($('#selector').length){
        $('#selector img').each(function(){
            var src = $(this).attr('src');
            $(this).attr('src', src.replace(/\.png$/i, '.gif'));
        });
    };

// Simulate a PHP get :
    var get = window.location.href;
    if(get.indexOf('?GetName') != -1){
        // Do something
    };

// Jquery function :
    var functionName = function(){
        // Do something
    };

    // Function's call
    functionName();

    $(function() {
        $("#myCatalogDialog").dialog({
            modal: true,
            autoOpen: false,
            buttons: {
                '閉じる': function(){
                    $("#myCatalogDialog").children().remove();
                    $(this).dialog('close');
                }
            },
            open: function(){
                $("#myCatalogDialog").load(
                    $(this).dialog("option", "url")
                    , null
                    , function() {
                        $("#myCatalogDialogLoading").hide();
                    }
                );
            }
        });
        $(".myCatalogDialogOpen").click(function(){
            $("#myCatalogDialogLoading").show();
            // $.mobile.changePage('#myCatalogDialog');
            $("#myCatalogDialog").dialog("option", "url", "/mypage/favorite_edit.php?product_id=" + $(this).attr('product_id'));
            $("#myCatalogDialog").dialog("option", "width", "auto");
            $("#myCatalogDialog").dialog('open');
        });
    });
});