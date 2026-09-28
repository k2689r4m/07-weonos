const axios = require('axios');
const convert = require('xml-js');
var exports = module.exports = {};
const requestIp = require('request-ip');
const db = require('./database/connect/config');
const multer = require("multer");
const fs = require("fs");
const coolsms = require('coolsms-node-sdk').default;
const messageService = new coolsms(process.env.COOL_SMS_KEY, process.env.COOL_SMS_SECRET);


exports.ATA_TYPE ={
    'MATCHING_N':process.env.COOL_SMS_LEASE_MATCHING_N,
    'LEASE_MATCHING_ONE':process.env.COOL_SMS_LEASE_MATCHING_ONE,
    'TOUR_APPLY':process.env.COOL_SMS_TOUR_APPLY,
    'LEASE_APPLY':process.env.COOL_SMS_LEASE_APPLY
}
exports.sendSMS = async function (toList) {
    const re = await messageService.sendMany(toList);
    return re;
},

exports.kakaoATA = function (toList_, type) {
    let toList = [];

    for(let i=0;i<toList_.length;i++){
        if('MATCHING_N' == type){
            toList.push({
                to: toList_[i].to,
                from: process.env.COOL_SMS_GEN,
                kakaoOptions: {
                    pfId: process.env.COOL_PFID_KAKAO_PFID,
                    templateId: exports.ATA_TYPE[type],
                    variables: {
                        "#{cnt}": toList_[i].cnt,
                        "#{name}": toList_[i].mem_name,
                        "#{phone}": toList_[i].mem_phone,
                    }
                }
            });
        }else if('TOUR_APPLY' == type){
            toList.push({
                to: toList_[i].to,
                from: process.env.COOL_SMS_GEN,
                kakaoOptions: {
                    pfId: process.env.COOL_PFID_KAKAO_PFID,
                    templateId: exports.ATA_TYPE[type],
                    variables: {
                        "#{date}": toList_[i].date,
                        "#{name}": toList_[i].mem_name,
                        "#{phone}": toList_[i].mem_phone,
                    }
                }
            });
        }else if('LEASE_APPLY' == type){
            toList.push({
                to: toList_[i].to,
                from: process.env.COOL_SMS_GEN,
                kakaoOptions: {
                    pfId: process.env.COOL_PFID_KAKAO_PFID,
                    templateId: exports.ATA_TYPE[type],
                    variables: {
                        "#{username}": toList_[i].username,
                    }
                }
            });
        }
    }
    
    messageService.sendMany(toList).then((res) => {}).catch((e)=>{console.log(e)});
},

exports.shortAdr = (addr) => {
    if (!addr) return '';

    const cityMap = {
        // 특별시 / 광역시
        '서울특별시': '서울',
        '서울시': '서울',
        '부산광역시': '부산',
        '대구광역시': '대구',
        '인천광역시': '인천',
        '광주광역시': '광주',
        '대전광역시': '대전',
        '울산광역시': '울산',
        '세종특별자치시': '세종',

        // 도
        '경기도': '경기',
        '강원도': '강원',
        '충청북도': '충북',
        '충청남도': '충남',
        '전라북도': '전북',
        '전라남도': '전남',
        '경상북도': '경북',
        '경상남도': '경남',
        '제주특별자치도': '제주'
    };

    let result = addr;

    // 시/도 축약
    Object.entries(cityMap).forEach(([full, short]) => {
        result = result.replace(full, short);
    });

    // ○○도 → ○○
    result = result.replace(/([가-힣]+)도/g, '$1');

    // 번지 제거
    result = result.replace(/번지/g, '');

    // 공백 정리
    result = result.replace(/\s+/g, ' ').trim();

    return result;
},

exports.groupBy = function (data, key) {
    return data.reduce(function (carry, el) {
        var group = el[key];

        if (carry[group] === undefined) {
            carry[group] = [];
        }

        carry[group].push(el);
        return carry;
    }, {});
},

exports.getPUNCode = async function(jibun_addr) {
    const re = await axios.get('http://api.vworld.kr/req/search?key='+process.env.VWORLD_KEY+'&request=search&type=address&category=parcel&query='+jibun_addr);

    console.log(re.data.response);

    if(!(re.data.response.status == "OK" && re.data.response.result?.items?.length)){
        return false;
    }
    
    return re.data.response.result.items[0].id
};

exports.getBrTitleInfo = async function(pnu) {
    // 용도별건물속성조회

    // let param = '?key=' + process.env.VWORLD_MAIN_KEY;
    // param += '&pnu=' + pnu;
    // param += '&domain=' + '210.180.118.175';
    // param += '&format=json';
    
    // // process.env.VWORLD_MAIN_KEY
    // const re = await axios.post('https://api.vworld.kr/ned/data/getBuildingUse' + param);

    // console.log(process.env.VWORLD_MAIN_KEY);
    // console.log(re.data);

    // let reData = {
    //     bcRat: 0,               //건폐율(%)
    //     vlRat: 0,               //용적률(%)
    //     platArea: 0,            //대지면적(㎡)
    //     archArea: 0,            //건축면적
    //     totArea: 0,             //연면적(㎡)	
    //     grndFlrCnt: 0,          //지상층수
    //     ugrndFlrCnt: 0,         //지하층수
    //     strctCd: 0,             //구조코드
    //     useAprDay: null,        //사용승인일        19911120
    //     mainPurpsCdNm: 0,       //주용도코드명
    //     rideUseElvtCnt: 0,      //승용승강기수
    //     emgenUseElvtCnt: 0,     //비상용승강기수
    //     indrMechUtcnt: 0,       //옥내기계식대수(대)
    //     oudrMechUtcnt: 0,       //옥외기계식대수(대)	
    //     indrAutoUtcnt: 0,       //옥내자주식대수(대)	
    //     oudrAutoUtcnt: 0,       //옥외자주식대수(대)	
    //     platPlc: '',            //대지위치 서울특별시 강남구 개포동 12번지
    //     newPlatPlc: '',         //도로명대지위치
    // };


    // if(re.data?.buildingUses?.field && re.data?.buildingUses?.field.length){
    //     const item = re.data.buildingUses.field[0];

        

    //     reData.bcRat = item.btlRt;                   //건폐율(%)
    //     reData.vlRat = item.measrmtRt;                   //용적률(%)
    //     reData.platArea = item.buldPlotAr;                //대지면적(㎡)
    //     reData.archArea = item.buldBildngAr;                //건축면적
    //     reData.totArea = item.buldTotar;                 //연면적(㎡)	
    //     reData.grndFlrCnt = item.groundFloorCo;              //지상층수
    //     reData.ugrndFlrCnt = item.undgrndFloorCo;             //지하층수
    //     reData.strctCd = item.strctCode;                 //구조코드
    //     reData.useAprDay = item.useConfmDe;               //사용승인일        19911120
    //     reData.mainPurpsCdNm = item.mainPrposCodeNm;           //주용도코드명
    //     reData.rideUseElvtCnt = 0;          //승용승강기수
    //     reData.emgenUseElvtCnt = 0;         //비상용승강기수
    //     reData.indrMechUtcnt = 0;           //옥내기계식대수(대)
    //     reData.oudrMechUtcnt = 0;           //옥외기계식대수(대)	
    //     reData.indrAutoUtcnt = 0;           //옥내자주식대수(대)	
    //     reData.oudrAutoUtcnt = 0;           //옥외자주식대수(대)	
    //     reData.platPlc = item.ldCodeNm + ' ' + item.mnnmSlno;                 //대지위치 서울특별시 강남구 개포동 12번지
    //     reData.newPlatPlc = '';              //도로명대지위치
    // }


    // return reData;

    // https://www.vworld.kr/dtna/dtna_apiSvcFc_s001.do?apiNum=6
    
    const sigunguCd = pnu.substr(0,5);
    const bjdongCd = pnu.substr(5,5);
    const bun = pnu.substr(11,4);
    const ji = pnu.substr(15,4);

    let param = '?serviceKey=' + process.env.BUILD_KEY;
    param += '&sigunguCd=' + sigunguCd;
    param += '&bjdongCd=' + bjdongCd;
    param += '&bun=' + bun;
    param += '&ji=' + ji;
    param += '&_type=json';
    param += '&pageNo=1';
    param += '&numOfRows=100';

    // console.log(param);


    let lcnt = 10;
    let reData = null;
    const url_old = 'http://apis.data.go.kr/1613000/BldRgstService_v2/getBrTitleInfo';
    const url_new = 'http://apis.data.go.kr/1613000/BldRgstHubService/getBrTitleInfo'

    do{
        await axios.get(url_old + param
        ).then((re)=>{
            if('response' in re.data){
                if(re.data.response.body.items){
                    // console.log('아이템 있음');
                    reData = re
                    lcnt = 0;
                }else{
                    // console.log('아이템 없음');
                    lcnt = 0;
                    reData = 'none';
                }
            }else{
                lcnt--;
            }
        }).catch((e)=>{
            if(e.message.includes('ETIMEDOUT')){
                // console.log('#######################')    
                // console.log('타임아웃');
                // console.log('#######################')
            }else{
                // console.log('------------------------')
                // console.log(e.message);
                // console.log('------------------------')
            }
            lcnt--;
        });
    }while(0 < lcnt);

    if(reData == 'none' || !reData){
        do{
            await axios.get(url_new + param
            ).then((re)=>{
                if('response' in re.data){
                    if(re.data.response.body.items){
                        // console.log('아이템 있음');
                        // console.log(re.data.response.body);
                        reData = re;
                        lcnt = 0;
                    }else{
                        // console.log('아이템 없음');
                        lcnt = 0;
                        reData = 'none';
                    }
                }else{
                    lcnt--;
                }
            }).catch((e)=>{
                if(e.message.includes('ETIMEDOUT')){
                    // console.log('#######################')    
                    // console.log('타임아웃');
                    // console.log('#######################')
                }else{
                    // console.log('------------------------')
                    // console.log(e.message);
                    // console.log('------------------------')
                }
                lcnt--;
            });
        }while(0 < lcnt);
    }


    if(reData == 'none'){
        return 'none';
    }
 


    if(reData.data.response?.header?.resultCode != "00"){
        // console.log(re.data.response.header.resultMsg);
        return false;
    }

    if(Array.isArray(reData.data.response.body.items.item)){
        return reData.data.response.body.items.item[0];
    }
    else if(reData.data.response.body.items == ''){
        return {
            bcRat: 0,               //건폐율(%)
            vlRat: 0,               //용적률(%)
            platArea: 0,            //대지면적(㎡)
            archArea: 0,            //건축면적
            totArea: 0,             //연면적(㎡)	
            grndFlrCnt: 0,          //지상층수
            ugrndFlrCnt: 0,         //지하층수
            strctCd: 0,             //구조코드
            useAprDay: null,        //사용승인일        19911120
            mainPurpsCdNm: 0,       //주용도코드명
            rideUseElvtCnt: 0,      //승용승강기수
            emgenUseElvtCnt: 0,     //비상용승강기수
            indrMechUtcnt: 0,       //옥내기계식대수(대)
            oudrMechUtcnt: 0,       //옥외기계식대수(대)	
            indrAutoUtcnt: 0,       //옥내자주식대수(대)	
            oudrAutoUtcnt: 0,       //옥외자주식대수(대)	
            platPlc: '',            //대지위치 서울특별시 강남구 개포동 12번지
            newPlatPlc: '',         //도로명대지위치
        };
    }
    else{
        return reData.data.response.body.items.item;
    }
};


