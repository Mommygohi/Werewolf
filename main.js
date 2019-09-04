var wolf;
var nameArray = [
  "SillyPineapple211", "ExperiencedWaffle432", "TestedGooGoo711", "ModestArchitect530",
  "FoxConstruct932", "ButtonExperiment420", "PuddingSniffer247", "UnanimousObject459",
  "RestlessMug173", "StunningCard740", "DrinkTent586", "ConsciousGravel644", "AttractSoil538",
  "PillowMargarine342", "TropicalGirl258", "PourSoup405", "PeanutObserver659", "QualityPigeon248"
];
var colorArray = [
  "#89005e", "#aa5730", "#2d3754", "#967cf5", "#044ebf", "orange", "pink", "turquoise",
  "#cc0793", "#475c3f", "#18cce1", "#969111", "#cd3c29", "#dfa697", "#d51935", "yellow",
  "#f57f27", "#b48aae"
];

function load(){
  //Gives all the computer characters randomly chosen names
  for(i = 1; i < 9; i++){
    var computer = "computer" + i.toString(10);
    var num = Math.floor(Math.random() * nameArray.length);
    document.getElementById(computer).innerText = nameArray[num];
    delete nameArray[num];
    var filtered = nameArray.filter(function(el){
      return el != null;
    });
    nameArray = filtered;
  }

  //Gives all the computer characters randomly chosen background colors
  for(i = 1; i < 9; i++){
    var computer = "computer" + i.toString(10);
    var num = Math.floor(Math.random() * colorArray.length);
    document.getElementById(computer).style.backgroundColor = colorArray[num];
    delete colorArray[num];
    var filtered2 = colorArray.filter(function(el){
      return el != null;
    });
    colorArray = filtered2;
  }

  //Chooses which computer character is the werewolf and asks the player for a username and color to identify themselves with
  wolf = "computer" + (Math.floor(Math.random() * 7) + 1);
  var username = window.prompt("Username: ");
  var usercolor = window.prompt("Choose a background color (must be hexadecimal or a basic color name):");
  document.getElementById("player").innerText = username;
  document.getElementById("player").style.backgroundColor = usercolor;
  if(document.getElementById("player").innerHTML.trim() == "" || document.getElementById("player").innerText == "null"){
    document.getElementById("player").innerText = "You";
  }

  if(usercolor == "" || usercolor == "white"){
    document.getElementById("player").style.backgroundColor = "black";
  }

  //Detects whether the color chosen by the player is darker or lighter
  var usercolor = usercolor.substring(1);
  var rgb = parseInt(usercolor, 16);
  var red = (rgb >> 16) & 0xff;
  var green = (rgb >>  8) & 0xff;
  var blue = (rgb >>  0) & 0xff;

  var brightness = 0.2126 * red + 0.7152 * green + 0.0722 * blue;

  if(brightness < 120) {
    document.getElementById("player").style.color = "white";
  }
}

function process(){
  document.getElementById("button").style.display = "none";
  setTimeout(wolfTurn, 1000);
  setTimeout(computerTurns, 5000);
  setTimeout(playerTurn, 5000);
}

function wolfTurn(){
  //Randomly chooses a player and kills them
  while(true){
    var num = Math.floor(Math.random() * 8);
    var target = "computer" + num.toString(10);

    if(target != wolf && document.getElementById(target).style.backgroundColor != "gray"){
      break;
    }
  }

  if(target == "computer0"){
    window.alert("You Were Killed By The Wolf!");
    var element = document.getElementById("everything");
    element.parentNode.removeChild(element);
    document.getElementById("center").innerText = "Refresh The Page To Play Again!";
    document.getElementById("center").style.marginTop = "350px";
  }
  document.getElementById(target).innerText = "Killed By Wolf";
  document.getElementById(target).style.backgroundColor = "gray";
}

var votes = [];

function computerTurns(){
  //Randomly chooses who each computer character votes to kill
  for(i = 1; i < 9; i++){
    var num = Math.floor(Math.random() * 8);
    target = "computer" + num.toString(10);
    votes.push(target);
  }
}

var warning = false;

function playerTurn(){
  //Short tutorial explaining what the player is supposed to do
  if(warning == false){
    window.alert("It is your turn to vote who you think the werewolf is. Remember that you must type their whole name correctly and exactly or your vote won't count");
    warning = true;
  }

  var target = window.prompt("Who Do You Vote To Kill:");

  //Gets the player's vote for who to kill
  for(i = 1; i < 9; i++){
    var test = "computer" + i.toString(10);

    if(target == document.getElementById(test).innerText){
        votes.push(test);
    }
  }

  //Checks to see who has been voted the most and kills them
  var mf = 1;
  var m = 0;
  var item;

  for(var i = 0; i < votes.length; i++){
    for(var j = i; j < votes.length; j++){
      if(votes[i] == votes[j]){
        m++;
        if(mf < m){
          mf = m;
          item = votes[i];
        }
      }
    }
    m = 0;
  }
  target = item;
  if(target == "computer0"){
    window.alert("You Were Killed By The Village!");
    var element = document.getElementById("everything");
    element.parentNode.removeChild(element);
    document.getElementById("center").innerText = "Refresh The Page To Play Again!";
    document.getElementById("center").style.marginTop = "350px";
  } else if(target == wolf){
    window.alert("The Village Killed The Werewolf!");
    var element = document.getElementById("everything");
    element.parentNode.removeChild(element);
    document.getElementById("center").innerText = "Refresh The Page To Play Again!";
    document.getElementById("center").style.marginTop = "350px";
  }
  document.getElementById(target).innerText="Killed By Village";
  document.getElementById(target).style.backgroundColor = "gray";
  votes = [];
  document.getElementById("button").style.display = "inline-block";
}
