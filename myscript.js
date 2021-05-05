document.addEventListener('contextmenu', event => event.preventDefault());
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBVbVpfptjIG9lSIdFcM7eGN_6aqdaXAk0",
    authDomain: "auth-test-6c434.firebaseapp.com",
    projectId: "auth-test-6c434",
    storageBucket: "auth-test-6c434.appspot.com",
    messagingSenderId: "621063757163",
    appId: "1:621063757163:web:d326aa465dae418d37802e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();
// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    var uid = user.uid;
    document.getElementById("message").style.display="none";
    document.getElementById("logout").style.display="block";
    document.getElementsByClassName("inputarea")[0].style.display="block";
    // ...
  } else {
    // User is signed out
    // ...
    document.getElementById("message").style.display="block";
    document.getElementById("logout").style.display="none";
    document.getElementsByClassName("inputarea")[0].style.display="none";
  }
});
function login(){
  var userName=document.getElementById("userFire").value;
    var passName=document.getElementById("passFire").value;
      firebase.auth().signInWithEmailAndPassword(userName, passName)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    alert("LOGGED IN");
    document.getElementById('id01').style.display='none'
    document.getElementById("userFire").value="";
    document.getElementById("passFire").value="";
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorCode+"  "+errorMessage);
    // ..
  });
}
function out(){

  firebase.auth().signOut().then(() => {
  // Sign-out successful.
  alert("LOGGED OUT");
}).catch((error) => {
  // An error happened.
  alert(error);
});
}
function signin(){
    var userName=document.getElementById("userFire").value;
    var passName=document.getElementById("passFire").value;
    if(document.getElementById("repass").value==passName){
            firebase.auth().createUserWithEmailAndPassword(userName, passName)
        .then((userCredential) => {
          // Signed in 
          var user = userCredential.user;
          alert("Created and logged in");
          document.getElementById('id01').style.display='none'
          document.getElementById("userFire").value="";
          document.getElementById("passFire").value="";
          document.getElementById("repass").value="";
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorCode+"  "+errorMessage);
          // ..
        });
    }
    else{
      alert("Check the Retype Password");
    }
}
function dosome(e){
  document.getElementById('confirmPass').style.display='initial';
  document.getElementById("signlogup").style.display="initial";
  document.getElementById("signlogin").style.display="none";
  document.getElementsByClassName("here")[0].style.display="none";
  document.getElementsByClassName("here")[1].style.display="initial";
  document.getElementById("account").style.display="none";
}
function dosome1(e){
  document.getElementById('confirmPass').style.display='none';
  document.getElementById("signlogup").style.display="none";
  document.getElementById("signlogin").style.display="initial";
  document.getElementsByClassName("here")[0].style.display="initial";
  document.getElementsByClassName("here")[1].style.display="none";
  document.getElementById("account").style.display="initial";
}
var regNo,stuName,collegeName,deptName,cgpa,phoneNo,eMail;
function ready(){
  regNo=document.getElementById("regno").value;
  stuName=document.getElementById("stuname").value;
  collegeName=document.getElementById("college").value;
  deptName=document.getElementById("dept").value;
  cgpa=document.getElementById("cgpa").value;
  phoneNo=document.getElementById("phone").value;
  eMail=document.getElementById("mail").value;
}
function clear(){
  document.getElementById("regno").value="";
  document.getElementById("stuname").value="";
  document.getElementById("college").value="";
  document.getElementById("dept").value="";
  document.getElementById("cgpa").value="";
  document.getElementById("phone").value="";
  document.getElementById("mail").value="";
}
function inserted(){
  ready();
  if(regNo.length>0&&stuName.length>0&&collegeName.length>0&&deptName.length>0&&cgpa.length>0&&phoneNo.length>0&&eMail.length>0){
  firebase.database().ref('students/' + regNo).set({
    reg_no:regNo,
    student_name:stuName,
    college_name:collegeName,
    department_name:deptName,
    cgpa:cgpa,
    phone_no:phoneNo,
    e_mail:eMail
  });
  alert("Inserted");
  clear();
}
else{
  alert("Error : Enter all the data to be inserted");
}
}
function selected(){
  ready();
  if(regNo.length>0){
    firebase.database().ref().child("students").child(regNo).get().then((snapshot) => {
  if (snapshot.exists()) {
    document.getElementById("regno").value=snapshot.val().reg_no;
    document.getElementById("stuname").value=snapshot.val().student_name;
    document.getElementById("college").value=snapshot.val().college_name;
    document.getElementById("dept").value=snapshot.val().department_name;
    document.getElementById("cgpa").value=snapshot.val().cgpa;
    document.getElementById("phone").value=snapshot.val().phone_no;
    document.getElementById("mail").value=snapshot.val().e_mail;
  } else {
    alert("Error : No data available");
  }
  }).catch((error) => {
    alert(error);
  });
  }
  else{
    alert("Error : Enter RegNo to get values");
  }
}
function updated(){
  ready();
  if(regNo.length>0&&stuName.length>0&&collegeName.length>0&&deptName.length>0&&cgpa.length>0&&phoneNo.length>0&&eMail.length>0){
  firebase.database().ref('students/' + regNo).update({
    student_name:stuName,
    college_name:collegeName,
    department_name:deptName,
    cgpa:cgpa,
    phone_no:phoneNo,
    e_mail:eMail
  });
  alert("Updated");
  clear();
}
else{
  alert("Error : Enter all the data to be updated");
}
}
function deleted(){
  ready();
  if(regNo.length>0){
    firebase.database().ref('students/' + regNo).remove();
    alert("Deleted");
    clear();
  }
  else{
    alert("Error : Enter RegNo to delete the data");
  }
}
function load(){
  document.getElementById("main").style.display="initial";
  document.getElementsByClassName("beforeload")[0].style.display="none";
}
