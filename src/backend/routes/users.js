var express = require('express');
var router = express.Router();
const crypto = require('crypto');
const refresh = require("../middleware/refresh");
const redisClient = require('../util/redis.util');
const jwt = require('../util/jwt.util');
const db = require('../database/connect/config');
const requestIp = require('request-ip');
const seon = require('../seon');
const fs = require("fs");
const coolsms = require('coolsms-node-sdk').default;
const messageService = new coolsms(process.env.COOL_SMS_KEY, process.env.COOL_SMS_SECRET);


var isEmpty = function(value){
  if( value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) ){
    return null;
  }else{
    return value;
  }
};

var isEmpty2 = function(value){
	if( value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) ){
	  return 0;
	}else{
	  return value;
	}
};

const PY_M2_EX = 3.3058;
const M2_PY_EX = 0.3025;

/* GET users listing. */
router.get('/refresh', refresh, function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/u/login', async (req, res) =>{
  const reData = await seon.DBOneCall(`CALL SP_U_USER_GET_PHONE(?)`,[
    req.body.phone
  ]);
  let userId = null;
  let info = {type: false, message: ''};

  if(!reData){
    return res.status(400).json({
      status: 400,
      message: '먼저 매물 제안을 받아주세요.',
    });
  }else{
    userId = reData.id
  }

  const accessToken = jwt.sign(userId+'');
  const refreshToken = jwt.refresh();

  redisClient.set(userId+'', refreshToken);

  info.message = 'success';
  res.setHeader('Content-Type','application/json; charset=utf-8');
  res.setHeader('Authorization', 'Bearer ' + accessToken);
  res.setHeader('Refresh', 'Bearer ' + refreshToken);
  return res.status(200).json({
      status: 200,
      info: info,
      token: {
          accessToken: accessToken,
          refreshToken: refreshToken
      }
  });
});

router.post('/login', async (req, res) =>{
  let info = {type: false, message: ''};
  let {userId, password} = req.body

  if(!(isEmpty(userId) && isEmpty(password))){
    return res.status(400).json({
      status: 400,
      message: "아이디 또는 비밀번호가 일치하지 않습니다."
    });
  }

  const userIp = requestIp.getClientIp(req);
  const userAgent = req.headers['user-agent'].toLowerCase();

  var userOs = 'pc';
  if(userAgent.indexOf('windows') != -1 || userAgent.indexOf('mac') != -1){
    userOs = 'pc';
  }
  else if(userAgent.indexOf('iphone') != -1 || userAgent.indexOf('android') != -1){
    userOs = 'mobile';

    return res.status(400).json({
      status: 400,
      message: "접근할 수 없습니다."
    });
  }

  const encPW = crypto.createHash('sha256').update(password).digest('hex');

  const sql =  `CALL SP_LOGIN(?,?,?,?)`;

  const reData = await seon.DBOriginCall(sql,[
    userId,
    encPW,
    userIp,
    userOs
  ]);

	const ipList = await seon.DBCall(`CALL SP_SETTING_IP()`,sql);
	const ipSetList = await seon.DBCall(`CALL SP_SETTING_IP_SETTING()`,sql);
  const ableIp = ipSetList[0].cfg_val1;
  const ableTime = {
    s: ipSetList[1].cfg_int_val1,
    e: ipSetList[1].cfg_int_val2,
    st: ipSetList[1].cfg_val1,
  };

  if(reData[0].length && reData[0][0].mem_uid){
    if(reData[0][0].mem_type == 'admin'){
      if(ableIp == 'Y'){
        let loginIpSt = false;
        for(let i=0;i<ipList.length;i++){
          if(ipList[i].cfg_val2 == userIp || reData[0][0].ip_free == 'Y'){
            loginIpSt = true;
            break;
          }
        }

        if(!loginIpSt){
          return res.status(400).json({
            status: 400,
            message: "접근할 수 없습니다."
          });
        }
      }

      if(ableTime.st == 'Y'){
        let today = new Date();   
        let hours = today.getHours(); // 시

        if(ableTime.s <= hours && hours <= ableTime.e){
          return res.status(400).json({
            status: 400,
            message: "접근할 수 없습니다."
          });
        }
      }
    }

    if(reData[0][0].hire_status == 'N'){
      return res.status(400).json({
        status: 400,
        message: "접근할 수 없습니다."
      });
    }

    userId = reData[0][0].mem_uid;
    const accessToken = jwt.sign(userId+'');
    const refreshToken = jwt.refresh();

    redisClient.set(userId+'', refreshToken);

    info.message = 'success';
    res.setHeader('Content-Type','application/json; charset=utf-8');
    res.setHeader('Authorization', 'Bearer ' + accessToken);
    res.setHeader('Refresh', 'Bearer ' + refreshToken);
    return res.status(200).json({
        status: 200,
        info: info,
        token: {
            accessToken: accessToken,
            refreshToken: refreshToken
        }
    });
  }
  else{
    return res.status(400).json({
      status: 400,
      message: "아이디 또는 비밀번호가 일치하지 않습니다."
    });
  }
  
});

