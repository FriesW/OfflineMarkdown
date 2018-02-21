class Stack{
    
    constructor(builder)
    {
        if(typeof builder === 'string')
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
    
    contains(item)
    {
        return this.s.indexOf(item) > -1;
    }
    
    push(item)
    {
        this.s.push(item);
    }
    
    peek()
    {
        if(this.height() == 0)
            throw "Stack error: peek on size of 0.";
        return this.s[this.s.length - 1];
    }
    
    pop()
    {
        if(this.height() == 0)
            throw "Stack error: pop on size of 0.";
        return this.s.pop();
    }
    
    height()
    {
        return this.s.length;
    }
}