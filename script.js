// view model

function MVC() {
  var self = this;
  window.logMVC = function() { console.log('mvc', self); }

  var api_key = '55ozGMpeceBQOtCzw2NbwHniM7FrKzLn';
  self.nytimes_domain = 'https://www.nytimes.com/';

  self.name = ko.observable('');
  self.query = ko.observable('');
  self.requestMSG = ko.observable('');
  self.list = ko.observableArray([]);

  self.uniqueValue = function() {
    return String(Date.now()) + Math.random().toString(36).substr(2, 34);
  }

  self.clearList = function() {
    self.list( [] );
  }

  self.getArticles = function() {
    let query = self.query();

    if(query == "") {
      alert('Query cannot be empty');
      return;
    }
    if(query.length < 3) {
      alert('Query must be a minimum of 3 characters');
      return;
    }

    var nytURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + query + '&sort=newest&api-key=' + api_key;
    console.log('request: ', nytURL);
    self.requestMSG('Loading...');

    fetch(nytURL)
    .then(function(resp) { return resp.json(); })
    .then(function(json) {
      console.log('resp', json);
      if(json.response.docs && json.response.docs.length > 0){
        self.list( json.response.docs );
        self.requestMSG('Successfully loaded articles about ' + query + '!');
      }
      else {
        self.requestMSG('No Results...');
      }
    })
    .catch(function() {
      self.requestMSG('Load was unsuccessful...');
    });
  }

  //

  $(document).ready(function() {
    $('#query-input').keyup(function(e) {
      if(e.keyCode === 13) {
        self.getArticles();
      }
    });
  });
}

// init
const mvc = new MVC();
ko.applyBindings(mvc);
Object.freeze(mvc);
