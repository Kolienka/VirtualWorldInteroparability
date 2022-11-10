class KeyPressListener{
    constructor(keyCode, action){
        let keySafe = true;
        this.keyDownFunction = function(e){
            if(e.code == keyCode){
                if(keySafe){
                    console.log("action ")
                    keySafe = false;
                    action();
                }
            }
        };
        this.keyUpFunction = function(e){
            if(e.code == keyCode){
                keySafe = true;
            }
        }
        document.addEventListener("keydown", this.keyDownFunction);
        document.addEventListener("keyup", this.keyUpFunction);
    }

    unbind(){
        document.removeEventListener("keydown", this.keyDownFunction);
        document.removeEventListener("keyup", this.keyUpFunction);
    }
}

