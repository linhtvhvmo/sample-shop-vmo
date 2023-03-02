import { Form, FormLayout, Spinner, TextField } from '@shopify/polaris';

const configField = { autoComplete: 'off' };

export const DefinitionForm = ({ data, setData, loading }) => {
  const handleChange = (e, id) => {
    setData({ ...data, [id]: e });
  };

  if (loading) {
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
  }

  if (!loading && !data) {
    return (
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        No data error
      </div>
    );
  }
  return (
    <Form>
      <FormLayout>
        <TextField
          id='displayNameKey'
          label='Display name key'
          {...configField}
          value={data['displayNameKey']}
          onChange={handleChange}
        />
        <TextField
          id='id'
          label='Id'
          {...configField}
          value={data['id']}
          onChange={handleChange}
        />
        <TextField
          id='name'
          label='Name definition'
          {...configField}
          value={data['name']}
          onChange={handleChange}
        />
      </FormLayout>
    </Form>
  );
};
