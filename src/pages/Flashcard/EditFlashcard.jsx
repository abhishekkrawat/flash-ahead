import { Button, FormControl, FormLabel, Input, Popover, PopoverContent } from '@chakra-ui/react';
import { Field, Formik } from 'formik';

export const EditFlashcard = () => {
  return (
    <Popover>
      <PopoverContent>hi</PopoverContent>
    </Popover>
  );
};

const Form = () => {
  <Formik
    initialValues={{ name: 'Sasuke' }}
    onSubmit={(values, actions) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
      }, 1000);
    }}
  >
    {(props) => (
      <Form>
        <Field name='name'>
          {({ field }) => (
            <FormControl>
              <FormLabel>Flashcard Front</FormLabel>
              <Input {...field} placeholder='flashcard front' />
            </FormControl>
          )}
        </Field>
        <Button mt={4} colorScheme='teal' isLoading={props.isSubmitting} type='submit'>
          Submit
        </Button>
      </Form>
    )}
  </Formik>;
};
