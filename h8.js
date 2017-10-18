var app = angular.module('myApp',[]);
app.controller('testCtrl',['$scope','$http',function($scope,$http){
  var page_url_next = null;
  var page_url_previous = null;
  var num = 1;
  var user_ids = new Array();
  var count = 0;
  var detail_userid = 0;
  var details_name = null;
  var myVar = null;
  var lat = null;
  var long = null;
  $scope.detail_star_on = true;
  $scope.detail_star_off = false;
  $scope.data_albums = true;
  $scope.data_albums_no = false;
  $scope.data_posts = true;
  $scope.data_posts_no = false;
  if(lat==null){
    var id_location = setInterval(locationget,0);
    function locationget(){
        clearInterval(id_location);
        navigator.geolocation.getCurrentPosition(function(pos) {
        lat = pos.coords.latitude;
        long = pos.coords.longitude;
        console.log(lat);
      });
    }
  }
  for(var m = 0;m<100;m++){
    user_ids[m] = m;
  }
  $scope.tableprogress_submits = function(){
    $scope.table_progress = true;
    $scope.table_user_display = false;
    $scope.table_user_next_display = false;
    $scope.table_user_previous_display = false;
    $scope.table_user_detail_display =false;
    $scope.table_favorite_display = false;
    $scope.page_show=false;
    $scope.data_albums = false;
    $scope.data_albums_no = false;
    $scope.data_posts = false;
    $scope.data_posts_no = false;
    var id_sub = setInterval(frame,1500);
    var id_favorite = setInterval(favorite,2000);
    function frame(){
        clearInterval(id_sub);
        submits();
    }
    function favorite(){
      clearInterval(id_favorite);
      for(var j=0;j<100;j++){
        var k =localStorage.getItem(user_ids[j]);
        if(document.getElementById(k)!=null){
            if(document.getElementById(k+"_on").style.display=="block"){
                document.getElementById(k+"_on").style.display="none";
                document.getElementById(k+"_off").style.display="block";
              }
          }
        }
    }

  };
  $scope.tableprogress_next = function(){
    $scope.table_user_next_display = false;
    $scope.table_progress = true;
    $scope.page_show=false;
    $scope.table_user_display = false;
    $scope.table_user_previous_display = false;
    $scope.table_user_detail_display =false;
    $scope.table_favorite_display = false;
    $scope.data_albums = false;
    $scope.data_albums_no = false;
    $scope.data_posts = false;
    $scope.data_posts_no = false;
    var id_sub = setInterval(frame,1000);
    var id_favorite = setInterval(favorite,1500);
    function frame(){
        clearInterval(id_sub);
        next();
    }
    function favorite(){
      clearInterval(id_favorite);
      for(var j=0;j<100;j++){
        var k =localStorage.getItem(user_ids[j]);
        if(document.getElementById(k)!=null){
            if(document.getElementById(k+"_on").style.display=="block"){
                document.getElementById(k+"_on").style.display="none";
                document.getElementById(k+"_off").style.display="block";
              }
          }
        }
    }
  };
  $scope.tableprogress_previous = function(){
    $scope.table_progress = true;
    $scope.table_user_previous_display = false;
    $scope.page_show=false;
    $scope.table_user_next_display = false;
    $scope.table_user_detail_display =false;
    $scope.table_user_display = false;
    $scope.table_favorite_display = false;
    $scope.data_albums = false;
    $scope.data_albums_no = false;
    $scope.data_posts = false;
    $scope.data_posts_no = false;
    var id_sub = setInterval(frame,1000);
    var id_favorite = setInterval(favorite,1500);
    function frame(){
        clearInterval(id_sub);
        previous();
    }
    function favorite(){
      clearInterval(id_favorite);
      for(var j=0;j<100;j++){
        var k =localStorage.getItem(user_ids[j]);
        if(document.getElementById(k)!=null){
            if(document.getElementById(k+"_on").style.display=="block"){
                document.getElementById(k+"_on").style.display="none";
                document.getElementById(k+"_off").style.display="block";
              }
          }
        }
    }
  };
  var submits=function(){
    $scope.table_user_display = true;
    $scope.table_user_next_display = false;
    $scope.table_user_previous_display = false;
    $scope.table_user_detail_display = false;
    $scope.table_progress = false;
    $scope.table_favorite_display = false;
    $scope.page_show=true;
    $http({
      url :"h8.php",
      method : "GET",
      params:{
        submit_search:$("#search").val(),
        type:$('#tabs li.active a').attr("id"),
        latitude:lat,
        longitude:long,
      }
    }).then(function successCallback(response){
        console.log(response.data);
        $scope.table_data = response.data;
        if(response.data.paging!=null){
          page_url_next = response.data.paging.next;
          page_url_previous = response.data.paging.previous;
        }
        num = 1;
        $scope.num = num;
    },function errorCallback(response){
      console.log("fail");
      $scope.table_data = response.statusText;
    });
    }
  var next=function(){
    $scope.table_user_display = false;
    $scope.table_user_next_display = true;
    $scope.table_user_previous_display = false;
    $scope.table_user_detail_display = false;
    $scope.table_progress = false;
    $scope.table_favorite_display = false;
    $scope.page_show=true;
    num = num+25;
    $http({
      url:"h8.php",
      method:"GET",
      params:{
        u:page_url_next,
      }
    }).then(function successCallback(response){
      $scope.table_data_next = response.data;
      page_url_next = response.data.paging.next;
      page_url_previous = response.data.paging.previous;
      $scope.num = num;
    },function errorCallback(respons){
      $scope.table_data = response.statusText;
    });
  }
  var previous=function(){
    $scope.table_user_display = false;
    $scope.table_user_next_display = false;
    $scope.table_user_previous_display = true;
    $scope.table_user_detail_display = false;
    $scope.table_progress = false;
    $scope.table_favorite_display = false;
    $scope.page_show=true;
    num = num-25;
    $http({
      url:"h8.php",
      method:"GET",
      params:{
        u:page_url_previous,
      }
    }).then(function successCallback(response){
      $scope.table_data_previous = response.data;
      page_url_next = response.data.paging.next;
      page_url_previous = response.data.paging.previous;
      $scope.num = num;
    },function errorCallback(respons){
      $scope.table_data = response.statusText;
    });
  }
  $scope.details=function(user,name,url){
    $scope.table_user_display = false;
    $scope.table_user_next_display = false;
    $scope.table_user_previous_display = false;
    $scope.table_user_detail_display = true;
    $scope.table_progress = false;
    $scope.table_favorite_display = false;
    $scope.page_show=false;
    $scope.detail_id= user;
    detail_userid = user;
    $scope.user_name = name;
    $scope.user_url = url;
    details_name = name;
    for(var j=0;j<100;j++){
      if(localStorage.getItem(user_ids[j])!=null&&localStorage.getItem(user_ids[j])==(user+"")){
        $scope.detail_star_on = false;
        $scope.detail_star_off = true;
        break;
      }else{
        $scope.detail_star_on = true;
        $scope.detail_star_off = false;
      }
    }
    $http({
      url:"h8.php",
      method:"GET",
      params:{
        user_id :user,
      }
    }).then(function successCallback(response){
      $scope.table_detail = response.data;
      if(response.data.posts==null){
        $scope.data_posts = false;
        $scope.data_posts_no = true;
      }else{
        $scope.data_posts = true;
        $scope.data_posts_no = false;
      }
      if(response.data.albums==null){
        $scope.data_albums = false;
        $scope.data_albums_no = true;
      }else{
        $scope.data_albums = true;
        $scope.data_albums_no = false;
      }
    },function errorCallback(response){
      console.log("fail");
    });
  }
  $scope.local_storage=function(user){
    $scope.page_show=true;
    $scope.table_progress = false;
    if(user==1){
      for(var j=0;j<100;j++){
        var k =localStorage.getItem(user_ids[j]);
        if(document.getElementById(k)!=null){
          if(document.getElementById(k+"_on").style.display=="block"){
            document.getElementById(k+"_on").style.display="none";
            document.getElementById(k+"_off").style.display="block";
          }
        }
      }
    }
    else if(typeof(Storage)!=="undefined"){
      var on= document.getElementById(user+"_on");
      var off= document.getElementById(user+"_off");
      if(on.style.display=="block"){
        on.style.display="none";
        off.style.display="block";
        while(localStorage.getItem(user_ids[count])!=null){
          count++;
        }
        if(localStorage.getItem(user_ids[count])==null){
          localStorage.setItem(user_ids[count],user+"");
          count++;
        }
      }else if(off.style.display=="block"){
        on.style.display= "block";
        off.style.display= "none";
        for(var i=0;i<100;i++){
          if(localStorage.getItem(user_ids[i])==(user+"")){
            localStorage.removeItem(user_ids[i]);
          }
        }
      }
    }else{
    }
  }
  $scope.back=function(){
    $scope.tableprogress_submits();
  }
  $scope.clear = function(){
    localStorage.clear();
    var text_keyword = document.getElementById("search");
    submits();
    text_keyword.value="";
  }
  $scope.addfav=function(){
        if($scope.detail_star_on==true){
          for(var n=0;n<100;n++){
            if(localStorage.getItem(user_ids[n])==null){
              localStorage.setItem(user_ids[n],detail_userid+"");
              break;
            }
          }
          $scope.detail_star_on = false;
          $scope.detail_star_off = true;
        }else{
          for(var n=0;n<100;n++){
            if((localStorage.getItem(user_ids[n])!=null)&&(localStorage.getItem(user_ids[n])==(detail_userid+""))){
              localStorage.removeItem(user_ids[n]);
            }
          }
          $scope.detail_star_on = true;
          $scope.detail_star_off = false;
      }
  }
  $scope.face_book=function(){
    FB.init({
      appId:261822494271870,
      xfbml:true,
      version:'v2.8',
    });
    FB.AppEvents.logPageView();
    FB.ui({
      picture:$scope.user_url,
      method:'feed',
      link:window.location.href,
      name:$scope.user_name,
      caption:"FB SEARCH FROM USC CSCI571",
    },function(response){
      if(response){
        alert("Posted Successfully");
      }else{
        alert("Not Posted");
      }
    });
  }
  var tablefavorites = function(){
    $scope.table_user_display = false;
    $scope.table_user_next_display = false;
    $scope.table_user_previous_display = false;
    $scope.table_user_detail_display =false;
    $scope.table_progress = false;
    $scope.table_favorite_display = true;
    $scope.page_show=false;
    $scope.data_albums = false;
    $scope.data_albums_no = false;
    $scope.data_posts = false;
    $scope.data_posts_no = false;
    for(var j=0;j<100;j++){
      var k =localStorage.getItem(user_ids[j]);
      if(k!=null){
        console.log(k);
        $http({
          url:"h8.php",
          method:"GET",
          params:{
            us_id:localStorage.getItem(user_ids[j]),
          }
        }).then(function successCallback(response){
          $scope.table_data_us_id = response.data;
          console.log(response.data);

        },function errorCallback(response){
          $scope.table_data = response.statusText;
          console.log("fail");
        });
      }

    }
  }
}]);
