/**
 * コンソールログへのデバッグ出力を有効にする場合はコンソールに以下を入力
 * TtrConsole.start()
 * 
 * 手動でシナリオ関連をTrackerへ通知する場合はコンソールに以下を入力
 * _wsq.push(['test', 'view', scenarioId, creativeId]);
 * _wsq.push(['test', 'reaction', scenarioId, creativeId]);
 * _wsq.push(['test', 'direct', scenarioId, creativeId]);
 * _wsq.push(['test', 'indirect', scenarioId, creativeId]);
 * 
 */

(function (window, document, queueName) {
    if (!window.TtrConsole) {
        window.TtrConsole = {
            STORAGE_KEY: 'use_ttr_console',
            use: false,
            init: function () {
                if (localStorage) {
                    try {
                        if (localStorage.getItem(this.STORAGE_KEY) == '1') {
                            this.start();
                        }
                    } catch (e) {
                    }
                }
            },
            start: function () {
                this.use = true;
                if (localStorage) {
                    try {
                        localStorage.setItem(this.STORAGE_KEY, '1');
                    } catch (e) {
                    }
                }
            },
            stop: function () {
                this.use = false;
                if (localStorage) {
                    try {
                        localStorage.removeItem(this.STORAGE_KEY);
                    } catch (e) {
                    }
                }
            },
            log: function (text) {
                if (this.use) {
                    console.log(text);
                }
            },
            error: function (text) {
                if (this.use) {
                    console.error(text);
                }
            }
        };
        window.TtrConsole.init();
    }

    if (!window.TtrInvalidation) {
        // タグの一時的な無効化
        window.TtrInvalidation = {
            STORAGE_KEY: 'use_ttr_invalidation',
            invalidation: false,
            init: function () {
                if (localStorage) {
                    try {
                        if (localStorage.getItem(this.STORAGE_KEY) == '1') {
                            this.start();
                        }
                    } catch (e) {
                    }
                }
            },
            start: function () {
                this.invalidation = true;
                if (localStorage) {
                    try {
                        localStorage.setItem(this.STORAGE_KEY, '1');
                    } catch (e) {
                    }
                }
            },
            stop: function () {
                this.invalidation = false;
                if (localStorage) {
                    try {
                        localStorage.removeItem(this.STORAGE_KEY);
                    } catch (e) {
                    }
                }
            },
            isInvalidation: function () {
                return this.invalidation;
            },
        };
        window.TtrInvalidation.init();
    }

    var Device = function() {

        // デバイスの種類
        this.DEVICE_PC = 'pc';
        this.DEVICE_SPHONE = 'sphone';
        this.DEVICE_TABLET = 'tablet';
        this.DEVICE_ETC = 'etc';

        // OS
        this.OS_WINDOWS = 'windows';
        this.OS_MAC = 'mac';
        this.OS_LINUX = 'linux';
        this.OS_IOS = 'ios';
        this.OS_IPADOS = 'ipados';
        this.OS_ANDROID = 'android';
        this.OS_ETC = 'etc';

        // ブラウザ
        this.BROWSER_IE = 'ie';
        this.BROWSER_EDGE = 'edge';
        this.BROWSER_CHROME = 'chrome';
        this.BROWSER_SAFARI = 'safari';
        this.BROWSER_FIREFOX = 'firefox';
        this.BROWSER_OPERA = 'opera';
        this.BROWSER_ANDROID_BROWSER = 'android_browser'; // Android標準ブラウザ
        this.BROWSER_ETC = 'etc';

        this.ua = '';

        // デバイスの種類
        this.device = '';

        // OS
        this.os = '';

        // ブラウザ
        this.browser = '';

        // ブラウザバージョン (IE, Edge, Safari, Chrome の時のみセットされる)
        this.browserVersion = '';
        
        // クリエイティブ表示対応
        this.creativeSupported = true;
        
        // クローラーかどうか
        this.crawler = false;

        this.initialize = function(options) {
            this.ua = navigator.userAgent;
            if (options && options.userAgent !== undefined) {
                this.ua = options.userAgent;
            }
            this.device = this.DEVICE_ETC;
            this.os = this.OS_ETC;
            this.browser = this.BROWSER_ETC;
            this.creativeSupported = true;
            this.crawler = false;

            var lowUa = this.ua.toLowerCase();

            // ブラウザの判定 (IE, Edge, Safari, Chrome のみバージョンによってサポートする、しないがある)
            var isSupportedVersion = true;
            if (lowUa.indexOf('edg') != -1) {
                // edge には chrome safari が含まれるので最初に判定させる
                this.browser = this.BROWSER_EDGE;
                // バージョンを取得する
                var match = lowUa.match(/edge?\/(\d+\.\d+)/);
                if (match) {
                    this.browserVersion = match[1];
                    if (parseInt(match[1]) < 79) {
                        // Microsoft Edge Legacy はサポート対象外
                        isSupportedVersion = false;
                    }
                }
            } else if (lowUa.indexOf('opera') != -1) {
                this.browser = this.BROWSER_OPERA;
            } else if (lowUa.indexOf('firefox') != -1) {
                this.browser = this.BROWSER_FIREFOX;
            } else if (lowUa.indexOf('chrome') != -1) {
                // chrome には safari が含まれるので safari より先に判定させる
                this.browser = this.BROWSER_CHROME;
                // バージョンを取得する
                var match = lowUa.match(/chrome\/(\d+\.\d+)/);
                if (match) {
                    this.browserVersion = match[1];
                    if (parseInt(match[1]) < 50) {
                        // Chrome50未満はサポート対象外
                        isSupportedVersion = false;
                    }
                }
            } else if (lowUa.indexOf('safari') != -1) {
                this.browser = this.BROWSER_SAFARI;
                // バージョンを取得する
                var match = lowUa.match(/version\/(\d+\.\d+)/);
                if (match) {
                    this.browserVersion = match[1];
                    if (parseInt(match[1]) < 12) {
                        // Safari12未満はサポート対象外
                        isSupportedVersion = false;
                    }
                }
            } else if (lowUa.indexOf('msie') != -1) {
                // IE10以下
                this.browser = this.BROWSER_IE;
                // バージョンを取得する
                var match = lowUa.match(/msie\s?(\d+\.\d+)/);
                if (match) {
                    this.browserVersion = match[1];
                }
                isSupportedVersion = false; // IE10以下はサポート対象外
            } else if (lowUa.indexOf('trident') != -1) {
                // IE11以上
                this.browser = this.BROWSER_IE;
                // バージョンを取得する
                var match = lowUa.match(/rv:?\s?(\d+\.\d+)/);
                if (match) {
                    this.browserVersion = match[1];
                }
            }
            
            // デバイスとOSの判定
            if (lowUa.indexOf('iphone') != -1) {
                // iPhone
                this.device = this.DEVICE_SPHONE;
                this.os = this.OS_IOS;
            } else if (lowUa.indexOf('ipad') != -1) {
                // iPad
                var iPadOsVersion = 13; // ipadOSとしてスタートしたバージョン
                this.device = this.DEVICE_TABLET;

                var cutStart = lowUa.indexOf('ipad; cpu os ');
                var cutEnd = lowUa.indexOf('like', cutStart);
                var osVersion = lowUa.substring(cutStart + 13, cutEnd - 1);

                if (parseInt(osVersion) >= iPadOsVersion) {
                    this.os = this.OS_IPADOS;
                } else {
                    this.os = this.OS_IOS;
                }
            } else if (lowUa.indexOf('android') != -1) {
                // Android
                this.os = this.OS_ANDROID;
                if (lowUa.indexOf('mobile') != -1) {
                    this.device = this.DEVICE_SPHONE;
                } else {
                    this.device = this.DEVICE_TABLET;
                }
            } else if (lowUa.indexOf('windows') != -1) {
                // Windows
                this.device = this.DEVICE_PC;
                this.os = this.OS_WINDOWS;
            } else if (lowUa.indexOf('mac') != -1) {
                if ('ontouchend' in document) {
                    // ipad
                    // iPadOS の iPad はタッチイベントで判定する
                    this.device = this.DEVICE_TABLET;
                    this.os = this.OS_IPADOS;
                } else {
                    // Mac
                    this.device = this.DEVICE_PC;
                    this.os = this.OS_MAC;
                }
            } else if (lowUa.indexOf('linux') != -1) {
                // Linux (サポートブラウザはなし)
                this.device = this.DEVICE_PC;
                this.os = this.OS_LINUX;
            }

            // 特殊なケース
            if (
                this.os == this.OS_IOS
            &&  this.browser == this.BROWSER_SAFARI
            &&  lowUa.indexOf('crios') != -1
            ) {
                // iOSのChrome
                this.browser = this.BROWSER_CHROME;
            }
            if (
                this.os == this.OS_ANDROID
            &&  (this.browser == this.BROWSER_SAFARI || this.browser == this.BROWSER_CHROME)
            &&  lowUa.indexOf('linux; u;') != -1
            ) {
                // Androidの標準ブラウザ
                this.browser = this.BROWSER_ANDROID_BROWSER;
                this.creativeSupported = false; // safari or chrome ではなくなったので非サポートへ
            }
            if (
                this.device == this.DEVICE_TABLET
            &&  this.os == this.OS_ANDROID
            &&  this.browser == this.BROWSER_OPERA
            &&  lowUa.indexOf('opera mobi') != -1
            ) {
                // AndroidのOpera
                this.device = this.DEVICE_SPHONE;
            }

            // 暫定対応
            if (
                this.os == this.OS_ANDROID
            &&  this.browser == this.BROWSER_CHROME
            &&  lowUa.indexOf(' 304sh ') != -1
            &&  lowUa.indexOf('version/') != -1
            ) {
                // 304SHの標準ブラウザ
                this.browser = this.BROWSER_ANDROID_BROWSER;
                this.creativeSupported = false; // safari or chrome ではなくなったので非サポートへ
            }
            
            if (!isSupportedVersion) {
                // ブラウザ自体はサポートされていても、バージョンが低いためNG
                this.creativeSupported = false;
            }

            // クローラーと思われるUser-Agent内のキーワードをアルファベット順に列挙
            var crawlers = [
                '',
                '008',
                '8legs',
                'android',
                'browserlet',
                'bubing (+http://law.di.unimi.it/bubing.html)',
                'cakephp',
                'casterly',
                'crpguj',
                'en-us',
                'example',
                'gensun.org',
                'go 1.1 package http',
                'goldfire server',
                'go-http-client/1.1',
                'guardcrwlr',
                'help@dataminr.com',
                'hivemind',
                'http cnrdn',
                'internet explorer',
                'jack',
                'java',
                'm',
                'msie 7.0',
                'myuseragent',
                'node.js',
                'null',
                'panscient.com',
                'payb-agent',
                'peerindex',
                'postano',
                'qacc browser',
                'rootlink',
                'ruby',
                'shortlinktranslate',
                'site24x7',
                'start.exe',
                'structuredweb agent',
                'symfony browserkit',
                'test_internet_agent',
                'undefined',
                'url check program',
                'urlredirectresolver',
                'voltron',
                'webindex',
                'web-robot',
                'yahoocachesystem',
            ];
            // 文字列でのチェック（完全一致）
            for (var i = 0; i < crawlers.length; i++) {
                if (lowUa == crawlers[i]) {
                    this.crawler = true;
                    break;
                }
            }

            // クローラーと思われるUser-Agent内のキーワードをアルファベット順に列挙
            var crawlers = [
                ' ()',
                ' (linux)',
                ' cbot/',
                ' dbot/',
                ' nbot/',
                ' obot/',
                '200pleasebot',
                'a6-indexer',
                'aboundex',
                'aboutusbot',
                'add catalog',
                'admantx',
                'adsbot',
                'ahrefsbot',
                'aihitbot',
                'alphabot',
                'androiddownloadmanager',
                'anemone/',
                'angeldonate',
                'another_html-lint',
                'apachebench',
                'appengine-google',
                'archive.org_bot',
                'atig::http',
                'axios',
                'baidu',
                'barkrowler',
                'bingbot',
                'binlar',
                'bitlybot',
                'blexbot',
                'blp_bbot',
                'boobot',
                'bot.araturka.com',
                'buck/',
                'ccbot',
                'censysinspect',
                'centurybot',
                'ceron.jp/',
                'chizen',
                'coccoc',
                'contextad bot',
                'crawler',
                'crowsnest',
                'curl/',
                'cyotekwebcopy',
                'dataforseobot',
                'datagnionbot',
                'dataprovider.com',
                'daum.net',
                'dcrawl',
                'deepnoc',
                'diffbrowser',
                'diggbot',
                'discovered',
                'domains project',
                'domainsbot',
                'dotbot',
                'download ninja',
                'duckduckbot',
                'duckduckgo-favicons-bot',
                'elinks',
                'ephorusbot',
                'exabot',
                'facebookbot',
                'facebookexternalhit',
                'facebot',
                'faraday',
                'fess.codelibs.org',
                'fetchbot',
                'fetchtitle',
                'fi_dbps_linkchecker',
                'freshpingbot',
                'freshreader',
                'gachecker',
                'genieo',
                'gettor',
                'geturlinfo',
                'gigablastopensource',
                'go http package',
                'google_analytics_snippet_validator',
                'googlebot',
                'googledocs',
                'google-apps-script',
                'google-http-java-client',
                'google-structureddatatestingtool',
                'h2c/',
                'happyoubot',
                'hatena antenna',
                'hatena pagetitle agent',
                'hatena::bookmark',
                'hatenabookmark',
                'heritrix',
                'honolulubot',
                'htmlparser',
                'httpclient',
                'hyperestraier',
                'ia_archiver',
                'ichiro',
                'icjobs',
                'icoreservice',
                'imrbot',
                'inagist url resolver',
                'indeedbot',
                'intelx.io_bot',
                'i-robot',
                'irvine',
                'istellabot',
                'java/',
                'jetslide',
                'jlisting deadlinkchecker',
                'kaspersky lab content filtering research',
                'keybot',
                'klsh-pageget',
                'komodiabot',
                'kraken',
                'kukui_bot',
                'larbin',
                'libwww-perl',
                'line-poker',
                'linguee bot',
                'linkfluence.com',
                'linkpadbot',
                'livelapbot',
                'loadtimebot',
                'longurl api',
                'ltx71',
                'lwp::simple',
                'lwp-trivial',
                'madbbot',
                'magpierss',
                'mail.ru_bot',
                'mappy',
                'maven',
                'meanpathbot',
                'mechanize',
                'mediapartners-google',
                'metauri',
                'microsoft office excel',
                'microsoft office existence discovery',
                'microsoft office mobile',
                'microsoft office protocol discovery',
                'microsoft office word',
                'microsoft windows network diagnostics',
                'microsoft-webdav-miniredir',
                'mifetcher',
                'mixrankbot',
                'mj12bot',
                'mlib_networkbot',
                'mnogosearch',
                'mobile goo',
                'mojolicious',
                'motibot',
                'mozzila',
                'mozzilla',
                'msnbot',
                'myagent',
                'myclinicbot',
                'ndl-japan-warp',
                'nearly bot',
                'nerdybot',
                'netcraftsurveyagent',
                'netkids',
                'newsme',
                'newspaper/',
                'niki-bot',
                'nimbostratus-bot',
                'nttdatanazukiapp',
                'nutch',
                'odp link checker',
                'oocurl',
                'openhosebot',
                'openstat',
                'orbbot',
                'p4bot',
                'page2rss',
                'pagesinventory',
                'paperlibot',
                'pear http_request',
                'petalbot',
                'php/',
                'pilican',
                'pingdom.com',
                'plurkbot',
                'prtg network monitor',
                'psbot',
                'python',
                'qrafter',
                'qwantify',
                're-re studio',
                'readability',
                'riddler',
                'robosourcer',
                'rocky chatwork mobile',
                'rogerbot',
                'rsiteauditor',
                'scrapy',
                'searchmetricsbot',
                'seekportbot',
                'semrushbot',
                'seoengworldbot',
                'seokicks',
                'serpstatbot',
                'seznambot',
                'shisuh',
                'showyoubot',
                'siclab',
                'simplepie',
                'siteexplorer',
                'sitesucker',
                'slackbot-linkexpanding',
                'socialbm_bot',
                'someone searched for this site on',
                'spbot',
                'spider',
                'sqlmap',
                'steeler',
                'thumboweb_bot',
                'turnitin',
                'tweetedtimes bot',
                'tweetmemebot',
                'twieve',
                'twitterbot',
                'u12bot',
                'umbot',
                'uptime.com',
                'urlappendbot',
                'urlchecker',
                'w3c_validator',
                'w3m/',
                'wasalive-bot',
                'wbsearchbot',
                'wce_link_checker',
                'website explorer',
                'wget/',
                'whatweb',
                'who.is bot',
                'wordpress',
                'wotbox',
                'wsr-agent',
                'www.socialayer.com agent',
                'www::document',
                'wwwc/',
                'wxplr/',
                'xenu link sleuth',
                'xovibot',
                'y!j searchmonkey',
                'y!j-',
                'yahoochiebukuroredirectcheckaccess',
                'yahoomobilemessenger',
                'yahooseeker',
                'yandexbot',
                'yandexfavicons',
                'yeti/',
                'yodaobot',
                'zabbix',
                'zemlyacrawl',
                'zitebot',
                'zoominfobot',
                'zumbot',
                'zxing',
            ];
            // 文字列でのチェック（部分一致）
            for (var i = 0; i < crawlers.length; i++) {
                if (lowUa.indexOf(crawlers[i]) != -1) {
                    this.crawler = true;
                    break;
                }
            }
            
            // 正規表現でのチェック
            if (lowUa.match(/yahoo!.+slurp/)) {
                this.crawler = true;
            }
        };

        this.initialize.apply(this, arguments);

        this.getDevice = function() {
            return this.device;
        };

        this.getOs = function() {
            return this.os;
        };

        this.getBrowser = function() {
            return this.browser;
        };

        this.getBrowserVersion = function() {
            return this.browserVersion;
        };

        this.isCreativeSupported = function() {
            return this.creativeSupported;
        };

        this.isCrawler = function() {
            return this.crawler;
        };

        this.getDeviceInfo = function() {
            return {
                device: this.getDevice(),
                os: this.getOs(),
                browser: this.getBrowser(),
                browserVersion: this.getBrowserVersion()
            };
        };
    };
    
    var HttpClient = function () {
        var timeout = 3000;
        var encodeData = function (data) {
            var params = [];
            for (var key in data) {
                var value = data[key];
                var param = encodeURIComponent(key) + '=' + encodeURIComponent(value);
                params.push(param);
            }
            return params.join('&').replace(/%20/g, '+');
        };
        this.post = function (url, data, callback) {
            var data = encodeData({data: JSON.stringify(data)});

            if (window.XMLHttpRequest) {
                var request = new XMLHttpRequest();
                request.onreadystatechange = function (evt) {
                    if (request.readyState == 4) { // 通信完了
                        if (request.status == 200) {
                            var ret = request.response;
                            if (typeof ret == 'string') {
                                // JSONデコードが必要
                                ret = JSON.parse(ret);
                            }
                            callback(ret);
                        }
                    }
                };
                request.open('post', url, true);
                request.timeout = timeout; // XMLHttpRequest.timeoutの指定はopenとsendの間で行う必要がある
                request.setRequestHeader('Accept', 'application/json');
                request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                request.responseType = 'json';
                request.send(data);
            } else if (window.XDomainRequest) {
                // IE9用
                // application/x-www-form-urlencoded が使えないので、データはGETパラメータで渡す必要がある
                url += '?' + data; // GETパラメータで渡す
                var request = new XDomainRequest();
                request.timeout = timeout;
                request.onload = function () {
                    var ret = request.responseText;
                    if (typeof ret == 'string') {
                        // JSONデコードが必要
                        ret = JSON.parse(ret);
                    }
                    callback(ret);
                };
                request.open('POST', url);
                request.send(''); // 
            }
        };

        this.get = function (url, data, callback) {
            data = encodeData(data);

            // 分散サーバーのどれと通信するか決定する
            if (window.XMLHttpRequest) {
                var request = new XMLHttpRequest();
                request.onreadystatechange = function (evt) {
                    if (request.readyState == 4 && request.status == 200) { // 通信完了
                        callback(request.responseText);
                    }
                };
                request.open('get', url, true);
                request.timeout = timeout; // XMLHttpRequest.timeoutの指定はopenとsendの間で行う必要がある
                request.send(data);
            } else if (window.XDomainRequest) {
                // IE9用
                // application/x-www-form-urlencoded が使えないので、データはGETパラメータで渡す必要がある
                var request = new XDomainRequest();
                request.timeout = timeout;
                request.onload = function () {
                    callback(request.responseText);
                };
                request.open('GET', url);
                request.send(data); //
            }
        }
    };

    /**
     * Tracker が実行される前の処理を行うクラス
     */
    var PreTracker = {
        init: function () {
            var clientId = '';
            var domains = [];
            var queue = window[queueName] || [];
            for (var i = 0; i < queue.length; i++) {
                switch (queue[i][0]) {
                    case 'init':
                        clientId = queue[i][2];
                        break;
                    case 'domain':
                        domains.push(queue[i][1]);
                        break;
                }
            }

            if (!clientId) {
                return false;
            }

            // Cookie関連の前準備
            this.setCookieKey(clientId);
            this.setUrlParam();

            // COOKIEからユーザーIDを取得
            if (!Tracker.userId && document.cookie) {
                var regex = new RegExp('(?:^\\s*|\\s*;)\\s*' + Tracker.cookieKey + '\\s*=\\s*([0-9a-z]+)\\s*(?:;|$)', 'i');
                var match = document.cookie.match(regex);
                if (match) {
                    Tracker.userId = match[1];
                }
            }

            // Local StorageからユーザーIDを取得
            if (!Tracker.userId) {
                try {
                    var data = localStorage.getItem(Tracker.cookieKey);
                    if (data) {
                        data = JSON.parse(data);
                        if (data && data.userId && data.expires && (new Date()).getTime() < data.expires ) {
                            Tracker.userId = data.userId;
                        }
                    }
                } catch (e) {
                }
            }
        },
        setCookieKey: function (clientId) {
            Tracker.cookieKey = '_ws_' + clientId;
            Tracker.trackingConsentCookieKey = Tracker.cookieKey + '_tracking_consent';
        },
        setUrlParam: function () {
            // URLパラメータ・Cookieの同意状況の比較優先用
            var paramUpdateTime = 0;
            var cookieUpdateTime = 0;
            var paramTrackingConsent = '';
            var cookieTrackingConsent = '';

            // URLパラメータからユーザーID、トラッキング同意状況を取得
            if (location.search) {
                var match = location.search.match(/_ttr=([0-9a-f_]+)tc([0-6])(\d{13})/i);
                if (match) {
                    paramUpdateTime = match[3];
                    if ((new Date()).getTime() - paramUpdateTime <= 30000) {
                        // 30秒以内
                        var paramUserId = match[1];
                        if (paramUserId != Tracker.TRACKING_CONSENT_NOT_AGREED_USER_ID) {
                            // トラッキング同意していて userId を割り振られていたら設定する
                            Tracker.userId = paramUserId;
                            // 削除予約になっているユーザーが設定されるパターンがあるので、ApiController ユーザーの存在確認のタイミングで確認する
                            Tracker.checkUserAccessDataDeleteQueue = true;
                        }
                        paramTrackingConsent = Tracker.trackingStatusList[match[2]];
                    }
                }
            }

            // COOKIEからTrackingConsent を取得
            if (document.cookie) {
                var regex = new RegExp(Tracker.trackingConsentCookieKey + '=([a-zA-Z]+)-(\\d{13});?', 'i');
                var match = document.cookie.match(regex);
                if (match) {
                    cookieTrackingConsent = match[1];
                    cookieUpdateTime = match[2];
                }
            } else {
                cookieTrackingConsent = 'none';
            }

            // 更新時間が新しい方を優先的に使用する。
            var currentTrackingConsent = cookieTrackingConsent;
            if (cookieUpdateTime < paramUpdateTime) {
                currentTrackingConsent = paramTrackingConsent;
            }

            // トラッキング同意のプレビュー
            var previewTrackingConsent = null;
            var execPreviewTrackingConsent = !paramTrackingConsent;
            if (execPreviewTrackingConsent && location.search.indexOf('_ttr_tracking_optout') !== -1) {
                execPreviewTrackingConsent = false;
                switch (currentTrackingConsent) {
                    case 'optout':
                    case 'needless':
                        previewTrackingConsent = 'opt';
                        break;
                }
            }
            if (execPreviewTrackingConsent) {
                var match = location.search.match(/_ttr_tracking_consent_preview_key=(needless|required)/);
                if (match) {
                    execPreviewTrackingConsent = false;
                    previewTrackingConsent = match[1];
                }
            }

            if (previewTrackingConsent) {
                Tracker.isTrackingConsentPreview = true;
                if (cookieUpdateTime !== Tracker.getTrackingConsentTime()) {
                    // 初回はプレビュー用ステータスを使用する
                    Tracker.trackingConsent = previewTrackingConsent;
                } else {
                    // それ以降は画面操作の同意状況を使用する
                    Tracker.trackingConsent = cookieTrackingConsent;
                }
            } else {
                Tracker.trackingConsent = currentTrackingConsent;
            }
        }
    };

    var Tracker = {
        baseHost: '', // APIアクセスなどに使うホスト名
        apiDomain: '', // APIアクセスにつかうドメイン
        clientId: '',
        userId: '', // PreTrackerから初期化される
        domains: [],
        pageUrl: '', // ページのURL
        canonicalParam: '', // canonicalで指定されたURLパラメータ
        canonicalUrl: '', // canonicalで指定されたURL
        urlParam: '', // URLのパラメータ
        accessUrl: '', // サーバーから送られてくるURL (pageUrl or canonicalUrl)
        accessDate: '', // サーバーから送られてくるアクセス日時
        title: '',
        attrs: {},

        conversion: false,
        checkGoalTypeSpecific: 1,
        checkGoalTypeConversion: 2,
        checkGoalTypeAll: 3,

        debounceAccessTimerId: null,
        alreadyAccess: false,

        userData: {},
        trackData: {},
        engagementSettingData: {},

        ScenarioManager: null,
        scenarioList: [],
        viewCreativeList: null,
        isPreview: false,

        trackingConsent: null,
        TrackingConsentManager: null,
        trackingStatusList: {
            0: 'none',
            1: 'needless',
            2: 'required',
            3: 'agreed',
            4: 'denied',
            5: 'opt',
            6: 'optout'
        },
        isTrackingConsentPreview: false,
        getTrackingConsentTime: function () {
            return (!this.isTrackingConsentPreview) ? (new Date()).getTime() : '0000000000000';
        },
        checkUserAccessDataDeleteQueue: false,
        TRACKING_CONSENT_NOT_AGREED_USER_ID: '________________________________',

        Device: new Device(),
        
        HttpClient: new HttpClient(),
        
        cookieKey: '', // PreTrackerから初期化される
        trackingConsentCookieKey: '', // PreTrackerから初期化される

        sojournStartDate: null, // 計測開始時間 (access通知が完了したときのDateオブジェクト)

        templateId: '', // クリエイティブのテンプレートID

        UserAnalysisManager: null,
        clientCvData: [], // ユーザー分析のCV設定

        publicHolidayList: [],
        creativeRestriction: [],
        useCanonical: null,

        parseCommand: function (args) {
            switch (args.shift()) {
                case 'init': // 初期化
                    this.init(args[0], args[1], args[2]);
                    break;
                case 'user': // ユーザ属性を設定
                    this.setUserAttr(args[0], args[1]);
                    break;
                case 'domain': // 許可ドメイン追加
                    this.domains.push(args[0]);
                    this.debounceAccess();
                    break;
                case 'conversion': // コンバージョン
                    if (this.conversion === false) {
                        this.conversion = true;
                        if (this.alreadyAccess === false) {
                            this.debounceAccess();
                        } else {
                            this.notifyConversion();
                        }
                    }
                    break;
                case 'UserAnalysisManager': // クラスオブジェクトを割り当て
                    this.UserAnalysisManager = args[0];
                    break;
                case 'scenarioManager': // クラスオブジェクトを割り当て
                    this.ScenarioManager = args[0];
                    break;
                case 'trackingConsentManager': // クラスオブジェクトを割り当て
                    this.TrackingConsentManager = args[0];
                    break;
                case 'template': // クリエイティブテンプレートブジェクトを通知
                    var template = args[0];
                    var templateId = args[1];
                    for (var i = 0; i < this.viewCreativeList.length; i++) {
                        if (this.viewCreativeList[i].templateId == templateId) {
                            template.init(this.viewCreativeList[i], this);
                            break;
                        }
                    }
                    break;
                case 'answer': // 回答
                    // 実機プレビューの判定
                    if (this.viewCreativeList === null) {
                        break;
                    }

                    var creativeData = null;
                    for (var i = 0; i < this.viewCreativeList.length; i++) {
                        if (this.viewCreativeList[i].creativeId == args[0]) {
                            creativeData = this.viewCreativeList[i];
                            break;
                        }
                    }
                    if (!creativeData) {
                        return;
                    }
                    this.notifyAnswer({
                        creativeId: args[0],
                        scenarioId: creativeData.scenarioId,
                        chatQuestionKey: args[1],
                        chatAnswerKey: args[2]
                    }, args[3]);
                    break;
                case 'creative':
                    var type = args[0];
                    var creativeId = args[1];
                    var callback = args[2];

                    // 実機プレビューの判定
                    if (this.viewCreativeList === null) {
                        break;
                    }

                    for (var i = 0; i < this.viewCreativeList.length; i++) {
                        if (this.viewCreativeList[i].creativeId == creativeId) {
                            this.notifyCreative(type, this.viewCreativeList[i].scenarioId, creativeId, callback);
                            break;
                        }
                    }
                    break;
                case 'test': // テスト用コマンド
                    this.test(args);
                    break;
            }
        },
        init: function (baseHost, clientId, apiDomain) {
            this.baseHost = baseHost;
            this.clientId = clientId;
            this.apiDomain = apiDomain;

            this.pageUrl = location.hostname + location.pathname;

            this.canonicalUrl ='';
            this.canonicalParam ='';
            var links = document.getElementsByTagName('link');
            for (var i = links.length; i--; ) {
                var link = links[i];
                if (link.getAttribute('rel') == 'canonical' && link.getAttribute('href')) {
                    var canonicalUrl = link.getAttribute('href');
                    var match = canonicalUrl.match(/^https?:\/\/([^\/:]+)(?::\d+)?(\/[^?&#]*)/i);
                    if (match) {
                        this.canonicalUrl = match[1] + match[2];

                        var canonicalParam = link.getAttribute('href').match(/\?.+/);
                        if (canonicalParam) {
                            canonicalParam = canonicalParam[0];
                            canonicalParam = canonicalParam.replace(/#.+/, '');
                            this.canonicalParam = canonicalParam;
                        }
                        break;
                    }
                }
            }
            this.urlParam = location.search;

            this.title = '';
            var titles = document.getElementsByTagName('title');
            if (titles[0]) {
                this.title = titles[0].innerText;
            }

            // scenario.jsを読み込む
            var scenarioScriptTagId = 'ttr_scenario_script_tag';
            if (document.getElementById(scenarioScriptTagId) === null) {
                var scenarioScript = document.createElement('script');
                scenarioScript.async = 1;
                scenarioScript.charset = 'UTF-8';
                scenarioScript.id = scenarioScriptTagId;
                scenarioScript.src = 'https://cdn.' + this.baseHost + '/share/js/scenario.js';

                var script = document.getElementsByTagName('script')[0];
                script.parentNode.insertBefore(scenarioScript, script);
            }

            // 実機プレビューかどうか
            if (location.search) {
                var match = location.search.match(/_ttr_preview_key=([0-9]+)-([0-9a-f]+)/i);
                if (match) {
                    this.preview(match[1], match[2]);
                }
            }
        },
        syncFromServerResponse: function (response) {
            if (!response.userData || !response.trackData) {
                return;
            }
            if (response.accessUrl) {
                this.accessUrl = response.accessUrl;
            }
            if (response.accessDate) {
                this.accessDate = response.accessDate;
            }
            var userData = response.userData;
            var trackData = response.trackData;
            var engagementSettingData = response.engagementSettingData;
            this.userId = userData.userId;
            this.userData = userData;
            this.trackData = trackData;
            if (response.trackingConsent) {
                this.trackingConsent = response.trackingConsent;
            }
            if (engagementSettingData) {
                // レスポンスに engagementSettingData があるときだけ
                this.engagementSettingData = engagementSettingData;
            }
            if (response.clientCvData) {
                this.clientCvData = response.clientCvData;
            }
            if (response.scenarioList) {
                this.scenarioList = response.scenarioList;
            }
            if (response.viewCreativeList) {
                this.viewCreativeList = response.viewCreativeList;
            }
        },
        updateCookie: function () {
            if (this.trackingConsent == 'neno'
                || this.trackingConsent == 'opt'
            ) {
                // cookie に記録しない
            } else {
                var keepDays = 30;
                if (this.trackingConsent == 'optout') {
                    keepDays = 365;
                }
                var trackingConsentMaxAge = 60 * 60 * 24 * keepDays; // トラッキング同意のCOOKIEの有効期限は30日
                // 指定された同意ステータスが存在するものなら、Cookieに登録
                var keys = Object.keys(this.trackingStatusList);
                for (var i = 0; i < keys.length; i++) {
                    if (this.trackingStatusList[keys[i]] === this.trackingConsent) {
                        document.cookie = this.trackingConsentCookieKey + '=' + this.trackingConsent + '-' + this.getTrackingConsentTime() + ';path=/;max-age=' + trackingConsentMaxAge;
                        break;
                    }
                }
            }

            var policySiteFormUserIdElement = document.getElementById('post_policy_site_form_user_id');
            if (policySiteFormUserIdElement) {
                // 既にポリシー画面に遷移するためのフォームが生成されていれば userid を書き換えて同期する
                policySiteFormUserIdElement.value = this.userId;
            }

            switch (this.trackingConsent) {
                case 'denied':
                case 'optout':
                    document.cookie = this.cookieKey + '=;path=/;max-age=0;';
                    document.cookie = this.cookieKey + '_form_withdrawal=;path=/;max-age=0;';
                    document.cookie = this.cookieKey + '_page_sojourn_time=;path=/;max-age=0;';
                    localStorage.removeItem(this.cookieKey);
                    return;
            }

            if (!this.userId) {
                return;
            }

            var maxAge = 60 * 60 * 24 * 365; // COOKIEの有効期限は1年
            document.cookie = this.cookieKey + '=' + encodeURIComponent(this.userId) + ';path=/;max-age=' + maxAge;
            var userData = {
                userId: this.userId,
                expires: (new Date()).getTime() + maxAge * 1000,
            };
            try {
                localStorage.setItem(this.cookieKey, JSON.stringify(userData));
            } catch (e) {
            }
        },
        /**
         * accessメソッドを呼び出す (debounce対応)
         */
        debounceAccess: function () {
            if (this.debounceAccessTimerId) {
                clearTimeout(this.debounceAccessTimerId);
                this.debounceAccessTimerId = null;
            }
            this.debounceAccessTimerId = setTimeout(function () {
                Tracker.access(Tracker.trackingConsent);
            }, 100);
        },
        /**
         * アクセス通知
         */
        access: function (trackingConsent) {
            if (this.alreadyAccess || this.isPreview) {
                // 既にアクセス済み or プレビューモード
                return;
            }
            this.alreadyAccess = true;
            TtrConsole.error('access start');
            
            if (!this.clientId || !this.domains.length) {
                TtrConsole.error({'Invalid Access': 1});
                return false;
            }

            if (this.isDisabledClient(this.clientId)) {
                TtrConsole.error({'Disabled Client': 1});
                return false;
            }

            if (this.Device.isCrawler()) {
                // クローラー
                TtrConsole.error({'Exclude Crawler': 1});
                return false;
            }

            if (this.domains.indexOf(location.hostname) == -1) {
                this.pageUrl = '';
            }
            if (this.canonicalUrl) {
                if (this.domains.indexOf(this.canonicalUrl.split('/')[0]) == -1) {
                    this.canonicalUrl = '';
                }
            }
            if (!this.pageUrl && !this.canonicalUrl) {
                TtrConsole.error({'Unmatched Domain': 1});
                return false;
            }

            var language = '';
            if (navigator.languages && navigator.languages[0]) {
                language = navigator.languages[0];
            } else {
                language = navigator.browserLanguage || navigator.language || navigator.userLanguage;
            }

            var pixelRatio = window.devicePixelRatio ? window.devicePixelRatio : 1;
            var sendData = {
                clientId: this.clientId,
                userId: this.userId,
                userDevice: this.Device.getDeviceInfo(),
                userLanguage: language,
                pageUrl: this.pageUrl,
                canonicalUrl: this.canonicalUrl,
                urlParam: this.urlParam,
                title: this.title,
                conversion: this.conversion ? '1' : '0',
                userAgent: this.Device.ua,
                screenWidth: screen.availWidth * pixelRatio,
                screenHeight: screen.availHeight * pixelRatio,
                windowWidth: window.innerWidth * pixelRatio,
                windowHeight: window.innerHeight * pixelRatio,
                trackingConsent: trackingConsent,
                queryParam: location.search,
                checkUserAccessDataDeleteQueue: this.checkUserAccessDataDeleteQueue,
            };
            if (Object.keys(this.attrs).length) {
                sendData.userAttrs = this.attrs;
            }
            if (document.referrer) {
                sendData.userReferer = this.getRefererData();
            }

            var apiUrl = this.apiDomain + '/api/access';
            var self = this;
            this.HttpClient.post(apiUrl, sendData, function (response) {
                TtrConsole.error('access complete');
                TtrConsole.error(response);
                if (!response) {
                    return;
                }
                if (response['Exclude IP Address'] || response['Limit PV Count']) {
                    // 除外IPアドレス or 上限に達していた ユーザーのアクセス
                    return;
                }
                self.syncFromServerResponse(response);
                self.publicHolidayList = response.publicHolidayList ? response.publicHolidayList : [];
                self.creativeRestriction = response.creativeRestriction ? response.creativeRestriction : [];
                self.useCanonical = response.useCanonical === 'enable';

                // トラッキング同意チェック
                if (response.trackingConsent) {
                    Tracker.trackingConsent = response.trackingConsent;
                }
                Tracker.updateCookie(); // クッキーを更新

                // 同意状況のCookie設定、表示オオブジェクト・トラッキング実行の制御
                var continueTracking = true;
                var showTrackingConsentObj = response.useTrackingConsent;
                switch (Tracker.trackingConsent) {
                    case 'required':
                    case 'denied':
                        continueTracking = false;
                        showTrackingConsentObj &= true;
                        break;
                    case 'agreed':
                        showTrackingConsentObj &= true;
                        break;
                    case 'opt':
                        continueTracking = false;
                        showTrackingConsentObj = true;
                        break;
                    case 'optout':
                        continueTracking = false;
                        showTrackingConsentObj = false;
                        break;
                }

                // オブジェクトの表示、同意状況によっては処理の停止。
                if (showTrackingConsentObj) {
                    // trackingConsent.jsを読み込む
                    var trackingConsentScriptTagId = 'ttr_tracking_consent_script_tag';
                    if (document.getElementById(trackingConsentScriptTagId) === null) {
                        var trackingConsentScript = document.createElement('script');
                        trackingConsentScript.async = 1;
                        trackingConsentScript.charset = 'UTF-8';
                        trackingConsentScript.id = trackingConsentScriptTagId;
                        trackingConsentScript.src = 'https://cdn.' + self.baseHost + '/share/js/trackingConsent.js';

                        var script = document.getElementsByTagName('script')[0];
                        script.parentNode.insertBefore(trackingConsentScript, script);
                    }

                    var waitFuncForTrackingConsent;
                    waitFuncForTrackingConsent = function () {
                        if (self.TrackingConsentManager) {
                            self.TrackingConsentManager.init(response.clientId, response.userId, response.trackingConsent, self);

                            var trackingConsentObj = self.TrackingConsentManager.displayTrackingConsentObject(response);
                            document.body.appendChild(trackingConsentObj);
                            return;
                        }
                        setTimeout(waitFuncForTrackingConsent, 100);
                    };
                    waitFuncForTrackingConsent();
                }

                var forms = document.getElementsByTagName('form');

                // クロスドメイン対策
                if (self.domains.length >= 2) {
                    // 複数のドメインがあるので、クロスドメイントラッキングができるようにする
                    // クロスドメインに対応したhrefに変換する関数
                    var getCrossDomainHref =  function (href) {
                        var parentPageDomain = location.hostname;

                        if (Tracker.clientId == 1231) {
                            if (window.frames.length !== parent.frames.length && document.referrer) {
                                // 親ウィンドウが存在する場合は親ウィンドウのドメインを使用する(iframe対応)
                                var referrerMatch = document.referrer.match(/^https?:\/\/([^\/:]+)(?::\d+)?\//i);
                                if (referrerMatch && referrerMatch[1]) {
                                    parentPageDomain = referrerMatch[1];
                                }
                            }
                        }

                        var match = href.match(/^https?:\/\/([^\/:]+)(?::\d+)?\//i);
                        if (!match || parentPageDomain == match[1] || self.domains.indexOf(match[1]) == -1) {
                            return href;
                        }
                        var values = href.split('#', 2);
                        var anchor = values.length == 2 ? '#' + values[1] : '';
                        values = values[0].split('?', 2);
                        var query = values.length == 2 ? '?' + values[1] + '&' : '?';

                        // トラッキング同意ステータスを隠ぺいのため単なる数字に置き換え
                        var trackingConsentNum = 0;
                        var keys = Object.keys(Tracker.trackingStatusList);
                        for (var i = 0; i < keys.length; i++) {
                            if (Tracker.trackingStatusList[keys[i]] === Tracker.trackingConsent) {
                                trackingConsentNum = keys[i];
                                break;
                            }
                        }

                        var userId = Tracker.userData.userId ? Tracker.userData.userId : Tracker.TRACKING_CONSENT_NOT_AGREED_USER_ID;
                        return values[0] + query + '_ttr=' + userId + 'tc' + trackingConsentNum + (new Date()).getTime() + anchor;
                    };

                    // Aタグのクリックを拾うためのイベントをbodyに追加
                    document.body.addEventListener('click', function (evt) {
                        var a = evt.target;
                        while (a) {
                            if (a.tagName && a.tagName.toUpperCase() == 'A') {
                                break;
                            }
                            a = a.parentNode;
                        }
                        if (!a) {
                            return;
                        }

                        if (a && a.href && a.getAttribute('data-ttr-cross-domain') != '1') {
                            var newHref = getCrossDomainHref(a.href);
                            if (a.href != newHref) {
                                a.href = newHref;
                                a.setAttribute('data-ttr-cross-domain', '1');
                            }
                        }
                    }, true); // キャプチャリング

                    // formタグのactionをクロスドメインに対応できるようにする
                    if (forms.length) {
                        for (var i = 0; i < forms.length; i++) {
                            var form = forms[i];
                            var formAction = form.getAttribute('action');

                            if (!formAction) {
                                continue;
                            }

                            var newFormAction = getCrossDomainHref(formAction);
                            if (formAction != newFormAction) {
                                form.setAttribute('action', newFormAction);
                            }
                        }
                    }
                }

                if (!continueTracking) {
                    TtrConsole.error('access suspended : tracking consent was ' + Tracker.trackingConsent);
                    return;
                }

                // 経過時間の計測開始
                self.sojournStartDate = new Date();

                // フォーム編集時に編集フラグを通知するようにする
                if (forms.length) {
                    self.setupFormWithdrawal(forms);
                }

                // クライアントのCV設定が取得できるまで待ってから判定する
                if (self.clientCvData) {
                    var waitClientCvManagerFunc;
                    waitClientCvManagerFunc = function () {
                        if (self.UserAnalysisManager) {
                            self.UserAnalysisManager.init(self, self.clientCvData);
                            self.UserAnalysisManager.start();
                            return;
                        }
                        setTimeout(waitClientCvManagerFunc, 100);
                    };
                    waitClientCvManagerFunc();
                }
                
                // ScenarioManagerが割り当てられるまで待ってからシナリオ監視をスタートする
                if (self.scenarioList) {
                    var waitScenarioManagerFunc;
                    waitScenarioManagerFunc = function () {
                        if (self.ScenarioManager) {
                            self.ScenarioManager.init(self, self.scenarioList);
                            self.ScenarioManager.start();
                            return;
                        }
                        setTimeout(waitScenarioManagerFunc, 100);
                    };
                    waitScenarioManagerFunc();
                }
            });
        },
        setUserAttr: function (key, value) {
            if (this.attrs[key] === value) {
                return;
            }
            this.attrs[key] = value;
            TtrConsole.error(this.attrs);
        },

        /**
         * SPAサイトのようなページ遷移を履歴操作でするサイト用の初期化コマンド
         */
        preInitCommand: function (queue, httpClient, url) {
            var clientId = parseInt(queue[2]);
            if (!clientId) {
                return false;
            }

            window._execPreInitCommand = true;  // タグで設定される想定だが処理が削除されても処理待ちができるように設定する

            // 初期化する前に追加した要素を全て削除する
            if (this.ScenarioManager) {
                if (this.ScenarioManager.timeoutIdList) {
                    for (var toiIdx = 0; toiIdx < this.ScenarioManager.timeoutIdList.length; toiIdx++) {
                        clearTimeout(this.ScenarioManager.timeoutIdList[toiIdx]);
                    }
                }
                this.ScenarioManager.removeCreative();
            }
            if (this.TrackingConsentManager) {
                this.TrackingConsentManager.removeTrackingConsentObject();
            }

            // 変数の初期化
            this.initVariable();

            // Cookie関連の前準備
            PreTracker.setCookieKey(clientId);
            PreTracker.setUrlParam();

            httpClient.get(url, [], function (apiDomain) {
                queue.push(apiDomain);

                var execParseCommand;
                execParseCommand = function () {
                    if (document.readyState != 'complete') {
                        // ページ読み込みが完了するまで待つ
                        setTimeout(execParseCommand, 100);
                        return;
                    }
                    Tracker.parseCommand(queue);

                    setTimeout(function() {
                        window._execPreInitCommand = false;
                    }, 500);
                };
                // ページ書き換えを待つ
                setTimeout(execParseCommand, 500);
            });
        },

        notifyConversion: function () {
            this.notifyUserAnalysis(this.checkGoalTypeConversion);

            this.ScenarioManager.updateTracker(this);
            var sendData = {
                clientId: this.clientId,
                userId: this.userId,
                accessUrl: this.accessUrl,
                goal: this.ScenarioManager.checkGoal(this.checkGoalTypeConversion),
            };
            var apiUrl = this.apiDomain + '/api/conversion';
            this.HttpClient.post(apiUrl, sendData, function (response) {
                TtrConsole.error('notifyConversion complete');
            });
        },

        /**
         * ユーザー分析の通知
         */
        notifyUserAnalysis: function (checkGoalType) {
            var clientCvData = this.UserAnalysisManager.clientCvData;

            // CV判定にはcanonicalは使わない。またURLパラメータとハッシュを考慮する
            var accessUrl = location.hostname + location.pathname + location.search + location.hash;

            var clientCvNo = 0;
            var clientCvNoList = Object.keys(clientCvData);
            for (var idx = 0; idx < clientCvNoList.length; idx++) {
                var tmpClientCvNo = clientCvNoList[idx];
                var clientCv = clientCvData[tmpClientCvNo];
                if (this.UserAnalysisManager.checkCv(accessUrl, this.conversion, clientCv, checkGoalType)) {
                    // 重複して CV をカウントしないように最初に一致した CV だけをカウントする
                    clientCvNo = tmpClientCvNo;
                    break;
                }
            }

            if (!clientCvNo) {
                return;
            }

            var userCvData = {
                no: clientCvNo,
                time: this.accessDate,
            };

            TtrConsole.error('cv data');
            TtrConsole.error(userCvData);

            var sendData = {
                clientId: this.clientId,
                userId: this.userId,
                accessUrl: this.accessUrl,
                userCvData: userCvData
            };

            var apiUrl = this.apiDomain + '/api/userAnalysis';
            this.HttpClient.post(apiUrl, sendData, function (res) {
                TtrConsole.error('notifyUserAnalysis complete');
            });
        },

        /**
         * 達成したシナリオのIDと実行に移すシナリオのIDを一括通知
         * 実行に移すシナリオを通知した場合は、サーバーから表示するクリエイティブの情報が送られてくる
         */
        notifyScenario: function (goalScenarioIdList, execScenarioIdList) {
            var sendData = {
                clientId: this.clientId,
                userId: this.userId,
                goal: goalScenarioIdList,
                exec: this.Device.isCreativeSupported() ? execScenarioIdList : []
            };
            var apiUrl = this.apiDomain + '/api/scenario';
            var self = this;
            this.HttpClient.post(apiUrl, sendData, function (response) {
                TtrConsole.error('notifyScenarioStatus complete');
                self.syncFromServerResponse(response);
                if (self.viewCreativeList) {
                    // 以下インラインとその他のクリエイティブを仕分け
                    var viewCreativeList = [];
                    var insertIdList = []; // 同じ指定id内で、innerReplaceは1つしか使わせない
                    for (var i = 0; i < self.viewCreativeList.length; i++) {
                        if (self.viewCreativeList[i].templateId.match(/inline/)) {
                            if (self.viewCreativeList[i].data.container_insert_position != 'innerReplace' || insertIdList.indexOf(self.viewCreativeList[i].data.container_insert_id) == -1) {
                                // 同じ指定idで初めてのinnerReplace
                                viewCreativeList.unshift(self.viewCreativeList[i]); // 表示順の都合上、インラインクリエイティブは順番を逆にする必要がある
                                if (self.viewCreativeList[i].data.container_insert_position == 'innerReplace') {
                                    insertIdList.push(self.viewCreativeList[i].data.container_insert_id); // 同じ指定idで2つ目以降のinnerReplaceは省く
                                }
                            }
                        } else {
                            viewCreativeList.push(self.viewCreativeList[i]);
                        }
                    }
                    for (var i = 0; i < viewCreativeList.length; i++) {
                        self.ScenarioManager.loadCreative(viewCreativeList[i]);
                    }
                }
            });
        },

        /**
         * シナリオ関連の通知のテスト
         */
        notifyScenarioTest: function (type, scenarioId, creativeId) {
            var sendData = {
                clientId: this.clientId,
                userId: this.userId,
            };
            var apiUrl = this.apiDomain + '/api/test_scenario/' + scenarioId + '/creative/' + creativeId + '/' + type;
            var self = this;
            this.HttpClient.post(apiUrl, sendData, function (response) {
                TtrConsole.error('notifyScenarioTest complete');
            });
        },

        /**
         * クリエイティブの表示・リアクション・クローズを通知
         */
        alreadyNotifiedCreatives: {}, // 同じクリエイティブを多重に通知しないようにする
        isNotifyingCreative: false, // notifyCreativeの多重処理防止用フラグ（サーバー側で同時保存すると不整合が起こるため）
        notifyCreative: function (type, scenarioId, creativeId, callback) {
            if (this.isNotifyingCreative) {
                var self = this;
                setTimeout(function () {
                    self.notifyCreative(type, scenarioId, creativeId, callback);
                }, 100);
                return;
            }
            var key = type + ':' + creativeId;
            if (this.alreadyNotifiedCreatives[key]) {
                // 既に通知済み
                if (callback) {
                    callback();
                }
                return;
            }
            this.alreadyNotifiedCreatives[key] = 1;

            var sendData = {
                clientId: this.clientId,
                userId: this.userId,
                scenarioId: scenarioId,
                creativeId: creativeId,
                templateId: this.templateId,
            };
            var apiUrl = this.apiDomain + '/api/creative/' + type;
            var self = this;
            this.isNotifyingCreative = true;
            this.HttpClient.post(apiUrl, sendData, function (response) {
                self.isNotifyingCreative = false;
                TtrConsole.error('notifyCreative complete');
                if (callback) {
                    callback();
                }
            });
        },

        notifyAnswer: function (data, callback) {
            var sendData = {
                type: 'answer',
                clientId: this.clientId,
                userId: this.userId,
                scenarioId: data.scenarioId,
                creativeId: data.creativeId,
                chatQuestionKey: data.chatQuestionKey,
                chatAnswerKey: data.chatAnswerKey,
                templateId: this.templateId,
            };
            var apiUrl = this.apiDomain + '/api/creative/answer';
            this.HttpClient.post(apiUrl, sendData, function (response) {
                TtrConsole.error('notifyAnswer complete');
                if (callback) {
                    callback();
                }
            });
        },

        notifyTrackingConsent: function (trackingConsent) {
            this.access(trackingConsent);
        },

        getRefererData: function () {
            var referer = {
                path: '',
                searchEngine: '',
                keywordList: null,
            };
            var match = document.referrer.match(/^https?:\/\/([^\/:]+)(?::\d+)?(\/[^?#]*)/i);
            if (!match
                || 1 < match[2].length  // 流入元情報ではトップページ以外取得できないから取得できるものは除外
                || this.pageUrl.indexOf(match[1]) === 0  // 同一ドメイン内の遷移を除外
            ) {
                return referer;
            }
            referer.path = match[1] + match[2];
            match = match[1].match(/(?:www|search)\.(google|yahoo|bing)\.(?:\w{2,}|\w{2}\.\w{2})$/i); // todo www, search だけに限定する？
            if (!match) {
                return referer;                
            }
            referer.searchEngine = match[1];

            match = referer.searchEngine == 'yahoo' ? document.referrer.match(/[?|&]p=([^&]+)/i) : document.referrer.match(/[?|&]q=([^&]+)/i);
            if (match) {
                referer.keywordList = [];
                try {
                    var query = decodeURIComponent(match[1].replace(/\+/g, ' '));
                    query = query.replace(/"([^"]+)"/g, function (m, m1) {
                        referer.keywordList.push(m1);
                        return '';
                    });
                    var keywords = query.split(' ');
                    for (var i = 0; i < keywords.length; i++) {
                        if (keywords[i] != '' && referer.keywordList.indexOf(keywords[i]) == -1) {
                            referer.keywordList.push(keywords[i]);
                        }
                    }
                } catch (e) {
                    referer.keywordList.push(match[1]);
                }
            }
            return referer;
        },

        /**
         * フォーム入力離脱の設定
         */
        setupFormWithdrawal: function (forms) {
            var self = this;

            // フォーム入力離脱を通知する
            var writeFormWithdrawalFunc = function (accessUrl, withdrawal) {
                var sendData = {
                    clientId: self.clientId,
                    userId: self.userId,
                    accessUrl: accessUrl,
                    withdrawal: withdrawal,
                };

                var apiUrl = self.apiDomain + '/api/writeFormWithdrawal';
                self.HttpClient.post(apiUrl, sendData, function (response) {
                    TtrConsole.error('writeFormWithdrawal complete');
                });
            };

            var url = this.accessUrl;
            var key = 'data-ttr-withdrawal';
            // フォーム変更時に離脱の通知をする
            var changeFunc = function () {
                if (this.getAttribute(key) == '1') {
                    // 既に処理済み
                    return;
                }
                writeFormWithdrawalFunc(url, true);
                this.setAttribute(key, '1');
            };
            // フォーム送信時に離脱解除の通知をする
            var submitFunc = function (event) {
                if (this.getAttribute(key) != '1') {
                    // 離脱していない
                    return;
                }
                writeFormWithdrawalFunc(url, false);
                this.removeAttribute(key);
            };

            var alreadyFormWithdrawal = false; // 最初から離脱フラグが立っているかどうか
            if (this.trackData.accessData
                && this.trackData.accessData[url]
                && this.trackData.accessData[url].withdrawal
            ) {
                // 既に離脱状態
                alreadyFormWithdrawal = true;
            }
            for (var i = forms.length; i--; ) {
                var form = forms[i];
                form.addEventListener('change', changeFunc, true); // キャプチャリングを使う
                form.addEventListener('submit', submitFunc, true); // キャプチャリングを使う
                if (alreadyFormWithdrawal) {
                    // 既に離脱状態なので属性をセットしておく
                    form.setAttribute(key, '1');
                }
            }
        },

        /**
         * このページの滞在時間を取得 (ミリ秒)
         */
        getSojournTime: function () {
            if (this.sojournStartDate == null) {
                return 0;
            }
            return (new Date()) - this.sojournStartDate;
        },

        /**
         * 実機プレビューを行う
         */
        preview: function (creativeId, previewKey) {
            this.isPreview = true;

            var sendData = {
                clientId: this.clientId,
                creativeId: creativeId,
                previewKey: previewKey,
            };
            var apiUrl = this.apiDomain + '/api/preview';
            var self = this;
            this.HttpClient.post(apiUrl, sendData, function (response) {
                if (response && response.creativeData) {
                    var creativeData = response.creativeData;

                    // ScenarioManagerが割り当てられるまで待ってからシナリオ監視をスタートする
                    var waitFunc;
                    waitFunc = function () {
                        if (self.ScenarioManager) {
                            self.ScenarioManager.init(self, []);
                            self.ScenarioManager.loadCreative(creativeData, true);
                            return;
                        }
                        setTimeout(waitFunc, 100);
                    };
                    waitFunc();
                }
            });
        },

        /**
         * 変数の初期化 (SPA用)
         */
        initVariable: function () {
            // initで上書きされるけど初期化しておく
            this.baseHost = '';
            this.apiDomain = '';
            this.clientId = '';
            this.pageUrl = '';
            this.canonicalParam = '';
            this.canonicalUrl = '';
            this.urlParam = '';
            this.title = '';

            // syncFromServerResponse で上書きされる項目の初期化
            this.accessUrl = '';
            this.accessDate = '';
            this.userData = {};
            this.trackData = {};
            this.engagementSettingData = {};
            this.scenarioList = [];
            this.viewCreativeList = null;
            this.clientCvData = [];

            // 初期化必須項目
            this.domains = [];  // MEMO アクセスのたびに増えるから初期化
            this.conversion = false;  // MEMO コンバージョンタブが実行されたアクセスだけ判定したいから初期化
            this.alreadyAccess = false;  // MEMO アクセスの重複実行をあえて許可するから初期化
            this.alreadyNotifiedCreatives = {};  // MEMO クリエイティブの重複表示通知をあえて許可するから初期化
            this.isPreview = false;  // MEMO プレビューの判定はアクセスのたびに判定する必要があるから初期化
            this.sojournStartDate = null;  // MEMO ページ滞在時間の制御ができなくなるから初期化
            this.templateId = '';  // MEMO templateId は displayCreative で設定されるけど初期化して置く
            this.publicHolidayList = [];  // MEMO 管理画面を操作しながら確認をする場合は毎回変わるから初期化
            this.creativeRestriction = [];  // MEMO 管理画面を操作しながら確認をする場合は毎回変わるから初期化
            this.useCanonical = null;  // MEMO 管理画面を操作しながら確認をする場合は毎回変わるから初期化

            // あえて初期化しない項目
            // MEMO cookieKey, trackingConsentCookieKey は setCookieKey で上書きする
            // MEMO userId, trackingConsent, isTrackingConsentPreview, checkUserAccessDataDeleteQueue は setUrlParam で上書きする
            // MEMO attrs は特定クライアントのみ利用する項目で、基本タグでしか使わないから使い回すために初期化しない
            // MEMO debounceAccessTimerId は debounceAccess で適切に処理されるから初期化する必要がない
            // MEMO isNotifyingCreative は notifyCreative で適切に処理されるから初期化する必要がない
        },

        isDisabledClient: function (clientId) {
            var clientId2Bool = {
                36: 1,
                37: 1,
                47: 1,
                65: 1,
                70: 1,
                73: 1,
                79: 1,
                83: 1,
                90: 1,
                91: 1,
                93: 1,
                95: 1,
                96: 1,
                99: 1,
                100: 1,
                109: 1,
                114: 1,
                120: 1,
                122: 1,
                130: 1,
                133: 1,
                148: 1,
                155: 1,
                162: 1,
                171: 1,
                176: 1,
                179: 1,
                181: 1,
                193: 1,
                197: 1,
                198: 1,
                199: 1,
                200: 1,
                201: 1,
                202: 1,
                203: 1,
                205: 1,
                207: 1,
                212: 1,
                221: 1,
                222: 1,
                224: 1,
                227: 1,
                238: 1,
                246: 1,
                247: 1,
                248: 1,
                249: 1,
                250: 1,
                257: 1,
                261: 1,
                270: 1,
                282: 1,
                283: 1,
                287: 1,
                296: 1,
                321: 1,
                324: 1,
                329: 1,
                346: 1,
                348: 1,
                349: 1,
                354: 1,
                355: 1,
                365: 1,
                374: 1,
                377: 1,
                383: 1,
                388: 1,
                391: 1,
                407: 1,
                413: 1,
                415: 1,
                421: 1,
                430: 1,
                431: 1,
                451: 1,
                456: 1,
                459: 1,
                462: 1,
                474: 1,
                480: 1,
                481: 1,
                482: 1,
                483: 1,
                487: 1,
                490: 1,
                498: 1,
                511: 1,
                512: 1,
                513: 1,
                514: 1,
                516: 1,
                517: 1,
                521: 1,
                523: 1,
                524: 1,
                527: 1,
                528: 1,
                531: 1,
                537: 1,
                538: 1,
                554: 1,
                566: 1,
                571: 1,
                576: 1,
                582: 1,
                589: 1,
                593: 1,
                599: 1,
                600: 1,
                605: 1,
                608: 1,
                611: 1,
                615: 1,
                617: 1,
                618: 1,
                623: 1,
                625: 1,
                633: 1,
                644: 1,
                648: 1,
                651: 1,
                677: 1,
                678: 1,
                690: 1,
                700: 1,
                704: 1,
                722: 1,
                726: 1,
                728: 1,
                730: 1,
                741: 1,
                742: 1,
                743: 1,
                745: 1,
                746: 1,
                747: 1,
                749: 1,
                753: 1,
                754: 1,
                756: 1,
                757: 1,
                771: 1,
                777: 1,
                781: 1,
                790: 1,
                796: 1,
                804: 1,
                805: 1,
                814: 1,
                821: 1,
                824: 1,
                827: 1,
                828: 1,
                848: 1,
                850: 1,
                855: 1,
                858: 1,
                864: 1,
                865: 1,
                867: 1,
                875: 1,
                881: 1,
                888: 1,
                892: 1,
                895: 1,
                898: 1,
                909: 1,
                910: 1,
                913: 1,
                921: 1,
                932: 1,
                934: 1,
                945: 1,
                949: 1,
                951: 1,
                952: 1,
                953: 1,
                961: 1,
                963: 1,
                964: 1,
                965: 1,
                967: 1,
                970: 1,
                973: 1,
                978: 1,
                979: 1,
                984: 1,
                986: 1,
                994: 1,
                1000: 1,
                1001: 1,
                1003: 1,
                1013: 1,
                1021: 1,
                1024: 1,
                1027: 1,
                1043: 1,
                1046: 1,
                1049: 1,
                1050: 1,
                1051: 1,
                1052: 1,
                1059: 1,
                1066: 1,
                1072: 1,
                1073: 1,
                1074: 1,
                1075: 1,
                1076: 1,
                1081: 1,
                1085: 1,
                1111: 1,
                1112: 1,
                1115: 1,
                1127: 1,
                1132: 1,
                1135: 1,
                1138: 1,
                1145: 1,
                1152: 1,
                1158: 1,
                1161: 1,
                1166: 1,
                1175: 1,
                1176: 1,
                1185: 1,
                1198: 1,
                1199: 1,
                1201: 1,
                1203: 1,
                1205: 1,
                1207: 1,
                1209: 1,
                1219: 1,
                1222: 1,
                1229: 1,
                1233: 1,
                1235: 1,
                1236: 1,
                1237: 1,
                1244: 1,
                1248: 1,
                1253: 1,
                1254: 1,
                1256: 1,
                1274: 1,
                1275: 1,
                1276: 1,
                1277: 1,
                1278: 1,
                1279: 1,
                1280: 1,
                1281: 1,
                1282: 1,
                1283: 1,
                1284: 1,
                1285: 1,
                1286: 1,
                1287: 1,
                1290: 1,
                1294: 1,
                1299: 1,
                1300: 1,
                1303: 1,
                1306: 1,
                1312: 1,
                1317: 1,
                1318: 1,
                1332: 1,
                1335: 1,
                1336: 1,
                1338: 1,
                1341: 1,
                1353: 1,
                1357: 1,
                1364: 1,
                1373: 1,
                1378: 1,
                1382: 1,
                1395: 1,
                1404: 1,
                1405: 1,
                1410: 1,
                1414: 1,
                1424: 1,
                1429: 1,
                1436: 1,
                1437: 1,
                1440: 1,
                1442: 1,
                1449: 1,
                1451: 1,
                1452: 1,
                1458: 1,
                1459: 1,
                1461: 1,
                1465: 1,
                1478: 1,
                1481: 1,
                1486: 1,
                1500: 1,
                1501: 1,
                1511: 1,
                1520: 1,
                1524: 1,
                1528: 1,
                1530: 1,
                1537: 1,
                1543: 1,
                1558: 1,
                1560: 1,
                1567: 1,
                1570: 1,
                1577: 1,
                1581: 1,
                1590: 1,
                1612: 1,
                1613: 1,
                1633: 1,
                1637: 1,
                1643: 1,
                1647: 1,
                1660: 1,
                1670: 1,
                1679: 1,
                1684: 1,
                1710: 1,
                1712: 1,
                1742: 1,
            };
            return clientId2Bool[clientId] === 1;
        },

        /**
         * テスト用
         */
        test: function (args) {
            switch (args[0]) {
                case 'view':
                    var scenarioId = args[1];
                    var creativeId = args[2];
                    this.notifyScenarioTest('view', scenarioId, creativeId);
                    break;
                case 'reaction':
                    var scenarioId = args[1];
                    var creativeId = args[2];
                    this.notifyScenarioTest('reaction', scenarioId, creativeId);
                    break;
                case 'direct':
                    var scenarioId = args[1];
                    var creativeId = args[2];
                    this.notifyScenarioTest('direct', scenarioId, creativeId);
                    break;
                case 'indirect':
                    var scenarioId = args[1];
                    var creativeId = args[2];
                    this.notifyScenarioTest('indirect', scenarioId, creativeId);
                    break;
            }
        },
    };

    // タグの無効化
    if (TtrInvalidation.isInvalidation()) {
        return;
    }

    // Tracker の定義が終わった時点で PreTracker を実行する
    PreTracker.init();


    // 初期化処理
    var initAlreadyDone = false; // 多重起動を防ぐ
    var init = function () {
        if (initAlreadyDone) {
            return;
        }
        initAlreadyDone = true;

        var baseHost = '';
        var queue = window[queueName] || [];
        for (var i = 0; i < queue.length; i++) {
            if (queue[i][0] == 'init') {
                baseHost = queue[i][1];
                break;
            }
        }
        if (!baseHost) {
            return;
        }
        var url = 'https://api.' + baseHost + '/x-gm-ttr-api-redirect-location';
        var httpClient = new HttpClient();

        var func = function (apiDomain) {
            var queue = window[queueName] || [];
            for (var i = 0; i < queue.length; i++) {
                if (queue[i][0] == 'init') {
                    queue[i].push(apiDomain);
                    break;
                }
            }

            // 一旦ここまでの命令を実行する
            for (var i = 0; i < queue.length; i++) {
                Tracker.parseCommand(queue[i]);
            }

            // この先はキューに追加されるたびに即実行する
            window[queueName] = {
                push: function (queue) {
                    if (queue[0] == 'init') {
                        Tracker.preInitCommand(queue, httpClient, url);
                    } else {
                        Tracker.parseCommand(queue);
                    }
                }
            };
        };
        httpClient.get(url, [], func);
    };

    // initの呼び出し
    switch (document.readyState) {
        case 'interactive':
        case 'loaded':
        case 'complete':
            // 既に DOMContentLoaded もしくは load が実施されているので即実行
            init();
            break;
        default:
            // ページ読み込み時に初期化を実行
            var loaded = function (evt) {
                document.removeEventListener('DOMContentLoaded', loaded);
                window.removeEventListener('load', loaded);
                init();
            };
            document.addEventListener('DOMContentLoaded', loaded);
            window.addEventListener('load', loaded);
            break;
    }


    // todo デバッグ用
    window._tracker = Tracker;
    
})(window, document, '_wsq');
