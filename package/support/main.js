function gid(id)
{
    return document.getElementById(id);
}

function update()
{
    if( typeof(Storage) !== "undefined" )
        localStorage.last = gid('input').value;
    gid('output').innerHTML = converter.makeHtml(gid('input').value);
}


var converter;

window.onload = function()
{
    //Setup the showdown markdown processor
    converter = new showdown.Converter();
    converter.setFlavor('github');
    
    //Setup editor
    var editor = new Behave({
        textarea: gid('input')
    });
    
    //Setup input change
    gid('input').addEventListener('input', update);
    BehaveHooks.add('keydown', update);
    
    //Check for previous session
    if( typeof(Storage) !== "undefined" && localStorage.last )
    {
        gid('input').value = localStorage.last;
        update();
    }
    



};