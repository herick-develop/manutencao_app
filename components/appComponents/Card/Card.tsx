'use client';
import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';

import ConfirmationModal from '../ConfirmationModal';

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


export default function Card( {data} : {data: Call[]} ) {

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [showButtons, setShowButtons] = useState(false);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [selectedCallId, setSelectedCallId] = useState<number | null>(null);

  const handleToggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
    if (expandedIndex === index) {
      setShowButtons(false);
    } else { setShowButtons(true) }
  };

  const handleEncerrarClick = (callId: number) => {
    setConfirmationModalOpen(true);
    setSelectedCallId(callId);
  };

  const handleConfirmationCancel = () => {
    setConfirmationModalOpen(false);
  };

  const handleConfirmationConfirm = async () => {
    setConfirmationModalOpen(false);
  
    if (selectedCallId !== null) {
  
      const fetchData = async () => {
        try {
          const response: AxiosResponse<Call[]> = await axios.post(
            'http://localhost:3000/support/deleteCall',
            { id: selectedCallId }
          );
        } catch (error) {
          console.error('Erro ao fechar chanado:', error);
        } finally {
          window.location.reload();
        }
      };
      fetchData();
    }
  };

  return (
    <main>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

          {data.map((call, index) => (

            <div
              key={call.id}
            >

            <div
              className={`border rounded-md p-4 ${ call.status !== 3 ? ( 'bg-gradient-to-r from-blue-400 to-blue-600') : ( 'bg-zinc-600 opacity-60') } hover:shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out`}
              style={{ transform: expandedIndex === index ? 'rotateY(360deg)' : 'none' }}
              onClick={() => { handleToggleExpand(index); }}
            >
              {expandedIndex === index ? (
                <div className={`mb-2 border rounded-md p-4 ${call.status !== 3 ? 'bg-gradient-to-r from-blue-400 to-blue-600' : 'bg-zinc-600 opacity-60'} hover:shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out`}>
                  <p className="font-bold text-lg text-white">
                    Descrição: <span className="text-gray-100" style={{ minHeight: '3rem', wordWrap: 'break-word' }}>{call.reason}</span>
                  </p>
                  {showButtons && call.status != 3 && (
                    <div className="flex justify-end mt-4">
                      <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => handleEncerrarClick(call.id)}>
                        Encerrar
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div className="mb-2">
                    <p className="font-bold text-lg text-white">Usuário: <span className="text-gray-200">{call.uname}</span></p>
                  </div>

                  <div className="mb-2">
                    <p className="font-bold text-lg text-white">Título: <span className="text-gray-200">{call.title}</span></p>
                  </div>

                  <div className="mb-2">
                    <p className="font-bold text-lg text-white">Setor: <span className="text-gray-200">{call.sname}</span></p>
                  </div>

                  <div className="mb-2">
                    <p className="font-bold text-lg text-white">Cidade: <span className="text-gray-200">{call.cname}</span></p>
                  </div>

                  <div className="mb-2">
                    <p className="font-bold text-lg text-white">Aberto em: <span className="text-gray-200">{ new Date(call.created).toLocaleString() }</span></p>
                  </div>

                  { call.status != 3 ? (null) : (
                    <div className="mb-2">
                    <p className="font-bold text-lg text-white">Fechado em: <span className="text-gray-200">{ new Date(call.finished).toLocaleString() }</span></p>
                  </div>
                  ) }
                  
                </>
              )}
            </div>
            </div>
          ))}
        </div>

        <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onCancel={handleConfirmationCancel}
        onConfirm={handleConfirmationConfirm}
        />

    </main>
  );
}
