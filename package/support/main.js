var title_obj;
var editor_obj;

window.onload = function()
{
    //Test features
    if ( !(window.File && window.FileReader && window.FileList && window.Blob && typeof(Storage) !== "undefined") )
        alert('Oh no! It looks like you have an outdated web browser. This web page is probably broken...\nProceed with caution.');
    
    //Setup buttons
    gid('btnClear').addEventListener('click', function(){
        editor_obj.clear();
        title_obj.clear();
    });
    gid('btnSave').addEventListener('click', function(){
        var data = editor_obj.get();
        FileIO.export_f(title_obj.get(), data[0], data[1]);
    });
    gid('btnLoad').addEventListener('click', function(){
        gid('fileSelector').click();
    });
    gid('fileSelector').addEventListener('change', function(e){
        FileIO.import_f(e.target.files[0], function(t, r){
            title_obj.set(t);
            editor_obj.set(r);
        });
        gid('fileSelector').value = '';
    });
    
    gid('btnUndo').addEventListener('click', function(){
        editor_obj.undo();
    });
    
    gid('btnRedo').addEventListener('click', function(){
        editor_obj.redo();
    });
    
    //Setup title box
    title_obj = new Title( gid('inTitle') );
    
    //Setup title gen button
    gid('btnGenTitle').addEventListener('click', function(){
        var d = new Date();
        var t =    d.getFullYear() + '_' +
           padLeft(d.getMonth() + 1, 2) + '_' +
           padLeft(d.getDate(), 2) + '--' +
           padLeft(d.getHours(), 2) + ':' +
           padLeft(d.getMinutes(), 2);
        title_obj.set(t);
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
        FileIO.import_f(e.dataTransfer.files[0], function(t, r){
            title_obj.set(t);
            editor_obj.set(r);
        });
    });
    
    
    editor_obj = new Editor(gid('input'), gid('output'));
    
    editor_obj.addHistoryListener(function(undo, redo){
        console.log('notif', undo, redo);
        gid('btnUndo').disabled = !undo;
        gid('btnRedo').disabled = !redo;
    });



};