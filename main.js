function setup() {
    canvas = createCanvas(380 , 380)
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}
    function start() {
 
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects" ;
    object_name = document.getElementById("object_name").value;
    }
    
    
    
    status = "";
    objects = [];
   
    
    
    function draw(){
    image(img, 0,0,640,420);
         if(status !=""){
    
          r =random(255);
          g = random(255)
          b= random(255)
    
    
        for(i = 0; i < objects.length; i++)
        {
          document.getElementById("status").innerHTML = "status : obejct Detected";
    
          fill(r,g,b);
          percent = floor(objects[i].confidence * 100 );
          text(objects[i].label + "" + percent + "%", objects[i].x+15, objects[i].y+15);
           noFill();
           stroke(r,g,b);
           rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
           if (objects[i].label==object_name)
           {
             video.stop();
             document.getElementById("object_status").innerHTML="objectfound";


           }
           else{
            document.getElementById("object_status").innerHTML="objectnotfound";

           }
        
    
        }
    }
    }
    
    function modelLoaded(){
    console.log("Model Loaded")
    status = true;
    objectDetector.detect(img, gotResult);
    
    
    }
    
    function gotResult(error, results){
    if (error){
    console.log(error);
    
    }
    
    console.log(results);
    objects = results;
    }