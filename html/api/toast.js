//各种消息推送
function getStorePage(pageSize,pageNumber,myID,callback){  //pageSize:每页数据量 pageNumber：页码 收藏消息通知
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
          query.whereEqual({
             qid: ret.qid,
             column: 'to',
             value: myID
          });
          query.include({
              qid: ret.qid,
              column: 'who'
            });
          query.whereEqual({
             qid: ret.qid,
             column: 'isread',
             value: false
          });
         model.findAll({
           class: 'storeToast',
           qid: ret.qid
           }, function( ret, err ){
            callback(ret,err);
           });
    }
});
}

function getStoreNum(myID,callback){
  query.createQuery(function( ret, err ){  
    if( err ){
          
    }else{
          query.whereEqual({
             qid: ret.qid,
             column: 'to',
             value: myID
          });
          query.whereEqual({
             qid: ret.qid,
             column: 'isread',
             value: false
          });
         model.findAll({
           class: 'storeToast',
           qid: ret.qid
           }, function( ret, err ){
            callback(ret,err);
           });
    }
});
}

function getCommentPage(pageSize,pageNumber,myID,callback){  //pageSize:每页数据量 pageNumber：页码 评论消息通知
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
          query.whereEqual({
             qid: ret.qid,
             column: 'to',
             value: myID
          });
          query.include({
              qid: ret.qid,
              column: 'who'
            });
          query.whereEqual({
             qid: ret.qid,
             column: 'isread',
             value: false
          });
         model.findAll({
           class: 'commentToast',
           qid: ret.qid
           }, function( ret, err ){
            callback(ret,err);
           });
    }
});
}

function getCommentNum(myID,callback){
  query.createQuery(function( ret, err ){  
    if( err ){
          
    }else{
          query.whereEqual({
             qid: ret.qid,
             column: 'to',
             value: myID
          });
          query.whereEqual({
             qid: ret.qid,
             column: 'isread',
             value: false
          });
         model.findAll({
           class: 'commentToast',
           qid: ret.qid
           }, function( ret, err ){
            callback(ret,err);
           });
    }
});
}

function getAttenPage(pageSize,pageNumber,myID,callback){  //pageSize:每页数据量 pageNumber：页码 关注消息通知
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
          query.whereEqual({
             qid: ret.qid,
             column: 'to',
             value: myID
          });
          query.whereEqual({
             qid: ret.qid,
             column: 'isread',
             value: false
          });
          query.include({
              qid: ret.qid,
              column: 'who'
            });
         model.findAll({
           class: 'attenToast',
           qid: ret.qid
           }, function( ret, err ){
            callback(ret,err);
           });
    }
});
}

function getAttenNum(myID,callback){
  query.createQuery(function( ret, err ){  
    if( err ){
          
    }else{
          query.whereEqual({
             qid: ret.qid,
             column: 'to',
             value: myID
          });
          query.whereEqual({
             qid: ret.qid,
             column: 'isread',
             value: false
          });
         model.findAll({
           class: 'attenToast',
           qid: ret.qid
           }, function( ret, err ){
            callback(ret,err);
           });
    }
});
}