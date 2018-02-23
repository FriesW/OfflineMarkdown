class Editor {

    constructor(DOMinput, DOMoutput)
    {
        this.LS_NAME = 'contents';
        
        //setup vars
        this.listeners = [];
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
        BehaveHooks.add('keyup', this._update.bind(this)); //General update
        this.md_in.addEventListener('input', this._update.bind(this)); //Update on browser spellcheck
        //Update history on tab change
        BehaveHooks.add('tab:after', function(){
            this.hist.add(this.md_in.value);
        }.bind(this));
        
        //Catch weird behave hooks bug...
        if( this.md_in.value == '    ')
            this.md_in.value = '';
        
        this.hist = new History(this.md_in.value);
        this._update();
        
        //Attach undo/redo to keyboard
        this.md_in.addEventListener('keydown', function(e){
            var pass = false;
            var zKey = 90;
            var yKey = 89;
            var ctrl = e.ctrlKey || e.metaKey;
            if (ctrl && !e.shiftKey && e.keyCode == zKey) //ctrl+z
                this.undo();
            else if (ctrl && e.shiftKey && e.keyCode == zKey) //ctrl+shift+z
                this.redo();
            else if (ctrl && !e.shiftKey && e.keyCode == yKey) //ctrl+y
                this.redo();
            else
                pass = true;
            if(!pass)
                e.preventDefault();
            return pass;
        }.bind(this));
        
    }
    
    clear()
    {
        this.set('');
        this.hist.add('');
    }
    
    set(new_md)
    {
        this.md_in.value = new_md;
        this.hist.add(new_md);
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
        
        this.hist.update(md);
        this._notify_listeners();
    }
    
    undo()
    {
        if(this.hist.has_backward())
        {
            this.md_in.value = this.hist.backward();
            this._update();
        }
        this._notify_listeners();
    }
    
    redo()
    {
        if(this.hist.has_forward())
        {
            this.md_in.value = this.hist.forward();
            this._update();
        }
        this._notify_listeners();
    }
    
    addHistoryListener(a_function)
    {
        this.listeners.push(a_function);
    }
    
    _notify_listeners()
    {
        var hb = this.hist.has_backward();
        var hf = this.hist.has_forward();
        for(var i = 0; i < this.listeners.length; i++)
            this.listeners[i](hb, hf);
    }

}