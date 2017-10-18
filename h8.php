<?php date_default_timezone_set('America/Los_Angeles'); ?>
<?php
    if(isset($_GET['submit_search'])){
    $table_type = $_GET['type'];
    if($_GET['type']=="favorite"){

    }else if($_GET['type']=="place"){
      $url="https://graph.facebook.com/v2.8/search?q=".$_GET['submit_search']."&type=".$table_type."&fields=id,name,picture.width(700).height(700)&limit=25&center=".$_GET['latitude'].",".$_GET['longitude']."&access_token=EAADuIEzD6X4BAJDqGBc1vA1PHn0eccakob1vJRwXQqHKxNhgtxNZBpdvVw057krKZBoI2gnS6MfdNPSHpaLcv4ZAOkqwvbIbtDzQDLtX46UFZB2LQSKqAajwiqBVQpOhrMcQsaiLIca3ermp8fHNmPs0hENP6xeYgIKQ78CY8QZDZD";
      $json = file_get_contents($url);
      echo $json;
    }else{
      $url="https://graph.facebook.com/v2.8/search?q=".$_GET['submit_search']."&type=".$table_type."&fields=id,name,picture.width(700).height(700)&limit=25&access_token=EAADuIEzD6X4BAJDqGBc1vA1PHn0eccakob1vJRwXQqHKxNhgtxNZBpdvVw057krKZBoI2gnS6MfdNPSHpaLcv4ZAOkqwvbIbtDzQDLtX46UFZB2LQSKqAajwiqBVQpOhrMcQsaiLIca3ermp8fHNmPs0hENP6xeYgIKQ78CY8QZDZD";
      $json = file_get_contents($url);
      echo $json;
    }
  }
  if(isset($_GET['u'])){
    $url = $_GET['u'];
    $json = file_get_contents($url);
    echo $json;
  }
  if(isset($_GET['user_id'])){
    $url = "https://graph.facebook.com/v2.8/".$_GET['user_id']."?fields=albums.width(700).height(700).limit(5){name,photos.limit(2){name,picture}},posts.limit(5)&access_token=EAADuIEzD6X4BAJDqGBc1vA1PHn0eccakob1vJRwXQqHKxNhgtxNZBpdvVw057krKZBoI2gnS6MfdNPSHpaLcv4ZAOkqwvbIbtDzQDLtX46UFZB2LQSKqAajwiqBVQpOhrMcQsaiLIca3ermp8fHNmPs0hENP6xeYgIKQ78CY8QZDZD";
    $json = file_get_contents($url);
    echo $json;
  }
  if(isset($_GET['us_id'])){
    $url="https://graph.facebook.com/v2.8/".$_GET['us_id']."?fields=albums.limit(5){name,photos.limit(2){name,picture}},posts.limit(5)&access_token=EAADuIEzD6X4BAJDqGBc1vA1PHn0eccakob1vJRwXQqHKxNhgtxNZBpdvVw057krKZBoI2gnS6MfdNPSHpaLcv4ZAOkqwvbIbtDzQDLtX46UFZB2LQSKqAajwiqBVQpOhrMcQsaiLIca3ermp8fHNmPs0hENP6xeYgIKQ78CY8QZDZD";
  }
?>
