var id = window.location.href;
// console.log(id);

id = id.substring(id.indexOf('profile')+8);
console.log(id);

window.localStorage.setItem("user_id",id);