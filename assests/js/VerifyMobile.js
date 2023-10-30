var sendOtp= document.getElementById('sendotp');
var mobile=document.getElementById('mobile');

sendOtp.addEventListener('click', async function(){
    mobile=mobile.value;
    console.log(mobile);

    const data = new URLSearchParams();
data.append('mobileNumber', mobile);
console.log(data);
fetch('/auth/mobile/sendotp', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	},
	body: data
})
	.then(response => response.json())
	.then(data => console.log(data))
	.catch(error => console.error(error));

})