exports.getBrFlrOulnInfo = async function(pnu) {
    console.log('~~~~~~~');
    const sigunguCd = pnu.substr(0,5);
    const bjdongCd = pnu.substr(5,5);
    const bun = pnu.substr(11,4);
    const ji = pnu.substr(15,4);

    let param = '?serviceKey=' + process.env.BUILD_KEY;
    param += '&sigunguCd=' + sigunguCd;
    param += '&bjdongCd=' + bjdongCd;
    param += '&bun=' + bun;
    param += '&ji=' + ji;
    param += '&_type=json';
    param += '&pageNo=1';
    param += '&numOfRows=100';

    let lcnt = 10;
    let reData = null;
    const url_new = 'http://apis.data.go.kr/1613000/BldRgstHubService/getBrFlrOulnInfo'
    const url_old = 'http://apis.data.go.kr/1613000/BldRgstService_v2/getBrFlrOulnInfo'
    // console.log(param.split('&'));
    do{
        await axios.get(url_old + param
        ).then((re)=>{
            if('response' in re.data){
                if(re.data.response.body.items){
                    // console.log('아이템 있음');
                    reData = re
                    lcnt = 0;
                }else{
                    // console.log('아이템 없음');
                    reData = 'none';
                    lcnt = 0;
                }
            }else{
                lcnt--;
            }
        }).catch((e)=>{
            if(e.message.includes('ETIMEDOUT')){
                // console.log('#######################')    
                // console.log('타임아웃');
                // console.log('#######################')
            }else{
                // console.log('------------------------')
                // console.log(e.message);
                // console.log('------------------------')
            }
            lcnt--;
        });
    }while(0 < lcnt);

    if(reData == 'none' || !reData){
        do{
            await axios.get(url_new + param
            ).then((re)=>{
                if('response' in re.data){
                    if(re.data.response.body.items){
                        // console.log('아이템 있음');
                        reData = re
                        lcnt = 0;
                    }else{
                        // console.log('아이템 없음');
                        reData = 'none';
                        lcnt = 0;
                    }
                }else{
                    lcnt--;
                }
            }).catch((e)=>{
                if(e.message.includes('ETIMEDOUT')){
                    // console.log('#######################')    
                    // console.log('타임아웃');
                    // console.log('#######################')
                }else{
                    // console.log('------------------------')
                    // console.log(e.message);
                    // console.log('------------------------')
                }
                lcnt--;
            });
        }while(0 < lcnt);
    }

    // console.log(reData.data.response.body.items);
    // '?serviceKey=bATkSSZWDK0oCa3GvtFMlPSEwnXOCuTt4OJdT5%2FwBBQeC27JlZ%2BEpq4SFF%2Fwq48vAaG5ICEsu6YQKAi%2FY%2B2aJg%3D%3D',
    // 'sigunguCd=11680',
    // 'bjdongCd=10800',
    // 'bun=0101',
    // 'ji=0020',
    // '_type=json',
    // 'numOfRows=10'


    if(reData == 'none'){
        return 'none';
    }


    if(reData.data.response.header.resultCode != "00"){
        // console.log(re.data.response.header.resultMsg);
        return false;
    }

    if(reData.data.response.body.items == ''){
        return [];
    }
    else{
        return reData.data.response.body.items.item;
    }
};


exports.getIndvdLandPriceAttr = async function(pnu) {
    let param = '?key=' + process.env.VWORLD_MAIN_KEY;
    param += '&pnu=' + pnu;
    param += '&domain=' + '210.180.118.175';
    param += '&format=json';
    param += '&numOfRows=1000';
    
    // process.env.VWORLD_MAIN_KEY
    const re = await axios.get('https://api.vworld.kr/ned/data/getIndvdLandPriceAttr' + param);

    if(re.data?.indvdLandPrices?.field && re.data?.indvdLandPrices?.field.length){
        const reData = re.data.indvdLandPrices.field.reverse()[0];

        let result = {
            stdrYear: reData.pblntfDe,
            pblntfPclnd: reData.item,
            m2_price: reData.item,
            py_price: reData.item,
        };

        result.stdrYear = reData.stdrYear;
        result.pblntfPclnd = reData.pblntfPclnd;;
        result.m2_price = (reData.pblntfPclnd / 10000).toFixed(0);
        result.py_price = (result.m2_price * 3.3058).toFixed(0);

        return result;
    }else{
        return false;
    }

    

    // let param = '?ServiceKey=' + process.env.BUILD_KEY;
    // param += '&pnu=' + pnu;
    // param += '&format=json';
    // param += '&numOfRows=1000';
    // param += '&pageNo=1';

    // const headers = {
    //     'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    //     'Accept': '*/*',
    //     'Host': '127.0.0.1:3000'
    // }
    
    // const re = await axios.get('http://apis.data.go.kr/1611000/nsdi/IndvdLandPriceService/attr/getIndvdLandPriceAttr' + param, {headers});

    // if(re.status != 200 || !re.data.indvdLandPrices?.field?.length){
    //     return false;
    // }

    // const reData = re.data.indvdLandPrices.field.reverse()[0];

    // let result = {};

    // result.stdrYear = reData.stdrYear;
    // result.pblntfPclnd = reData.pblntfPclnd;;
    // result.m2_price = (reData.pblntfPclnd / 10000).toFixed(0);
    // result.py_price = (result.m2_price * 3.3058).toFixed(0);

    // return result;
};


exports.getLandUseAttr = async function(pnu) {
    let param = '?key=' + process.env.VWORLD_MAIN_KEY;
    param += '&pnu=' + pnu;
    param += '&domain=' + '210.180.118.175';
    param += '&format=json';
    param += '&numOfRows=1000';
    
    const re = await axios.get('https://api.vworld.kr/ned/data/getLandUseAttr' + param);

    if(re.data?.landUses?.field && re.data?.landUses?.field.length){
        const reData = re.data.landUses.field;

        return reData;
    }else{
        return false;
    }


    // let param = '?ServiceKey=' + process.env.BUILD_KEY;
    // param += '&pnu=' + pnu;
    // param += '&format=json';
    // param += '&numOfRows=1000';
    // param += '&pageNo=1';

    // const headers = {
    //     'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    //     'Accept': '*/*',
    //     'Host': '127.0.0.1:3000'
    // }
    
    // const re = await axios.get('http://apis.data.go.kr/1611000/nsdi/LandUseService/attr/getLandUseAttr' + param, {headers});

    // if(re.status != 200){
    //     return false;
    // }

    // return re.data.landUses.field;
};


