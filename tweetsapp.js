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
        result = Meteor.http.get("http://www.laxpower.com/update15/binboy/rating07.php");
        $ = cheerio.load(result.content);
        var teams = $('#content_well > div.cs1 > left > dt > dl > div:nth-child(3) > div.cs1 > pre a')
          .clone()
          .children()
          .remove()
          .end()
          .text()
          .split(' ');

          //Works with split by SPACE

          return teams;
      },
    })
  });
};
