import { FC } from 'react';
import * as yup from 'yup';
import { Button, Card, Container, FormControl, Grid, TextField } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { SuspenseLoader } from '@/components/App/Loader';

interface PROPS {
  schema: yup.AnyObjectSchema;
  handleSubmit: (values: { question: string; answer: string }) => Promise<void>;
  initialValues: { question: string; answer: string };
  loading: boolean;
}

const AddEditFaq: FC<PROPS> = ({ schema, handleSubmit, initialValues, loading }) => {
  return (
    <Card sx={{ textAlign: 'right', mt: 3, p: 4 }}>
      <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
        {({ isSubmitting, touched, errors }) => (
          <Form>
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
            <Button type="submit" variant="contained" size="medium" sx={{ margin: 2, mr: 0 }} disabled={isSubmitting}>
              {loading ? <SuspenseLoader /> : 'Submit'}
            </Button>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default AddEditFaq;
