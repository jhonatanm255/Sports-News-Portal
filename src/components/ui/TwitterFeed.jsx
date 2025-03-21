import React, { useEffect, useState } from "react";
import TwitterWidget from "./TwitterWidget";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";

const TwitterFeed = ({ accounts = [] }) => {
  const [visibleAccounts, setVisibleAccounts] = useState([]);

  useEffect(() => {
    if (!accounts || accounts.length === 0) {
      return; // Si no hay cuentas, no hacer nada
    }

    // Función para cargar las cuentas con un retraso
    const loadAccountsWithDelay = async () => {
      for (let i = 0; i < accounts.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 0)); // Retraso de 2 segundos

        // Verifica si la cuenta ya está en visibleAccounts antes de agregarla
        setVisibleAccounts((prev) => {
          if (!prev.includes(accounts[i])) {
            return [...prev, accounts[i]]; // Agrega la cuenta si no está ya en la lista
          }
          return prev; // Si ya está, no la agregues
        });
      }
    };

    loadAccountsWithDelay(); // Inicia la carga progresiva
  }, [accounts]); // Dependencia: accounts

  if (!accounts || accounts.length === 0) {
    return null; // Si no hay cuentas, no renderizar nada
  }

  return (
    <>
      <div className="twitter-feed mb-6 p-4 bg-white shadow-lg rounded-lg">
        <h3 className="font-custom text-lg font-semibold mb-4">
          <FontAwesomeIcon icon={faXTwitter} className="text-2xl mr-4" />
          Top News Sports
        </h3>
        <div className="space-y-9">
          {visibleAccounts.map((account, index) => (
            <TwitterWidget key={index} account={account} height={500} />
          ))}
        </div>
      </div>
      <hr className="mt-8 text-gray-900" />
    </>
  );
};

export default TwitterFeed;