exports.getLadfrlList = async function(pnu) {
    let param = '?key=' + process.env.VWORLD_MAIN_KEY;
    param += '&pnu=' + pnu;
    param += '&domain=' + '210.180.118.175';
    param += '&format=json';
    param += '&numOfRows=1000';
    
    const re = await axios.get('https://api.vworld.kr/ned/data/ladfrlList' + param);

    if(re.data?.ladfrlVOList?.ladfrlVOList && re.data?.ladfrlVOList?.ladfrlVOList.length){
        const reData = re.data.ladfrlVOList.ladfrlVOList[0];

        return reData;
    }else{
        return false;
    }

    // let param = '?ServiceKey=' + process.env.BUILD_KEY;
    // param += '&pnu=' + pnu;
    // param += '&format=json';
    // param += '&numOfRows=1000';
    // param += '&pageNo=1';

    // const headers = {
    //     'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    //     'Accept': '*/*',
    //     'Host': '127.0.0.1:3000'
    // }
    
    // const re = await axios.get('http://apis.data.go.kr/1611000/nsdi/eios/LadfrlService/ladfrlList.xml' + param, {headers});

    // if(re.status != 200){
    //     return false;
    // }
    // const xmlData = convert.xml2json(re.data, {compact: true});
    // const jsonData = JSON.parse(xmlData).fields.ladfrlVOList;
    // let reData = {};

    // for(let key in jsonData){
    //     const value = jsonData[key];
    //     reData[key] = value._text;
    // }

    // return reData;
};


exports.getAPIBuildingData = async function(pnu) {
    try{
        //표제부 데이터가 없을수도
        // console.log('표제부');
        const brTitleInfo = await exports.getBrTitleInfo(pnu);
        if(brTitleInfo == 'none' || !brTitleInfo){
            console.log("표제부 없음");
        }
        else if(brTitleInfo){
            console.log("표제부 있음");
        }

        //층별 데이터가 없을수도
        // console.log('층별');
        const brFlrOulnInfo = await exports.getBrFlrOulnInfo(pnu);
        if(brFlrOulnInfo == 'none' || !brFlrOulnInfo){
            console.log("없음2");
        }
        else if(brFlrOulnInfo){
            console.log("층별 있음");
        }

        //공시 데이터
        // console.log('공시');
        const indvdLandPriceAttr = await exports.getIndvdLandPriceAttr(pnu);
        if(indvdLandPriceAttr){
            console.log("공시 있음");
        }
        
        // 토지이용계획 데이터
        // https://www.data.go.kr/bbs/ntc/selectNotice.do?pageIndex=1&originId=NOTICE_0000000003431&atchFileId=FILE_000000002862949&nttApiYn=Y&searchCondition2=2&searchKeyword1=
        // 폐기 2024.01.02
        const landUseAttr = await exports.getLandUseAttr(pnu);
        if(landUseAttr){
            console.log("토지이용 있음");
        }

        // 토지임야정보 데이터
        // console.log('토지임야정보');
        const ladfrlList = await exports.getLadfrlList(pnu);
        if(ladfrlList){
            console.log("토지임야 있음");
        }

        return {brTitleInfo, brFlrOulnInfo, indvdLandPriceAttr, landUseAttr, ladfrlList};
    }catch(e){
        console.log(pnu+'   -------+++:'+e);
        return {brTitleInfo:null, brFlrOulnInfo:null, indvdLandPriceAttr:null, landUseAttr:null, ladfrlList:null}
    }
};


exports.getAPIBuildingLinkData = async function(pnu) {
    console.log('연결주소등록:: ' + pnu);
    try{
        //공시 데이터
        // console.log('공시');
        const indvdLandPriceAttr = await exports.getIndvdLandPriceAttr(pnu);
        if(indvdLandPriceAttr){
            console.log("공시 있음");
        }

        //토지이용계획 데이터
        // console.log('토지이용계획');
        const landUseAttr = await exports.getLandUseAttr(pnu);
        if(landUseAttr){
            console.log("토지이용 있음");
        }

        //토지임야정보 데이터
        // console.log('토지임야정보');
        const ladfrlList = await exports.getLadfrlList(pnu);
        if(ladfrlList){
            console.log("토지임야 있음");
        }

        return {indvdLandPriceAttr, landUseAttr, ladfrlList};
    }catch(e){
        console.log(pnu+'  getAPIBuildingLinkData ERROR -------+++:'+e);
        return {indvdLandPriceAttr:null, landUseAttr:null, ladfrlList:null}
    }
};

