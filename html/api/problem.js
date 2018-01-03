//     文章相关的数据接口
function getPage(pageSize,pageNumber,callback){  //pageSize:每页数据量 pageNumber：页码 
   query.createQuery(function( ret, err ){
    if( err ){
          
    }else{
         query.limit({
           qid: ret.qid, 
           value: pageSize
         });
         query.skip({
            qid: ret.qid, 
            value: (pageNumber-1)*pageSize
          });
          query.desc({
              qid: ret.qid, 
              column: 'createdAt'
           });
          query.include({
              qid: ret.qid,
              column: 'author'
            });
          query.whereEqual({
             qid: ret.qid,
             column: 'type',
             value: 1
          });
         model.findAll({
           class: 'problem',
           qid: ret.qid
           }, function( ret, err ){
            callback(ret,err);
           });
    }
});
}

function getProblem(pageSize,pageNumber,callback){ //pageSize:每页数据量 pageNumber：页码  获取待解答的问题 
   query.createQuery(function( ret, err ){
    if( err ){
          
    }else{
         query.limit({
           qid: ret.qid, 
           value: pageSize
         });
         query.skip({
            qid: ret.qid, 
            value: (pageNumber-1)*pageSize
          });
          query.desc({
              qid: ret.qid, 
              column: 'createdAt'
           });
          query.include({
              qid: ret.qid,
              column: 'author'
            });
          query.whereEqual({
             qid: ret.qid,
             column: 'status',
             value: 0
          });
          query.whereEqual({
             qid: ret.qid,
             column: 'isStart',
             value: 0
          });
         model.findAll({
           class: 'problem',
           qid: ret.qid
           }, function( ret, err ){
            callback(ret,err);
           });
    }
});
}

function getAnswer(pid,callback){
   query.createQuery(function( ret, err ){
    if( err ){
          
    }else{
          query.desc({
              qid: ret.qid, 
              column: 'createdAt'
           });
          query.include({
              qid: ret.qid,
              column: 'helper'
            });
          query.include({
              qid: ret.qid,
              column: 'main'
            });
          query.whereEqual({
             qid: ret.qid,
             column: 'main',
             value: pid
          });
          
         model.findAll({
           class: 'answer',
           qid: ret.qid
           }, function( ret, err ){
            callback(ret,err);
           });
    }
});
}

function getMyPage(pageSize,pageNumber,myID,type,callback){  //pageSize:每页数据量 pageNumber：页码 
   query.createQuery(function( ret, err ){
    if( err ){
          
    }else{
         query.limit({
           qid: ret.qid, 
           value: pageSize
         });
         query.skip({
            qid: ret.qid, 
            value: (pageNumber-1)*pageSize
          });
          query.desc({
              qid: ret.qid, 
              column: 'createdAt'
           });
          query.include({
              qid: ret.qid,
              column: 'author'
            });
          query.whereEqual({
             qid: ret.qid,
             column: 'type',
             value: type
          });
          query.whereEqual({
             qid: ret.qid,
             column: 'author',
             value: myID
          });
         model.findAll({
           class: 'problem',
           qid: ret.qid
           }, function( ret, err ){
            callback(ret,err);
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
				class : 'problemComment',
				qid : ret.qid
			}, function(ret, err) {
				if (err) {
				} else {
					var newComment = ret[0];
					findById('problemComment', id, function(ret, err) {
						if (err) {
							callback(null, err);
						} else {
							ret.list.push(newComment);
							updateById('problemComment', id, {
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

function getComment(diaryId,callback){  //获取对应文章的评论列表
  
  query.createQuery(function( ret, err ){
    if( err ){
          
    }else{
         
          query.desc({
              qid: ret.qid, 
              column: 'createdAt'
           });
          query.include({
              qid: ret.qid,
              column: 'commentUser'
            });
         query.include({
              qid: ret.qid,
              column: 'main'
            });
          query.whereEqual({
             qid: ret.qid,
             column: 'main',
             value: diaryId
          });
          query.whereEqual({
				qid : ret.qid,
				column : 'show',
				value : true
			});
         model.findAll({
           class: 'problemComment',
           qid: ret.qid
           }, function( ret, err ){
            callback(ret,err);
           });
    }
});
}