'use client';
import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

import Card from '../Card/Card'

interface Call {
  id: number;
  idUsercall: number;
  created: string;
  status: number;
  uname: string;
  lastname: string;
  cname: string;
  sname: string;
  slaname: string;
  responsetime: number;
  color: string;
  title: string;
  reason: string;
  finished: string;
}

export default function Home() {
  const [data, setData] = useState<Call[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<Call[]> = await axios.get('http://localhost:3000/support/listCall/3');

        console.log('response: ', response);
        setData(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main>
    {loading ? (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full border-t-4 border-blue-500 border-opacity-25 h-16 w-16"></div>
      </div>
      ) : (
        <Card data={ data }/>
      )}

    </main>
  );
}
