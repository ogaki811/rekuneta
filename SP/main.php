
<link href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Round|Material+Icons+Sharp|Material+Icons+Two+Tone" rel="stylesheet">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@700&display=swap" rel="stylesheet">

<link rel="stylesheet" href="../PC/lib/css/common.css?0227">

<style>
    html {
    height: 100%;
    width: 100%;
    font-size: 73.24%!important;
}
</style>


<div id="mainlp">
    <!-- TOP用 -->
    <div id="top_st" style="display:none">
        <section class="rec_head">
            <div class="rec_head_left">
                <figure class="fukidashi">
                    <img src="https://d11w49g8ylcixs.cloudfront.net/upload/save_image/recneta/image/fukidashi.png" alt="">
                </figure>

                <h1 class="maintitle">
                    <img src="https://d11w49g8ylcixs.cloudfront.net/upload/save_image/recneta/image/logo.svg" alt="レクネタ集">
                </h1>
                <h2>
                    毎日のレクはお任せください！<br>
                    すぐに使えるアイデアいっぱい！
                </h2>
                <p>
                    情に棹させば流される。智に働けば角が立つ。<br>
                    どこへ越しても住みにくいと悟った時、詩が生れて、画が出来る。<br>
                    とかくに人の世は住みにくい。意地を通せば窮屈だ。<br>
                    どこへ越しても住みにくいと悟った時、詩が生れて、画が出来る。<br>
                </p>
            </div>
            <figure class="headright">
                <img src="https://d11w49g8ylcixs.cloudfront.net/upload/save_image/recneta/image/headimg.png" alt="">
            </figure>
        </section>

        <section class="rec_search_tag">

            <form action="./?sear">
                <article>
                    <h3>#目的で遊ぶ</h3>    
                    <div>
                        <input type="checkbox" id="tag01" name="tag" class="inputtag checktag" value="moku01">
                        <label for="tag01" class="labeltag">1人でできる</label>
                        <input type="checkbox" id="tag02" name="tag" class="inputtag checktag" value="moku02">
                        <label for="tag02" class="labeltag">みんなで楽しむ</label>
                        <input type="checkbox" id="tag03" name="tag" class="inputtag checktag" value="moku03">
                        <label for="tag03" class="labeltag">頭を使う</label>
                        <input type="checkbox" id="tag04" name="tag" class="inputtag checktag" value="moku04">
                        <label for="tag04" class="labeltag">手・指を使う</label>
                        <input type="checkbox" id="tag05" name="tag" class="inputtag checktag" value="moku05">
                        <label for="tag05" class="labeltag">ゲーム</label>
                        <input type="checkbox" id="tag06" name="tag" class="inputtag checktag" value="moku06">
                        <label for="tag06" class="labeltag">リズム</label>
                        <input type="checkbox" id="tag07" name="tag" class="inputtag checktag" value="moku07">
                        <label for="tag07" class="labeltag">達成感を感じる</label>
                        <input type="checkbox" id="tag08" name="tag" class="inputtag checktag" value="moku08">
                        <label for="tag08" class="labeltag">参加意欲創出する</label>
                        <input type="checkbox" id="tag09" name="tag" class="inputtag checktag" value="moku09">
                        <label for="tag09" class="labeltag">集中力を養う</label>
                        <input type="checkbox" id="tag10" name="tag" class="inputtag checktag" value="moku10">
                        <label for="tag10" class="labeltag">季節のレク</label>
                        <input type="checkbox" id="tag11" name="tag" class="inputtag checktag" value="moku11">
                        <label for="tag11" class="labeltag">キットで手軽に</label>
                    </div>
                </article>

                <div class="flb jb srh_bottom">
                    <article>
                        <h3>#難易度で選ぶ</h3>
                        <div >
                            <input type="radio" id="na_tag01" name="tag" class="inputtag radiotag" value="nan01">
                            <label for="na_tag01" class="labeltag nan">かんたん  <img src="https://d11w49g8ylcixs.cloudfront.net/upload/save_image/recneta/image/star01.png" alt="かんたん"></label>
                            <input type="radio" id="na_tag02" name="tag" class="inputtag radiotag" value="nan02">
                            <label for="na_tag02" class="labeltag nan">ふつう <img src="https://d11w49g8ylcixs.cloudfront.net/upload/save_image/recneta/image/star02.png" alt="ふつう"></label>
                            <input type="radio" id="na_tag03" name="tag" class="inputtag radiotag" value="nan03">
                            <label for="na_tag03" class="labeltag nan">むずかしい <img src="https://d11w49g8ylcixs.cloudfront.net/upload/save_image/recneta/image/star03.png" alt="むずかしい"></label>
                        </div>
                    </article>

                    <article>
                        <h3>#企画書Noから探す</h3>
                        <div class="textid_st">
                            <input type="text" id="search_text" name="search_txt" class="" autocomplete="off">
                            <ul class="suggest_input" style="display:none">
                                <!-- サジェスト内容がが入る -->
                            </ul>
                        </div>
                    </article>
                </div>
                <input type="submit" value="検 索" class="srh_submit">
            </form>
        </section>

        <section class="rec_sec osusume">
            <h2 class="bigmidashi">おすすめのレクリーション</h2>
            <div id="osusume" class="flexcol wi95">
                <!-- おすすめの情報が入る -->
            </div>
        </section>

        <section class="rec_sec tag_sec">
            <div class="flb jb tag_ti alic wi95">
                <h2>#1人でできる</h2>
                <a href="?sear&tag=moku01" class="tagall_btn">すべて見る</a>
            </div>
            <div id="toptag01" class="flexcol wi95">
                <!-- おすすめの情報が入る -->
            </div>
        </section>

        <section class="rec_sec tag_sec">
            <div class="flb jb tag_ti alic wi95">
                <h2>#みんなで楽しむ</h2>
                <a href="?sear&tag=moku02" class="tagall_btn">すべて見る</a>
            </div>
            <div id="toptag02" class="flexcol wi95">
                <!-- おすすめの情報が入る -->
            </div>
        </section>

        <section class="rec_sec tag_sec">
            <div class="flb jb tag_ti alic wi95">
                <h2>#頭を使う</h2>
                <a href="?sear&tag=moku03" class="tagall_btn">すべて見る</a>
            </div>
            <div id="toptag03" class="flexcol wi95">
                <!-- おすすめの情報が入る -->
            </div>
        </section>

        <section class="rec_sec tag_sec">
            <div class="flb jb tag_ti alic wi95">
                <h2>#手・指を使う</h2>
                <a href="?sear&tag=moku04" class="tagall_btn">すべて見る</a>
            </div>
            <div id="toptag04" class="flexcol wi95">
                <!-- おすすめの情報が入る -->
            </div>
        </section>

        <section class="rec_sec tag_sec">
            <div class="flb jb tag_ti alic wi95">
                <h2>#ゲーム</h2>
                <a href="?sear&tag=moku05" class="tagall_btn">すべて見る</a>
            </div>
            <div id="toptag05" class="flexcol">
                <!-- おすすめの情報が入る -->
            </div>
        </section>

        <section class="rec_sec tag_sec">
            <div class="flb jb tag_ti alic wi95">
                <h2>#リズム</h2>
                <a href="?sear&tag=moku06" class="tagall_btn">すべて見る</a>
            </div>
            <div id="toptag06" class="flexcol wi95">
                <!-- おすすめの情報が入る -->
            </div>
        </section>

        <section class="rec_sec tag_sec">
            <div class="flb jb tag_ti alic wi95">
                <h2>#達成感を感じる</h2>
                <a href="?sear&tag=moku07" class="tagall_btn">すべて見る</a>
            </div>
            <div id="toptag07" class="flexcol wi95">
                <!-- おすすめの情報が入る -->
            </div>
        </section>

        <section class="rec_sec tag_sec">
            <div class="flb jb tag_ti alic wi95">
                <h2>#参加意欲創出する</h2>
                <a href="?sear&tag=moku08" class="tagall_btn">すべて見る</a>
            </div>
            <div id="toptag08" class="flexcol wi95">
                <!-- おすすめの情報が入る -->
            </div>
        </section>

        <section class="rec_sec tag_sec">
            <div class="flb jb tag_ti alic wi95">
                <h2>#集中力を養う</h2>
                <a href="?sear&tag=moku09" class="tagall_btn">すべて見る</a>
            </div>
            <div id="toptag09" class="flexcol wi95">
                <!-- おすすめの情報が入る -->
            </div>
        </section>
        <section class="rec_sec tag_sec">
            <div class="flb jb tag_ti alic wi95">
                <h2>#季節のレク</h2>
                <a href="?sear&tag=moku10" class="tagall_btn">すべて見る</a>
            </div>
            <div id="toptag10" class="flexcol wi95">
                <!-- おすすめの情報が入る -->
            </div>
        </section>
        <section class="rec_sec tag_sec">
            <div class="flb jb tag_ti alic wi95">
                <h2>#キットで手軽に</h2>
                <a href="?sear&tag=moku11" class="tagall_btn">すべて見る</a>
            </div>
            <div id="toptag11" class="flexcol wi95">
                <!-- おすすめの情報が入る -->
            </div>
        </section>
        
    </div><!-- #top_st -->



    <!-- 一覧用 -->
    <div id="search_st" style="display:none">
        <section class="mini_header">
            <div class="mini_header_div">
                <a class="mini_logo" href="./">
                    <img src="https://d11w49g8ylcixs.cloudfront.net/upload/save_image/recneta/image/logo.png" alt="レクネタ集">
                </a>
                <p class="mini_header_div_p">
                    毎日のレクはお任せください！<br>
                    すぐに使えるアイデアいっぱい！
                </p>
            </div>
        </section>

        <section id="" class="rec_sec">
            <div class="list_ct">
                <div class="rec_sec_left">
                    <div class="flb jb tag_ti alic">
                        <h1 id="list_title">#1人でできる</h1>
                    </div>
                    <div id="search_st_tag" class="flexcol">
                    <!-- レクの内容  -->
                    </div>
                         <section class="rec_search_tag">

            <form action="./?sear">
                <article>
                    <h3>#目的で遊ぶ</h3>    
                    <div>
                        <input type="checkbox" id="tag01" name="tag" class="inputtag checktag" value="moku01">
                        <label for="tag01" class="labeltag">1人でできる</label>
                        <input type="checkbox" id="tag02" name="tag" class="inputtag checktag" value="moku02">
                        <label for="tag02" class="labeltag">みんなで楽しむ</label>
                        <input type="checkbox" id="tag03" name="tag" class="inputtag checktag" value="moku03">
                        <label for="tag03" class="labeltag">頭を使う</label>
                        <input type="checkbox" id="tag04" name="tag" class="inputtag checktag" value="moku04">
                        <label for="tag04" class="labeltag">手・指を使う</label>
                        <input type="checkbox" id="tag05" name="tag" class="inputtag checktag" value="moku05">
                        <label for="tag05" class="labeltag">ゲーム</label>
                        <input type="checkbox" id="tag06" name="tag" class="inputtag checktag" value="moku06">
                        <label for="tag06" class="labeltag">リズム</label>
                        <input type="checkbox" id="tag07" name="tag" class="inputtag checktag" value="moku07">
                        <label for="tag07" class="labeltag">達成感を感じる</label>
                        <input type="checkbox" id="tag08" name="tag" class="inputtag checktag" value="moku08">
                        <label for="tag08" class="labeltag">参加意欲創出する</label>
                        <input type="checkbox" id="tag09" name="tag" class="inputtag checktag" value="moku09">
                        <label for="tag09" class="labeltag">集中力を養う</label>
                        <input type="checkbox" id="tag10" name="tag" class="inputtag checktag" value="moku10">
                        <label for="tag10" class="labeltag">季節のレク</label>
                        <input type="checkbox" id="tag11" name="tag" class="inputtag checktag" value="moku11">
                        <label for="tag11" class="labeltag">キットで手軽に</label>
                    </div>
                </article>

                <div class="flb jb srh_bottom">
                    <article>
                        <h3>#難易度で選ぶ</h3>
                        <div >
                            <input type="radio" id="na_tag01" name="tag" class="inputtag radiotag" value="nan01">
                            <label for="na_tag01" class="labeltag nan">かんたん  <img src="https://d11w49g8ylcixs.cloudfront.net/upload/save_image/recneta/image/star01.png" alt="かんたん"></label>
                            <input type="radio" id="na_tag02" name="tag" class="inputtag radiotag" value="nan02">
                            <label for="na_tag02" class="labeltag nan">ふつう <img src="https://d11w49g8ylcixs.cloudfront.net/upload/save_image/recneta/image/star02.png" alt="ふつう"></label>
                            <input type="radio" id="na_tag03" name="tag" class="inputtag radiotag" value="nan03">
                            <label for="na_tag03" class="labeltag nan">むずかしい <img src="https://d11w49g8ylcixs.cloudfront.net/upload/save_image/recneta/image/star03.png" alt="むずかしい"></label>
                        </div>
                    </article>

                    <article>
                        <h3>#企画書Noから探す</h3>
                        <div class="textid_st">
                            <input type="text" id="search_text" name="search_txt" class="" autocomplete="off">
                            <ul class="suggest_input" style="display:none">
                                <!-- サジェスト内容がが入る -->
                            </ul>
                        </div>
                    </article>
                </div>
                <input type="submit" value="検 索" class="srh_submit">
            </form>
        </section>

                </div>
                <div class="rec_sec_right">
                    <h2>他のレクネタを見る</h2>
                    <div id="rec_sec_right">
                     <!-- サイドバーの情報 -->
                    </div>
                </div>
            </div>
        </section>
    </div>

    <!-- 詳細用 -->
    <div id="det_st" style="display:none">
        <section class="mini_header">
                <div class="mini_header_div">
                    <a class="mini_logo" href="./">
                        <img src="https://d11w49g8ylcixs.cloudfront.net/upload/save_image/recneta/image/logo.png" alt="レクネタ集">
                    </a>
                    <p class="mini_header_div_p">
                        毎日のレクはお任せください！<br>
                        すぐに使えるアイデアいっぱい！
                    </p>
                </div>
        </section>

        <section class="rec_sec">
            <div id="" class="list_ct">
                <div class="rec_sec_left">
                    <div id="det_id">
                        <!-- レクの内容  詳細-->
                    </div>
                     <section class="rec_search_tag">

            <form action="./?sear">
                <article>
                    <h3>#目的で遊ぶ</h3>    
                    <div>
                        <input type="checkbox" id="tag01" name="tag" class="inputtag checktag" value="moku01">
                        <label for="tag01" class="labeltag">1人でできる</label>
                        <input type="checkbox" id="tag02" name="tag" class="inputtag checktag" value="moku02">
                        <label for="tag02" class="labeltag">みんなで楽しむ</label>
                        <input type="checkbox" id="tag03" name="tag" class="inputtag checktag" value="moku03">
                        <label for="tag03" class="labeltag">頭を使う</label>
                        <input type="checkbox" id="tag04" name="tag" class="inputtag checktag" value="moku04">
                        <label for="tag04" class="labeltag">手・指を使う</label>
                        <input type="checkbox" id="tag05" name="tag" class="inputtag checktag" value="moku05">
                        <label for="tag05" class="labeltag">ゲーム</label>
                        <input type="checkbox" id="tag06" name="tag" class="inputtag checktag" value="moku06">
                        <label for="tag06" class="labeltag">リズム</label>
                        <input type="checkbox" id="tag07" name="tag" class="inputtag checktag" value="moku07">
                        <label for="tag07" class="labeltag">達成感を感じる</label>
                        <input type="checkbox" id="tag08" name="tag" class="inputtag checktag" value="moku08">
                        <label for="tag08" class="labeltag">参加意欲創出する</label>
                        <input type="checkbox" id="tag09" name="tag" class="inputtag checktag" value="moku09">
                        <label for="tag09" class="labeltag">集中力を養う</label>
                        <input type="checkbox" id="tag10" name="tag" class="inputtag checktag" value="moku10">
                        <label for="tag10" class="labeltag">季節のレク</label>
                        <input type="checkbox" id="tag11" name="tag" class="inputtag checktag" value="moku11">
                        <label for="tag11" class="labeltag">キットで手軽に</label>
                    </div>
                </article>

                <div class="flb jb srh_bottom">
                    <article>
                        <h3>#難易度で選ぶ</h3>
                        <div >
                            <input type="radio" id="na_tag01" name="tag" class="inputtag radiotag" value="nan01">
                            <label for="na_tag01" class="labeltag nan">かんたん  <img src="https://d11w49g8ylcixs.cloudfront.net/upload/save_image/recneta/image/star01.png" alt="かんたん"></label>
                            <input type="radio" id="na_tag02" name="tag" class="inputtag radiotag" value="nan02">
                            <label for="na_tag02" class="labeltag nan">ふつう <img src="https://d11w49g8ylcixs.cloudfront.net/upload/save_image/recneta/image/star02.png" alt="ふつう"></label>
                            <input type="radio" id="na_tag03" name="tag" class="inputtag radiotag" value="nan03">
                            <label for="na_tag03" class="labeltag nan">むずかしい <img src="https://d11w49g8ylcixs.cloudfront.net/upload/save_image/recneta/image/star03.png" alt="むずかしい"></label>
                        </div>
                    </article>

                    <article>
                        <h3>#企画書Noから探す</h3>
                        <div class="textid_st">
                            <input type="text" id="search_text" name="search_txt" class="" autocomplete="off">
                            <ul class="suggest_input" style="display:none">
                                <!-- サジェスト内容がが入る -->
                            </ul>
                        </div>
                    </article>
                </div>
                <input type="submit" value="検 索" class="srh_submit">
            </form>
        </section>

                </div>
                <div class="rec_sec_right">
                    <h2>他のレクネタを見る</h2>
                    <div id="det_rec_sec_right">
                        <!-- サイドバーの内容が入る -->
                    </div>
                </div>
            </div>

        </section>


        <section>
             <div class="kanren">
                <h2 class="kanren_ti">関連レクリエーション</h2>
                <div id="search_st_tag_det" class="flexcol">
                <!-- レクの内容  -->
                </div>
            </div>
        </section>
    </div>

