import { Modal } from '@shopify/polaris';
import { useCallback, useEffect, useState } from 'react';
import { useAppQuery, useAuthenticatedFetch } from '../../hooks';
import { DefinitionForm } from './DefitinitionForm';

export const MetaDefInfo = ({ id, setActive, active, setToastProps }) => {
  const handleChange = useCallback(() => setActive(!active), [active]);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const fetch = useAuthenticatedFetch();

  const {
    data: definition,
    refetch: refresh,
    isLoading: isLoading,
    isRefetching: isRefetching,
  } = useAppQuery({
    url: `/api/metaobject/get-definition?id=${id}`,
    reactQueryOptions: {
      onSuccess: () => {
        setToastProps({ content: 'Get definition successfully!' });
      },
      onError: () => {
        setToastProps({
          content: 'There was an error get this definition',
          error: true,
        });
      },
    },
  });

  useEffect(() => {
    if (active && id) {
      refresh();
    }
  }, [active, id]);

  return (
    <Modal
      open={active}
      onClose={handleChange}
      title='View Definition'
      primaryAction={{
        content: 'Save',
        onAction: handleChange,
        loading,
      }}
      secondaryActions={[
        {
          content: 'Cancel',
          onAction: handleChange,
        },
      ]}
    >
      <Modal.Section>
        <DefinitionForm
          data={definition?.body?.data?.metaobjectDefinition}
          setData={setData}
          loading={isRefetching || isLoading}
        />
      </Modal.Section>
    </Modal>
  );
};
