import { FC, useRef } from 'react';
import Switch from '@mui/material/Switch';
import JoditEditor from 'jodit-react';
import * as yup from 'yup';
import { Box, Button, Card, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { SuspenseLoader } from '@/components/App/Loader';
import { useTheme } from '@mui/material/styles';

interface PROPS {
  schema: yup.AnyObjectSchema;
  handleSubmit: (values: { [key: string]: string }) => Promise<void>;
  initialValues: {
    title: string;
    metaDescription: string;
    content: string;
    metaKeywords: string;
    description: string;
    metaTitle: string;
    active: string;
  };
  loading: boolean;
}

const AddEditContentManager: FC<PROPS> = ({ schema, handleSubmit, initialValues, loading }) => {
  const editor = useRef(null);
  const theme = useTheme();
  // Jodit editor configuration (syncs with the theme)
  const editorConfig = {
    readonly: false, // All edits enabled
    placeholder: 'Start typing content here...',
    theme: 'custom',
    toolbarSticky: true,
    toolbarStickyOffset: 80,
    style: { minHeight: '300px' }, // Corrected to use an object
    backgroundColor: 'transparent',
  };

  return (
    <Card sx={{ mt: 3, p: 4 }}>
      <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
        {({ isSubmitting, touched, errors, values, setFieldValue }) => (
          <Form>
            {/* Title */}
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
                  {({ field, form }: any) => (
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
                {loading ? <SuspenseLoader /> : 'Submit'}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default AddEditContentManager;
