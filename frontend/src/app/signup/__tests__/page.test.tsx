import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SignupPage from '../page';

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: mockPush
    })
}));

describe('SignupPage', () => {
    it('renders the signup form', () => {
        render(<SignupPage />);

        expect(screen.getByText('Crie sua conta')).toBeInTheDocument();
        expect(screen.getByLabelText('Email:')).toBeInTheDocument();
        expect(screen.getByLabelText('Senha:')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Criar Conta/i })).toBeInTheDocument();
    });

    it('shows an error message when the password is too short', async () => {
        render(<SignupPage />);

        fireEvent.change(screen.getByLabelText('Nome:'), { target: { value: 'Lucas' } });
        fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText('Senha:'), { target: { value: '123' } });
        fireEvent.click(screen.getByRole('button', { name: /Criar Conta/i }));

        const errorMessage = await screen.findByText('A senha deve ter no mínimo 6 caracteres.');
        expect(errorMessage).toBeInTheDocument();
    });

    it('shows an error message when the email is already registered', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                json: () => Promise.resolve({ errors: ['Email has already been taken'] }),
            })
        ) as jest.Mock;

        render(<SignupPage />);

        fireEvent.change(screen.getByLabelText('Nome:'), { target: { value: 'Lucas' } });
        fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText('Senha:'), { target: { value: 'password123' } });
        fireEvent.click(screen.getByRole('button', { name: /Criar Conta/i }));

        const errorMessage = await screen.findByText('Este email já está cadastrado.');
        expect(errorMessage).toBeInTheDocument();
    });

    it('redirects to profile page on successful signup', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ token: 'fake-jwt-token' }),
            })
        ) as jest.Mock;

        render(<SignupPage />);

        fireEvent.change(screen.getByLabelText('Nome:'), { target: { value: 'Lucas' } });
        fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText('Senha:'), { target: { value: 'password123' } });
        fireEvent.click(screen.getByRole('button', { name: /Criar Conta/i }));

        await screen.findByText('Crie sua conta');

        expect(mockPush).toHaveBeenCalledWith('/profile');
    });
});