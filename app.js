
var libraryContent;

$(function(){
    $('#searchbar').change(searchForPattern).keyup(searchForPattern);
    
    $('#searchbar').next().click(function(){
        $('#searchbar').change();
        return false;
    });
    $('a.siimple-navbar-title').click(function(){
        $('#searchbar').val('').change();
        return false;
    });
    
    loadData();
    
    $(window).on('popstate', function (e) {
        //~ var state = e.originalEvent.state;
        //~ if (state === null)
            //~ $('#searchbar').change();
        $('#searchbar').change();
    });

});

function buildItem(item, container) {
    var div = $('<div>', {'class': 'siimple-list-item'})
        .appendTo(container);
    
    item.div = div;
    
    $('<span>', {'class': 'siimple-tag siimple-tag--primary siimple-tag--rounded'})
    .text(item.tag || 'unknowkn')
    .appendTo(div);
    
    $('<span>')
    .text(item.name || 'unknowkn')
    .appendTo(div);
    
    div.click(function(){
        showContent(item);
        return false;
    });
    
    item.div = div;
}

function sortByName(a, b){
    var tag1 = a.tag.toLowerCase();
    var tag2 = b.tag.toLowerCase();
    if (tag1 == tag2) {
        tag1 = a.name.toLowerCase();
        tag2 = b.name.toLowerCase(); 
    }
    return ((tag1 < tag2) ? -1 : ((tag1 > tag2) ? 1 : 0));
}

function loadData() {
    var container = $('#contentindex').empty();
    
    $.getJSON('content.json', function( data ) {
        libraryContent = data;
        libraryContent.sort(sortByName);
        
        $.each(data, function(){
            buildItem(this, container);
        });
    });
}

function showIndex(text) {
    $('#contentindexbox').show();
    $('#contentbox').hide();
    
}

function showContent(sourceRef) {
    $('#contentbox').show();
    $('#contentindexbox').hide();
    
    history.pushState({content:1}, null, '#content');
    
    var alternativeText = $('<p>')
    .text("It appears you don't have a PDF plugin for this browser." + 
    "No biggie... you can ")
    .append(
        $('<a>', {href: sourceRef.url})
        .text('click here to download the PDF file.')
    );
    
    var typeObject = 'application/pdf';
    
    var objectContainer = $('#contentbox div.siimple-content').empty();
        
    $('<object>' , {'type': typeObject,
                    'width': '100%', 'height': '100%'})
    .attr('data', sourceRef.url)
    .append(alternativeText)
    .appendTo(objectContainer);
    
    // footer
    var footer = $('#contentbox .siimple-footer').empty();
    if (sourceRef.footer) {
        if (sourceRef.footer.url) {
            $('<span>').text('Info: ').appendTo(footer);
            
            $('<a>', {href: sourceRef.footer.url})
            .text(sourceRef.footer.text || 'link')
            .appendTo(footer);
        }
        else if (sourceRef.footer.text)
            footer.text(sourceRef.footer.text);
    }
}

function _buildRegex(text, isStartWith) {
    if (!text)
        return new RegExp('.*', 'i');

    // empty filter
    if (text === '^')
        return new RegExp('^\\s*$', 'i');

    // escape regex reserved chars
    text = text.replace(/[\*\\]+/, '\\w');
    text = text.replace(/[-/\^\$*+?.()|\[\]{}]/g, '\\$&'); // already removed \\

    if (isStartWith === true)
        text = '^' + text;

    var regex = new RegExp(text.replace(' ', '.*'), 'i');

    return regex;
}

function searchForPattern() {
    showIndex($.trim($(this).val()));
    
    //~ var pattern = $(this).val() || ' ';
    var pattern = $(this).val();
    pattern = _buildRegex(pattern);
    
    $.each(libraryContent, function(){
        var item = this;
        var state = isVisible(pattern, item.tag, item.name);
        
        item.div.toggle(state);
    });
}

function isVisible(pattern, tag, name) {
    if (pattern.length == 0)
        return true;
    
    //return tag.indexOf(pattern) >= 0 || name.indexOf(pattern) >= 0;
    return pattern.test(tag) || pattern.test(name);
}
