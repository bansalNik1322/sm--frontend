import { Box, Button, Card, FormControl, Grid, TextField } from '@mui/material';
import Switch from '@mui/material/Switch';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import JoditEditor from 'jodit-react';
import { FC, useRef } from 'react';
import * as yup from 'yup';

import { ButtonLoader } from '@/components/App/Loader';

export interface IContentManager {
  title: string;
  metaDescription: string;
  slug: string;
  content: string;
  metaKeywords: string;
  description: string;
  metaTitle: string;
  active: boolean;
}

interface PROPS {
  schema: yup.AnyObjectSchema;
  handleSubmit: (values: IContentManager) => Promise<void>;
  initialValues: IContentManager;
  loading: boolean;
  edit: boolean;
}

const AddEditContentManager: FC<PROPS> = ({ schema, edit, handleSubmit, initialValues, loading }) => {
  const editor = useRef(null);
  const editorConfig = {
    readonly: false,
    placeholder: 'Start typing content here...',
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
                name="metaTitle"
                label="Meta Title"
                fullWidth
                error={touched.metaTitle && Boolean(errors.metaTitle)}
                helperText={<ErrorMessage name="metaTitle" />}
              />
            </FormControl>

            {/* Description */}
            <FormControl variant="outlined" fullWidth sx={{ mt: 2 }}>
              <Field
                as={TextField}
                name="description"
                label="Description"
                fullWidth
                multiline
                minRows={3}
                error={touched.description && Boolean(errors.description)}
                helperText={<ErrorMessage name="description" />}
              />
            </FormControl>

            {/* Meta Description */}
            <FormControl variant="outlined" fullWidth sx={{ mt: 2 }}>
              <Field
                as={TextField}
                name="metaDescription"
                label="Meta Description"
                fullWidth
                error={touched.metaDescription && Boolean(errors.metaDescription)}
                multiline
                minRows={2}
                helperText={<ErrorMessage name="metaDescription" />}
              />
            </FormControl>

            {/* Meta Keywords */}
            <FormControl variant="outlined" fullWidth sx={{ mt: 2 }}>
              <Field
                as={TextField}
                name="metaKeywords"
                label="Meta Keywords"
                fullWidth
                error={touched.metaKeywords && Boolean(errors.metaKeywords)}
                multiline
                minRows={2}
                helperText={<ErrorMessage name="metaKeywords" />}
              />
            </FormControl>

            {/* Content Editor */}
            <FormControl variant="outlined" fullWidth sx={{ mt: 2 }}>
              <JoditEditor
                ref={editor}
                value={values.content}
                config={editorConfig}
                onBlur={newContent => setFieldValue('content', newContent)}
              />
              {touched.content && Boolean(errors.content) && (
                <div style={{ color: 'red', fontSize: '0.8em' }}>{errors.content}</div>
              )}
            </FormControl>

            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <Field name="active">
                  {({ field }: any) => (
                    <Switch
                      {...field}
                      checked={field.value}
                      onChange={e => setFieldValue('active', e.target.checked)}
                      color="primary"
                    />
                  )}
                </Field>
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
            </Box>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default AddEditContentManager;
