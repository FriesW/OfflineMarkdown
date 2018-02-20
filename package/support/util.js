function padLeft(nr, n, str){
    return Array(n-String(nr).length+1).join(str||'0')+nr;
}

function gid(id)
{
    return document.getElementById(id);
}