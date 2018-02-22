class Stack{
    
    constructor(builder)
    {
        if(is_string(builder))
            this.s = JSON.parse(builder);
        else
            this.s = [];
    }
    
    dump()
    {
        return JSON.stringify(this.s);
    }
    
    empty()
    {
        this.s = [];
    }
    
    push(item)
    {
        this.s.push(item);
    }
    
    peek()
    {
        if(this.height() == 0)
            throw 'stack.peek: access on size of 0';
        return this.s[this.s.length - 1];
    }
    
    pop()
    {
        if(this.height() == 0)
            throw 'stack.pop: access on size of 0';
        return this.s.pop();
    }
    
    height()
    {
        return this.s.length;
    }
}