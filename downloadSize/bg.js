chrome.downloads.onDeterminingFilename.addListener(function (item, suggest) {
    var p = item.filename.lastIndexOf(".");
    var name = p < 0 ? item.filename + "-" + sizeInfo(item.fileSize) :
        item.filename.substring(0, p) + "-" + sizeInfo(item.fileSize) +
        item.filename.substring(p);

    suggest({
        filename: name,
        conflict_action: 'uniquify', conflictAction: 'uniquify'
    });
});

function sizeInfo(len) {
    return len < 0 ? "未知大小" :
        len < 1024 ? len + "B" :
            len < 1024 * 1024 ? (len / 1024).toFixed(1) + "KB" :
                (len / (1024 * 1024)).toFixed(2) + "MB";
}