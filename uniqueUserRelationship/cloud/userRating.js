var userInfoClass = Parse.Object.extend("UserInfo");

Parse.Cloud.afterSave("UserRating", function(request, response) {
	var user = request.object.get("user");
	var rating = request.object.get("rating");
	if (user && rating) {
		query = new Parse.Query(userInfoClass);
		query.equalTo("user", user);
		query.find({
			success: function(results) {
				// only one userInfo per user
				if (results.length == 1) {
					var userInfo = results[0];
					var r = userInfo.get("totalRating");
					var n = userInfo.get("numRating");

					var newTotalRating = isNaN(r) ? rating : (r + rating);
					var newNumRating = isNaN(n) ? 1 : (++n);

					userInfo.save({
						totalRating : newTotalRating,
						numRating : newNumRating
					}, {
						success: function() {
							response.success();
						},
						error: function(error) {
							response.error("Error with code: " + error.code);
						}
					});					
				} else {
					// userinfo is yet created for this user
					response.error("Unable to find user rating info.");
				}
			},
			error: function(error) {
				response.error("Failed to load user info.");
			}
		});
	}
});