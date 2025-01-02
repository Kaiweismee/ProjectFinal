// 切換表單
function toggleForm() {
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");

    if (loginForm.style.display === "none") {
        loginForm.style.display = "block";
        signupForm.style.display = "none";
    } else {
        loginForm.style.display = "none";
        signupForm.style.display = "block";
    }
}

// 註冊功能
function signup() {
    const fullname = document.getElementById("signupFullname").value.trim();
    const username = document.getElementById("signupUsername").value.trim();
    const password = document.getElementById("signupPassword").value.trim();
    const confirmPassword = document.getElementById("signupConfirmPassword").value.trim();

    // 驗證表單
    if (!fullname || !username || !password || !confirmPassword) {
        alert("所有欄位都必須填寫！");
        return;
    }

    if (password !== confirmPassword) {
        alert("密碼與確認密碼不一致！");
        return;
    }

    // 檢查帳號是否已註冊
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.some(user => user.username === username)) {
        alert("帳號已被使用！");
        return;
    }

    // 儲存用戶資料
    users.push({ fullname, username, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("註冊成功！請登入。");
    toggleForm();
}

// 登入功能
function login() {
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        alert(`歡迎回來，${user.fullname}！`);
    } else {
        alert("帳號或密碼錯誤！");
    }
}
