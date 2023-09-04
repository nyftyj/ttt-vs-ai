import { render } from '@testing-library/react';
import App from '../App';

describe('Private Routes', () => {
    beforeAll(() => {
        sessionStorage.clear();
    })

    it('should redirect Signup screen if no tokens are stored in sessionStorage', () => {
        render(<App />);
        expect(window.location.pathname).toBe('/');
    });

    it('should redirect to Game screen if invalid url is entered', () => {
        render(<App />);
        window.location.pathname.replace('/game');
        expect(window.location.pathname).toBe('/');

        window.location.pathname.replace('/random');
        expect(window.location.pathname).toBe('/');
    })
});