exports.APIBuildingUpdate = async function(userId, building_uid){
    sql =  `CALL SP_BUILDING_PNU(?)`;
    const pnu = (await exports.DBOneCall(sql,[building_uid]))?.pnu_code;
    if(!pnu){
        console.log("APIBuildingUpdate :::: 해당 id를 찾을수 없음");
        return;
    }

    let {brTitleInfo, brFlrOulnInfo, indvdLandPriceAttr, landUseAttr, ladfrlList} = await exports.getAPIBuildingData(pnu);

	////////////////////////////////////////////////////////////////////////////////////
	//////		1.표제부
	////////////////////////////////////////////////////////////////////////////////////
	if(!(brTitleInfo && brFlrOulnInfo && indvdLandPriceAttr && landUseAttr && ladfrlList)){
        // console.log(brTitleInfo);
        // console.log(brFlrOulnInfo);

		console.log('!!!');
		return false;
	}

    if(brTitleInfo == 'none'){
        return '01';
    }

	let bl_ratio = brTitleInfo.bcRat;	//건폐율(%)
	let bl_ratio_edit = 'N';
	let fa_ratio = brTitleInfo.vlRat;	//용적율(%)
	let fa_ratio_edit = 'N';
	if (bl_ratio == 0){ bl_ratio_edit = 'Y';}
	if (fa_ratio == 0){ fa_ratio_edit = 'Y';}
	let land_size_m2 = brTitleInfo.platArea;                            //  대지면적(m2)
	let land_size_p = exports.m2ToPy(land_size_m2);
	let build_size_m2 = brTitleInfo.archArea;                            //  건축면적(m2)
	let build_size_p = exports.m2ToPy(build_size_m2);   					//  건축면적(py)
	let total_size_m2 = brTitleInfo.totArea;                             //  연면적(m2)
	let total_size_p = exports.m2ToPy(total_size_m2);    					//  연면적(평)
	let floor_cnt_F = brTitleInfo.grndFlrCnt;                          //  지상층수
	let floor_cnt_B = brTitleInfo.ugrndFlrCnt;                         //  지하층수
	let structure_uid = 0;
	let structure_code = brTitleInfo.strctCd;
	
	sql =  `CALL SP_STRUCTURE_GET(?)`;
	const reDataStucture = await exports.DBOneCall(sql,[structure_code]);

    structure_uid = reDataStucture ? reDataStucture.ind_cfg_uid : null;

    // console.log(brTitleInfo.useAprDay);
    // console.log(brTitleInfo.useAprDay);
    // console.log(brTitleInfo.useAprDay);
    // console.log(brTitleInfo.useAprDay);
    // console.log(brTitleInfo.useAprDay);

	let build_date = brTitleInfo.useAprDay;                           //  사용승인일 -> 준공일자
	let jibun_addr = brTitleInfo.platPlc.trim();
	let road_addr = brTitleInfo.newPlatPlc.trim();
	let main_purpose = brTitleInfo.mainPurpsCdNm;                       //  주용도코드명
	let ride_ev_cnt = brTitleInfo.rideUseElvtCnt;                      //  승용승강기수
	let emgen_ev_cnt = brTitleInfo.emgenUseElvtCnt;                     //  비상용승강기수
	let park_mech_cnt = 0;    //  기계식 합계
	let park_auto_cnt = 0;    //  자주식 합계
	let sum_park_cnt = 0;    //  주차장 카운트 합계 - 법정과 실제에 동시에 입력
	let indr_mech_ut_cnt   = brTitleInfo.indrMechUtcnt;               //  옥내기계식대수(대)
	let oudr_mech_ut_cnt   = brTitleInfo.oudrMechUtcnt;               //  옥외기계식대수(대)
	park_mech_cnt      = indr_mech_ut_cnt + oudr_mech_ut_cnt;
	let indr_auto_ut_cnt   = brTitleInfo.indrAutoUtcnt;               //  옥내자주식대수(대)
	let oudr_auto_ut_cnt   = brTitleInfo.oudrAutoUtcnt;               //  옥외자주식대수(대)
	park_auto_cnt      = indr_auto_ut_cnt + oudr_auto_ut_cnt;
	sum_park_cnt       = park_mech_cnt + park_auto_cnt;
	let park_type_uid = 0;
	if(park_mech_cnt > 0 && park_auto_cnt > 0) {
		park_type_uid = 170;
	} 
    // else if(park_mech_cnt > 0 && park_auto_cnt == 0) {
	// 	park_type_uid = 172;
	// } else if(park_mech_cnt == 0 && park_auto_cnt > 0) {
	// 	park_type_uid = 171;
	// }

    if(!park_type_uid){
        park_type_uid = null;
    }



	////////////////////////////////////////////////////////////////////////////////////
	//////		2.공시지가
	////////////////////////////////////////////////////////////////////////////////////

	let public_land_price = (indvdLandPriceAttr.m2_price*land_size_m2).toFixed(0);

	sql =  `CALL SP_BUILDING_UPDATE(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    let _build_date = null;
    if(build_date && build_date.toString().length == 8){
        _build_date = build_date;
    }

	const reDataBuildingUpdate = await exports.DBCall(sql,[
		building_uid,
		public_land_price,
		indvdLandPriceAttr.m2_price,
		indvdLandPriceAttr.py_price,
		bl_ratio,
		bl_ratio_edit,
		fa_ratio,
		fa_ratio_edit,
		land_size_m2,
		land_size_p,
		build_size_m2,
		build_size_p,
		total_size_m2,
		total_size_p,
		floor_cnt_F,
		floor_cnt_B,
		structure_uid,
		build_date,
		main_purpose,
		ride_ev_cnt + emgen_ev_cnt,
		ride_ev_cnt,
		emgen_ev_cnt,
		indr_mech_ut_cnt,
		oudr_mech_ut_cnt,
		indr_auto_ut_cnt,
		oudr_auto_ut_cnt,
		sum_park_cnt,
		park_type_uid,
	]);

	////////////////////////////////////////////////////////////////////////////////////
	//////		3.층별정보
	////////////////////////////////////////////////////////////////////////////////////

	//이전 층별 데이터 삭제
	sql =  `CALL SP_BUILDING_FLOOR_DELETE(?)`;
	const reDataFloorDel = await exports.DBCall(sql,[building_uid]);

	//새로운 층별 데이터 추가
	sql =  `CALL SP_BUILDING_FLOOR_CREATE(?,?,?,?,?,?,?,?,?,?,?,?,?)`;
	for(let i=0;i<brFlrOulnInfo.length;i++){
		const reDataFloor = await exports.DBCall(sql,[
			userId,
			building_uid,
			brFlrOulnInfo[i].flrGbCd,
			brFlrOulnInfo[i].flrGbCdNm,
			brFlrOulnInfo[i].flrNo,
			brFlrOulnInfo[i].flrNoNm,
			brFlrOulnInfo[i].strctCd,
			brFlrOulnInfo[i].strctCdNm,
			brFlrOulnInfo[i].area,
			brFlrOulnInfo[i].areaExctYn == 1 ? 1 : 0,
			brFlrOulnInfo[i].mainPurpsCd,
			brFlrOulnInfo[i].mainPurpsCdNm,
			brFlrOulnInfo[i].etcPurps,
		]);
	}

	////////////////////////////////////////////////////////////////////////////////////
	//////		4.토지정보
	////////////////////////////////////////////////////////////////////////////////////

	let use_area_uid = '';
	let use_area_code = '';
	let use_area_code_name = '';
	let district_code_list = '';
	let district_code_name = '';

	let first = {
		UQA: "",
		UQB: "",
		UQC: "",
		UQD: "",
	};

	for(let i=0;i<landUseAttr.length;i++){
		const code_head = landUseAttr[i].prposAreaDstrcCode.substr(0,3);
		if(code_head == 'UQG' || code_head == 'UQQ'){
			if(!district_code_list.length){
				district_code_list = landUseAttr[i].prposAreaDstrcCode;
				district_code_name = landUseAttr[i].prposAreaDstrcCodeNm;
			}
			else{
				district_code_list += ',' + landUseAttr[i].prposAreaDstrcCode;
				district_code_name += ',' + landUseAttr[i].prposAreaDstrcCodeNm;
			}
		}

		if(landUseAttr[i].cnflcAt == 1){
			if(code_head == 'UQA' || code_head == 'UQB' || code_head == 'UQC' || code_head == 'UQD') {
				if(landUseAttr[i].prposAreaDstrcCode != 'UQA01X'){
					if(first[code_head] == ""){
						first[code_head] = landUseAttr[i].prposAreaDstrcCode;
					}
				}
			}
		}
	}

  
   

	let target_code = "";
	for(let prop in first){
		if(first[prop] != ""){
			target_code = first[prop];
			break;
		}
	}

    
    

	sql =  `CALL SP_USE_AREA_GET(?)`;
	const reDataArea = await exports.DBOneCall(sql,[
		target_code
	]);

    if(!reDataArea){
        console.log("------------------------");
        console.log("DB에 용도지역이 존재 하지 않음");
        console.log(first);
        console.log(target_code);
        console.log(reDataArea);
        console.log("------------------------");

        use_area_uid = null;
        use_area_code = null;
        use_area_code_name = null;
    }
    else{
        use_area_uid = reDataArea.ind_cfg_uid;
        use_area_code = reDataArea.cfg_val2;
        use_area_code_name = reDataArea.cfg_val1;
    }

	////////////////////////////////////////////////////////////////////////////////////
	//////		5.토지임야정보
	////////////////////////////////////////////////////////////////////////////////////

	let jibun = null;
	let gmok_uid = null;
	let size_m2 = null;
	let size_p = null;

	jibun = ladfrlList.mnnmSlno;

	sql =  `CALL SP_GMOK_GET(?)`;
	const reDataGmok = await exports.DBOneCall(sql,[ladfrlList.lndcgrCode]);
    gmok_uid = reDataGmok.ind_cfg_uid;


	size_m2 = ladfrlList.lndpclAr;
	size_p = exports.m2ToPy(ladfrlList.lndpclAr);

    sql =  `CALL SP_BUILDING_LAND_CREATE(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    await exports.DBCall(sql,[
        userId,
        building_uid,   
        road_addr,
        jibun_addr,
        jibun,
        gmok_uid,
        size_p,
        size_m2,
        indvdLandPriceAttr.stdrYear,
        indvdLandPriceAttr.m2_price,
        indvdLandPriceAttr.py_price,
        use_area_uid,
        use_area_code,
        use_area_code_name,
        district_code_list,
        district_code_name,
        pnu,
        pnu[10]
    ]);

    sql =  `CALL SP_BUILDING_UPDATE2(?,?,?,?,?)`;
    await exports.DBCall(sql,[
        userId,
        building_uid,   
        gmok_uid,
        use_area_uid,
        use_area_code_name
    ]);

    await exports.setPublicLandPriceInfo(building_uid);
    await exports.calcBlFaRate(building_uid);

	return true;
};

exports.APIBuildinCreatLink = async function(userId, building_uid, pnu, reAdr){
    let {indvdLandPriceAttr, landUseAttr, ladfrlList} = await exports.getAPIBuildingLinkData(pnu);
	
    if(!(indvdLandPriceAttr && landUseAttr && ladfrlList)){
		console.log('!!!');
		return false;
	}

	const reDataGmok = await exports.DBOneCall(`CALL SP_GMOK_GET(?)`,[ladfrlList.lndcgrCode]);

    let use_area_uid = '';
	let use_area_code = '';
	let use_area_code_name = '';
	let district_code_list = '';
	let district_code_name = '';

	let first = {
		UQA: "",
		UQB: "",
		UQC: "",
		UQD: "",
	};

	for(let i=0;i<landUseAttr.length;i++){
		const code_head = landUseAttr[i].prposAreaDstrcCode.substr(0,3);

		if(code_head == 'UQG' || code_head == 'UQQ'){
			if(!district_code_list.length){
				district_code_list = landUseAttr[i].prposAreaDstrcCode;
				district_code_name = landUseAttr[i].prposAreaDstrcCodeNm;
			}
			else{
				district_code_list += ',' + landUseAttr[i].prposAreaDstrcCode;
				district_code_name += ',' + landUseAttr[i].prposAreaDstrcCodeNm;
			}
		}

		if(landUseAttr[i].cnflcAt == 1){
			if(code_head == 'UQA' || code_head == 'UQB' || code_head == 'UQC' || code_head == 'UQD') {
				if(landUseAttr[i].prposAreaDstrcCode != 'UQA01X'){
					if(first[code_head] == ""){
						first[code_head] = landUseAttr[i].prposAreaDstrcCode;
					}
				}
			}
		}
	}

	let target_code = "";
	for(let prop in first){
		if(first[prop] != ""){
			target_code = first[prop];
			break;
		}
	}

	const reDataArea = await exports.DBOneCall(`CALL SP_USE_AREA_GET(?)`,[
		target_code
	]);


    if(!reDataArea){
        use_area_uid = null;
        use_area_code = null;
        use_area_code_name = null;
    }
    else{
        use_area_uid = reDataArea.ind_cfg_uid;
        use_area_code = reDataArea.cfg_val2;
        use_area_code_name = reDataArea.cfg_val1;
    }


    let jibun_addr = reAdr.jibun;
	let road_addr = reAdr.road;
    let jibun = ladfrlList.mnnmSlno;
    let gmok_uid = reDataGmok.ind_cfg_uid;
    let size_m2 = ladfrlList.lndpclAr;
	let size_p = exports.m2ToPy(ladfrlList.lndpclAr);

    await exports.DBCall(`CALL SP_BUILDING_LAND_CREATE_LINK(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
        userId,
        building_uid,   
        road_addr,
        jibun_addr,
        jibun,
        gmok_uid,
        size_p,
        size_m2,
        indvdLandPriceAttr.stdrYear,
        indvdLandPriceAttr.m2_price,
        indvdLandPriceAttr.py_price,
        use_area_uid,
        use_area_code,
        use_area_code_name,
        district_code_list,
        district_code_name,
        pnu,
        pnu[10]
    ]);

    await exports.setPublicLandPriceInfo(building_uid);
    await exports.calcBlFaRate(building_uid);
}
exports.APIRentBuildinCreatLink = async function(userId, building_uid, pnu, reAdr){
    let {indvdLandPriceAttr, landUseAttr, ladfrlList} = await exports.getAPIBuildingLinkData(pnu);
	
    if(!(indvdLandPriceAttr && landUseAttr && ladfrlList)){
		console.log('!!!');
		return false;
	}

	const reDataGmok = await exports.DBOneCall(`CALL SP_GMOK_GET(?)`,[ladfrlList.lndcgrCode]);

    let use_area_uid = '';
	let use_area_code = '';
	let use_area_code_name = '';
	let district_code_list = '';
	let district_code_name = '';

	let first = {
		UQA: "",
		UQB: "",
		UQC: "",
		UQD: "",
	};

	for(let i=0;i<landUseAttr.length;i++){
		const code_head = landUseAttr[i].prposAreaDstrcCode.substr(0,3);

		if(code_head == 'UQG' || code_head == 'UQQ'){
			if(!district_code_list.length){
				district_code_list = landUseAttr[i].prposAreaDstrcCode;
				district_code_name = landUseAttr[i].prposAreaDstrcCodeNm;
			}
			else{
				district_code_list += ',' + landUseAttr[i].prposAreaDstrcCode;
				district_code_name += ',' + landUseAttr[i].prposAreaDstrcCodeNm;
			}
		}

		if(landUseAttr[i].cnflcAt == 1){
			if(code_head == 'UQA' || code_head == 'UQB' || code_head == 'UQC' || code_head == 'UQD') {
				if(landUseAttr[i].prposAreaDstrcCode != 'UQA01X'){
					if(first[code_head] == ""){
						first[code_head] = landUseAttr[i].prposAreaDstrcCode;
					}
				}
			}
		}
	}

	let target_code = "";
	for(let prop in first){
		if(first[prop] != ""){
			target_code = first[prop];
			break;
		}
	}

	const reDataArea = await exports.DBOneCall(`CALL SP_USE_AREA_GET(?)`,[
		target_code
	]);


    if(!reDataArea){
        use_area_uid = null;
        use_area_code = null;
        use_area_code_name = null;
    }
    else{
        use_area_uid = reDataArea.ind_cfg_uid;
        use_area_code = reDataArea.cfg_val2;
        use_area_code_name = reDataArea.cfg_val1;
    }


    let jibun_addr = reAdr.jibun;
	let road_addr = reAdr.road;
    let jibun = ladfrlList.mnnmSlno;
    let gmok_uid = reDataGmok.ind_cfg_uid;
    let size_m2 = ladfrlList.lndpclAr;
	let size_p = exports.m2ToPy(ladfrlList.lndpclAr);

    await exports.DBCall(`CALL SP_R_BUILDING_LAND_CREATE_LINK(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
        userId,
        building_uid,   
        road_addr,
        jibun_addr,
        jibun,
        gmok_uid,
        size_p,
        size_m2,
        indvdLandPriceAttr.stdrYear,
        indvdLandPriceAttr.m2_price,
        indvdLandPriceAttr.py_price,
        use_area_uid,
        use_area_code,
        use_area_code_name,
        district_code_list,
        district_code_name,
        pnu,
        pnu[10]
    ]);

    await exports.setRentPublicLandPriceInfo(building_uid);
    await exports.rentCalcBlFaRate(building_uid);
}

exports.setPublicLandPriceInfo = async function(building_uid){
    sql =  `CALL SP_BUILDING_LAND_PRICE(?)`;
	const reData = await exports.DBOneCall(sql,[building_uid]);
    
    const land_size_m2 = reData.sum_size_m2;
    const land_size_p = exports.m2ToPy(reData.sum_size_m2);
    const public_land_price = reData.sum_public_land_price;


    sql =  `CALL SP_BUILDING_LAND_YEAR(?)`;
	const reDataLandYear = await exports.DBCall(sql,[building_uid]);
    let yearList = [];
    let yearStrList = '';

    for(let i=0;i<reDataLandYear.length;i++){
        let st = false;

        for(let ii=0;ii<yearList.length;ii++){ 
            if(reDataLandYear[i].public_land_price_year == yearList[ii]){
                st = true;
                break;
            }
        }

        if(!st){
            yearList.push(reDataLandYear[i].public_land_price_year);
        }
    }
    

    for(let i=0;i<yearList.length;i++){
        if(i == 0){
            yearStrList = yearList[i];
        }
        else{
            yearStrList += ',' + yearList[i];
        }
    }

    let public_land_price_m2_price = 0;
    let public_land_price_py_price = 0;

    if(land_size_m2 > 0){
        public_land_price_m2_price = (public_land_price / land_size_m2).toFixed(0);
    }

    if(land_size_p > 0){
        public_land_price_py_price = (public_land_price / land_size_p).toFixed(0);
    }
    
    
    sql =  `CALL SP_BUILDING_PRICE(?)`;
    const land_price = (await exports.DBOneCall(sql,[building_uid]))?.land_price;
    let land_size_py_price = 0;

    
    if(land_size_p > 0){
        land_size_py_price = (land_price / land_size_p).toFixed(0);
    }

    sql =  `CALL SP_BUILDING_PRICE_UPDATE(?,?,?,?,?,?,?,?,?)`;
    await exports.DBCall(sql,[
        building_uid,
        reData.CNT,
        land_size_py_price,
        public_land_price,
        public_land_price_m2_price,
        public_land_price_py_price,
        yearStrList,
        land_size_m2,
        land_size_p
    ]);
};

exports.APIRentBuildingUpdate = async function(userId, building_uid){
    sql =  `CALL SP_R_BUILDING_PNU(?)`;
    const pnu = (await exports.DBOneCall(sql,[building_uid]))?.pnu_code;
    if(!pnu){
        console.log("APIRentBuildingUpdate :::: 해당 id를 찾을수 없음");
        return;
    }

    let {brTitleInfo, brFlrOulnInfo, indvdLandPriceAttr, landUseAttr, ladfrlList} = await exports.getAPIBuildingData(pnu);
    
	////////////////////////////////////////////////////////////////////////////////////
	//////		1.표제부
	////////////////////////////////////////////////////////////////////////////////////
	if(!(brTitleInfo && brFlrOulnInfo && indvdLandPriceAttr && landUseAttr && ladfrlList)){
		console.log('!!!');
		return false;
	}

    if(brTitleInfo == 'none'){
        return '01';
    }

	let bl_ratio = brTitleInfo.bcRat;	//건폐율(%)
	let bl_ratio_edit = 'N';
	let fa_ratio = brTitleInfo.vlRat;	//용적율(%)
	let fa_ratio_edit = 'N';
	if (bl_ratio == 0){ bl_ratio_edit = 'Y';}
	if (fa_ratio == 0){ fa_ratio_edit = 'Y';}
	let land_size_m2 = brTitleInfo.platArea;                            //  대지면적(m2)
	let land_size_p = exports.m2ToPy(land_size_m2);
	let build_size_m2 = brTitleInfo.archArea;                            //  건축면적(m2)
	let build_size_p = exports.m2ToPy(build_size_m2);   					//  건축면적(py)
	let total_size_m2 = brTitleInfo.totArea;                             //  연면적(m2)
	let total_size_p = exports.m2ToPy(total_size_m2);    					//  연면적(평)
	let floor_cnt_F = brTitleInfo.grndFlrCnt;                          //  지상층수
	let floor_cnt_B = brTitleInfo.ugrndFlrCnt;                         //  지하층수
	let structure_uid = 0;
	let structure_code = brTitleInfo.strctCd;
	
	sql =  `CALL SP_STRUCTURE_GET(?)`;
	const reDataStucture = await exports.DBOneCall(sql,[structure_code]);

    structure_uid = reDataStucture ? reDataStucture.ind_cfg_uid : null;

	let build_date = brTitleInfo.useAprDay;                           //  사용승인일 -> 준공일자
	let jibun_addr = brTitleInfo.platPlc.trim();
	let road_addr = brTitleInfo.newPlatPlc.trim();
	let main_purpose = brTitleInfo.mainPurpsCdNm;                       //  주용도코드명
	let ride_ev_cnt = brTitleInfo.rideUseElvtCnt;                      //  승용승강기수
	let emgen_ev_cnt = brTitleInfo.emgenUseElvtCnt;                     //  비상용승강기수
	let park_mech_cnt = 0;    //  기계식 합계
	let park_auto_cnt = 0;    //  자주식 합계
	let sum_park_cnt = 0;    //  주차장 카운트 합계 - 법정과 실제에 동시에 입력
	let indr_mech_ut_cnt   = brTitleInfo.indrMechUtcnt;               //  옥내기계식대수(대)
	let oudr_mech_ut_cnt   = brTitleInfo.oudrMechUtcnt;               //  옥외기계식대수(대)
	park_mech_cnt      = indr_mech_ut_cnt + oudr_mech_ut_cnt;
	let indr_auto_ut_cnt   = brTitleInfo.indrAutoUtcnt;               //  옥내자주식대수(대)
	let oudr_auto_ut_cnt   = brTitleInfo.oudrAutoUtcnt;               //  옥외자주식대수(대)
	park_auto_cnt      = indr_auto_ut_cnt + oudr_auto_ut_cnt;
	sum_park_cnt       = park_mech_cnt + park_auto_cnt;
	let park_type_uid = 0;
	if(park_mech_cnt > 0 && park_auto_cnt > 0) {
		park_type_uid = 170;
	} 
    // else if(park_mech_cnt > 0 && park_auto_cnt == 0) {
	// 	park_type_uid = 172;
	// } else if(park_mech_cnt == 0 && park_auto_cnt > 0) {
	// 	park_type_uid = 171;
	// }

    if(!park_type_uid){
        park_type_uid = null;
    }



	////////////////////////////////////////////////////////////////////////////////////
	//////		2.공시지가
	////////////////////////////////////////////////////////////////////////////////////

	let public_land_price = (indvdLandPriceAttr.m2_price*land_size_m2).toFixed(0);

    let _build_date = null;
    if(build_date && build_date.toString().length == 8){
        _build_date = build_date;
    }


	sql =  `CALL SP_R_BUILDING_UPDATE(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
	const reDataBuildingUpdate = await exports.DBCall(sql,[
		building_uid,
		public_land_price,
		indvdLandPriceAttr.m2_price,
		indvdLandPriceAttr.py_price,
		bl_ratio,
		bl_ratio_edit,
		fa_ratio,
		fa_ratio_edit,
		land_size_m2,
		land_size_p,
		build_size_m2,
		build_size_p,
		total_size_m2,
		total_size_p,
		floor_cnt_F,
		floor_cnt_B,
		structure_uid,
		_build_date,
		main_purpose,
		ride_ev_cnt + emgen_ev_cnt,
		ride_ev_cnt,
		emgen_ev_cnt,
		indr_mech_ut_cnt,
		oudr_mech_ut_cnt,
		indr_auto_ut_cnt,
		oudr_auto_ut_cnt,
		sum_park_cnt,
		park_type_uid,
	]);

	////////////////////////////////////////////////////////////////////////////////////
	//////		3.층별정보
	////////////////////////////////////////////////////////////////////////////////////

	//이전 층별 데이터 삭제
	sql =  `CALL SP_R_BUILDING_FLOOR_DELETE(?)`;
	const reDataFloorDel = await exports.DBCall(sql,[building_uid]);

	//새로운 층별 데이터 추가
	sql =  `CALL SP_R_BUILDING_FLOOR_CREATE(?,?,?,?,?,?,?,?,?,?,?,?,?)`;
	for(let i=0;i<brFlrOulnInfo.length;i++){
		const reDataFloor = await exports.DBCall(sql,[
			userId,
			building_uid,
			brFlrOulnInfo[i].flrGbCd,
			brFlrOulnInfo[i].flrGbCdNm,
			brFlrOulnInfo[i].flrNo,
			brFlrOulnInfo[i].flrNoNm,
			brFlrOulnInfo[i].strctCd,
			brFlrOulnInfo[i].strctCdNm,
			brFlrOulnInfo[i].area,
			brFlrOulnInfo[i].areaExctYn == 1 ? 1 : 0,
			brFlrOulnInfo[i].mainPurpsCd,
			brFlrOulnInfo[i].mainPurpsCdNm,
			brFlrOulnInfo[i].etcPurps,
		]);
	}

	////////////////////////////////////////////////////////////////////////////////////
	//////		4.토지정보
	////////////////////////////////////////////////////////////////////////////////////

	let use_area_uid = '';
	let use_area_code = '';
	let use_area_code_name = '';
	let district_code_list = '';
	let district_code_name = '';

	let first = {
		UQA: "",
		UQB: "",
		UQC: "",
		UQD: "",
	};

	for(let i=0;i<landUseAttr.length;i++){
		const code_head = landUseAttr[i].prposAreaDstrcCode.substr(0,3);

		if(code_head == 'UQG' || code_head == 'UQQ'){
			if(!district_code_list.length){
				district_code_list = landUseAttr[i].prposAreaDstrcCode;
				district_code_name = landUseAttr[i].prposAreaDstrcCodeNm;
			}
			else{
				district_code_list += ',' + landUseAttr[i].prposAreaDstrcCode;
				district_code_name += ',' + landUseAttr[i].prposAreaDstrcCodeNm;
			}
		}

		if(landUseAttr[i].cnflcAt == 1){
			if(code_head == 'UQA' || code_head == 'UQB' || code_head == 'UQC' || code_head == 'UQD') {
				if(landUseAttr[i].prposAreaDstrcCode != 'UQA01X'){
					if(first[code_head] == ""){
						first[code_head] = landUseAttr[i].prposAreaDstrcCode;
					}
				}
			}
		}
	}

   

	let target_code = "";
	for(let prop in first){
		if(first[prop] != ""){
			target_code = first[prop];
			break;
		}
	}

    
    

	sql =  `CALL SP_USE_AREA_GET(?)`;
	const reDataArea = await exports.DBOneCall(sql,[
		target_code
	]);

    

    if(!reDataArea){
        console.log("------------------------");
        console.log("DB에 용도지역이 존재 하지 않음");
        console.log(first);
        console.log(target_code);
        console.log(reDataArea);
        console.log("------------------------");

        use_area_uid = null;
        use_area_code = null;
        use_area_code_name = null;
    }
    else{
        use_area_uid = reDataArea.ind_cfg_uid;
        use_area_code = reDataArea.cfg_val2;
        use_area_code_name = reDataArea.cfg_val1;
    }

	////////////////////////////////////////////////////////////////////////////////////
	//////		5.토지임야정보
	////////////////////////////////////////////////////////////////////////////////////

	let jibun = null;
	let gmok_uid = null;
	let size_m2 = null;
	let size_p = null;

	jibun = ladfrlList.mnnmSlno;

	sql =  `CALL SP_GMOK_GET(?)`;
	const reDataGmok = await exports.DBOneCall(sql,[ladfrlList.lndcgrCode]);
    gmok_uid = reDataGmok.ind_cfg_uid;


	size_m2 = ladfrlList.lndpclAr;
	size_p = exports.m2ToPy(ladfrlList.lndpclAr);

    sql =  `CALL SP_R_BUILDING_LAND_CREATE(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    await exports.DBCall(sql,[
        userId,
        building_uid,   
        road_addr,
        jibun_addr,
        jibun,
        gmok_uid,
        size_p,
        size_m2,
        indvdLandPriceAttr.stdrYear,
        indvdLandPriceAttr.m2_price,
        indvdLandPriceAttr.py_price,
        use_area_uid,
        use_area_code,
        use_area_code_name,
        district_code_list,
        district_code_name,
        pnu,
        pnu[10]
    ]);

    sql =  `CALL SP_R_BUILDING_UPDATE2(?,?,?,?,?)`;
    await exports.DBCall(sql,[
        userId,
        building_uid,   
        gmok_uid,
        use_area_uid,
        use_area_code_name
    ]);

    await exports.setRentPublicLandPriceInfo(building_uid);
    await exports.rentCalcBlFaRate(building_uid);
    
	return true;
};

exports.setRentPublicLandPriceInfo = async function(building_uid){
    sql =  `CALL SP_R_BUILDING_LAND_PRICE(?)`;
	const reData = await exports.DBOneCall(sql,[building_uid]);
    
    const land_size_m2 = reData.sum_size_m2;
    const land_size_p = exports.m2ToPy(reData.sum_size_m2);
    const public_land_price = reData.sum_public_land_price;


    sql =  `CALL SP_R_BUILDING_LAND_YEAR(?)`;
	const reDataLandYear = await exports.DBCall(sql,[building_uid]);
    let yearList = [];
    let yearStrList = '';

    for(let i=0;i<reDataLandYear.length;i++){
        let st = false;

        for(let ii=0;ii<yearList.length;ii++){ 
            if(reDataLandYear[i].public_land_price_year == yearList[ii]){
                st = true;
                break;
            }
        }

        if(!st){
            yearList.push(reDataLandYear[i].public_land_price_year);
        }
    }
    

    for(let i=0;i<yearList.length;i++){
        if(i == 0){
            yearStrList = yearList[i];
        }
        else{
            yearStrList += ',' + yearList[i];
        }
    }

    let public_land_price_m2_price = 0;
    let public_land_price_py_price = 0;

    if(land_size_m2 > 0){
        public_land_price_m2_price = (public_land_price / land_size_m2).toFixed(0);
    }

    if(land_size_p > 0){
        public_land_price_py_price = (public_land_price / land_size_p).toFixed(0);
    }
    
    
    sql =  `CALL SP_R_BUILDING_PRICE(?)`;
    const land_price = (await exports.DBOneCall(sql,[building_uid]))?.land_price;
    let land_size_py_price = 0;

    
    if(land_size_p > 0){
        land_size_py_price = (land_price / land_size_p).toFixed(0);
    }

    sql =  `CALL SP_R_BUILDING_PRICE_UPDATE(?,?,?,?,?,?,?,?,?)`;
    await exports.DBCall(sql,[
        building_uid,
        reData.CNT,
        land_size_py_price,
        public_land_price,
        public_land_price_m2_price,
        public_land_price_py_price,
        yearStrList,
        land_size_m2,
        land_size_p
    ]);
};

exports.calcBlFaRate = async function(building_uid){
    const building = await exports.DBOneCall(`CALL SP_BUILDING_INFO(?)`,[building_uid]);
    const building_floor = await exports.DBCall(`CALL SP_DETAIL_ITEM_FLOOR(?)`,[building_uid]);
    const floor = await exports.DBCall(`CALL SP_DETAIL_ITEM_FLOOR_GROUP(?)`,[building_uid]);

    let sum_bl_area_m2 = {};
    let sum_fa_area_m2 = {};

    for(let i=0;i<building_floor.length;i++){
        sum_bl_area_m2[building_floor[i].flrGbCd] ={};
        sum_fa_area_m2[building_floor[i].flrGbCd] ={};
    }
    for(let i=0;i<building_floor.length;i++){
        sum_bl_area_m2[building_floor[i].flrGbCd][building_floor[i].flrNo] = 0;
        sum_fa_area_m2[building_floor[i].flrGbCd][building_floor[i].flrNo] = 0;
    }

    for(let i=0;i<building_floor.length;i++){
        if(building_floor[i].flrGbCd == '10'){continue;}

        // console.log(building_floor[i].area_m2);
        // console.log(building_floor[i].area_py); 


        if(building_floor[i].chk_except != 'Y'){
            // sum_bl_area_m2[building_floor[i].flrGbCd] = {};
            sum_bl_area_m2[building_floor[i].flrGbCd][building_floor[i].flrNo] += building_floor[i].area;
        }
       
        if(building_floor[i].chk_except != 'Y' && building_floor[i].etcPurps.indexOf('주차장') == -1){
            // sum_fa_area_m2[building_floor[i].flrGbCd] = {};
            sum_fa_area_m2[building_floor[i].flrGbCd][building_floor[i].flrNo] += building_floor[i].area;
        }
    }

    // let A_floor_data = {};
    // let A_floor_data_cnt = 0;
    let max_bl_area_m2 = 0;
    let tot_fa_area_m2 = 0;

    for(let i=0;i<floor.length;i++){
        if(floor[i].flrGbCd == '10'){continue;}

        if(sum_bl_area_m2[floor[i].flrGbCd][floor[i].flrNo] > max_bl_area_m2){
            max_bl_area_m2 = sum_bl_area_m2[floor[i].flrGbCd][floor[i].flrNo];
        }

        tot_fa_area_m2 += sum_fa_area_m2[floor[i].flrGbCd][floor[i].flrNo];

        // if(!A_floor_data[A_floor_data_cnt]){
        //     A_floor_data[A_floor_data_cnt] = {};
        // }

        // A_floor_data[A_floor_data_cnt]['flrNoNm'] = 
        //     exports.flrGbCd[floor[i].flrGbCd]+floor[i].flrNo + '층';
        // A_floor_data_cnt++
    }

    let bl_ratio = 0; 
    let fa_ratio = 0;

    if(building.land_size_m2 > 0){
        bl_ratio = (max_bl_area_m2 / building.land_size_m2 * 100).toFixed(2);
        fa_ratio = (tot_fa_area_m2 / building.land_size_m2 * 100).toFixed(2);
    }

    await exports.DBCall(`CALL SP_BULDING_RATE_UPDATE(?,?,?)`,[building_uid, bl_ratio, fa_ratio]);

    return true;
}

exports.rentCalcBlFaRate = async function(building_uid){
    const building = await exports.DBOneCall(`CALL SP_R_BUILDING_INFO(?)`,[building_uid]);
    const building_floor = await exports.DBCall(`CALL SP_R_DETAIL_ITEM_FLOOR(?)`,[building_uid]);
    const floor = await exports.DBCall(`CALL SP_R_DETAIL_ITEM_FLOOR_GROUP(?)`,[building_uid]);

    let sum_bl_area_m2 = {};
    let sum_fa_area_m2 = {};

    for(let i=0;i<building_floor.length;i++){
        sum_bl_area_m2[building_floor[i].flrGbCd] ={};
        sum_fa_area_m2[building_floor[i].flrGbCd] ={};
    }
    for(let i=0;i<building_floor.length;i++){
        sum_bl_area_m2[building_floor[i].flrGbCd][building_floor[i].flrNo] = 0;
        sum_fa_area_m2[building_floor[i].flrGbCd][building_floor[i].flrNo] = 0;
    }

    for(let i=0;i<building_floor.length;i++){
        if(building_floor[i].flrGbCd == '10'){continue;}

        // console.log(building_floor[i].area_m2);
        // console.log(building_floor[i].area_py); 


        if(building_floor[i].chk_except != 'Y'){
            // sum_bl_area_m2[building_floor[i].flrGbCd] = {};
            sum_bl_area_m2[building_floor[i].flrGbCd][building_floor[i].flrNo] += building_floor[i].area;
        }
       
        if(building_floor[i].chk_except != 'Y' && building_floor[i].etcPurps.indexOf('주차장') == -1){
            // sum_fa_area_m2[building_floor[i].flrGbCd] = {};
            sum_fa_area_m2[building_floor[i].flrGbCd][building_floor[i].flrNo] += building_floor[i].area;
        }
    }

    // let A_floor_data = {};
    // let A_floor_data_cnt = 0;
    let max_bl_area_m2 = 0;
    let tot_fa_area_m2 = 0;

    for(let i=0;i<floor.length;i++){
        if(floor[i].flrGbCd == '10'){continue;}

        if(sum_bl_area_m2[floor[i].flrGbCd][floor[i].flrNo] > max_bl_area_m2){
            max_bl_area_m2 = sum_bl_area_m2[floor[i].flrGbCd][floor[i].flrNo];
        }

        tot_fa_area_m2 += sum_fa_area_m2[floor[i].flrGbCd][floor[i].flrNo];

        // if(!A_floor_data[A_floor_data_cnt]){
        //     A_floor_data[A_floor_data_cnt] = {};
        // }

        // A_floor_data[A_floor_data_cnt]['flrNoNm'] = 
        //     exports.flrGbCd[floor[i].flrGbCd]+floor[i].flrNo + '층';
        // A_floor_data_cnt++
    }

    let bl_ratio = 0; 
    let fa_ratio = 0;

    if(building.land_size_m2 > 0){
        bl_ratio = (max_bl_area_m2 / building.land_size_m2 * 100).toFixed(2);
        fa_ratio = (tot_fa_area_m2 / building.land_size_m2 * 100).toFixed(2);
    }

    await exports.DBCall(`CALL SP_BULDING_RATE_UPDATE(?,?,?)`,[building_uid, bl_ratio, fa_ratio]);

    return true;
}

exports.DBCall = async function(sp, params){
    const reData = await db.query(sp,params)
        .catch((err)=>{
            console.log(sp + " error : " +err)
            return false;
        });
    

    try{
        return reData[0][0];
    }catch(e){
        console.log("EEEEEE :::: " + e);
        return false;
    }
};

exports.DBOriginCall = async function(sp, params){
    const reData = await db.query(sp,params)
        .catch((err)=>{
            console.log(sp + " error : " +err)
            return false;
        });
    
    try{
        return reData[0];
    }catch(e){
        console.log("EEEEEE :::: " + e);
        return false;
    }
};

exports.DBOneCall = async function(sp, params){
    const reData = await db.query(sp,params)
        .catch((err)=>{
            console.log(sp + " error : " +err)
            return false;
        });

    try{
        return reData[0][0][0];
    }catch(e){
        console.log("EEEEEE :::: " + e);
        return false;
    }
};

exports.DBPageCall = async function(sp, params){
    const reData = await db.query(sp,params)
        .catch((err)=>{
            console.log(sp + " error : " +err)
            return false;
        });

    try{
        return {item: reData[0][0], pageInfo: reData[0][1][0]};
    }catch(e){
        console.log("EEEEEE :::: " + e);
        return false;
    }
};

exports.GETUserData = async function(userId){
    const pyData = await exports.DBOneCall(`CALL SP_W_R_USER_PY_MON_GET(?)`,[userId]);
	const regionData = await exports.DBOneCall(`CALL SP_W_R_USER_AREA_GET(?)`,[userId]);
	
    let reAddrList = [];
    let relikePickList = [];

    try{
        if(regionData?.find_area){
            reAddrList = exports.isEmpty(regionData.find_area.toString()).split(',');
        }

        if(regionData?.likePick){
            relikePickList = exports.isEmpty(regionData.likePick.toString()).split(',');
        }

        let addrList = [];

        for(let i=0;i<reAddrList.length;i++){
            const tg = exports.addr[reAddrList[i]];
            if(tg){
            for(let ii=0;ii<tg.length;ii++){
                addrList.push(tg[ii]);
            }
            }
        }

        for(let i = 14 - addrList.length; 0 < i; i--){
            addrList.push(null);
        }

        let likePickList = [];
        for(let i=0;i<relikePickList.length;i++){
            const tg = exports.cidList[relikePickList[i]];
            if(tg){
            for(let ii=0;ii<tg.length;ii++){
                likePickList.push(tg[ii]);
            }
            }
        }

        for(let i = 12 - likePickList.length; 0 < i; i--){
            likePickList.push(null);
        }

        return {
            officePy:pyData.req_area_py,
            officePy_E:pyData.req_area_py_E,
            rentMoney:pyData.monthly_rent,
            rentMoney_E:pyData.monthly_rent_E,
            addrList:addrList,
            likePickList:likePickList
        };
    }catch(e){
        return false;
    }
};


exports.AddMgrLog = async function(req, 
    mid, 
    bid, 
    cid,
    p_log_cate,
    p_log_type, 
    p_sub_type_key, 
    p_memo, 
    ){

    const userIp = requestIp.getClientIp(req);
    const userAgent = req.headers['user-agent'].toLowerCase();
    var userOs = 'none';
    
    if(userAgent.indexOf('windows') != -1 || userAgent.indexOf('mac') != -1){
        userOs = 'pc';
    }
    else if(userAgent.indexOf('iphone') != -1 || userAgent.indexOf('android') != -1){
        userOs = 'mobile';
    }


    await exports.DBCall(`CALL SP_MGR_LOG_ADD(?,?,?,?,?,?,?,?,?)`,[
        mid, 
        bid, 
        cid,
        p_log_cate,
        p_log_type, 
        p_sub_type_key, 
        p_memo, 
        userOs, 
        userIp
    ]);


    return;
};

exports.AddMgrLog2 = async function(req, 
    mid, 
    bid, 
    cid,
    p_log_cate,
    p_log_type, 
    p_sub_type_key, 
    p_memo, 
    ){

    const userIp = requestIp.getClientIp(req);
    const userAgent = req.headers['user-agent'].toLowerCase();
    var userOs = 'none';
    
    if(userAgent.indexOf('windows') != -1 || userAgent.indexOf('mac') != -1){
        userOs = 'pc';
    }
    else if(userAgent.indexOf('iphone') != -1 || userAgent.indexOf('android') != -1){
        userOs = 'mobile';
    }


    await exports.DBCall(`CALL SP_R_MGR_LOG_ADD(?,?,?,?,?,?,?,?,?)`,[
        mid, 
        bid, 
        cid,
        p_log_cate,
        p_log_type, 
        p_sub_type_key, 
        p_memo, 
        userOs, 
        userIp
    ]);


    return;
};

exports.FileDel =  async function(bid, typeNum){
    const reData = await exports.DBOneCall(`CALL SP_ITEM_IMG_TYPE(?,?)`,[
        bid, 
        typeNum
    ]);

    if(reData){
        fs.unlink(reData.path + '/' + reData.name, function(err){
            if(err) {
              console.log("Error : ", err)
            }
        })
    }
};

exports.FileDel2 =  async function(bid, typeNum){
    const reData = await exports.DBOneCall(`CALL SP_R_ITEM_IMG_TYPE(?,?)`,[
        bid, 
        typeNum
    ]);

    if(reData){
        fs.unlink(reData.path + '/' + reData.name, function(err){
            if(err) {
              console.log("Error : ", err)
            }
        })
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/item')
    },
    filename: (req, file, cb) => {
        cb(null, 'item-' + Date.now())
    },
});

let upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
    }
});

