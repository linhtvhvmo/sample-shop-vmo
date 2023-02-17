export function CustomTable(props) {
  const { data } = props;

  if (!data || data.length === 0) return <>no data</>;

  const headers = Object.keys(data[0]);

  return (
    <table>
      <tr>
        {headers.map((item) => (
          <th>{item}</th>
        ))}
      </tr>
    </table>
  );
}
