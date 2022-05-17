
 function showUserTip() {
    document.getElementById('userTip').innerHTML = '账号必须是8位数字';
}


function showPwdTip() {
    document.getElementById('pwdTip').innerHTML = '密码必须大于6位';
}

 function checkUser() {

    var name = document.getElementById('user').value;
    var exp = /^[0-9]+$/;
    if (name === '') {
        document.getElementById('userTip').innerHTML = '账号不能为空';
        return false;

    } else {
        if ((name.length == 8) && exp.test(name))
            document.getElementById('userTip').innerHTML = 'ok';

        return true;
    }
}
 function checkPwd() {
    var exp = /^[a-z0-9]+$/;

    var pwdLen = document.getElementById('userPwd').value.length;
    if (pwdLen < 6) {
        document.getElementById('pwdTip').innerHTML = '密码必须大于6位';

        return false;


    } else {
        document.getElementById('pwdTip').innerHTML = 'ok';
        return true;

    }

}

//确认密码
function checkRepwd() {
    if (document.forms[0].pwd.value != document.forms[0].repwd.value) {
        document.getElementById('repwdTip').innerHTML = '两次密码不一致';
        return false;
    } else {
        document.getElementById('repwdTip').innerHTML = 'ok';
        return true;

    }
}

//提交按钮
function gogo() {

    if (checkUser()&&checkPwd()&&checkRepwd()){
		alert("创建成功");
		return true;		
	}
	else{
        alert("创建失败");
        return false;		
	}
}
