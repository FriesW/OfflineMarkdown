class FileIO {
    
    static import_string(string_in)
    {
        var dec = new TextDecoder("utf-8");
        return dec.decode( pako.inflate( base64js.toByteArray(string_in) ) );
    }
    
    static import_f(file, callbackFunc)
    {
        var title = escape(file.name);
        
        var query = title.substr(title.length - 3);
        if(query !== '.md' && query !== '.MD')
            if(!confirm('File doesn\'t look like a markdown file.\nConfinue?'))
                return;
        
        var reader = new FileReader();
        reader.onload = function(f){
            callbackFunc(title, f.target.result);
        };
        reader.readAsText(file);
    }
    
    static _dl_file(title, file)
    {
        var dla = gid('file-download');
        dla.setAttribute('download', title);
        dla.setAttribute('href',
            'data:text/plain;charset=utf-8,' + encodeURIComponent(file)
        );
        dla.click();
        dla.setAttribute('download','');
        dla.setAttribute('href','');
    }
    
    static export_f(title, markdown, html)
    {
        if( !is_string(title) || !is_string(markdown) || !is_string(html) )
            throw 'FileIO.export_f: parameters must be strings';
        var base =
`<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title><<< PG_TITLE >>></title>
<style>
<<< STYLE >>>
</style>
</head>
<body>
<div id="_markdown_content_body">
<<< HTML >>>
</div>
</body>
</html>
<!--
This html was generated from a markdown file using:
https://github.com/FriesW/OfflineMarkdown
The original markdown can be reconstructed with
the recovery string. This can be done in the
original software using the 'Recover' button, or
on linux/unix with the following command:
cat recovery_string.txt | base64 -d | gzip -d > '<<< TITLE >>>.md'

The recovery string is:


<<< B64ENC >>>



-->
`;

        var encoded = base64js.fromByteArray( pako.gzip( markdown, {level:9} ) )
        
        //Replace in reverse order to prevent any collisions
        base = base.replace("<<< B64ENC >>>", encoded);
        base = base.replace("<<< TITLE >>>", title);
        base = base.replace("<<< HTML >>>", html);
        base = base.replace("<<< STYLE >>>", markdown_style);
        base = base.replace("<<< PG_TITLE >>>", title);
        
        FileIO._dl_file(title + '.md', markdown);
        FileIO._dl_file(title + '.html', base);
    }
    
}