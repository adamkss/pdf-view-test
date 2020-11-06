const Observations = ({ observations = [] }) => {
  return (
    <div
      style={{
        padding: "1em",
      }}
    >
      <h2>Observations</h2>
      <ul>
        {observations.map((observation) => (
          <li key={observation}>{observation}</li>
        ))}
      </ul>
    </div>
  );
};

export default Observations;
