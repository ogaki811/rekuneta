
<link href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Round|Material+Icons+Sharp|Material+Icons+Two+Tone" rel="stylesheet">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@700&display=swap" rel="stylesheet">

<!-- 本番用 -->
<link rel="stylesheet" href="https://sssk-lp.s3.ap-northeast-1.amazonaws.com/sk/rec/css/common.css">
<!-- <link rel="stylesheet" href="https://sssk-lp.s3.ap-northeast-1.amazonaws.com/sk/rec/css/overwrite.css" media="screen and (min-width:768px)">
<link rel="stylesheet" href="https://sssk-lp.s3.ap-northeast-1.amazonaws.com/sk/rec/css/sp/overwrite.css" media="screen and (max-width:767px)"> -->

<!-- 開発 -->
<!-- <link rel="stylesheet" href="https://sssk-lp.s3.ap-northeast-1.amazonaws.com/sk/rec/css_dev/common.css?0227"> -->
<!-- <link rel="stylesheet" href="lib/css/common.css"> -->
<link rel="stylesheet" href="lib/css/overwrite.css">
<!-- <link rel="stylesheet" href="https://sssk-lp.s3.ap-northeast-1.amazonaws.com/sk/rec/css_dev/overwrite.css" media="screen and (min-width:768px)">
<link rel="stylesheet" href="https://sssk-lp.s3.ap-northeast-1.amazonaws.com/sk/rec/css_dev/sp/overwrite.css" media="screen and (max-width:767px)"> -->




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
                    310種の「レク企画書」は レクリエーション介護士が専門的な観点から監修！<br>
                    素材・作り方の手順やポイントがわかる「レシピ動画」も180本ご用意。<br>
                    毎日のレクリエーションの手助けをします！<br>
                    さらに、スマート介護会員様へは3000アイテムある無料サンプルで素材・難易度確認の<br>
                    サポートをしています♪
                </p>
            </div>
            <figure class="headright">
                <img src="https://d11w49g8ylcixs.cloudfront.net/upload/save_image/recneta/image/headimg.png" alt="">
            </figure>
        </section>

        <section class="rec_search_tag" id="recSearch">

            <div class="rec_search_wrap" id="freeSearch">
                <h3 class="rec_search_title">フリーワードで探す</h3>
                <form action="recipe-movie.php?sear">
                    <div class="srh_input">
                        <article class="search_word_wrap">
                            <h3>#キーワードから探す</h3>
                            <div class="textid_st">
                                <input type="text" id="search_word" name="search_word" class="search_word" autocomplete="off" placeholder="キーワードを入力してください">
                                <button type="button" class="clear-button" id="clearSearchWord"><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg></button>
                            </div>
                        </article>

                        <article class="search_txt_wrap">
                            <h3>#企画書Noから探す</h3>
                            <div class="textid_st">
                                <input type="text" id="search_text" name="search_txt" class="search_txt" autocomplete="off" placeholder="4桁の企画書Noを入力してください">
                                <ul class="suggest_input" style="display:none">
                                    <!-- サジェスト内容がが入る -->
                                </ul>
                                <button type="button" class="clear-button" id="clearSearchText"><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg></button>
                            </div>
                        </article>
                    </div>
                    <input type="submit" value="検索する" class="srh_submit">
                    <!-- <button type="button" id="clearFreeSearch">全てクリア</button> -->
                </form>
            </div>
            
            <div class="rec_search_wrap" id="sceneSearch">
                <h3 class="rec_search_title">シーンを選んで探す</h3>
                <form action="recipe-movie.php?sear">
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
                            <label for="tag08" class="labeltag">参加意欲を創出する</label>
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
                    </div>
                    <input type="hidden" id="search_text" name="search_txt" class="search_txt" autocomplete="off">
                    <input type="submit" value="検索する" class="srh_submit">
                    <button type="button" id="clearSceneSearch">全てクリア</button>
                </form>
            </div>
        </section>

        <section class="rec_sec osusume">
            <h2 class="bigmidashi">おすすめのレクリエーション</h2>
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
                <h2>#参加意欲を創出する</h2>
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
                <a class="mini_logo" href="recipe-movie.php">
                    <img src="https://sssk-lp.s3.ap-northeast-1.amazonaws.com/sk/rec/img/recneta_logo.png" alt="レクネタ集">
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
                    <article class="recart" style="opacity:0"></article>
                    <article class="recart" style="opacity:0"></article>
                    </div>
                    <section class="rec_search_tag" id="recSearch">

                        <div class="rec_search_wrap" id="freeSearch">
                            <h3 class="rec_search_title">フリーワードで探す</h3>
                            <form action="recipe-movie.php?sear">
                                <div class="srh_input">
                                    <article class="search_word_wrap">
                                        <h3>#キーワードから探す</h3>
                                        <div class="textid_st">
                                            <input type="text" id="search_word" name="search_word" class="search_word" autocomplete="off" placeholder="キーワードを入力してください">
                                            <button type="button" class="clear-button" id="clearSearchWord"><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg></button>
                                        </div>
                                    </article>

                                    <article class="search_txt_wrap">
                                        <h3>#企画書Noから探す</h3>
                                        <div class="textid_st">
                                            <input type="text" id="search_text" name="search_txt" class="search_txt" autocomplete="off" placeholder="4桁の企画書Noを入力してください">
                                            <ul class="suggest_input" style="display:none">
                                                <!-- サジェスト内容がが入る -->
                                            </ul>
                                            <button type="button" class="clear-button" id="clearSearchText"><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg></button>
                                        </div>
                                    </article>
                                </div>
                                <input type="submit" value="検索する" class="srh_submit">
                                <!-- <button type="button" id="clearFreeSearch">全てクリア</button> -->
                            </form>
                        </div>
                        
                        <div class="rec_search_wrap" id="sceneSearch">
                            <h3 class="rec_search_title">シーンを選んで探す</h3>
                            <form action="recipe-movie.php?sear">
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
                                        <label for="tag08" class="labeltag">参加意欲を創出する</label>
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
                                </div>
                                <input type="hidden" id="search_text" name="search_txt" class="search_txt" autocomplete="off">
                                <input type="submit" value="検索する" class="srh_submit">
                                <button type="button" id="clearSceneSearch">全てクリア</button>
                            </form>
                        </div>
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
    </div> <!-- 一覧用 -->

    <!-- 詳細用 -->
    <div id="det_st" style="display:none">
        <section class="mini_header">
                <div class="mini_header_div">
                    <a class="mini_logo" href="recipe-movie.php">
                        <img src="https://sssk-lp.s3.ap-northeast-1.amazonaws.com/sk/rec/img/recneta_logo.png" alt="レクネタ集">
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
                    <section class="rec_search_tag" id="recSearch">

                        <div class="rec_search_wrap" id="freeSearch">
                            <h3 class="rec_search_title">フリーワードで探す</h3>
                            <form action="recipe-movie.php?sear">
                                <div class="srh_input">
                                    <article class="search_word_wrap">
                                        <h3>#キーワードから探す</h3>
                                        <div class="textid_st">
                                            <input type="text" id="search_word" name="search_word" class="search_word" autocomplete="off" placeholder="キーワードを入力してください">
                                            <button type="button" class="clear-button" id="clearSearchWord"><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg></button>
                                        </div>
                                    </article>

                                    <article class="search_txt_wrap">
                                        <h3>#企画書Noから探す</h3>
                                        <div class="textid_st">
                                            <input type="text" id="search_text" name="search_txt" class="search_txt" autocomplete="off" placeholder="4桁の企画書Noを入力してください">
                                            <ul class="suggest_input" style="display:none">
                                                <!-- サジェスト内容がが入る -->
                                            </ul>
                                            <button type="button" class="clear-button" id="clearSearchText"><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg></button>
                                        </div>
                                    </article>
                                </div>
                                <input type="submit" value="検索する" class="srh_submit">
                                <!-- <button type="button" id="clearFreeSearch">全てクリア</button> -->
                            </form>
                        </div>
                        
                        <div class="rec_search_wrap" id="sceneSearch">
                            <h3 class="rec_search_title">シーンを選んで探す</h3>
                            <form action="recipe-movie.php?sear">
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
                                        <label for="tag08" class="labeltag">参加意欲を創出する</label>
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
                                </div>
                                <input type="hidden" id="search_text" name="search_txt" class="search_txt" autocomplete="off">
                                <input type="submit" value="検索する" class="srh_submit">
                                <button type="button" id="clearSceneSearch">全てクリア</button>
                            </form>
                        </div>
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
    </div><!-- 詳細用 -->

    <!--{if !$tpl_login}-->
    <a href="<!--{$smarty.const.HTTP_URL}-->entry/entrance.php" class="login_before">
        <img src="https://sssk-lp.s3.ap-northeast-1.amazonaws.com/sk/rec/img/login_before.png" alt="">
    </a>
    <!--{/if}-->

