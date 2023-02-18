import { DataTable, Spinner, TextContainer } from '@shopify/polaris';
import { useMemo } from 'react';

export function CustomTable(props) {
  const { data, headings, ignoreFields, loading } = props;

  const result = useMemo(() => {
    if (loading)
      return (
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Spinner size='large' />
        </div>
      );

    if (!data || !data.length)
      return <TextContainer>Error: data is undefined</TextContainer>;

    if (!headings || !headings.length)
      return <TextContainer> Error: no headings</TextContainer>;

    const headers =
      ignoreFields && ignoreFields.length
        ? Object.keys(data[0]).filter(
            (item) => item !== 'id' && !ignoreFields.includes(item),
          )
        : Object.keys(data[0]).filter((item) => item !== 'id');

    const contentTypes = headers.map((item) => 'text');

    const customData = data.map((item) => {
      return headers.map((head) => {
        return String(item[head]);
      });
    });

    console.log(customData);
    console.log(contentTypes);

    return (
      <DataTable
        stickyHeader
        columnContentTypes={contentTypes}
        headings={headings}
        rows={customData}
      />
    );
  }, [data, headings]);
  return result;
}
