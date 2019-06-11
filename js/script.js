const accessKey = 'YOUR_ACCESS_KEY';
var page = 1;
var searchInput;

const form = document.getElementById('form');
const errorMsg = document.getElementById('errorMsg');
form.addEventListener('submit', function (e) {
    e.preventDefault();
    // document.getElementById('results').empty();
    $('#results').empty();
    searchInput = document.getElementById('searchInput').value;
    if (searchInput !== '') {
        init(searchInput);
    } else {
        errorMsg.innerHTML = 'Please enter something to find the images.'
        document.getElementById('error').classList.remove('hide');
    }
});

function init(searchInput) {

    var q = "https://api.unsplash.com/search/collections?&client_id=" + accessKey + "&page=" + page + "&query=" + searchInput;
    fetch(q)
        .then(result => {
            return result.json()
        })
        .then(result => {
            getData(result)
        });
}

function getData(data) {
    console.log(data);

    var length = data.results.length;
    if (length == 0) {
        errorMsg.innerHTML = 'No results found';
        document.getElementById('error').classList.remove('hide');
    } else {
        document.getElementById('error').classList.add('hide');
        for (var i = 0; i < length; i++) {
            var imageSrc = data.results[i].cover_photo.urls.small;
            var downloadURL = data.results[i].cover_photo.links.download;
            $('#results').append(`
                <div class="col-md-4">
                <div class="card card-body text-center mt-3">
                     <img class="img-thumbnail movieImg" id="img" alt="No picture available" src="${imageSrc}">
                 </div>
                <div>
                `);

            if (downloadURL !== '') {
                document.getElementById('img').click(function () {
                    var win = window.open(downloadURL, '_blank');
                    if (!win) {
                        alert('Please allow popups for this website');
                    }
                });
            }
        }
        page = page + 1;
        $(window).scroll(function () {
            if ($(window).scrollTop() + $(window).height() == $(document).height()) {
                init(searchInput);
            }
        });
    }

}
