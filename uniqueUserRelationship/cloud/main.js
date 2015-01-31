
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
var userRelationship = Parse.Object.extend("UserRelationship");

// check if the relationship has been created
Parse.Cloud.beforeSave("UserRelationship", function(request, response) {
	if (request.object.get("followedUser") && request.object.get("follower")) {
		var query = new Parse.Query(userRelationship);
		query.equalTo("followedUser", request.object.get("followedUser"));
		query.equalTo("follower", request.object.get("follower"));
		query.count({
			success: function(number) {
				// relationship existed
				if (number != 0) {
					response.error("You have already been following the user.");
				} else {
					response.success();
				}
			},
			error: function(error) {
				response.error("Something went wrong with validation.");
			}
		});
	}
});