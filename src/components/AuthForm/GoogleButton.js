export default function GoogleButton({ isLogin, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full border py-2 rounded hover:bg-gray-100 transition flex items-center justify-center gap-2"
    >
      <img src="/google-logo.svg" alt="Google logo" width={20} height={20} />
      {isLogin ? "Accedi con Google" : "Registrati con Google"}
    </button>
  );
}
