export default function AuthToggleLink({ isLogin, setType }) {
  return (
    <div className="text-sm mt-2 text-center">
      {isLogin ? (
        <>
          Non hai ancora un account?{" "}
          <button
            className="text-blue-600 hover:underline"
            onClick={() => setType("signup")}
          >
            Registrati
          </button>
        </>
      ) : (
        <>
          Sei già registrato?{" "}
          <button
            className="text-blue-600 hover:underline"
            onClick={() => setType("login")}
          >
            Accedi
          </button>
        </>
      )}
    </div>
  );
}