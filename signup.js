/**
 * ログインユーザーはメール認証を完了してるか？
 * 戻り値
 * null : ログインしていない。
 * true : メール認証済
 * false: 認証未完了
 *
 * @returns {boolean|null}
 */
isVerified = function(){
	return Meteor.user() && Meteor.user().emails[0].verified;
}


if (Meteor.isClient) {
  // メール認証の完了を催促
  Template.notMailVerified.msg = function () {
  	var msg = {
	    title: 'メール認証を完了してください。',
		  body: 'メールの確認が終わっていません。 送られたメールのURLをクリックして認証を完了してください。'
	  };
	  return isVerified() === null || isVerified() ? null : msg;
  }
  
  Template.hello.greeting = function () {
    return "Welcome to signup.";
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Accounts.config({
      sendVerificationEmail: true, //メール認証を有効にする
    });
  });
}

