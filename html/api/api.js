//一些公共的api，简化代码

function uploadFile(file, callback) {//上传文件
	model.uploadFile({
		report : false,
		data : {
			file : {
				name : new Date().toLocaleString(),
				url : file
			}
		}
	}, function(ret, err) {
		callback(ret,err);
	});

}

function record(className,id,type,callback){  //纪录喜欢 type=like收藏type=store浏览数  type=view
   findById(className,id,function(ret,err){
       if(err){
         callback(null,err);
       }else{
         var data = {};
         if('like'==type){
            data={like:ret.like+1};
         }else if('store'==type){
            data={store:ret.store+1};
         }else if('view'==type){
            data={view:ret.view+1};
         }
         updateById(className,id,data,function(ret,err){
            if(err){
              callback(null,err);
            }else{
              callback(ret,null);
            }
         });
       }
   });
}

function cancel(className,id,type,callback){  //纪录喜欢 type=like收藏type=store浏览数  type=view
   findById(className,id,function(ret,err){
       if(err){
         callback(null,err);
       }else{
         var data = {};
         if('like'==type){
            data={like:ret.like-1};
         }else if('store'==type){
            data={store:ret.store-1};
         }else if('view'==type){
            data={view:ret.view-1};
         }
         updateById(className,id,data,function(ret,err){
            if(err){
              callback(null,err);
            }else{
              callback(ret,null);
            }
         });
       }
   });
}

function getCommonPage(className, pageSize, pageNumber, callback) {//pageSize:每页数据量 pageNumber：页码 class:查询表名
	query.createQuery(function(ret, err) {
		if (err) {

		} else {
			query.limit({
				qid : ret.qid,
				value : pageSize
			});
			query.skip({
				qid : ret.qid,
				value : (pageNumber - 1) * pageSize
			});
			query.desc({
				qid : ret.qid,
				column : 'createdAt'
			});
			model.findAll({
				class : className,
				qid : ret.qid
			}, function(ret, err) {
				callback(ret, err);
			});
		}
	});
}

function findByKey(className, column, value, callback) {
	query.createQuery(function(ret, err) {
		if (err) {

		} else {
			query.whereEqual({
				qid : ret.qid,
				column : column,
				value : value
			});
			model.findAll({
				class : className,
				qid : ret.qid
			}, function(ret, err) {
				callback(ret, err);
			});
		}
	});
}

function save(className, data, callback) {
	model.insert({
		class : className,
		value : data
	}, function(ret, err) {
		callback(ret, err);
	});
}

function findById(className, id, callback) {
	model.findById({
		class : className,
		id : id
	}, function(ret, err) {
		callback(ret, err);
	});
}

function updateById(className, id, data, callback) {
	model.updateById({
		class : className,
		id : id,
		value : data
	}, function(ret, err) {
		callback(ret, err);
	});
}



function deleteById(className, id, callback) {
	model.deleteById({
		class : className,
		id : id
	}, function(ret, err) {
		callback(ret, err);
	});
}

function logins(phone, password, callback) {//简单登陆
	query.createQuery(function(ret, err) {
		if (err) {

		} else {
			query.whereEqual({
				qid : ret.qid,
				column : 'mobile',
				value : phone
			});
			query.whereEqual({
				qid : ret.qid,
				column : 'passw',
				value : password
			});
			model.findAll({
				class : 'user',
				qid : ret.qid
			}, function(ret, err) {
				callback(ret, err);
			});
		}
	});
}

function findPassword(phone, password, callback) {//找回密码
	findByKey('user', 'mobile', phone, function(ret, err) {
		if (err) {
			callback(null, err);
		} else {
			if (ret.length > 0) {//修改密码
				updateById('user', ret[0].id, {
					passw : password
				}, function(ret, err) {
					callback(ret, err);
				})
			} else {//注册新帐号
				save('user', {
					mobile : phone,
					password:password,
					passw : password,
					username : 'name',
					device : '',
					friendNum:0,
					userRank:0,
					acstatus:1,
					loginTimes:0,
					askPoint:0,
					hotPoint:0,
					kaopuPoint:0,
					totalPoint:0,
					avatar : 'http://7zcdtn.com1.z0.glb.clouddn.com/apicloud/4fca49b720943508d4a81f69c5a90eb6.png'
				}, function(ret, err) {

					callback(ret, err);
				})
			}
		}
	})
}

//使用moment.js来解析时间
function fromNow(time, format, now) {
	//moment("2017-11-20 09:11:21", "YYYY-MM-DD h:mm:ss").startOf('minute').fromNow();

	moment.locale('zh-cn');
	var t = moment(time).format("YYYY-MM-DD h:mm:ss");
	return moment(t, format).startOf(now).fromNow();
}

function format(time){
return moment(time).format("YYYY-MM-DD h:mm");
}