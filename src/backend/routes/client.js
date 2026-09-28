var express = require('express');
var router = express.Router();
const redisClient = require('../util/redis.util');
const db = require('../database/connect/config');
const crypto = require('crypto');
const { check, validationResult } = require('express-validator');
const axios = require('axios');
const seon = require('../seon');
const dayjs = require('dayjs');


function wrapAsync(fn) {
	return function(req, res, next) {
	  // Make sure to `.catch()` any errors and pass them along to the `next()`
	  // middleware in the chain, in this case the error handler.
	  fn(req, res, next).catch(next);
	};
}

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

router.get('/less/map/cheap', async function(req, res){
	const userId = req.decoded.userId;

	const reData = await seon.GETUserData(userId);
	const reSearch = await seon.DBCall(`CALL SP_W_R_USER_LESS_CHEAP(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
		reData.addrList[0],
		reData.addrList[1],
		reData.addrList[2],
		reData.addrList[3],
		reData.addrList[4],
		reData.addrList[5],
		reData.addrList[6],
		reData.addrList[7],
		reData.addrList[8],
		reData.addrList[9],
		reData.addrList[10],
		reData.addrList[11],
		reData.addrList[12],
		reData.addrList[13],
		reData.officePy,
		reData.officePy_E,
		reData.rentMoney,
		reData.rentMoney_E,
		reData.likePickList[0],
		reData.likePickList[1],
		reData.likePickList[2],
		reData.likePickList[3],
		reData.likePickList[4],
		reData.likePickList[5],
		reData.likePickList[6],
		reData.likePickList[7],
		reData.likePickList[8],
		reData.likePickList[9],
		reData.likePickList[10],
		reData.likePickList[11]
	]
	); 

	for(let i=0;i<reSearch.length;i++){
		const imgs = await seon.DBCall(`CALL SP_R_ITEM_IMG(?)`,[reSearch[i].building_uid]);

		reSearch[i].img = null;

		for(let ii=0;ii<imgs.length;ii++){
			if(imgs[ii].type_num == 0){
				reSearch[i].img =  process.env.VUE_APP_HOST_BACK + '/users/item/image2?id=' + imgs[ii].id
				break;
			}
		}

		if(!reSearch[i].img){
			reSearch[i].img = process.env.VUE_APP_HOST_BACK + '/users/item/image2?id=' + 1;
		}
	}

	return res.send(reSearch);
});

router.get('/less/map/all', async function(req, res){
	const userId = req.decoded.userId;

	const reData = await seon.GETUserData(userId);
	let reSearch = [];
	let reAllData = [];

	try{
		// 신축
		reSearch = await seon.DBCall(`CALL SP_W_R_USER_LESS_NEW(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
			reData.addrList[0],
			reData.addrList[1],
			reData.addrList[2],
			reData.addrList[3],
			reData.addrList[4],
			reData.addrList[5],
			reData.addrList[6],
			reData.addrList[7],
			reData.addrList[8],
			reData.addrList[9],
			reData.addrList[10],
			reData.addrList[11],
			reData.addrList[12],
			reData.addrList[13],
			reData.officePy,
			reData.officePy_E,
			reData.rentMoney,
			reData.rentMoney_E,
			reData.likePickList[0],
			reData.likePickList[1],
			reData.likePickList[2],
			reData.likePickList[3],
			reData.likePickList[4],
			reData.likePickList[5],
			reData.likePickList[6],
			reData.likePickList[7],
			reData.likePickList[8],
			reData.likePickList[9],
			reData.likePickList[10],
			reData.likePickList[11]
		]
		); 

		for(let i=0;i<reSearch.length;i++){
			const imgs = await seon.DBCall(`CALL SP_R_ITEM_IMG(?)`,[reSearch[i].building_uid]);

			reSearch[i].img = null;

			for(let ii=0;ii<imgs.length;ii++){
				if(imgs[ii].type_num == 0){
					reSearch[i].img =  process.env.VUE_APP_HOST_BACK + '/users/item/image2?id=' + imgs[ii].id
					break;
				}
			}

			if(!reSearch[i].img){
				reSearch[i].img = process.env.VUE_APP_HOST_BACK + '/users/item/image2?id=' + 1;
			}

			reAllData.push(reSearch[i]);
		}


		// 역세권
		reSearch = await seon.DBCall(`CALL SP_W_R_USER_LESS_STATION(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
			reData.addrList[0],
			reData.addrList[1],
			reData.addrList[2],
			reData.addrList[3],
			reData.addrList[4],
			reData.addrList[5],
			reData.addrList[6],
			reData.addrList[7],
			reData.addrList[8],
			reData.addrList[9],
			reData.addrList[10],
			reData.addrList[11],
			reData.addrList[12],
			reData.addrList[13],
			reData.officePy,
			reData.officePy_E,
			reData.rentMoney,
			reData.rentMoney_E,
			reData.likePickList[0],
			reData.likePickList[1],
			reData.likePickList[2],
			reData.likePickList[3],
			reData.likePickList[4],
			reData.likePickList[5],
			reData.likePickList[6],
			reData.likePickList[7],
			reData.likePickList[8],
			reData.likePickList[9],
			reData.likePickList[10],
			reData.likePickList[11]
		]
		); 

		for(let i=0;i<reSearch.length;i++){
			const imgs = await seon.DBCall(`CALL SP_R_ITEM_IMG(?)`,[reSearch[i].building_uid]);

			reSearch[i].img = null;

			for(let ii=0;ii<imgs.length;ii++){
				if(imgs[ii].type_num == 0){
					reSearch[i].img =  process.env.VUE_APP_HOST_BACK + '/users/item/image2?id=' + imgs[ii].id
					break;
				}
			}

			if(!reSearch[i].img){
				reSearch[i].img = process.env.VUE_APP_HOST_BACK + '/users/item/image2?id=' + 1;
			}

			reAllData.push(reSearch[i]);
		}


		// 값이싼
		reSearch = await seon.DBCall(`CALL SP_W_R_USER_LESS_CHEAP(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
			reData.addrList[0],
			reData.addrList[1],
			reData.addrList[2],
			reData.addrList[3],
			reData.addrList[4],
			reData.addrList[5],
			reData.addrList[6],
			reData.addrList[7],
			reData.addrList[8],
			reData.addrList[9],
			reData.addrList[10],
			reData.addrList[11],
			reData.addrList[12],
			reData.addrList[13],
			reData.officePy,
			reData.officePy_E,
			reData.rentMoney,
			reData.rentMoney_E,
			reData.likePickList[0],
			reData.likePickList[1],
			reData.likePickList[2],
			reData.likePickList[3],
			reData.likePickList[4],
			reData.likePickList[5],
			reData.likePickList[6],
			reData.likePickList[7],
			reData.likePickList[8],
			reData.likePickList[9],
			reData.likePickList[10],
			reData.likePickList[11]
		]
		); 

		for(let i=0;i<reSearch.length;i++){
			const imgs = await seon.DBCall(`CALL SP_R_ITEM_IMG(?)`,[reSearch[i].building_uid]);

			reSearch[i].img = null;

			for(let ii=0;ii<imgs.length;ii++){
				if(imgs[ii].type_num == 0){
					reSearch[i].img =  process.env.VUE_APP_HOST_BACK + '/users/item/image2?id=' + imgs[ii].id
					break;
				}
			}

			if(!reSearch[i].img){
				reSearch[i].img = process.env.VUE_APP_HOST_BACK + '/users/item/image2?id=' + 1;
			}

			reAllData.push(reSearch[i]);
		}


		// pm추천
		let rePmList = await seon.DBCall(`CALL SP_W_R_USER_LESS_PM(?)`,[userId]); 
		for(let i=0;i<rePmList.length;i++){
			const imgs = await seon.DBCall(`CALL SP_R_ITEM_IMG(?)`,[rePmList[i].building_uid]);

			rePmList[i].img = null;

			for(let ii=0;ii<imgs.length;ii++){
				if(imgs[ii].type_num == 0){
					rePmList[i].img =  process.env.VUE_APP_HOST_BACK + '/users/item/image2?id=' + imgs[ii].id
					break;
				}
			}

			if(!rePmList[i].img){
				rePmList[i].img = process.env.VUE_APP_HOST_BACK + '/users/item/image2?id=' + 1;
			}
		}


		//중복제거
		let reAllData_ = reAllData.filter((arr, index, callback) => index === callback.findIndex(t => t.building_uid === arr.building_uid));
		
		for(let i=0;i<rePmList.length;i++){
			for(let ii=0;ii<reAllData_.length;ii++){
				if(rePmList[i].building_uid == reAllData_[ii].building_uid){
					reAllData_.splice(ii, 1);
				}
			}
		}

		//정렬
		const reAllData__ = reAllData_.sort((a, b) => b.building_uid - a.building_uid); 

		const resultList = rePmList.concat(reAllData__);

		return res.send(resultList);
	}catch(e){
		return res.send(false);
	}
});


