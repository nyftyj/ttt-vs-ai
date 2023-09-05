import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { validate } from '../util/formValidator';
import { API, DEFAULT_FORM, STATUS_CODE_500_MESSAGE, STATUS_CODE_400_MESSAGE } from '../constants';

const useForm = () => {
    const [formValue, setFormValue] = useState(DEFAULT_FORM);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    }

    const resetForm = useCallback(() => {
        setFormValue(DEFAULT_FORM);
        setFormErrors({});
    }, [setFormValue, setFormErrors]);

    const handleSubmit = () => {
        const errors = validate(formValue);
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            setIsSubmitting(true);
        }
    }

    useEffect(() => {
        if (isSubmitting) {
            const { email } = formValue;
            const submitForm = async () => {
                try {
                    const res = await fetch(API + '/auth', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email })
                    })

                    if (res.status === 500) {
                        setFormErrors({
                            ...formErrors,
                            formError: STATUS_CODE_500_MESSAGE
                        })
                        setIsSubmitting(false);
                    } else if (res.status === 400) {
                        setFormErrors({
                            ...formErrors,
                            formError: STATUS_CODE_400_MESSAGE
                        })
                        setIsSubmitting(false);
                    } else if (res.status !== 200) {
                        setFormErrors({
                            ...formErrors,
                            formError: 'Oops something went wrong. Please try again later.'
                        });
                        setIsSubmitting(false);
                    }

                    const data = await res.json();
                    if (data.success) {
                        sessionStorage.setItem('token', data.token);
                        setTimeout(() => {
                            resetForm();
                            setIsSubmitting(false);
                            navigate('/game');
                        }, 1000);
                    }
                } catch (error) {
                    // a good place to capture client side errors with monitoring services like Sentry/Dadadog
                    console.error('Error occured while attempting to submit form', error)
                }

            }
            submitForm();
        }
    }, [formErrors, isSubmitting, formValue, resetForm, navigate]);

    return {
        formValue,
        formErrors,
        isSubmitting,
        handleChange,
        handleSubmit,
        resetForm,
    }
}

export default useForm;