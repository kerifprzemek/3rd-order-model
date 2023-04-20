/* Start()
 * 
 */
function startWebVisu() {
    loginCheck();
    g_bPageRequested = false;
    DetermineBrowser();
    setTimeout("OnTimer()", 200);
}

/* loginCheck() 
 *
 */
function loginCheck() {
    var iFrameElement = document.getElementById('WebserverIFrame');

    var loginForm = iFrameElement.contentWindow.document.getElementById('Login_Area_Form');
    if (loginForm) {
        document.getElementById('logForm').innerHTML = loginForm.parentNode.innerHTML;
    }

    var logoutForm = iFrameElement.contentWindow.document.getElementById('Login_Area_Form');
    if (logoutForm) {
        document.getElementById('logForm').innerHTML = logoutForm.parentNode.innerHTML;
        document.getElementsByName('Redirection')[0]["value"] = "/awp/index.html";
    }
}