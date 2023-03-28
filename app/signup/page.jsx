import styles from "../page.module.css";
import SignIn from "../components/SignIn";

export default function Register() {
  return (
    <main className={styles.main}>
      <SignIn isSignUp />
    </main>
  );
}
