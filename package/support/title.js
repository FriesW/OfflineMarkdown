class Title {
    
    constructor(DOMobject)
    {
        this.LS_NAME = 'title';
        
        //Setup vars
        this.title = '';    
        this.t = DOMobject;
        
        //Attach listeners
        this.t.addEventListener('keyup', this._on_key.bind(this));
        this.t.addEventListener('focus', this._on_focus.bind(this));
        this.t.addEventListener('blur', this._on_blur.bind(this));
        
        //Load if available
        if( has_storage() && localStorage[this.LS_NAME] )
            this.title = localStorage[this.LS_NAME];
        
        this._update();
    }
    
    get()
    {
        if( this.title == '')
            return "Untitled";
        else
            return this.title;
    }
    
    set(newTitle)
    {
        if(!is_string(newTitle))
            throw 'title.set: parameter must be a string';
        this.title = newTitle.replace(/(\.md|\.html)$/, '');
        this._update();
    }
    
    clear()
    {
        this.title = '';
        this._update();
    }
    
    _update()
    {
        if(has_storage())
            localStorage[this.LS_NAME] = this.title;
        if(this.title == '')
        {
            this.t.value = 'Untitled';
            this.t.style.fontStyle = 'italic';
        }
        else
        {
            this.t.value = this.title;
            this.t.style.fontStyle = 'normal';
        }
    }
    
    _on_key()
    {
        var check = this.t.value.toLowerCase();
        if(check == 'untitled')
            this.t.style.fontStyle = 'italic';
        else
            this.t.style.fontStyle = 'normal';
    }
    
    _on_focus()
    {
        this.start_state = this.t.value;
        if(this.title == '')
            this.t.value = '';
        this.t.style.fontStyle = 'normal';
    }
    
    _on_blur()
    {
        //on_change
        //Create my own on_change, so I can assure it happens first
        if(this.start_state != this.t.value)
            this.t.value = this.t.value.replace(/(\.md|\.html)$/, '');
        
        //on_blur
        var check = this.t.value.toLowerCase();
        if(check == '' || check == 'untitled')
            this.title = '';
        else
            this.title = this.t.value;
        this._update();
    }
    
}