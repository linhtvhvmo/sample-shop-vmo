import {
  Checkbox,
  Form,
  FormLayout,
  Spinner,
  TextField,
} from '@shopify/polaris';

const configField = { autoComplete: 'off' };

export const ProductForm = ({ data, setData, loading }) => {
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
          id='title'
          label='Title'
          {...configField}
          value={data['title']}
          onChange={handleChange}
        />
        <TextField
          id='bodyHtml'
          label='Body '
          {...configField}
          value={data['bodyHtml']}
          onChange={handleChange}
        />
        <TextField
          id='vendor'
          label='Vendor'
          {...configField}
          value={data['vendor']}
          onChange={handleChange}
        />
        <TextField
          id='productType'
          label='Product Type'
          {...configField}
          value={data['productType']}
          onChange={handleChange}
        />
        <Checkbox
          id='published'
          label='Published'
          checked={data['published']}
          onChange={handleChange}
        />
      </FormLayout>
    </Form>
  );
};
