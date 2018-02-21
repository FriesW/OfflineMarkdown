class Editor {

    constructor(DOMinput, DOMoutput)
    {
        this.LS_NAME = 'contents';
        
        //setup vars
        this.md_in = DOMinput;
        this.html_out = DOMoutput;
        
        //Load if available
        this.ls = typeof(Storage) !== "undefined";
        if( this.ls && localStorage[this.LS_NAME] )
            this.md_in.value = localStorage[this.LS_NAME];
        
        //Setup md->html
        this.conv = new showdown.Converter();
        this.conv.setFlavor('github');
        this.conv.setOption('simpleLineBreaks', false);
        
        //Attach behave hooks
        new Behave({
            textarea: this.md_in
        });
        BehaveHooks.add('keyup', this._update.bind(this));
        this.md_in.addEventListener('input', this._update.bind(this));//Catch browser spellcheck
        
        //Catch weird behave hooks bug...
        if( this.md_in.value == '    ')
            this.md_in.value = '';
        
        this._update();
    }
    
    clear()
    {
        this.set('');
    }
    
    set(new_md)
    {
        this.md_in.value = new_md;
        this._update();
    }
    
    get()
    {
        var md = this.md_in.value;
        var html = this.conv.makeHtml(md);
        return [md, html];
    }
    
    _update()
    {
        var md = this.md_in.value;
        
        //Check that there is a change...
        if(this.last_update_state == md)
            return;
        this.last_update_state = md;
        
        if(this.ls)
            localStorage[this.LS_NAME] = md;
        this.html_out.innerHTML = this.conv.makeHtml(md);
    }

}