router.get('/less/map/new', async function(req, res){
	const userId = req.decoded.userId;

	const reData = await seon.GETUserData(userId);
	const reSearch = await seon.DBCall(`CALL SP_W_R_USER_LESS_NEW(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
		reData.addrList[0],
		reData.addrList[1],
		reData.addrList[2],
		reData.addrList[3],
		reData.addrList[4],
		reData.addrList[5],
		reData.addrList[6],
		reData.addrList[7],
		reData.addrList[8],
		reData.addrList[9],
		reData.addrList[10],
		reData.addrList[11],
		reData.addrList[12],
		reData.addrList[13],
		reData.officePy,
		reData.officePy_E,
		reData.rentMoney,
		reData.rentMoney_E,
		reData.likePickList[0],
		reData.likePickList[1],
		reData.likePickList[2],
		reData.likePickList[3],
		reData.likePickList[4],
		reData.likePickList[5],
		reData.likePickList[6],
		reData.likePickList[7],
		reData.likePickList[8],
		reData.likePickList[9],
		reData.likePickList[10],
		reData.likePickList[11]
	]
	); 

	for(let i=0;i<reSearch.length;i++){
		const imgs = await seon.DBCall(`CALL SP_R_ITEM_IMG(?)`,[reSearch[i].building_uid]);

		reSearch[i].img = null;

		for(let ii=0;ii<imgs.length;ii++){
			if(imgs[ii].type_num == 0){
				reSearch[i].img =  process.env.VUE_APP_HOST_BACK + '/users/item/image2?id=' + imgs[ii].id
				break;
			}
		}

		if(!reSearch[i].img){
			reSearch[i].img = process.env.VUE_APP_HOST_BACK + '/users/item/image2?id=' + 1;
		}
	}

	return res.send(reSearch);
});

router.get('/less/map/station', async function(req, res){
	const userId = req.decoded.userId;

	const reData = await seon.GETUserData(userId);
	const reSearch = await seon.DBCall(`CALL SP_W_R_USER_LESS_STATION(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
		reData.addrList[0],
		reData.addrList[1],
		reData.addrList[2],
		reData.addrList[3],
		reData.addrList[4],
		reData.addrList[5],
		reData.addrList[6],
		reData.addrList[7],
		reData.addrList[8],
		reData.addrList[9],
		reData.addrList[10],
		reData.addrList[11],
		reData.addrList[12],
		reData.addrList[13],
		reData.officePy,
		reData.officePy_E,
		reData.rentMoney,
		reData.rentMoney_E,
		reData.likePickList[0],
		reData.likePickList[1],
		reData.likePickList[2],
		reData.likePickList[3],
		reData.likePickList[4],
		reData.likePickList[5],
		reData.likePickList[6],
		reData.likePickList[7],
		reData.likePickList[8],
		reData.likePickList[9],
		reData.likePickList[10],
		reData.likePickList[11]
	]
	); 

	for(let i=0;i<reSearch.length;i++){
		const imgs = await seon.DBCall(`CALL SP_R_ITEM_IMG(?)`,[reSearch[i].building_uid]);

		reSearch[i].img = null;

		for(let ii=0;ii<imgs.length;ii++){
			if(imgs[ii].type_num == 0){
				reSearch[i].img =  process.env.VUE_APP_HOST_BACK + '/users/item/image2?id=' + imgs[ii].id
				break;
			}
		}

		if(!reSearch[i].img){
			reSearch[i].img = process.env.VUE_APP_HOST_BACK + '/users/item/image2?id=' + 1;
		}
	}

	return res.send(reSearch);
});