</div><!-- #mainlp -->





<!-- <script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script> -->

<!-- http://localhost:8888/sk_rec/PC/ -->


<script type="text/javascript">
    var url = 'https://sssk-lp.s3.ap-northeast-1.amazonaws.com/sk/rec/rec.json';

    // URLによってテンプレートを変更処理
    var param = location.search

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
        $("#top_st").remove();
        $("#det_st").remove();
        var paraidtext = getParam('search_txt');
        var paraKeyword = getParam('search_word');
        var para = param;

        if(paraidtext){
            $("#list_title").html("<span>"+paraidtext+"</span>");
            document.title = paraidtext + " の検索結果|スマート介護のレクネタ集";
            getjsonlist("#search_st_tag",0,0,0,paraidtext);
        }else if(paraKeyword){
            $("#list_title").html("<span>"+paraKeyword+"</span>");
            document.title = paraKeyword + " の検索結果|スマート介護のレクネタ集";
            getjsonlist("#search_st_tag",0,0,0,paraKeyword);
        }else{
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

            if(searchtag.trim() === "") {
                $("#list_title").html("検索結果");
                document.title = "検索結果|スマート介護のレクネタ集";
            } else {
                $("#list_title").html(searchtag + " の検索結果");
                document.title = searchtag + " の検索結果|スマート介護のレクネタ集";
            }

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

    // createListItemHTML関数の追加
    function createListItemHTML(item) {
        let recmoku = "";
        let recProduct = "";
        let recmov_frag = ""; // 動画リンクのフラグメントを初期化
        let new_icon = ""; 
        const today = new Date();

        // 商品リンクの生成
        // 商品リンクの生成
        // let recProduct = "";
        const productNames = ["Product_name_01", "Product_name_02", "Product_name_03", "Product_name_04", "Product_name_05", "Product_name_06"];
        for (let name of productNames) {
            if (item[name] !== "") {
                recProduct = `<a href="${item[`${name.replace("name", "url")}`]}" target="_blank" class="det_probtn">${item[name]}</a>`;
                break; // 最初の1つが見つかったらループを終了する
            }
        };

        // NEWフラグの判定
        if (item.new_date) {
            const itemDate = new Date(item.new_date);
            const newThreshold = new Date();
            newThreshold.setDate(today.getDate() - 30);
            if (itemDate >= newThreshold) {
                new_icon = '<p class="new_icon">NEW</p>';
            }
        }

        // 動画の存在をチェック
        if (item.movie_url !== "") {
            recmov_frag = '<p class="rec_mov_list">動画あり</p>';
        }

        // 目的のタグ生成
        const mokutekiLabels = ["1人でできる", "みんなで楽しむ", "頭を使う", "手・指を使う", "ゲーム", "リズム", 
            "達成感を感じる", "参加意欲を創出する", "集中力を養う", "季節のレク", "キットで手軽に"];
        for (let i = 1; i <= 11; i++) {
            const mokutekiKey = `rec_mokuteki${i.toString().padStart(2, '0')}`;
            if (item[mokutekiKey] === 1) {
                recmoku += `<a href="?sear&tag=moku${i.toString().padStart(2, '0')}">#${mokutekiLabels[i-1]}</a> `;
            }
        }

        // 難易度のタグ生成
        const nanidoLabels = { "nan01": "かんたん", "nan02": "ふつう", "nan03": "むずかしい" };
        Object.keys(nanidoLabels).forEach(key => {
            const nanidoKey = `rec_nanido${key.slice(-2)}`;
            if (item[nanidoKey] === 1) {
                recmoku += `<a href="?sear&tag=${key}">#${nanidoLabels[key]}</a> `;
            }
        });

        return `<article id="${item.rec_no}" class="recart">
            ${new_icon}
            <h2 class="rec_title"><a href="?det&id=${item.rec_no}">${item.rec_title}</a></h2>
            <div class="rec_title_under">
                <div class="rec_no">
                    <p class="ti">レク企画書</p>
                    <p class="no">No.${item.rec_no}</p>
                </div>
                ${recmov_frag}
            </div>
            <a href="?det&id=${item.rec_no}">
                <figure class="rec_img">
                    <img src="${item.rec_img01 ? 'https://d11w49g8ylcixs.cloudfront.net/upload/save_image/recneta/image/' + item.rec_img01 : 'https://d11w49g8ylcixs.cloudfront.net/upload/save_image/recneta/image/default-image.jpg'}" alt="${item.rec_title}">
                </figure>
            </a>
            ${recProduct ? `<div class="pro_url"><h3>使用する商品</h3><div class="pro_url_d">${recProduct}</div></div>` : ''}
            <div class="set_tags">${recmoku.trim()}</div>
            <div class="recart_bottom">    
                <a href="?det&id=${item.rec_no}" class="detail_btn">詳しく見る</a>
            </div>
        </article>`;
    }

    // 新しいgetjsonlist関数
    function getjsonlist(targetid, data_length, tags, picup, recnoid) {
        $.getJSON(url, function(data) {
            let alldatajson = [];
            if (recnoid !== 0) {
                alldatajson = data.filter(val => val.rec_title && val.rec_no && !val.view_flag && String(val.rec_no).includes(String(recnoid)));
            } else if (picup !== 0) {
                alldatajson = data.filter(val => val.rec_title && val.rec_no && !val.view_flag && val.rec_osusume);
            } else if (tags === 0) {
                alldatajson = data.filter(val => val.rec_title && val.rec_no && !val.view_flag);
            } else {
                let filteredData = data.filter(val => val.rec_title && val.rec_no && !val.view_flag);
                const tagsArr = tags.split(",");
                filteredData.forEach(val => {
                    tagsArr.forEach(tag => {
                        if (val[`rec_${tag}`] === 1) {
                            alldatajson.push(val);
                        }
                    });
                });
                if (alldatajson.length === 0) alldatajson = filteredData;
            }

            if (data_length === 0) data_length = alldatajson.length;
            if (alldatajson.length === 0) {
                $(targetid).append("検索結果は見つかりませんでした。");
                return;
            }

            for (let i = data_length - 1; i >= 0; i--) {
                const listItemHTML = createListItemHTML(alldatajson[i]);
                $(targetid).prepend(listItemHTML);
            }
        });
    }

    //サイドバーリストを表示する
    function getsidelist(targetid){
        $.getJSON(url, function(data) {
            let alldatajson = arrayShuffle(data);

            let count_i = 0;
            $(alldatajson).each(function(i, val) {
                if(val.rec_title == "" || val.rec_no == "" || val.view_flag != "")return true;

                const recid = val.rec_no;
                const recti = val.rec_title;
                const recimg = val.rec_img01 ? 
                    `<img src="https://d11w49g8ylcixs.cloudfront.net/upload/save_image/recneta/image/${val.rec_img01}" alt="">` : 
                    '<img src="https://d11w49g8ylcixs.cloudfront.net/upload/save_image/recneta/image/1494.gif" alt="">';
                
                const side_format = `<article id="${recid}" class="recommend_art">
                            <a href="?det&id=${recid}" class="recommend_art_fig">
                                ${recimg}
                            </a>
                            <div class="right_link">
                                <h3 class="recommend_art_h3"><a href="?det&id=${recid}">${recti}</a></h3>
                                <a href="?det&id=${recid}" class="recommend_art_a">詳しく見る ></a>
                            </div>
                        </article>`;

                $(targetid).append(side_format);
                count_i++;
                if (count_i == 30) {
                    return false;
                }
            });
        });
    }
    

    //詳細関数
    function getjson_det(targetid,detid){
        $.getJSON(url, function(data) {
            let alldatajson = data.filter(val => val.rec_title && val.rec_no && !val.view_flag && detid == val.rec_no);
            if(alldatajson.length==0){
                $(targetid).append("該当のページは見つかりませんでした。");
                return;
            }

            for (let i = 0; i < alldatajson.length; i++) {
                const item = alldatajson[i];
                const recid = item.rec_no;
                const recti = item.rec_title;
                const recimg = item.rec_img01 ?  
                    `<img src="https://d11w49g8ylcixs.cloudfront.net/upload/save_image/recneta/image/${item.rec_img01}" alt="${recti}">` :
                    '<img src="https://d11w49g8ylcixs.cloudfront.net/upload/save_image/recneta/image/1494.gif" alt="">';

                let recmoku = "";
                const mokutekiLabels = ["1人でできる", "みんなで楽しむ", "頭を使う", "手・指を使う", "ゲーム", "リズム", 
                    "達成感を感じる", "参加意欲を創出する", "集中力を養う", "季節のレク", "キットで手軽に"];
                for (let j = 1; j <= 11; j++) {
                    const mokutekiKey = `rec_mokuteki${j.toString().padStart(2, '0')}`;
                    if (item[mokutekiKey] === 1) {
                        recmoku += `<a href="?sear&tag=moku${j.toString().padStart(2, '0')}">#${mokutekiLabels[j-1]}</a> `;
                    }
                }

                const nanidoLabels = { "nan01": "かんたん", "nan02": "ふつう", "nan03": "むずかしい" };
                Object.keys(nanidoLabels).forEach(key => {
                    const nanidoKey = `rec_nanido${key.slice(-2)}`;
                    if (item[nanidoKey] === 1) {
                        recmoku += `<a href="?sear&tag=${key}">#${nanidoLabels[key]}</a> `;
                    }
                });

                let recProduct = "";
                const productNames = ["Product_name_01", "Product_name_02", "Product_name_03", "Product_name_04", "Product_name_05", "Product_name_06"];
                for (let name of productNames) {
                    if (item[name] !== "") {
                        recProduct = `<a href="${item[`${name.replace("name", "url")}`]}" target="_blank" class="det_probtn">${item[name]}</a>`;
                        break; // 最初の1つが見つかったらループを終了する
                    }
                };

                let recmov_frag = ""; 
                if (item.movie_url !== "") {
                    recmov_frag = '<a href="javascript:void(0)" class="detdl_btn bl mov_btn" data-mov="https://www.youtube.com/embed/' + item.movie_url.split("/")[3] + '">動画を見る</a>';
                }

                const recfile_pc = "https://d11w49g8ylcixs.cloudfront.net/upload/save_image/recneta/sheet/" + item.rec_file_pc;
                const recfile_sp = "https://d11w49g8ylcixs.cloudfront.net/upload/save_image/recneta/sheet/" + item.rec_file_sp;
                const rec_nanido_img = item.rec_nanido01 == 1 ? "https://d11w49g8ylcixs.cloudfront.net/upload/save_image/recneta/image/star01.png" : 
                                    item.rec_nanido02 == 1 ? "https://d11w49g8ylcixs.cloudfront.net/upload/save_image/recneta/image/star02.png" : 
                                    item.rec_nanido03 == 1 ? "https://d11w49g8ylcixs.cloudfront.net/upload/save_image/recneta/image/star03.png" : "";

                let det_format = `<div class="det_header">
                        <h1 id="">${recti}</h1>
                        <div class="flb">
                            <div class="flb alic">
                                <p class="det_recti">レク企画</p>
                                <p class="det_recno">No.${recid}</p>
                            </div>
                            <div class="flb alic ml100">
                                <p class="det_recti">難易度</p>
                                <p class="det_recno"><img src="${rec_nanido_img}"></p>
                            </div>
                        </div>
                        <div class="det_tag">${recmoku}</div>
                    </div>
                    <div id="" class="">
                        <figure class="det_st_main_img">
                        ${recimg}
                        </figure>
                        <!-- レクの内容  -->
                        <div class="flb dlbtn_st">
                            <a href="${recfile_pc}" class="detdl_btn pcshow">レク企画書をダウンロード</a>
                            <a href="${recfile_sp}" target="_blank" class="detdl_btn spshow">レク企画書をダウンロード</a>
                            ${recmov_frag}
                        </div>
                        <div class="det_kikaku">
                            <div>
                                <h3>目的</h3>
                                <div class="det_div det_mokuteki">
                                    <p>${item.ki_mokuteki}</p>
                                </div>
                            </div>
                            <div>
                                <h3>使用する商品</h3>
                                <div class="det_div det_mokuteki">${recProduct ? `<div class="det_div det_mokuteki">${recProduct}</div>` : ''}</div>
                            </div>
                            <div>
                                <h3>レクリエーションの内容</h3>
                                <div class="det_div det_mokuteki">
                                    <p>${item.ki_rec}</p>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h3>タイムスケジュール　合計${item.ki_time_sum}分</h3>
                                    <div class="det_div det_mokuteki">
                                        <p>${item.ki_time_con}</p>
                                    </div>
                                </div>
                                <div>
                                    <h3>必要スペース（目安）</h3>
                                    <div class="det_div det_mokuteki">
                                        <p>${item.ki_need}</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h3>対象者</h3>
                                    <div class="det_div det_mokuteki">
                                        <p>${item.ki_target}</p>
                                    </div>
                                </div>
                                <div>
                                    <h3>参加人数（目安）※スタッフ除く</h3>
                                    <div class="det_div det_mokuteki">
                                        <p>${item.ki_sanka}</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3>予算（目安）</h3>
                                <div class="det_div det_mokuteki">
                                    <p>${item.ki_yosan}</p>
                                </div>
                            </div>
                            <div>
                                <h3>準備物など</h3>
                                <div class="det_div det_mokuteki">
                                    <p>${item.ki_pre}</p>
                                </div>
                            </div>
                            <div>
                                <h3>連絡事項</h3>
                                <div class="det_div det_mokuteki">
                                    <p>${item.ki_ren}</p>
                                </div>
                            </div>
                        <div class="flb dlbtn_st">
                            <a href="${recfile_pc}" class="detdl_btn pcshow">レク企画書をダウンロード</a>
                            <a href="${recfile_sp}" target="_blank" class="detdl_btn spshow">レク企画書をダウンロード</a>
                            ${recmov_frag}
                        </div>
                        </div>
                    </div>`;
                var html = $(targetid).append(det_format);
                document.title = recti + "|スマート介護のレクネタ集";
                document.querySelector('meta[name="description"]').setAttribute("content", item.ki_mokuteki);
            }
        });
    }

    function arrayShuffle(array) {
        for(var i = (array.length - 1); 0 < i; i--){
            var r = Math.floor(Math.random() * (i + 1));
            var tmp = array[i];
            array[i] = array[r];
            array[r] = tmp;
        }
        return array;
    }

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

    //サーチタイトルの更新
    function updateSearchTitle(keyword) {
        if (keyword.trim() === '') {
            $('#list_title').text('検索結果');
        } else {
            $('#list_title').text(`"${keyword}" の検索結果`);
        }
    }

    //結果の表示
    function displayResults(results) {
        const resultsContainer = $('#search_st_tag');
        resultsContainer.empty();

        if (results.length === 0) {
            resultsContainer.append('<p>該当するレクリエーションが見つかりませんでした。</p>');
        } else {
            results.forEach(function(item) {
                const listItemHTML = createListItemHTML(item);
                resultsContainer.append(listItemHTML);
            });
        }
    }

    $(document).ready(function() {
        
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('search_word');
        const searchType = urlParams.get('search_type');

        if (searchType) {
            $('#search_type').val(searchType);
        }

        if (searchQuery) {
            $('#search_word').val(searchQuery);
            updateSearchTitle(searchQuery);
            fetchAndDisplayResults(searchQuery, searchType);
        }

        $('.srh_submit').click(function(event) {
            // event.preventDefault();
            const keyword = $('#search_word').val();
            const searchType = $('#search_type').val();
            updateSearchTitle(keyword);
        });
    });

    function fetchAndDisplayResults(keyword, searchType = 'AND') {
        const keywords = keyword.replace(/　/g, ' ').toLowerCase().split(' ').filter(k => k);

        $.getJSON(url, function(data) {
            let results = data.filter(item => {
                if (String(item.view_flag) === "1") return false;
                const itemText = JSON.stringify(item).toLowerCase();
                return searchType === 'AND' ? 
                    keywords.every(k => itemText.includes(k)) :
                    keywords.some(k => itemText.includes(k));
            });
            displayResults(results);
        });
    }

    // 各rec_search_wrapに対する無効化のトグル関数
    function toggleDisabled(elementId, disabled) {
        const element = document.getElementById(elementId);
        if (disabled) {
            element.classList.add('disabled');
        } else {
            element.classList.remove('disabled');
        }
    }

    // 検索フォームの初期化
    document.addEventListener('DOMContentLoaded', () => {
        const searchWordInput = document.getElementById('search_word');
        const searchTextInput = document.getElementById('search_text');
        const clearFreeSearchButton = document.getElementById('clearFreeSearch');
        const clearSearchWordButton = document.getElementById('clearSearchWord');
        const clearSearchTextButton = document.getElementById('clearSearchText');
        const clearSceneSearchButton = document.getElementById('clearSceneSearch');
        const freeSearchDiv = document.getElementById('freeSearch');
        const sceneSearchDiv = document.getElementById('sceneSearch');
        const tags = document.querySelectorAll('#sceneSearch input[type="checkbox"], #sceneSearch input[type="radio"]');

        function showClearButton(button) {
            button.style.display = 'inline-block';
        }

        function scrollToElement(element) {
            const yOffset = -16;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }

        function toggleDisabled(elementId, disabled) {
            const element = document.getElementById(elementId);
            if (element) {
                if (disabled) {
                    element.classList.add('disabled');
                    element.querySelectorAll('input:not([type="submit"])').forEach(input => input.disabled = true);
                } else {
                    element.classList.remove('disabled');
                    element.querySelectorAll('input:not([type="submit"])').forEach(input => input.disabled = false);
                }
            }
        }

        function checkInitialFormState() {
            const isSearchWordFilled = searchWordInput.value.trim() !== '';
            const isSearchTextFilled = searchTextInput.value.trim() !== '';
            const anyChecked = Array.from(tags).some(input => input.checked);

            if (isSearchWordFilled) {
                searchTextInput.disabled = true;
                showClearButton(clearSearchWordButton);
                toggleDisabled('sceneSearch', true);
            } else if (isSearchTextFilled) {
                searchWordInput.disabled = true;
                showClearButton(clearSearchTextButton);
                toggleDisabled('sceneSearch', true);
            } else if (anyChecked) {
                toggleDisabled('freeSearch', true);
            } else {
                toggleDisabled('sceneSearch', false);
                toggleDisabled('freeSearch', false);
            }
        }

        searchWordInput.addEventListener('focus', () => {
            scrollToElement(freeSearchDiv);
        });

        searchWordInput.addEventListener('input', () => {
            searchTextInput.disabled = true;
            showClearButton(clearSearchWordButton);
            toggleDisabled('sceneSearch', true);
            scrollToElement(freeSearchDiv);
        });

        searchTextInput.addEventListener('focus', () => {
            scrollToElement(freeSearchDiv);
        });

        searchTextInput.addEventListener('input', () => {
            searchWordInput.disabled = true;
            showClearButton(clearSearchTextButton);
            toggleDisabled('sceneSearch', true);
            scrollToElement(freeSearchDiv);
        });

        if (clearFreeSearchButton) {
            clearFreeSearchButton.addEventListener('click', () => {
                searchWordInput.value = '';
                searchTextInput.value = '';
                searchTextInput.disabled = false;
                searchWordInput.disabled = false;
                clearSearchWordButton.style.display = 'none';
                clearSearchTextButton.style.display = 'none';
                toggleDisabled('sceneSearch', false);
                toggleDisabled('freeSearch', false);
            });
        }

        if (clearSearchWordButton) {
            clearSearchWordButton.addEventListener('click', () => {
                searchWordInput.value = '';
                searchTextInput.disabled = false;
                clearSearchWordButton.style.display = 'none';
                if (!searchTextInput.value.trim() && !Array.from(tags).some(input => input.checked)) {
                    toggleDisabled('sceneSearch', false);
                    toggleDisabled('freeSearch', false);
                }
            });
        }

        if (clearSearchTextButton) {
            clearSearchTextButton.addEventListener('click', () => {
                searchTextInput.value = '';
                searchWordInput.disabled = false;
                clearSearchTextButton.style.display = 'none';
                if (!searchWordInput.value.trim() && !Array.from(tags).some(input => input.checked)) {
                    toggleDisabled('sceneSearch', false);
                    toggleDisabled('freeSearch', false);
                }
            });
        }

        if (clearSceneSearchButton) {
            clearSceneSearchButton.addEventListener('click', () => {
                tags.forEach(input => input.checked = false);
                if (!searchWordInput.value.trim() && !searchTextInput.value.trim()) {
                    toggleDisabled('freeSearch', false);
                    toggleDisabled('sceneSearch', false);
                }
            });
        }

        document.querySelectorAll('#freeSearch input[type="text"]').forEach(input => {
            input.addEventListener('input', () => {
                const isFilled = input.value.trim() !== '';
                toggleDisabled('sceneSearch', isFilled);
                if (!isFilled && !Array.from(tags).some(input => input.checked)) {
                    toggleDisabled('freeSearch', false);
                    toggleDisabled('sceneSearch', false);
                }
            });
        });

        tags.forEach(input => {
            input.addEventListener('change', () => {
                const anyChecked = Array.from(tags).some(input => input.checked);
                toggleDisabled('freeSearch', anyChecked);
                if (!anyChecked && !searchWordInput.value.trim() && !searchTextInput.value.trim()) {
                    toggleDisabled('freeSearch', false);
                    toggleDisabled('sceneSearch', false);
                }
                if (anyChecked) {
                    scrollToElement(sceneSearchDiv);
                }
            });
        });

        checkInitialFormState();
    });





    </script>


