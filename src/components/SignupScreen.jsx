import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import useForm from '../hooks/useForm';
import Status from './Status';

const SignupScreen = () => {
    const {
        formValue,
        formErrors,
        isSubmitting,
        handleChange,
        handleSubmit,
    } = useForm();

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit();
    }

    const hasError = !!(formErrors.formError || formErrors.email);

    return (
        <form className='signup-form' onSubmit={(e) => onSubmit(e)}>
            <Status className='signup-status' status='Sign up to play' isLoading={isSubmitting} />
            <TextField
                autoComplete='off'
                className='signup-email-input'
                inputProps={{
                    'data-testid': 'signup-email-input'
                }}
                type='text'
                label='Email'
                name='email'
                placeholder='jane@gmail.com'
                variant='filled'
                value={formValue.email}
                onChange={(e) => handleChange(e)}
                error={hasError}
                helperText={formErrors.formError || formErrors.email}
                margin='normal'
                sx={{ margin: '24px 0' }}
            />
            <Button
                className='signup-button'
                data-testid='signup-button'
                variant='contained'
                label='Sign up'
                type='submit'
                fullWidth
            >
                Sign up
            </Button>
        </form>
    )
}

export default SignupScreen;