const storage2 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/file')
    },
    filename: (req, file, cb) => {
        // cb(null, Buffer.from(req.body.bid + '_' +file.originalname, 'latin1').toString('utf8'))
        cb(null, 'item-' + Date.now());
    },
});

let upload2 = multer({
    storage: storage2
});

const storage3 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/file')
    },
    filename: (req, file, cb) => {
        cb(null, 'item-' + Date.now())
    },
});

let upload3 = multer({
    storage: storage3
});

exports.fileUpload = upload2.single('file');
exports.fileUploadList = upload3.array('files');

exports.imgUpload = upload.array("images");



const tempStorage = multer.memoryStorage(); // ⭐ 파일을 메모리로
const tempUpload = multer({ tempStorage });
exports.tempUpload = tempUpload.array('files');


exports.m2ToPy = function(val){
    return (val * 0.3025).toFixed(2);
}

exports.isEmpty = function(value){
    if( value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) ){
    	return null;
  	}else{
    	return value;
  	}
}

exports.isEmpty2 = function(value){
    if( value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) ){
        return 0;
    }else{
        return value;
    }
}

exports.flrGbCd = {
    10 : '지하',
    20 : '',
    21 : '복층(하층)',
    22 : '복층(상층)',
    30 : '옥탑',
    40 : '각층'
}

