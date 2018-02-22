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
        this.back.push(new_text);
        this.front.empty();
        
        this.current = new_text;
    }
    
    //The provided text is updating the current state, and *might* be put into history
    //However, if backward is called, then the last update *will* go into history
    update(new_text)
    {
        if(!is_string(new_text))
            throw 'history.update: parameter must be a string';
        
        //Calculate difference
        var old_text = this.back.height() == 0 ? '' : this.back.peek();
        var diff_array = JsDiff.diffChars(old_text, new_text);
        
        var total_add = 0;
        var total_remove =  0;
        var add_space_end = false;
        
        var re_space_end = /^[^ \r\n\.]+(\r\n|\r|\n| |\.)$/; //Ends with newline, space, or period. 
        for(var i = 0 ; i < diff_array.length; i++)
        {
            var ds = diff_array[i]; //diff_segment
            if(is_set(ds.removed) && ds.removed)
                total_remove += ds.value.length;
            if(is_set(ds.added) && ds.added)
            {
                total_add += ds.value.length;
                if(re_space_end.test(ds.value))
                    add_space_end = true;
            }
        }
        
        var go =
            total_add > 10 ||
            total_remove > 10 ||
            add_space_end ;//||
            // !this.has_backward(); //If empty
        
        if( go )
        {
            this.add(new_text);
            console.log('Updating...');
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