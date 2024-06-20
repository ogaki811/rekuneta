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
    
    var UrlMatcher = {
        createLinesText: function (list) {
            return '\n' + list.join('\n') + '\n';
        },
        /**
         * 1行1URLで作成されたリストに対して、一括マッチ処理を行う
         * [改行]url1[改行]url2[改行]...[改行]urlN[改行] のようなURLリストに対してurlXが含まれるかどうかを確認する
         */
        matchLines: function (urlLinesText, pattern, type) {
            pattern = this.trimProtocol(pattern, type);
            switch (type) {
                case 'match':
                    // 末尾の / は考慮しない
                    pattern = pattern.replace(/\/$/, '');
                    urlLinesText = urlLinesText.replace(/\/\n/g, '\n');
                    if (urlLinesText.indexOf('\n' + pattern + '\n') != -1) {
                        return true;
                    }
                    break;
                case 'forward_match':
                    if (urlLinesText.indexOf('\n' + pattern) != -1) {
                        return true;
                    }
                    break;
                case 'partial_match':
                    if (urlLinesText.indexOf(pattern) != -1) {
                        return true;
                    }
                    break;
                case 'regex':
                    var regex = new RegExp(pattern, 'm');
                    if (regex.test(urlLinesText)) {
                        return true;
                    }
                    break;
            }
            
            return false;
        },

        /**
         * 通常のマッチ処理
         */
        match: function (url, pattern, type) {
            pattern = this.trimProtocol(pattern, type);
            switch (type) {
                case 'match':
                    // 末尾の / は考慮しない
                    url = url.replace(/\/$/, '');
                    pattern = pattern.replace(/\/$/, '');
                    if (url == pattern) {
                        return true;
                    }
                    break;
                case 'forward_match':
                    if (url.indexOf(pattern) == 0) {
                        return true;
                    }
                    break;
                case 'partial_match':
                    if (url.indexOf(pattern) != -1) {
                        return true;
                    }
                    break;
                case 'regex':
                    var regex = new RegExp(pattern);
                    if (regex.test(url)) {
                        return true;
                    }
                    break;
            }

            return false;
        },

        /**
         * 先頭のプロトコル部分を削除する
         *
         * @param url
         * @param type
         * @returns {*}
         */
        trimProtocol: function (url, type) {
            switch (type) {
                case 'match':
                case 'forward_match':
                case 'partial_match':
                    // 正規表現でプロトコル部分を削除しようとすると速度が遅くなるのでindexOfで対応
                    if (url.indexOf('http://') === 0) {
                        url = url.substr(7);
                    } else if (url.indexOf('https://') === 0) {
                        url = url.substr(8);
                    }
                    break;
                case 'regex':
                    // 先頭が http:// や ^https?\:\/\/ といった入力だった場合、プロトコル部分を削除する
                    url = url.replace(/^(\^?)(https?(\?|\*)?\\?:\\?\/\\?\/)/i, '$1');
                    break;
            }

            return url;
        },

        /**
         * ttr=~'のパラメータを除外した状態のパラメータを取得する
         */
        getQueryParamFilted: function () {
            var arrayQueryParam = location.search.replace(/\?/, '').split('&');
            var arrayExcludedTtrParam = [];
            for (var paramKey = 0; paramKey < arrayQueryParam.length; paramKey++) {
                if (arrayQueryParam[paramKey].match(/^_ttr=/)) {
                    continue;
                }
                arrayExcludedTtrParam.push(arrayQueryParam[paramKey]);
            }
            var queryParam = arrayExcludedTtrParam.join('&');
            // 下記条件文により、パラメータがなくてもURLの末尾に「?」が付随するのを防ぐ
            if (queryParam != '') {
                queryParam = '?' + queryParam;
            }
            return queryParam;
        }
    };

    /**
     * @class Scenario
     * @param scenarioData
     * @param tracker
     * @constructor
     */
    var Scenario = function (scenarioData, tracker) {
        this.id = scenarioData.scenarioId || scenarioData.scenario_id;
        this.viewType = scenarioData.viewType;
        this.priority = parseInt(scenarioData.priority);
        this.scenarioData = scenarioData;
        this.trackData = null;
        
        this.state = scenarioData.state; // enable, disable (disableの場合でも対象者チェックは行う)
        this.archive = scenarioData.archive; // 0, 1 (1の場合でも対象者チェックは行う)
        this.view = 'not_view'; // view, not_view
        this.reaction = 'not_reaction'; // reaction, not_reaction
        this.goal = 'not_goal'; // goal, not_goal
        this.close = 'not_close'; // close, not_close
        this.question = 'not_question'; // 〇-S〇-Q〇-A〇, not_question
        this.target = null; // null, target, not_target
        
        this.goalCount = 0;
        this.viewCount = 0; // クリエイティブ表示数
        this.goalInCurrentSession = false; // 同セッションでゴールしたか true or false
        this.stopDate = Number(scenarioData.stopDate || scenarioData.stop_date || 0);

        var trackData = tracker.trackData;
        var currentSessionId = trackData.currentSessionData.sessionId;
        if (trackData && trackData.scenarioData && trackData.scenarioData[this.id]) {
            this.trackData = trackData.scenarioData[this.id];
            for (var creativeId in this.trackData) {
                var creativeTrackData = this.trackData[creativeId];
                if (creativeTrackData.viewCount) {
                    this.view = 'view';
                    this.viewCount += creativeTrackData.viewCount;
                }
                if (creativeTrackData.reactionCount) {
                    this.reaction = 'reaction';
                }
                if (creativeTrackData.goalDirectCount) {
                    this.goal = 'goal';
                    this.goalCount += creativeTrackData.goalDirectCount;
                }
                if (creativeTrackData.goalIndirectCount) {
                    this.goal = 'goal';
                    this.goalCount += creativeTrackData.goalIndirectCount;
                }
                if (creativeTrackData.closeCount) {
                    this.close = 'close';
                }
                if (creativeTrackData.lastQuestionKey) {
                    this.question = creativeTrackData.lastQuestionKey;
                }
                if (creativeTrackData.lastGoalSessionId == currentSessionId) {
                    this.goalInCurrentSession = true;
                }
            }
        }
        
    };

    /**
     * シナリオの対象かどうか確認する
     * 
     * @return {Boolean} 判定できた場合はtrue, 未確定要素があるため判定できなかった場合はfalse
     */
    Scenario.prototype.checkTarget = function (tracker, scenarioManager) {
        var conditionsData = this.scenarioData.conditionsData || this.scenarioData.conditions_data || {};
        if (!conditionsData) {
            // 常に適合
            this.target = 'in_target';
            return true;
        }
        
        var isAnd = conditionsData.logic_type == 'or' ? false : true;
        var sectionList = conditionsData.section_list ? conditionsData.section_list : [];

        var undecided = false;
        for (var i = 0; i < sectionList.length; i++) {
            var ret = this.checkConditionsSection(sectionList[i], tracker, scenarioManager);
            if (ret == 'in_target') {
                // 対象として判定された
                if (isAnd) {
                    // and条件なので次のconditionsDataを確認する
                    continue;
                } else {
                    // or条件なので終了
                    this.target = 'in_target';
                    return true;
                }
            } else if (ret == 'not_in_target') {
                // 非対象として判定された
                if (isAnd) {
                    // and条件なので終了
                    this.target = 'not_in_target';
                    return true;
                } else {
                    // or条件なので次のconditionsDataを確認する
                    continue;
                }
            }

            // 未確定だった
            undecided = true;
        }

        // ここまで来た → and条件で非対象が一つもない もしくは or条件で対象が一つもない
        
        if (undecided) {
            // 未確定要素あるので、対象・非対象をこの段階では判断できない
            this.target = null;
            return false;
        }
        
        if (isAnd) {
            this.target = 'in_target';
        } else {
            this.target = 'not_in_target';
        }
        return true;
    };


    /**
     * シナリオの対象かどうか指定したsectionData(logic_type, section)を使って確認する
     *
     * @return {String} 'in_target', 'not_in_target', 'undecided'
     */
    Scenario.prototype.checkConditionsSection = function (sectionData, tracker, scenarioManager) {
        var userData = tracker.userData || {};
        var trackData = tracker.trackData || {};

        var isAnd = sectionData.logic_type == 'or' ? false : true;
        var conditionsData = sectionData.section || {};

        // エンゲージメント
        if (conditionsData.engagement && conditionsData.engagement.item && conditionsData.engagement.item.length) {
            var engagement = scenarioManager.getEngagement().toString(); // conditionsDataの方が文字列なので文字列にする
            if (conditionsData.engagement.item.indexOf(engagement) == -1) {
                // 適合しなかった
                if (isAnd) {
                    // and条件なので終了
                    return 'not_in_target';
                }
            } else {
                // 適合した
                if (!isAnd) {
                    // or条件なので終了
                    return 'in_target';
                }
            }
        }

        // 会員
        if (conditionsData.membership) {
            var success = false;
            switch (conditionsData.membership) {
                case 'include':
                    if (userData.data.attrs.membership) {
                        success = true;
                    }
                    break;
                case 'exclude':
                    if (!userData.data.attrs.membership) {
                        success = true;
                    }
                    break;
                default:
                    // 未定義なら何もしない
                    break;
            }

            if (success) {
                // 適合した
                if (!isAnd) {
                    // or条件なので終了
                    return 'in_target';
                }
            } else {
                // 適合しなかった
                if (isAnd) {
                    // and条件なので終了
                    return 'not_in_target';
                }
            }
        }

        // 訪問回数
        if (conditionsData.visit_count && conditionsData.visit_count.type) {
            var sessionCount = trackData.sessionHistory ? trackData.sessionHistory.length : 1;
            var success = true;
            switch (conditionsData.visit_count.type) {
                case 'first':
                    if (sessionCount != 1) {
                        success = false;
                        break;
                    }
                    break;
                case 'revisit':
                    if (sessionCount < 2) {
                        success = false;
                        break;
                    }
                    break;
                case 'repeat':
                    if (conditionsData.visit_count.range.from && sessionCount < conditionsData.visit_count.range.from) {
                        success = false;
                        break;
                    }
                    if (conditionsData.visit_count.range.to && sessionCount > conditionsData.visit_count.range.to) {
                        success = false;
                        break;
                    }
                    break;
            }
            
            if (success) {
                // 適合した
                if (!isAnd) {
                    // or条件なので終了
                    return 'in_target';
                }
            } else {
                // 適合しなかった
                if (isAnd) {
                    // and条件なので終了
                    return 'not_in_target';
                }
            }
        }

        // 訪問頻度
        if (conditionsData.visit_trend) {
            var date = new Date();
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);
            var todayStartTime = date.getTime(); // 今日の00:00:00
            var before30DaysTime = date.getTime() - 86400 * 1000 * 30; // 30日前
            var before90DaysTime = date.getTime() - 86400 * 1000 * 90; // 90日前 
            var within30DaysCount = 0; // 30日以内の訪問数
            var within90DaysCount = 0; // 90日以内の訪問数
            var beyond90DaysCount = 0; // 90日より前の訪問数
            for (var i = 0; i < trackData.sessionHistory.length; i++) {
                var sessionStartTime = Number(trackData.sessionHistory[i]);
                if (sessionStartTime >= todayStartTime) {
                    // 今日の分は含まない
                    continue;
                }
                if (sessionStartTime >= before30DaysTime) {
                    // 30日以内
                    within30DaysCount++;
                    within90DaysCount++; // 当然 90日以内でもある
                    continue;
                }
                if (sessionStartTime >= before90DaysTime) {
                    // 90日以内
                    within90DaysCount++;
                    continue;
                }
                
                beyond90DaysCount++; // 90日を超えている
            }

            var success = false;
            switch (conditionsData.visit_trend) {
                case 'frequent':
                    // 30日以内に3回以上訪問あり
                    if (within30DaysCount >= 3) {
                        success = true;
                    }
                    break;
                case 'not_frequent':
                    // 90日以内に訪問無し かつ 90日より前に1回以上訪問あり
                    if (within90DaysCount == 0 && beyond90DaysCount >= 1) {
                        success = true;
                    }
                    break;
            }

            if (success) {
                // 適合した
                if (!isAnd) {
                    // or条件なので終了
                    return 'in_target';
                }
            } else {
                // 適合しなかった
                if (isAnd) {
                    // and条件なので終了
                    return 'not_in_target';
                }
            }
        }

        // 申込離脱
        if (conditionsData.conv_withdrawal && conditionsData.conv_withdrawal.path_list && conditionsData.conv_withdrawal.path_list.length) {
            var success = false;
            for (var i = 0; i < conditionsData.conv_withdrawal.path_list.length; i++) {
                var path = conditionsData.conv_withdrawal.path_list[i].path;
                var matchType = conditionsData.conv_withdrawal.path_list[i].match_type;
                if (UrlMatcher.matchLines(scenarioManager.getAllWithdrawalUrlLinesText(), path, matchType)) {
                    success = true;
                    break;
                }
            }

            if (success) {
                // 適合した
                if (!isAnd) {
                    // or条件なので終了
                    return 'in_target';
                }
            } else {
                // 適合しなかった
                if (isAnd) {
                    // and条件なので終了
                    return 'not_in_target';
                }
            }
        }
        
        // 特定ページの閲覧経験
        if (conditionsData.page_experience && conditionsData.page_experience.path_list && conditionsData.page_experience.path_list.length) {
            var success = false;
            for (var i = 0; i < conditionsData.page_experience.path_list.length; i++) {
                var path = conditionsData.page_experience.path_list[i].path;
                var matchType = conditionsData.page_experience.path_list[i].match_type;
                var browsingExperience = conditionsData.page_experience.path_list[i].browsing_experience;
                if (UrlMatcher.matchLines(scenarioManager.getAllAccessUrlLinesText(), path, matchType)) {
                    if (browsingExperience == 'exp') {
                        success = true;
                        break;
                    }
                } else {
                    if (browsingExperience == 'none') {
                        success = true;
                        break;
                    }
                }
            }

            if (success) {
                // 適合した
                if (!isAnd) {
                    // or条件なので終了
                    return 'in_target';
                }
            } else {
                // 適合しなかった
                if (isAnd) {
                    // and条件なので終了
                    return 'not_in_target';
                }
            }
        }

        // 特定ページの申込経験
        if (conditionsData.page_conversion && conditionsData.page_conversion.path_list && conditionsData.page_conversion.path_list.length) {
            var success = false;
            for (var i = 0; i < conditionsData.page_conversion.path_list.length; i++) {
                var path = conditionsData.page_conversion.path_list[i].path;
                var matchType = conditionsData.page_conversion.path_list[i].match_type;
                var conversionExperience = conditionsData.page_conversion.path_list[i].conversion_experience;
                if (UrlMatcher.matchLines(scenarioManager.getAllConversionUrlLinesText(), path, matchType)) {
                    if (conversionExperience == 'exp') {
                        success = true;
                        break;
                    }
                } else {
                    if (conversionExperience == 'none') {
                        success = true;
                        break;
                    }
                }
            }

            if (success) {
                // 適合した
                if (!isAnd) {
                    // or条件なので終了
                    return 'in_target';
                }
            } else {
                // 適合しなかった
                if (isAnd) {
                    // and条件なので終了
                    return 'not_in_target';
                }
            }
        }
        
        // 閲覧ページ数
        if (conditionsData.pv) {
            var count = trackData.currentSessionData && trackData.currentSessionData.totalAccessCount ? trackData.currentSessionData.totalAccessCount : 1;
            var success = false;
            if (conditionsData.pv.comparison == 'more') {
                success = count >= conditionsData.pv.count;
            } else {
                success = count <= conditionsData.pv.count;
            }

            if (success) {
                // 適合した
                if (!isAnd) {
                    // or条件なので終了
                    return 'in_target';
                }
            } else {
                // 適合しなかった
                if (isAnd) {
                    // and条件なので終了
                    return 'not_in_target';
                }
            }
        }
        
        // 平均閲覧ページ数
        if (conditionsData.average_pv) {
            var sessionCount = trackData.sessionHistory ? trackData.sessionHistory.length : 1;
            var totalCount = trackData.totalAccessCount ? trackData.totalAccessCount : 1;
            var avgCount = (sessionCount && totalCount) ? (totalCount / sessionCount) : 0;
            var success = false;
            if (conditionsData.average_pv.comparison == 'more') {
                success = avgCount >= conditionsData.average_pv.count;
            } else {
                success = avgCount <= conditionsData.average_pv.count;
            }

            if (success) {
                // 適合した
                if (!isAnd) {
                    // or条件なので終了
                    return 'in_target';
                }
            } else {
                // 適合しなかった
                if (isAnd) {
                    // and条件なので終了
                    return 'not_in_target';
                }
            }
        }

        // 言語
        if (conditionsData.language) {
            if (conditionsData.language.include_item && conditionsData.language.include_item.length) {
                if (!userData.data.language || conditionsData.language.include_item.indexOf(userData.data.language) == -1) {
                    // 言語を持っていない または 指定リストにマッチしなかったので対象外
                    if (isAnd) {
                        // and条件なので終了
                        return 'not_in_target';
                    }
                } else {
                    // 適合した
                    if (!isAnd) {
                        // or条件なので終了
                        return 'in_target';
                    }
                }
            } else if (conditionsData.language.exclude_item && conditionsData.language.exclude_item.length) {
                if (!userData.data.language || conditionsData.language.exclude_item.indexOf(userData.data.language) != -1) {
                    // 言語を持っていない または 除外リストにマッチしてしまったので対象外
                    if (isAnd) {
                        // and条件なので終了
                        return 'not_in_target';
                    }
                } else {
                    // 適合した
                    if (!isAnd) {
                        // or条件なので終了
                        return 'in_target';
                    }
                }
            }
        }
        
        // デバイス
        if (conditionsData.device && conditionsData.device.item && conditionsData.device.item.length) {
            if (!userData.data.device || conditionsData.device.item.indexOf(userData.data.device.device) == -1) {
                // 適合しなかったため対象外
                if (isAnd) {
                    // and条件なので終了
                    return 'not_in_target';
                }
            } else {
                // 適合した
                if (!isAnd) {
                    // or条件なので終了
                    return 'in_target';
                }
            }
        }

        // OS
        if (conditionsData.os && conditionsData.os.item && conditionsData.os.item.length) {
            if (!userData.data.device || conditionsData.os.item.indexOf(userData.data.device.os) == -1) {
                // 適合しなかったため対象外
                if (isAnd) {
                    // and条件なので終了
                    return 'not_in_target';
                }
            } else {
                // 適合した
                if (!isAnd) {
                    // or条件なので終了
                    return 'in_target';
                }
            }
        }

        // ブラウザ
        if (conditionsData.browser && conditionsData.browser.item && conditionsData.browser.item.length) {
            if (!userData.data.device || conditionsData.browser.item.indexOf(userData.data.device.browser) == -1) {
                // 適合しなかったため対象外
                if (isAnd) {
                    // and条件なので終了
                    return 'not_in_target';
                }
            } else {
                // 適合した
                if (!isAnd) {
                    // or条件なので終了
                    return 'in_target';
                }
            }
        }

        // 流入元サイト
        if (conditionsData.referer && conditionsData.referer.type) {
            var refererCondition = conditionsData.referer;
            var refererData = trackData.currentSessionData.referer ? trackData.currentSessionData.referer : {};
            var success = true;
            
            switch (conditionsData.referer.type) {
                case 'search_engine':
                    if (
                        refererCondition.search_engine
                    &&  refererCondition.search_engine.item
                    &&  refererCondition.search_engine.item.indexOf(refererData.searchEngine) == -1
                    ) {
                        success = false;
                        break;
                    }
                    if (refererCondition.keyword_list && refererCondition.keyword_list.item && refererCondition.keyword_list.item.length) {
                        var keywords = refererData.keywordList && Array.isArray(refererData.keywordList) ? refererData.keywordList : [];
                        var matched = false;
                        for (var i = 0; i < keywords.length; i++) {
                            if (refererCondition.keyword_list.item.indexOf(keywords[i]) != -1) {
                                matched = true;
                                break;
                            }
                        }
                        if (!matched) {
                            success = false;
                            break;
                        }
                    }
                    break;
                case 'direct':
                    if (1 < trackData.currentSessionData.totalAccessCount) {
                        success = false;
                        break;
                    }
                    break;
                case 'specific':
                    if (!refererData.path) {
                        success = false;
                        break;
                    }
                    var matched = false;
                    for (var i = 0; i < refererCondition.url_list.path_list.length; i++) {
                        var path = refererCondition.url_list.path_list[i].path;
                        var matchType = refererCondition.url_list.path_list[i].match_type;
                        if (UrlMatcher.match(refererData.path, path, matchType)) {
                            matched = true;
                            break;
                        }
                    }
                    if (!matched) {
                        success = false;
                        break;
                    }
                    break;
            }

            if (success) {
                // 適合した
                if (!isAnd) {
                    // or条件なので終了
                    return 'in_target';
                }
            } else {
                // 適合しなかった
                if (isAnd) {
                    // and条件なので終了
                    return 'not_in_target';
                }
            }
        }
        
        // 広告用パラメータ
        if (conditionsData.from_ad) {
            if (!conditionsData.from_ad.setting) {
                conditionsData.from_ad.setting = 'include';
            }
            var adParamMatched = false;
            var userAdParam = trackData.adParam ? trackData.adParam : [];

            if (userAdParam.length > 0) {
                for (var i = 0; i < conditionsData.from_ad.item.length; i++) {
                    var adParam = conditionsData.from_ad.item[i];
                    if (userAdParam.indexOf(adParam) >= 0) {
                        // 適合した
                        adParamMatched = true;
                        break;
                    }
                }
            }

            if ((adParamMatched && conditionsData.from_ad.setting === 'include')
                || (!adParamMatched && conditionsData.from_ad.setting === 'exclude')
            ) {
                if (!isAnd) {
                    // or条件なので終了
                    return 'in_target';
                }
            } else {
                // 適合しなかった
                if (isAnd) {
                    // and条件なので終了
                    return 'not_in_target';
                }
            }
        }

        // 地域
        if (conditionsData.pref && conditionsData.pref.item && conditionsData.pref.item.length) {
            if ((trackData.currentSessionData.pref != 0 && !trackData.currentSessionData.pref)
                || conditionsData.pref.item.indexOf(trackData.currentSessionData.pref.toString()) == -1
            ) {
                // 適合しなかったため対象外
                if (isAnd) {
                    // and条件なので終了
                    return 'not_in_target';
                }
            } else {
                // 適合した
                if (!isAnd) {
                    // or条件なので終了
                    return 'in_target';
                }
            }
        }

        // 法人
        if (conditionsData.org_info || conditionsData.corporation) {
            var conditionsCorpType = '';
            var conditionsCorpOrgIndCatM = '';
            if (conditionsData.org_info) {
                conditionsCorpType = conditionsData.org_info;
            } else if (conditionsData.corporation) {
                conditionsCorpType = conditionsData.corporation.type;
                if (conditionsData.corporation.org_ind_cat_m) {
                    conditionsCorpOrgIndCatM = conditionsData.corporation.org_ind_cat_m;
                }
            }

            var success = true;
            if (conditionsCorpType == 'exclude') {
                if (trackData.currentSessionData.orgCode) {
                    success = false;
                }
            } else if (conditionsCorpType == 'include') {
                if (!trackData.currentSessionData.orgCode) {
                    success = false;
                }

                if (success && conditionsCorpOrgIndCatM) {
                    var orgIndCatMList = trackData.currentSessionData.orgIndCatM ? trackData.currentSessionData.orgIndCatM.split(',') : [];
                    success = false;
                    for (var i = 0; i < orgIndCatMList.length; i++) {
                        if (conditionsCorpOrgIndCatM.indexOf(orgIndCatMList[i]) !== -1) {
                            success = true;
                            break;
                        }
                    }
                }
            }

            if (success) {
                // 適合した
                if (!isAnd) {
                    // or条件なので終了
                    return 'in_target';
                }
            } else {
                // 適合しなかった
                if (isAnd) {
                    // and条件なので終了
                    return 'not_in_target';
                }
            }
        }

        // 特定のシナリオ (この条件は最後にチェックする)
        var undecided = false;
        if (conditionsData.specific_scenario && conditionsData.specific_scenario.length) {
            var success = false;
            var hasUndecidedScenario = false;
            for (var i = 0; i < conditionsData.specific_scenario.length; i++) {
                var specificScenarioCondition = conditionsData.specific_scenario[i];
                var specificScenarioId = specificScenarioCondition.scenario_id;
                var specificScenario = scenarioManager.getScenarioFromId(specificScenarioId);
                if (!specificScenario) {
                    continue;
                }

                // MEMO 【処理の順番に注意】リアクションの有無 より前に判定しないといけない
                if (specificScenarioCondition.question && specificScenarioCondition.question != 'none') {
                    if (specificScenarioCondition.question.slice(-2) == 'Q1') {
                        // QA1の設問を閲覧しているかどうかはリアクションで判定できるから、ひとまず一致したことにして「リアクションあり」の絞り込み条件を付与する
                        specificScenarioCondition.reaction = 'reaction';
                    } else {
                        var scenarioQuestionKey = specificScenario.question;
                        scenarioQuestionKey = specificScenarioId + '-' + scenarioQuestionKey;
                        if (scenarioQuestionKey.indexOf(specificScenarioCondition.question) !== 0) {
                            // この特定シナリオは不適合なので次の特定シナリオを調べる
                            continue;
                        }
                    }
                }

                if (specificScenarioCondition.view && specificScenarioCondition.view != 'none') {
                    if (specificScenarioCondition.view != specificScenario.view) {
                        // この特定シナリオは不適合なので次の特定シナリオを調べる
                        continue;
                    }
                }

                if (specificScenarioCondition.reaction && specificScenarioCondition.reaction != 'none') {
                    if (specificScenarioCondition.reaction != specificScenario.reaction) {
                        // この特定シナリオは不適合なので次の特定シナリオを調べる
                        continue;
                    }
                }

                if (specificScenarioCondition.goal && specificScenarioCondition.goal != 'none') {
                    if (specificScenarioCondition.goal != specificScenario.goal) {
                        // この特定シナリオは不適合なので次の特定シナリオを調べる
                        continue;
                    }
                }

                if (specificScenarioCondition.close && specificScenarioCondition.close != 'none') {
                    if (specificScenarioCondition.close != specificScenario.close) {
                        // この特定シナリオは不適合なので次の特定シナリオを調べる
                        continue;
                    }
                }

                if (specificScenarioCondition.target && specificScenarioCondition.target != 'none') {
                    if (specificScenario.target === null) {
                        // まだ対象が未確定
                        hasUndecidedScenario = true;
                        continue;
                    } else if (specificScenarioCondition.target != specificScenario.target) {
                        // この特定シナリオは不適合なので次の特定シナリオを調べる
                        continue;
                    }
                }

                // 適合するシナリオがあった
                success = true;
                break;
            }
            if (success) {
                // 適合した
                if (!isAnd) {
                    // or条件なので終了
                    return 'in_target';
                }
            } else {
                // 適合するシナリオがなかった
                if (hasUndecidedScenario) {
                    // 未確定
                    undecided = true;
                } else {
                    // 適合しなかった
                    if (isAnd) {
                        // and条件なので終了
                        return 'not_in_target';
                    }
                }
            }
        }

        // ここまで来た → and条件で非対象が一つもない もしくは or条件で対象が一つもない

        if (undecided) {
            // 未確定要素あり
            return 'undecided';
        }

        if (isAnd) {
            return 'in_target';
        } else {
            return 'not_in_target';
        }
    };

    /**
     * シナリオが達成されたか確認する
     * 
     * @return {Boolean} 達成した場合はtrue, 達成していない場合はfalse
     */
    Scenario.prototype.checkGoal = function (tracker, checkGoalType) {
        // クリエイティブ表示を行っていたかどうか確認
        if (this.viewCount == 0) {
            // 一度もクリエイティブを表示していないのでゴール判定はしない
            return false;
        }

        // 現在時刻
        var date = null;
        if (tracker.trackData && tracker.trackData.currentSessionData && tracker.trackData.currentSessionData.lastAccessDate) {
            date = new Date(tracker.trackData.currentSessionData.lastAccessDate * 1000);
        } else {
            date = new Date();
        }

        // 停止日時の確認
        if (this.stopDate != 0) {
            var stopDate = new Date(this.stopDate * 1000);
            if (date > stopDate) {
                // 停止日時を超えている
                return false;
            }
        }

        // 開始日時の確認
        var publishData = this.scenarioData.publishData || {};
        if (publishData.from_date) {
            var fromDate = new Date(publishData.from_date * 1000);
            if (date < fromDate) {
                // まだ開始していないシナリオ
                return false;
            }
        }

        // ここまで来てようやく実際にゴール判定を行う
        var goalData = this.scenarioData.goalData || {};
        if (goalData.type == 'specific' || goalData.type == 'conversion') {
            // ゴール判定にはcanonicalは使わない。またURLパラメータとハッシュを考慮する。
            var accessUrl = location.hostname + location.pathname + UrlMatcher.getQueryParamFilted() + location.hash;
            var pathList = goalData.type == 'conversion' ? goalData.conversion_path_list : goalData.path_list;
            for (var i = 0; i < pathList.length; i++) {
                if (UrlMatcher.match(accessUrl, pathList[i].path, pathList[i].match_type)) {
                    // URLがマッチした。
                    if (((checkGoalType & tracker.checkGoalTypeSpecific) != 0 && goalData.type == 'specific')
                        || ((checkGoalType & tracker.checkGoalTypeConversion) != 0 && goalData.type == 'conversion' && tracker.conversion)
                    ) {
                        // specific は無条にゴール、 conversion はコンバージョンタグがあればゴール
                        this.goal = 'goal';
                        this.goalInCurrentSession = true;
                        return true;
                    }
                }
            }
            // ゴールとしてクリエイティブのリンクが設定されていた場合
            if (goalData.creative_links_sync && Array.isArray(this.scenarioData.targetCreativeLinks)) {
                for (var i = 0; i < this.scenarioData.targetCreativeLinks.length; i++) {
                    if (UrlMatcher.match(accessUrl, this.scenarioData.targetCreativeLinks[i], 'match')) {
                        // URLがマッチした。
                        if ((checkGoalType & tracker.checkGoalTypeSpecific) != 0 && goalData.type == 'specific') {
                            this.goal = 'goal';
                            this.goalInCurrentSession = true;
                            return true;
                        }
                    }
                }
            }
        }
        
        return false;
    };

    /**
     * 公開設定を満たしているかチェック
     */
    Scenario.prototype.checkPublish = function (tracker) {
        var publishData = this.scenarioData.publishData || {};
        
        var date = null;
        if (tracker.trackData && tracker.trackData.currentSessionData && tracker.trackData.currentSessionData.lastAccessDate) {
            date = new Date(tracker.trackData.currentSessionData.lastAccessDate * 1000);
        } else {
            date = new Date();
        }
        
        // 開始日時
        if (publishData.from_date) {
            var fromDate = new Date(publishData.from_date * 1000);
            if (date < fromDate) {
                return false;
            }
        }

        // 終了日時
        if (publishData.to_date) {
            var toDate = new Date(publishData.to_date * 1000);
            if (date > toDate) {
                return false;
            }
        }

        // 特定の日
        if ('week' in publishData) {
            var isDayIncluded = true;
            var isPublicHoliday = false;
            if ('days' in publishData.week) {
                var week = date.getDay();
                if (publishData.week.days.length > 0 && publishData.week.days.indexOf(week.toString()) == -1) {
                    isDayIncluded = false;
                }
            }

            // 祝日の設定
            if (publishData.week.public_holiday !== 'none') {
                if (tracker.publicHolidayList.length === 0) {
                    // 祝日が取得できていなければ強制的に非公開
                    TtrConsole.error('checkPublish():nothing holiday.');
                    return false;
                }
                // 現在日が祝日か確認
                var dateObj = new Date();
                var dateStr = dateObj.getFullYear() + '-' + (('0' + (dateObj.getMonth() + 1)).slice(-2)) + '-' + ('0' + dateObj.getDate()).slice(-2);
                for (var i = 0; i < tracker.publicHolidayList.length; i++) {
                    if (dateStr === tracker.publicHolidayList[i].date) {
                        isPublicHoliday = true;
                        break;
                    }
                }

                switch (publishData.week.public_holiday) {
                    case 'include':
                        if (!isDayIncluded && !isPublicHoliday) {
                            return false;
                        }
                        break;
                    case 'exclude':
                        if (!isDayIncluded || isPublicHoliday) {
                            return false;
                        }
                        break;
                }
            } else if (!isDayIncluded) {
                return false;
            }

        }

        // 時間帯
        if (publishData.time && publishData.time.length) {
            var hourMin = date.getHours() * 60 + date.getMinutes();
            var success = false;
            for (var i = 0; i < publishData.time.length; i++) {
                var time = publishData.time[i];
                var fromHourMin = time.from ? time.from : '00:00';
                var toHourMin = time.to ? time.to : '23:59';
                var fromValues = fromHourMin.split(':');
                var toValues = toHourMin.split(':');
                fromHourMin = Number(fromValues[0]) * 60 + Number(fromValues[1]);
                toHourMin = Number(toValues[0]) * 60 + Number(toValues[1]);

                if (fromHourMin > toHourMin) {
                    // 開始時間の方が大きい→範囲が日をまたいでいる
                    if (hourMin >= fromHourMin || hourMin <= toHourMin) {
                        success = true;
                        break;
                    }
                } else {
                    // 開始時間の方が小さいもしくは同じ→範囲が日をまたいでいない
                    if (hourMin >= fromHourMin && hourMin <= toHourMin) {
                        success = true;
                        break;
                    }
                }
            }
            if (!success) {
                return false;
            }
        }
        
        return true;
    };

    /**
     * 表示ルールを満たしているかチェック
     * 
     * @return {Boolean}
     */
    Scenario.prototype.checkDisplayRule = function (tracker) {
        var displayRuleData = this.scenarioData.displayRuleData || {};

        // 表示ルールだけパラメータを考慮する
        var originAccessUrl = '';
        var originUrlParam = '';
        var enableCanonical = tracker.useCanonical && Boolean(tracker.canonicalUrl);
        if (enableCanonical) {
            originAccessUrl = tracker.canonicalUrl;
            originUrlParam = tracker.canonicalParam;
        } else {
            originAccessUrl = tracker.accessUrl;
            originUrlParam = UrlMatcher.getQueryParamFilted();
        }

        // 外部API連携クライアントの場合、パラメータが付いている可能性があるので取り除く
        var splitAccessUrl = originAccessUrl.split('?');
        if (splitAccessUrl.length === 2) {
            originAccessUrl = splitAccessUrl[0];
        }

        var accessUrlWithParam = originAccessUrl + originUrlParam;

        /*
        * 現状「実施するページ」との組み合わせは動いているが、すべてのパターンを網羅したわけではないので
        * パターンによっては機能しなくなる可能性あり
        */
        // 表示しないページ。表示するページの条件より優先度高い。
        var accessUrl = '';
        if (displayRuleData.hidden_page) {
            if (displayRuleData.hidden_page.use_param) {
                accessUrl = accessUrlWithParam;
            } else {
                accessUrl = originAccessUrl;
            }
            // 表示しないページの条件に合致していた場合
            var matched = false;
            var pathList = displayRuleData.hidden_page.path_list;
            for (var i = 0; i < pathList.length; i++) {
                if (UrlMatcher.match(accessUrl, pathList[i].path, pathList[i].match_type)) {
                    matched = true;
                    break;
                }
            }
            // 表示しないページとしてクリエイティブのリンクが設定されていた場合
            if (displayRuleData.hidden_page.creative_links_sync && Array.isArray(this.scenarioData.targetCreativeLinks)) {
                for (var i = 0; i < this.scenarioData.targetCreativeLinks.length; i++) {
                    if (UrlMatcher.match(accessUrl, this.scenarioData.targetCreativeLinks[i], 'match')) {
                        matched = true;
                        break;
                    }
                }
            }
            if (matched) {
                return false;
            }
        }

        // 実施するページ
        if (displayRuleData.page) {
            if (displayRuleData.page.use_param) {
                accessUrl = accessUrlWithParam;
            } else {
                accessUrl = originAccessUrl;
            }
            if (displayRuleData.page.type == 'specific_page') {
                var matched = false;
                var pathList = displayRuleData.page.specific_page.path_list;
                for (var i = 0; i < pathList.length; i++) {
                    if (UrlMatcher.match(accessUrl, pathList[i].path, pathList[i].match_type)) {
                        matched = true;
                        break;
                    }
                }
                if (!matched) {
                    return false;
                }
            }

            if (displayRuleData.page.exclude_page && displayRuleData.page.exclude_page.path_list) {
                accessUrl = originAccessUrl;
                var matched = false;
                var pathList = displayRuleData.page.exclude_page.path_list;
                for (var i = 0; i < pathList.length; i++) {
                    if (UrlMatcher.match(accessUrl, pathList[i].path, pathList[i].match_type)) {
                        matched = true;
                        break;
                    }
                }
                if (matched) {
                    return false;
                }
            }
        }

        // 停止ルール
        if (displayRuleData.stop) {
            if (displayRuleData.stop.limit && parseInt(displayRuleData.stop.limit.flag)) {
                var viewCount = 0;
                for (var creativeId in this.trackData) {
                    viewCount += this.trackData[creativeId].viewCount;
                }
                if (viewCount >= displayRuleData.stop.limit.count) {
                    return false;
                }
            }
            if (displayRuleData.stop.reaction && parseInt(displayRuleData.stop.reaction.flag)) {
                var viewCount = 0;
                for (var creativeId in this.trackData) {
                    if (this.trackData[creativeId].reactionCount) {
                        return false;
                    }
                }
            }
            if (displayRuleData.stop.close && parseInt(displayRuleData.stop.close.flag)) {
                var viewCount = 0;
                for (var creativeId in this.trackData) {
                    if (this.trackData[creativeId].closeCount) {
                        return false;
                    }
                }
            }
        }

        return true;
    };

    /**
     * シナリオリストの並び替えで使用するソート関数
     * 
     * @static
     */
    Scenario.sortFunction = function (a, b) {
        if (a.priority != b.priority) {
            return a.priority - b.priority;
        }
        if (a.scenarioData.viewType != b.scenarioData.viewType) {
            var values = [a.viewType, b.viewType];
            for (var i = 0; i < values.length; i++) {
                switch (values[i]) {
                    case 'inline':
                        values[i] = 1;
                        break;
                    case 'bar':
                        values[i] = 2;
                        break;
                    case 'qa':
                        values[i] = 3;
                        break;
                    case 'popup':
                        values[i] = 4;
                        break;
                    case 'modal':
                        values[i] = 10;
                        break;
                    default:
                        values[i] = 5;
                        break;
                }
            }
            return values[0] - values[1];
        }
        return 0;
    };

    var ScenarioManager = {
        Tracker: null,
        scenarioList: null,
        scenarioId2Scenario: null,

        allAccessUrlLinesText: null,
        allWithdrawalUrlLinesText: null,
        allConversionUrlLinesText: null,
        engagement: null,
        isRealTimeTracking: false,

        sequentialCreativeQueueTimerId: null, // Noticeのシナリオを順次表示するためのid
        sequentialCreativeQueue: [], // 表示予定のNoticeクリエイティブを格納

        timeoutIdList: [], // 実行待ちIDを保持する (SPA用)

        init: function (tracker, scenarioList) {
            this.Tracker = tracker;
            this.scenarioList = [];
            this.scenarioId2Scenario = null;

            if (scenarioList.length == 1 && scenarioList[0].isRealTimeTracking) {
                this.isRealTimeTracking = true;
            }

            for (var i = 0; i < scenarioList.length; i++) {
                var scenarioData = scenarioList[i];
                var scenario = new Scenario(scenarioData, tracker);
                this.scenarioList.push(scenario);
            }

            this.scenarioList.sort(Scenario.sortFunction);
            // TtrConsole.error('scenario count = ' + this.scenarioList.length);
            
            this.allAccessUrlLinesText = null;
            this.allWithdrawalUrlLinesText = null;
            this.allConversionUrlLinesText = null;
            this.engagement = null;

            // MEMO このタイミングでの初期は不要な項目 (sequentialCreativeQueueTimerId, sequentialCreativeQueue, timeoutIdList)
        },
        updateTracker: function (tracker) {
            this.Tracker = tracker;
        },
        /**
         * アクセスしたすべてのURLを改行区切りにしたテキストを返す
         */
        getAllAccessUrlLinesText: function () {
            if (this.allAccessUrlLinesText == null) {
                // 初期化する
                var list = [];
                for (var url in this.Tracker.trackData.accessData) {
                    if (this.Tracker.trackData.accessData[url].accessCount) {
                        list.push(url);
                    }
                }
                this.allAccessUrlLinesText = UrlMatcher.createLinesText(list);
            }
            return this.allAccessUrlLinesText;
        },
        /**
         * フォーム離脱したすべてのURLを改行区切りにしたテキストを返す
         */
        getAllWithdrawalUrlLinesText: function () {
            if (this.allWithdrawalUrlLinesText == null) {
                // 初期化する
                var list = [];
                for (var url in this.Tracker.trackData.accessData) {
                    if (this.Tracker.trackData.accessData[url].withdrawal) {
                        list.push(url);
                    }
                }
                this.allWithdrawalUrlLinesText = UrlMatcher.createLinesText(list);
            }
            return this.allWithdrawalUrlLinesText;
        },
        /**
         * コンバージョンしたすべてのURLを改行区切りにしたテキストを返す
         */
        getAllConversionUrlLinesText: function () {
            if (this.allConversionUrlLinesText == null) {
                // 初期化する
                var list = [];
                for (var url in this.Tracker.trackData.accessData) {
                    if (this.Tracker.trackData.accessData[url].conversionCount) {
                        list.push(url);
                    }
                }
                this.allConversionUrlLinesText = UrlMatcher.createLinesText(list);
            }
            return this.allConversionUrlLinesText;
        },
        /**
         * エンゲージメントを取得する
         */
        getEngagement: function () {
            if (this.engagement == null) {
                // 初期化する
                this.engagement = 0;
                var setting = this.Tracker.engagementSettingData;
                if (setting) {
                    var sessionCount = this.Tracker.trackData && this.Tracker.trackData.sessionHistory ? this.Tracker.trackData.sessionHistory.length : 1;
                    var num = Object.keys(setting).length;
                    for (var i = num; i >= 1; i--) {
                        var data = setting[i];
                        
                        if (sessionCount < parseInt(data.visit_count)) {
                            continue;
                        }
                        
                        var totalGoalCount = 0;
                        var scenarioId = parseInt(data.scenario_id);
                        if (scenarioId == 0) {
                            for (var trackScenarioId in this.Tracker.trackData.scenarioData) {
                                for (var trackCreativeId in this.Tracker.trackData.scenarioData[trackScenarioId]) {
                                    if (
                                        this.Tracker.trackData.scenarioData[trackScenarioId][trackCreativeId].goalDirectCount
                                    ||  this.Tracker.trackData.scenarioData[trackScenarioId][trackCreativeId].goalIndirectCount
                                    ) {
                                        totalGoalCount += 1;
                                        break;
                                    }
                                }
                            }
                        } else {
                            if (this.Tracker.trackData.scenarioData && this.Tracker.trackData.scenarioData[scenarioId]) {
                                for (var trackCreativeId in this.Tracker.trackData.scenarioData[scenarioId]) {
                                    if (
                                        this.Tracker.trackData.scenarioData[scenarioId][trackCreativeId].goalDirectCount
                                    ||  this.Tracker.trackData.scenarioData[scenarioId][trackCreativeId].goalIndirectCount
                                    ) {
                                        totalGoalCount += 1;
                                        break;
                                    }
                                }
                            }
                        }

                        if (totalGoalCount < parseInt(data.goal_count)) {
                            continue;
                        }
                        
                        this.engagement = i;
                        break;
                    }
                }
            }
            return this.engagement;
        },
        start: function () {
            this.checkTarget();
            var goalScenarioIdList = this.checkGoal(this.Tracker.checkGoalTypeAll);
            if (goalScenarioIdList.length) {
                // ゴールしたシナリオがある場合は、再度checkTargetを行う。
                this.checkTarget(true);
            }
            var execScenarioIdList = this.checkExec();
            this.Tracker.notifyScenario(goalScenarioIdList, execScenarioIdList);
        },
        checkTarget: function (reset) {
            if (reset) {
                // 現在のtarget情報をリセット
                for (var i = 0; i < this.scenarioList.length; i++) {
                    this.scenarioList[i].target = null;
                }
            }

            // シナリオが対象か確認
            var targetScenarioCount = 0;
            while (true) {
                var undecidedScenarioCount = 0;
                var decidedScenarioCount = 0;
                for (var i = 0; i < this.scenarioList.length; i++) {
                    var scenario = this.scenarioList[i];
                    if (scenario.target) {
                        // 既に対象かどうか確定済み
                        continue;
                    }
                    if (scenario.checkTarget(this.Tracker, this)) {
                        decidedScenarioCount++;
                        if (scenario.target == 'in_target') {
                            targetScenarioCount++;
                        }
                    } else {
                        undecidedScenarioCount++;
                    }
                }
                if (undecidedScenarioCount == 0) {
                    // すべて確定したので完了
                    break;
                }
                if (decidedScenarioCount == 0) {
                    // 確定したものがない → これ以上続けても無意味
                    break;
                }
            }
            // TtrConsole.error('target scenario = ' + targetScenarioCount + ' / ' + this.scenarioList.length);
        },
        checkGoal: function (checkGoalType) {
            // シナリオが達成しているか確認
            var goalScenarioIdList = []; // 今まさに達成となったシナリオのIDリスト
            for (var i = 0; i < this.scenarioList.length; i++) {
                var scenario = this.scenarioList[i];
                if (scenario.goalInCurrentSession) {
                    // 現在のセッションでは達成済み
                    continue;
                }
                if (scenario.checkGoal(this.Tracker, checkGoalType)) {
                    // ゴールに達成した
                    goalScenarioIdList.push(scenario.id);
                }
            }
            TtrConsole.error('goal scenario');
            TtrConsole.error(goalScenarioIdList);

            return goalScenarioIdList;
        },
        checkExec: function (goalScenarioIdList) {
            // シナリオを実行（クリエイティブ表示）するか確認
            var execScenarioIdList = []; // これから実行に移すシナリオのIDリスト
            var viewType2DisplayScenarioId = {};
            for (var i = 0; i < this.scenarioList.length; i++) {
                var scenario = this.scenarioList[i];

                // 停止条件
                if (
                    typeof scenario.scenarioData.displayRuleData.stop !== 'undefined'
                    && typeof scenario.scenarioData.displayRuleData.stop.goal !== 'undefined'
                    && scenario.scenarioData.displayRuleData.stop.goal.flag == 1
                    && scenario.goal == 'goal'
                ) {
                    // 既に達成済み
                    continue;
                }

                // 続いてクリエイティブ表示をするかどうか判定
                if (scenario.target != 'in_target'
                    || scenario.state == 'disable'
                    || scenario.archive == 1
                ) {
                    // 対象外 or 無効 or アーカイブ ならクリエイティブは表示しない
                    continue;
                }
                if (scenario.checkPublish(this.Tracker)) {
                    // 公開条件に合致した
                    var viewType = scenario.viewType;
                    if ((viewType == 'notice' || viewType == 'inline' || viewType2DisplayScenarioId[viewType] == undefined) && scenario.checkDisplayRule(this.Tracker)) {
                        // 同カテゴリでクリエイティブ表示するシナリオが未確定 and 表示ルールに合致
                        // インラインとノーティスは表示ルールのみチェックし、合致したシナリオが複数存在しても全て表示する
                        viewType2DisplayScenarioId[viewType] = scenario.id;
                        execScenarioIdList.push(scenario.id);
                    }
                }
            }
            execScenarioIdList = this.applyCreativeRestriction(this.Tracker, viewType2DisplayScenarioId, execScenarioIdList);
            TtrConsole.error('display scenario');
            TtrConsole.error(viewType2DisplayScenarioId);
            return execScenarioIdList;
        },

        /**
         * 同時表示設定を適用する
         *
         * @param tracker
         * @param viewType2DisplayScenarioId
         * @param execScenarioIdList
         * @returns {*}
         */
        applyCreativeRestriction: function (tracker, viewType2DisplayScenarioId, execScenarioIdList) {
            var creativeRestriction = tracker.creativeRestriction;
            var targetRestrictionList = [
                'popup',
                'modal',
            ];

            if (!creativeRestriction.status
                || !creativeRestriction.view_type
                || !viewType2DisplayScenarioId.hasOwnProperty(creativeRestriction.view_type)
            ) {
                return execScenarioIdList;
            }

            var viewTypes = Object.keys(viewType2DisplayScenarioId);
            for (var i = 0; i < viewTypes.length; i++) {
                if (targetRestrictionList.indexOf(viewTypes[i]) === -1) {
                    continue;
                }

                if (viewTypes[i] !== creativeRestriction.view_type) {
                    var excludedScenarioId = viewType2DisplayScenarioId[viewTypes[i]];
                    execScenarioIdList.splice(execScenarioIdList.indexOf(excludedScenarioId), 1);
                }

            }

            return execScenarioIdList;
        },
        
        getScenarioFromId: function (scenarioId) {
            if (this.scenarioId2Scenario == undefined) {
                this.scenarioId2Scenario = {};
                for (var i = 0; i < this.scenarioList.length; i++) {
                    var scenario = this.scenarioList[i];
                    this.scenarioId2Scenario[scenario.id] = scenario;
                }
            }
            
            return this.scenarioId2Scenario[scenarioId];
        },

        loadCreative: function (creativeData, isPreview) {
            if (isPreview) {
                this.displayCreative(creativeData, isPreview);
                return;
            }

            var scenario = this.getScenarioFromId(creativeData.scenarioId);
            var scenarioData = scenario.scenarioData;

            if (scenario.viewType == 'notice') {
                this.enqueueSequentialCreative(creativeData);
                return;
            }

            if (!scenarioData.displayRuleData
                || !scenarioData.displayRuleData.timing
                || !Object.keys(scenarioData.displayRuleData.timing).length
            ) {
                this.displayCreative(creativeData, isPreview);
                return;
            }
            
            this.watchDisplayRule(creativeData, scenarioData.displayRuleData.timing);
        },

        // 順次表示するクリエイティブをキューに登録（現状Noticeクリエイティブのみ）
        enqueueSequentialCreative: function (creativeData) {
            if (this.sequentialCreativeQueueTimerId) {
                clearTimeout(this.sequentialCreativeQueueTimerId);
            }

            var hasAccessCount = false;
            // アクセスカウントが1以上なら表示する
            if ('notice' in creativeData.data
                && 'access_count' in creativeData.data.notice
                && creativeData.data.notice.access_count > 0
            ) {
                hasAccessCount = true;
            }

            // ただしカウントが0でも実機プレビューは表示する
            if (window.location.search.match(/_ttr_preview_key/) !== null) {
                hasAccessCount = true;
            }

            if (hasAccessCount) {
                this.sequentialCreativeQueue.push(creativeData);
                var self = this;

                this.sequentialCreativeQueueTimerId = setTimeout(function () {
                    self.dequeueSequentialCreative();
                    window.addEventListener('noticeHide', function (e) {
                        self.dequeueSequentialCreative();
                    });
                }, 100);
            } else {
                // 訪問数等のカウントのみ行う
                this.Tracker.notifyCreative('view', creativeData.scenarioId, creativeData.creativeId);
            }
        },

        // キューに登録されているクリエイティブを表示する
        dequeueSequentialCreative: function () {
            var creativeData = this.sequentialCreativeQueue.shift();
            if (!creativeData) {
                return;
            }

            var scenario = this.getScenarioFromId(creativeData.scenarioId);
            if (creativeData.show == 'disable') {
                this.dequeueSequentialCreative();
            }

            var scenarioData = scenario.scenarioData;
            if (!scenarioData.displayRuleData
                || !scenarioData.displayRuleData.timing
                || !Object.keys(scenarioData.displayRuleData.timing).length
            ) {
                this.displayCreative(creativeData, false);
            } else {
                this.watchDisplayRule(creativeData, scenarioData.displayRuleData.timing);
            }

        },
        
        displayCreative: function (creativeData, isPreview) {

            var engagement = 1;
            if (!isPreview) {
                if (creativeData.shown) {
                    // 既に表示済み
                    return;
                }
                creativeData.shown = true; // 再表示させない
                engagement = this.getEngagement();
            }

            if (creativeData.show == 'disable') {
                // 表示なし
                if (!isPreview) {
                    // 通知だけ行う
                    this.Tracker.notifyCreative('view', creativeData.scenarioId, creativeData.creativeId);
                }
                return;
            }

            if (creativeData.html == '') {
                // 空っぽのクリエイティブの場合は通知も表示もしない
                return;
            }

            // クリエイティブのテンプレートIDを設定
            if (creativeData.templateId) {
                this.Tracker.templateId = creativeData.templateId;
            }

            var values = creativeData.html.split('<>');
            var style = values[0];
            var html = values[1];

            // 定型文を置換
            html = this.replaceTemplate(html);

            if (creativeData.contentType == 'recommend' && !isPreview && html.indexOf('data-content-engagement="' + engagement + '"') == -1) {
                // 対象のengagement のタグが存在しなければ、通知も表示もしない
                return;
            }

            // ブラウザーの情報を取得
            var deviceInfo = null;
            if (this.Tracker && this.Tracker.Device) {
                deviceInfo = this.Tracker.Device.getDeviceInfo();
            }

            var checkTtrBrowserAttrFunc = function (elem) {
                if (elem.getAttribute) {
                    var os = div.firstChild.getAttribute('data-ttr-os');
                    if (os && os !== deviceInfo.os) {
                        return false;
                    }

                    var browser = div.firstChild.getAttribute('data-ttr-browser');
                    if (browser) {
                        // 特定のブラウザとバージョンだけ有効
                        var vals = browser.split(',');
                        if (!deviceInfo
                            || deviceInfo.browser != vals[0]
                        ) {
                            return false;
                        }

                        if (vals[1] && !vals[2]) {
                            // 特定のバージョンのみ
                            var hasDecimalPoint = vals[1] % 1 !== 0;
                            if (hasDecimalPoint) {
                                // 小数点がある場合は完全一致
                                if (deviceInfo.browserVersion != vals[1]) {
                                    return false;
                                }
                            } else {
                                // 小数点がない場合は前方一致
                                if (deviceInfo.browserVersion.indexOf(vals[1]) !== 0) {
                                    return false;
                                }
                            }
                        } else if (vals[1] && vals[2]) {
                            // 特定のバージョン範囲のみ
                            if (deviceInfo.browserVersion < vals[1] || deviceInfo.browserVersion > vals[2]) {
                                return false;
                            }
                        }
                    }
                }
                return true; // 利用OK
            };

            if (style) {
                var head = document.getElementsByTagName('head')[0];
                var div = document.createElement('div');
                div.innerHTML = style;
                while (div.firstChild) {
                    if (!checkTtrBrowserAttrFunc(div.firstChild)) {
                        // このスタイルは利用しない
                        div.removeChild(div.firstChild);
                        continue;
                    }
                    head.appendChild(div.firstChild);
                }
            }
            if (html) {
                var div = document.createElement('div');
                div.innerHTML = html;
                labelCreativeNode:while (div.firstChild) {
                    if (!checkTtrBrowserAttrFunc(div.firstChild)) {
                        // この要素は使わない
                        div.removeChild(div.firstChild);
                        continue;
                    }
                    if (div.firstChild.tagName && div.firstChild.tagName.toLowerCase() == 'script') {
                        // scriptは一度divに所属してしまったものは、再度DOMに入れても実行されないので、新規に<script>タグを作成して追加
                        var script = document.createElement(div.firstChild.tagName);
                        script.innerHTML = div.firstChild.innerHTML;
                        if (div.firstChild.dataset.ttrScriptTpl !== undefined) {
                            script.dataset.ttrScriptTpl = div.firstChild.dataset.ttrScriptTpl;
                        }
                        document.body.appendChild(script);
                        div.removeChild(div.firstChild);
                    } else {
                        // script以外のタグ
                        if (creativeData.templateId.match(/inline/)) {
                            var selectedElement;
                            if (isPreview && window.location.search.match(/_ttr_preview_key/) === null) {
                                // 管理画面のプレビュー
                                selectedElement = document.getElementById('content');
                                selectedElement.setAttribute('data-container_insert_position', creativeData.data.container_insert_position);
                            } else {
                                if (isPreview && creativeData.tmpData) {
                                    // 実機プレビューでtmpDataがあれば使用する
                                    creativeData.data = creativeData.tmpData;
                                }
                                selectedElement = document.querySelector(creativeData.data.container_insert_id);
                            }
                            if (selectedElement != null) {
                                switch (creativeData.data.container_insert_position) {
                                    case 'innerBefore':
                                        selectedElement.insertBefore(div.firstChild, selectedElement.firstChild);
                                        break;
                                    case 'innerAfter':
                                        selectedElement.appendChild(div.firstChild);
                                        break;
                                    case 'innerReplace':
                                        while (selectedElement.firstChild) {
                                            selectedElement.removeChild(selectedElement.firstChild);
                                        }
                                        selectedElement.appendChild(div.firstChild);
                                        break;
                                    case 'outerReplace':
                                        // 管理画面プレビューでは要素自体の置き換えをすると、それ以降内部の置き換えができなくなるため、強制的に内部置き換えと同じ処理にする
                                        if (isPreview && window.location.search.match(/_ttr_preview_key/) === null) {
                                            while (selectedElement.firstChild) {
                                                selectedElement.removeChild(selectedElement.firstChild);
                                            }
                                            selectedElement.appendChild(div.firstChild);
                                        } else {
                                            selectedElement.parentNode.replaceChild(div, selectedElement);
                                            break labelCreativeNode;
                                        }
                                        break;
                                    default:
                                        return;
                                }
                            } else {
                                // インラインクリエイティブに設定したセレクタがなければ表示できないため強制終了
                                return;
                            }
                        } else {
                            if (creativeData.templateId.match(/notice/)) {
                                if (div.firstChild.querySelector) {
                                    var replaceType = div.firstChild.querySelector('[data-notice-replace]').getAttribute('data-notice-replace');

                                    switch (replaceType) {
                                        case 'access_count':
                                            // プレビューはアクセスカウントがなくても表示するので、1で固定
                                            var accessCount = 1;
                                            if (!isPreview) {
                                                accessCount = creativeData.data.notice.access_count;
                                            }
                                            div.firstChild.querySelector('[data-notice-replace]').innerHTML = accessCount;
                                            break;
                                        default:
                                            // デフォルト処理は現在なし
                                            break;
                                    }
                                }
                            }

                            if (div.firstElementChild.getAttribute('data-creative-pos') == 'top') {
                                // 指定があればbody内最上部に挿入する
                                document.body.insertBefore(div.firstChild, document.body.firstChild);
                            } else {
                                // それ以外はbody内最下部にそのまま追加
                                document.body.appendChild(div.firstChild)
                            }
                        }

                        if (isPreview && window.location.search.match(/_ttr_preview_key/) === null) {
                            var creativeElement = document.querySelector('x-t[data-ttr]');
                            if (creativeElement) {
                                var creativeType = creativeElement.getAttribute('data-ttr');
                                var contentParent = document.getElementById('content').parentNode;
                                contentParent.setAttribute('data-type', creativeType);
                                contentParent.setAttribute('data-ttr-template', creativeData.templateId);
                            }
                        }
                    }
                }

                var ttrRootElemId = 'ttr' + creativeData.creativeId;
                if (deviceInfo && deviceInfo.device) {
                    switch (deviceInfo.device) {
                        case 'pc':
                            deviceInfo.device = 'desktop';
                            break;
                        case 'tablet':
                            deviceInfo.device = 'tablet';
                            break;
                        case 'sphone':
                            deviceInfo.device = 'mobile';
                            break;
                    }
                    document.getElementById(ttrRootElemId).setAttribute('data-ttr-device', deviceInfo.device);
                    if (isPreview) {
                        // プレビュー画面の制御のためにBodyにデバイス情報を追加する
                        document.querySelector('body').setAttribute('data-ttr-device', deviceInfo.device);
                    }
                }

                if (!isPreview) {
                    if (creativeData.templateId.indexOf('ep') != 0) {
                        this.Tracker.notifyCreative('view', creativeData.scenarioId, creativeData.creativeId);
                    } else {
                        // 離脱防止シナリオは各クリエイティブのscriptで表示通知を行う
                    }
                } else {
                    document.getElementById(ttrRootElemId).setAttribute('data-preview', 1);
                }

                if (creativeData.contentType == 'recommend') {
                    document.getElementById(ttrRootElemId).setAttribute('data-engagement', engagement);
                }

                if (creativeData.contentType == 'countdown') {
                    var lastAccessDate = new Date().getTime();
                    if (this.Tracker.trackData && Object.keys(this.Tracker.trackData).length != 0) {
                        // 公開側はトラックデータのアクセス日時を使用する
                        lastAccessDate = this.Tracker.trackData.currentSessionData.lastAccessDate;
                        lastAccessDate *= 1000; // ミリ秒の3桁分を付与
                    }
                    document.getElementById(ttrRootElemId).setAttribute('data-last-access-date', lastAccessDate);
                }

                if (creativeData.templateId.match(/qa-chat/)) {

                    // qa-chatシナリオの場合、アニメーション表示のための調整を行う
                    var chatWaitEvent1 = function () {
                        setTimeout(chatWaitEvent2, 1000);
                    }
                    var chatWaitEvent2 = function () {

                        document.querySelector('x-t[data-ttr-open-qa-chat]').setAttribute('aria-busy', 'false');
                        document.querySelector('x-t[data-ttr-qa-content-lead]').removeAttribute('hidden');
                        document.querySelector('x-t[data-ttr-qa-content-lead]').setAttribute('aria-live', 'polite');
                        var waitMs = parseInt(creativeData.data.content_call_second) * 1000;

                        if (parseInt(creativeData.data.content_call_second) == 0) {
                            return;
                        }

                        setTimeout(chatWaitEvent3, waitMs);
                    }
                    var chatWaitEvent3 = function () {
                        document.querySelector('x-t[data-ttr-open-qa-chat]').setAttribute('aria-busy', 'true');
                        setTimeout(chatWaitEvent4, 1000);
                    }
                    var chatWaitEvent4 = function () {
                        document.querySelector('x-t[data-ttr-open-qa-chat]').setAttribute('aria-busy', 'false');
                        document.querySelector('x-t[data-ttr-qa-content-lead]').setAttribute('hidden', '');
                        document.querySelector('x-t[data-ttr-qa-call-text]').removeAttribute('hidden');
                        document.querySelector('x-t[data-ttr-qa-call-text]').setAttribute('aria-live', 'assertive');
                    }
                    chatWaitEvent1();
                }
            }

            if (creativeData.data.javascript) {
                var scriptTag = document.createElement('script');
                scriptTag.innerHTML = creativeData.data.javascript;
                document.body.appendChild(scriptTag);
            }
        },

        /**
         * クリエイティブを表示するタイミングを監視する
         */
        watchDisplayRule: function (creativeData, timing) {
            
            // サイト滞在時間
            if (timing.site_stay) {
                var totalSojournTime = this.Tracker.trackData.currentSessionData.totalSojournTime;
                if (totalSojournTime > timing.site_stay) {
                    // ページ表示時点ですでに経過している
                    this.displayCreative(creativeData, false);
                    return;
                }
                var sojournTime = (totalSojournTime * 1000) + this.Tracker.getSojournTime();
                var diffTime = (timing.site_stay * 1000) - sojournTime;
                if (diffTime <= 0) {
                    // ページ表示時点から現在までの間に経過している
                    this.displayCreative(creativeData, false);
                    return;
                }
                // diffTimeミリ秒後に表示する
                var self = this;
                var timeoutId = setTimeout(function () {
                    self.displayCreative(creativeData, false);
                }, diffTime);
                this.timeoutIdList.push(timeoutId);
            }
            
            // ページ滞在時間
            if (timing.page_stay) {
                var sojournTime = this.Tracker.getSojournTime(); // ミリ秒
                var diffTime = (timing.page_stay * 1000) - sojournTime;
                if (diffTime <= 0) {
                    // ページ表示時点から現在までの間に経過している
                    this.displayCreative(creativeData, false);
                    return;
                }
                // diffTimeミリ秒後に表示する
                var self = this;
                var timeoutId = setTimeout(function () {
                    self.displayCreative(creativeData, false);
                }, diffTime);
                this.timeoutIdList.push(timeoutId);
            }
            
            // 画面下までスクロール
            // 表示タイミングはOR条件なので、"none"を排除しないと"滞在時間"に関係なく必ず表示されてしまう
            if (timing.scroll) {
                // 画面上部からどれくらいの割合までスクロールしているか返す
                var getDistanceRatioFromTop = function () {
                    var scrollHeight = document.documentElement.scrollHeight;
                    var scrollTop    = document.documentElement.scrollTop || document.body.scrollTop;
                    var clientHeight = window.innerHeight || document.documentElement.clientHeight;
                    var distanceRatio = (scrollTop + clientHeight) / scrollHeight;
                    return distanceRatio;
                };

                var scrollType = timing.scroll;
                if (timing.scroll.type) {
                    scrollType = timing.scroll.type;
                }

                var scrollPosition = 0;
                var isImmediateDisplay = true;
                switch (scrollType) {
                    case 'none':
                        // "設定なし"は滞在時間の設定がない場合のみ即時表示する
                        isImmediateDisplay = (!timing.site_stay && !timing.page_stay);
                        break;
                    case 'center':
                        scrollPosition = 0.5;
                        break;
                    case '1':
                    case 'bottom':
                        // 旧方式の"1"は新方式の"bottom"に該当する
                        scrollPosition = 0.8;
                        break;
                    case 'specify':
                        scrollPosition = 0;
                        if (timing.scroll.percent && 0 < timing.scroll.percent) {
                            scrollPosition = timing.scroll.percent / 100;
                        }
                        break;
                }

                if (isImmediateDisplay) {
                    var self = this;
                    if (getDistanceRatioFromTop() >= scrollPosition) {
                        // 既に最下部に達している
                        self.displayCreative(creativeData, false);
                    } else {
                        window.addEventListener('scroll', function () {
                            if (getDistanceRatioFromTop() >= scrollPosition) {
                                self.displayCreative(creativeData, false);
                            }
                        });
                    }
                }
            }
        },

        /**
         * テキストの定型文の置換
         */
        replaceTemplate: function ($html) {

            var date = new Date();
            var replacePairs = {
                '{$year}': date.getFullYear(),
                '{$month_1}': date.getMonth() + 1,
                '{$month_2}': ("0" + (date.getMonth() + 1)).slice(-2),
                '{$day_1}': date.getDate(),
                '{$day_2}': ("0" + date.getDate()).slice(-2),
            };
            var replaceStr = $html;
            for (replaceKey in replacePairs) {
                var escapedReplaceKey = replaceKey.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                replaceStr = replaceStr.replace(new RegExp(escapedReplaceKey,"g"), replacePairs[replaceKey]);
            }
            return replaceStr;
        },

        removeCreative: function () {
            var creativeStyles = document.querySelectorAll('[data-ttr-creative-id][data-ttr-style="creative"]');
            for (var csIdx = 0; csIdx < creativeStyles.length; csIdx++) {
                var creativeStyle = creativeStyles[csIdx];
                var creativeId = creativeStyle.dataset.ttrCreativeId.slice(3);
                // スタイルの削除
                var styles = document.querySelectorAll('[data-ttr-creative-id="ttr' + creativeId + '"]');
                for (var sIdx = 0; sIdx < styles.length; sIdx++) {
                    var style = styles[sIdx];
                    style.parentNode.removeChild(style);
                }
                // クリエイティブの削除
                var creative = document.getElementById('ttr' + creativeId);
                creative.parentNode.removeChild(creative);
            }

            var scripts = document.querySelectorAll('[data-ttr-script-tpl]');
            for (var scIdx = 0; scIdx < scripts.length; scIdx++) {
                var script = scripts[scIdx];
                script.parentNode.removeChild(script);
            }
        },
    };

    if (!window[queueName]) {
        window[queueName] = [];
    }
    window[queueName].push(['scenarioManager', ScenarioManager]);

    // クリエイティブで使用する独自タグの登録
    if (window.customElements && window.customElements.define) {
        try {
            window.customElements.define('x-t');
        } catch (e) {
        }
    }

    // todo デバッグ用
    window._scenarioManager = ScenarioManager;


    var UserAnalysisManager = {
        Tracker: null,
        clientCvData: null,

        init: function (tracker, clientCvData) {
            this.Tracker = tracker;
            this.clientCvData = clientCvData;
        },
        start: function () {
            this.Tracker.notifyUserAnalysis(this.Tracker.checkGoalTypeAll);
        },
        /**
         * ユーザー分析のCV設定を達成したか判定する
         */
        checkCv: function (accessUrl, conversion, clientCv, checkGoalType) {
            if (UrlMatcher.match(accessUrl, clientCv.path, clientCv.match_type)) {
                if (((checkGoalType & this.Tracker.checkGoalTypeSpecific) != 0 && clientCv.type == 'specific')
                    || ((checkGoalType & this.Tracker.checkGoalTypeConversion) != 0 && clientCv.type == 'conversion' && conversion)
                ) {
                    // specific は無条にCV、 conversion はコンバージョンタグがあればCV
                    return true;
                }
            }
            return false;
        },
    };
    window[queueName].push(['UserAnalysisManager', UserAnalysisManager]);

    // todo デバッグ用
    window._userAnalysisManager = UserAnalysisManager;

})(window, document, '_wsq');
