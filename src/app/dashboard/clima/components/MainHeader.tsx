/** @format */
"use client";

import React, { useState } from "react";
import { FaSearch, FaUser } from "react-icons/fa";
import { MdMyLocation } from "react-icons/md";
import SearchBox from "./SearchBox";
import axios from "axios";
import { loadingCityAtom, placeAtom } from "../app/atom";
import { useAtom } from "jotai";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;

export default function MainHeader() {
  // --- Lógica de busca ... ---
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [place, setPlace] = useAtom(placeAtom);
  const [_, setLoadingCity] = useAtom(loadingCityAtom);

  async function handleInputChang(value: string) {
    setCity(value);
    if (value.length >= 3) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${API_KEY}&lang=pt_br`
        );
        const suggestions = response.data.list.map((item: any) => item.name);
        setSuggestions(suggestions);
        setError("");
        setShowSuggestions(true);
      } catch (error) {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }

  function handleSuggestionClick(value: string) {
    setCity(value);
    setShowSuggestions(false);
    setPlace(value); 
    setLoadingCity(true);
    setTimeout(() => setLoadingCity(false), 500);
  }

  function handleSubmiSearch(e: React.FormEvent<HTMLFormElement>) {
    setLoadingCity(true);
    e.preventDefault();
    if (suggestions.length == 0) {
      setError("Local não encontrado");
      setLoadingCity(false);
    } else {
      setError("");
      setTimeout(() => {
        setLoadingCity(false);
        setPlace(city);
        setShowSuggestions(false);
      }, 500);
    }
  }

  function handleCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (postiion) => {
        const { latitude, longitude } = postiion.coords;
        try {
          setLoadingCity(true);
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&lang=pt_br`
          );
          setTimeout(() => {
            setLoadingCity(false);
            setPlace(response.data.name);
          }, 500);
        } catch (error) {
          setLoadingCity(false);
        }
      });
    }
  }
  // --- FIM DA LÓGICA ---

  return (
    // Alinhado o padding lateral com o conteúdo (px-6)
    <header className="flex justify-between items-center mb-[30px] px-6 py-4 bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800">
        
      </h1>

      <div className="flex items-center gap-4">
        
        <MdMyLocation
          title="Sua Localização Atual"
          onClick={handleCurrentLocation}
          className="text-2xl text-gray-500 hover:opacity-80 cursor-pointer"
        />

        {/* --- MUDANÇA AQUI (Barra de Busca) --- */}
        {/* Diminuído o tamanho da barra de busca de w-[300px] para w-72 (288px) */}
        <div className="relative">
          <SearchBox
            value={city}
            onSubmit={handleSubmiSearch}
            onChange={(e) => handleInputChang(e.target.value)}
            className="w-72 shadow-sm rounded-full" // MUDADO AQUI
          />
          <SuggetionBox
            {...{
              showSuggestions,
              suggestions,
              handleSuggestionClick,
              error
            }}
          />
        </div>

        
      </div>
    </header>
  );
}

// --- Caixa de Sugestão (copiada do Navbar) ---
function SuggetionBox({
  showSuggestions,
  suggestions,
  handleSuggestionClick,
  error
}: {
  showSuggestions: boolean;
  suggestions: string[];
  handleSuggestionClick: (item: string) => void;
  error: string;
}) {
  return (
    <>
      {((showSuggestions && suggestions.length > 1) || error) && (
        // --- MUDANÇA AQUI ---
        // Diminuído o min-width para bater com o w-72 da barra de busca
        <ul className="mb-4 bg-white absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[288px] shadow-lg flex flex-col gap-1 py-2 px-2 z-50">
          {error && suggestions.length < 1 && (
            <li className="text-red-500 p-1 "> {error}</li>
          )}
          {suggestions.map((item, i) => (
            <li
              key={i}
              onClick={() => handleSuggestionClick(item)}
              className="cursor-pointer p-1 rounded hover:bg-gray-200"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}