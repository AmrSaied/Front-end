/**
 * Created by Amr Abd Elrhim on 20/04/2016.
 */
WinSeekers.service("SignInServices", function ($http) {


    var GetParties = 'party/get-all-parties.do' ;

    this.StateGiftService = function () {
        var response = $http({
            method: "GET",
            url: BASE_URL + services,
            headers: { 'X-Auth-Token': token },
            dataType: "json"
        });
        return response;
    };

});