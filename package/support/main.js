function gid(id)
{
    return document.getElementById(id);
}

window.onload = function()
{

var converter = new showdown.Converter();
var html = converter.makeHtml('#hello world!');

gid('test').innerHTML = html;



};