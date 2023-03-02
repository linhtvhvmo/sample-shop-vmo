import {
  IndexTable,
  Spinner,
  TextContainer,
  useIndexResourceState,
} from '@shopify/polaris';
import { useEffect } from 'react';

export function CustomTable(props) {
  const { data, headings, ignoreFields, loading, setSelected, isDiscardId } =
    props;

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

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(data);

  useEffect(() => {
    if (setSelected) {
      setSelected(selectedResources);
    }
  }, [selectedResources]);

  const resourceName = {
    singular: 'one_data',
    plural: 'data',
  };

  let headers =
    ignoreFields && ignoreFields.length
      ? Object.keys(data[0]).filter((item) => !ignoreFields.includes(item))
      : Object.keys(data[0]);

  if (isDiscardId) {
    headers = headers.filter((item) => item !== 'id');
  }

  const rowMarkup = data.map((item, index) => (
    <IndexTable.Row
      id={item.id}
      key={item.id}
      selected={selectedResources.includes(item.id)}
      position={index}
    >
      {headers.map((head) => (
        <IndexTable.Cell>{String(item[head])}</IndexTable.Cell>
      ))}
    </IndexTable.Row>
  ));

  const convertHeading = headings.map((item) => {
    return { title: item };
  });

  return (
    <IndexTable
      resourceName={resourceName}
      itemCount={data.length}
      selectedItemsCount={
        allResourcesSelected ? 'All' : selectedResources.length
      }
      onSelectionChange={handleSelectionChange}
      headings={convertHeading}
    >
      {rowMarkup}
    </IndexTable>
  );
}