router.get('/item/image', async function(req, res){
  try{
    
    const reData = await seon.DBOneCall(`CALL SP_FILE_IMG_GET(?)`,[
      req.query.id
    ]);

    var filename =  reData.path + '/' + reData.name;

    const reBuffer = fs.readFileSync(filename);

    res.writeHead(200, { "Context-Type": reData.type });
    res.write(reBuffer);  
    res.end();  
    
  }catch(e){
    // console.log(e);
    return res.send('');
  }

});

router.get('/item/image2', async function(req, res){
  try{
    
    const reData = await seon.DBOneCall(`CALL SP_R_FILE_IMG_GET(?)`,[
      req.query.id
    ]);

    var filename =  reData.path + '/' + reData.name;

    const reBuffer = fs.readFileSync(filename);
    
    res.writeHead(200, { "Context-Type": reData.type });
    res.write(reBuffer);  
    res.end();  

    // fs.readFile(filename,            
    //   function (err, data)
    //   {
    //     res.writeHead(200, { "Context-Type": reData.type });
    //     res.write(data);  
    //     res.end();  
    //   }
    // );
  }catch(e){
    return res.send('');
  }

});

router.post('/req', async function(req, res){
	
	return res.send(false);
});

router.get('/cert', async function(req, res){
  try{
    let otpNum = '';

    if(req.query.phone == '777-7777-7777'){
      await seon.DBOriginCall(`CALL SP_OTP_ADD(?,?)`,[req.query.phone, '777777']);  
      return res.send(true);
    }

    for(let i=0;i<6;i++){
      const num = Math.floor(Math.random()*9);
      otpNum += num;
    }

    await seon.DBOriginCall(`CALL SP_OTP_ADD(?,?)`,[req.query.phone, otpNum]);  

    const re = await messageService.sendMany([
      {
        to: req.query.phone,
        from: process.env.COOL_SMS_GEN,
        text: otpNum
      }
    ]);
  }catch(e){
    console.log(e);
  }

	return res.send(true);
});

router.get('/cert/check', async function(req, res){
	const re = await seon.DBOneCall(`CALL SP_OTP_GET(?,?)`,[req.query.phone, req.query.keyNum]);  
  
  if(re){
    return res.send(true);
  }
  else{
    return res.send(false);
  }
});

