var express = require('express');
var router = express.Router();
const redisClient = require('../util/redis.util');
const db = require('../database/connect/config');
const crypto = require('crypto');
const { check, validationResult } = require('express-validator');
const axios = require('axios');
const seon = require('../seon');
const dayjs = require('dayjs');
const PDFDocument = require('pdf-lib').PDFDocument;
const puppeteer = require('puppeteer');

var isEmpty = function(value){
  	if( value == "" || value == null || value == 'undefined' || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) ){
    	return null;
  	}else{
    	return value;
  	}
};

var isEmpty2 = function(value){
	if( value == "" || value == null || value == undefined || value == Infinity || ( value != null && typeof value == "object" && !Object.keys(value).length ) ){
	  return 0;
	}else{
	  return value;
	}
};


const PY_M2_EX = 3.3058;
const M2_PY_EX = 0.3025;

/* GET home page. */
router.get('/', async function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/logout', async (req, res) =>{
	// console.log(req.decoded);
	const userId = req.decoded.userId;

	const n = await redisClient.v4.exists(userId);
	console.log(n);
	if(n) await redisClient.v4.del(userId);

	return res.status(200).json({
	    status: 200,
	});
});

router.get('/map', async function(req, res){
	const sql =  `CALL SP_SEARCH_MAP(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

	const reData = await seon.DBCall(sql,
	[
		req.query.lat_min,
		req.query.lat_max,
		req.query.lng_min,
		req.query.lng_max,
		req.query.mode,
		isEmpty(req.query.st_),
			isEmpty(req.query.bName),
			isEmpty(req.query.oName),
			isEmpty(req.query.useList),
			isEmpty(req.query.lp_S),
			isEmpty(req.query.lp_E),
			isEmpty(req.query.er_S),
			isEmpty(req.query.er_E),
			isEmpty(req.query.sub),
			isEmpty(req.query.dis),
			isEmpty(req.query.floor_S),
			isEmpty(req.query.floor_E),
			isEmpty(req.query.stList),
			isEmpty(req.query.bId),
			isEmpty(req.query.preOName),
			isEmpty(req.query.sellPrice_S),
			isEmpty(req.query.sellPrice_E),
			isEmpty(req.query.sizeP_S),
			isEmpty(req.query.sizeP_E),
			isEmpty(req.query.roadWide_S),
			isEmpty(req.query.roadWide_E),
			isEmpty(req.query.roadConer),
			isEmpty(req.query.roadDual),
			isEmpty(req.query.roadName),
			isEmpty(req.query.memUid),
			isEmpty(req.query.regDate_S),
			isEmpty(req.query.regDate_E),
			isEmpty(req.query.phone),
			isEmpty(req.query.cateList),
			isEmpty(req.query.sellDate_S),
			isEmpty(req.query.sellDate_E),
			isEmpty(req.query.remodelDate_S),
			isEmpty(req.query.remodelDate_E),
			isEmpty(req.query.buildDate_S),
			isEmpty(req.query.buildDate_E),
			isEmpty(req.query.landSizePy),
			isEmpty(req.query.totalSizePy),
			isEmpty(req.query.teamId),
			isEmpty(req.query.cateId),
			isEmpty(req.query.keyword)
	]);

	return res.send(reData);
});

router.get('/map2', async function(req, res){
	const sql =  `CALL SP_R_SEARCH_MAP(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

	const reData = await seon.DBCall(sql,
	[
		req.query.lat_min,
		req.query.lat_max,
		req.query.lng_min,
		req.query.lng_max,
		req.query.mode,
		isEmpty(req.query.st_),
		isEmpty(req.query.bName),
		isEmpty(req.query.oName),
		isEmpty(req.query.useList),
		isEmpty(req.query.sub),
		isEmpty(req.query.dis),
		isEmpty(req.query.floor_S),
		isEmpty(req.query.floor_E),
		isEmpty(req.query.stList),
		isEmpty(req.query.bId),
		isEmpty(req.query.preOName),
		isEmpty(req.query.roadWide_S),
		isEmpty(req.query.roadWide_E),
		isEmpty(req.query.roadConer),
		isEmpty(req.query.roadDual),
		isEmpty(req.query.roadName),
		isEmpty(req.query.memUid),
		isEmpty(req.query.regDate_S),
		isEmpty(req.query.regDate_E),
		isEmpty(req.query.phone),
		isEmpty(req.query.cateList),
		isEmpty(req.query.sellDate_S),
		isEmpty(req.query.sellDate_E),
		isEmpty(req.query.remodelDate_S),
		isEmpty(req.query.remodelDate_E),
		isEmpty(req.query.buildDate_S),
		isEmpty(req.query.buildDate_E),

		isEmpty(req.query.rent_area_S),
		isEmpty(req.query.rent_area_E),
		isEmpty(req.query.net_area_S),
		isEmpty(req.query.net_area_E),
		isEmpty(req.query.deposit_S),
		isEmpty(req.query.deposit_E),
		isEmpty(req.query.monthly_fixed_S),
		isEmpty(req.query.monthly_fixed_E),
		isEmpty(req.query.rent_py_price),
		isEmpty(req.query.free_parking),
		isEmpty(req.query.fee_paring),
		isEmpty(req.query.interior_type),

		isEmpty(req.query.teamId),
		isEmpty(req.query.cateId),

		isEmpty(req.query.keyword),
	]);

	return res.send(reData);
});

router.get('/map2/dong', async function(req, res){
	let	sql =  `CALL SP_R_SEARCH_MAP_DONG(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

	const reData = await seon.DBCall(sql,
	[
		req.query.lat_min,
		req.query.lat_max,
		req.query.lng_min,
		req.query.lng_max,
		req.query.mode,
		isEmpty(req.query.st_),
		isEmpty(req.query.bName),
		isEmpty(req.query.oName),
		isEmpty(req.query.useList),
		isEmpty(req.query.sub),
		isEmpty(req.query.dis),
		isEmpty(req.query.floor_S),
		isEmpty(req.query.floor_E),
		isEmpty(req.query.stList),
		isEmpty(req.query.bId),
		isEmpty(req.query.preOName),
		isEmpty(req.query.roadWide_S),
		isEmpty(req.query.roadWide_E),
		isEmpty(req.query.roadConer),
		isEmpty(req.query.roadDual),
		isEmpty(req.query.roadName),
		isEmpty(req.query.memUid),
		isEmpty(req.query.regDate_S),
		isEmpty(req.query.regDate_E),
		isEmpty(req.query.phone),
		isEmpty(req.query.cateList),
		isEmpty(req.query.sellDate_S),
		isEmpty(req.query.sellDate_E),
		isEmpty(req.query.remodelDate_S),
		isEmpty(req.query.remodelDate_E),
		isEmpty(req.query.buildDate_S),
		isEmpty(req.query.buildDate_E),

		isEmpty(req.query.rent_area_S),
		isEmpty(req.query.rent_area_E),
		isEmpty(req.query.net_area_S),
		isEmpty(req.query.net_area_E),
		isEmpty(req.query.deposit_S),
		isEmpty(req.query.deposit_E),
		isEmpty(req.query.monthly_fixed_S),
		isEmpty(req.query.monthly_fixed_E),
		isEmpty(req.query.rent_py_price),
		isEmpty(req.query.free_parking),
		isEmpty(req.query.fee_paring),
		isEmpty(req.query.interior_type),

		isEmpty(req.query.keyword)
	]);

	return res.send(reData);
});

router.get('/map2/gu', async function(req, res){
	let sql =  `CALL SP_R_SEARCH_MAP_GU(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

	const reData = await seon.DBCall(sql,
	[
		req.query.lat_min,
		req.query.lat_max,
		req.query.lng_min,
		req.query.lng_max,
		req.query.mode,
		isEmpty(req.query.st_),
		isEmpty(req.query.bName),
		isEmpty(req.query.oName),
		isEmpty(req.query.useList),
		isEmpty(req.query.sub),
		isEmpty(req.query.dis),
		isEmpty(req.query.floor_S),
		isEmpty(req.query.floor_E),
		isEmpty(req.query.stList),
		isEmpty(req.query.bId),
		isEmpty(req.query.preOName),
		isEmpty(req.query.roadWide_S),
		isEmpty(req.query.roadWide_E),
		isEmpty(req.query.roadConer),
		isEmpty(req.query.roadDual),
		isEmpty(req.query.roadName),
		isEmpty(req.query.memUid),
		isEmpty(req.query.regDate_S),
		isEmpty(req.query.regDate_E),
		isEmpty(req.query.phone),
		isEmpty(req.query.cateList),
		isEmpty(req.query.sellDate_S),
		isEmpty(req.query.sellDate_E),
		isEmpty(req.query.remodelDate_S),
		isEmpty(req.query.remodelDate_E),
		isEmpty(req.query.buildDate_S),
		isEmpty(req.query.buildDate_E),

		isEmpty(req.query.rent_area_S),
		isEmpty(req.query.rent_area_E),
		isEmpty(req.query.net_area_S),
		isEmpty(req.query.net_area_E),
		isEmpty(req.query.deposit_S),
		isEmpty(req.query.deposit_E),
		isEmpty(req.query.monthly_fixed_S),
		isEmpty(req.query.monthly_fixed_E),
		isEmpty(req.query.rent_py_price),
		isEmpty(req.query.free_parking),
		isEmpty(req.query.fee_paring),
		isEmpty(req.query.interior_type),

		isEmpty(req.query.keyword)
	]);

	return res.send(reData);
});

router.get('/map2/sido', async function(req, res){
	let sql =  `CALL SP_R_SEARCH_MAP_SIDO(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

	const reData = await seon.DBCall(sql,
	[
		req.query.lat_min,
		req.query.lat_max,
		req.query.lng_min,
		req.query.lng_max,
		req.query.mode,
		isEmpty(req.query.st_),
		isEmpty(req.query.bName),
		isEmpty(req.query.oName),
		isEmpty(req.query.useList),
		isEmpty(req.query.sub),
		isEmpty(req.query.dis),
		isEmpty(req.query.floor_S),
		isEmpty(req.query.floor_E),
		isEmpty(req.query.stList),
		isEmpty(req.query.bId),
		isEmpty(req.query.preOName),
		isEmpty(req.query.roadWide_S),
		isEmpty(req.query.roadWide_E),
		isEmpty(req.query.roadConer),
		isEmpty(req.query.roadDual),
		isEmpty(req.query.roadName),
		isEmpty(req.query.memUid),
		isEmpty(req.query.regDate_S),
		isEmpty(req.query.regDate_E),
		isEmpty(req.query.phone),
		isEmpty(req.query.cateList),
		isEmpty(req.query.sellDate_S),
		isEmpty(req.query.sellDate_E),
		isEmpty(req.query.remodelDate_S),
		isEmpty(req.query.remodelDate_E),
		isEmpty(req.query.buildDate_S),
		isEmpty(req.query.buildDate_E),

		isEmpty(req.query.rent_area_S),
		isEmpty(req.query.rent_area_E),
		isEmpty(req.query.net_area_S),
		isEmpty(req.query.net_area_E),
		isEmpty(req.query.deposit_S),
		isEmpty(req.query.deposit_E),
		isEmpty(req.query.monthly_fixed_S),
		isEmpty(req.query.monthly_fixed_E),
		isEmpty(req.query.rent_py_price),
		isEmpty(req.query.free_parking),
		isEmpty(req.query.fee_paring),
		isEmpty(req.query.interior_type),

		isEmpty(req.query.keyword)
	]);

	return res.send(reData);
});

router.get('/mapPage2', async function(req, res){
	const sql =  `CALL SP_R_SEARCH_MAP_PAGE(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

	const reData = await seon.DBPageCall(sql,
		[
		req.query.page,
		isEmpty(req.query.st_),
		isEmpty(req.query.bName),
		isEmpty(req.query.oName),
		isEmpty(req.query.useList),
		isEmpty(req.query.sub),
		isEmpty(req.query.dis),
		isEmpty(req.query.floor_S),
		isEmpty(req.query.floor_E),
		isEmpty(req.query.stList),
		isEmpty(req.query.bId),
		isEmpty(req.query.preOName),
		isEmpty(req.query.roadWide_S),
		isEmpty(req.query.roadWide_E),
		isEmpty(req.query.roadConer),
		isEmpty(req.query.roadDual),
		isEmpty(req.query.roadName),
		isEmpty(req.query.memUid),
		isEmpty(req.query.regDate_S),
		isEmpty(req.query.regDate_E),
		isEmpty(req.query.phone),
		isEmpty(req.query.cateList),
		isEmpty(req.query.sellDate_S),
		isEmpty(req.query.sellDate_E),
		isEmpty(req.query.remodelDate_S),
		isEmpty(req.query.remodelDate_E),
		isEmpty(req.query.buildDate_S),
		isEmpty(req.query.buildDate_E),
		isEmpty(req.query.rent_area_S),
		isEmpty(req.query.rent_area_E),
		isEmpty(req.query.net_area_S),
		isEmpty(req.query.net_area_E),
		isEmpty(req.query.deposit_S),
		isEmpty(req.query.deposit_E),
		isEmpty(req.query.monthly_fixed_S),
		isEmpty(req.query.monthly_fixed_E),
		isEmpty(req.query.rent_py_price),
		isEmpty(req.query.free_parking),
		isEmpty(req.query.fee_paring),
		isEmpty(req.query.interior_type),
		isEmpty(req.query.keyword)
	]);

	return res.send(reData);
});

router.get('/map/dong', async function(req, res){
	let	sql =  `CALL SP_SEARCH_MAP_DONG(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

	const reData = await seon.DBCall(sql,
	[
		req.query.lat_min,
		req.query.lat_max,
		req.query.lng_min,
		req.query.lng_max,
		req.query.mode,
		isEmpty(req.query.st_),
		isEmpty(req.query.bName),
		isEmpty(req.query.oName),
		isEmpty(req.query.useList),
		isEmpty(req.query.lp_S),
		isEmpty(req.query.lp_E),
		isEmpty(req.query.er_S),
		isEmpty(req.query.er_E),
		isEmpty(req.query.sub),
		isEmpty(req.query.dis),
		isEmpty(req.query.floor_S),
		isEmpty(req.query.floor_E),
		isEmpty(req.query.stList),
		isEmpty(req.query.bId),
		isEmpty(req.query.preOName),
		isEmpty(req.query.sellPrice_S),
		isEmpty(req.query.sellPrice_E),
		isEmpty(req.query.sizeP_S),
		isEmpty(req.query.sizeP_E),
		isEmpty(req.query.roadWide_S),
		isEmpty(req.query.roadWide_E),
		isEmpty(req.query.roadConer),
		isEmpty(req.query.roadDual),
		isEmpty(req.query.roadName),
		isEmpty(req.query.memUid),
		isEmpty(req.query.regDate_S),
		isEmpty(req.query.regDate_E),
		isEmpty(req.query.phone),
		isEmpty(req.query.cateList),
		isEmpty(req.query.sellDate_S),
		isEmpty(req.query.sellDate_E),
		isEmpty(req.query.remodelDate_S),
		isEmpty(req.query.remodelDate_E),
		isEmpty(req.query.buildDate_S),
		isEmpty(req.query.buildDate_E),
		isEmpty(req.query.landSizePy),
		isEmpty(req.query.totalSizePy),
		isEmpty(req.query.teamId),
		isEmpty(req.query.cateId),
		isEmpty(req.query.keyword)
	]);

	return res.send(reData);
});

router.get('/map/gu', async function(req, res){
	let sql =  `CALL SP_SEARCH_MAP_GU(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

	const reData = await seon.DBCall(sql,
	[
	req.query.lat_min,
	req.query.lat_max,
	req.query.lng_min,
	req.query.lng_max,
	req.query.mode,
	isEmpty(req.query.st_),
		isEmpty(req.query.bName),
		isEmpty(req.query.oName),
		isEmpty(req.query.useList),
		isEmpty(req.query.lp_S),
		isEmpty(req.query.lp_E),
		isEmpty(req.query.er_S),
		isEmpty(req.query.er_E),
		isEmpty(req.query.sub),
		isEmpty(req.query.dis),
		isEmpty(req.query.floor_S),
		isEmpty(req.query.floor_E),
		isEmpty(req.query.stList),
		isEmpty(req.query.bId),
		isEmpty(req.query.preOName),
		isEmpty(req.query.sellPrice_S),
		isEmpty(req.query.sellPrice_E),
		isEmpty(req.query.sizeP_S),
		isEmpty(req.query.sizeP_E),
		isEmpty(req.query.roadWide_S),
		isEmpty(req.query.roadWide_E),
		isEmpty(req.query.roadConer),
		isEmpty(req.query.roadDual),
		isEmpty(req.query.roadName),
		isEmpty(req.query.memUid),
		isEmpty(req.query.regDate_S),
		isEmpty(req.query.regDate_E),
		isEmpty(req.query.phone),
		isEmpty(req.query.cateList),
		isEmpty(req.query.sellDate_S),
		isEmpty(req.query.sellDate_E),
		isEmpty(req.query.remodelDate_S),
		isEmpty(req.query.remodelDate_E),
		isEmpty(req.query.buildDate_S),
		isEmpty(req.query.buildDate_E),
		isEmpty(req.query.landSizePy),
		isEmpty(req.query.totalSizePy),
		isEmpty(req.query.teamId),
		isEmpty(req.query.cateId),
	isEmpty(req.query.keyword)
	]);

	return res.send(reData);
});

router.get('/map/sido', async function(req, res){
	let sql =  `CALL SP_SEARCH_MAP_SIDO(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

	const reData = await seon.DBCall(sql,
	[
	req.query.lat_min,
	req.query.lat_max,
	req.query.lng_min,
	req.query.lng_max,
	req.query.mode,
	isEmpty(req.query.st_),
		isEmpty(req.query.bName),
		isEmpty(req.query.oName),
		isEmpty(req.query.useList),
		isEmpty(req.query.lp_S),
		isEmpty(req.query.lp_E),
		isEmpty(req.query.er_S),
		isEmpty(req.query.er_E),
		isEmpty(req.query.sub),
		isEmpty(req.query.dis),
		isEmpty(req.query.floor_S),
		isEmpty(req.query.floor_E),
		isEmpty(req.query.stList),
		isEmpty(req.query.bId),
		isEmpty(req.query.preOName),
		isEmpty(req.query.sellPrice_S),
		isEmpty(req.query.sellPrice_E),
		isEmpty(req.query.sizeP_S),
		isEmpty(req.query.sizeP_E),
		isEmpty(req.query.roadWide_S),
		isEmpty(req.query.roadWide_E),
		isEmpty(req.query.roadConer),
		isEmpty(req.query.roadDual),
		isEmpty(req.query.roadName),
		isEmpty(req.query.memUid),
		isEmpty(req.query.regDate_S),
		isEmpty(req.query.regDate_E),
		isEmpty(req.query.phone),
		isEmpty(req.query.cateList),
		isEmpty(req.query.sellDate_S),
		isEmpty(req.query.sellDate_E),
		isEmpty(req.query.remodelDate_S),
		isEmpty(req.query.remodelDate_E),
		isEmpty(req.query.buildDate_S),
		isEmpty(req.query.buildDate_E),
		isEmpty(req.query.landSizePy),
		isEmpty(req.query.totalSizePy),
		isEmpty(req.query.teamId),
		isEmpty(req.query.cateId),
	isEmpty(req.query.keyword)
	]);

	return res.send(reData);
});

router.get('/mapPage', async function(req, res){
	const sql =  `CALL SP_SEARCH_MAP_PAGE(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

	const reData = await seon.DBPageCall(sql,
		[
		req.query.page,
		isEmpty(req.query.st_),
		isEmpty(req.query.bName),
		isEmpty(req.query.oName),
		isEmpty(req.query.useList),
		isEmpty(req.query.lp_S),
		isEmpty(req.query.lp_E),
		isEmpty(req.query.er_S),
		isEmpty(req.query.er_E),
		isEmpty(req.query.sub),
		isEmpty(req.query.dis),
		isEmpty(req.query.floor_S),
		isEmpty(req.query.floor_E),
		isEmpty(req.query.stList),
		isEmpty(req.query.bId),
		isEmpty(req.query.preOName),
		isEmpty(req.query.sellPrice_S),
		isEmpty(req.query.sellPrice_E),
		isEmpty(req.query.sizeP_S),
		isEmpty(req.query.sizeP_E),
		isEmpty(req.query.roadWide_S),
		isEmpty(req.query.roadWide_E),
		isEmpty(req.query.roadConer),
		isEmpty(req.query.roadDual),
		isEmpty(req.query.roadName),
		isEmpty(req.query.memUid),
		isEmpty(req.query.regDate_S),
		isEmpty(req.query.regDate_E),
		isEmpty(req.query.phone),
		isEmpty(req.query.cateList),
		isEmpty(req.query.sellDate_S),
		isEmpty(req.query.sellDate_E),
		isEmpty(req.query.remodelDate_S),
		isEmpty(req.query.remodelDate_E),
		isEmpty(req.query.buildDate_S),
		isEmpty(req.query.buildDate_E),
		isEmpty(req.query.landSizePy),
		isEmpty(req.query.totalSizePy),
		isEmpty(req.query.teamId),
		isEmpty(req.query.cateId),
		isEmpty(req.query.keyword)
	]);

	return res.send(reData);
});

router.get('/map/biz', async function(req, res){
	const sql =  `CALL SP_SEARCH_MAP_BIZ(?,?,?,?)`;
	const reData = await seon.DBCall(sql,[req.query.lat_min,req.query.lat_max,req.query.lng_min,req.query.lng_max]);
	return res.send(reData);
});

router.get('/map/getItem', async function(req, res){
	const sql =  `CALL SP_SEARCH_ITEM(?)`;
	const sql3 =  `CALL SP_ITEM_IMG(?)`;

	const reData = await seon.DBOneCall(sql,[req.query.bid]);
	const imgs = await seon.DBCall(sql3,[req.query.bid]);
	reData.img = null;

	for(let i=0;i<imgs.length;i++){
		if(imgs[i].type_num == 0){
			reData.img = imgs[i].id
			break;
		}
	}

	if(!reData.img){
		reData.img = 1;
	}

	return res.send(reData);
});

router.get('/map/getItem2', async function(req, res){
	const sql =  `CALL SP_R_SEARCH_ITEM(?)`;
	const sql3 =  `CALL SP_R_ITEM_IMG(?)`;

	const reData = await seon.DBOneCall(sql,[req.query.bid]);
	const imgs = await seon.DBCall(sql3,[req.query.bid]);
	reData.img = null;

	for(let i=0;i<imgs.length;i++){
		if(imgs[i].type_num == 0){
			reData.img = imgs[i].id
			break;
		}
	}

	if(!reData.img){
		reData.img = 1;
	}

	return res.send(reData);
});

router.get('/map/bdCate', async function(req, res){
	const sql =  `CALL SP_BD_CATE()`;
	const reData = await seon.DBCall(sql);

	return res.send(reData);
});

router.get('/map/useArea', async function(req, res){
	const sql =  `CALL SP_USE_AREA()`;
	const reData = await seon.DBCall(sql);

	return res.send(reData);
});

router.get('/map/team', async function(req, res){
	const sql =  `CALL SP_TEAM()`;
	const reData = await seon.DBCall(sql);

	return res.send(reData);
});

router.get('/detail/item', async function(req, res){
	const userId = req.decoded.userId; //세션 유저 아이디

	let sql1 = '';
	let sql2 = '';
	let sql3 = '';

	if(req.query.isRent == 'true'){
		sql1 =  `CALL SP_R_DETAIL_ITEM(?)`;
		sql2 =  `CALL SP_R_UPDATE_COUNT(?,?)`;
		sql3 =  `CALL SP_R_ITEM_IMG(?)`;

		sql4 =  `CALL SP_R_DETAIL_ITEM_VIEW_ADD(?,?)`;
	}else{
		sql1 =  `CALL SP_DETAIL_ITEM(?)`;
		sql2 =  `CALL SP_UPDATE_COUNT(?,?)`;
		sql3 =  `CALL SP_ITEM_IMG(?)`;

		sql4 =  `CALL SP_DETAIL_ITEM_VIEW_ADD(?,?)`;
	}

	if(req.query.isDetail){
		await seon.DBOriginCall(sql4,[userId, req.query.bid]);
	}

	const reData = await seon.DBOneCall(sql1,[req.query.bid]);




	if(!reData){
		return res.send(false);
	}

	await seon.DBOneCall(sql2,[userId, req.query.bid]);

	const imgs = await seon.DBCall(sql3,[req.query.bid]);

	reData.imgList = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];

	for(let i=0;i<imgs.length;i++){
		reData.imgList[imgs[i].type_num] = imgs[i].id;
	}

	return res.send(reData);
});

//임대차내역
router.get('/detail/item/rent', async function(req, res){
	const sql =  `CALL SP_DETAIL_ITEM_RENT(?)`;
	const reData = await seon.DBCall(sql,[req.query.bid]);

	return res.send(reData);
});

router.get('/detail/item/rent2', async function(req, res){
	const sql =  `CALL SP_R_DETAIL_ITEM_RENT(?)`;
	const reData = await seon.DBCall(sql,[req.query.bid]);

	return res.send(reData);
});

//건축물대장
router.get('/detail/item/floor', async function(req, res){
	const sql =  `CALL SP_DETAIL_ITEM_FLOOR(?)`;
	const reData = await seon.DBCall(sql,[req.query.bid]);

	return res.send(reData);
});

router.get('/detail/item/floor2', async function(req, res){
	const sql =  `CALL SP_R_DETAIL_ITEM_FLOOR(?)`;
	const reData = await seon.DBCall(sql,[req.query.bid]);

	return res.send(reData);
});


router.get('/detail/item/clientlog', async function(req, res){
	const sql =  `CALL SP_DETAIL_ITEM_CLIENTLOG(?)`;

	const reData = await seon.DBCall(sql,[req.query.bid]);
	return res.send(reData);
});

router.get('/detail/item/clientlog2', async function(req, res){
	const sql =  `CALL SP_R_DETAIL_ITEM_CLIENTLOG(?)`;

	const reData = await seon.DBCall(sql,[req.query.bid]);
	return res.send(reData);
});

router.get('/detail/item/clienttype', async function(req, res){
	const sql =  `CALL SP_DETAIL_ITEM_CLIENT_TYPE()`;

	const reData = await seon.DBCall(sql);
	return res.send(reData);
});

router.get('/detail/item/mgrlog', async function(req, res){
	const sql =  `CALL SP_DETAIL_ITEM_MGRLOG(?)`;

	const reData = await seon.DBCall(sql,[req.query.bid]);
	return res.send(reData);
});

router.get('/detail/item/mgrlog2', async function(req, res){
	const sql =  `CALL SP_R_DETAIL_ITEM_MGRLOG(?)`;

	const reData = await seon.DBCall(sql,[req.query.bid]);
	return res.send(reData);
});


router.get('/total', async function(req, res){
	const sql =  `CALL SP_TOTAL_SEARCH(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

	const reData = await seon.DBPageCall(sql,
		[
		req.query.page,
		isEmpty(req.query.st_),
		isEmpty(req.query.bName),
		isEmpty(req.query.oName),
		isEmpty(req.query.useList),
		isEmpty(req.query.lp_S),
		isEmpty(req.query.lp_E),
		isEmpty(req.query.er_S),
		isEmpty(req.query.er_E),
		isEmpty(req.query.sub),
		isEmpty(req.query.dis),
		isEmpty(req.query.floor_S),
		isEmpty(req.query.floor_E),
		isEmpty(req.query.stList),
		isEmpty(req.query.bId),
		isEmpty(req.query.preOName),
		isEmpty(req.query.sellPrice_S),
		isEmpty(req.query.sellPrice_E),
		isEmpty(req.query.sizeP_S),
		isEmpty(req.query.sizeP_E),
		isEmpty(req.query.roadWide_S),
		isEmpty(req.query.roadWide_E),
		isEmpty(req.query.roadConer),
		isEmpty(req.query.roadDual),
		isEmpty(req.query.roadName),
		isEmpty(req.query.memUid),
		isEmpty(req.query.regDate_S),
		isEmpty(req.query.regDate_E),
		isEmpty(req.query.phone),
		isEmpty(req.query.cateList),
		isEmpty(req.query.sellDate_S),
		isEmpty(req.query.sellDate_E),
		isEmpty(req.query.remodelDate_S),
		isEmpty(req.query.remodelDate_E),
		isEmpty(req.query.buildDate_S),
		isEmpty(req.query.buildDate_E),
		isEmpty(req.query.landSizePy),
		isEmpty(req.query.totalSizePy),
		isEmpty(req.query.teamId),
		isEmpty(req.query.cateId),
		isEmpty(req.query.keyword),
		isEmpty(req.query.userId)
	]);

	return res.send(reData);
});

router.get('/total/count', async function(req, res){
	const sql =  `CALL SP_TOTAL_SEARCH_COUNT(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

	const reData = await seon.DBCall(sql,
		[
		req.query.page,
		isEmpty(req.query.st_),
		isEmpty(req.query.bName),
		isEmpty(req.query.oName),
		isEmpty(req.query.useList),
		isEmpty(req.query.lp_S),
		isEmpty(req.query.lp_E),
		isEmpty(req.query.er_S),
		isEmpty(req.query.er_E),
		isEmpty(req.query.sub),
		isEmpty(req.query.dis),
		isEmpty(req.query.floor_S),
		isEmpty(req.query.floor_E),
		isEmpty(req.query.stList),
		isEmpty(req.query.bId),
		isEmpty(req.query.preOName),
		isEmpty(req.query.sellPrice_S),
		isEmpty(req.query.sellPrice_E),
		isEmpty(req.query.sizeP_S),
		isEmpty(req.query.sizeP_E),
		isEmpty(req.query.roadWide_S),
		isEmpty(req.query.roadWide_E),
		isEmpty(req.query.roadConer),
		isEmpty(req.query.roadDual),
		isEmpty(req.query.roadName),
		isEmpty(req.query.memUid),
		isEmpty(req.query.regDate_S),
		isEmpty(req.query.regDate_E),
		isEmpty(req.query.phone),
		isEmpty(req.query.cateList),
		isEmpty(req.query.sellDate_S),
		isEmpty(req.query.sellDate_E),
		isEmpty(req.query.remodelDate_S),
		isEmpty(req.query.remodelDate_E),
		isEmpty(req.query.buildDate_S),
		isEmpty(req.query.buildDate_E),
		isEmpty(req.query.landSizePy),
		isEmpty(req.query.totalSizePy),
		isEmpty(req.query.teamId),
		isEmpty(req.query.cateId),
		isEmpty(req.query.keyword),
		isEmpty(req.query.userId)
	]);

	return res.send(reData);
});
router.get('/total/count2', async function(req, res){
	const sql =  `CALL SP_R_TOTAL_SEARCH_COUNT(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

	const reData = await seon.DBCall(sql,
		[
			req.query.page,
			isEmpty(req.query.st_),
			isEmpty(req.query.bName),
			isEmpty(req.query.oName),
			isEmpty(req.query.useList),
			isEmpty(req.query.sub),
			isEmpty(req.query.dis),
			isEmpty(req.query.floor_S),
			isEmpty(req.query.floor_E),
			isEmpty(req.query.stList),
			isEmpty(req.query.bId),
			isEmpty(req.query.preOName),
			isEmpty(req.query.roadWide_S),
			isEmpty(req.query.roadWide_E),
			isEmpty(req.query.roadConer),
			isEmpty(req.query.roadDual),
			isEmpty(req.query.roadName),
			isEmpty(req.query.memUid),
			isEmpty(req.query.regDate_S),
			isEmpty(req.query.regDate_E),
			isEmpty(req.query.phone),
			isEmpty(req.query.cateList),
			isEmpty(req.query.sellDate_S),
			isEmpty(req.query.sellDate_E),
			isEmpty(req.query.remodelDate_S),
			isEmpty(req.query.remodelDate_E),
			isEmpty(req.query.buildDate_S),
			isEmpty(req.query.buildDate_E),

			isEmpty(req.query.rent_area_S),
			isEmpty(req.query.rent_area_E),
			isEmpty(req.query.net_area_S),
			isEmpty(req.query.net_area_E),
			isEmpty(req.query.deposit_S),
			isEmpty(req.query.deposit_E),
			isEmpty(req.query.monthly_fixed_S),
			isEmpty(req.query.monthly_fixed_E),
			isEmpty(req.query.rent_py_price),
			isEmpty(req.query.free_parking),
			isEmpty(req.query.fee_paring),
			isEmpty(req.query.interior_type),
			isEmpty(req.query.keyword),
			isEmpty(req.query.userId)
	]);

	return res.send(reData);
});

router.get('/total2', async function(req, res){
	const sql =  `CALL SP_R_TOTAL_SEARCH(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

	const reData = await seon.DBPageCall(sql,
		[
		req.query.page,
		isEmpty(req.query.st_),
		isEmpty(req.query.bName),
		isEmpty(req.query.oName),
		isEmpty(req.query.useList),
		isEmpty(req.query.sub),
		isEmpty(req.query.dis),
		isEmpty(req.query.floor_S),
		isEmpty(req.query.floor_E),
		isEmpty(req.query.stList),
		isEmpty(req.query.bId),
		isEmpty(req.query.preOName),
		isEmpty(req.query.roadWide_S),
		isEmpty(req.query.roadWide_E),
		isEmpty(req.query.roadConer),
		isEmpty(req.query.roadDual),
		isEmpty(req.query.roadName),
		isEmpty(req.query.memUid),
		isEmpty(req.query.regDate_S),
		isEmpty(req.query.regDate_E),
		isEmpty(req.query.phone),
		isEmpty(req.query.cateList),
		isEmpty(req.query.sellDate_S),
		isEmpty(req.query.sellDate_E),
		isEmpty(req.query.remodelDate_S),
		isEmpty(req.query.remodelDate_E),
		isEmpty(req.query.buildDate_S),
		isEmpty(req.query.buildDate_E),

		isEmpty(req.query.rent_area_S),
		isEmpty(req.query.rent_area_E),
		isEmpty(req.query.net_area_S),
		isEmpty(req.query.net_area_E),
		isEmpty(req.query.deposit_S),
		isEmpty(req.query.deposit_E),
		isEmpty(req.query.monthly_fixed_S),
		isEmpty(req.query.monthly_fixed_E),
		isEmpty(req.query.rent_py_price),
		isEmpty(req.query.free_parking),
		isEmpty(req.query.fee_paring),
		isEmpty(req.query.interior_type),
		isEmpty(req.query.keyword),
		isEmpty(req.query.userId)
	]);

	return res.send(reData);
});


router.get('/detail/countList', async function(req, res){
	const sql =  `CALL SP_GET_COUNT(?)`;
	const userId = req.decoded.userId; //세션 유저 아이디

	const reData = await seon.DBCall(sql,[userId]);

	return res.send(reData);
});

router.get('/detail/countList2', async function(req, res){
	const sql =  `CALL SP_R_GET_COUNT(?)`;
	const userId = req.decoded.userId; //세션 유저 아이디

	const reData = await seon.DBCall(sql,[userId]);

	return res.send(reData);
});

router.post('/detail/countList', async function(req, res) {
    const sql =  `CALL SP_DELETE_COUNT(?)`;

	const reData = await seon.DBCall(sql,[req.body.viewId]);

	return res.send(true);
});

router.post('/detail/countList2', async function(req, res) {
    const sql =  `CALL SP_R_DELETE_COUNT(?)`;

	const reData = await seon.DBCall(sql,[req.body.viewId]);

	return res.send(true);
});

router.post('/mgr/log/del', async function(req, res) {
    const sql =  `CALL SP_DETAIL_ITEM_MGRLOG_DEL(?)`;

	const reData = await seon.DBCall(sql,[req.body.id]);

	return res.send(true);
});

router.post('/mgr/log/del2', async function(req, res) {
    const sql =  `CALL SP_R_DETAIL_ITEM_MGRLOG_DEL(?)`;

	const reData = await seon.DBCall(sql,[req.body.id]);

	return res.send(true);
});

router.post('/client/log/del', async function(req, res) {
    const sql =  `CALL SP_DETAIL_ITEM_CLIENTLOG_DEL(?)`;

	const reData = await seon.DBCall(sql,[req.body.id]);

	return res.send(true);
});

router.post('/client/log/del2', async function(req, res) {
    const sql =  `CALL SP_R_DETAIL_ITEM_CLIENTLOG_DEL(?)`;

	const reData = await seon.DBCall(sql,[req.body.id]);

	return res.send(true);
});

router.get('/mem', async function(req, res){
	const sql =  `CALL SP_MEM_INFO(?,?,?,?)`;
	const reData = await seon.DBPageCall(sql,[
		req.query.page,
		isEmpty(req.query.st),
		isEmpty(req.query.uName),
		isEmpty(req.query.mobile)
	]);

	return res.send(reData);
});

router.get('/mem/item', async function(req, res){
	const sql =  `CALL SP_MEM_ITEM(?)`;

	const reData = await seon.DBOneCall(sql,[req.query.mid]);
	return res.send(reData);
});

router.post('/mem/item',
	check("mem_type", "직원구분을 지정 해주세요.").not().isEmpty(),
	check("ip_free", "IP제한을 지정 해주세요.").not().isEmpty(),
	check("mem_name", "이름을 지정 해주세요.").not().isEmpty(),
	check("mem_rank_uid", "직책을 지정 해주세요.").not().isEmpty(),
	check("license_flag", "자격증을 지정 해주세요.").not().isEmpty(),
	check("sub_broker_flag", "중개보조원등록을 지정 해주세요.").not().isEmpty(),
	check("auto_buyer_assign", "매수고객자동할당을 지정 해주세요.").not().isEmpty(),
	check("hire_type", "채용구분을 지정 해주세요.").not().isEmpty(),
	check("hire_status", "재직상태을 지정 해주세요.").not().isEmpty(),
	
	async function(req, res){

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

    const sql =  `CALL SP_MEM_ITEM_UPDATE(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
	const userId = req.decoded.userId;

	let encPW = null;

	if(req.body.pwMode){
		console.log(req.body.pw);
		encPW = crypto.createHash('sha256').update(req.body.pw).digest('hex');
	}


	const reData = await seon.DBCall(sql,
		[
		userId,
		req.body.mem_type,
		req.body.ip_free,
		req.body.mem_name,
		req.body.mem_rank_uid,

		isEmpty(req.body.mem_mobile),
		isEmpty(req.body.mem_phone),
		isEmpty(req.body.team_uid),
		isEmpty(req.body.team_cate_uid),
		req.body.license_flag,

		req.body.sub_broker_flag,
		req.body.auto_buyer_assign,
		isEmpty(req.body.expert_part),
		isEmpty(req.body.mem_no),
		req.body.hire_type,
		req.body.hire_status,

		isEmpty(req.body.work_sdate),
		isEmpty(req.body.work_edate),
		isEmpty(req.body.mem_email),
		isEmpty(req.body.pay_bank_code),
		isEmpty(req.body.pay_bank_no),

		isEmpty(req.body.pay_bank_owner),
		isEmpty(req.body.memo),
		req.body.mid,

		req.body.pwMode,
		encPW,
		isEmpty(req.body.ata_level)
	]);

	return res.send(true);
});

router.post('/mem/item/add',
	check("mem_type", "직원구분을 지정 해주세요.").not().isEmpty(),
	check("ip_free", "IP제한을 지정 해주세요.").not().isEmpty(),
	check("mem_name", "이름을 지정 해주세요.").not().isEmpty(),
	check("mem_rank_uid", "직책을 지정 해주세요.").not().isEmpty(),
	check("mem_id", "아이디를 지정 해주세요.").not().isEmpty(),
	check("pw", "비밀번호를 지정 해주세요.").not().isEmpty(),
	check("license_flag", "자격증을 지정 해주세요.").not().isEmpty(),
	check("sub_broker_flag", "중개보조원등록을 지정 해주세요.").not().isEmpty(),
	check("auto_buyer_assign", "매수고객자동할당을 지정 해주세요.").not().isEmpty(),
	check("hire_type", "채용구분을 지정 해주세요.").not().isEmpty(),
	check("hire_status", "재직상태을 지정 해주세요.").not().isEmpty(),
	async function(req, res){

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

    const sql =  `CALL SP_MEM_ITEM_ADD(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
	const userId = req.decoded.userId;

	const encPW = crypto.createHash('sha256').update(req.body.pw).digest('hex');

	const reData = await seon.DBCall(sql,
		[
		userId,
		req.body.mem_type,
		req.body.ip_free,
		req.body.mem_name,
		req.body.mem_rank_uid,

		isEmpty(req.body.mem_mobile),
		isEmpty(req.body.mem_phone),
		isEmpty(req.body.team_uid),
		isEmpty(req.body.team_cate_uid),
		req.body.license_flag,

		req.body.sub_broker_flag,
		req.body.auto_buyer_assign,
		isEmpty(req.body.expert_part),
		isEmpty(req.body.mem_no),
		req.body.hire_type,
		req.body.hire_status,

		isEmpty(req.body.work_sdate),
		isEmpty(req.body.work_edate),
		isEmpty(req.body.mem_email),
		isEmpty(req.body.pay_bank_code),
		isEmpty(req.body.pay_bank_no),

		isEmpty(req.body.pay_bank_owner),
		isEmpty(req.body.memo),
		req.body.mid,

		encPW,
		req.body.mem_id,
		isEmpty(req.body.ata_level)
	]);

	return res.send(true);
});

router.post('/mem/item/delete', async function(req, res){
	const sql =  `CALL SP_MEM_ITEM_DELETE(?)`;

	const reData = await seon.DBCall(sql,[
		req.body.mid,
	]);

	return res.send(true);
});

router.get('/mem/item/check', async function(req, res){
	const sql =  `CALL SP_MEM_ITEM_CHECK(?)`;

	const reData = await seon.DBCall(sql,[
		req.query.mid
	]);

	if(reData.length){
		return res.send(true);
	}
	else{
		return res.send(false);
	}
});

router.get('/user/info', async function(req, res){
	const userId = req.decoded.userId;
	const sql =  `CALL SP_USER_GET(?)`;

	let reData = await seon.DBOneCall(sql,[userId]);
	const client_view = await seon.DBOneCall(`CALL SP_CLIENT_VIEW_CHECK()`);
	const rent_client_view = await seon.DBOneCall(`CALL SP_R_CLIENT_VIEW_CHECK()`);
	reData.client_view = client_view.cfg_val1;
	reData.rent_client_view = rent_client_view.cfg_val1;

	return res.send(reData);
});


router.get('/mem/level', async function(req, res){
	const sql =  `CALL SP_MEM_LEVEL()`;

	const reData = await seon.DBCall(sql);

	return res.send(reData);
});

router.get('/mem/code', async function(req, res){
	const sql =  `CALL SP_MEM_CODE(?)`;

	const reData = await seon.DBCall(sql,[req.query.part]);

	return res.send(reData);
});

router.post('/mem/code/add', async function(req, res){
	const sql =  `CALL SP_MEM_CODE_ADD(?,?,?,?,?,?)`;

	const userId = req.decoded.userId;

	const reData = await seon.DBCall(sql,[
		userId,
		req.body.idx,
		req.body.name,
		req.body.cnt,
		req.body.part,
		isEmpty(req.body.teamId)
	]);

	return res.send(true);
});

router.post('/mem/code/flag', async function(req, res){
	const sql =  `CALL SP_MEM_CODE_FLAG_UPDATE(?,?)`;

	const reData = await seon.DBCall(sql,[
		req.body.st,
		req.body.uid
	]);

	return res.send(true);
});

router.post('/mem/code/order', async function(req, res){
	const sql =  `CALL SP_MEM_CODE_ORDER_UPDATE(?,?)`;

	const reData = await seon.DBCall(sql,[
		req.body.uid_1,
		req.body.uid_2
	]);

	return res.send(true);
});

router.post('/mem/code/info', async function(req, res){
	const sql =  `CALL SP_MEM_CODE_INFO_UPDATE(?,?,?)`;

	const reData = await seon.DBCall(sql,[
		req.body.name,
		req.body.cnt,
		req.body.uid
	]);

	return res.send(true);
});

router.post('/mem/code/del', async function(req, res){
	const sql =  `CALL SP_MEM_CODE_DELETE(?)`;

	const reData = await seon.DBCall(sql,[
		req.body.uid
	]);

	return res.send(true);
});

router.get('/mem/log', async function(req, res){
	const sql =  `CALL SP_MEM_LOG(?)`;

	const reData = await seon.DBPageCall(sql,[
		req.query.page
	]);

	return res.send(reData);
});

router.get('/mem/avg1', async function(req, res){
	const sql =  `CALL SP_MEM_AVG1(?)`;
	const reData = await seon.DBCall(sql,[isEmpty(req.query.mode)]);

	return res.send(reData);
});

router.get('/mem/avg2', async function(req, res){
	const sql =  `CALL SP_MEM_AVG2()`;
	const reData = await seon.DBCall(sql);

	return res.send(reData);
});

router.get('/mem/avg3', async function(req, res){
	const sql =  `CALL SP_MEM_AVG3()`;
	const reData = await seon.DBCall(sql);

	return res.send(reData);
});

router.get('/setting', async function(req, res){
	const sql =  `CALL SP_SETTING(?)`;

	const reData = await seon.DBCall(sql,[req.query.part]);

	return res.send(reData);
});

router.post('/setting/add', async function(req, res){
	const sql =  `CALL SP_SETTING_ADD(?,?,?,?,?)`;
	const userId = req.decoded.userId;

	const reData = await seon.DBCall(sql,[
		userId,
		req.body.idx,
		isEmpty(req.body.var1),
		isEmpty(req.body.var2),
		req.body.part
	]);

	return res.send(true);
});

router.get('/setting/client', async function(req, res){
	const sql =  `CALL SP_SETTING_CLIENT()`;
	const reData = await seon.DBCall(sql);

	return res.send(reData);
});

router.post('/setting/client/add', async function(req, res){
	const sql =  `CALL SP_SETTING_CLIENT_ADD(?,?,?)`;
	const userId = req.decoded.userId;

	const reData = await seon.DBCall(sql,[
		userId,
		req.body.idx,
		isEmpty(req.body.var1)
	]);

	return res.send(true);
});

router.get('/setting/etc', async function(req, res){
	const sql =  `CALL SP_SETTING_ETC()`;
	const reData = await seon.DBCall(sql);

	return res.send(reData);
});

router.get('/setting/etc/mem', async function(req, res){
	const sql =  `CALL SP_SETTING_ETC_MEM()`;
	const reData = await seon.DBCall(sql);

	return res.send(reData);
});

router.post('/setting/etc/update', async function(req, res){
	const sql =  `CALL SP_SETTING_ETC_UPDATE(?,?)`;

	const reData = await seon.DBCall(sql,[
		isEmpty(req.body.val),
		req.body.uid,
	]);

	return res.send(true);
});

router.get('/setting/ip/set', async function(req, res){
	const sql =  `CALL SP_SETTING_IP_SETTING()`;
	const reData = await seon.DBCall(sql);

	return res.send(reData);
});

router.post('/setting/ip/set/update', async function(req, res){
	const sql =  `CALL SP_SETTING_IP_SETTING_UPDATE(?,?,?,?,?,?)`;

	const reData = await seon.DBCall(sql,[
		req.body.uid1,
		req.body.val1,
		req.body.uid2,
		req.body.val2,
		req.body.val3,
		req.body.val4
	]);

	return res.send(true);
});

router.get('/setting/ip', async function(req, res){
	const sql =  `CALL SP_SETTING_IP()`;
	const reData = await seon.DBCall(sql);

	return res.send(reData);
});

router.post('/setting/ip/add', async function(req, res){
	const sql =  `CALL SP_SETTING_IP_ADD(?,?,?,?)`;
	const userId = req.decoded.userId;

	const reData = await seon.DBCall(sql,[
		userId,
		req.body.idx,
		req.body.val1,
		req.body.val2
	]);

	return res.send(true);
});

router.post('/setting/update', async function(req, res){
	const sql =  `CALL SP_SETTING_UPDATE(?,?,?,?)`;

	const reData = await seon.DBCall(sql,[
		isEmpty(req.body.val1),
		isEmpty(req.body.val2),
		req.body.id,
		req.body.st
	]);

	return res.send(true);
});

router.post('/setting/update2', async function(req, res){
	const sql =  `CALL SP_SETTING_UPDATE2(?,?,?)`;

	const reData = await seon.DBCall(sql,[
		isEmpty(req.body.val1),
		isEmpty(req.body.val2),
		req.body.id
	]);

	return res.send(true);
});

router.post('/setting/delete', async function(req, res){
	const sql =  `CALL SP_SETTING_DELETE(?)`;

	const reData = await seon.DBCall(sql,[
		req.body.id
	]);

	return res.send(true);
});

router.post('/setting/idx', async function(req, res){
	const sql =  `CALL SP_SETTING_IDX(?,?)`;

	const reData = await seon.DBCall(sql,[
		req.body.id,
		req.body.idx
	]);

	return res.send(true);
});

router.get('/oper/work/log', async function(req, res){
	const mode = req.query.mode;
	if(1 == mode){
		const sql =  `CALL SP_OPER_WORK_LOG(?)`;
		const reData = await seon.DBPageCall(sql,[
			req.query.page
		]);

		return res.send(reData);
	}
	else if(2 == mode){
		const sql =  `CALL SP_R_OPER_WORK_LOG(?)`;
		const reData = await seon.DBPageCall(sql,[
			req.query.page
		]);

		return res.send(reData);
	}

	return res.send(false);
});

router.get('/oper/owner/log', async function(req, res){
	const mode = req.query.mode;
	if(1 == mode){
		const sql =  `CALL SP_OPER_OWNER_LOG(?)`;
		const reData = await seon.DBPageCall(sql,[
			req.query.page
		]);
		return res.send(reData);
	}else if(2 == mode){
		const sql =  `CALL SP_R_OPER_OWNER_LOG(?)`;
		const reData = await seon.DBPageCall(sql,[
			req.query.page
		]);
		return res.send(reData);
	}

	return res.send(false);
});

router.post('/oper/owner/log/add', async function(req, res){
	const userId = req.decoded.userId;
	const sql =  `CALL SP_OPER_OWNER_LOG_ADD(?,?,?)`;

	await seon.DBCall(sql,[
		userId,
		req.body.bid,
		req.body.memo
	]);

	return res.send(true);
});

router.post('/oper/owner/log/add2', async function(req, res){
	const userId = req.decoded.userId;
	const sql =  `CALL SP_R_OPER_OWNER_LOG_ADD(?,?,?)`;

	await seon.DBCall(sql,[
		userId,
		req.body.bid,
		req.body.memo
	]);

	return res.send(true);
});

router.get('/oper/done', async function(req, res){
	const mode = req.query.mode;
	if(1 == mode){
		const sql =  `CALL SP_OPER_DONE(?,?)`;
		const reData = await seon.DBPageCall(sql,[
			req.query.page,
			isEmpty(req.query.memId)
		]);
		return res.send(reData);
	}else if(2 == mode){
		const sql =  `CALL SP_R_OPER_DONE(?,?)`;
		const reData = await seon.DBPageCall(sql,[
			req.query.page,
			isEmpty(req.query.memId)
		]);
		return res.send(reData);
	}

	return res.send(false);
});

router.get('/user/admin', async function(req, res){
	const userId = req.decoded.userId;
	const reInfo = await seon.DBOneCall(`CALL SP_USER_GET(?)`,[userId]);
	const viewCheck = await seon.DBOneCall(`CALL SP_CLIENT_VIEW_CHECK()`);

	// if(reInfo.mem_type == 'master' || viewCheck.cfg_val1 == 'Y'){
	if(userId == 1){
		const sql =  `CALL SP_USER_ADMIN(?,?,?,?,?,?,?,?)`;
		const reData = await seon.DBPageCall(sql,[
			req.query.page,
			isEmpty(req.query.clientType),
			isEmpty(req.query.clientName),
			isEmpty(req.query.clientMobile),
			isEmpty(req.query.clientMoneyS),
			isEmpty(req.query.clientMoneyE),
			isEmpty(req.query.clientLevel),
			isEmpty(req.query.mId)
		]);

		return res.send(reData);
	}
	else{
		const sql =  `CALL SP_USER_ADMIN_MY(?,?,?,?,?,?,?,?,?)`;
		const reData = await seon.DBPageCall(sql,[
			req.query.page,
			isEmpty(req.query.clientType),
			isEmpty(req.query.clientName),
			isEmpty(req.query.clientMobile),
			isEmpty(req.query.clientMoneyS),
			isEmpty(req.query.clientMoneyE),
			isEmpty(req.query.clientLevel),
			isEmpty(req.query.mId),
			userId
		]);

		return res.send(reData);
	}
});

router.get('/user/admin/count', async function(req, res){
	const userId = req.decoded.userId;
	const reInfo = await seon.DBOneCall(`CALL SP_USER_GET(?)`,[userId]);
	const viewCheck = await seon.DBOneCall(`CALL SP_CLIENT_VIEW_CHECK()`);

	if(userId == 1){
		const sql =  `CALL SP_USER_ADMIN_COUNTLIST(?,?,?,?,?,?,?,?)`;
		const reData = await seon.DBOneCall(sql,[
			req.query.page,
			isEmpty(req.query.clientType),
			isEmpty(req.query.clientName),
			isEmpty(req.query.clientMobile),
			isEmpty(req.query.clientMoneyS),
			isEmpty(req.query.clientMoneyE),
			isEmpty(req.query.clientLevel),
			isEmpty(req.query.mId)
		]);

		return res.send(reData);
	}
	else{
		const sql =  `CALL SP_USER_ADMIN_MY_COUNTLIST(?,?,?,?,?,?,?,?,?)`;
		const reData = await seon.DBOneCall(sql,[
			req.query.page,
			isEmpty(req.query.clientType),
			isEmpty(req.query.clientName),
			isEmpty(req.query.clientMobile),
			isEmpty(req.query.clientMoneyS),
			isEmpty(req.query.clientMoneyE),
			isEmpty(req.query.clientLevel),
			isEmpty(req.query.mId),
			userId
		]);

		return res.send(reData);
	}
});

router.get('/user/admin/count/idList', async function(req, res){
	const userId = req.decoded.userId;
	const reInfo = await seon.DBOneCall(`CALL SP_USER_GET(?)`,[userId]);
	const viewCheck = await seon.DBOneCall(`CALL SP_CLIENT_VIEW_CHECK()`);

	// if(reInfo.mem_type == 'master' || viewCheck.cfg_val1 == 'Y'){
	if(userId == 1){
		const sql =  `CALL SP_USER_ADMIN_COUNTLIST(?,?,?,?,?,?,?)`;
		const reData = await seon.DBCall(sql,[
			// req.query.page,
			isEmpty(req.query.clientType),
			isEmpty(req.query.clientName),
			isEmpty(req.query.clientMobile),
			isEmpty(req.query.clientMoneyS),
			isEmpty(req.query.clientMoneyE),
			isEmpty(req.query.clientLevel),
			isEmpty(req.query.mId)
		]);

		let idList = []
		for(let i=0;i<reData.length;i++){
			idList.push(reData[i].client_uid)
		}

		return res.send(idList);
	}
	else{
		const sql =  `CALL SP_USER_ADMIN_MY_COUNTLIST(?,?,?,?,?,?,?,?)`;
		const reData = await seon.DBCall(sql,[
			// req.query.page,
			isEmpty(req.query.clientType),
			isEmpty(req.query.clientName),
			isEmpty(req.query.clientMobile),
			isEmpty(req.query.clientMoneyS),
			isEmpty(req.query.clientMoneyE),
			isEmpty(req.query.clientLevel),
			isEmpty(req.query.mId),
			userId
		]);

		let idList = []
		for(let i=0;i<reData.length;i++){
			idList.push(reData[i].client_uid)
		}

		return res.send(idList);
	}
});

router.get('/user/admin2', async function(req, res){
	const userId = req.decoded.userId;
	const reInfo = await seon.DBOneCall(`CALL SP_USER_GET(?)`,[userId]);
	const viewCheck = await seon.DBOneCall(`CALL SP_R_CLIENT_VIEW_CHECK()`);

	if(reInfo.mem_type == 'master' || viewCheck.cfg_val1 == 'Y'){
		const sql =  `CALL SP_R_USER_ADMIN(?,?,?,?,?,?,?,?,?)`;
		const reData = await seon.DBPageCall(sql,[
			req.query.page,
			isEmpty(req.query.clientType),
			isEmpty(req.query.clientName),
			isEmpty(req.query.clientMobile),
			isEmpty(req.query.monthly_rent_S),
			isEmpty(req.query.monthly_rent_E),
			isEmpty(req.query.clientLevel),
			isEmpty(req.query.mId),
			isEmpty(req.query.findArea)
		]);

		return res.send(reData);
	}else{
		const sql =  `CALL SP_R_USER_ADMIN_MY(?,?,?,?,?,?,?,?,?,?)`;
		const reData = await seon.DBPageCall(sql,[
			req.query.page,
			isEmpty(req.query.clientType),
			isEmpty(req.query.clientName),
			isEmpty(req.query.clientMobile),
			isEmpty(req.query.monthly_rent_S),
			isEmpty(req.query.monthly_rent_E),
			isEmpty(req.query.clientLevel),
			isEmpty(req.query.mId),
			isEmpty(req.query.findArea),
			userId
		]);

		return res.send(reData);
	}
});

router.get('/user/admin/count2', async function(req, res){
	const userId = req.decoded.userId;
	const reInfo = await seon.DBOneCall(`CALL SP_USER_GET(?)`,[userId]);
	const viewCheck = await seon.DBOneCall(`CALL SP_R_CLIENT_VIEW_CHECK()`);

	if(reInfo.mem_type == 'master' || viewCheck.cfg_val1 == 'Y'){
		const sql =  `CALL SP_R_USER_ADMIN_COUNTLIST(?,?,?,?,?,?,?,?,?)`;
		const reData = await seon.DBOneCall(sql,[
			req.query.page,
			isEmpty(req.query.clientType),
			isEmpty(req.query.clientName),
			isEmpty(req.query.clientMobile),
			isEmpty(req.query.monthly_rent_S),
			isEmpty(req.query.monthly_rent_E),
			isEmpty(req.query.clientLevel),
			isEmpty(req.query.mId),
			isEmpty(req.query.findArea)
		]);

		return res.send(reData);
	}else{
		const sql =  `CALL SP_R_USER_ADMIN_MY_COUNTLIST(?,?,?,?,?,?,?,?,?,?)`;
		const reData = await seon.DBOneCall(sql,[
			req.query.page,
			isEmpty(req.query.clientType),
			isEmpty(req.query.clientName),
			isEmpty(req.query.clientMobile),
			isEmpty(req.query.monthly_rent_S),
			isEmpty(req.query.monthly_rent_E),
			isEmpty(req.query.clientLevel),
			isEmpty(req.query.mId),
			isEmpty(req.query.findArea),
			userId
		]);

		return res.send(reData);
	}
});

router.post('/user/admin/add',
	check("mgrUid", "담장자 지정 해주세요.").not().isEmpty(),
	check("clientType", "고객구분을 지정 해주세요.").not().isEmpty(),
	check("clientName", "고객명을 지정 해주세요.").not().isEmpty(),
	async function(req, res){

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const sql =  `CALL SP_USER_ADMIN_ADD(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
	const userId = req.decoded.userId;

	const reData = await seon.DBOriginCall(sql,[
		userId,
		req.body.mgrUid,
		req.body.mgrLevel,
		req.body.clientType,
		req.body.clientName,
		req.body.clientMobile1,
		req.body.clientMobile2,
		req.body.clientMobileMemo1,
		req.body.clientMobileMemo2,
		req.body.clientEmail,
		req.body.clientMemo,
		req.body.findMoneyS,
		req.body.findMoneyE,
		req.body.havingMoney,
		req.body.findArea
	]);

	if(reData.length < 3){
		return res.json({
			error: true,
			info : reData[0][0]
		});
	}else{
		return res.send(true);
	}
});

router.post('/user/admin/add2',
	check("mgrUid", "담장자 지정 해주세요.").not().isEmpty(),
	check("clientType", "고객구분을 지정 해주세요.").not().isEmpty(),
	check("clientName", "고객명을 지정 해주세요.").not().isEmpty(),
	async function(req, res){

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	let u_userId = null;
	const u_reData = await seon.DBOneCall(`CALL SP_U_USER_GET_PHONE(?)`,[
		req.body.clientMobile1
	]);

	if(!u_reData){
		await seon.DBOriginCall(`CALL SP_U_USER_ADD(?)`,[
			req.body.clientMobile1
		]);

		const u_reData = await seon.DBOneCall(`CALL SP_U_USER_GET_PHONE(?)`,[
			req.body.clientMobile1
		]);

		u_userId = u_reData.id
	}else{
		const reErr = await seon.DBOneCall(`CALL SP_R_USER_ADMIN_ADD_CHECK(?)`,[
			u_reData.id
		]);

		return res.json({
			error: true,
			info : reErr
		});
	}


	const sql =  `CALL SP_R_USER_ADMIN_ADD(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
	const userId = req.decoded.userId;


	const rent_area_py = Number((req.body.rent_area_m2 * 0.3025).toFixed(2));
	const net_area_py = Number((req.body.net_area_m2 * 0.3025).toFixed(2));
	const req_area_m2 = Number((req.body.req_area_py * PY_M2_EX).toFixed(2));
	const req_area_m2_E = Number((req.body.req_area_py_E * PY_M2_EX).toFixed(2));

	const reData = await seon.DBOriginCall(sql,[
		userId,
		req.body.mgrUid,
		req.body.mgrLevel,
		req.body.clientType,
		req.body.clientName,
		req.body.clientMobile1,
		req.body.clientMobile2,
		req.body.clientMobileMemo1,
		req.body.clientMobileMemo2,
		req.body.clientEmail,
		req.body.clientMemo,
		req.body.findArea,

		req.body.deposit,
		req.body.monthly_rent,
		req.body.main_fee,
		req.body.rent_area_m2,
		rent_area_py,
		req.body.net_area_m2,
		net_area_py,
		isEmpty(req.body.end_date),
		req.body.monthly_fixed,
		req_area_m2,
		req.body.req_area_py,
		isEmpty(req.body.addr),

		isEmpty(req.body.company),
		isEmpty(req.body.officeSt),
		isEmpty(req.body.likePick),
		isEmpty(req.body.conditions),
		isEmpty(req.body.inDate),
		isEmpty(req.body.sector),
		isEmpty(req.body.interior),
		isEmpty(req.body.route),

		req_area_m2_E,
		req.body.req_area_py_E,
		req.body.monthly_rent_E,
		u_userId
	]);





	if(reData.length < 3){
		return res.json({
			error: true,
			info : reData[0][0]
		});
	}else{
		return res.send(true);
	}
});

router.post('/user/admin/delete', async function(req, res){
	const sql =  `CALL SP_USER_ADMIN_DELETE(?)`;

	const reData = await seon.DBCall(sql,[
		req.body.cid
	]);

	return res.send(true);
});

router.post('/user/admin/delete2', async function(req, res){
	const sql =  `CALL SP_R_USER_ADMIN_DELETE(?,?)`;

	const reData = await seon.DBCall(sql,[
		req.body.cid,
		req.body.userId
	]);

	return res.send(true);
});

router.get('/user/admin/detail', async function(req, res){
	const sql =  `CALL SP_USER_ADMIN_DETAIL(?)`;

	const reData = await seon.DBOneCall(sql,[
		req.query.cid
	]);

	return res.send(reData);
});

router.get('/user/admin/detail2', async function(req, res){
	const sql =  `CALL SP_R_USER_ADMIN_DETAIL(?)`;

	const reData = await seon.DBOneCall(sql,[
		req.query.cid
	]);

	return res.send(reData);
});

router.get('/user/admin/detail/count', async function(req, res){
	const sql =  `CALL SP_USER_ADMIN_COUNT(?,?)`;
	const userId = req.decoded.userId; //세션 유저 아이디

	const reData = await seon.DBPageCall(sql,[userId, req.query.page]);

	return res.send(reData);
});

router.get('/user/admin/detail/count/count', async function(req, res){
	const sql =  `CALL SP_USER_ADMIN_COUNT_COUNT(?,?)`;
	const userId = req.decoded.userId; //세션 유저 아이디

	const reData = await seon.DBOneCall(sql,[userId, req.query.page]);

	return res.send(reData);
});

router.get('/user/admin/detail/count2', async function(req, res){
	const sql =  `CALL SP_R_USER_ADMIN_COUNT(?,?)`;
	const userId = req.decoded.userId; //세션 유저 아이디

	const reData = await seon.DBPageCall(sql,[userId, req.query.page]);

	return res.send(reData);
});

router.get('/user/admin/detail/count/count2', async function(req, res){
	const sql =  `CALL SP_R_USER_ADMIN_COUNT_COUNT(?,?)`;
	const userId = req.decoded.userId; //세션 유저 아이디

	const reData = await seon.DBOneCall(sql,[userId, req.query.page]);

	return res.send(reData);
});

router.post('/user/admin/detail/brief/add', async function(req, res){
	const sql =  `CALL SP_USER_ADMIN_BRIEF_ADD(?,?,?)`;
	const userId = req.decoded.userId; //세션 유저 아이디

	const reData = await seon.DBCall(sql,[userId,req.body.cid,req.body.bid]);

	return res.send(true);
});

router.post('/user/admin/detail/brief2/add', async function(req, res){
	const sql =  `CALL SP_R_USER_ADMIN_BRIEF_ADD(?,?,?)`;
	const userId = req.decoded.userId; //세션 유저 아이디

	const reData = await seon.DBCall(sql,[userId,req.body.cid,req.body.bid]);

	return res.send(true);
});


router.post('/user/admin/detail/brief/addList', async function(req, res){
	const sql =  `CALL SP_USER_ADMIN_BRIEF_ADD(?,?,?)`;
	const userId = req.decoded.userId; //세션 유저 아이디

	const bidList = req.body.bidList;
	const cidList = req.body.brifList;

	for (let i = 0; i < bidList.length; i++) {
		for (let j = 0; j < cidList.length; j++) {
			await seon.DBCall(sql,[userId,cidList[j],bidList[i]]);
		}
	}

	return res.send(true);
});

router.post('/user/admin/detail/brief2/addList', async function(req, res){
	const sql =  `CALL SP_R_USER_ADMIN_BRIEF_ADD(?,?,?)`;
	const userId = req.decoded.userId; //세션 유저 아이디

	const bidList = req.body.bidList;
	const cidList = req.body.brifList;

	for (let i = 0; i < bidList.length; i++) {
		for (let j = 0; j < cidList.length; j++) {
			await seon.DBCall(sql,[userId,cidList[j],bidList[i]]);
		}
	}

	return res.send(true);
});

router.get('/user/admin/detail/brief', async function(req, res){
	const sql =  `CALL SP_USER_ADMIN_BRIEF(?)`;

	const reData = await seon.DBCall(sql,[req.query.cid]);

	return res.send(reData);
});

router.get('/user/admin/detail/brief2', async function(req, res){
	const sql =  `CALL SP_R_USER_ADMIN_BRIEF(?)`;

	const reData = await seon.DBCall(sql,[req.query.cid]);

	return res.send(reData);
});

router.post('/user/admin/detail/brief/done', async function(req, res){
	const sql =  `CALL SP_USER_ADMIN_BRIEF_DONE(?,?,?)`;
	const userId = req.decoded.userId; //세션 유저 아이디

	const reData = await seon.DBCall(sql,[userId,req.body.lid,req.body.price]);

	return res.send(true);
});

router.post('/user/admin/detail/brief2/done', async function(req, res){
	const sql =  `CALL SP_R_USER_ADMIN_BRIEF_DONE(?,?,?)`;
	const userId = req.decoded.userId; //세션 유저 아이디

	const reData = await seon.DBCall(sql,[userId,req.body.lid,req.body.price]);

	return res.send(true);
});

router.post('/user/admin/detail/brief/delete', async function(req, res){
	const sql =  `CALL SP_USER_ADMIN_BRIEF_DELETE(?)`;

	const reData = await seon.DBCall(sql,[req.body.lid]);

	return res.send(true);
});

router.post('/user/admin/detail/brief2/delete', async function(req, res){
	const sql =  `CALL SP_R_USER_ADMIN_BRIEF_DELETE(?)`;

	const reData = await seon.DBCall(sql,[req.body.lid]);

	return res.send(true);
});

router.get('/user/admin/detail/counsel', async function(req, res){
	const sql =  `CALL SP_USER_ADMIN_COUNSEL(?)`;

	const reData = await seon.DBCall(sql,[req.query.cid]);

	return res.send(reData);
});

router.get('/user/admin/detail/counsel2', async function(req, res){
	const sql =  `CALL SP_R_USER_ADMIN_COUNSEL(?)`;

	const reData = await seon.DBCall(sql,[req.query.cid]);

	return res.send(reData);
});

router.get('/user/admin/detail/counsel/type', async function(req, res){
	const sql =  `CALL SP_USER_ADMIN_COUNSEL_TYPE()`;

	const reData = await seon.DBCall(sql);

	return res.send(reData);
});

router.post('/user/admin/detail/counsel/add', async function(req, res){
	const sql =  `CALL SP_USER_ADMIN_COUNSEL_ADD(?,?,?,?)`;
	const userId = req.decoded.userId; //세션 유저 아이디

	const reData = await seon.DBCall(sql,[
		userId,
		req.body.cid,
		req.body.subId,
		req.body.memo
	]);

	return res.send(true);
});

router.post('/user/admin/detail/counsel2/add', async function(req, res){
	const sql =  `CALL SP_R_USER_ADMIN_COUNSEL_ADD(?,?,?,?)`;
	const userId = req.decoded.userId; //세션 유저 아이디

	const reData = await seon.DBCall(sql,[
		userId,
		req.body.cid,
		req.body.subId,
		req.body.memo
	]);

	return res.send(true);
});

router.post('/user/admin/detail/counsel/update',
	check("mgrUid", "담장자 지정 해주세요.").not().isEmpty(),
	check("clientType", "고객구분을 지정 해주세요.").not().isEmpty(),
	check("clientName", "고객명을 지정 해주세요.").not().isEmpty(),
	async function(req, res){

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const sql =  `CALL SP_USER_ADMIN_UPDATE(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
	const userId = req.decoded.userId;

	const reData = await seon.DBOriginCall(sql,[
		userId,
		req.body.mgrUid,
		req.body.mgrLevel,
		req.body.clientType,
		req.body.clientName,
		req.body.clientMobile1,
		req.body.clientMobile2,
		req.body.clientMobileMemo1,
		req.body.clientMobileMemo2,
		req.body.clientEmail,
		req.body.clientMemo,
		req.body.findMoneyS,
		req.body.findMoneyE,
		req.body.havingMoney,
		req.body.findArea,
		req.body.cid
	]);

	if(reData.length < 3){
		return res.json({
			error: true,
			info : reData[0][0]
		});
	}else{
		return res.send(true);
	}
});

router.post('/user/admin/detail/counsel2/update',
	check("mgrUid", "담장자 지정 해주세요.").not().isEmpty(),
	check("clientType", "고객구분을 지정 해주세요.").not().isEmpty(),
	check("clientName", "고객명을 지정 해주세요.").not().isEmpty(),
	async function(req, res){

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const sql =  `CALL SP_R_USER_ADMIN_UPDATE(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
	const userId = req.decoded.userId;


	const rent_area_py = Number((req.body.rent_area_m2 * 0.3025).toFixed(2));
	const net_area_py = Number((req.body.net_area_m2 * 0.3025).toFixed(2));
	const req_area_m2 = Number((req.body.req_area_py * PY_M2_EX).toFixed(2));
	const req_area_m2_E = Number((req.body.req_area_py_E * PY_M2_EX).toFixed(2));

	const reData = await seon.DBOriginCall(sql,[
		userId,
		req.body.mgrUid,
		req.body.mgrLevel,
		req.body.clientType,
		req.body.clientName,
		req.body.clientMobile1,
		req.body.clientMobile2,
		req.body.clientMobileMemo1,
		req.body.clientMobileMemo2,
		req.body.clientEmail,
		req.body.clientMemo,
		req.body.findArea,

		req.body.deposit,
		req.body.monthly_rent,
		req.body.main_fee,
		req.body.rent_area_m2,
		rent_area_py,
		req.body.net_area_m2,
		net_area_py,
		isEmpty(req.body.end_date),
		req.body.monthly_fixed,
		req_area_m2,
		req.body.req_area_py,
		isEmpty(req.body.addr),

		isEmpty(req.body.company),
		isEmpty(req.body.officeSt),
		isEmpty(req.body.likePick),
		isEmpty(req.body.conditions),
		isEmpty(req.body.inDate),
		isEmpty(req.body.sector),
		isEmpty(req.body.interior),
		isEmpty(req.body.route),

		req.body.cid,

		req_area_m2_E,
		req.body.req_area_py_E,
		req.body.monthly_rent_E
	]);

	if(reData.length < 3){
		return res.json({
			error: true,
			info : reData[0][0]
		});
	}else{
		return res.send(true);
	}
});

router.get('/user/admin/detail/building', async function(req, res){
	const sql =  `CALL SP_USER_ADMIN_BUILDING(?,?,?)`;

	const reData = await seon.DBPageCall(sql,[req.query.page, isEmpty(req.query.keyword), isEmpty(req.query.st)]);

	return res.send(reData);
});

router.get('/user/admin/detail/building/count', async function(req, res){
	const sql =  `CALL SP_USER_ADMIN_BUILDING_COUNT(?,?,?)`;

	const reData = await seon.DBOneCall(sql,[req.query.page, isEmpty(req.query.keyword), isEmpty(req.query.st)]);

	return res.send(reData);
});

router.get('/user/admin/detail/building2', async function(req, res){
	const sql =  `CALL SP_R_USER_ADMIN_BUILDING(?,?,?)`;

	const reData = await seon.DBPageCall(sql,[req.query.page, isEmpty(req.query.keyword), isEmpty(req.query.st)]);

	return res.send(reData);
});

router.get('/user/admin/detail/building/count2', async function(req, res){
	const sql =  `CALL SP_R_USER_ADMIN_BUILDING_COUNT(?,?,?)`;

	const reData = await seon.DBOneCall(sql,[req.query.page, isEmpty(req.query.keyword), isEmpty(req.query.st)]);

	return res.send(reData);
});

router.get('/working', async function(req, res){
	const sql =  `CALL SP_WORKING(?,?,?,?,?)`;

	const reData = await seon.DBPageCall(sql,[
		req.query.page,
		isEmpty(req.query.st),
		isEmpty(req.query.bName),
		isEmpty(req.query.addr),
		isEmpty(req.query.mid)
	]);

	return res.send(reData);
});

router.get('/working2', async function(req, res){
	const sql =  `CALL SP_R_WORKING(?,?,?,?,?)`;

	const reData = await seon.DBPageCall(sql,[
		req.query.page,
		isEmpty(req.query.st),
		isEmpty(req.query.bName),
		isEmpty(req.query.addr),
		isEmpty(req.query.mid)
	]);

	return res.send(reData);
});

router.post('/create/building',
	check("name", "물건명을 입력해주세요.").not().isEmpty(),
	async function(req, res){

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const userId = req.decoded.userId;

	const pnu = await seon.getPUNCode(req.body.jibun_addr);

	if(!pnu){
		return res.send({st: false, item: null});
	}


	if(req.body.isRent){
		if(req.body.mode){
			const reCheck = await seon.DBCall(`CALL SP_R_BUILDING_CHECK(?)`,pnu);

			if(reCheck.length){
				return res.send({st: false, item: reCheck});
			}
		}

		let building_uid = null;

		const reData = await seon.DBOneCall(`CALL SP_R_BUILDING_CREATE(?,?,?,?,?,?,?,?,?)`,[
			userId,
			req.body.zonecode,
			isEmpty(req.body.road_addr),
			req.body.jibun_addr,
			req.body.lat,
			req.body.lng,
			req.body.name,
			pnu,
			pnu[10]
		]);

		building_uid = reData.building_uid;

		await seon.DBOneCall(`CALL SP_R_WORKING_ADD(?,?)`,[userId,building_uid]);

		const st = await seon.APIRentBuildingUpdate(userId, building_uid);

		// if(!st){
		// 	return res.send({st: false, item: null});
		// }

		if(st =='01'){
			return res.send({st: false, item: null, msg: '표제부 없음'});
		}
		else if(st == false){
			return res.send({st: false, item: null});
		}
	}else{
		if(req.body.mode){
			const reCheck = await seon.DBCall(`CALL SP_BUILDING_CHECK(?)`,pnu);

			if(reCheck.length){
				return res.send({st: false, item: reCheck});
			}

		}

		let building_uid = null;

		const reData = await seon.DBOneCall(`CALL SP_BUILDING_CREATE(?,?,?,?,?,?,?,?,?,?)`,[
			userId,
			req.body.zonecode,
			isEmpty(req.body.road_addr),
			req.body.jibun_addr,
			seon.shortAdr(req.body.jibun_addr),
			req.body.lat,
			req.body.lng,
			req.body.name,
			pnu,
			pnu[10]
		]);

		building_uid = reData.building_uid;

		

		

		await seon.DBCall(`CALL SP_WORKING_ADD(?,?)`,[userId,building_uid]);

		const mem = await seon.DBOneCall(`CALL SP_MEM_RANK_GET(?)`,[userId]);
		const work = await seon.DBOneCall(`CALL SP_BUILDING_WORKING_GET(?)`,[building_uid]);
		
		await seon.AddMgrLog(req,
			userId,
			building_uid,
			null,
			'building',
			'chg_info',
			'sell_status',
			`작업중: ${mem.mem_name} ${mem.mem_rank ?? ''}(${dayjs(work.working_sdate).format('YYYY.MM.DD')}~${dayjs(work.working_edate).format('YYYY.MM.DD')})`
		);

		const st = await seon.APIBuildingUpdate(userId, building_uid);
		if(st =='01'){
			return res.send({st: false, item: null, msg: '표제부 없음'});
		}
		else if(st == false){
			return res.send({st: false, item: null});
		}
	}

	return res.send({st: true, item: null});
});

router.post('/detail/item/print', async function(req, res){
	const userId = req.decoded.userId; //세션 유저 아이디
	const sql =  `CALL SP_DETAIL_ITEM_PRINT_ADD(?,?)`;


	for(let i=0;i<req.body.bidList.length;i++){
		const bid = req.body.bidList[i];

		await seon.DBOriginCall(sql,[
			userId, bid
		]);
	}

	return res.send(true);
});

router.post('/detail/item/print2', async function(req, res){
	const userId = req.decoded.userId; //세션 유저 아이디
	const sql =  `CALL SP_R_DETAIL_ITEM_PRINT_ADD(?,?)`;

	for(let i=0;i<req.body.bidList.length;i++){
		const bid = req.body.bidList[i];

		await seon.DBOriginCall(sql,[
			userId, bid
		]);
	}

	return res.send(true);
});

router.get('/detail/item/view', async function(req, res){
	const sql =  `CALL SP_DETAIL_ITEM_VIEW_GET(?)`;

	const reData = await seon.DBOriginCall(sql,[
		req.query.bid
	]);

	let viewObj = {
		max_view_cnt: '0',
		max_print_cnt: '0',
		today_view_cnt: '0',
		today_print_cnt: '0',
	};

	if(!reData){
		return res.send(false);
	}

	if(reData[0].length){
		viewObj.max_view_cnt = reData[0][0].max_view_cnt;
		viewObj.max_print_cnt = reData[0][0].max_print_cnt;
	}

	if(reData[1].length){
		viewObj.today_view_cnt = reData[1][0].today_view_cnt;
		viewObj.today_print_cnt = reData[1][0].today_print_cnt;
	}


	return res.send(viewObj);
});

router.get('/detail/item/view2', async function(req, res){
	const sql =  `CALL SP_R_DETAIL_ITEM_VIEW_GET(?)`;

	const reData = await seon.DBOriginCall(sql,[
		req.query.bid
	]);

	let viewObj = {
		max_view_cnt: '0',
		max_print_cnt: '0',
		today_view_cnt: '0',
		today_print_cnt: '0',
	};

	if(!reData){
		return res.send(false);
	}

	if(reData[0].length){
		viewObj.max_view_cnt = reData[0][0].max_view_cnt;
		viewObj.max_print_cnt = reData[0][0].max_print_cnt;
	}

	if(reData[1].length){
		viewObj.today_view_cnt = reData[1][0].today_view_cnt;
		viewObj.today_print_cnt = reData[1][0].today_print_cnt;
	}


	return res.send(viewObj);
});


router.get('/detail/item/edit/land', async function(req, res){
	const sql =  `CALL SP_DETAIL_LAND(?)`;

	const reData = await seon.DBCall(sql,[
		req.query.bid
	]);

	return res.send(reData);
});

router.get('/detail/item/edit/land2', async function(req, res){
	const sql =  `CALL SP_R_DETAIL_LAND(?)`;

	const reData = await seon.DBCall(sql,[
		req.query.bid
	]);

	return res.send(reData);
});

router.post('/detail/item/floor/edit', async function(req, res){
	const userId = req.decoded.userId;

	const floorList = req.body.floorList;
	const floorGroup = req.body.floorGroup;

	for(let i=0;i<floorList.length;i++){
		await seon.DBCall(`CALL SP_DETAIL_ITEM_FLOOR_EDIT(?,?,?)`,[
			floorList[i].chk_pa,
			floorList[i].chk_except,
			floorList[i].building_floor_uid
		]);
	}

	// const reFloor = await seon.DBCall(`CALL SP_DETAIL_ITEM_FLOOR(?)`,[req.body.bid]);

	await seon.DBCall(`CALL SP_DETAIL_ITEM_RENT_DELETE(?)`,[req.body.bid]);
	// SP_DETAIL_ITEM_FLOOR_EDIT2

	for(let i=0;i<floorGroup.length;i++){
		const flrNoNm = floorGroup[i].flrNoNm;
		const rent_py = floorGroup[i].rent_py;
		const rent_m2 = rent_py * PY_M2_EX;


		await seon.DBCall(`CALL SP_DETAIL_ITEM_FLOOR_EDIT2(?,?,?,?,?)`,[
			userId,
			req.body.bid,
			flrNoNm,
			rent_py,
			rent_m2
		]);
	}

	return res.send(false);
});

router.post('/detail/item/floor/edit2', async function(req, res){
	const userId = req.decoded.userId;

	const floorList = req.body.floorList;
	const floorGroup = req.body.floorGroup;

	for(let i=0;i<floorList.length;i++){
		await seon.DBCall(`CALL SP_R_DETAIL_ITEM_FLOOR_EDIT(?,?,?)`,[
			floorList[i].chk_pa,
			floorList[i].chk_except,
			floorList[i].building_floor_uid
		]);
	}

	// const reFloor = await seon.DBCall(`CALL SP_DETAIL_ITEM_FLOOR(?)`,[req.body.bid]);

	await seon.DBCall(`CALL SP_R_DETAIL_ITEM_RENT_DELETE(?)`,[req.body.bid]);
	// SP_DETAIL_ITEM_FLOOR_EDIT2

	for(let i=0;i<floorGroup.length;i++){
		const flrNoNm = floorGroup[i].flrNoNm;
		const rent_py = floorGroup[i].rent_py;
		const rent_m2 = rent_py * PY_M2_EX;


		await seon.DBCall(`CALL SP_R_DETAIL_ITEM_FLOOR_EDIT2(?,?,?,?,?)`,[
			userId,
			req.body.bid,
			flrNoNm,
			rent_py,
			rent_m2
		]);
	}

	return res.send(false);
});

router.get('/cate/get', async function(req, res){
	const sql =  `CALL SP_CATE_GET(?)`;

	const reData = await seon.DBCall(sql,[
		req.query.bid
	]);

	let re = [];
	for(let i=0;i<reData.length;i++){
		re.push(reData[i].cid);
	}


	return res.send(re.map(String));
});

router.get('/cate2/get', async function(req, res){
	const sql =  `CALL SP_R_CATE_GET(?)`;

	const reData = await seon.DBCall(sql,[
		req.query.bid
	]);

	let re = [];
	for(let i=0;i<reData.length;i++){
		re.push(reData[i].cid);
	}

	return res.send(re.map(String));
});


router.post('/detail/item/save', async function(req, res){
	const userId = req.decoded.userId;
	let newBuilding = req.body.item;
	const building_done_log_flag = req.body.building_done_log_flag;
	const building_hold_log_flag = req.body.building_hold_log_flag;

	const oldBuilding = await seon.DBOneCall(`CALL SP_DETAIL_ITEM(?)`,[newBuilding.building_uid]);
	let today = dayjs();

	if(oldBuilding.ex_sum_mgr_fee_out == 0){
		oldBuilding.ex_sum_mgr_fee_out = 0;
	}

	if(newBuilding.ex_sum_mgr_fee_out == 0){
		newBuilding.ex_sum_mgr_fee_out = 0;
	}

	const doneLog = await seon.DBCall(`CALL SP_CHECK_DONE_LOG(?,?)`,[newBuilding.building_uid,userId]);

	//진행상태 로그
	if(isEmpty(newBuilding.sell_status) != isEmpty(oldBuilding.sell_status)){
		await seon.AddMgrLog(req,
			userId,
			newBuilding.building_uid,
			null,
			'building',
			'chg_info',
			'sell_status',
			seon.sellStatus[oldBuilding.sell_status] + '→' + seon.sellStatus[newBuilding.sell_status]
		);

		if(newBuilding.sell_status == "done"){
			// if(building_done_log_flag){
				// if(!doneLog.length){
					await seon.DBCall(`CALL SP_DEL_DONE_LOG(?,?)`,[newBuilding.building_uid,userId]);
					await seon.DBCall(`CALL SP_ADD_DONE_LOG(?,?)`,[newBuilding.building_uid,userId]);
				// }
			// }

			await seon.DBCall(`CALL SP_RESET_WORKING(?)`,[newBuilding.building_uid]);
		}

		if(oldBuilding.sell_status == "ready" && newBuilding.sell_status == "hold"){

		}

		if(oldBuilding.sell_status == "done" && newBuilding.sell_status == "hold"){
		}
	}

	//상태 로그
	if(isEmpty(newBuilding.chk_status) != isEmpty(oldBuilding.chk_status)) {
		await seon.AddMgrLog(
			req,
			userId,
			newBuilding.building_uid,
			null,
			'building',
			'chg_info',
			'chk_status',
			seon.chkStatus[oldBuilding.chk_status] + '→' + seon.chkStatus[newBuilding.chk_status]
		);
	}

	//물건명 로그
	if(isEmpty(newBuilding.building_name) != isEmpty(oldBuilding.building_name)) {
		await seon.AddMgrLog(
			req,
			userId,
			newBuilding.building_uid,
			null,
			'building',
			'chg_info',
			'building_name',
			oldBuilding.building_name + '→' + newBuilding.building_name
		);
	}

	//담당자 로그
	if(isEmpty(newBuilding.building_mem_uid) != isEmpty(oldBuilding.building_mem_uid)) {
		const newMem = await seon.DBOneCall(`CALL SP_MEM_ITEM(?)`,[newBuilding.building_mem_uid]);

		await seon.AddMgrLog(
			req,
			userId,
			newBuilding.building_uid,
			null,
			'building',
			'chg_info',
			'building_mem_uid',
			oldBuilding.building_mem_name + '→' + newMem.mem_name
		);
	}

	//입금가 로그
	if(isEmpty(newBuilding.ins_price) != isEmpty(oldBuilding.ins_price)) {
		await seon.AddMgrLog(
			req,
			userId,
			newBuilding.building_uid,
			null,
			'building',
			'chg_info',
			'ins_price',
			oldBuilding.ins_price + '→' + newBuilding.ins_price
		);
	}

	//매매 금액
	if(isEmpty(newBuilding.sell_price) != isEmpty(oldBuilding.sell_price)) {
		await seon.AddMgrLog(
			req,
			userId,
			newBuilding.building_uid,
			null,
			'building',
			'chg_info',
			'sell_price',
			oldBuilding.sell_price + '→' + newBuilding.sell_price
		);
	}

	//자동 - 건물평당가격
	let building_price = newBuilding.building_price_py_price * newBuilding.total_size_p;
	if (isEmpty(oldBuilding.building_price) != isEmpty(building_price)) {
		await seon.AddMgrLog(
			req,
			userId,
			newBuilding.building_uid,
			null,
			'building',
			'chg_info',
			'building_price',
			oldBuilding.building_price + '→' + building_price
		);
	}

	//  자동 - 토지가격 = 매매금액 - 건물가격
	let land_price = newBuilding.sell_price - building_price;
	let land_price_py_price = 0;   //  건물평당가격
	if(newBuilding.land_size_p > 0) { land_price_py_price = land_price / newBuilding.land_size_p; }

	let total_size_py_price = 0;
	if(newBuilding.total_size_p > 0) { total_size_py_price = newBuilding.sell_price / newBuilding.total_size_p; }

	//보증금
	if(isEmpty(newBuilding.ex_sum_rent_deposit) != isEmpty(oldBuilding.ex_sum_rent_deposit)) {
		await seon.AddMgrLog(
			req,
			userId,
			newBuilding.building_uid,
			null,
			'building',
			'chg_info',
			'ex_sum_rent_deposit',
			oldBuilding.ex_sum_rent_deposit + '→' + newBuilding.ex_sum_rent_deposit
		);
	}

	//월임대료
	if(isEmpty(newBuilding.ex_sum_rent_money) != isEmpty(oldBuilding.ex_sum_rent_money)) {
		await seon.AddMgrLog(
			req,
			userId,
			newBuilding.building_uid,
			null,
			'building',
			'chg_info',
			'ex_sum_rent_money',
			oldBuilding.ex_sum_rent_money + '→' + newBuilding.ex_sum_rent_money
		);
	}

	//관리비
	if(isEmpty(newBuilding.ex_sum_mgr_fee) != isEmpty(oldBuilding.ex_sum_mgr_fee)) {
		await seon.AddMgrLog(
			req,
			userId,
			newBuilding.building_uid,
			null,
			'building',
			'chg_info',
			'ex_sum_mgr_fee',
			oldBuilding.ex_sum_mgr_fee + '→' + newBuilding.ex_sum_mgr_fee
		);
	}

	//관리비지출
	if(isEmpty(newBuilding.ex_sum_mgr_fee_out) != isEmpty(oldBuilding.ex_sum_mgr_fee_out)) {
		await seon.AddMgrLog(
			req,
			userId,
			newBuilding.building_uid,
			null,
			'building',
			'chg_info',
			'ex_sum_mgr_fee_out',
			oldBuilding.ex_sum_mgr_fee_out + '→' + newBuilding.ex_sum_mgr_fee_out
		);
	}

	//소유자정보 - 성명
	if(isEmpty(newBuilding.owner_name) != isEmpty(oldBuilding.owner_name)) {
		await seon.AddMgrLog(
			req,
			userId,
			newBuilding.building_uid,
			null,
			'building',
			'chg_info',
			'owner_info',
			oldBuilding.owner_name + '→' + newBuilding.owner_name
		);
	}

	//소유자정보 - 자택전화
	if(isEmpty(newBuilding.owner_home_phone) != isEmpty(oldBuilding.owner_home_phone)) {
		await seon.AddMgrLog(
			req,
			userId,
			newBuilding.building_uid,
			null,
			'building',
			'chg_info',
			'owner_info',
			oldBuilding.owner_home_phone + '→' + newBuilding.owner_home_phone
		);
	}

	//소유자정보 - 회사전화
	if(isEmpty(newBuilding.owner_office_phone) != isEmpty(oldBuilding.owner_office_phone)) {
		await seon.AddMgrLog(
			req,
			userId,
			newBuilding.building_uid,
			null,
			'building',
			'chg_info',
			'owner_info',
			oldBuilding.owner_office_phone +'/'+oldBuilding.owner_office_phone_memo+ '→' + newBuilding.owner_office_phone + '/' +newBuilding.owner_office_phone_memo
		);
	}

	//소유자정보 - 휴대폰 / 메모(1 ~ 5)
	if(isEmpty(newBuilding.owner_mobile_1) != isEmpty(oldBuilding.owner_mobile_1)) {
		await seon.AddMgrLog(
			req,
			userId,
			newBuilding.building_uid,
			null,
			'building',
			'chg_info',
			'owner_info',
			oldBuilding.owner_mobile_1 +'/'+oldBuilding.owner_mobile_1_memo+ '→' + newBuilding.owner_mobile_1 + '/' +newBuilding.owner_mobile_1_memo
		);
	}


	await seon.DBCall(`CALL SP_DETAIL_ITEM_SAVE(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
		newBuilding.building_uid,
		userId,
		isEmpty(newBuilding.building_mem_uid),
		isEmpty(newBuilding.building_name),
		isEmpty(newBuilding.show_addr),
		isEmpty(newBuilding.substation),
		isEmpty(newBuilding.substation_distance),
		isEmpty(newBuilding.sell_status),
		isEmpty(newBuilding.land_size_p),
		isEmpty(newBuilding.land_size_m2),
		isEmpty(newBuilding.gmok),
		isEmpty(newBuilding.bl_ratio),
		isEmpty(newBuilding.use_area_uid),
		isEmpty(newBuilding.public_land_price),
		isEmpty(newBuilding.public_land_price_py_price),
		isEmpty(newBuilding.road_name),
		isEmpty(newBuilding.roadwide_1),
		isEmpty(newBuilding.roadwide_2),
		isEmpty(newBuilding.roadwide_3),
		isEmpty(newBuilding.roadwide_4),
		isEmpty(newBuilding.chk_road_dual),
		isEmpty(newBuilding.chk_road_coner),
		isEmpty(newBuilding.chk_status),
		isEmpty(newBuilding.total_size_p),
		isEmpty(newBuilding.total_size_m2),
		isEmpty(newBuilding.build_size_p),
		isEmpty(newBuilding.build_size_m2),
		isEmpty(newBuilding.build_date),
		isEmpty(newBuilding.fa_ratio),
		isEmpty(newBuilding.remodel_date),
		isEmpty(newBuilding.floor_cnt_B),
		isEmpty(newBuilding.floor_cnt_F),
		isEmpty(newBuilding.main_purpose),
		isEmpty(newBuilding.structure_uid),
		isEmpty(newBuilding.heat_type_uid),
		isEmpty(newBuilding.ev_cnt),
		isEmpty(newBuilding.park_type_uid),
		isEmpty(newBuilding.park_cnt_law),
		isEmpty(newBuilding.park_cnt_real),
		isEmpty(newBuilding.building_price_py_price),
		isEmpty(newBuilding.owner_name),
		isEmpty(newBuilding.owner_home_phone),
		isEmpty(newBuilding.owner_home_phone_memo),
		isEmpty(newBuilding.owner_office_phone),
		isEmpty(newBuilding.owner_office_phone_memo),
		isEmpty(newBuilding.owner_mobile_1),
		isEmpty(newBuilding.owner_mobile_1_memo),
		isEmpty(newBuilding.pre_owner_name),
		isEmpty(newBuilding.pre_owner_home_phone),
		isEmpty(newBuilding.pre_owner_home_phone_memo),
		isEmpty(newBuilding.pre_owner_office_phone),
		isEmpty(newBuilding.pre_owner_office_phone_memo),
		isEmpty(newBuilding.pre_owner_mobile_1),
		isEmpty(newBuilding.pre_owner_mobile_1_memo),
		isEmpty(newBuilding.owner_memo),
		isEmpty(newBuilding.ins_price),
		isEmpty(newBuilding.land_size_py_price),
		isEmpty(newBuilding.sell_price),
		isEmpty(total_size_py_price),
		isEmpty(newBuilding.ex_sum_rent_deposit),
		isEmpty(newBuilding.ex_total_income_rate),
		isEmpty(newBuilding.earning_month_rate),
		isEmpty(newBuilding.ex_sum_rent_money),
		isEmpty(newBuilding.earning_rate),
		isEmpty(newBuilding.total_income_rate),
		isEmpty(newBuilding.total_income),
		isEmpty(newBuilding.ex_sum_mgr_fee),
		isEmpty(newBuilding.ex_sum_mgr_fee_out),
		isEmpty(newBuilding.loan_money),
		isEmpty(newBuilding.loan_money_per),
		isEmpty(newBuilding.loan_rate_month_money),
		isEmpty(newBuilding.loan_month_earn_rate),
		isEmpty(newBuilding.ex_debt_rate),
		isEmpty(building_price),
		isEmpty(land_price),
		isEmpty(newBuilding.memo)
	]);

	await seon.DBCall(`CALL SP_CATE_DELETE(?)`,[newBuilding.building_uid]);

	for(let i=0;i<req.body.cate.length;i++){
		await seon.DBCall(`CALL SP_CATE_ADD(?,?)`,[newBuilding.building_uid, req.body.cate[i]]);
	}

	//매물으로 변경되면
	if(oldBuilding.sell_status != 'done' && newBuilding.sell_status == 'done'){
		await seon.DBCall(`CALL SP_DETAIL_ITEM_DONE_DATE(?)`,[newBuilding.building_uid]);
	}



	// 기존 물건 종류 삭제
	// $query  = " DELETE FROM building_cate WHERE building_uid = '".$_POST['building_uid']."' ";

	// 신규 물건 종류 추가
	// foreach($_POST['bd_cate_uid'] as $key => $val) {
	// 	$query  = " INSERT INTO building_cate SET "
	// 			. " building_uid    = '".$_POST['building_uid']."', "
	// 			. " bd_cate_uid     = '".$val."' "
	// 			;
	// 	$AT_db->query($query);
	// }

	//임대차내역 저장
	let rentList = req.body.rent;
	for(let i=0;i<rentList.length;i++){
		rentList[i].rent_size_m2 = rentList[i].rent_size_p * PY_M2_EX;

		if(rentList[i].building_rent_uid){
			if(rentList[i].rent_floor.length){
				await seon.DBCall(`CALL SP_DETAIL_ITEM_RENT_UPDATE(?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
					rentList[i].building_rent_uid,
					newBuilding.building_uid,
					rentList[i].rent_floor,
					rentList[i].rent_size_p,
					rentList[i].rent_size_m2,
					rentList[i].rent_usage,
					rentList[i].rent_deposit,
					rentList[i].rent_money,
					rentList[i].rent_ni,
					rentList[i].except_flag,
					rentList[i].mgr_fee,
					rentList[i].end_date,
					rentList[i].memo
				]);
			}else{
				await seon.DBCall(`CALL SP_DETAIL_ITEM_RENT_DELETE_UP(?)`,[
					rentList[i].building_rent_uid
				]);

				rentList.splice(i, 1);
			}
		}
		else{
			if(rentList[i].rent_floor.length){
				const rentId = await seon.DBOneCall(`CALL SP_DETAIL_ITEM_RENT_ADD(?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
					newBuilding.building_uid,
					userId,
					rentList[i].rent_floor,
					rentList[i].rent_size_p,
					rentList[i].rent_size_m2,
					rentList[i].rent_usage,
					rentList[i].rent_deposit,
					rentList[i].rent_money,
					rentList[i].rent_ni,
					rentList[i].except_flag,
					rentList[i].mgr_fee,
					rentList[i].end_date,
					rentList[i].memo
				]);

				rentList[i].building_rent_uid = rentId.id;
			}
		}
	}


	for(let i=0;i<rentList.length;i++){
		if(rentList[i].rent_floor.length){
			await seon.DBCall(`CALL SP_DETAIL_ITEM_FLOOR_INDEX(?,?)`,[
				rentList[i].building_rent_uid,
				i+1
			]);
		}
	}

	const floorList = req.body.floorList;

	for(let i=0;i<floorList.length;i++){
		const floor = floorList[i];
		await seon.DBCall(`CALL SP_DETAIL_ITEM_FLOOR_CHK(?,?)`,[floor.building_floor_uid, floor.chk_except]);
	}

	//상태가 매각으로 변경되는 경우 처리

	return res.send(true);
});

router.post('/detail/item/save2', async function(req, res){
	const userId = req.decoded.userId;
	let newBuilding = req.body.item;
	const building_done_log_flag = req.body.building_done_log_flag;
	const building_hold_log_flag = req.body.building_hold_log_flag;

	const oldBuilding = await seon.DBOneCall(`CALL SP_R_DETAIL_ITEM(?)`,[newBuilding.building_uid]);
	let today = dayjs();

	if(oldBuilding.ex_sum_mgr_fee_out == 0){
		oldBuilding.ex_sum_mgr_fee_out = 0;
	}

	if(newBuilding.ex_sum_mgr_fee_out == 0){
		newBuilding.ex_sum_mgr_fee_out = 0;
	}

	const doneLog = await seon.DBCall(`CALL SP_R_CHECK_DONE_LOG(?,?)`,[newBuilding.building_uid,userId]);

	//진행상태 로그
	if(isEmpty(newBuilding.sell_status) != isEmpty(oldBuilding.sell_status)){
		await seon.AddMgrLog2(req,
			userId,
			newBuilding.building_uid,
			null,
			'building',
			'chg_info',
			'sell_status',
			seon.sellStatus[oldBuilding.sell_status] + '→' + seon.sellStatus[newBuilding.sell_status]
		);

		if(newBuilding.sell_status == "done"){
			// if(building_done_log_flag){
				// if(!doneLog.length){
					await seon.DBCall(`CALL SP_R_DEL_DONE_LOG(?,?)`,[newBuilding.building_uid,userId]);
					await seon.DBCall(`CALL SP_R_ADD_DONE_LOG(?,?)`,[newBuilding.building_uid,userId]);
				// }
			// }

			await seon.DBCall(`CALL SP_R_RESET_WORKING(?)`,[newBuilding.building_uid]);
		}

		if(oldBuilding.sell_status == "ready" && newBuilding.sell_status == "hold"){

		}

		if(oldBuilding.sell_status == "done" && newBuilding.sell_status == "hold"){
		}
	}

	//상태 로그
	if(isEmpty(newBuilding.chk_status) != isEmpty(oldBuilding.chk_status)) {
		await seon.AddMgrLog2(
			req,
			userId,
			newBuilding.building_uid,
			null,
			'building',
			'chg_info',
			'chk_status',
			seon.chkStatus[oldBuilding.chk_status] + '→' + seon.chkStatus[newBuilding.chk_status]
		);
	}

	//물건명 로그
	if(isEmpty(newBuilding.building_name) != isEmpty(oldBuilding.building_name)) {
		await seon.AddMgrLog2(
			req,
			userId,
			newBuilding.building_uid,
			null,
			'building',
			'chg_info',
			'building_name',
			oldBuilding.building_name + '→' + newBuilding.building_name
		);
	}

	//담당자 로그
	if(isEmpty(newBuilding.building_mem_uid) != isEmpty(oldBuilding.building_mem_uid)) {
		const newMem = await seon.DBOneCall(`CALL SP_MEM_ITEM(?)`,[newBuilding.building_mem_uid]);

		await seon.AddMgrLog2(
			req,
			userId,
			newBuilding.building_uid,
			null,
			'building',
			'chg_info',
			'building_mem_uid',
			oldBuilding.building_mem_name + '→' + newMem.mem_name
		);
	}

	//임대 보증금
	if(isEmpty2(newBuilding.deposit) != isEmpty2(oldBuilding.deposit)) {
		await seon.AddMgrLog2(
			req,
			userId,
			newBuilding.building_uid,
			null,
			'building',
			'chg_info',
			'deposit',
			oldBuilding.deposit + '→' + newBuilding.deposit
		);
	}

	//임대 전용면적
	if(isEmpty2(newBuilding.net_area_m2) != isEmpty2(oldBuilding.net_area_m2)) {
		await seon.AddMgrLog2(
			req,
			userId,
			newBuilding.building_uid,
			null,
			'building',
			'chg_info',
			'net_area',
			oldBuilding.net_area_m2 + '→' + newBuilding.net_area_m2
		);
	}

	//임대 월임대료
	if(isEmpty2(newBuilding.monthly_rent) != isEmpty2(oldBuilding.monthly_rent)) {
		await seon.AddMgrLog2(
			req,
			userId,
			newBuilding.building_uid,
			null,
			'building',
			'chg_info',
			'monthly_rent',
			oldBuilding.monthly_rent + '→' + newBuilding.monthly_rent
		);
	}

	//임대 관리비
	if(isEmpty2(newBuilding.main_fee) != isEmpty2(oldBuilding.main_fee)) {
		await seon.AddMgrLog2(
			req,
			userId,
			newBuilding.building_uid,
			null,
			'building',
			'chg_info',
			'main_fee',
			oldBuilding.main_fee + '→' + newBuilding.main_fee
		);
	}

	//임대 층정보
	if(isEmpty(newBuilding.floor_info) != isEmpty(oldBuilding.floor_info)) {
		await seon.AddMgrLog2(
			req,
			userId,
			newBuilding.building_uid,
			null,
			'building',
			'chg_info',
			'floor_info',
			oldBuilding.floor_info + '→' + newBuilding.floor_info
		);
	}

	//임대 무료주차대수
	if(isEmpty2(newBuilding.free_parking) != isEmpty2(oldBuilding.free_parking)) {
		await seon.AddMgrLog2(
			req,
			userId,
			newBuilding.building_uid,
			null,
			'building',
			'chg_info',
			'free_parking',
			oldBuilding.free_parking + '→' + newBuilding.free_parking
		);
	}

	//임대 유로주차대수
	if(isEmpty2(newBuilding.fee_paring) != isEmpty2(oldBuilding.fee_paring)) {
		await seon.AddMgrLog2(
			req,
			userId,
			newBuilding.building_uid,
			null,
			'building',
			'chg_info',
			'fee_paring',
			oldBuilding.fee_paring + '→' + newBuilding.fee_paring
		);
	}

	//임대 입주현황
	if(isEmpty(newBuilding.in_status) != isEmpty(oldBuilding.in_status)) {
		await seon.AddMgrLog2(
			req,
			userId,
			newBuilding.building_uid,
			null,
			'building',
			'chg_info',
			'in_status',
			oldBuilding.in_status + '→' + newBuilding.in_status
		);
	}

	//임대 화장실유형
	if(isEmpty(newBuilding.bathroom_type) != isEmpty(oldBuilding.bathroom_type)) {
		await seon.AddMgrLog2(
			req,
			userId,
			newBuilding.building_uid,
			null,
			'building',
			'chg_info',
			'bathroom_type',
			oldBuilding.bathroom_type + '→' + newBuilding.bathroom_type
		);
	}

	//임대 임대면적
	if(isEmpty2(newBuilding.rent_area) != isEmpty2(oldBuilding.rent_area)) {
		await seon.AddMgrLog2(
			req,
			userId,
			newBuilding.building_uid,
			null,
			'building',
			'chg_info',
			'rent_area',
			oldBuilding.rent_area + '→' + newBuilding.rent_area
		);
	}

	//임대 인테리어
	if(isEmpty(newBuilding.interior_type) != isEmpty(oldBuilding.interior_type)) {
		await seon.AddMgrLog2(
			req,
			userId,
			newBuilding.building_uid,
			null,
			'building',
			'chg_info',
			'interior_type',
			seon.interior_type[oldBuilding.interior_type] + '→' + seon.interior_type[newBuilding.interior_type]
		);
	}

	//임대 렌트프리
	if(isEmpty(newBuilding.rent_free) != isEmpty(oldBuilding.rent_free)) {
		let oldLog = "";
		let newLog = "";

		if(oldBuilding.rent_free == 'selet'){
			oldLog = oldBuilding.rent_free_month + '개월';
		}else{
			oldLog = seon.rent_free[oldBuilding.rent_free];
		}

		if(newBuilding.rent_free == 'selet'){
			newLog = newBuilding.rent_free_month + '개월';
		}else{
			newLog = seon.rent_free[newBuilding.rent_free];
		}

		await seon.AddMgrLog2(
			req,
			userId,
			newBuilding.building_uid,
			null,
			'building',
			'chg_info',
			'rent_free',
			oldLog + '→' + newLog
		);
	}

	//자동 - 건물평당가격
	let building_price = newBuilding.building_price_py_price * newBuilding.total_size_p;
	if (isEmpty(oldBuilding.building_price) != isEmpty(building_price)) {
		await seon.AddMgrLog2(
			req,
			userId,
			newBuilding.building_uid,
			null,
			'building',
			'chg_info',
			'building_price',
			oldBuilding.building_price + '→' + building_price
		);
	}

	//  자동 - 토지가격 = 매매금액 - 건물가격
	let land_price = newBuilding.sell_price - building_price;
	let land_price_py_price = 0;   //  건물평당가격
	if(newBuilding.land_size_p > 0) { land_price_py_price = land_price / newBuilding.land_size_p; }

	let total_size_py_price = 0;
	if(newBuilding.total_size_p > 0) { total_size_py_price = newBuilding.sell_price / newBuilding.total_size_p; }


	//소유자정보 - 성명
	if(isEmpty(newBuilding.owner_name) != isEmpty(oldBuilding.owner_name)) {
		await seon.AddMgrLog2(
			req,
			userId,
			newBuilding.building_uid,
			null,
			'building',
			'chg_info',
			'owner_info',
			oldBuilding.owner_name + '→' + newBuilding.owner_name
		);
	}

	//소유자정보 - 자택전화
	if(isEmpty(newBuilding.owner_home_phone) != isEmpty(oldBuilding.owner_home_phone)) {
		await seon.AddMgrLog2(
			req,
			userId,
			newBuilding.building_uid,
			null,
			'building',
			'chg_info',
			'owner_info',
			oldBuilding.owner_home_phone + '→' + newBuilding.owner_home_phone
		);
	}

	//소유자정보 - 회사전화
	if(isEmpty(newBuilding.owner_office_phone) != isEmpty(oldBuilding.owner_office_phone)) {
		await seon.AddMgrLog2(
			req,
			userId,
			newBuilding.building_uid,
			null,
			'building',
			'chg_info',
			'owner_info',
			oldBuilding.owner_office_phone +'/'+oldBuilding.owner_office_phone_memo+ '→' + newBuilding.owner_office_phone + '/' +newBuilding.owner_office_phone_memo
		);
	}

	//소유자정보 - 휴대폰 / 메모(1 ~ 5)
	if(isEmpty(newBuilding.owner_mobile_1) != isEmpty(oldBuilding.owner_mobile_1)) {
		await seon.AddMgrLog2(
			req,
			userId,
			newBuilding.building_uid,
			null,
			'building',
			'chg_info',
			'owner_info',
			oldBuilding.owner_mobile_1 +'/'+oldBuilding.owner_mobile_1_memo+ '→' + newBuilding.owner_mobile_1 + '/' +newBuilding.owner_mobile_1_memo
		);
	}

	const rent_area_py = Number((newBuilding.rent_area_m2 * 0.3025).toFixed(2));
	const net_area_py = Number((newBuilding.net_area_m2 * 0.3025).toFixed(2));


	await seon.DBCall(`CALL SP_R_DETAIL_ITEM_SAVE(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
		newBuilding.building_uid,
		userId,
		isEmpty(newBuilding.building_mem_uid),
		isEmpty(newBuilding.building_name),
		isEmpty(newBuilding.show_addr),
		isEmpty(newBuilding.substation),
		isEmpty(newBuilding.substation_distance),
		isEmpty(newBuilding.sell_status),
		isEmpty(newBuilding.land_size_p),
		isEmpty(newBuilding.land_size_m2),
		isEmpty(newBuilding.gmok),
		isEmpty(newBuilding.bl_ratio),
		isEmpty(newBuilding.use_area_uid),
		isEmpty(newBuilding.public_land_price),
		isEmpty(newBuilding.public_land_price_py_price),
		isEmpty(newBuilding.road_name),
		isEmpty(newBuilding.roadwide_1),
		isEmpty(newBuilding.roadwide_2),
		isEmpty(newBuilding.roadwide_3),
		isEmpty(newBuilding.roadwide_4),
		isEmpty(newBuilding.chk_road_dual),
		isEmpty(newBuilding.chk_road_coner),
		isEmpty(newBuilding.chk_status),
		isEmpty(newBuilding.total_size_p),
		isEmpty(newBuilding.total_size_m2),
		isEmpty(newBuilding.build_size_p),
		isEmpty(newBuilding.build_size_m2),
		isEmpty(newBuilding.build_date),
		isEmpty(newBuilding.fa_ratio),
		isEmpty(newBuilding.remodel_date),
		isEmpty(newBuilding.floor_cnt_B),
		isEmpty(newBuilding.floor_cnt_F),
		isEmpty(newBuilding.main_purpose),
		isEmpty(newBuilding.structure_uid),
		isEmpty(newBuilding.heat_type_uid),
		isEmpty(newBuilding.ev_cnt),
		isEmpty(newBuilding.park_type_uid),
		isEmpty(newBuilding.park_cnt_law),
		isEmpty(newBuilding.park_cnt_real),
		isEmpty(newBuilding.building_price_py_price),
		isEmpty(newBuilding.owner_name),
		isEmpty(newBuilding.owner_home_phone),
		isEmpty(newBuilding.owner_home_phone_memo),
		isEmpty(newBuilding.owner_office_phone),
		isEmpty(newBuilding.owner_office_phone_memo),
		isEmpty(newBuilding.owner_mobile_1),
		isEmpty(newBuilding.owner_mobile_1_memo),
		isEmpty(newBuilding.pre_owner_name),
		isEmpty(newBuilding.pre_owner_home_phone),
		isEmpty(newBuilding.pre_owner_home_phone_memo),
		isEmpty(newBuilding.pre_owner_office_phone),
		isEmpty(newBuilding.pre_owner_office_phone_memo),
		isEmpty(newBuilding.pre_owner_mobile_1),
		isEmpty(newBuilding.pre_owner_mobile_1_memo),
		isEmpty(newBuilding.owner_memo),
		isEmpty(newBuilding.ins_price),
		isEmpty(newBuilding.land_size_py_price),
		isEmpty(newBuilding.sell_price),
		isEmpty(total_size_py_price),
		isEmpty(newBuilding.ex_sum_rent_deposit),
		isEmpty(newBuilding.ex_total_income_rate),
		isEmpty(newBuilding.earning_month_rate),
		isEmpty(newBuilding.ex_sum_rent_money),
		isEmpty(newBuilding.earning_rate),

		isEmpty(newBuilding.total_income_rate),

		isEmpty(newBuilding.total_income),
		isEmpty(newBuilding.ex_sum_mgr_fee),
		isEmpty(newBuilding.ex_sum_mgr_fee_out),
		isEmpty(newBuilding.loan_money),
		isEmpty(newBuilding.loan_money_per),
		isEmpty(newBuilding.loan_rate_month_money),
		isEmpty(newBuilding.loan_month_earn_rate),
		isEmpty(newBuilding.ex_debt_rate),
		isEmpty(building_price),
		isEmpty(land_price),
		isEmpty(newBuilding.memo),

		isEmpty2(newBuilding.deposit),
		isEmpty2(newBuilding.net_area_m2),
		isEmpty2(newBuilding.monthly_rent),
		isEmpty2(newBuilding.ex_rate),
		isEmpty2(newBuilding.main_fee),
		isEmpty2(newBuilding.monthly_fixed),
		isEmpty(newBuilding.floor_info),
		isEmpty2(newBuilding.free_parking),
		isEmpty2(newBuilding.fee_paring),
		isEmpty(newBuilding.in_status),
		isEmpty(newBuilding.bathroom_type),
		isEmpty2(newBuilding.rent_area_m2),
		isEmpty2(newBuilding.rent_py_price),
		isEmpty(newBuilding.interior_type),
		isEmpty(newBuilding.rent_free),
		isEmpty2(newBuilding.rent_free_month),
		rent_area_py,
		net_area_py,
	]);

	await seon.DBCall(`CALL SP_R_CATE_DELETE(?)`,[newBuilding.building_uid]);

	for(let i=0;i<req.body.cate.length;i++){
		await seon.DBCall(`CALL SP_R_CATE_ADD(?,?)`,[newBuilding.building_uid, req.body.cate[i]]);
	}

	//매물으로 변경되면
	if(newBuilding.sell_status == 'done'){
		await seon.DBCall(`CALL SP_R_DETAIL_ITEM_DONE_DATE(?)`,[newBuilding.building_uid]);
	}



	// 기존 물건 종류 삭제
	// $query  = " DELETE FROM building_cate WHERE building_uid = '".$_POST['building_uid']."' ";

	// 신규 물건 종류 추가
	// foreach($_POST['bd_cate_uid'] as $key => $val) {
	// 	$query  = " INSERT INTO building_cate SET "
	// 			. " building_uid    = '".$_POST['building_uid']."', "
	// 			. " bd_cate_uid     = '".$val."' "
	// 			;
	// 	$AT_db->query($query);
	// }

	//임대차내역 저장
	let rentList = req.body.rent;
	for(let i=0;i<rentList.length;i++){
		rentList[i].rent_size_m2 = rentList[i].rent_size_p * PY_M2_EX;

		if(rentList[i].building_rent_uid){
			if(rentList[i].rent_floor.length){
				await seon.DBCall(`CALL SP_R_DETAIL_ITEM_RENT_UPDATE(?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
					rentList[i].building_rent_uid,
					newBuilding.building_uid,
					rentList[i].rent_floor,
					rentList[i].rent_size_p,
					rentList[i].rent_size_m2,
					rentList[i].rent_usage,
					rentList[i].rent_deposit,
					rentList[i].rent_money,
					rentList[i].rent_ni,
					rentList[i].except_flag,
					rentList[i].mgr_fee,
					rentList[i].end_date,
					rentList[i].memo
				]);
			}else{
				await seon.DBCall(`CALL SP_R_DETAIL_ITEM_RENT_DELETE_UP(?)`,[
					rentList[i].building_rent_uid
				]);

				rentList.splice(i, 1);
			}
		}
		else{
			if(rentList[i].rent_floor.length){
				const rentId = await seon.DBOneCall(`CALL SP_R_DETAIL_ITEM_RENT_ADD(?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
					newBuilding.building_uid,
					userId,
					rentList[i].rent_floor,
					rentList[i].rent_size_p,
					rentList[i].rent_size_m2,
					rentList[i].rent_usage,
					rentList[i].rent_deposit,
					rentList[i].rent_money,
					rentList[i].rent_ni,
					rentList[i].except_flag,
					rentList[i].mgr_fee,
					rentList[i].end_date,
					rentList[i].memo
				]);

				rentList[i].building_rent_uid = rentId.id;
			}
		}
	}


	for(let i=0;i<rentList.length;i++){
		if(rentList[i].rent_floor.length){
			await seon.DBCall(`CALL SP_R_DETAIL_ITEM_FLOOR_INDEX(?,?)`,[
				rentList[i].building_rent_uid,
				i+1
			]);
		}
	}

	//상태가 매각으로 변경되는 경우 처리

	return res.send(true);
});

router.post('/detail/item/delete', async function(req, res){
	// const userId = req.decoded.userId;
	await seon.DBCall(`CALL SP_BUILDING_DELETE(?)`,[req.body.bid]);
	return res.send(true);
});

router.post('/detail/item/delete2', async function(req, res){
	// const userId = req.decoded.userId;

	await seon.DBCall(`CALL SP_R_BUILDING_DELETE(?)`,[req.body.bid]);
	return res.send(true);
});

router.post('/detail/item/reload', async function(req, res){
	const userId = req.decoded.userId;

	const st = await seon.APIBuildingUpdate(userId, req.body.bid);
	
	return res.send(st);
});

router.post('/detail/item/reload2', async function(req, res){
	const userId = req.decoded.userId;

	const st = await seon.APIRentBuildingUpdate(userId, req.body.bid);

	return res.send(st);
});


router.post('/detail/item/link/add', async function(req, res){
	const userId = req.decoded.userId;
	console.log(req.body);
	const pnu = await seon.getPUNCode(req.body.jibun_addr);

	const ck = await seon.DBCall(`CALL SP_DETAIL_ITEM_LINK_ADDR_CHECK(?,?)`,[pnu, req.body.bid]);

	if(ck.length){
		return res.status(400).json({
            status: 400,
            errors: [{msg:'동일주소가 이미 연결되어 있습니다.'}]
          });
	}

	await seon.APIBuildinCreatLink(userId, req.body.bid, pnu, {jibun:req.body.jibun_addr, road:req.body.road_addr});

	// await seon.DBCall(`CALL SP_DETAIL_ITEM_LINK_ADDR_ADD(?,?,?,?,?,?,?)`,[
	// 	userId,
	// 	req.body.bid,
	// 	req.body.road_addr,
	// 	req.body.jibun_addr,
	// 	req.body.lat,
	// 	req.body.lng,
	// 	pnu
	// ]);

	return res.send(true);
});

router.post('/detail/item/link/delete', async function(req, res){
	const userId = req.decoded.userId;

	await seon.DBCall(`CALL SP_DETAIL_ITEM_LINK_ADDR_DELETE(?,?,?)`,[req.body.id,req.body.idx,req.body.bid]);
	await seon.APIBuildingUpdate(userId, req.body.bid);

	return res.send(true);
});

router.get('/detail/item/link', async function(req, res){
	const userId = req.decoded.userId;
	
	const reData = await seon.DBCall(`CALL SP_DETAIL_ITEM_LINK_ADDR_GET(?)`,[req.query.bid]);

	return res.send(reData);
});

router.post('/detail/item/link/add2', async function(req, res){
	const userId = req.decoded.userId;

	const pnu = await seon.getPUNCode(req.body.jibun_addr);

	const ck = await seon.DBCall(`CALL SP_R_DETAIL_ITEM_LINK_ADDR_CHECK(?,?)`,[pnu, req.body.bid]);

	if(ck.length){
		return res.status(400).json({
            status: 400,
            errors: [{msg:'동일주소가 이미 연결되어 있습니다.'}]
          });
	}

	await seon.APIRentBuildinCreatLink(userId, req.body.bid, pnu, {jibun:req.body.jibun_addr, road:req.body.road_addr});

	// await seon.DBCall(`CALL SP_R_DETAIL_ITEM_LINK_ADDR_ADD(?,?,?,?,?,?,?)`,[
	// 	userId,
	// 	req.body.bid,
	// 	req.body.road_addr,
	// 	req.body.jibun_addr,
	// 	req.body.lat,
	// 	req.body.lng,
	// 	pnu
	// ]);

	return res.send(true);
});

router.post('/detail/item/link/delete2', async function(req, res){
	const userId = req.decoded.userId;

	await seon.DBCall(`CALL SP_R_DETAIL_ITEM_LINK_ADDR_DELETE(?,?,?)`,[req.body.id,req.body.idx,req.body.bid]);
	await seon.APIRentBuildingUpdate(userId, req.body.bid);
	
	return res.send(true);
});

router.get('/detail/item/link2', async function(req, res){
	const userId = req.decoded.userId;
	
	const reData = await seon.DBCall(`CALL SP_R_DETAIL_ITEM_LINK_ADDR_GET(?)`,[req.query.bid]);

	return res.send(reData);
});

router.post('/detail/item/link/b/add', async function(req, res){
	const userId = req.decoded.userId;

	const ck = await seon.DBCall(`CALL SP_DETAIL_ITEM_LINK_CHECK(?,?)`,[req.body.bid, req.body.ref_bid]);

	if(ck.length){
		return res.status(400).json({
            status: 400,
            errors: [{msg:'동일 물건이 이미 연결되어 있습니다.'}]
          });
	}

	await seon.DBCall(`CALL SP_DETAIL_ITEM_LINK_ADD(?,?,?)`,[
		userId,
		req.body.bid,
		req.body.ref_bid
	]);

	return res.send(true);
});
router.post('/detail/item/link/b/delete', async function(req, res){
	await seon.DBCall(`CALL SP_DETAIL_ITEM_LINK_DELETE(?,?)`,[req.body.bid, req.body.ref_bid]);

	return res.send(true);
});

router.get('/detail/item/b/link', async function(req, res){
	const userId = req.decoded.userId;
	
	const reData = await seon.DBCall(`CALL SP_DETAIL_ITEM_LINK_GET(?)`,[req.query.bid]);

	return res.send(reData);
});

router.post('/detail/item/link/b/add2', async function(req, res){
	const userId = req.decoded.userId;

	const ck = await seon.DBCall(`CALL SP_R_DETAIL_ITEM_LINK_CHECK(?,?)`,[req.body.bid, req.body.ref_bid]);

	if(ck.length){
		return res.status(400).json({
            status: 400,
            errors: [{msg:'동일 물건이 이미 연결되어 있습니다.'}]
          });
	}

	await seon.DBCall(`CALL SP_R_DETAIL_ITEM_LINK_ADD(?,?,?)`,[
		userId,
		req.body.bid,
		req.body.ref_bid
	]);

	return res.send(true);
});
router.post('/detail/item/link/b/delete2', async function(req, res){
	await seon.DBCall(`CALL SP_R_DETAIL_ITEM_LINK_DELETE(?,?)`,[req.body.bid, req.body.ref_bid]);

	return res.send(true);
});

router.get('/detail/item/b/link2', async function(req, res){
	const userId = req.decoded.userId;
	
	const reData = await seon.DBCall(`CALL SP_R_DETAIL_ITEM_LINK_GET(?)`,[req.query.bid]);

	return res.send(reData);
});




router.post('/client/log/add', async function(req, res){
	const userId = req.decoded.userId; //세션 유저 아이디
	await seon.DBCall(`CALL SP_CLIENT_LOG_ADD(?,?,?,?,?,?)`,[
		userId,
		req.body.bid,
		'building',
		'counsel',
		req.body.type,
		req.body.keyword
	]);

	if(req.body.type == 106){
		await seon.DBOneCall(`CALL SP_POST_ADD(?,?,?,?,?,?)`,[
			userId,
			req.body.memUid,
			'지시',
			req.body.keyword,
			'building',
			req.body.bid,
		]);	
	}
	

	return res.send(true);
});

router.post('/client/log/add2', async function(req, res){
	const userId = req.decoded.userId; //세션 유저 아이디
	await seon.DBCall(`CALL SP_R_CLIENT_LOG_ADD(?,?,?,?,?,?)`,[
		userId,
		req.body.bid,
		'building',
		'counsel',
		req.body.type,
		req.body.keyword
	]);

	if(req.body.type == 106){
		await seon.DBOneCall(`CALL SP_POST_ADD(?,?,?,?,?,?)`,[
			userId,
			req.body.memUid,
			'지시',
			req.body.keyword,
			'rent_building',
			req.body.bid,
		]);	
	}

	return res.send(true);
});

router.get('/log/done', async function(req, res){
	const userId = req.decoded.userId;
	const sql =  `CALL SP_CHECK_DONE_LOG(?,?)`;

	const reData = await seon.DBCall(sql,[
		req.query.bid,
		userId
	]);

	return res.send(reData);
});

router.get('/log/done2', async function(req, res){
	const userId = req.decoded.userId;
	const sql =  `CALL SP_R_CHECK_DONE_LOG(?,?)`;

	const reData = await seon.DBCall(sql,[
		req.query.bid,
		userId
	]);

	return res.send(reData);
});


router.post('/up/img', seon.imgUpload, async function(req, res){
	const userId = req.decoded.userId; //세션 유저 아이디

	let idx = 0;
	for(let i=0;i<20;i++){
		// console.log(i + ' : ' + req.body['info_'+i]);

		if(req.body['info_'+i] == 0){
			const f = req.files[idx];

			await seon.DBCall(`CALL SP_FILE_IMG_ADD(?,?,?,?,?,?,?)`,[
				req.body.bid,
				userId,
				f.mimetype,
				f.size,
				f.filename,
				f.destination,
				i
			]);

			idx++;
		}
		else if(req.body['info_'+i] == 1){
			await seon.FileDel(req.body.bid, i);

			const f = req.files[idx];

			await seon.DBCall(`CALL SP_FILE_IMG_UPDATE(?,?,?,?,?,?,?)`,[
				req.body.bid,
				userId,
				f.mimetype,
				f.size,
				f.filename,
				f.destination,
				i
			]);

			idx++;
		}
	}
	// 0 신규
	// 그냥 추가

	return res.send(true);
});

router.post('/up/img2', seon.imgUpload, async function(req, res){
	const userId = req.decoded.userId; //세션 유저 아이디

	let idx = 0;
	for(let i=0;i<20;i++){
		// console.log(i + ' : ' + req.body['info_'+i]);

		if(req.body['info_'+i] == 0){
			const f = req.files[idx];

			await seon.DBCall(`CALL SP_R_FILE_IMG_ADD(?,?,?,?,?,?,?)`,[
				req.body.bid,
				userId,
				f.mimetype,
				f.size,
				f.filename,
				f.destination,
				i
			]);

			idx++;
		}
		else if(req.body['info_'+i] == 1){
			await seon.FileDel2(req.body.bid, i);

			const f = req.files[idx];

			await seon.DBCall(`CALL SP_R_FILE_IMG_UPDATE(?,?,?,?,?,?,?)`,[
				req.body.bid,
				userId,
				f.mimetype,
				f.size,
				f.filename,
				f.destination,
				i
			]);

			idx++;
		}
	}
	// 0 신규
	// 그냥 추가

	return res.send(true);
});

router.post('/up/img/del', async function(req, res){
	const delImgList = req.body.delImgList;

	for(let i=0;i<delImgList.length;i++){
		const bid = delImgList[i].bid;
		const id = delImgList[i].id;
		const idx = delImgList[i].idx;

		await seon.FileDel(bid, idx);
		await seon.DBCall(`CALL SP_FILE_IMG_DEL(?)`,[id]);
	}

	return res.send(true);
});

router.post('/up/img2/del', async function(req, res){
	const delImgList = req.body.delImgList;

	for(let i=0;i<delImgList.length;i++){
		const bid = delImgList[i].bid;
		const id = delImgList[i].id;
		const idx = delImgList[i].idx;

		await seon.FileDel2(bid, idx);
		await seon.DBCall(`CALL SP_R_FILE_IMG_DEL(?)`,[id]);
	}

	return res.send(true);
});

const fs = require("fs");
const { emitWarning } = require('process');
router.get('/testimg', async function(req, res){
	const userId = req.decoded.userId; //세션 유저 아이디
	const files = fs.readdirSync("./--");

	const typeNum = {
		'건물외부사진1.jpg' : 6,
		'건물외부사진2.jpg' : 7,
		'건물외부사진3.jpg' : 8,
		'건물외부사진4.jpg' : 9,

		'건물내부사진1.jpg' : 11,
		'건물내부사진2.jpg' : 12,
		'건물내부사진3.jpg' : 12,
		'건물내부사진4.jpg' : 13,
		'건물내부사진5.jpg' : 14,
		'건물내부사진6.jpg' : 15,
		'건물내부사진7.jpg' : 16,
		'건물내부사진8.jpg' : 17,
		'건물내부사진9.jpg' : 18,
		'건물내부사진10.jpg' : 19
	};


	for(let i=0;i<files.length;i++){
		let file = files[i].split('-');
		let fileName = files[i];
		const len = file.length;
		let fileType = file[len-1];
		let floorInfo = file[3];
		let fileJibun = null;

		if(file[2] == 'x'){
			fileJibun = file[0] + ' ' + file[1];
		}else{
			fileJibun = file[0] + ' ' + file[1] + '-' + file[2];
		}

		// console.log(fileJibun, floorInfo, fileType);
		const reData = await seon.DBOneCall(`CALL SP_XXXX_X(?,?)`,[
			'%'+fileJibun+'%',
			floorInfo
		]);


		if(!reData){
			continue;
		}

		if(!typeNum[fileType]){
			continue;
		}

		const newFileName = 'item-' + Date.now();
		fs.copyFileSync('./--/' + fileName,'./uploads/item/' + newFileName);
		await seon.DBCall(`CALL SP_R_FILE_IMG_ADD(?,?,?,?,?,?,?)`,[
			reData.building_uid,
			userId,
			"image/jpg",
			10,
			newFileName,
			'uploads/item',
			typeNum[fileType]
		]);


		if(typeNum[fileType] == 6){
			const newFileName = 'item-' + Date.now();
			fs.copyFileSync('./--/' + fileName,'./uploads/item/' + newFileName);
			await seon.DBCall(`CALL SP_R_FILE_IMG_ADD(?,?,?,?,?,?,?)`,[
				reData.building_uid,
				userId,
				"image/jpg",
				10,
				newFileName,
				'uploads/item',
				0
			]);
		}
	}


	return res.send("asd");
});


router.post('/create/building111', async function(req, res){
	console.log("BACK ---" + req.body.name);

	const userId = req.decoded.userId;
	const pnu = await seon.getPUNCode(req.body.jibun_addr);

	if(!pnu){
		return res.send({st: false, item: null});
	}

	let building_uid = null;

	const reData = await seon.DBOneCall(`CALL SP_R_BUILDING_CREATE(?,?,?,?,?,?,?,?,?)`,[
		userId,
		req.body.zonecode,
		isEmpty(req.body.road_addr),
		req.body.jibun_addr,
		req.body.lat,
		req.body.lng,
		req.body.name,
		pnu,
		pnu[10]
	]);

	building_uid = reData.building_uid;

	const st = await seon.APIRentBuildingUpdate(userId, building_uid);

	// if(!st){
	// 	return res.send({st: false, item: null});
	// }

	// return res.send({st: true, item: null});


	const newBuilding = await seon.DBOneCall(`CALL SP_R_DETAIL_ITEM(?)`,[building_uid]);

	newBuilding.owner_name = req.body.item.owner_name;
	newBuilding.owner_home_phone = req.body.item.owner_home_phone;
	newBuilding.rent_area_py = req.body.item.rent_area_py;
	newBuilding.net_area_py = req.body.item.net_area_py;
	newBuilding.floor_info = req.body.item.floor_info;
	newBuilding.free_parking = req.body.item.free_parking;
	newBuilding.in_status = req.body.item.in_status;
	newBuilding.memo = req.body.item.memo;



	newBuilding.deposit = Number(req.body.item.deposit.replace(',',''));
	newBuilding.monthly_rent = Number(req.body.item.monthly_rent.replace(',',''));

	if(typeof(req.body.item.main_fee) == 'string'){
		req.body.item.main_fee = 0;
	}else{
		newBuilding.main_fee = Number(req.body.item.main_fee.replace(',',''));
	}

	newBuilding.monthly_fixed = newBuilding.monthly_rent + newBuilding.main_fee;
	newBuilding.rent_py_price = Number((newBuilding.monthly_rent / newBuilding.rent_area_py).toFixed(2));

	if(newBuilding.ex_sum_mgr_fee_out == 0){
		newBuilding.ex_sum_mgr_fee_out = 0;
	}


	//자동 - 건물평당가격
	let building_price = newBuilding.building_price_py_price * newBuilding.total_size_p;

	//  자동 - 토지가격 = 매매금액 - 건물가격
	let land_price = newBuilding.sell_price - building_price;
	let land_price_py_price = 0;   //  건물평당가격
	if(newBuilding.land_size_p > 0) { land_price_py_price = land_price / newBuilding.land_size_p; }

	let total_size_py_price = 0;
	if(newBuilding.total_size_p > 0) { total_size_py_price = newBuilding.sell_price / newBuilding.total_size_p; }

	const rent_area_m2 = Number((newBuilding.rent_area_py * PY_M2_EX).toFixed(2));
	const net_area_m2 = Number((newBuilding.net_area_py * PY_M2_EX).toFixed(2));

	newBuilding.ex_rate = Number((rent_area_m2 / net_area_m2).toFixed(2));


	await seon.DBCall(`CALL SP_R_DETAIL_ITEM_SAVE(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
		newBuilding.building_uid,
		userId,
		isEmpty(newBuilding.building_mem_uid),
		isEmpty(newBuilding.building_name),
		isEmpty(newBuilding.show_addr),
		isEmpty(newBuilding.substation),
		isEmpty(newBuilding.substation_distance),
		isEmpty(newBuilding.sell_status),
		isEmpty(newBuilding.land_size_p),
		isEmpty(newBuilding.land_size_m2),
		isEmpty(newBuilding.gmok),
		isEmpty(newBuilding.bl_ratio),
		isEmpty(newBuilding.use_area_uid),
		isEmpty(newBuilding.public_land_price),
		isEmpty(newBuilding.public_land_price_py_price),
		isEmpty(newBuilding.road_name),
		isEmpty(newBuilding.roadwide_1),
		isEmpty(newBuilding.roadwide_2),
		isEmpty(newBuilding.roadwide_3),
		isEmpty(newBuilding.roadwide_4),
		isEmpty(newBuilding.chk_road_dual),
		isEmpty(newBuilding.chk_road_coner),
		isEmpty(newBuilding.chk_status),
		isEmpty(newBuilding.total_size_p),
		isEmpty(newBuilding.total_size_m2),
		isEmpty(newBuilding.build_size_p),
		isEmpty(newBuilding.build_size_m2),
		isEmpty(newBuilding.build_date),
		isEmpty(newBuilding.fa_ratio),
		isEmpty(newBuilding.remodel_date),
		isEmpty(newBuilding.floor_cnt_B),
		isEmpty(newBuilding.floor_cnt_F),
		isEmpty(newBuilding.main_purpose),
		isEmpty(newBuilding.structure_uid),
		isEmpty(newBuilding.heat_type_uid),
		isEmpty(newBuilding.ev_cnt),
		isEmpty(newBuilding.park_type_uid),
		isEmpty(newBuilding.park_cnt_law),
		isEmpty(newBuilding.park_cnt_real),
		isEmpty(newBuilding.building_price_py_price),
		isEmpty(newBuilding.owner_name),
		isEmpty(newBuilding.owner_home_phone),
		isEmpty(newBuilding.owner_home_phone_memo),
		isEmpty(newBuilding.owner_office_phone),
		isEmpty(newBuilding.owner_office_phone_memo),
		isEmpty(newBuilding.owner_mobile_1),
		isEmpty(newBuilding.owner_mobile_1_memo),
		isEmpty(newBuilding.pre_owner_name),
		isEmpty(newBuilding.pre_owner_home_phone),
		isEmpty(newBuilding.pre_owner_home_phone_memo),
		isEmpty(newBuilding.pre_owner_office_phone),
		isEmpty(newBuilding.pre_owner_office_phone_memo),
		isEmpty(newBuilding.pre_owner_mobile_1),
		isEmpty(newBuilding.pre_owner_mobile_1_memo),
		isEmpty(newBuilding.owner_memo),
		isEmpty(newBuilding.ins_price),
		isEmpty(newBuilding.land_size_py_price),
		isEmpty(newBuilding.sell_price),
		isEmpty(total_size_py_price),
		isEmpty(newBuilding.ex_sum_rent_deposit),
		isEmpty(newBuilding.ex_total_income_rate),
		isEmpty(newBuilding.earning_month_rate),
		isEmpty(newBuilding.ex_sum_rent_money),
		isEmpty(newBuilding.earning_rate),


		isEmpty(newBuilding.total_income_rate),


		isEmpty(newBuilding.total_income),
		isEmpty(newBuilding.ex_sum_mgr_fee),
		isEmpty(newBuilding.ex_sum_mgr_fee_out),
		isEmpty(newBuilding.loan_money),
		isEmpty(newBuilding.loan_money_per),
		isEmpty(newBuilding.loan_rate_month_money),
		isEmpty(newBuilding.loan_month_earn_rate),
		isEmpty(newBuilding.ex_debt_rate),
		isEmpty(building_price),
		isEmpty(land_price),
		isEmpty(newBuilding.memo),
		isEmpty2(newBuilding.deposit),

		isEmpty2(net_area_m2),

		isEmpty2(newBuilding.monthly_rent),
		isEmpty2(newBuilding.ex_rate),
		isEmpty2(newBuilding.main_fee),
		isEmpty2(newBuilding.monthly_fixed),
		isEmpty(newBuilding.floor_info),
		isEmpty2(newBuilding.free_parking),
		isEmpty2(newBuilding.fee_paring),
		isEmpty(newBuilding.in_status),
		isEmpty(newBuilding.bathroom_type),

		isEmpty2(rent_area_m2),

		isEmpty2(newBuilding.rent_py_price),
		isEmpty(newBuilding.interior_type),
		isEmpty(newBuilding.rent_free),
		isEmpty2(newBuilding.rent_free_month),

		isEmpty2(newBuilding.rent_area_py),
		isEmpty2(newBuilding.net_area_py),
	]);


	return res.send(true);
});

router.post('/create/building222', async function(req, res){
	console.log("BACK ---" + req.body.name);

	const reData = await seon.DBOneCall(`CALL SP_XXXX(?)`,[
		req.body.name
	]);

	if(!reData){
		return res.send(true);
	}

	// console.log(reData.building_uid);
	req.body.item.deposit = Number(req.body.item.deposit.replace(',',''));
	req.body.item.monthly_rent = Number(req.body.item.monthly_rent.replace(',',''));
	req.body.item.rent_area_py = Number(req.body.item.rent_area_py.replace(',',''));
	req.body.item.net_area_py = Number(req.body.item.net_area_py.replace(',',''));

	req.body.item.main_fee = Number(req.body.item.main_fee.replace(',',''));

	const rent_area_m2 = Number((req.body.item.rent_area_py * PY_M2_EX).toFixed(2));
	const net_area_m2 = Number((req.body.item.net_area_py * PY_M2_EX).toFixed(2));

	await seon.DBCall(`CALL SP_XXXX2222(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
		reData.building_uid,
		req.body.item.owner_name,
		req.body.item.owner_home_phone,
		req.body.item.rent_area_py,
		rent_area_m2,
		req.body.item.net_area_py,
		net_area_m2,
		isEmpty(req.body.item.floor_info),
		isEmpty2(Number(req.body.item.free_parking)),
		isEmpty2(Number(req.body.item.fee_paring)),
		isEmpty(req.body.item.in_status),
		req.body.item.deposit,
		req.body.item.monthly_rent,
		isEmpty2(req.body.item.main_fee),
		isEmpty(req.body.item.memo)
	]);


	return res.send(true);
});

router.post('/sc/create/building',async function(req, res){
	const userId = req.decoded.userId;
	const pnu = req.body.pnu;

	console.log(pnu);
	

	if(!pnu){
		return res.send({st: false, item: null});
	}

	let heat_type_uid = null;

	if(req.body.heating){
		if(req.body.heating.includes('개별난방')){
			heat_type_uid = 100
		}else if(req.body.heating.includes('개별냉난방')){
			heat_type_uid = 191
		}else if(req.body.heating.includes('중앙난방')){
			heat_type_uid = 101
		}else if(req.body.heating.includes('중앙냉난방')){
			heat_type_uid = 192
		}else if(req.body.heating.includes('지역난방')){
			heat_type_uid = 193
		}else if(req.body.heating.includes('지역냉난방')){
			heat_type_uid = 194
		}
	}

	if(req.body.isRent){
		const rent_py_price = Number((req.body.monthly_rent / req.body.rent_area_py).toFixed(2));
		let building_uid = null;

		const reData = await seon.DBOneCall(`CALL SP_SC_BUILDING_CREATE2(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
			userId,
			0,// req.body.zonecode,
			null,
			req.body.exposureAddress + ' ' + req.body.jibunAddress,
			req.body.pt.y,
			req.body.pt.x,

			'[' + req.body.realestateTypeName + '] ' +req.body.exposureAddress + ' ' + req.body.jibunAddress + (req.body.etcAddress ? ' ' + req.body.etcAddress : ''),
			req.body.pnu,
			req.body.pnu[10],

			isEmpty2(req.body.deposit),	//보증금	deposit
			isEmpty2(req.body.monthly_rent),	//월세	monthly_rent
			isEmpty2(req.body.main_fee/10000), //관리비 main_fee
			isEmpty2(req.body.main_fee/10000 +  req.body.monthly_rent), 	//월고정비 monthly_fixed
			isEmpty2(req.body.rent_area_m2),	//임대면적
			isEmpty2(req.body.rent_area_py),
			isEmpty2(req.body.net_area_m2),	//전용면적
			isEmpty2(req.body.net_area_py),
			isEmpty2(rent_py_price), 	//평당 임대료 rent_py_price
			isEmpty2(req.body.ex_rate), //전용률 ex_rate
			req.body.subway,	//substation
			req.body.subway_dis,	//substation_distance
			req.body.floor_cur,	//해당층
			(req.body.in_date ? req.body.in_date + ' ': '')  + (req.body.in_date_type ? req.body.in_date_type + ' ': '') + (req.body.in_date_st ? req.body.in_date_st + '': ''),

			'[' + req.body.realestateTypeName + '] ' +req.body.exposureAddress + ' ' + req.body.jibunAddress + (req.body.etcAddress ? ' ' + req.body.etcAddress : '') + '\n' + req.body.tagList, //memo
			heat_type_uid
		]);

		if(!reData){
			return res.send({st:false, msg:'API SERVER ERROR'});
		}

		building_uid = reData.building_uid;

		const st = await seon.APIRentBuildingUpdate(userId, building_uid);
		await seon.DBCall(`CALL SP_SC_BUILDING_DELETE_ITEM(?)`,[req.body.id]);

		return res.send({st: true, item: building_uid});
	}else{
		let building_uid = null;

		const reData = await seon.DBOneCall(`CALL SP_SC_BUILDING_CREATE(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
			userId,
			0,// req.body.zonecode,
			null,
			req.body.exposureAddress + ' ' + req.body.jibunAddress,
			req.body.pt.y,
			req.body.pt.x,
			'[' + req.body.realestateTypeName + '] ' +req.body.exposureAddress + ' ' + req.body.jibunAddress + (req.body.etcAddress ? ' ' + req.body.etcAddress : ''),
			req.body.pnu,
			req.body.pnu[10],

			isEmpty2(req.body.dealPrice),	//매매가	sell_price
			isEmpty2(req.body.main_fee/10000),	//월관리비  sum_mgr_fee   ex_sum_mgr_fee
			req.body.subway,	//substation
			req.body.subway_dis,	//substation_distance
			'[' + req.body.realestateTypeName + '] ' +req.body.exposureAddress + ' ' + req.body.jibunAddress + (req.body.etcAddress ? ' ' + req.body.etcAddress : '') + '\n' + req.body.tagList, //memo
			heat_type_uid
		]);

		if(!reData){
			return res.send({st:false, msg:'API SERVER ERROR'});
		}

		building_uid = reData.building_uid;

		const st = await seon.APIBuildingUpdate(userId, building_uid);
		await seon.DBCall(`CALL SP_SC_BUILDING_DELETE_ITEM(?)`,[req.body.id]);

		return res.send({st: true, item: building_uid});
	}
	return res.send({st: true, item: null});
});

router.get('/sc/server/item', async function(req, res){
	const reData = await seon.DBPageCall(`CALL SP_SC_GET_BUILDING(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
		req.query.page,
		isEmpty(req.query.tradeTypeName),
		isEmpty(req.query.realestateTypeName),
		isEmpty(req.query.exposureAddress),

		req.query.dealPrice_ST,
		req.query.deposit_ST,
		req.query.monthly_rent_ST,
		req.query.totalSpace_ST,
		req.query.groundSpace_ST,
		req.query.rent_area_ST,
		req.query.net_area_ST,
		isEmpty(req.query.dealPrice_S),
		isEmpty(req.query.dealPrice_E),
		isEmpty(req.query.deposit_S),
		isEmpty(req.query.deposit_E),
		isEmpty(req.query.monthly_rent_S),
		isEmpty(req.query.monthly_rent_E),
		isEmpty(req.query.totalSpace_py_S),
		isEmpty(req.query.totalSpace_py_E),
		isEmpty(req.query.groundSpace_py_S),
		isEmpty(req.query.groundSpace_py_E),
		isEmpty(req.query.rent_area_py_S),
		isEmpty(req.query.rent_area_py_E),
		isEmpty(req.query.net_area_py_S),
		isEmpty(req.query.net_area_py_E)
	]);


	return res.send(reData);
});

router.get('/sc/server/item/count', async function(req, res){
	const reData = await seon.DBOneCall(`CALL SP_SC_GET_BUILDING_COUNT(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
		req.query.page,
		isEmpty(req.query.tradeTypeName),
		isEmpty(req.query.realestateTypeName),
		isEmpty(req.query.exposureAddress),

		req.query.dealPrice_ST,
		req.query.deposit_ST,
		req.query.monthly_rent_ST,
		req.query.totalSpace_ST,
		req.query.groundSpace_ST,
		req.query.rent_area_ST,
		req.query.net_area_ST,
		isEmpty(req.query.dealPrice_S),
		isEmpty(req.query.dealPrice_E),
		isEmpty(req.query.deposit_S),
		isEmpty(req.query.deposit_E),
		isEmpty(req.query.monthly_rent_S),
		isEmpty(req.query.monthly_rent_E),
		isEmpty(req.query.totalSpace_py_S),
		isEmpty(req.query.totalSpace_py_E),
		isEmpty(req.query.groundSpace_py_S),
		isEmpty(req.query.groundSpace_py_E),
		isEmpty(req.query.rent_area_py_S),
		isEmpty(req.query.rent_area_py_E),
		isEmpty(req.query.net_area_py_S),
		isEmpty(req.query.net_area_py_E)
	]);


	return res.send(reData);
});

router.get('/sc/server/info', async function(req, res){
	const reData = await seon.DBOneCall(`CALL SP_SC_GET_INFO()`);

	return res.send(reData);
});

router.get('/sc/server/filter', async function(req, res){
	const reData = await seon.DBCall(`CALL SP_SC_GET_FILTER(?)`,[req.query.type]);

	return res.send(reData);
});

router.post('/sc/server/filter', async function(req, res){
	const bodyData = req.body.filters;

	for(let i=0;i<bodyData.length;i++){
		await seon.DBCall(`CALL SP_SC_GET_FILTER_UPDATE(?,?)`,[bodyData[i].typeName,bodyData[i].typeValue]);
	}

	await seon.DBCall(`CALL SP_SC_GET_INFO_ST_UPDATE(?)`, ['init']);

	return res.send(true);
});

router.post('/sc/server/adr', async function(req, res){
	const adrObjList = seon.groupBy(req.body.adrList, 'adr1');
	let adrList = [];



	for(var prop in adrObjList){
		// console.log(prop, adrList[prop]);

		if(adrObjList[prop].find(e => e.adr2 == 'all')){
			adrList.push(adrObjList[prop].find(e => e.adr2 == 'all'));
		}
		else{
			for(let i=0;i<adrObjList[prop].length;i++){
				adrList.push(adrObjList[prop][i]);
			}
		}

	}


	await seon.DBCall(`CALL SP_SC_SET_ADR_N()`);
	for(let i=0;i<adrList.length;i++){
		console.log();
		if(adrList[i].adr2 == 'all'){
			await seon.DBCall(`CALL SP_SC_SET_ADR_ALL(?)`,[adrList[i].adr1]);
		}
		else{
			await seon.DBCall(`CALL SP_SC_SET_ADR(?)`,[adrList[i].adr1]);
			await seon.DBCall(`CALL SP_SC_SET_ADR(?)`,[adrList[i].adr2]);
		}
	}


	return res.send(true);
});

router.post('/sc/server/info/onOff', async function(req, res){
	await seon.DBCall(`CALL SP_SC_GET_INFO_ST_UPDATE(?)`, [req.body.st]);

	return res.send(true);
});

router.get('/sc/server/adrst1', async function(req, res){
	const reData = await seon.DBCall(`CALL SP_SC_GET_ADR_Y_1()`);

	return res.send(reData);
});

router.get('/sc/server/adrst2', async function(req, res){
	const reData = await seon.DBCall(`CALL SP_SC_GET_ADR_Y_2(?)`,[req.query.adr]);

	return res.send(reData);
});


router.get('/sc/server/adr1', async function(req, res){
	const reData = await seon.DBCall(`CALL SP_SC_GET_ADR_1()`);

	return res.send(reData);
});


router.get('/sc/server/adr2', async function(req, res){
	const reData = await seon.DBCall(`CALL SP_SC_GET_ADR_2(?)`, [req.query.cortarno]);

	return res.send(reData);
});

router.get('/sc/item', async function(req, res){
	const reData = await seon.DBOneCall(`CALL SP_SC_GET_BUILDING_ITEM(?)`, [req.query.id]);

	return res.send(reData);
});

router.get('/sc/item/building', async function(req, res){
	const reData = await seon.DBCall(`CALL SP_SC_GET_PNU_PAGE(?)`, [req.query.pnu]);

	return res.send(reData);
});
router.get('/sc/item/building2', async function(req, res){
	const reData = await seon.DBCall(`CALL SP_SC_GET_PNU_PAGE2(?)`, [req.query.pnu]);

	return res.send(reData);
});


router.post('/sc/server/reset', async function(req, res){
	await seon.DBCall(`CALL SP_SC_BUILDING_RESET()`);

	return res.send(true);
});


router.get('/total/item', async function(req, res){
	const userId = req.decoded.userId;
	const reData = await seon.DBOriginCall(`CALL SP_TOTAL_GET(?)`,[
		userId
	]);

	return res.send({
		total_count: reData[0][0].total_count,
		total_rent_count: reData[1][0].total_rent_count,
		done_count: reData[2][0].done_count,
		done_rent_count: reData[3][0].done_rent_count,
		week_count: reData[4][0].week_count,
		week_rent_count: reData[5][0].week_rent_count,
		now_count: reData[6][0].now_count,
		now_rent_count: reData[7][0].now_rent_count,

		user_total_count: reData[8][0].user_total_count,
		user_total_rent_count: reData[9][0].user_total_rent_count,
		user_done_count: reData[10][0].user_done_count,
		user_done_rent_count: reData[11][0].user_done_rent_count,
		user_week_count: reData[12][0].user_week_count,
		user_week_rent_count: reData[13][0].user_week_rent_count,
		user_now_count: reData[14][0].user_now_count,
		user_now_rent_count: reData[15][0].user_now_rent_count,

		user_client_count: reData[16][0].user_client_count,
		user_rent_client_count: reData[17][0].user_rent_client_count
	});
});

router.get('/total/view', async function(req, res){
	const userId = req.decoded.userId;
	const reData = await seon.DBCall(`CALL SP_TOTAL_VIEW_GET(?)`,[
		userId
	]);

	return res.send(reData);
});

router.get('/total/order', async function(req, res){
	const userId = req.decoded.userId;
	const reData = await seon.DBCall(`CALL SP_TOTAL_ORDER_GET()`);

	return res.send(reData);
});

router.get('/total/work', async function(req, res){
	const userId = req.decoded.userId;
	const reData = await seon.DBCall(`CALL SP_TOTAL_WORK_GET(?)`,[
		userId
	]);

	return res.send(reData);
});

router.get('/total/client', async function(req, res){
	const userId = req.decoded.userId;
	const reData = await seon.DBCall(`CALL SP_TOTAL_CLIENT_GET(?)`,[
		userId
	]);

	return res.send(reData);
});

router.get('/up/file', async function(req, res){
	const userId = req.decoded.userId; //세션 유저 아이디

	const reData = await seon.DBCall(`CALL SP_FILE_FILE_GET(?)`,[req.query.bid]);

	return res.send(reData);
});

router.get('/up/file2', async function(req, res){
	const userId = req.decoded.userId; //세션 유저 아이디

	const reData = await seon.DBCall(`CALL SP_R_FILE_FILE_GET(?)`,[req.query.bid]);

	return res.send(reData);
});

router.post('/up/file/delete', async function(req, res){
	const userId = req.decoded.userId; //세션 유저 아이디

	await seon.DBCall(`CALL SP_FILE_FILE_DEL(?)`,[
		req.body.id
	]);

	return res.send(true);
});

router.post('/up/file/delete2', async function(req, res){
	const userId = req.decoded.userId; //세션 유저 아이디

	await seon.DBCall(`CALL SP_R_FILE_FILE_DEL(?)`,[
		req.body.id
	]);

	return res.send(true);
});

router.post('/up/file/update', async function(req, res){
	const userId = req.decoded.userId; //세션 유저 아이디

	await seon.DBCall(`CALL SP_FILE_FILE_UPDATE(?,?)`,[
		req.body.id,
		req.body.name
	]);

	return res.send(true);
});

router.post('/up/file/update2', async function(req, res){
	const userId = req.decoded.userId; //세션 유저 아이디

	await seon.DBCall(`CALL SP_R_FILE_FILE_UPDATE(?,?)`,[
		req.body.id,
		req.body.name
	]);

	return res.send(true);
});

router.get('/up/file/item', async function(req, res){
	try{
	  const reData = await seon.DBOneCall(`CALL SP_FILE_FILE_ITEM_GET(?)`,[
		req.query.id
	  ]);

	var filename =  reData.path + '/' + reData.name;

	res.setHeader('Content-Disposition', `attachment; filename=${reData.name}`); 
	res.setHeader('Content-type', reData.type);

	return res.download(filename, reData.name);

	}catch(e){
	  console.log(e);
	  return res.send('');
	}

});

router.get('/up/file/item2', async function(req, res){
	try{
	  const reData = await seon.DBOneCall(`CALL SP_R_FILE_FILE_ITEM_GET(?)`,[
		req.query.id
	  ]);

	var filename =  reData.path + '/' + reData.name;

	res.setHeader('Content-Disposition', `attachment; filename=${reData.name}`); 
	res.setHeader('Content-type', reData.type);

	return res.download(filename, reData.name);

	}catch(e){
	  console.log(e);
	  return res.send('');
	}

});

router.post('/up/file', seon.fileUpload, async function(req, res){
	const userId = req.decoded.userId; //세션 유저 아이디
	// console.log(req.body.fileName);
	// console.log(req.file);
	// console.log(req.file.mimetype);
	// console.log(req.file.size);
	// console.log(Buffer.from(req.file.originalname, 'latin1').toString('utf8'));
	// console.log(req.file.filename);
	// console.log(req.file.destination);
	
	await seon.DBCall(`CALL SP_FILE_FILE_ADD(?,?,?,?,?,?,?,?)`,[
		req.body.bid,
		userId,
		req.file.mimetype,
		req.file.size,
		req.body.fileName,
		Buffer.from(req.file.originalname, 'latin1').toString('utf8'),
		req.file.filename,
		req.file.destination
	]);

	return res.send(true);
});

router.post('/up/file2', seon.fileUpload, async function(req, res){
	const userId = req.decoded.userId; //세션 유저 아이디
	
	await seon.DBCall(`CALL SP_R_FILE_FILE_ADD(?,?,?,?,?,?,?,?)`,[
		req.body.bid,
		userId,
		req.file.mimetype,
		req.file.size,
		req.body.fileName,
		Buffer.from(req.file.originalname, 'latin1').toString('utf8'),
		req.file.filename,
		req.file.destination
	]);

	return res.send(true);
});

router.get('/post/file/get', async function(req, res){
	try{
	  const reData = await seon.DBOneCall(`CALL SP_POST_FILE_ITEM_GET(?)`,[
		req.query.id
	  ]);

	var filename =  reData.path + '/' + reData.name;

	res.setHeader('Content-Disposition', `attachment; filename=${reData.name}`); 
	res.setHeader('Content-type', reData.type);

	return res.download(filename, reData.org_name);

	}catch(e){
	  console.log(e);
	  return res.send('');
	}

});

router.get('/post/get', async function(req, res){
	const userId = req.decoded.userId; //세션 유저 아이디
	
	let reData = await seon.DBPageCall('CALL SP_POST_GET(?,?,?,?,?,?)',[
		userId,
		req.query.type,

		isEmpty(req.query.recvMid),
		req.query.mode,
		isEmpty(req.query.keyword),

		req.query.page
	]);

	for(let i=0;i<reData.item.length;i++){

		let files = await seon.DBCall(`CALL SP_POST_FILE_GET(?)`,[reData.item[i].post_uid]);
		
		reData.item[i].files = [];

		for(let ii=0;ii<files.length;ii++){
			reData.item[i].files.push(files[ii]);
		}


		reData.item[i].building_name = null;

		if(reData.item[i].link_uid){
			let sql1 = '';
			if(reData.item[i].link_type == 'rent_building'){
				sql1 =  `CALL SP_R_DETAIL_ITEM(?)`;
			}else if(reData.item[i].link_type == 'building'){
				sql1 =  `CALL SP_DETAIL_ITEM(?)`;
			}
		
			
			const reBuilding = await seon.DBOneCall(sql1,[reData.item[i].link_uid]);

			if(reBuilding){
				reData.item[i].building_name = reBuilding.building_name;
			}else{
				reData.item[i].link_type = null;
				reData.item[i].link_uid = null;
			}
		}
	}


	return res.send(reData);
});

router.get('/post/get/ck', async function(req, res){
	const userId = req.decoded.userId; //세션 유저 아이디
	
	let reData = await seon.DBCall('CALL SP_POST_GET_CK(?)',[
		userId
	]);

	for(let i=0;i<reData.length;i++){

		let files = await seon.DBCall(`CALL SP_POST_FILE_GET(?)`,[reData[i].post_uid]);
		
		reData[i].files = [];

		for(let ii=0;ii<files.length;ii++){
			reData[i].files.push(files[ii]);
		}

		reData[i].building_name = null;

		if(reData[i].link_uid){
			let sql1 = '';
			if(reData[i].link_type == 'rent_building'){
				sql1 =  `CALL SP_R_DETAIL_ITEM(?)`;
			}else if(reData[i].link_type == 'building'){
				sql1 =  `CALL SP_DETAIL_ITEM(?)`;
			}
		
			const reBuilding = await seon.DBOneCall(sql1,[reData[i].link_uid]);
			
			if(reBuilding){
				reData[i].building_name = reBuilding.building_name;
			}else{
				reData.link_type = null;
				reData.link_uid = null;
			}
		}
	}


	return res.send(reData);
});

router.post('/post/recv', seon.fileUploadList, async function(req, res){
	const userId = req.decoded.userId; //세션 유저 아이디

	await seon.DBCall(`CALL SP_POST_RECV(?)`,[
		req.body.pid
	]);
	
	return res.send(true);
});

router.post('/post/delete', seon.fileUploadList, async function(req, res){
	const userId = req.decoded.userId; //세션 유저 아이디

	await seon.DBCall(`CALL SP_POST_DEL(?,?)`,[
		req.body.pid,
		req.body.postMode
	]);
	
	return res.send(true);
});

router.post('/post/star', seon.fileUploadList, async function(req, res){
	const userId = req.decoded.userId; //세션 유저 아이디

	await seon.DBCall(`CALL SP_POST_STAR(?,?)`,[
		req.body.pid,
		req.body.flag
	]);
	
	return res.send(true);
});


router.post('/post/add', seon.fileUploadList, async function(req, res){
	const userId = req.decoded.userId; //세션 유저 아이디
	
	// console.log(req.body);

	const memList = req.body.memList.split(",");


	// console.log(memList);

	// console.log(req.files);

	// for(let i=0;i<req.files.length;i++){
	// 	console.log(Buffer.from(req.files[i].originalname, 'latin1').toString('utf8'));
	// }


	for(let i=0;i<memList.length;i++){
		const reData = await seon.DBOneCall(`CALL SP_POST_ADD(?,?,?,?,?,?)`,[
			userId,
			memList[i],
			req.body.title,
			req.body.memo,
			null,
			null,
		]);
		
		for(let ii=0;ii<req.files.length;ii++){

			await seon.DBCall(`CALL SP_POST_FILE_ADD(?,?,?,?,?,?,?)`,[
				reData.id,
				userId,
				req.files[ii].mimetype,
				req.files[ii].size,
				Buffer.from(req.files[ii].originalname, 'latin1').toString('utf8'),
				req.files[ii].filename,
				req.files[ii].destination
			]);
		}
	}


	
	return res.send(true);
});

router.get('/tour/get', async function(req, res){
	const reData = await seon.DBCall(`CALL SP_W_R_USER_TOUR_GET(?)`,[req.query.userId]); 

	return res.send(reData);
});


router.post('/tour/update', async function(req, res){
	const tourList = req.body.tourList;
	for(let i=0;i<tourList.length;i++){
		await seon.DBCall(`CALL SP_W_R_USER_TOUR_UPDATE(?,?,?,?,?,?)`,[
			tourList[i].id,
			tourList[i].date,
			tourList[i].any,
			tourList[i].pickup,
			tourList[i].stEdite,
			tourList[i].stCancel
		]); 
	}

	return res.send(true);
});


router.post('/tour/delete', async function(req, res){
	await seon.DBCall(`CALL SP_W_R_USER_TOUR_DEL_ID(?)`,[req.body.id]); 

	return res.send(true);
});



router.post('/ata/user/add', async function(req, res){
	const userId = req.decoded.userId; //세션 유저 아이디

	const reIdxObj = await seon.DBOneCall(`CALL SP_R_USER_ATA_GET(?)`,[
		req.body.cid
	]); 

	let idx = 1;
	if(reIdxObj){
		idx = reIdxObj.idx + 1;
	}

	await seon.DBCall(`CALL SP_R_USER_ATA_ADD(?,?,?)`,[
		req.body.cid,
		userId,
		idx
	]); 

	const toList = [{
		to:req.body.phone,
		username:req.body.username,
		mem_phone:req.body.mem_phone,
		mem_name:req.body.mem_name,
		cnt: idx
	}];
	seon.kakaoATA(toList, 'MATCHING_N');
	

	return res.send(true);
});



router.get('/ata/user/get', async function(req, res){
	const reIdxObj = await seon.DBOneCall(`CALL SP_R_USER_ATA_GET(?)`,[
		req.query.cid
	]); 

	let idx = 1;
	if(reIdxObj){
		idx = reIdxObj.idx + 1;
	}

	return res.send({idx:idx});
});


router.get('/sms', async function(req, res){
	const userId = req.decoded.userId; //세션 유저 아이디

	// seon.kakaoATA(toList, 'MATCHING_N');

	const sql =  `CALL SP_SMS_ALL(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

	const reData = await seon.DBCall(sql,
		[
		isEmpty(req.query.st_),
		isEmpty(req.query.bName),
		isEmpty(req.query.oName),
		isEmpty(req.query.useList),
		isEmpty(req.query.lp_S),
		isEmpty(req.query.lp_E),
		isEmpty(req.query.er_S),
		isEmpty(req.query.er_E),
		isEmpty(req.query.sub),
		isEmpty(req.query.dis),
		isEmpty(req.query.floor_S),
		isEmpty(req.query.floor_E),
		isEmpty(req.query.stList),
		isEmpty(req.query.bId),
		isEmpty(req.query.preOName),
		isEmpty(req.query.sellPrice_S),
		isEmpty(req.query.sellPrice_E),
		isEmpty(req.query.sizeP_S),
		isEmpty(req.query.sizeP_E),
		isEmpty(req.query.roadWide_S),
		isEmpty(req.query.roadWide_E),
		isEmpty(req.query.roadConer),
		isEmpty(req.query.roadDual),
		isEmpty(req.query.roadName),
		isEmpty(req.query.memUid),
		isEmpty(req.query.regDate_S),
		isEmpty(req.query.regDate_E),
		isEmpty(req.query.phone),
		isEmpty(req.query.cateList),
		isEmpty(req.query.sellDate_S),
		isEmpty(req.query.sellDate_E),
		isEmpty(req.query.remodelDate_S),
		isEmpty(req.query.remodelDate_E),
		isEmpty(req.query.buildDate_S),
		isEmpty(req.query.buildDate_E),
		isEmpty(req.query.landSizePy),
		isEmpty(req.query.totalSizePy),
		isEmpty(req.query.teamId),
		isEmpty(req.query.cateId),
		isEmpty(req.query.keyword),
		isEmpty(req.query.userId)
	]);

	let phoneList = [];
	for(let i=0;i<reData.length;i++){
		if(reData[i].phone){
			phoneList.push({
				to: reData[i].phone.replace(/-/gi, ''),
				from: process.env.COOL_SMS_GEN,
				text: "안녕하세요, 대표님. 좋은 중개를 위해 항상 노력하는\n"+
				"위온어스 부동산 중개법인입니다.\n"+
				"최근 저희 회사에 유입되는 매수희망 고객분이 많아 그에 맞는 건물을 찾는 과정에 있습니다.\n"+
				"혹시 부동산 매각쪽으로 생각이 있으시다면 편하신 시간에 연락 부탁드리겠습니다.\n"+
				"최선을 다해 중개하겠습니다.\n"+
				"\n"+
				"좋은 하루 되세요.\n"
			});
		
		}
	}
	
	try{
		const re =  await seon.sendSMS(phoneList);
		
		return res.send({st:true, msg:null});
	}catch(e){
		return res.send({st:false, msg:e.message});
	}
});

router.get('/sms2', async function(req, res){
	const userId = req.decoded.userId; //세션 유저 아이디

	const sql =  `CALL SP_R_SMS_ALL(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

	const reData = await seon.DBCall(sql,
		[
		isEmpty(req.query.st_),
		isEmpty(req.query.bName),
		isEmpty(req.query.oName),
		isEmpty(req.query.useList),
		isEmpty(req.query.sub),
		isEmpty(req.query.dis),
		isEmpty(req.query.floor_S),
		isEmpty(req.query.floor_E),
		isEmpty(req.query.stList),
		isEmpty(req.query.bId),
		isEmpty(req.query.preOName),
		isEmpty(req.query.roadWide_S),
		isEmpty(req.query.roadWide_E),
		isEmpty(req.query.roadConer),
		isEmpty(req.query.roadDual),
		isEmpty(req.query.roadName),
		isEmpty(req.query.memUid),
		isEmpty(req.query.regDate_S),
		isEmpty(req.query.regDate_E),
		isEmpty(req.query.phone),
		isEmpty(req.query.cateList),
		isEmpty(req.query.sellDate_S),
		isEmpty(req.query.sellDate_E),
		isEmpty(req.query.remodelDate_S),
		isEmpty(req.query.remodelDate_E),
		isEmpty(req.query.buildDate_S),
		isEmpty(req.query.buildDate_E),
		isEmpty(req.query.rent_area_S),
		isEmpty(req.query.rent_area_E),
		isEmpty(req.query.net_area_S),
		isEmpty(req.query.net_area_E),
		isEmpty(req.query.deposit_S),
		isEmpty(req.query.deposit_E),
		isEmpty(req.query.monthly_fixed_S),
		isEmpty(req.query.monthly_fixed_E),
		isEmpty(req.query.rent_py_price),
		isEmpty(req.query.free_parking),
		isEmpty(req.query.fee_paring),
		isEmpty(req.query.interior_type),
		isEmpty(req.query.keyword),
		isEmpty(req.query.userId)
	]);

	let phoneList = [];
	for(let i=0;i<reData.length;i++){
		if(reData[i].phone){
			phoneList.push({
				to: reData[i].phone.replace(/-/gi, ''),
				from: process.env.COOL_SMS_GEN,
				text: "안녕하세요, 대표님. 좋은 중개를 위해 항상 노력하는\n"+
				"위온어스 부동산 중개법인입니다.\n"+
				"최근 저희 회사에 유입되는 매수희망 고객분이 많아 그에 맞는 건물을 찾는 과정에 있습니다.\n"+
				"혹시 부동산 매각쪽으로 생각이 있으시다면 편하신 시간에 연락 부탁드리겠습니다.\n"+
				"최선을 다해 중개하겠습니다.\n"+
				"\n"+
				"좋은 하루 되세요.\n"
			});
		
		}
	}

	// 안녕하세요, 대표님. 좋은 중개를 위해 항상 노력하는
	// 위온어스 부동산 중개법인입니다.
	// 최근 저희 회사에 유입되는 매수희망 고객분이 많아 그에 맞는 건물을 찾는 과정에 있습니다.
	// 혹시 부동산 매각쪽으로 생각이 있으시다면 편하신 시간에 연락 부탁드리겠습니다.
	// 최선을 다해 중개하겠습니다.
	
	// 좋은 하루 되세요.


	try{
		const re =  await seon.sendSMS(phoneList);
		
		return res.send({st:true, msg:null});
	}catch(e){
		return res.send({st:false, msg:e.message});
	}
});

router.post('/ex/add', async function(req, res){
	const userId = req.decoded.userId;

	await seon.DBCall(`CALL SP_EX_ADD(?,?,?)`,[
		userId,
		req.body.bid,
		req.body.building_uid
	]);

	return res.send(true);
});
router.post('/ex/del', async function(req, res){
	const userId = req.decoded.userId;

	await seon.DBCall(`CALL SP_EX_DEL(?)`,[
		req.body.id,
	]);

	return res.send(true);
});
router.get('/ex/get', async function(req, res){
	const userId = req.decoded.userId;

	const reData = await seon.DBCall(`CALL SP_EX_GET(?,?)`,[
		userId,
		req.query.bid
	]); 

	return res.send(reData);
});
router.post('/blfa', async function(req, res) {
    const userId = req.decoded.userId;
	const floorList = req.body.floorList;

	for(let i=0;i<floorList.length;i++){
		await seon.DBCall(`CALL SP_DETAIL_ITEM_FLOOR_ST_SET(?,?,?)`,[
			floorList[i].building_floor_uid,
			floorList[i].bl_ST,
			floorList[i].fa_ST,
		]); 
	}

	await seon.DBCall(`CALL SP_DETAIL_ITEM_BLFA_SET(?,?,?)`,[
		req.body.bid,
		req.body.totalBlratio,
		req.body.totalFaratio,
	]); 

	return res.send(true);
});

router.post('/working', async function(req, res) {
    const userId = req.decoded.userId;
	const mem = await seon.DBOneCall(`CALL SP_MEM_RANK_GET(?)`,[userId]);
	const work = await seon.DBOneCall(`CALL SP_BUILDING_WORKING_GET(?)`,[req.body.bid]);
	
	await seon.DBCall(`CALL SP_WORKING_START(?,?)`,[userId,req.body.bid]);
	await seon.DBCall(`CALL SP_WORKING_ADD(?,?)`,[userId,req.body.bid]);

	await seon.AddMgrLog(req,
		userId,
		req.body.bid,
		null,
		'building',
		'chg_info',
		'sell_status',
		`작업중: ${mem.mem_name} ${mem.mem_rank ?? ''}(${dayjs(work.working_sdate).format('YYYY.MM.DD')}~${dayjs(work.working_edate).format('YYYY.MM.DD')})`
	);

	return res.send(true);
});




router.post('/pdf', seon.tempUpload, async function(req, res){
	// const userId = req.decoded.userId;
	const auth = req.headers.authorization;
  	if (!auth) return res.sendStatus(401);
	const token = auth.replace('Bearer ', '');

	const url = req.body.url;
	if (!url) return res.status(400).send('url required');
	const idList = JSON.parse(req.body.idList);
	const stroage = JSON.parse(req.body.stroage);
	let browser;

	try {
		browser = await puppeteer.launch({
		headless: 'new',
		args: ['--no-sandbox', '--disable-setuid-sandbox'],
		});

		const page = await browser.newPage();

		await page.setExtraHTTPHeaders({
			Authorization: `Bearer ${token}`,
		});


		await page.goto('http://1.234.70.62:8080', {
			waitUntil: 'domcontentloaded',
		});
		// await page.goto('http://218.235.13.201:8080', {
		// 	waitUntil: 'domcontentloaded',
		// });

		await page.evaluate((token) => {
			localStorage.setItem('access_token', token);
		}, token);

		await page.evaluate((stroage) => {
			localStorage.removeItem('opList');
			localStorage.removeItem('imgObjList');
			localStorage.removeItem('pdf');

			localStorage.setItem('opList', stroage.opList);
			localStorage.setItem('imgObjList', stroage.imgObjList);
			localStorage.setItem('pdf', stroage.pdf);
		}, stroage);

		page.on('console', msg => {
			console.log('[BROWSER]', msg.text());
		});

		await page.goto(url, {
			waitUntil: 'domcontentloaded',
		});
		await page.screenshot({ path: 'debug1.png', fullPage: true });

		await page.waitForFunction(
			() => window.__VUE_READY__ === true,
			{ timeout: 5000 }
		);

		const mapImages = req.files || [];
		const mapImageMap = mapImages.map((file, index) => ({
			id: file.originalname.split('.')[0],
			image: `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
		}));

		await page.screenshot({ path: 'debug2.png', fullPage: true });

		// ✅ 모든 타겟 DOM 로딩 대기
		for (const id of idList) {
			// await page.screenshot({ path: `${id}.png`, fullPage: true });
			await page.waitForSelector(`#${id}`, { timeout: 10000 });
		}

		// await page.evaluate(() => {
		// 	document.querySelectorAll('[id^="map_"]').forEach(el => el.remove());
		// });

		// ===============================
		// 6️⃣ 지도(map_*) DOM → 이미지로 교체
		// ===============================
		// await page.evaluate((mapImages) => {
		// 	mapImages.forEach(({ id, image }) => {
		// 		const el = document.getElementById(id);
		// 		if (!el) return;

		// 		const img = document.createElement('img');
		// 		img.src = image;
		// 		img.style.width = el.offsetWidth + 'px';
		// 		img.style.height = el.offsetHeight + 'px';
		// 		img.style.display = 'block';

		// 		el.replaceWith(img);
		// 	});
		// }, mapImageMap);

		await page.evaluate(async (mapImages) => {
			const promises = [];
		  
			mapImages.forEach(({ id, image }) => {
			  const el = document.getElementById(id);
			  if (!el) return;
		  
			  const img = document.createElement('img');
			  img.src = image;
			  img.style.width = '100%';
			  img.style.height = '100%';
			  img.style.display = 'block';
		  
			  el.replaceWith(img);
		  
			  // ⭐ decode 대기
			  if (img.decode) {
				promises.push(img.decode().catch(() => {}));
			  } else {
				promises.push(new Promise(res => {
				  img.onload = img.onerror = () => res();
				}));
			  }
			});
		  
			await Promise.all(promises);
		  }, mapImageMap);

		// 이미지 로딩 대기
		// await page.evaluate(() =>
		// 	Promise.all(
		// 		Array.from(document.images)
		// 			.filter(img => !img.complete)
		// 			.map(img => new Promise(res => {
		// 				img.onload = img.onerror = res;
		// 			}))
		// 	)
		// );


		// ⭐ body 정리 + 타겟 DOM만 남기기
		await page.evaluate((ids) => {
			const targets = [];

			ids.forEach(id => {
				const el = document.getElementById(id);
				if (el) {
					const clone = el.cloneNode(true);
					targets.push(clone);
				}
			});

			document.body.innerHTML = '';
			document.body.style.margin = '0';
			document.body.style.padding = '0';

			targets.forEach(el => document.body.appendChild(el));
		}, idList);



		const mergedPdf = await PDFDocument.create();

		// ⭐ ID 하나당 한 페이지
		for (let i = 0; i < idList.length; i++) {
			const pdfBuffer = await page.pdf({
				format: 'A4',
				landscape: true,
				printBackground: true,
				margin: {
					top: '0mm',
					bottom: '0mm',
					left: '0mm',
					right: '0mm',
				},
				pageRanges: `${i + 1}`, // ⭐ 한 페이지씩
			});

			const pdf = await PDFDocument.load(pdfBuffer);
			const [pdfPage] = await mergedPdf.copyPages(pdf, [0]);
			mergedPdf.addPage(pdfPage);
		}

		const finalPdf = await mergedPdf.save();

		await browser.close();

		res.setHeader('Content-Type', 'application/pdf');
		res.setHeader('Content-Disposition', `attachment; filename=report.pdf`);
		res.end(finalPdf);




















	} catch (e) {
		console.error(e);
		res.status(500).send('PDF 생성 실패');
	} finally {
		if (browser) await browser.close();
	}
});


module.exports = router;

