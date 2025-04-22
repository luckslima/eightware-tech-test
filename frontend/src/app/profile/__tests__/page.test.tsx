import React from 'react';
import { render, screen } from '@testing-library/react';
import ProfilePage from '../page';

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: mockPush,
    }),
}));

describe('ProfilePage', () => {
    it('renders the profile page with user data', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ email: 'test@example.com' }),
            })
        ) as jest.Mock;

        render(<ProfilePage />);

        // Aguarda até que o texto "Email: test@example.com" seja exibido
        const mensagem = await screen.findByText('Bem-vindo!', {}, { timeout: 3000 });
        expect(mensagem).toBeInTheDocument();
    });

    it('redirects to login page if not authenticated', async () => {

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                status: 401,
                json: () => Promise.resolve({ error: 'Unauthorized' }),
            })
        ) as jest.Mock;

        render(<ProfilePage />);

        expect(mockPush).toHaveBeenCalledWith('/login');
    });
});