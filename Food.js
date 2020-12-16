class Food {
    constructor(){
        this.image = loadImage("Food Stock.png");
        this.garden = loadImage("Garden.png");
        this.livingRoom = loadImage("Living Room.png");
        this.foodStock = 20;
        this.lastFed;
        this.currentTime;
    }
    
    getFoodStock(){
        database.ref("Food").on("value",(data)=>{
            this.foodStock = data.val();
        });
    }

    updateFoodStock(){
        database.ref("/").update({"Food":this.foodStock});

        //foodStock = this.foodStock;
    }

    deductFood(){
        if(this.foodStock > 0){
            this.foodStock = this.foodStock - 1;
            database.ref("/").update({"Food":this.foodStock, "FeedTime": hour()});
            database.ref("FeedTime").on("value",(data)=>{
                this.lastFed = data.val();
                //console.log(this.lastFed);
            });

            database.ref("/").update({"CurrentTime": hour()});
            database.ref("CurrentTime").on("value",(data)=>{
                this.currentTime = data.val();
            });

            //console.log(this.lastFed);
        }
    }


    display(){
        var x = 80;
        var y = 100;

        //console.log(this.lastFed);
        
        database.ref("/").update({"CurrentTime": hour()});
        database.ref("CurrentTime").on("value",(data)=>{
            this.currentTime = data.val();
        });
        //console.log(this.lastFed);
        
        imageMode(CENTER);

        //console.log(this.foodStock);

        if(this.foodStock != 0){
            for(var i =0; i < this.foodStock; i++){
                if(i % 10 == 0){
                    x = 400;
                    y = y + 70;
                }
                image(this.image,x,y,50,50);
                x = x + 50;
            }
        }
    }
}