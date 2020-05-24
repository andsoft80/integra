
class Auth {

    static authenticateUser(token) {
        var tokenObj = {};
        tokenObj.token = token;
        localStorage.setItem('ar_token', JSON.stringify(tokenObj));
    }

    static isUserAuthenticated() {
        var token = localStorage.getItem('ar_token');

        // const response = await axios.post(be_conf.server + '/checkauth',{} ,{ headers: { "Authorization": 'Bearer ' + token } });

        // if (token !== null) {


        //     if (response.data === 'checked') {
        //         return true;
        //     }
        //     else return false;
        // }
        // else {

        //     return false;
        // }
        
        if (token !== null && JSON.parse(token).exp > new Date() / 1000) {
            return true
        }
        else
            return false


    }
    static deauthenticateUser() {
        localStorage.removeItem('ar_token')
    }

    static getToken() {
        if (localStorage.getItem('ar_token') !== null) {
            return JSON.parse(localStorage.getItem('ar_token')).token;
        }
        else
            return '';
    }
    static setExp(exp) {
        
        var tokenObj = JSON.parse(localStorage.getItem('ar_token'));
        tokenObj.exp = exp;
        localStorage.setItem('ar_token', JSON.stringify(tokenObj));
    }
}

export default Auth