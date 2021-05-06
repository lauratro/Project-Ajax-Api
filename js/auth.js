//list for status
auth.onAuthStateChanged((user) => {
  if (user) {
    db.collection("Beers").onSnapshot(
      (snapshot) => {
        setupBeers(snapshot.docs);
        setupUI(user);
      },
      (err) => {
        console.log(err.message);
      }
    );
  } else {
    setupUI();
    setupBeers([]);
  }
});

const provider = new firebase.auth.GoogleAuthProvider();

// Sign up
let signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //get user info
  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;

  //sign up the user

  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      return db.collection("users").doc(userCredential.user.uid).set({
        email: signupForm["signup-email"].value,
        title: [],
        id: userCredential.user.uid,
      });
    })
    .then(() => {
      // Signed in
      const modal = document.querySelector("#modal-signup");
      $("#modal-signup").modal("hide");
      var user = userCredential.user;
      //
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
});
//logout
const logout = document.querySelector("#logout");
logout.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut();
});
//Login
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //get user info
  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;

  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    console.log("login", cred);
    $("#modal-login").modal("hide");
  });
});