router.get('/less/map/pm', async function(req, res){
	const userId = req.decoded.userId;
	const reSearch = await seon.DBCall(`CALL SP_W_R_USER_LESS_PM(?)`,[userId]); 

	for(let i=0;i<reSearch.length;i++){
		const imgs = await seon.DBCall(`CALL SP_R_ITEM_IMG(?)`,[reSearch[i].building_uid]);

		reSearch[i].img = null;

		for(let ii=0;ii<imgs.length;ii++){
			if(imgs[ii].type_num == 0){
				reSearch[i].img =  process.env.VUE_APP_HOST_BACK + '/users/item/image2?id=' + imgs[ii].id
				break;
			}
		}

		if(!reSearch[i].img){
			reSearch[i].img = process.env.VUE_APP_HOST_BACK + '/users/item/image2?id=' + 1;
		}
	}
	
	return res.send(reSearch);
});


router.get('/less/map/detail', async function(req, res){
	const reData = await seon.DBOneCall(`CALL SP_W_R_USER_LESS_DETAIL(?)`,[req.query.bid]); 

	
	const imgs = await seon.DBCall(`CALL SP_R_ITEM_IMG(?)`,[req.query.bid]);
	
	reData.imgList = [];

	for(let i=0;i<imgs.length;i++){
		reData.imgList.push(process.env.VUE_APP_HOST_BACK + '/users/item/image2?id=' + imgs[i].id) 
	}

	return res.send(reData);
});


