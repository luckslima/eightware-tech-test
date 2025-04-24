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
                json: () =>
                    Promise.resolve({
                        user: {
                            name: 'Lucas',
                            email: 'test@email.com',
                            bio: 'My bio',
                            photo_url: null
                        }
                    })
            })
        ) as jest.Mock;

        render(<ProfilePage />);

        expect(await screen.findByText('Bem-vindo(a)!')).toBeInTheDocument();
        expect(await screen.findByText('Carregando informações...')).toBeInTheDocument();
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