import { FC } from 'react';
import * as yup from 'yup';
import { Button, Card, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { SuspenseLoader } from '@/components/App/Loader';

interface PROPS {
  schema: yup.AnyObjectSchema;
  handleSubmit: (values: { question: string; answer: string; category: string }) => Promise<void>;
  initialValues: { question: string; answer: string; category: string };
  loading: boolean;
}

const categories = [
  { value: 'account_management', label: 'Account Management' },
  { value: 'troubleshooting', label: 'Troubleshooting / Common Issues' },
  { value: 'policies', label: 'Policies and Security' },
  { value: 'security', label: 'Passwords/Security' },
  { value: 'others', label: 'Other' },
];

const AddEditFaq: FC<PROPS> = ({ schema, handleSubmit, initialValues, loading }) => {
  return (
    <Card sx={{ mt: 3, p: 4 }}>
      <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
        {({ isSubmitting, touched, errors }) => (
          <Form>
            <FormControl variant="outlined" fullWidth sx={{ mb: 3 }}>
              <InputLabel>Category</InputLabel>
              <Field as={Select} name="category" label="Category" error={touched.category && Boolean(errors.category)}>
                {categories.map(option => (
                  <MenuItem sx={{ textAlign: 'left' }} key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Field>
              <ErrorMessage name="category" component="div" />
            </FormControl>

            <FormControl variant="outlined" fullWidth>
              <Field
                as={TextField}
                name="question"
                label="Question"
                required
                fullWidth
                error={touched.question && Boolean(errors.question)}
                helperText={<ErrorMessage name="question" />}
              />
            </FormControl>

            <FormControl variant="outlined" fullWidth sx={{ mt: 3 }}>
              <Field
                as={TextField}
                name="answer"
                label="Answer"
                required
                fullWidth
                multiline
                minRows={4}
                error={touched.answer && Boolean(errors.answer)}
                helperText={<ErrorMessage name="answer" />}
              />
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              size="medium"
              sx={{ margin: 2, mr: 0, float: 'right' }}
              disabled={isSubmitting}
            >
              {loading ? <SuspenseLoader /> : 'Submit'}
            </Button>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default AddEditFaq;
