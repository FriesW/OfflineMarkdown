function gid(id)
{
    return document.getElementById(id);
}


var converter;

window.onload = function()
{
    
    converter = new showdown.Converter();
    converter.setFlavor('github');
    
    gid('input').addEventListener('input', function(){
        gid('output').innerHTML = converter.makeHtml(gid('input').value);
    });
    
    



};