if (Meteor.isClient) {
Meteor.call('getLaxPowerData', function (error, result) {
  if (error) {
    console.log("error", error);
  };

  console.log(result);

  Session.set("dataTable", result);
});

Template.dataTable.helpers({

  })

}

if (Meteor.isServer) {
  //----code to run on server at startup---//
  Meteor.startup(function () {
    var cheerio = Meteor.npmRequire('cheerio');

    Meteor.methods({
      getLaxPowerData: function () {
        result = Meteor.http.get("http://www.laxpower.com/update15/binboy/rating36.php");
        $ = cheerio.load(result.content);
        var teams = $('#content_well > div.cs1 > left > dt > dl > div:nth-child(3) > div.cs1 > pre')
          .clone()
          .children()

          //How To Format Data API
          // grab text directly from "a" tag, not remove
          // .remove()
          .end()
          .text()
          // .split(' ');

          //Works

          return teams;
      },
    })
  });
};
