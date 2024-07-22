// Import the necessary Firebase functions
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRW2r6gW8ah6DkbME0FzLfUv6kCzloO8U",
  authDomain: "friendsbingo-d17f7.firebaseapp.com",
  projectId: "friendsbingo-d17f7",
  storageBucket: "friendsbingo-d17f7.appspot.com",
  messagingSenderId: "1028940353502",
  appId: "1:1028940353502:web:f7cc1615e2cf21bd60174f",
  measurementId: "G-QTYPTTNWER"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Handle form submission
document.getElementById('registrationForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const branchName = document.getElementById('branchName').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const loadingIndicator = document.getElementById('loading');

  try {
    // Show loading indicator
    loadingIndicator.style.display = 'block';

    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save additional user info in Firestore
    await setDoc(doc(db, 'branches', user.uid), {
      branchName: branchName,
      email: email
    });

    console.log('User registered and branch info saved:', user.uid);
    alert('Branch registered successfully!');

    // Redirect to the sign-in page
    window.location.href = 'signin.html';

  } catch (error) {
    console.error('Error registering user:', error);
    alert('Error registering branch: ' + error.message);
  } finally {
    // Hide loading indicator
    loadingIndicator.style.display = 'none';
  }
});
