import { useState } from "react";
import { useSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";

const RepositoriesList: React.FC = () => {
  const [term, setTerm] = useState("");
  const { searchRepositories } = useActions();
  const { data, error, loading } = useSelector((state) => state.repositories);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchRepositories(term);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={term} onChange={(e) => setTerm(e.target.value)} />
        <button>Search</button>
      </form>
      {error && <h3>{error}</h3>}
      {loading && <h3>Loading...</h3>}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gridGap: "1rem",
        }}
      >
        {!error &&
          !loading &&
          data.map((item) => (
            <div key={item.name} style={{ background: "lightgrey" }}>
              <h3>
                {item.name} - {item.version}
              </h3>
              <p>{item.description}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RepositoriesList;