router.post('/cert/del', async function(req, res){
	await seon.DBCall(`CALL SP_OTP_DEL(?)`,[req.body.phone]);  

  return res.send(true);
});
router.post('/client/add', async function(req, res){
	const sql =  `CALL SP_W_USER_ADD(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

	const officeM2 = Number((req.body.officePy * PY_M2_EX).toFixed(2));
  const officePy = req.body.officePy;
  const sector = isEmpty(req.body.enterName) + ' ' + isEmpty(req.body.sector);
  let region = null;
  let likePick = null;

	await seon.DBOriginCall(sql,[
		'관리?',  //고객구분
    req.body.phone, //폰번호
    req.body.email,   //이메일
    req.body.address,   //주소
	]);

  return res.send(true);
});

//임차인
router.post('/client/less/add', async function(req, res){
  const reData = await seon.DBOneCall(`CALL SP_U_USER_GET_PHONE(?)`,[
    req.body.phone
  ]);

  let userId = null;
  let info = {type: false, message: ''};

  if(!reData){
    await seon.DBOriginCall(`CALL SP_U_USER_ADD(?)`,[
      req.body.phone
    ]);

    const reData = await seon.DBOneCall(`CALL SP_U_USER_GET_PHONE(?)`,[
      req.body.phone
    ]);

    userId = reData.id
  }else{
    userId = reData.id
  }



	const officeM2 = Number((req.body.officePy * PY_M2_EX).toFixed(2));
  const officePy = req.body.officePy;

  const officeM2_E = Number((req.body.officePy_E * PY_M2_EX).toFixed(2));
  const officePy_E = req.body.officePy_E;

  // const sector = isEmpty(req.body.enterName) + ' ' + isEmpty(req.body.sector);

	const re = await seon.DBOriginCall(`CALL SP_W_R_USER_ADD(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
		req.body.mode,  //고객구분
    req.body.phone, //폰번호
    req.body.email,   //이메일
    //임대인
    isEmpty(req.body.address), //주소
    //임차인
    isEmpty(req.body.company),  //회사이름
		isEmpty(req.body.name),  //고객명

		isEmpty2(officeM2), //몇평 사무실?
    isEmpty2(officePy),
		isEmpty(req.body.region.toString()),  //찾는위치

		isEmpty2(req.body.rentMoney), //월임대료
		isEmpty(req.body.officeSt), //사옥매입고려
		isEmpty(req.body.likePick.toString()), //선호조건
		isEmpty(req.body.conditions), //추가조건
		isEmpty(req.body.inDate), //입주예정
		isEmpty(req.body.sector), //업종

		isEmpty(req.body.interior), //인테리어
		isEmpty(req.body.route), //알게된경로

    isEmpty2(officeM2_E), //몇평 사무실?
    isEmpty2(officePy_E),
    isEmpty2(req.body.rentMoney_E), //월임대료

    isEmpty(req.body.enterName), //기업명
    userId,
	]);

  
  if(req.body.phone && req.body.name){
    const toList = [{
      to:req.body.phone,
      username:req.body.name
    }];

    seon.kakaoATA(toList, 'LEASE_APPLY');
  }

  

  const accessToken = jwt.sign(userId+'');
  const refreshToken = jwt.refresh();

  redisClient.set(userId+'', refreshToken);

  info.message = 'success';
  res.setHeader('Content-Type','application/json; charset=utf-8');
  res.setHeader('Authorization', 'Bearer ' + accessToken);
  res.setHeader('Refresh', 'Bearer ' + refreshToken);
  return res.status(200).json({
      status: 200,
      info: info,
      token: {
          accessToken: accessToken,
          refreshToken: refreshToken
      }
  });
});

//임대인
router.post('/client/land/add', async function(req, res){
	const officeM2 = Number((req.body.officePy * PY_M2_EX).toFixed(2));
  const officePy = req.body.officePy;

  const officeM2_E = Number((req.body.officePy_E * PY_M2_EX).toFixed(2));
  const officePy_E = req.body.officePy_E;

  const sector = isEmpty(req.body.enterName) + ' ' + isEmpty(req.body.sector);

	const re = await seon.DBOriginCall(`CALL SP_W_R_USER_ADD(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
		req.body.mode,  //고객구분
    req.body.phone, //폰번호
    req.body.email,   //이메일
    //임대인
    isEmpty(req.body.address), //주소
    //임차인
    isEmpty(req.body.company),  //회사이름
		isEmpty(req.body.name),  //고객명

		isEmpty2(officeM2), //몇평 사무실?
    isEmpty2(officePy),
		isEmpty(req.body.region.toString()),  //찾는위치

		isEmpty2(req.body.rentMoney), //월임대료
		isEmpty(req.body.officeSt), //사옥매입고려
		isEmpty(req.body.likePick.toString()), //선호조건
		isEmpty(req.body.conditions), //추가조건
		isEmpty(req.body.inDate), //입주예정
		isEmpty(sector), //기업업종
		isEmpty(req.body.interior), //인테리어
		isEmpty(req.body.route), //알게된경로

    isEmpty2(officeM2_E), //몇평 사무실?
    isEmpty2(officePy_E),
    isEmpty2(req.body.rentMoney_E), //월임대료

    null,
    null,
	]);
  
  return res.send(true);
});

router.post('/client/total', async function(req, res){
  const officePy = req.body.officePy;

  const officePy_E = req.body.officePy_E;

  let reAddrList = [];
  if(req.body.region){
    reAddrList = isEmpty(req.body.region.toString()).split(',');
  }
  // const reAddrList = isEmpty(req.body.region.toString()).split(',');

  let addrList = [];

  for(let i=0;i<reAddrList.length;i++){
    const tg = seon.addr[reAddrList[i]];
    if(tg){
      for(let ii=0;ii<tg.length;ii++){
        addrList.push(tg[ii]);
      }
    }
  }

  for(let i = 14 - addrList.length; 0 < i; i--){
    addrList.push(null);
  }

  const reSearch = await seon.DBOneCall(`CALL SP_W_R_USER_SEARCH(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
    addrList[0],
    addrList[1],
    addrList[2],
    addrList[3],
    addrList[4],
    addrList[5],
    addrList[6],
    addrList[7],
    addrList[8],
    addrList[9],
    addrList[10],
    addrList[11],
    addrList[12],
    addrList[13],
    officePy,
    officePy_E,
    req.body.rentMoney,
    req.body.rentMoney_E,
  ]
  ); 
 
  return res.send(reSearch);
});

