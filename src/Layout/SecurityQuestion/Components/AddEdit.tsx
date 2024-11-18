import { Button, Card, FormControl, TextField } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { FC } from 'react';
import * as yup from 'yup';

import { SuspenseLoader } from '@/components/App/Loader';

interface PROPS {
  schema: yup.AnyObjectSchema;
  handleSubmit: (values: { question: string }) => Promise<void>;
  initialValues: { question: string };
  loading: boolean;
}

const AddEditSecurityQuestion: FC<PROPS> = ({ schema, handleSubmit, initialValues, loading }) => {
  return (
    <Card sx={{ textAlign: 'right', mt: 3, p: 4 }}>
      <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
        {({ isSubmitting, touched, errors }) => (
          <Form>
            <FormControl variant="outlined" fullWidth>
              <Field
                as={TextField}
                name="question"
                label="Security Question"
                required
                fullWidth
                error={touched.question && Boolean(errors.question)}
                helperText={<ErrorMessage name="question" />}
              />
            </FormControl>
            <Button type="submit" variant="contained" size="medium" sx={{ margin: 2, mr: 0 }} disabled={isSubmitting}>
              {loading ? <SuspenseLoader /> : 'Submit'}
            </Button>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default AddEditSecurityQuestion;
