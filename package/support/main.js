function gid(id)
{
    return document.getElementById(id);
}

function update()
{
    localStorage.last = gid('input').value;
    gid('output').innerHTML = converter.makeHtml(gid('input').value);
}

function download()
{
    var dla = gid('file-download');
    var md = gid('input').value;
    var html = converter.makeHtml(md);
    html = '\
<!DOCTYPE html>\n\
<html>\n\
<head>\n\
<meta charset="UTF-8">\n\
</head>\n\
<body>\n\n\n' + html + '\n\n\n</body>\n\
</html>';
    
    dla.setAttribute('download', 'test.md');
    dla.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(md));
    dla.click();
    dla.setAttribute('download', 'test.html');
    dla.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(html));
    dla.click();
    dla.setAttribute('download','');
    dla.setAttribute('href','');
}


function file_import(file)
{
    var name = escape(file.name);
    
    var query = name.substr(name.length - 3);
    if(query !== '.md' && query !== '.MD')
        if(!confirm('File doesn\'t look like a markdown file.\nConfinue?'))
            return;
    
    var reader = new FileReader();
    reader.onload = function(f){
        gid('input').value = f.target.result;
        update();
    };
    reader.readAsText(file);
}


var converter;

window.onload = function()
{
    //Test features
    if ( !(window.File && window.FileReader && window.FileList && window.Blob && typeof(Storage) !== "undefined") )
        alert('Oh no! It looks like you have an outdated web browser. This web page is probably broken...\nProceed with caution.');
    
    //Setup buttons
    gid('btnClear').addEventListener('click', function(){
        gid('input').value = '';
        update();
    });
    gid('btnSave').addEventListener('click', function(){
        download();
    });
    gid('btnLoad').addEventListener('click', function(){
        gid('fileSelector').click();
    });
    gid('fileSelector').addEventListener('change', function(e){
        file_import(e.target.files[0]);
        gid('fileSelector').value = '';
    });
    
    //Setup dropzone
    window.addEventListener('dragenter', function(){
        gid('drop-zone-wrapper').style.visibility = 'visible';
    });
    gid('drop-zone-actual').addEventListener('dragleave', function(){
        gid('drop-zone-wrapper').style.visibility = 'hidden';
    });
    gid('drop-zone-actual').addEventListener('dragover', function(e){
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    });
    gid('drop-zone-actual').addEventListener('drop', function(e){
        e.stopPropagation();
        e.preventDefault();
        gid('drop-zone-wrapper').style.visibility = 'hidden';
        file_import(e.dataTransfer.files[0]);
    });
    
    //Setup the showdown markdown processor
    converter = new showdown.Converter();
    //converter.setFlavor('github');
    
    //Setup editor
    var editor = new Behave({
        textarea: gid('input')
    });
    
    //Setup input change
    BehaveHooks.add('keyup', update);
    
    //Check for previous session
    if( localStorage.last )
        gid('input').value = localStorage.last;
    else
        gid('input').value = '';
    
    update();
    



};