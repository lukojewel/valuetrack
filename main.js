const server = "http:127.0.0.1:5000/";
// const server = "https://bdtgght4ra.execute-api.ap-south-1.amazonaws.com/prod/";

function login(loginType) {
	console.log(loginType);
	if (loginType == 1) {
		console.log("inside if");
		var username = $("#brancheid").val();
		var password = $("#branchpass").val();
		if (username && password) {
			var Auth = window.btoa(username.concat(":").concat(password));
			console.log(Auth);
			$.ajax({
				type: "GET",
				url: server + "branch/auth/login",
				// dataType: "json",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: "Basic " + Auth
				}
				// data: JSON.stringify({
				// 	page_num: page_num
				// })
			})
				.done(
					function(response) {
						console.log(response);
						if (response.status) {
							sessionStorage.setItem(
								"loggedIn",
								JSON.stringify(response.access_token)
							);
							sessionStorage.setItem(
								"userType",
								JSON.stringify("Branch Office")
							);
							window.location.href = "home.html";
						} else {
							$("#errText1").text(response.message);
						}
					}.bind(this)
				)
				.fail(err => {
					console.log(err);
					$("#errText1").text("Network error occurred.");
				});
		} else {
			$("#errText1").text("All fields are mandatory");
		}
	} else {
		console.log("inside else");
		var username = $("#headeid").val();
		var password = $("#headpass").val();
		if (username && password) {
			var Auth = window.btoa(username.concat(":").concat(password));
			console.log(Auth);
			$.ajax({
				type: "GET",
				url: server + "head/auth/login",
				// dataType: "json",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: "Basic " + Auth
				}
				// data: JSON.stringify({
				// 	page_num: page_num
				// })
			})
				.done(
					function(response) {
						console.log(response);
						if (response.status) {
							sessionStorage.setItem(
								"loggedIn",
								JSON.stringify(response.access_token)
							);
							sessionStorage.setItem(
								"userType",
								JSON.stringify("Head Office")
							);
							window.location.href = "home.html";
						} else {
							$("#errText2").text(response.message);
						}
					}.bind(this)
				)
				.fail(err => {
					console.log(err);
					$("#errText2").text("Network error occurred.");
				});
		} else {
			$("#errText2").text("All fields are mandatory");
		}
	}
}

function logout() {
	sessionStorage.removeItem("loggedIn");
	window.location = "index.html";
}

function addCustomer() {
	var name = $("#Name").val();
	var email = $("#Email").val();
	var dob = $("#DOB").val();
	var branch = $("#Branch").val();
	var contact = $("#Contact").val();
	var due = $("#Dues").val();

	if (name && email && dob && branch && contact && due) {
		$.ajax({
			type: "POST",
			url: server + "branch/customer/add",
			// dataType: "json",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			data: JSON.stringify({
				name: name,
				email: email,
				dob: dob,
				branch: branch,
				contact: contact,
				due: due
			})
		})
			.done(
				function(response) {
					console.log(response);
					if (response.status) {
						window.location.href = "view-customers.html";
					} else {
						$("#customerError").text(response.message);
					}
				}.bind(this)
			)
			.fail(err => {
				console.log(err);
				$("#customerError").text("Network error occurred.");
			});
	} else {
		$("#customerError").text("All fields are mandatory");
	}
}
