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
        console.log('ADD');
    }
    
    //The provided text is updating the current state, and *might* be put into history
    //However, if backward is called, then the last update *will* go into history
    update(new_text)
    {
        if(!is_string(new_text))
            throw 'history.update: parameter must be a string';
        //Calculate difference
        var old_text = this.back.height() == 0 ? '' : this.back.peek();
        var diff_text = History._str_diff(new_text, old_text);
        console.log('DIFF:', diff_text.length, diff_text);
        
        var go =
            //this.suggest_pos == 10 ||
            diff_text.length > 15 ||
            diff_text.match(/^[^_]+_$/) ||
            !this.has_backward(); //If empty
        
        //this.suggest_pos++;
        if( go )
        {
            this.add(new_text);
            //this.suggest_pos = 0;
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
    
    static _diff_start(a, b)
    {
        if(!is_string(a) || !is_string(b))
            throw 'diff: must be a string';
        if(a == b)
            return 0;
        if (a == '' || b == '')
            return 0;
        var i = 0;
        while(a[i] === b[i]) i++;
        return i;
    }
    
    static _diff_end(a, b)
    {
        if(!is_string(a) || !is_string(b))
            throw 'diff: must be a string';
        if(a == b)
            return a.length;
        if (a == '' || b == '')
            return 0;
        var i = 0;
        while(a[a.length - i] === b[b.length - i]) i++;
        return i - 1;
    }
    
    static _str_diff(a, b)
    {
        console.log('GOT:', a, ':', b);
        var s_diff = History._diff_start(a, b);
        var e_diff = History._diff_end(a, b);
        //Edge case: repeated letter on diff boundary
        if(a[s_diff] == a[s_diff - 1])
            s_diff--;
        var longest = a.length > b.length ? a : b;
        return longest.substring(s_diff, longest.length - e_diff);
    }

}