router.post('/like/add', async function(req, res){
	const userId = req.decoded.userId;

	for(let i=0;i<req.body.ckList.length;i++){
		const bid = req.body.ckList[i];
		await seon.DBCall(`CALL SP_W_R_USER_LESS_LIKE_DELETE(?,?)`,[userId, bid]); 
		await seon.DBCall(`CALL SP_W_R_USER_LESS_LIKE_ADD(?,?)`,[userId, bid]); 
	}

	return res.send(true);
});

router.post('/like/del', async function(req, res){
	const userId = req.decoded.userId;

	for(let i=0;i<req.body.ckList.length;i++){
		const bid = req.body.ckList[i];
		await seon.DBCall(`CALL SP_W_R_USER_LESS_LIKE_DELETE(?,?)`,[userId, bid]); 
	}

	return res.send(true);
});

router.get('/like/s', async function(req, res){
	const userId = req.decoded.userId;
	const reSearch = await seon.DBCall(`CALL SP_W_R_USER_LESS_LIKE_GET_S(?)`,[userId]); 

	for(let i=0;i<reSearch.length;i++){
		const imgs = await seon.DBCall(`CALL SP_R_ITEM_IMG(?)`,[reSearch[i].building_uid]);

		reSearch[i].img = null;

		for(let ii=0;ii<imgs.length;ii++){
			if(imgs[ii].type_num == 0){
				reSearch[i].img =  process.env.VUE_APP_HOST_BACK + '/users/item/image2?id=' + imgs[ii].id
				break;
			}
		}

		if(!reSearch[i].img){
			reSearch[i].img = process.env.VUE_APP_HOST_BACK + '/users/item/image2?id=' + 1;
		}
	}

	return res.send(reSearch);
});


router.post('/tour/add', async function(req, res){
	const userId = req.decoded.userId;

	const {bidList, dateList, any, pickup} = req.body;
	
	let dateList_ = [];
	let memList_ = [];

	for(let i=0;i<bidList.length;i++){
		for(let ii=0;ii<dateList.length;ii++){
			await seon.DBCall(`CALL SP_W_R_USER_TOUR_DEL(?,?,?)`,[
				userId, 
				bidList[i],
				dateList[ii].date
			]);

			await seon.DBCall(`CALL SP_W_R_USER_TOUR_ADD(?,?,?,?,?)`,[
				userId, 
				bidList[i],
				dateList[ii].date,
				any,
				pickup
			]); 

			dateList_.push(dateList[ii].date);
		}

		const reBuilding = await seon.DBOneCall(`CALL SP_R_DETAIL_ITEM(?)`,[
			bidList[i]
		]); 

		if(reBuilding.ata_level > 0){
			memList_.push({
				mem_uid : reBuilding.mem_uid,
				mem_name : reBuilding.building_mem_name,
				mem_mobile : reBuilding.building_mem_mobile,
				ata_level : reBuilding.ata_level
			});
		}
	}

	const userObj = await seon.DBOneCall(`CALL SP_CID_TO_UID(?)`,[
		userId
	]); 

	const clientInfo = await seon.DBOneCall(`CALL SP_R_USER_ADMIN_DETAIL(?)`,[
		userObj.client_uid
	]);

	if(clientInfo.mgr_mem_name && clientInfo.mem_mobile){
		let setDateList =[...(new Set(dateList_))];

		const toList = [{
				to:clientInfo.mobile.replace(/-/g, ''),
				username:clientInfo.name,
				date:setDateList.toString(),
				mem_name:clientInfo.mgr_mem_name,
				mem_phone:clientInfo.mem_mobile,
			}];
	
		seon.kakaoATA(toList, 'TOUR_APPLY');
	}

	return res.send(true);
});