router.post('/client/total2', async function(req, res){
  const officePy = req.body.officePy;

  const officePy_E = req.body.officePy_E;

  let reAddrList = [];
  let relikePickList = [];

  if(req.body.region){
    reAddrList = isEmpty(req.body.region.toString()).split(',');
  }

  if(req.body.likePick){
    relikePickList = isEmpty(req.body.likePick);
  }
  // const reAddrList = isEmpty(req.body.region.toString()).split(',');
  // const relikePickList = isEmpty(req.body.likePick);
  
  let addrList = [];
  
  for(let i=0;i<reAddrList?.length;i++){
    const tg = seon.addr[reAddrList[i]];
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
  for(let i=0;i<relikePickList?.length;i++){
    const tg = seon.cidList[relikePickList[i]];
    if(tg){
      for(let ii=0;ii<tg.length;ii++){
        likePickList.push(tg[ii]);
      }
    }
  }

  for(let i = 12 - likePickList.length; 0 < i; i--){
    likePickList.push(null);
  }

  const reSearch = await seon.DBOneCall(`CALL SP_W_R_USER_SEARCH2(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
    addrList[0],
    addrList[1],
    addrList[2],
    addrList[3],
    addrList[4],
    addrList[5],
    addrList[6],
    addrList[7],
    addrList[8],
    addrList[9],
    addrList[10],
    addrList[11],
    addrList[12],
    addrList[13],
    officePy,
    officePy_E,
    req.body.rentMoney,
    req.body.rentMoney_E,
    likePickList[0],
    likePickList[1],
    likePickList[2],
    likePickList[3],
    likePickList[4],
    likePickList[5],
    likePickList[6],
    likePickList[7],
    likePickList[8],
    likePickList[9],
    likePickList[10],
    likePickList[11],
  ]
  ); 
 
  return res.send(reSearch);
});

router.get('/client/add2/search', async function(req, res){
  await seon.DBOriginCall(`CALL SP_OTP_ADD(?,?)`,[req.query.phone, otpNum]);  


	return res.send(true);
});






router.get('/sc/adr1', async function(req, res){
	const re = await seon.DBCall(`CALL SP_SC_GET_ADR_1()`);  

  return res.send(re);
});

router.get('/sc/adr2', async function(req, res){
	const re = await seon.DBCall(`CALL SP_SC_GET_ADR_2(?)`, [req.query.id]);  

  return res.send(re);
});

router.get('/sc/adr3', async function(req, res){
	const re = await seon.DBCall(`CALL SP_SC_GET_ADR_3(?)`, [req.query.id]);  

  return res.send(re);
});

router.get('/sc/adr/st', async function(req, res){
	const re = await seon.DBCall(`CALL SP_SC_GET_ADR_ST_UPDATE(?,?)`, [req.query.id, req.query.st]);  

  return res.send(re);
});


router.get('/ttt1', async function(req, res){
  const toList = [{to:'01092878344', name:'이채은'},{to:'01071586906', name:'바바2'}];
  seon.kakaoATA(toList);
	return res.send(true);
});







module.exports = router;
