// utils/firebaseErrors.js

const FIREBASE_ERROR_MESSAGES = {
  // Login / Signup
  "auth/invalid-credential": "Email o password non corrette.",
  "auth/user-not-found": "Nessun account associato a questa email.",
  "auth/wrong-password": "Password errata.",
  "auth/invalid-email": "L'indirizzo email non è valido.",
  "auth/email-already-in-use": "Questa email è già registrata.",
  "auth/user-disabled": "Questo account è stato disabilitato.",
  "auth/operation-not-allowed":
    "Metodo di accesso non abilitato. Contatta l’assistenza.",
  "auth/too-many-requests": "Troppi tentativi. Riprova più tardi.",

  // Password
  "auth/invalid-password": "La password deve contenere almeno 6 caratteri.",
  "auth/weak-password": "La password è troppo debole.",

  // Google / OAuth
  "auth/popup-closed-by-user": "Hai chiuso la finestra di accesso con Google.",
  "auth/cancelled-popup-request": "Richiesta di login annullata.",
  "auth/account-exists-with-different-credential":
    "Esiste già un account con questa email ma con un metodo di accesso diverso.",

  // Sessione / token
  "auth/id-token-expired":
    "La sessione è scaduta. Effettua nuovamente l’accesso.",
  "auth/id-token-revoked":
    "La sessione è stata revocata. Effettua nuovamente l’accesso.",

  // Generici
  "auth/internal-error": "Errore interno del server. Riprova più tardi.",
  "auth/invalid-argument": "Dati forniti non validi.",
};

export function mapFirebaseError(error) {
  if (!error || !error.code) {
    return "Si è verificato un errore imprevisto.";
  }

  return (
    FIREBASE_ERROR_MESSAGES[error.code] ||
    "Si è verificato un errore durante l’autenticazione. Riprova."
  );
}