router.post('/tour/cancel', async function(req, res){
	const {idList, stCancel} = req.body;
	
	for(let i=0;i<idList.length;i++){
		await seon.DBCall(`CALL SP_W_R_USER_TOUR_CANCEL(?,?)`,[
			idList[i],
			stCancel
		]); 
	}

	return res.send(true);
});

router.post('/tour/edite', async function(req, res){
	const {idList, stEdite } = req.body;
	for(let i=0;i<idList.length;i++){
		await seon.DBCall(`CALL SP_W_R_USER_TOUR_EDITE(?,?)`,[
			idList[i], 
			stEdite
		]); 
	}

	return res.send(true);
});



router.get('/tour/get', async function(req, res){
	const userId = req.decoded.userId;
	const reData = await seon.DBCall(`CALL SP_W_R_USER_TOUR_GET(?)`,[userId]); 

	for(let i=0;i<reData.length;i++){
		const imgs = await seon.DBCall(`CALL SP_R_ITEM_IMG(?)`,[reData[i].bid]);

		reData[i].img = null;

		for(let ii=0;ii<imgs.length;ii++){
			if(imgs[ii].type_num == 0){
				reData[i].img =  process.env.VUE_APP_HOST_BACK + '/users/item/image2?id=' + imgs[ii].id
				break;
			}
		}

		if(!reData[i].img){
			reData[i].img = process.env.VUE_APP_HOST_BACK + '/users/item/image2?id=' + 1;
		}
	}

	return res.send(reData);
});


router.get('/userInfo', async function(req, res){
	const userId = req.decoded.userId;
	const reData = await seon.DBOneCall(`CALL SP_W_R_USER_GET(?)`,[userId]); 

	return res.send(reData);
});

router.post('/user/update', async function(req, res){
	const userId = req.decoded.userId;
	
	// const reData = await seon.DBOneCall(`CALL SP_U_USER_GET_PHONE(?)`,[
	// 	req.body.mobile
	// ]);
  
	// console.log(reData);

	// if(!reData){
	// 	return res.send(true);
	// }else{
	// 	return res.status(400).json({ errors: "이미 등록된 휴대폰 번호입니다." });
	// }
  
	try{
		const req_area_m2 = Number((req.body.req_area_py * PY_M2_EX).toFixed(2));
		const req_area_py = req.body.req_area_py;
		const req_area_m2_E = Number((req.body.req_area_py_E * PY_M2_EX).toFixed(2));
		const req_area_py_E = req.body.req_area_py_E;



		const re = await seon.DBOriginCall(`CALL SP_W_R_USER_UPDATE(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
			req.body.client_uid,  
			isEmpty(req.body.company),
			isEmpty(req.body.conditions),   
			isEmpty2(req.body.deposit),   
			isEmpty(req.body.email),   
			isEmpty(req.body.find_area.toString()),   
			isEmpty(req.body.inDate),   
			isEmpty(req.body.interior),   
			isEmpty(req.body.likePick.toString()),   
			isEmpty(req.body.mobile),   
			isEmpty2(req.body.monthly_fixed),   
			isEmpty(req.body.name),   
			isEmpty(req.body.officeSt),   
			isEmpty2(req_area_m2),   
			isEmpty2(req_area_py),   
			isEmpty2(req_area_m2_E),   
			isEmpty2(req_area_py_E),   
			isEmpty(req.body.sector)
		]);

		return res.send(true);
	}catch(e){
		return res.send(false);
	}
	
});

router.post('/user/update/phone', async function(req, res){
	const userId = req.decoded.userId;
	
	const reData = await seon.DBOneCall(`CALL SP_U_USER_GET_PHONE(?)`,[
		req.body.phone
	]);
  
	console.log(reData);

	if(!reData){
		return res.send(true);
	}else{
		return res.status(400).json({ errors: "이미 등록된 휴대폰 번호입니다." });
	}
  
});

router.get('/ata/user/brief', async function(req, res){
	const userId = req.decoded.userId; //세션 유저 아이디

	const userObj = await seon.DBOneCall(`CALL SP_CID_TO_UID(?)`,[
		userId
	]); 

	if(!userObj){
		return res.send(false);
	}


	const reIdxObj = await seon.DBOneCall(`CALL SP_R_USER_ATA_GET(?)`,[
		userObj.client_uid
	]); 


	return res.send(reIdxObj);
});

module.exports = router;

