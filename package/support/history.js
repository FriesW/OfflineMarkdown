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
        
        //this._set_old();
        this.add(this.current);
    }
    
    _set_old()
    {
        this.old_time = new Date();
        this.old_text = this.current;
    }
    
    //The provided text must be put into history
    add(new_text)
    {
        if(!is_string(new_text))
            throw 'history.add: parameter must be a string';
        this._set_old();
        //Must be different from most recent to add it
        if(this.back.height() > 0 && this.back.peek() == new_text)
            return;
        this.back.push(new_text);
        this.front.empty();
        
        this.current = new_text;
    }
    
    //The provided text is updating the current state, and *might* be put into history
    //However, if backward is called, then the last update *will* go into history
    //Will add if: 7 seconds old, 40 characters of add or delete, a sentence
    update(new_text)
    {
        if(!is_string(new_text))
            throw 'history.update: parameter must be a string';
        
        //Check time
        //Add PREVIOUS current
        if( (new Date()).getTime() - this.old_time.getTime() > 7000) //7 seconds
        {
            this.add(this.current);
            this.current = new_text;
            return;
        }
        
        //Add NEW current
        var go = false;
        
        //Quick diff
        if(!go)
            go = Math.abs(this.old_text.length - new_text.length) > 120;
        
        //Calculate difference
        if(!go)
        {
            var diff_array = JsDiff.diffChars(this.old_text, new_text);
            
            var total_add = 0;
            var total_remove =  0;
            var add_group = false;
            
            //var re_group = /[^ \r\n\.;]+(\.|\?|\!|-|;| |\r\n|\r|\n)/; //catches most words
            var re_group = /[^\r\n\.;]+(\.|\?|\!|;|\r\n|\r|\n)/; //catches most sentences
            for(var i = 0 ; i < diff_array.length; i++)
            {
                var ds = diff_array[i]; //diff_segment
                if(is_set(ds.removed) && ds.removed)
                    total_remove += ds.value.length;
                if(is_set(ds.added) && ds.added)
                {
                    total_add += ds.value.length;
                    if(re_group.test(ds.value))
                        add_group = true;
                }
            }
            
            go = total_add > 40 || total_remove > 40 || add_group;
        }
        
        
        if( go )
            this.add(new_text);
        this.current = new_text;
    }
    
    has_backward()
    {
        return this.back.height() > 0;
    }
    
    backward()
    {
        if(this.has_backward())
        {
            this.front.push(this.current);
            this.current = this.back.pop();
        }
        this._set_old();
        return this.current;
    }
    
    has_forward()
    {
        return this.front.height() > 0;
    }
    
    forward()
    {
        if(this.has_forward())
        {
            this.back.push(this.current);
            this.current = this.front.pop();
        }
        this._set_old();
        return this.current;
    }

}