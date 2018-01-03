//     文章相关的数据接口
function getPage(pageSize, pageNumber, callback) {//pageSize:每页数据量 pageNumber：页码
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
			query.include({
				qid : ret.qid,
				column : 'author'
			});
			query.whereEqual({
				qid : ret.qid,
				column : 'type',
				value : 1
			});
			model.findAll({
				class : 'article',
				qid : ret.qid
			}, function(ret, err) {
				callback(ret, err);
			});
		}
	});
}

function getMyPage(pageSize, pageNumber, myID,type,callback) {//pageSize:每页数据量 pageNumber：页码
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
			query.include({
				qid : ret.qid,
				column : 'author'
			});
			query.whereEqual({
				qid : ret.qid,
				column : 'type',
				value : type
			});
			query.whereEqual({
				qid : ret.qid,
				column : 'author',
				value : myID
			});
			model.findAll({
				class : 'article',
				qid : ret.qid
			}, function(ret, err) {
				callback(ret, err);
			});
		}
	});
}

function addComment(id, data, callback) {
	query.createQuery(function(ret, err) {
		if (err) {
		} else {
			query.whereEqual({
				qid : ret.qid,
				column : 'id',
				value : data.id
			});
			query.include({
				qid : ret.qid,
				column : 'commentUser'
			});
			query.include({
				qid : ret.qid,
				column : 'main'
			});
			model.findAll({
				class : 'articleComment',
				qid : ret.qid
			}, function(ret, err) {
				if (err) {
				} else {
					var newComment = ret[0];
					findById('articleComment', id, function(ret, err) {
						if (err) {
							callback(null, err);
						} else {
							ret.list.push(newComment);
							updateById('articleComment', id, {
								list : ret.list
							}, function(ret, err) {
								if (err) {
									callback(null, err);
								} else {
									callback(ret, null);
								}
							})
						}
					});

				}
			});
		}
	});

}

function getComment(diaryId, callback) {//获取对应文章的评论列表

	query.createQuery(function(ret, err) {
		if (err) {

		} else {

			query.desc({
				qid : ret.qid,
				column : 'createdAt'
			});
			query.include({
				qid : ret.qid,
				column : 'commentUser'
			});
			query.include({
				qid : ret.qid,
				column : 'main'
			});
			query.whereEqual({
				qid : ret.qid,
				column : 'main',
				value : diaryId
			});
			query.whereEqual({
				qid : ret.qid,
				column : 'show',
				value : true
			});
			model.findAll({
				class : 'articleComment',
				qid : ret.qid
			}, function(ret, err) {
				callback(ret, err);
			});
		}
	});
}