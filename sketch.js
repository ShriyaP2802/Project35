//Create variables here
var dog, happyDog;
var database, foodS, foodStock;
var button1, button2;
var fedTime, lastFed;
var foodObj;
function preload()
{
	//load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);

  dog = createSprite(250,300,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.15;
  
  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  feed = createButton("Feed the dog");
  feed.position(350,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(450,95);
  addFood.mousePressed(addFoods);

  foodObj = new Food(100,100,10,10);
}


function draw() {  
background(46, 139, 87);

  drawSprites()

  //add styles here
  textSize(20);
fill(255,255,254);
text("food stock is" + foodS, 150, 200);

textSize(15);
if(lastFed>=12){
  text("Last Feed :"+ lastFed%12 + "PM",350,30);
}else if(lastFed==0){
  text("Last Feed : 12 AM"+ lastFed + "AM",350,30);
}else{
  text("Last Feed : "+ lastFed + "AM",350,30);
}

foodObj.display();

fedTime = database.ref('FeedTime');
fedTime.on("value", function(data){
  lastFed = data.val();
});


}

function readStock(data){
  foodS = data.val();
}
function writeStock(x){
  if (x<=0 ){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function feedDog(){
  dog.addImage(happyDogImg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
  Food:foodObj.getFoodStock(),
  FeedTime:hour()
  })
}



