function showform(form) {
    const register = document.getElementById("register");
    const login = document.getElementById("login");
    if(register && login){
        register.classList.remove("active");
        login.classList.remove("active");
    }
    const selected = document.getElementById(form);
    if(selected){
        selected.classList.add("active");
    }
}
