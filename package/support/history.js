class History{
    
    constructor()
    {
        this.hb = new Stack(); //Backward history
        this.hf = new Stack(); //Forward history
        this.last_suggest = '';
        
        this.suggest_pos = 0;
    }
    
    add(current)
    {
        this.last_suggest = '';
        //Check that it is different then the top item
        if(this.hb.height() > 0 && this.hb.peek() == current)
            return;
        this.hb.push(current);
        this.hf.empty();
    }
    
    suggest(current)
    {
        if(this.hb.contains(current) || this.hf.contains(current))
            return;
        
        this.last_suggest = current;
        //TODO add suggestion logic
        var go = true;
        
        this.suggest_pos++;
        if( this.suggest_pos == 10 )
        {
            this.add(current);
            this.suggest_pos = 0;
        }
    }
    
    backward()
    {
        if(this.hb.height() == 1)
            return false;
        
        if(this.last_suggest != '')
            this.add(this.last_suggest);
        
        this.hf.push(this.hb.pop());
        return this.hb.peek();
    }
    
    forward()
    {
        if(this.hf.height() == 0)
            return false;
        
        this.hb.push(this.hf.pop());
        return this.hb.peek();
    }

}