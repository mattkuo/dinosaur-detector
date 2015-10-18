var clarifai;

function test() {
  // happiness
  clarifai.positive('http://www.projectgenesis.org/wp-content/uploads/man-smiling-in-black-shirt.jpg', 'happiness');
  clarifai.positive('http://blog.zoom.us/wp-content/uploads/2013/09/78813113.jpg', 'happiness');
  clarifai.positive('http://www.dosahnetevseho.cz/obsah-webu/uploads/2015/09/muz2.jpg', 'happiness');
  clarifai.positive('http://seiteki.com/img/dansei.jpg', 'happiness');

  clarifai.train('happiness');

  // soft drink
  clarifai.positive('http://www.foodnavigator-asia.com/var/plain_site/storage/images/publications/food-beverage-nutrition/foodnavigator-asia.com/markets/soft-drinks-losing-their-fizz-among-younger-australians/8567380-2-eng-GB/Soft-drinks-losing-their-fizz-among-younger-Australians_strict_xxl.jpg', 'soft drink');
  clarifai.positive('http://www.miconnational.com.au/pictures/orig/599%20013%20400.jpg', 'soft drink');
  clarifai.positive('http://cliparts.co/cliparts/rcj/K9b/rcjK9b5Mi.jpg', 'soft drink');
  clarifai.positive('http://fitnessbypatty.com/wp-content/uploads/soda-can-253x300.jpeg', 'soft drink');

  clarifai.train('soft drink');

  // iphone +ive
  clarifai.positive('https://upload.wikimedia.org/wikipedia/commons/3/3b/IPhone_5s_top.jpg', 'iphone');
  clarifai.positive('http://www.imore.com/sites/imore.com/files/styles/w300h225crop/public/field/image/2014/10/iphone_6_plus_review_hero_0.jpg?itok=8JGcDm5N ', 'iphone');
  clarifai.positive('https://gigaom.com/wp-content/uploads/sites/1/2014/09/iphone-6.jpg?quality=80&strip=all', 'iphone');
  clarifai.positive('http://cdn.mos.techradar.com/art/mobile_phones/iPhone/iPhone%206/Hands%20on%20-%20review/iPhone%206%20review%20(112)-970-80.jpg ', 'iphone');
  clarifai.positive('http://blogs-images.forbes.com/antonyleather/files/2014/09/iphone-6.jpg', 'iphone');
  clarifai.positive('http://blog.emsisoft.com/wp-content/uploads/2015/01/iphone-410324_640.jpg', 'iphone');
  clarifai.positive('http://i.imgur.com/Ozkk5QU.jpg', 'iphone');
  clarifai.positive('http://i.imgur.com/neqpeBa.jpg', 'iphone');

  // iphone -ive
  clarifai.negative('http://cdn1.mos.techradar.futurecdn.net//art/mobile_phones/Nokia/3%20Nokia%201110-580-90.jpg', 'iphone');
  clarifai.negative('http://core0.staticworld.net/images/article/2015/03/macbook-100574906-primary.idge.jpg', 'iphone');
  clarifai.negative('http://buildequinox.com/wp-content/uploads/2012/04/IMG_9913.jpg', 'iphone');
  clarifai.negative('http://www.gorillaconvict.com/wp-content/uploads/2012/04/cell-phone-pda-batteries.jpg', 'iphone');
  clarifai.negative('https://upload.wikimedia.org/wikipedia/commons/0/05/AlphaGrip_Handheld_Keyboard_placed_on_top_of_a_table,_Oct_2013.png', 'iphone');
  clarifai.negative('http://i.imgur.com/cXeJjxi.jpg', 'iphone');

  clarifai.train('iphone');

  // bottle
  clarifai.positive('http://www.pxleyes.com/images/contests/in-a-hand/fullsize/Water-bottle-4e6ee8ce3df69_hires.jpg', 'bottle');
  clarifai.positive('http://www.emergencyfoodstorage.co.uk/product_images/uploaded_images/aquamira-water-bottle-hand.jpg', 'bottle');
  clarifai.positive('http://www.rantplaces.com/wp-content/uploads/2015/03/water1.jpg', 'bottle');
  clarifai.positive('http://philipciccarello.com/wp-content/uploads/2010/07/Crushed_Water_Bottle_For_Easy_Grip-223x300.jpg', 'bottle');
  clarifai.positive('https://mediabakery.files.wordpress.com/2013/12/mediabakery_mnt0004698.jpg', 'bottle');

  clarifai.train('bottle');

  clarifai.positive('http://mywisemom.com/wp-content/uploads/2013/09/Apple-Hand1.jpg ', 'apple');
  clarifai.positive('https://c1.staticflickr.com/5/4127/4972887015_4794339a46_b.jpg', 'apple');
  clarifai.positive('https://c1.staticflickr.com/3/2884/10743700406_d7c1ac8d81_b.jpg', 'apple');
  clarifai.positive('http://res.freestockphotos.biz/pictures/9/9554-a-hand-holding-a-bitten-green-apple-pv.jpg', 'apple');
  clarifai.positive('https://itchylittleworld.files.wordpress.com/2012/08/img_3590.jpg', 'apple');

  clarifai.negative('http://hwalls.com/upload/grushi_wallpaper1329.jpg', 'apple');
  clarifai.negative('http://weknowyourdreams.com/image.php?pic=/images/banana/banana-06.jpg', 'apple');
  clarifai.negative('http://pad1.whstatic.com/images/thumb/6/6d/Make-Orange-Juice-Step-1-Version-2.jpg/670px-Make-Orange-Juice-Step-1-Version-2.jpg', 'apple');
  clarifai.negative('https://upload.wikimedia.org/wikipedia/commons/2/29/PerfectStrawberry.jpg', 'apple');

  clarifai.train('apple');

}

function pred() {
  clarifai.predict('http://www.sodastream.ca/shop/images/DishwasherSafeBottle.jpg', 'bottle', function(prediction) {
    console.log(prediction);
  });
}

$(document).ready(function(){
  clarifai = new Clarifai(
    {
      'clientId': ***REMOVED***,
      'clientSecret': ***REMOVED***
    }
  );


});
