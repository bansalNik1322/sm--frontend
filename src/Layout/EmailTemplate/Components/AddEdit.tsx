import { Button, Card, FormControl, Grid, TextField } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import JoditEditor from 'jodit-react';
import { FC, useRef } from 'react';
import * as yup from 'yup';

import { ButtonLoader } from '@/components/App/Loader';

export interface IEmailTemplate {
  title: string;
  subject: string;
  slug: string;
  template: string;
}

interface PROPS {
  schema: yup.AnyObjectSchema;
  handleSubmit: (values: IEmailTemplate) => Promise<void>;
  initialValues: IEmailTemplate;
  loading: boolean;
  edit: boolean;
}
const AddEditEmailTemplate: FC<PROPS> = ({ schema, edit, handleSubmit, initialValues, loading }) => {
  const editor = useRef(null);
  const editorConfig = {
    readonly: false,
    placeholder: 'Start typing template here...',
    theme: 'custom',
    toolbarSticky: true,
    toolbarStickyOffset: 80,
    style: { minHeight: '300px' },
    backgroundColor: 'transparent',
  };
  return (
    <Card sx={{ mt: 3, p: 4 }}>
      <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
        {({ isSubmitting, touched, errors, values, setFieldValue }) => (
          <Form>
            {/* Title */}
            <Grid container spacing={2}>
              {/* Title Field */}
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth>
                  <Field
                    as={TextField}
                    name="title"
                    label="Title"
                    fullWidth
                    error={touched.title && Boolean(errors.title)}
                    helperText={<ErrorMessage name="title" />}
                  />
                </FormControl>
              </Grid>

              {/* Slug Field */}
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth>
                  <Field
                    disabled={edit}
                    as={TextField}
                    name="slug"
                    label="Slug"
                    fullWidth
                    error={touched.slug && Boolean(errors.slug)}
                    helperText={<ErrorMessage name="slug" />}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* Meta Title */}
            <FormControl variant="outlined" fullWidth sx={{ mt: 2 }}>
              <Field
                as={TextField}
                name="subject"
                label="Subject"
                fullWidth
                error={touched.subject && Boolean(errors.subject)}
                helperText={<ErrorMessage name="subject" />}
              />
            </FormControl>

            {/* Content Editor */}
            <FormControl variant="outlined" fullWidth sx={{ mt: 2 }}>
              <JoditEditor
                ref={editor}
                value={values.template}
                config={editorConfig}
                onBlur={newContent => setFieldValue('template', newContent)}
              />
              {touched.template && Boolean(errors.template) && (
                <div style={{ color: 'red', fontSize: '0.8em' }}>{errors.template}</div>
              )}
            </FormControl>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              size="medium"
              sx={{ margin: 2, mr: 0, float: 'right' }}
              disabled={isSubmitting}
            >
              {loading ? <ButtonLoader /> : 'Submit'}
            </Button>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default AddEditEmailTemplate;
