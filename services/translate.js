const translate = require('@vitalets/google-translate-api');
module.exports = {

    translate : (sentences, toLang) => {
        return new Promise ((resolve, reject) => {
            translate(sentences, {to: toLang}).then(res => {
                console.log(res)
                var translatedTxt = res.text;
                resolve(translatedTxt)
            }).catch(err => {
                console.error('err', err);
                reject(err);
            });
        });
    }
}