if (Meteor.isClient) {
Meteor.call('getTweets', function (error, result) {
  if (error) {
    console.log("error", error);
  };

  console.log(result);

  Session.set("tweets", result);
});

Template.tweets.helpers({
  rant:function (){
    return Session.get("tweets");
  }
})

}

if (Meteor.isServer) {
  //----code to run on server at startup---//
  Meteor.startup(function () {
    var cheerio = Meteor.npmRequire('cheerio');

    Meteor.methods({
      getTweets: function () {
        result = Meteor.http.get("https://twitter.com/LaxPower ");
        $ = cheerio.load(result.content);
        var resp = $('#stream-items-id').text();
        return resp;
      }
    })
  });
};
