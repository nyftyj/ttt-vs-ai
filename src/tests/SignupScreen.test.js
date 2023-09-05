import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import SignupScreen from '../components/SignupScreen';

describe('SignupScreen', () => {
    it('should have one input', async () => {
        render(
            <BrowserRouter>
                <SignupScreen />
            </BrowserRouter>
        );
        expect(await screen.findAllByTestId('signup-email-input')).toHaveLength(1);
        expect(screen.getByTestId('signup-email-input')).toBeInTheDocument();
    });

    it('should have one button to sign up', async () => {
        render(
            <BrowserRouter>
                <SignupScreen />
            </BrowserRouter>
        );
        expect(await screen.findAllByTestId('signup-button')).toHaveLength(1);
        expect(screen.getByTestId('signup-button')).toBeInTheDocument();
    });
});