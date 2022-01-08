import { useAuth } from "../../context/auth";

export function Dashboard() {
  const { singOut } = useAuth();

  return (
    <>
      Teste
      <br />
      <button
        onClick={() => {
          singOut();
        }}
      >
        Terminar sessão
      </button>
    </>
  );
}
