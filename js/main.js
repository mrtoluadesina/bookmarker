//Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

//save Bookmark
function saveBookmark(e){
    //get from values
    var siteName = document.getElementById('siteName').value;
    var url = document.getElementById('siteUrl').value;
    var siteUrl = checkUrl(url);

    if(!validateForm(siteName, siteUrl)){
        return false;
    }
    
    var bookmark = {
        name: siteName,
        url: siteUrl
    };

    // Local Storage Test
    // localStorage.setItem('test', 'Hello world');
    // localStorage.getItem('test');
    // localStorage.removeItem('test');

    if (localStorage.getItem('bookmarks') === null) {
        //init array
        var bookmarks = [];
        //Add to Array
        bookmarks.push(bookmark);
        // set to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // Get bookmarks from localstorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Add bookmark to array
        bookmarks.push(bookmark);
        //reset to localstorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    //clear form
    document.getElementById('myForm').reset();

    // refetch bookmarks
    fetchBookmarks();

    // Prevent form from submitting
    e.preventDefault();
}

// Delete Bookmarks
function deleteBookmark(url) {
    // Fetch Bookmarks from Localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Remove bookmark from Bookmarks
    for(var i = 0; i < bookmarks.length; i++) {
        if(bookmarks[i].url === url) {
            //remove from array
            bookmarks.splice(i, 1);
        }
    }
    //reset into local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    
    //refetch booksmarks
    fetchBookmarks();
}

// Fetch Bookmarks
function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

   // Get Output Id
   var bookmarksResults = document.getElementById('bookmarksResults');

   // Build Output
   bookmarksResults.innerHTML = '';

   for(var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="well">'+
                                        '<h3>' + name +
                                        ' <a class="btn btn-default" target="_blank" href="'+ url +'"> Visit </a> ' +
                                        ' <a class="btn btn-danger" onclick="deleteBookmark(\''+ url +'\')"> delete </a> ' +
                                        '</h3>' +
                                        '</div>';
   }
}

// Validate Form
function validateForm(siteName, siteUrl) {
    if(!siteName || !siteUrl){
        alert('please fill the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
        alert('Please use a valid url');
        return false;
    }

    return true;
}

// check url
function checkUrl(url) {
    if(!~url.indexOf('http')){
        url = 'http://' + url;
        console.log(url);
    }
    return url;
}