function gid(id)
{
    return document.getElementById(id);
}

function update()
{
    localStorage.last = gid('input').value;
    gid('output').innerHTML = converter.makeHtml(gid('input').value);
}


var converter;

window.onload = function()
{
    //Test features
    if ( !(window.File && window.FileReader && window.FileList && window.Blob && typeof(Storage) !== "undefined") )
        alert('Oh no! It looks like you have an outdated web browser. This web page is probably broken...\nProceed with caution.');
    
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
    if( localStorage.last )
    {
        gid('input').value = localStorage.last;
        update();
    }
    



};