</div><!-- #mainlp -->


<!-- <script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script> -->

<!-- http://localhost:8888/sk_rec/PC/ -->

<script type="text/javascript">
    var url = 'https://sssk-lp.s3.ap-northeast-1.amazonaws.com/sk/rec/rec.json';
    
    // URLによってテンプレートを変更処理
    var param = location.search
    // alert(param) // 「?lib=jquery&ver=3」が出力
    // getjsonlist("#osusume",4,0,0);//jsonリストを表示する(【表示したいセレクタ】,【表示数】0で全件,【タグ】[,]で複数0で指定なし,【おすすめ】1で指定あり,0で指定なし)

    // メインルーチン
    if(param.indexOf("det") != -1) {
        //詳細テンプレート
        var dettempid = getParam('id');
        $("#top_st").remove();
        $("#search_st").remove();

        getjson_det("#det_id",dettempid);
        getsidelist("#det_rec_sec_right",0,0,0,0);
        getjsonlist("#search_st_tag_det",8,0,0,0);

        $("#det_st").show();
    }else if(param.indexOf("sear") != -1){
        //検索テンプレート
        // パラメータを取得
        // console.log();
        $("#top_st").remove();
        $("#det_st").remove();
        var paraidtext = getParam('search_txt');
        // var para = getParam('tag');
        var para = param;

        if(paraidtext){//idの指定があった場合はそれのみにする
            $("#list_title").html("<span>"+paraidtext+"</span>");
            document.title = paraidtext + " の検索結果|スマート介護のレクネタ集";
            getjsonlist("#search_st_tag",0,0,0,paraidtext);
        }else{
            // タイトル入れる
            let searchtag = "";
            para.indexOf("moku01") != -1 ? searchtag += '<span>#1人でできる</span>' : searchtag += "";
            para.indexOf("moku02") != -1 ? searchtag += '<span>#みんなで楽しむ</span>' : searchtag += "";
            para.indexOf("moku03") != -1 ? searchtag += '<span>#頭を使う</span>' : searchtag += "";
            para.indexOf("moku04") != -1 ? searchtag += '<span>#手・指を使う</span>' : searchtag += "";
            para.indexOf("moku05") != -1 ? searchtag += '<span>#ゲーム</span>' : searchtag += "";
            para.indexOf("moku06") != -1 ? searchtag += '<span>#リズム</span>' : searchtag += "";
            para.indexOf("moku07") != -1 ? searchtag += '<span>#達成感を感じる</span>' : searchtag += "";
            para.indexOf("moku08") != -1 ? searchtag += '<span>#参加意欲を創出する</span>' : searchtag += "";
            para.indexOf("moku09") != -1 ? searchtag += '<span>#集中力を養う</span>' : searchtag += "";
            para.indexOf("moku10") != -1 ? searchtag += '<span>#季節のレク</span>' : searchtag += "";
            para.indexOf("moku11") != -1 ? searchtag += '<span>#キットで手軽に</span>' : searchtag += "";
            para.indexOf("nan01") != -1 ? searchtag += '<span>#かんたん</span>' : searchtag += "";
            para.indexOf("nan02") != -1 ? searchtag += '<span>#ふつう</span>' : searchtag += "";
            para.indexOf("nan03") != -1 ? searchtag += '<span>#むずかしい</span>' : searchtag += "";
            $("#list_title").html(searchtag + " の検索結果");
            document.title = searchtag + " の検索結果|スマート介護のレクネタ集";

            getjsonlist("#search_st_tag",0,para,0,0);
        }
        getsidelist("#rec_sec_right");
        $("#search_st").show();
    }else{
        $("#search_st").remove();
        $("#det_st").remove();

        //TOP
        getjsonlist("#osusume",4,0,1,0);
        getjsonlist("#toptag01",4,"moku01",0,0);
        getjsonlist("#toptag02",4,"moku02",0,0);
        getjsonlist("#toptag03",4,"moku03",0,0);
        getjsonlist("#toptag04",4,"moku04",0,0);
        getjsonlist("#toptag05",4,"moku05",0,0);
        getjsonlist("#toptag06",4,"moku06",0,0);
        getjsonlist("#toptag07",4,"moku07",0,0);
        getjsonlist("#toptag08",4,"moku08",0,0);
        getjsonlist("#toptag09",4,"moku09",0,0);
        getjsonlist("#toptag10",4,"moku10",0,0);
        getjsonlist("#toptag11",4,"moku11",0,0);
        
        $("#top_st").show();
    }


    // getjsonlist("#osusume","4",0,0);//jsonリストを表示する(【表示したいセレクタ】,【表示数】0で全件,【タグ】[,]で複数0で指定なし,【おすすめ】1で指定あり,0で指定なし,【レク企画id】1で指定あり,0で指定なし)

    //jsonリストを表示する
    function getjsonlist(targetid,data_length,tags,picup,recnoid){
        // $(targetid + " *").remove();
        $.getJSON(url, function(data) {
            var alldatajson = [];//該当JSON全件データ
            var recid;//レク各ID
            var recti;//レクタイトル
            var recimg;//イメージ画像
            var recmoku;//#1人でできるとかのフラグ
            var recProduct;//1つのリストjsonの内容を格納
            var list_format;//リストフォーマット
            var tagsarr = [];//タグの配列を格納
            var searchflag;//検索時の該当項目ヒットしたら配列に追加する
            var alldatajson_nan = [];//難易度のタグがある時用
            let recmov_frag;//レク動画のhtmlが入る
            let new_icon;

            if(recnoid != 0){//id検索の時
                $(data).each(function(i, val) {
                    if(val.rec_title == "" || val.rec_no == "" || val.view_flag != "")return true;//タイトルと企画noと表示条件を確認する
                    recid = String(val.rec_no);
                    if(recid.indexOf(String(recnoid)) != -1){
                        alldatajson.push(val);
                        return true;
                    }
                    // コンソールに1つずつ出力
                });
            }else if(picup != 0){
                $(data).each(function(i, val) {
                    if(val.rec_title == "" || val.rec_no == "" || val.view_flag != "" || val.rec_osusume == "")return true;//タイトルと企画noと表示条件を確認する
                    alldatajson.push(val);
                    console.log(val);
                    // コンソールに1つずつ出力
                });
                
            }else if(tags == 0){//タグがない時
                // console.log("aaaa");
                $(data).each(function(i, val) {
                    if(val.rec_title == "" || val.rec_no == "" || val.view_flag != "")return true;//タイトルと企画noと表示条件を確認する
                    alldatajson.push(val);
                });
            }else{
                //タグの指定があったらタグのみにする
                //難易度の指定があったらそれのみにする
                $(data).each(function(i, val) {
                    if(val.rec_title == "" || val.rec_no == "" || val.view_flag != "")return true;//タイトルと企画noと表示条件を確認する
                    if(tags.indexOf("nan01") != -1 && val.rec_nanido01 == 1){alldatajson_nan.push(val);return true;}
                    if(tags.indexOf("nan02") != -1 && val.rec_nanido02 == 1){alldatajson_nan.push(val);return true;}
                    if(tags.indexOf("nan03") != -1 && val.rec_nanido03 == 1){alldatajson_nan.push(val);return true;}
                    // コンソールに1つずつ出力
                });

                if(alldatajson_nan.length == 0){
                    alldatajson_nan = data;
                    // console.log("oです");
                }
                // console.log("alldatajson_nan.length == 0");
                // console.log(alldatajson_nan.length);

                $(alldatajson_nan).each(function(i, val) {

                    if(val.rec_title == "" || val.rec_no == "" || val.view_flag != "")return true;//タイトルと企画noと表示条件を確認する
                    // console.log(val);
                    if(tags.indexOf("moku") != -1){
                        if(tags.indexOf("moku01") != -1 && val.rec_mokuteki01 == 1){alldatajson.push(val);return true;}
                        if(tags.indexOf("moku02") != -1 && val.rec_mokuteki02 == 1){alldatajson.push(val);return true;}
                        if(tags.indexOf("moku03") != -1 && val.rec_mokuteki03 == 1){alldatajson.push(val);return true;}
                        if(tags.indexOf("moku04") != -1 && val.rec_mokuteki04 == 1){alldatajson.push(val);return true;}
                        if(tags.indexOf("moku05") != -1 && val.rec_mokuteki05 == 1){alldatajson.push(val);return true;}
                        if(tags.indexOf("moku06") != -1 && val.rec_mokuteki06 == 1){alldatajson.push(val);return true;}
                        if(tags.indexOf("moku07") != -1 && val.rec_mokuteki07 == 1){alldatajson.push(val);return true;}
                        if(tags.indexOf("moku08") != -1 && val.rec_mokuteki08 == 1){alldatajson.push(val);return true;}
                        if(tags.indexOf("moku09") != -1 && val.rec_mokuteki09 == 1){alldatajson.push(val);return true;}
                        if(tags.indexOf("moku10") != -1 && val.rec_mokuteki10 == 1){alldatajson.push(val);return true;}
                        if(tags.indexOf("moku11") != -1 && val.rec_mokuteki11 == 1){alldatajson.push(val);return true;}
                    }else{
                        alldatajson.push(val);return true;
                    }
                    // コンソールに1つずつ出力
                });
            } 

            // 配列を反転させる
            // alldatajson = alldatajson.reverse();

            if(data_length === 0){//data_lengthが0以上だったら
                data_length = alldatajson.length;
            }

            if(alldatajson.length==0){
                $(targetid).append("検索結果は見つかりませんでした。")
                return;
            };

            for (let i = 0; i < data_length; i++) {
                recid = alldatajson[i].rec_no;
                recti = alldatajson[i].rec_title;
                alldatajson[i].rec_img01 ? recimg = alldatajson[i].rec_img01 : recimg = '<img src="https://d11w49g8ylcixs.cloudfront.net/upload/save_image/recneta/image/1494.gif" alt="">';
                
                recmoku = "";//タグを作成
                alldatajson[i].rec_mokuteki01 == 1 ? recmoku += '<a href="?sear&tag=moku01">#1人でできる</a>' : recmoku += "";
                alldatajson[i].rec_mokuteki02 == 1 ? recmoku += '<a href="?sear&tag=moku02">#みんなで楽しむ</a>' : recmoku += "";
                alldatajson[i].rec_mokuteki03 == 1 ? recmoku += '<a href="?sear&tag=moku03">#頭を使う</a>' : recmoku += "";
                alldatajson[i].rec_mokuteki04 == 1 ? recmoku += '<a href="?sear&tag=moku04">#手・指を使う</a>' : recmoku += "";
                alldatajson[i].rec_mokuteki05 == 1 ? recmoku += '<a href="?sear&tag=moku05">#ゲーム</a>' : recmoku += "";
                alldatajson[i].rec_mokuteki06 == 1 ? recmoku += '<a href="?sear&tag=moku06">#リズム</a>' : recmoku += "";
                alldatajson[i].rec_mokuteki07 == 1 ? recmoku += '<a href="?sear&tag=moku07">#達成感を感じる</a>' : recmoku += "";
                alldatajson[i].rec_mokuteki08 == 1 ? recmoku += '<a href="?sear&tag=moku08">#参加意欲を創出する</a>' : recmoku += "";
                alldatajson[i].rec_mokuteki09 == 1 ? recmoku += '<a href="?sear&tag=moku09">#集中力を養う</a>' : recmoku += "";
                alldatajson[i].rec_mokuteki10 == 1 ? recmoku += '<a href="?sear&tag=moku10">#季節のレク</a>' : recmoku += "";
                alldatajson[i].rec_mokuteki11 == 1 ? recmoku += '<a href="?sear&tag=moku11">#キットで手軽に</a>' : recmoku += "";
                alldatajson[i].rec_nanido01 == 1 ? recmoku += '<a href="?sear&tag=nan01">#かんたん</a>' : recmoku += "";
                alldatajson[i].rec_nanido02 == 1 ? recmoku += '<a href="?sear&tag=nan02">#ふつう</a>' : recmoku += "";
                alldatajson[i].rec_nanido03 == 1 ? recmoku += '<a href="?sear&tag=nan03">#むずかしい</a>' : recmoku += "";
                
                recProduct = "";//商品リンクを作成
                alldatajson[i].Product_name_01 !== "" ? recProduct += '<a href="'+alldatajson[i].Product_url_01+'" target="_blank">'+alldatajson[i].Product_name_01+'</a>' : recProduct += "";
                alldatajson[i].Product_name_02 == 1 ? recProduct += '<a href="'+alldatajson[i].Product_url_02+'" target="_blank">'+alldatajson[i].Product_name_02+'</a>' : recProduct += "";
                alldatajson[i].Product_name_03 == 1 ? recProduct += '<a href="'+alldatajson[i].Product_url_03+'" target="_blank">'+alldatajson[i].Product_name_03+'</a>' : recProduct += "";
                alldatajson[i].Product_name_04 == 1 ? recProduct += '<a href="'+alldatajson[i].Product_url_04+'" target="_blank">'+alldatajson[i].Product_name_04+'</a>' : recProduct += "";
                alldatajson[i].Product_name_05 == 1 ? recProduct += '<a href="'+alldatajson[i].Product_url_05+'" target="_blank">'+alldatajson[i].Product_name_05+'</a>' : recProduct += "";
                alldatajson[i].Product_name_06 == 1 ? recProduct += '<a href="'+alldatajson[i].Product_url_06+'" target="_blank">'+alldatajson[i].Product_name_06+'</a>' : recProduct += "";
                recProduct !== "" ? recProduct = '<div class="pro_url"><h3>使用する商品</h3><div class="pro_url_d">' + recProduct + '</div></div>' : recProduct = "";

                alldatajson[i].movie_url !== "" ? recmov_frag = '<p class="rec_mov_list">動画あり</p>' : recmov_frag = ""; 

                //NEWフラグの判定
                if(alldatajson[i].new_date !== ""){
                    // 今日の日付を取得する
                    var hiduke = new Date(); 
                    hiduke.setDate(hiduke.getDate() + 30);
                    // console.log(hiduke)
                    jsondate = new Date(alldatajson[i].new_date);
                    // console.log(jsondate)
                    console.log(hiduke.getTime() > jsondate.getTime())
                    hiduke.getTime() > jsondate.getTime() ? new_icon = '<p class="new_icon">NEW</p>':new_icon = '<p class=""></p>'                    
                }else{
                    new_icon = '<p class=""></p>'   
                }


                var list_format = `<article id="`+ recid +`" class="recart">
                        `+new_icon+`
                        <h2 class="rec_title"><a href="?det&id=`+recid+`">`+ recti +`</a></h2>
                        <div class="rec_title_under">
                            <div class="rec_no">
                                <p class="ti">レク企画書</p>
                                <p class="no">No.`+ recid+`</p>
                            </div>
                            `+recmov_frag+`
                        </div>
                        <a href="?det&id=`+recid+`">
                            <figure class="rec_img">
                                <img src="https://d11w49g8ylcixs.cloudfront.net/upload/save_image/recneta/image/`+ recimg +`" alt="`+ recti +`">
                            </figure>
                        </a>
                        `+ recProduct +`
                            <div class="set_tags">`+ recmoku +`</div>
                        <div class="recart_bottom">    
                            <a href="?det&id=`+recid+`" class="detail_btn">詳しく見る</a>
                        </div>
                    </article>`;
                var html = $(targetid).prepend(list_format);
            }
        });
    }

    //サイドバーリストを表示する
    function getsidelist(targetid){
        // $(targetid + " *").remove();
        $.getJSON(url, function(data) {
            var alldatajson = [];//該当JSON全件データ
            var recid;//レク各ID
            var recti;//レクタイトル
            var recimg;//イメージ画像
            var recmoku;//#1人でできるとかのフラグ
            var recProduct;//1つのリストjsonの内容を格納
            var list_format;//リストフォーマット
            var tagsarr = [];//タグの配列を格納
            var searchflag;//検索時の該当項目ヒットしたら配列に追加する
            // let array = []
            // for (let i=0; i<10; i++) {
            //     alldatajson.push(Math.floor(Math.random() * 6) + 1);
            // }
            alldatajson = arrayShuffle(data);;
            // console.log(alldatajson);
            // console.log("サイドバー");

            // alldatajson
            var count_i = 0;
            $(data).each(function(i, val) {
                if(val.rec_title == "" || val.rec_no == "" || val.view_flag != "")return true;//タイトルと企画noと表示条件を確認する

                recid = val.rec_no;
                recti = val.rec_title;
                val.rec_img01 ? recimg = '<img src="https://d11w49g8ylcixs.cloudfront.net/upload/save_image/recneta/image/'+val.rec_img01+'" alt="">' : recimg = '<img src="https://d11w49g8ylcixs.cloudfront.net/upload/save_image/recneta/image/1494.gif" alt="">';
                
                var side_format = `<article id=`+recid+` class="recommend_art">
                            <a href="?det&id=`+recid+`" class="recommend_art_fig">
                                `+recimg+`
                            </a>
                            <div class="right_link">
                                <h3 class="recommend_art_h3"><a href="?det&id=`+recid+`">`+recti+`</a></h3>
                                <a href="?det&id=`+recid+`" class="recommend_art_a">詳しく見る ></a>
                            </div>
                        </article>`;

                // console.log(targetid);
                // if(tags.indexOf("moku01") != -1 && val.rec_mokuteki01 == 1){alldatajson.push(val);return true;}

                var html = $(targetid).append(side_format);
                count_i++;
                if (count_i == 30) {
                    return false;
                }
            });
        });

    }




    function arrayShuffle(array) {
        for(var i = (array.length - 1); 0 < i; i--){

            // 0〜(i+1)の範囲で値を取得
            var r = Math.floor(Math.random() * (i + 1));

            // 要素の並び替えを実行
            var tmp = array[i];
            array[i] = array[r];
            array[r] = tmp;
        }
        return array;
    }


    //詳細関数
    function getjson_det(targetid,detid){
        // $(targetid + " *").remove();
        $.getJSON(url, function(data) {
            var alldatajson = [];//該当JSON全件データ
            var recid;//レク各ID
            var recti;//レクタイトル
            var recimg;//イメージ画像
            var recmoku;//#1人でできるとかのフラグ
            var recProduct;//1つのリストjsonの内容を格納
            var list_format;//リストフォーマット
            var tagsarr = [];//タグの配列を格納
            var searchflag;//検索時の該当項目ヒットしたら配列に追加する
            var recfile_pc;
            var recfile_sp;

            $(data).each(function(i, val) {
                if(val.rec_title == "" || val.rec_no == "" || val.view_flag != "")return true;//タイトルと企画noと表示条件を確認する
                if(detid == val.rec_no){alldatajson.push(val);return true;}
                // コンソールに1つずつ出力
            });

            // console.log(alldatajson);
            if(alldatajson.length==0){$(targetid).append("該当のページは見つかりませんでした。");return false;}

            for (let i = 0; i < alldatajson.length; i++) {
                recid = alldatajson[i].rec_no;
                recti = alldatajson[i].rec_title;
                alldatajson[i].rec_img01 ? recimg =  '<img src="https://d11w49g8ylcixs.cloudfront.net/upload/save_image/recneta/image/'+ alldatajson[i].rec_img01 +'" alt="'+ recti +'">': recimg = '<img src="https://d11w49g8ylcixs.cloudfront.net/upload/save_image/recneta/image/1494.gif" alt="">';
                                            

                recmoku = "";//タグを作成
                alldatajson[i].rec_mokuteki01 == 1 ? recmoku += '<a href="?sear&tag=moku01">#1人でできる</a>' : recmoku += "";
                alldatajson[i].rec_mokuteki02 == 1 ? recmoku += '<a href="?sear&tag=moku02">#みんなで楽しむ</a>' : recmoku += "";
                alldatajson[i].rec_mokuteki03 == 1 ? recmoku += '<a href="?sear&tag=moku03">#頭を使う</a>' : recmoku += "";
                alldatajson[i].rec_mokuteki04 == 1 ? recmoku += '<a href="?sear&tag=moku04">#手・指を使う</a>' : recmoku += "";
                alldatajson[i].rec_mokuteki05 == 1 ? recmoku += '<a href="?sear&tag=moku05">#ゲーム</a>' : recmoku += "";
                alldatajson[i].rec_mokuteki06 == 1 ? recmoku += '<a href="?sear&tag=moku06">#リズム</a>' : recmoku += "";
                alldatajson[i].rec_mokuteki07 == 1 ? recmoku += '<a href="?sear&tag=moku07">#達成感を感じる</a>' : recmoku += "";
                alldatajson[i].rec_mokuteki08 == 1 ? recmoku += '<a href="?sear&tag=moku08">#参加意欲を創出する</a>' : recmoku += "";
                alldatajson[i].rec_mokuteki09 == 1 ? recmoku += '<a href="?sear&tag=moku09">#集中力を養う</a>' : recmoku += "";
                alldatajson[i].rec_mokuteki10 == 1 ? recmoku += '<a href="?sear&tag=moku10">#季節のレク</a>' : recmoku += "";
                alldatajson[i].rec_mokuteki11 == 1 ? recmoku += '<a href="?sear&tag=moku11">#キットで手軽に</a>' : recmoku += "";
                alldatajson[i].rec_nanido01 == 1 ? recmoku += '<a href="?sear&tag=nan01">#かんたん</a>' : recmoku += "";
                alldatajson[i].rec_nanido02 == 1 ? recmoku += '<a href="?sear&tag=nan02">#ふつう</a>' : recmoku += "";
                alldatajson[i].rec_nanido03 == 1 ? recmoku += '<a href="?sear&tag=nan03">#むずかしい</a>' : recmoku += "";

                recProduct = "";//商品リンクを作成
                alldatajson[i].Product_name_01 !== "" ? recProduct += '<a href="'+alldatajson[i].Product_url_01+'" target="_blank" class="det_probtn">'+alldatajson[i].Product_name_01+'</a>' : recProduct += "";
                alldatajson[i].Product_name_02 == 1 ? recProduct += '<a href="'+alldatajson[i].Product_url_02+'" target="_blank" class="det_probtn">'+alldatajson[i].Product_name_02+'</a>' : recProduct += "";
                alldatajson[i].Product_name_03 == 1 ? recProduct += '<a href="'+alldatajson[i].Product_url_03+'" target="_blank" class="det_probtn">'+alldatajson[i].Product_name_03+'</a>' : recProduct += "";
                alldatajson[i].Product_name_04 == 1 ? recProduct += '<a href="'+alldatajson[i].Product_url_04+'" target="_blank" class="det_probtn">'+alldatajson[i].Product_name_04+'</a>' : recProduct += "";
                alldatajson[i].Product_name_05 == 1 ? recProduct += '<a href="'+alldatajson[i].Product_url_05+'" target="_blank" class="det_probtn">'+alldatajson[i].Product_name_05+'</a>' : recProduct += "";
                alldatajson[i].Product_name_06 == 1 ? recProduct += '<a href="'+alldatajson[i].Product_url_06+'" target="_blank" class="det_probtn">'+alldatajson[i].Product_name_06+'</a>' : recProduct += "";
                recProduct !== "" ? recProduct =  recProduct  : recProduct = "";

                recfile_pc = "";//レク企画書 PC
                recfile_sp = "";//レク企画書 SP

                recfile_pc = "https://d11w49g8ylcixs.cloudfront.net/upload/save_image/recneta/sheet/"+alldatajson[i].rec_file_pc;
                recfile_sp = "https://d11w49g8ylcixs.cloudfront.net/upload/save_image/recneta/sheet/"+alldatajson[i].rec_file_sp;



                // 企画詳細
                //目的
                rec_kimokuteki = "";
                rec_kimokuteki = alldatajson[i].ki_mokuteki;

                // 内容
                rec_ki_rec = alldatajson[i].ki_rec;
                // 企画書-タイムスケジュール　合計
                rec_ki_time_sum = alldatajson[i].ki_time_sum;
                // 企画書-タイムスケジュール 内容
                rec_ki_time_con = alldatajson[i].ki_time_con;
                // 企画書-必要スペース（目安）
                rec_ki_need = alldatajson[i].ki_need;
                // 企画書-対象者
                rec_ki_target = alldatajson[i].ki_target;
                // 企画書-参加人数（目安）※スタッフ除く
                rec_ki_sanka = alldatajson[i].ki_sanka;
                // 企画書-予算（目安）
                rec_ki_yosan = alldatajson[i].ki_yosan;
                // 企画書-準備物など
                rec_ki_pre = alldatajson[i].ki_pre;
                // 企画書-連絡事項
                rec_ki_ren = alldatajson[i].ki_ren;
                // 動画URL
                rec_movie_url = "";
                rec_movie_url = alldatajson[i].movie_url;
                var rec_movie_url_arr = "https://www.youtube.com/embed/"+alldatajson[i].movie_url.split("/")[3];

                if(rec_movie_url != ""){
                    rec_movie_url = '<a href="javascript:void(0)" class="detdl_btn bl mov_btn" data-mov="'+ rec_movie_url_arr +'">動画を見る</a>';
                }

                // console.log(rec_movie_url_arr);

                var rec_nanido_img = "";
                if(alldatajson[i].rec_nanido01 == 1){
                    rec_nanido_img = "https://d11w49g8ylcixs.cloudfront.net/upload/save_image/recneta/image/star01.png";
                }else if(alldatajson[i].rec_nanido02 == 1){
                    rec_nanido_img = "https://d11w49g8ylcixs.cloudfront.net/upload/save_image/recneta/image/star02.png";
                }else if(alldatajson[i].rec_nanido03 == 1){
                    rec_nanido_img = "https://d11w49g8ylcixs.cloudfront.net/upload/save_image/recneta/image/star03.png";
                }else{
                    rec_nanido_img = "";
                }

                // console.log("rec_nanido_img");
                // console.log(alldatajson[i].rec_nanido01);
                // console.log(alldatajson[i].rec_nanido02);
                // console.log(alldatajson[i].rec_nanido03);

                let det_format  = `<div class="det_header">
                        <h1 id="">`+recti+`</h1>
                        <div class="flb">
                            <div class="flb alic">
                                <p class="det_recti">レク企画</p>
                                <p class="det_recno">No.`+recid+`</p>
                            </div>
                            <div class="flb alic ml100">
                                <p class="det_recti">難易度</p>
                                <p class="det_recno"><img src="`+rec_nanido_img+`"></p>
                            </div>
                        </div>
                        <div class="det_tag">`+recmoku+`</div>
                    </div>
                    <div id="" class="">
                        <figure class="det_st_main_img">
                        `+recimg+`
                        </figure>
                        <!-- レクの内容  -->
                        <div class="flb dlbtn_st">
                            <a href="`+ recfile_pc +`" class="detdl_btn pcshow">レク企画書をダウンロード</a>
                            <a href="`+ recfile_sp +`" target="_blank" class="detdl_btn spshow">レク企画書をダウンロード</a>
                            `+rec_movie_url+`
                        </div>
                        <div class="det_kikaku">
                            <div>
                                <h3>目的</h3>
                                <div class="det_div det_mokuteki">
                                    <p>`+rec_kimokuteki+`</p>
                                </div>
                            </div>
                            <div>
                                <h3>使用する商品</h3>
                                <div class="det_div det_mokuteki">`+ recProduct +`</div>
                            </div>
                            <div>
                                <h3>レクリエーションの内容</h3>
                                <div class="det_div det_mokuteki">
                                    <p>`+rec_ki_rec+`</p>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h3>タイムスケジュール　合計`+rec_ki_time_sum+`分</h3>
                                    <div class="det_div det_mokuteki">
                                        <p>`+rec_ki_time_con+`</p>
                                    </div>
                                </div>
                                <div>
                                    <h3>必要スペース（目安）</h3>
                                    <div class="det_div det_mokuteki">
                                        <p>`+rec_ki_need+`</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h3>対象者</h3>
                                    <div class="det_div det_mokuteki">
                                        <p>`+rec_ki_target+`</p>
                                    </div>
                                </div>
                                <div>
                                    <h3>参加人数（目安）※スタッフ除く</h3>
                                      <div class="det_div det_mokuteki">
                                        <p>`+rec_ki_sanka+`</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3>予算（目安）</h3>
                                <div class="det_div det_mokuteki">
                                    <p>`+rec_ki_yosan+`</p>
                                </div>
                            </div>
                            <div>
                                <h3>準備物など</h3>
                                <div class="det_div det_mokuteki">
                                    <p>`+rec_ki_pre+`</p>
                                </div>
                            </div>
                            <div>
                                <h3>連絡事項</h3>
                                <div class="det_div det_mokuteki">
                                    <p>`+rec_ki_ren+`</p>
                                </div>
                            </div>
                           <div class="flb dlbtn_st">
                            <a href="`+ recfile_pc +`" class="detdl_btn pcshow">レク企画書をダウンロード</a>
                            <a href="`+ recfile_sp +`" target="_blank" class="detdl_btn spshow">レク企画書をダウンロード</a>
                            `+rec_movie_url+`
                        </div>
                        </div>
                    </div>
                    `;

                var html = $(targetid).append(det_format);
                document.title = recti + "|スマート介護のレクネタ集";
                document.querySelector('meta[name="description"]').setAttribute("content", rec_kimokuteki);
            }
        });

    }

           

    // $('.checktag').change(function() {
        
    //     //すべてのチェック済みvalue値を取得する
    //     $(this).each(function() {
    //         // var r = $(this).val();
    //         // var r = $(this).prop('checked');
    //         // console.log(r);
    //         let element = document.getElementsByClassName('checktag');
    //         console.log(element.checked);
    //     })
        
    // })


    // パラメータを取得getParam('a')
    function getParam(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    let getidlist = get_idslist();
    // console.log(getidlist);
    function get_idslist(){
        var getids = [];//該当JSON全件データ
        $.getJSON(url, function(data) {
            // var count_i = 0;
            $(data).each(function(i, val) {
                if(val.rec_title == "" || val.rec_no == "" || val.view_flag != "")return true;//タイトルと企画noと表示条件を確認する
                getids.push(val.rec_no);
                // console.log(val.rec_no);
            });
        });
        return getids;
    }
    
    $(function() {
        // id検索の時にやつ
        $("#search_text").live("keyup", function(){
            var search_text = $('#search_text').val();
            var result = $.map(getidlist, function(value, index) {
                if(String(value).indexOf(String(search_text)) != -1 && value.rec_title != "" && value.rec_no != "" && value.view_flag != "") {
                    return value;
                } else {
                    return null;
                }
            });
            // $(this).after("<p>新たなp要素もクリック！</p>");            
            if(result.length == 0){
                $(".suggest_input").hide();
                // console.log("結果が0です");
                return;
            };  
            var cont_sj = 0;
            var sj_html="";
            $(result).each(function(i, val) {
                sj_html += "<li>"+val+"</li>";
                cont_sj++;
                if (cont_sj == 5) {
                    return false;
                }
            });
            $(".suggest_input").html(sj_html);
            $(".suggest_input").show();
        });

        $(".suggest_input li").live("click", function(){
            // console.log($(this).text());
            $("#search_text").val($(this).text());
            $(".suggest_input").hide();
        });
    });


    //モーダルロジック
    //詳細用
    $(".mov_btn").live("click", function(){
        dialog_func($(this).attr('data-mov'));
    });

    $(".bg_of").live("click", function(){
        $(".dialog").remove();
        $(".bg_of").remove();
    });

    function dialog_func(rec_movie_url_arr){
        //dialog用のhtml
        var dialog_html = `<div class="dialog">
        <iframe width="100%" height="400" src="`+rec_movie_url_arr+`" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <div class="bg_of"></div>`;
        $('body').append(dialog_html);
    }

    //
    let clonebanner = $(".login_before").clone();
    $('.rec_search_tag').after(clonebanner);
    $('.mini_header').after(clonebanner);

    // koukoku_func('.flb');
    // koukoku_func('.rec_sec_right');
    
    // function koukoku_func(sele) {
    //     $(sele).after($(".login_before").clone());
    // }
</script>



