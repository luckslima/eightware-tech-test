import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SignupPage from '../page';

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(), // Mock da função push
    }),
}));

describe('SignupPage', () => {
    it('renders the signup form', () => {
        render(<SignupPage />);

        expect(screen.getByText('Criação de Conta')).toBeInTheDocument();
        expect(screen.getByLabelText('Email:')).toBeInTheDocument();
        expect(screen.getByLabelText('Senha:')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Criar Conta/i })).toBeInTheDocument();
    });

    it('shows an error message when signup fails', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                json: () => Promise.resolve({ error: 'Erro ao criar conta' }),
            })
        ) as jest.Mock;

        render(<SignupPage />);

        fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText('Senha:'), { target: { value: 'password' } });
        fireEvent.click(screen.getByRole('button', { name: /Criar Conta/i }));

        const errorMessage = await screen.findByText('Erro ao criar conta');
        expect(errorMessage).toBeInTheDocument();
    });
});