var FCM = require('fcm-push');
var serverkey = 'AAAA0zevR1E:APA91bH9rWVq17M3wcwK9pj5XuhpIMioTyBdVELof7tcamigWW1kjUdzqkLGOF9VBf61efoAK765BVo5E0tR0UoE9iy2Opxute3RWSO_hVpT98iMaM_h7Uy06lBW9dUBJdrhyUVrOaOm';
var fcm = new FCM(serverkey);
var mysql = require('mysql');
var _ = require('underscore');
let fetchData = (data) => {

    return new Promise(async (resolve, reject) => {
        try {
            await con.query(` SELECT device_token from tb_tokens `, (err, data) => {
                    if (err) reject(err);
                    console.log(data);
                    return resolve(data);
                });



        } catch (error) {
            console.log(error);
            return error;
        }
    })

}

module.exports = {
    sendPush: async function () {
        const data = await fetchData();
        console.log("data------------->", data);
        let deviceToken = _.pluck(data, 'device_token');
        console.log("deviceToken---------->", deviceToken);
        const tokenChunk = _.chunk(deviceToken, 1000);
        _.map(tokenChunk, (obj) => {
            var message = {
                registration_ids: obj,

                notification: {
                    title: 'Task Notification',
                    body: "Notification Send Successfully"
                },

            };

            fcm.send(message, function (error, response) {
                if (error) {

                    console.log("THERE IS SOME OCCUR SENDING PUSH BECAUSE OF ------>", error);
                    return error
                } else {
                    console.log("Push Notification Sent Successfully !!!!!!!!!!", response);
                    return response
                }
            });
        });
        return {statusCode : 200,
            ResponseMessage :"Push Sent Successfully"};
    }
};
