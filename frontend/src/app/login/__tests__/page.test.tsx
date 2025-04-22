import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from '../page';

const mockPush = jest.fn(); // Mock global para o push

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: mockPush, // Usa o mock global
    }),
}));

describe('LoginPage', () => {
    it('renders the login form', () => {
        render(<LoginPage />);

        expect(screen.getByText('Login')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Senha')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Entrar/i })).toBeInTheDocument();
    });

    it('shows an error message when login fails', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                json: () => Promise.resolve({ error: 'Credenciais inválidas' }),
            })
        ) as jest.Mock;

        render(<LoginPage />);

        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Senha'), { target: { value: 'wrongpassword' } });
        fireEvent.click(screen.getByRole('button', { name: /Entrar/i }));

        const errorMessage = await screen.findByText('Credenciais inválidas');
        expect(errorMessage).toBeInTheDocument();
    });

    it('redirects to profile page on successful login', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ token: 'fake-jwt-token' }),
            })
        ) as jest.Mock;

        render(<LoginPage />);

        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Senha'), { target: { value: 'password' } });
        fireEvent.click(screen.getByRole('button', { name: /Entrar/i }));

        // Aguarda o comportamento assíncrono
        await screen.findByText('Login'); // Aguarda a renderização do componente após o login

        // Verifica se o redirecionamento foi chamado
        expect(mockPush).toHaveBeenCalledWith('/profile');
    });
});