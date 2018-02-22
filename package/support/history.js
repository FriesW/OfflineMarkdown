class History{
    
    constructor(init_text)
    {
        this.back = new Stack(); //Backward history
        this.front = new Stack(); //Forward history
        if(is_string(init_text))
            this.current = init_text;
        else if(is_set(init_text))
            throw 'history.init: parameter must be a string';
        else
            this.current = '';
        
        this.suggest_pos = 0;
    }
    
    //The provided text must be put into history
    add(new_text)
    {
        if(!is_string(new_text))
            throw 'history.add: parameter must be a string';
        //Must be different from current to add it
        if(this.current == new_text)
            return;
        this.back.push(this.current);
        this.front.empty();
        this.current = new_text;
    }
    
    //The provided text is updating the current state, and *might* be put into history
    //However, if backward is called, then the last update *will* go into history
    update(new_text)
    {
        if(!is_string(new_text))
            throw 'history.update: parameter must be a string';
        
        //TODO add suggestion logic
        var go =
            this.suggest_pos == 10 ||
            !this.has_backward(); //If empty
        
        this.suggest_pos++;
        if( go )
        {
            this.add(new_text);
            this.suggest_pos = 0;
        }
        
        this.current = new_text;
    }
    
    has_backward()
    {
        return this.back.height() > 0;
    }
    
    backward()
    {
        if(this.has_backward())
            this.front.push(this.current);
            this.current = this.back.pop();
        return this.current;
    }
    
    has_forward()
    {
        return this.front.height() > 0;
    }
    
    forward()
    {
        if(this.has_forward())
            this.back.push(this.current);
            this.current = this.front.pop();
        return this.current;
    }

}