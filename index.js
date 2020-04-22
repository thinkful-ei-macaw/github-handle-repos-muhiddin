
const searchURL = 'https://api.github.com/users';

function displayResults(res) {
  $('#results-list').empty();
  // iterate through the articles array, stopping at the max number of results
  for (let i = 0; i < res.length; i++){
    $('#results-list').append(
      `<li><h3><a href="${res[i].html_url}">${res[i].name}</a></h3>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getHandleRepos(handle) {
  const url = searchURL + '/' + handle + '/repos';
  fetch(url)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(res.statusText);
    })
    .then(res => displayResults(res))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchGithubHandle = $('#js-search-handle').val();
    getHandleRepos(searchGithubHandle);
  });
}

$(watchForm);