exports.sellStatus ={
    ready: '준비',
    done: '매물',
    hold: '보류',
    sell: '매각',
}

exports.chkStatus ={
    A: 'A',
    B: 'B',
    C: 'C',
    NULL: '',
    null: '',
    '': '',
}

exports.interior_type ={
    need: '필요',
    good: '양호',
    demo: '철거완료',
}

exports.rent_free ={
    none: '협의',
    confer: '0개월',
}

exports.addr ={
    '강남구전체':['11680%'],
    '송파구':['11710%'],

    '신사/청담':['11680107%','11680104%'],
    '삼성/대치':['11680105%','11680106%'],
    '논현/역삼':['11680108%','11680101%'],
    '도곡/개포':['11680118%','11680103%'],
    '성수동':['11200114%','11200115%'],
    '서초동':['11650108%'],

    '도봉구':['11320%'],
    '노원구':['11350%'],
    '강북구':['11305%'],
    '성북구':['11290%'],
    '중랑구':['11260%'],
    '동대문구':['11230%'],
    '광진구':['11215%'],
    '은평구':['11380%'],
    '종로구':['11110%'],
    '서대문구':['11410%'],
    '중구':['11140%'],
    '마포구':['11440%'],
    '용산구':['11170%'],
    '강동구':['11740%'],
    '동작구':['11590%'],
    '관악구':['11620%'],
    '금천구':['11545%'],
    '영등포구':['11560%'],
    '구로구':['11530%'],
    '양천구':['11470%'],
    '강서구':['11500%'],
}

exports.cidList ={
    '신축':[174],
    '24시간 개방':[178],
    '야외 테라스':[182],
    '단독사옥(통임대)':[175],
    '높은 층고':[179],
    '인테리어':[186],
    '역세권':[176],
    '엘리베이터 有':[180],
    '자주식주차가능':[183],
    '대로변':[177],
    '전기차 충전소':[181],
    '외부 화장실':[184],
    'PM추천': [187],
    '시세보다 저렴한':[185],
}




