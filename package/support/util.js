function padLeft(nr, n, str){
    return Array(n-String(nr).length+1).join(str||'0')+nr;
}

function gid(id)
{
    return document.getElementById(id);
}

function is_type(item, type)
{
    if( typeof type !== 'string')
        throw "is_type: type parameter must be a string.";
    return typeof item === type;
}

function is_string(item)
{
    return is_type(item, 'string');
}

function is_set(item)
{
    return is_type(item, 'undefined');
}