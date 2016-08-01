 // skinYn 돈피구분 N 박피,  Y 탕박  Default 탕박
// sexCd	성별	6	0	025001	025001	암  025002	수 025003	거세 025004	기타(프리마틴등) Default  025001

// 도매시장 코드
// 0905	농협고령
// 1301	삼성식품
// 0809	농협나주
// 1005	김해축공
// 0302	협신식품
// 1201	신흥산업
// 0202	부경축공
// 0320	도드람
// 0323	농협부천
// 0714	익산
// 0513	농협음성
// 1101	제주축협
// 1401 삼호축산


Template.market.onRendered(function() {

    var today = new Date();
    document.getElementById("datepicker1").defaultValue = moment(new Date(Date.parse(today) - 5 * 1000 * 60 * 60 * 24)).format('YYYY-MM-DD');
    document.getElementById("datepicker2").defaultValue = moment(new Date()).format('YYYY-MM-DD');

    var sexText = "암";
    var skinText = "탕박";
    var titleText = "";

    function drawPlot() {
        var start = moment($('#datepicker1').val()).format('YYYYMMDD');
        var end = moment($('#datepicker2').val()).format('YYYYMMDD');
        var sex = $('input[name="optradio"]:checked').val();
        var skin = $('input[name="optradio2"]:checked').val();

        if (sex === "25001") {
            sexText = "암";
        } else if (sex === "25002") {
            sexText = "수";
        } else {
            sexText = "거세";
        }

        if (skin === "Y") {
            skinText = "탕박";
        } else {
            skinText = "박피"
        }
        titleText = sexText + ", " + skinText + "<br>" + start + " ~ " + end;

        Meteor.call('market.get', start, end, skin, sex, function(error, result) {
            if (error) {
                console.log(error);
            } else {
                Session.setPersistent('test', result);
                var test = Session.get('test');

                function unitK(x) {
                    return Math.floor(x / 10) + "." + (x % 10);
                }
                // 등급 : 1+ , 1 , 2 , 등외 , 등외제외 , 모돈 , 평균
                var xname = [];
                var trace_1plus_Amt = [],
                    trace_1plus_Cnt = [],
                    trace_1_Amt = [],
                    trace_1_Cnt = [],
                    trace_2_Amt = [],
                    trace_2_Cnt = [],
                    trace_exc_Amt = [],
                    trace_exc_Cnt = [],
                    trace_non_Amt = [],
                    trace_non_Cnt = [],
                    trace_mom_Amt = [],
                    trace_mom_Cnt = [],
                    trace_avg_Amt = [],
                    trace_avg_Cnt = [];

                var PNC = {
                    "BK_Amt": "",
                    "BK_Cnt": "",
                    "HS_Amt": "",
                    "HS_Cnt": "",
                    "DDL_Amt": "",
                    "DDL_Cnt": "",
                    "NH_BC_Amt": "",
                    "NH_BC_Cnt": "",
                    "NH_YS_Amt": "",
                    "NH_YS_Cnt": "",
                    "YS_Amt": "",
                    "YS_Cnt": "",
                    "NH_NG_Amt": "",
                    "NH_NG_Cnt": "",
                    "NH_KL_Amt": "",
                    "NH_KL_Cnt": "",
                    "KH_Amt": "",
                    "KH_Cnt": "",
                    "JJ_Amt": "",
                    "JJ_Cnt": "",
                    "SH_Amt": "",
                    "SH_Cnt": "",
                    "SS_Amt": "",
                    "SS_Cnt": "",
                    "SHC_Amt": "",
                    "SHC_Cnt": "",
                };

                var st = test.response.body[0].items[0];

                $.each(st.item, function(i, val) {
                    if (st.item[i].gradeNm.toString() === '1+') {
                        PNC = {
                            "BK_Amt": "",
                            "BK_Cnt": "",
                            "HS_Amt": "",
                            "HS_Cnt": "",
                            "DDL_Amt": "",
                            "DDL_Cnt": "",
                            "NH_BC_Amt": "",
                            "NH_BC_Cnt": "",
                            "NH_YS_Amt": "",
                            "NH_YS_Cnt": "",
                            "YS_Amt": "",
                            "YS_Cnt": "",
                            "NH_NG_Amt": "",
                            "NH_NG_Cnt": "",
                            "NH_KL_Amt": "",
                            "NH_KL_Cnt": "",
                            "KH_Amt": "",
                            "KH_Cnt": "",
                            "JJ_Amt": "",
                            "JJ_Cnt": "",
                            "SH_Amt": "",
                            "SH_Cnt": "",
                            "SS_Amt": "",
                            "SS_Cnt": "",
                            "SHC_Amt": "",
                            "SHC_Cnt": "",
                        };

                        if (st.item[i].c_0202Amt) {
                            PNC.BK_Amt = st.item[i].c_0202Amt[0];
                            PNC.BK_Cnt = st.item[i].c_0202Cnt[0];
                        }
                        if (st.item[i].c_0302Amt) {
                            PNC.HS_Amt = st.item[i].c_0302Amt[0];
                            PNC.HS_Cnt = st.item[i].c_0302Cnt[0];
                        }
                        if (st.item[i].c_0320Amt) {
                            PNC.DDL_Amt = st.item[i].c_0320Amt[0];
                            PNC.DDL_Cnt = st.item[i].c_0320Cnt[0];
                        }
                        if (st.item[i].c_0323Amt) {
                            PNC.NH_BC_Amt = st.item[i].c_0323Amt[0];
                            PNC.NH_BC_Cnt = st.item[i].c_0323Cnt[0];
                        }
                        if (st.item[i].c_0513Amt) {
                            PNC.NH_YS_Amt = st.item[i].c_0513Amt[0];
                            PNC.NH_YS_Cnt = st.item[i].c_0513Cnt[0];
                        }
                        if (st.item[i].c_0714Amt) {
                            PNC.YS_Amt = st.item[i].c_0714Amt[0];
                            PNC.YS_Cnt = st.item[i].c_0714Cnt[0];
                        }
                        if (st.item[i].c_0809Amt) {
                            PNC.NH_NG_Amt = st.item[i].c_0809Amt[0];
                            PNC.NH_NG_Cnt = st.item[i].c_0809Cnt[0];
                        }
                        if (st.item[i].c_0905Amt) {
                            PNC.NH_KL_Amt = st.item[i].c_0905Amt[0];
                            PNC.NH_KL_Cnt = st.item[i].c_0905Cnt[0];
                        }
                        if (st.item[i].c_1005Amt) {
                            PNC.KH_Amt = st.item[i].c_1005Amt[0];
                            PNC.KH_Cnt = st.item[i].c_1005Cnt[0];
                        }
                        if (st.item[i].c_1101Amt) {
                            PNC.JJ_Amt = st.item[i].c_1101Amt[0];
                            PNC.JJ_Cnt = st.item[i].c_1101Cnt[0];
                        }
                        if (st.item[i].c_1201Amt) {
                            PNC.SH_Amt = st.item[i].c_1201Amt[0];
                            PNC.SH_Cnt = st.item[i].c_1201Cnt[0];
                        }
                        if (st.item[i].c_1301Amt) {
                            PNC.SS_Amt = st.item[i].c_1301Amt[0];
                            PNC.SS_Cnt = st.item[i].c_1301Cnt[0];
                        }
                        if (st.item[i].c_1401Amt) {
                            PNC.SHC_Amt = st.item[i].c_1401Amt[0];
                            PNC.SHC_Cnt = st.item[i].c_1401Cnt[0];
                        }

                        trace_1plus_Amt = [PNC.BK_Amt, PNC.HS_Amt, PNC.DDL_Amt, PNC.NH_BC_Amt, PNC.NH_YS_Amt, PNC.YS_Amt, PNC.NH_NG_Amt, PNC.NH_KL_Amt, PNC.KH_Amt, PNC.JJ_Amt, PNC.SH_Amt, PNC.SS_Amt, PNC.SHC_Amt];
                        trace_1plus_Cnt = [PNC.BK_Cnt, PNC.HS_Cnt, PNC.DDL_Cnt, PNC.NH_BC_Cnt, PNC.NH_YS_Cnt, PNC.YS_Cnt, PNC.NH_NG_Cnt, PNC.NH_KL_Cnt, PNC.KH_Cnt, PNC.JJ_Cnt, PNC.SH_Cnt, PNC.SS_Cnt, PNC.SHC_Cnt];

                    } else if (test.response.body[0].items[0].item[i].gradeNm.toString() === '1') {
                        PNC = {
                            "BK_Amt": "",
                            "BK_Cnt": "",
                            "HS_Amt": "",
                            "HS_Cnt": "",
                            "DDL_Amt": "",
                            "DDL_Cnt": "",
                            "NH_BC_Amt": "",
                            "NH_BC_Cnt": "",
                            "NH_YS_Amt": "",
                            "NH_YS_Cnt": "",
                            "YS_Amt": "",
                            "YS_Cnt": "",
                            "NH_NG_Amt": "",
                            "NH_NG_Cnt": "",
                            "NH_KL_Amt": "",
                            "NH_KL_Cnt": "",
                            "KH_Amt": "",
                            "KH_Cnt": "",
                            "JJ_Amt": "",
                            "JJ_Cnt": "",
                            "SH_Amt": "",
                            "SH_Cnt": "",
                            "SS_Amt": "",
                            "SS_Cnt": "",
                            "SHC_Amt": "",
                            "SHC_Cnt": "",
                        };
                        if (st.item[i].c_0202Amt) {
                            PNC.BK_Amt = st.item[i].c_0202Amt[0];
                            PNC.BK_Cnt = st.item[i].c_0202Cnt[0];
                        }
                        if (st.item[i].c_0302Amt) {
                            PNC.HS_Amt = st.item[i].c_0302Amt[0];
                            PNC.HS_Cnt = st.item[i].c_0302Cnt[0];
                        }
                        if (st.item[i].c_0320Amt) {
                            PNC.DDL_Amt = st.item[i].c_0320Amt[0];
                            PNC.DDL_Cnt = st.item[i].c_0320Cnt[0];
                        }
                        if (st.item[i].c_0323Amt) {
                            PNC.NH_BC_Amt = st.item[i].c_0323Amt[0];
                            PNC.NH_BC_Cnt = st.item[i].c_0323Cnt[0];
                        }
                        if (st.item[i].c_0513Amt) {
                            PNC.NH_YS_Amt = st.item[i].c_0513Amt[0];
                            PNC.NH_YS_Cnt = st.item[i].c_0513Cnt[0];
                        }
                        if (st.item[i].c_0714Amt) {
                            PNC.YS_Amt = st.item[i].c_0714Amt[0];
                            PNC.YS_Cnt = st.item[i].c_0714Cnt[0];
                        }
                        if (st.item[i].c_0809Amt) {
                            PNC.NH_NG_Amt = st.item[i].c_0809Amt[0];
                            PNC.NH_NG_Cnt = st.item[i].c_0809Cnt[0];
                        }
                        if (st.item[i].c_0905Amt) {
                            PNC.NH_KL_Amt = st.item[i].c_0905Amt[0];
                            PNC.NH_KL_Cnt = st.item[i].c_0905Cnt[0];
                        }
                        if (st.item[i].c_1005Amt) {
                            PNC.KH_Amt = st.item[i].c_1005Amt[0];
                            PNC.KH_Cnt = st.item[i].c_1005Cnt[0];
                        }
                        if (st.item[i].c_1101Amt) {
                            PNC.JJ_Amt = st.item[i].c_1101Amt[0];
                            PNC.JJ_Cnt = st.item[i].c_1101Cnt[0];
                        }
                        if (st.item[i].c_1201Amt) {
                            PNC.SH_Amt = st.item[i].c_1201Amt[0];
                            PNC.SH_Cnt = st.item[i].c_1201Cnt[0];
                        }
                        if (st.item[i].c_1301Amt) {
                            PNC.SS_Amt = st.item[i].c_1301Amt[0];
                            PNC.SS_Cnt = st.item[i].c_1301Cnt[0];
                        }
                        if (st.item[i].c_1401Amt) {
                            PNC.SHC_Amt = st.item[i].c_1401Amt[0];
                            PNC.SHC_Cnt = st.item[i].c_1401Cnt[0];
                        }
                        trace_1_Amt = [PNC.BK_Amt, PNC.HS_Amt, PNC.DDL_Amt, PNC.NH_BC_Amt, PNC.NH_YS_Amt, PNC.YS_Amt, PNC.NH_NG_Amt, PNC.NH_KL_Amt, PNC.KH_Amt, PNC.JJ_Amt, PNC.SH_Amt, PNC.SS_Amt, PNC.SHC_Amt];
                        trace_1_Cnt = [PNC.BK_Cnt, PNC.HS_Cnt, PNC.DDL_Cnt, PNC.NH_BC_Cnt, PNC.NH_YS_Cnt, PNC.YS_Cnt, PNC.NH_NG_Cnt, PNC.NH_KL_Cnt, PNC.KH_Cnt, PNC.JJ_Cnt, PNC.SH_Cnt, PNC.SS_Cnt, PNC.SHC_Cnt];

                    } else if (test.response.body[0].items[0].item[i].gradeNm.toString() === '2') {
                        PNC = {
                            "BK_Amt": "",
                            "BK_Cnt": "",
                            "HS_Amt": "",
                            "HS_Cnt": "",
                            "DDL_Amt": "",
                            "DDL_Cnt": "",
                            "NH_BC_Amt": "",
                            "NH_BC_Cnt": "",
                            "NH_YS_Amt": "",
                            "NH_YS_Cnt": "",
                            "YS_Amt": "",
                            "YS_Cnt": "",
                            "NH_NG_Amt": "",
                            "NH_NG_Cnt": "",
                            "NH_KL_Amt": "",
                            "NH_KL_Cnt": "",
                            "KH_Amt": "",
                            "KH_Cnt": "",
                            "JJ_Amt": "",
                            "JJ_Cnt": "",
                            "SH_Amt": "",
                            "SH_Cnt": "",
                            "SS_Amt": "",
                            "SS_Cnt": "",
                            "SHC_Amt": "",
                            "SHC_Cnt": "",
                        };

                        if (st.item[i].c_0202Amt) {
                            PNC.BK_Amt = st.item[i].c_0202Amt[0];
                            PNC.BK_Cnt = st.item[i].c_0202Cnt[0];
                        }
                        if (st.item[i].c_0302Amt) {
                            PNC.HS_Amt = st.item[i].c_0302Amt[0];
                            PNC.HS_Cnt = st.item[i].c_0302Cnt[0];
                        }
                        if (st.item[i].c_0320Amt) {
                            PNC.DDL_Amt = st.item[i].c_0320Amt[0];
                            PNC.DDL_Cnt = st.item[i].c_0320Cnt[0];
                        }
                        if (st.item[i].c_0323Amt) {
                            PNC.NH_BC_Amt = st.item[i].c_0323Amt[0];
                            PNC.NH_BC_Cnt = st.item[i].c_0323Cnt[0];
                        }
                        if (st.item[i].c_0513Amt) {
                            PNC.NH_YS_Amt = st.item[i].c_0513Amt[0];
                            PNC.NH_YS_Cnt = st.item[i].c_0513Cnt[0];
                        }
                        if (st.item[i].c_0714Amt) {
                            PNC.YS_Amt = st.item[i].c_0714Amt[0];
                            PNC.YS_Cnt = st.item[i].c_0714Cnt[0];
                        }
                        if (st.item[i].c_0809Amt) {
                            PNC.NH_NG_Amt = st.item[i].c_0809Amt[0];
                            PNC.NH_NG_Cnt = st.item[i].c_0809Cnt[0];
                        }
                        if (st.item[i].c_0905Amt) {
                            PNC.NH_KL_Amt = st.item[i].c_0905Amt[0];
                            PNC.NH_KL_Cnt = st.item[i].c_0905Cnt[0];
                        }
                        if (st.item[i].c_1005Amt) {
                            PNC.KH_Amt = st.item[i].c_1005Amt[0];
                            PNC.KH_Cnt = st.item[i].c_1005Cnt[0];
                        }
                        if (st.item[i].c_1101Amt) {
                            PNC.JJ_Amt = st.item[i].c_1101Amt[0];
                            PNC.JJ_Cnt = st.item[i].c_1101Cnt[0];
                        }
                        if (st.item[i].c_1201Amt) {
                            PNC.SH_Amt = st.item[i].c_1201Amt[0];
                            PNC.SH_Cnt = st.item[i].c_1201Cnt[0];
                        }
                        if (st.item[i].c_1301Amt) {
                            PNC.SS_Amt = st.item[i].c_1301Amt[0];
                            PNC.SS_Cnt = st.item[i].c_1301Cnt[0];
                        }
                        if (st.item[i].c_1401Amt) {
                            PNC.SHC_Amt = st.item[i].c_1401Amt[0];
                            PNC.SHC_Cnt = st.item[i].c_1401Cnt[0];
                        }
                        trace_2_Amt = [PNC.BK_Amt, PNC.HS_Amt, PNC.DDL_Amt, PNC.NH_BC_Amt, PNC.NH_YS_Amt, PNC.YS_Amt, PNC.NH_NG_Amt, PNC.NH_KL_Amt, PNC.KH_Amt, PNC.JJ_Amt, PNC.SH_Amt, PNC.SS_Amt, PNC.SHC_Amt];
                        trace_2_Cnt = [PNC.BK_Cnt, PNC.HS_Cnt, PNC.DDL_Cnt, PNC.NH_BC_Cnt, PNC.NH_YS_Cnt, PNC.YS_Cnt, PNC.NH_NG_Cnt, PNC.NH_KL_Cnt, PNC.KH_Cnt, PNC.JJ_Cnt, PNC.SH_Cnt, PNC.SS_Cnt, PNC.SHC_Cnt];

                    } else if (test.response.body[0].items[0].item[i].gradeNm.toString() === '등외') {
                        PNC = {
                            "BK_Amt": "",
                            "BK_Cnt": "",
                            "HS_Amt": "",
                            "HS_Cnt": "",
                            "DDL_Amt": "",
                            "DDL_Cnt": "",
                            "NH_BC_Amt": "",
                            "NH_BC_Cnt": "",
                            "NH_YS_Amt": "",
                            "NH_YS_Cnt": "",
                            "YS_Amt": "",
                            "YS_Cnt": "",
                            "NH_NG_Amt": "",
                            "NH_NG_Cnt": "",
                            "NH_KL_Amt": "",
                            "NH_KL_Cnt": "",
                            "KH_Amt": "",
                            "KH_Cnt": "",
                            "JJ_Amt": "",
                            "JJ_Cnt": "",
                            "SH_Amt": "",
                            "SH_Cnt": "",
                            "SS_Amt": "",
                            "SS_Cnt": "",
                            "SHC_Amt": "",
                            "SHC_Cnt": "",
                        };
                        if (st.item[i].c_0202Amt) {
                            PNC.BK_Amt = st.item[i].c_0202Amt[0];
                            PNC.BK_Cnt = st.item[i].c_0202Cnt[0];
                        }
                        if (st.item[i].c_0302Amt) {
                            PNC.HS_Amt = st.item[i].c_0302Amt[0];
                            PNC.HS_Cnt = st.item[i].c_0302Cnt[0];
                        }
                        if (st.item[i].c_0320Amt) {
                            PNC.DDL_Amt = st.item[i].c_0320Amt[0];
                            PNC.DDL_Cnt = st.item[i].c_0320Cnt[0];
                        }
                        if (st.item[i].c_0323Amt) {
                            PNC.NH_BC_Amt = st.item[i].c_0323Amt[0];
                            PNC.NH_BC_Cnt = st.item[i].c_0323Cnt[0];
                        }
                        if (st.item[i].c_0513Amt) {
                            PNC.NH_YS_Amt = st.item[i].c_0513Amt[0];
                            PNC.NH_YS_Cnt = st.item[i].c_0513Cnt[0];
                        }
                        if (st.item[i].c_0714Amt) {
                            PNC.YS_Amt = st.item[i].c_0714Amt[0];
                            PNC.YS_Cnt = st.item[i].c_0714Cnt[0];
                        }
                        if (st.item[i].c_0809Amt) {
                            PNC.NH_NG_Amt = st.item[i].c_0809Amt[0];
                            PNC.NH_NG_Cnt = st.item[i].c_0809Cnt[0];
                        }
                        if (st.item[i].c_0905Amt) {
                            PNC.NH_KL_Amt = st.item[i].c_0905Amt[0];
                            PNC.NH_KL_Cnt = st.item[i].c_0905Cnt[0];
                        }
                        if (st.item[i].c_1005Amt) {
                            PNC.KH_Amt = st.item[i].c_1005Amt[0];
                            PNC.KH_Cnt = st.item[i].c_1005Cnt[0];
                        }
                        if (st.item[i].c_1101Amt) {
                            PNC.JJ_Amt = st.item[i].c_1101Amt[0];
                            PNC.JJ_Cnt = st.item[i].c_1101Cnt[0];
                        }
                        if (st.item[i].c_1201Amt) {
                            PNC.SH_Amt = st.item[i].c_1201Amt[0];
                            PNC.SH_Cnt = st.item[i].c_1201Cnt[0];
                        }
                        if (st.item[i].c_1301Amt) {
                            PNC.SS_Amt = st.item[i].c_1301Amt[0];
                            PNC.SS_Cnt = st.item[i].c_1301Cnt[0];
                        }
                        if (st.item[i].c_1401Amt) {
                            PNC.SHC_Amt = st.item[i].c_1401Amt[0];
                            PNC.SHC_Cnt = st.item[i].c_1401Cnt[0];
                        }
                        trace_exc_Amt = [PNC.BK_Amt, PNC.HS_Amt, PNC.DDL_Amt, PNC.NH_BC_Amt, PNC.NH_YS_Amt, PNC.YS_Amt, PNC.NH_NG_Amt, PNC.NH_KL_Amt, PNC.KH_Amt, PNC.JJ_Amt, PNC.SH_Amt, PNC.SS_Amt, PNC.SHC_Amt];
                        trace_exc_Cnt = [PNC.BK_Cnt, PNC.HS_Cnt, PNC.DDL_Cnt, PNC.NH_BC_Cnt, PNC.NH_YS_Cnt, PNC.YS_Cnt, PNC.NH_NG_Cnt, PNC.NH_KL_Cnt, PNC.KH_Cnt, PNC.JJ_Cnt, PNC.SH_Cnt, PNC.SS_Cnt, PNC.SHC_Cnt];

                    } else if (test.response.body[0].items[0].item[i].gradeNm.toString() === '등외제외') {
                        PNC = {
                            "BK_Amt": "",
                            "BK_Cnt": "",
                            "HS_Amt": "",
                            "HS_Cnt": "",
                            "DDL_Amt": "",
                            "DDL_Cnt": "",
                            "NH_BC_Amt": "",
                            "NH_BC_Cnt": "",
                            "NH_YS_Amt": "",
                            "NH_YS_Cnt": "",
                            "YS_Amt": "",
                            "YS_Cnt": "",
                            "NH_NG_Amt": "",
                            "NH_NG_Cnt": "",
                            "NH_KL_Amt": "",
                            "NH_KL_Cnt": "",
                            "KH_Amt": "",
                            "KH_Cnt": "",
                            "JJ_Amt": "",
                            "JJ_Cnt": "",
                            "SH_Amt": "",
                            "SH_Cnt": "",
                            "SS_Amt": "",
                            "SS_Cnt": "",
                            "SHC_Amt": "",
                            "SHC_Cnt": "",
                        };
                        if (st.item[i].c_0202Amt) {
                            PNC.BK_Amt = st.item[i].c_0202Amt[0];
                            PNC.BK_Cnt = st.item[i].c_0202Cnt[0];
                        }
                        if (st.item[i].c_0302Amt) {
                            PNC.HS_Amt = st.item[i].c_0302Amt[0];
                            PNC.HS_Cnt = st.item[i].c_0302Cnt[0];
                        }
                        if (st.item[i].c_0320Amt) {
                            PNC.DDL_Amt = st.item[i].c_0320Amt[0];
                            PNC.DDL_Cnt = st.item[i].c_0320Cnt[0];
                        }
                        if (st.item[i].c_0323Amt) {
                            PNC.NH_BC_Amt = st.item[i].c_0323Amt[0];
                            PNC.NH_BC_Cnt = st.item[i].c_0323Cnt[0];
                        }
                        if (st.item[i].c_0513Amt) {
                            PNC.NH_YS_Amt = st.item[i].c_0513Amt[0];
                            PNC.NH_YS_Cnt = st.item[i].c_0513Cnt[0];
                        }
                        if (st.item[i].c_0714Amt) {
                            PNC.YS_Amt = st.item[i].c_0714Amt[0];
                            PNC.YS_Cnt = st.item[i].c_0714Cnt[0];
                        }
                        if (st.item[i].c_0809Amt) {
                            PNC.NH_NG_Amt = st.item[i].c_0809Amt[0];
                            PNC.NH_NG_Cnt = st.item[i].c_0809Cnt[0];
                        }
                        if (st.item[i].c_0905Amt) {
                            PNC.NH_KL_Amt = st.item[i].c_0905Amt[0];
                            PNC.NH_KL_Cnt = st.item[i].c_0905Cnt[0];
                        }
                        if (st.item[i].c_1005Amt) {
                            PNC.KH_Amt = st.item[i].c_1005Amt[0];
                            PNC.KH_Cnt = st.item[i].c_1005Cnt[0];
                        }
                        if (st.item[i].c_1101Amt) {
                            PNC.JJ_Amt = st.item[i].c_1101Amt[0];
                            PNC.JJ_Cnt = st.item[i].c_1101Cnt[0];
                        }
                        if (st.item[i].c_1201Amt) {
                            PNC.SH_Amt = st.item[i].c_1201Amt[0];
                            PNC.SH_Cnt = st.item[i].c_1201Cnt[0];
                        }
                        if (st.item[i].c_1301Amt) {
                            PNC.SS_Amt = st.item[i].c_1301Amt[0];
                            PNC.SS_Cnt = st.item[i].c_1301Cnt[0];
                        }
                        if (st.item[i].c_1401Amt) {
                            PNC.SHC_Amt = st.item[i].c_1401Amt[0];
                            PNC.SHC_Cnt = st.item[i].c_1401Cnt[0];
                        }
                        trace_non_Amt = [PNC.BK_Amt, PNC.HS_Amt, PNC.DDL_Amt, PNC.NH_BC_Amt, PNC.NH_YS_Amt, PNC.YS_Amt, PNC.NH_NG_Amt, PNC.NH_KL_Amt, PNC.KH_Amt, PNC.JJ_Amt, PNC.SH_Amt, PNC.SS_Amt, PNC.SHC_Amt];
                        trace_non_Cnt = [PNC.BK_Cnt, PNC.HS_Cnt, PNC.DDL_Cnt, PNC.NH_BC_Cnt, PNC.NH_YS_Cnt, PNC.YS_Cnt, PNC.NH_NG_Cnt, PNC.NH_KL_Cnt, PNC.KH_Cnt, PNC.JJ_Cnt, PNC.SH_Cnt, PNC.SS_Cnt, PNC.SHC_Cnt];

                    } else if (test.response.body[0].items[0].item[i].gradeNm.toString() === '모돈') {
                        PNC = {
                            "BK_Amt": "",
                            "BK_Cnt": "",
                            "HS_Amt": "",
                            "HS_Cnt": "",
                            "DDL_Amt": "",
                            "DDL_Cnt": "",
                            "NH_BC_Amt": "",
                            "NH_BC_Cnt": "",
                            "NH_YS_Amt": "",
                            "NH_YS_Cnt": "",
                            "YS_Amt": "",
                            "YS_Cnt": "",
                            "NH_NG_Amt": "",
                            "NH_NG_Cnt": "",
                            "NH_KL_Amt": "",
                            "NH_KL_Cnt": "",
                            "KH_Amt": "",
                            "KH_Cnt": "",
                            "JJ_Amt": "",
                            "JJ_Cnt": "",
                            "SH_Amt": "",
                            "SH_Cnt": "",
                            "SS_Amt": "",
                            "SS_Cnt": "",
                            "SHC_Amt": "",
                            "SHC_Cnt": "",
                        };
                        if (st.item[i].c_0202Amt) {
                            PNC.BK_Amt = st.item[i].c_0202Amt[0];
                            PNC.BK_Cnt = st.item[i].c_0202Cnt[0];
                        }
                        if (st.item[i].c_0302Amt) {
                            PNC.HS_Amt = st.item[i].c_0302Amt[0];
                            PNC.HS_Cnt = st.item[i].c_0302Cnt[0];
                        }
                        if (st.item[i].c_0320Amt) {
                            PNC.DDL_Amt = st.item[i].c_0320Amt[0];
                            PNC.DDL_Cnt = st.item[i].c_0320Cnt[0];
                        }
                        if (st.item[i].c_0323Amt) {
                            PNC.NH_BC_Amt = st.item[i].c_0323Amt[0];
                            PNC.NH_BC_Cnt = st.item[i].c_0323Cnt[0];
                        }
                        if (st.item[i].c_0513Amt) {
                            PNC.NH_YS_Amt = st.item[i].c_0513Amt[0];
                            PNC.NH_YS_Cnt = st.item[i].c_0513Cnt[0];
                        }
                        if (st.item[i].c_0714Amt) {
                            PNC.YS_Amt = st.item[i].c_0714Amt[0];
                            PNC.YS_Cnt = st.item[i].c_0714Cnt[0];
                        }
                        if (st.item[i].c_0809Amt) {
                            PNC.NH_NG_Amt = st.item[i].c_0809Amt[0];
                            PNC.NH_NG_Cnt = st.item[i].c_0809Cnt[0];
                        }
                        if (st.item[i].c_0905Amt) {
                            PNC.NH_KL_Amt = st.item[i].c_0905Amt[0];
                            PNC.NH_KL_Cnt = st.item[i].c_0905Cnt[0];
                        }
                        if (st.item[i].c_1005Amt) {
                            PNC.KH_Amt = st.item[i].c_1005Amt[0];
                            PNC.KH_Cnt = st.item[i].c_1005Cnt[0];
                        }
                        if (st.item[i].c_1101Amt) {
                            PNC.JJ_Amt = st.item[i].c_1101Amt[0];
                            PNC.JJ_Cnt = st.item[i].c_1101Cnt[0];
                        }
                        if (st.item[i].c_1201Amt) {
                            PNC.SH_Amt = st.item[i].c_1201Amt[0];
                            PNC.SH_Cnt = st.item[i].c_1201Cnt[0];
                        }
                        if (st.item[i].c_1301Amt) {
                            PNC.SS_Amt = st.item[i].c_1301Amt[0];
                            PNC.SS_Cnt = st.item[i].c_1301Cnt[0];
                        }
                        if (st.item[i].c_1401Amt) {
                            PNC.SHC_Amt = st.item[i].c_1401Amt[0];
                            PNC.SHC_Cnt = st.item[i].c_1401Cnt[0];
                        }
                        trace_mom_Amt = [PNC.BK_Amt, PNC.HS_Amt, PNC.DDL_Amt, PNC.NH_BC_Amt, PNC.NH_YS_Amt, PNC.YS_Amt, PNC.NH_NG_Amt, PNC.NH_KL_Amt, PNC.KH_Amt, PNC.JJ_Amt, PNC.SH_Amt, PNC.SS_Amt, PNC.SHC_Amt];
                        trace_mom_Cnt = [PNC.BK_Cnt, PNC.HS_Cnt, PNC.DDL_Cnt, PNC.NH_BC_Cnt, PNC.NH_YS_Cnt, PNC.YS_Cnt, PNC.NH_NG_Cnt, PNC.NH_KL_Cnt, PNC.KH_Cnt, PNC.JJ_Cnt, PNC.SH_Cnt, PNC.SS_Cnt, PNC.SHC_Cnt];

                    } else {
                        PNC = {
                            "BK_Amt": "",
                            "BK_Cnt": "",
                            "HS_Amt": "",
                            "HS_Cnt": "",
                            "DDL_Amt": "",
                            "DDL_Cnt": "",
                            "NH_BC_Amt": "",
                            "NH_BC_Cnt": "",
                            "NH_YS_Amt": "",
                            "NH_YS_Cnt": "",
                            "YS_Amt": "",
                            "YS_Cnt": "",
                            "NH_NG_Amt": "",
                            "NH_NG_Cnt": "",
                            "NH_KL_Amt": "",
                            "NH_KL_Cnt": "",
                            "KH_Amt": "",
                            "KH_Cnt": "",
                            "JJ_Amt": "",
                            "JJ_Cnt": "",
                            "SH_Amt": "",
                            "SH_Cnt": "",
                            "SS_Amt": "",
                            "SS_Cnt": "",
                            "SHC_Amt": "",
                            "SHC_Cnt": "",
                        };
                        if (st.item[i].c_0202Amt) {
                            PNC.BK_Amt = st.item[i].c_0202Amt[0];
                            PNC.BK_Cnt = st.item[i].c_0202Cnt[0];
                        }
                        if (st.item[i].c_0302Amt) {
                            PNC.HS_Amt = st.item[i].c_0302Amt[0];
                            PNC.HS_Cnt = st.item[i].c_0302Cnt[0];
                        }
                        if (st.item[i].c_0320Amt) {
                            PNC.DDL_Amt = st.item[i].c_0320Amt[0];
                            PNC.DDL_Cnt = st.item[i].c_0320Cnt[0];
                        }
                        if (st.item[i].c_0323Amt) {
                            PNC.NH_BC_Amt = st.item[i].c_0323Amt[0];
                            PNC.NH_BC_Cnt = st.item[i].c_0323Cnt[0];
                        }
                        if (st.item[i].c_0513Amt) {
                            PNC.NH_YS_Amt = st.item[i].c_0513Amt[0];
                            PNC.NH_YS_Cnt = st.item[i].c_0513Cnt[0];
                        }
                        if (st.item[i].c_0714Amt) {
                            PNC.YS_Amt = st.item[i].c_0714Amt[0];
                            PNC.YS_Cnt = st.item[i].c_0714Cnt[0];
                        }
                        if (st.item[i].c_0809Amt) {
                            PNC.NH_NG_Amt = st.item[i].c_0809Amt[0];
                            PNC.NH_NG_Cnt = st.item[i].c_0809Cnt[0];
                        }
                        if (st.item[i].c_0905Amt) {
                            PNC.NH_KL_Amt = st.item[i].c_0905Amt[0];
                            PNC.NH_KL_Cnt = st.item[i].c_0905Cnt[0];
                        }
                        if (st.item[i].c_1005Amt) {
                            PNC.KH_Amt = st.item[i].c_1005Amt[0];
                            PNC.KH_Cnt = st.item[i].c_1005Cnt[0];
                        }
                        if (st.item[i].c_1101Amt) {
                            PNC.JJ_Amt = st.item[i].c_1101Amt[0];
                            PNC.JJ_Cnt = st.item[i].c_1101Cnt[0];
                        }
                        if (st.item[i].c_1201Amt) {
                            PNC.SH_Amt = st.item[i].c_1201Amt[0];
                            PNC.SH_Cnt = st.item[i].c_1201Cnt[0];
                        }
                        if (st.item[i].c_1301Amt) {
                            PNC.SS_Amt = st.item[i].c_1301Amt[0];
                            PNC.SS_Cnt = st.item[i].c_1301Cnt[0];
                        }
                        if (st.item[i].c_1401Amt) {
                            PNC.SHC_Amt = st.item[i].c_1401Amt[0];
                            PNC.SHC_Cnt = st.item[i].c_1401Cnt[0];
                        }
                        trace_avg_Amt = [PNC.BK_Amt, PNC.HS_Amt, PNC.DDL_Amt, PNC.NH_BC_Amt, PNC.NH_YS_Amt, PNC.YS_Amt, PNC.NH_NG_Amt, PNC.NH_KL_Amt, PNC.KH_Amt, PNC.JJ_Amt, PNC.SH_Amt, PNC.SS_Amt, PNC.SHC_Amt];
                        trace_avg_Cnt = [PNC.BK_Cnt, PNC.HS_Cnt, PNC.DDL_Cnt, PNC.NH_BC_Cnt, PNC.NH_YS_Cnt, PNC.YS_Cnt, PNC.NH_NG_Cnt, PNC.NH_KL_Cnt, PNC.KH_Cnt, PNC.JJ_Cnt, PNC.SH_Cnt, PNC.SS_Cnt, PNC.SHC_Cnt];
                    }
                });

                var d3 = Plotly.d3;
                var g1 = d3.select('div[id="market_plot1"]');
                var gd = g1.node();

                var g2 = d3.select('div[id="market_plot2"]');
                var gd2 = g2.node();

                var g3 = d3.select('div[id="market_plot3"]');
                var gd3 = g3.node();

                var g4 = d3.select('div[id="market_plot4"]');
                var gd4 = g4.node();

                var g5 = d3.select('div[id="market_plot5"]');
                var gd5 = g5.node();

                var g6 = d3.select('div[id="market_plot6"]');
                var gd6 = g6.node();

                var g7 = d3.select('div[id="market_plot7"]');
                var gd7 = g7.node();

                for (i = 0; i < 13; i++) {
                    trace_1plus_Amt[i] = Number(trace_1plus_Amt[i]);
                    trace_1plus_Amt[i] = unitK(trace_1plus_Amt[i]);

                    trace_1_Amt[i] = Number(trace_1_Amt[i]);
                    trace_1_Amt[i] = unitK(trace_1_Amt[i]);

                    trace_2_Amt[i] = Number(trace_2_Amt[i]);
                    trace_2_Amt[i] = unitK(trace_2_Amt[i]);

                    trace_exc_Amt[i] = Number(trace_exc_Amt[i]);
                    trace_exc_Amt[i] = unitK(trace_exc_Amt[i]);

                    trace_non_Amt[i] = Number(trace_non_Amt[i]);
                    trace_non_Amt[i] = unitK(trace_non_Amt[i]);

                    trace_mom_Amt[i] = Number(trace_mom_Amt[i]);
                    trace_mom_Amt[i] = unitK(trace_mom_Amt[i]);

                    trace_avg_Amt[i] = Number(trace_avg_Amt[i]);
                    trace_avg_Amt[i] = unitK(trace_avg_Amt[i]);
                }

                xname = ['부경축공', '협신식품', '도드람', '농협부천', '농협음성', '익산', '농협나주', '농협고령', '김해축공', '제주축협', '신흥산업', '삼성식품', '삼호축산'];
                var trace1 = {
                    x: xname,
                    y: trace_1plus_Amt,
                    type: 'bar',
                    name: '1+ 등급 가격',
                };
                var trace2 = {
                    x: xname,
                    y: trace_1_Amt,
                    type: 'bar',
                    name: '1 등급 가격'
                };
                var trace3 = {
                    x: xname,
                    y: trace_2_Amt,
                    type: 'bar',
                    name: '2등급 가격'
                };
                var trace4 = {
                    x: xname,
                    y: trace_exc_Amt,
                    type: 'bar',
                    name: '등외 가격'
                };
                var trace5 = {
                    x: xname,
                    y: trace_non_Amt,
                    type: 'bar',
                    name: '등외제외 가격'
                };
                var trace6 = {
                    x: xname,
                    y: trace_mom_Amt,
                    type: 'bar',
                    name: '모돈 가격'
                };
                var trace7 = {
                    x: xname,
                    y: trace_avg_Amt,
                    type: 'bar',
                    name: '평균 가격'
                };
                // 두수
                var trace8 = {
                    x: xname,
                    y: trace_1plus_Cnt,
                    type: 'bar',
                    name: '1+등급 두수',
                };
                var trace9 = {
                    x: xname,
                    y: trace_1_Cnt,
                    type: 'bar',
                    name: '1등급 두수',
                };
                var trace10 = {
                    x: xname,
                    y: trace_2_Cnt,
                    type: 'bar',
                    name: '2등급 두수',
                };
                var trace11 = {
                    x: xname,
                    y: trace_exc_Cnt,
                    type: 'bar',
                    name: '등외 두수',
                };
                var trace12 = {
                    x: xname,
                    y: trace_non_Cnt,
                    type: 'bar',
                    name: '등외제외 두수',
                };
                var trace13 = {
                    x: xname,
                    y: trace_mom_Cnt,
                    type: 'bar',
                    name: '모돈 두수',
                };
                var trace14 = {
                    x: xname,
                    y: trace_avg_Cnt,
                    type: 'bar',
                    name: '평균 두수',
                };

                var data_1plus = [trace1, trace8];
                var data_1 = [trace2, trace9];
                var data_2 = [trace3, trace10];
                var data_exc = [trace4, trace11];
                var data_non = [trace5, trace12];
                var data_mom = [trace6, trace13];
                var data_avg = [trace7, trace14];

                var layout = {
                    title: "1+등급, " + titleText,
                    titlefont: {
                        family: 'Jeju Gothic, serif',
                        size: 20,
                        color: '#2c3e50'
                    },
                    showlegend: false,
                    barmode: 'group',
                };

                Plotly.newPlot('market_plot1', data_1plus, layout);

                var layout2 = {
                    title: "1등급, " + titleText,
                    titlefont: {
                        family: 'Jeju Gothic, serif',
                        size: 20,
                        color: '#2c3e50'
                    },
                    showlegend: false,
                    barmode: 'group',
                };

                Plotly.newPlot('market_plot2', data_1, layout2);

                var layout3 = {
                    title: "2등급, " + titleText,
                    titlefont: {
                        family: 'Jeju Gothic, serif',
                        size: 20,
                        color: '#2c3e50'
                    },
                    showlegend: false,
                    barmode: 'group',
                };

                Plotly.newPlot('market_plot3', data_2, layout3);

                var layout4 = {
                    title: "등외, " + titleText,
                    titlefont: {
                        family: 'Jeju Gothic, serif',
                        size: 20,
                        color: '#2c3e50'
                    },
                    showlegend: false,
                    barmode: 'group',
                };

                Plotly.newPlot('market_plot4', data_exc, layout4);

                var layout5 = {
                    title: "등외제외, " + titleText,
                    titlefont: {
                        family: 'Jeju Gothic, serif',
                        size: 20,
                        color: '#2c3e50'
                    },
                    showlegend: false,
                    barmode: 'group',
                };

                Plotly.newPlot('market_plot5', data_non, layout5);

                var layout6 = {
                    title: "모돈, " + titleText,
                    titlefont: {
                        family: 'Jeju Gothic, serif',
                        size: 20,
                        color: '#2c3e50'
                    },
                    showlegend: false,
                    barmode: 'group',
                };

                Plotly.newPlot('market_plot6', data_mom, layout6);

                var layout7 = {
                    title: "평균, " + titleText,
                    titlefont: {
                        family: 'Jeju Gothic, serif',
                        size: 20,
                        color: '#2c3e50'
                    },
                    showlegend: false,
                    barmode: 'group',
                };

                Plotly.newPlot('market_plot7', data_avg, layout7);

                window.onresize = function() {
                    Plotly.Plots.resize(gd);
                    Plotly.Plots.resize(gd2);
                    Plotly.Plots.resize(gd3);
                    Plotly.Plots.resize(gd4);
                    Plotly.Plots.resize(gd5);
                    Plotly.Plots.resize(gd6);
                    Plotly.Plots.resize(gd7);
                };
            }
        });
    }
    drawPlot();

    $('.category_div').change(function() {
        drawPlot();
    });

});
