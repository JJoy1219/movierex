/*
function getMovieRecommendations(movieTitle) {
    var inputData = movieTitle;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://127.0.0.1:5000/api/call_python_function', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            document.getElementById('movieResults').innerText = response.result;
        } else {
            console.error('Error:', xhr.statusText);
        }
    };
    xhr.onerror = function () {
        console.error('Request failed');
    };
    xhr.send(JSON.stringify({ input: inputData }));

    const recommendations = [
        "Movie 1",
        "Movie 2",
        "Movie 3",
        "Movie 4",
        "Movie 5",
        "Movie 6",
        "Movie 7",
        "Movie 8",
        "Movie 9",
        "Movie 10"
    ];
    return recommendations;
}

// Function to handle movie recommendations
/*
function recommendMovies() {
    const movieInput = document.getElementById("movieInput");
    const movieResults = document.getElementById("movieResults");

    // Get the user input
    var userInput = movieInput.value;

    // Call the function to get movie recommendations
    recommendations = getMovieRecommendations(userInput);

    // Display the recommendations
    movieResults.innerHTML = "<h2>Recommended Movies:</h2>";
    if (recommendations.length > 0) {
        movieResults.innerHTML += "<ul>";
        recommendations.forEach(movie => {
            movieResults.innerHTML += `<li>${movie}</li>`;
        });
        movieResults.innerHTML += "</ul>";
    } else {
        movieResults.innerHTML += "<p>No recommendations found.</p>";
    }
}
*/
function recMovies() {
    var inputData = document.getElementById("movieInput").value;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://127.0.0.1:5000/api/call_python_function', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            displayResult(response.result);
        } else {
            console.error('Error:', xhr.statusText);
            document.getElementById('movieResults').innerText = 'Error occurred.';
        }
    };
    xhr.onerror = function () {
        console.error('Request failed' + xhr.status);
        document.getElementById('movieResults').innerText = 'Movie not found.';
    };
    xhr.send(JSON.stringify({ input: inputData }));
}

function displayResult(resultList) {
    var resultDiv = document.getElementById('movieResults');
    resultDiv.innerHTML = '<h3>Results<hr></h3>';
    if (resultList.length > 0) {
        resultDiv.innerHTML += '<ul>';
        resultList.forEach(function (item) {
            resultDiv.innerHTML += '<li>' + item + '</li>';
        });
        resultDiv.innerHTML += '</ul>';
    } else {
        resultDiv.innerHTML += '<p>No results found.</p>';
    }
}
