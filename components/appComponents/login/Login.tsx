'use client'
import axios, { AxiosResponse } from 'axios';
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import ListCalls from '../calls/ListCalls';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Logged {
  message: string;
  logged: boolean;
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [logged, setLogged] = useState(Cookies.get('logged') === 'true');

  const handleConfirmationLogin = async () => {

    if (!logged) {
      try {
        const response: AxiosResponse<Logged> = await axios.post(
          'http://localhost:3000/integrator/login',
          { email: email, password: password }
        );
        setLogged(response.data.logged);
        Cookies.set('logged', response.data.logged.toString(), { expires: 1 });
      } catch (error) {
        console.error('Erro ao fechar chamado:', error);
      }
    }
  };


  return (
    <main className="flex justify-center items-center h-screen bg-blue-500">
      {logged ? (
        <main className="flex flex-col justify-between h-[99.9vh] w-full bg-gradient-to-b from-gray-100 to-gray-200">
          <div className='flex items-center justify-center h-24 bg-gradient-to-r from-blue-400 to-blue-600'>
            <p className='text-2xl text-white'>Chamados</p>
          </div>
          <ScrollArea className="rounded-md border p-4">
            <ListCalls />
          </ScrollArea>
        </main>
      ) : (
        <div className="bg-white p-8 rounded-md shadow-lg w-96">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-600">Login</h2>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="email">
              Email:
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="password">
              Senha:
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 focus:outline-none flex m-auto"
            onClick={handleConfirmationLogin}
          >
            Entrar
          </button>
        </div>
      )}
    </main>
  );
}
