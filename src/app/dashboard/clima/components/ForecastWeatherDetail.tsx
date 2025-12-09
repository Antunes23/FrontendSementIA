/** @format */

import React from "react";
import Container from "./Container";
import WeatherIcon from "./WeatherIcon";
import WeatherDetails, { WeatherDetailProps } from "./WeatherDetails";
import { convertKelvinToCelsius } from "../utils/convertKelvinToCelsius";

export interface ForecastWeatherDetailProps extends WeatherDetailProps {
  weatehrIcon: string;
  date: string;
  day: string;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  description: string;
}

export default function ForecastWeatherDetail(
  props: ForecastWeatherDetailProps
) {
  const {
    weatehrIcon = "02d",
    date = "19.09",
    day = "Tuesday",
    temp,
    feels_like,
    temp_min,
    temp_max,
    description
  } = props;
  return (
    <Container className="gap-10 py-2"> 
      {/* left */}
      <section className=" flex gap-10 items-center px-3  "> 
        <div className=" flex flex-col gap-1 items-center">
          <WeatherIcon 
            iconName={weatehrIcon} 
            className="h-20 w-20" 
          />
          <p className="text-xs">{date}</p> 
          <p className="text-xs">{day} </p> 
        </div>

        {/* */}
        <div className="flex flex-col px-3"> 
          <span className="text-2xl">{convertKelvinToCelsius(temp ?? 0)}°</span> 
          <p className="text-xs space-x-1 whitespace-nowrap">
            <span> Sensação</span> 
            <span>{convertKelvinToCelsius(feels_like ?? 0)}°</span>
          </p>
          <p className="capitalize text-xs"> {description}</p> 
        </div>
      </section>
      {/* right */}
      
      {/* --- MUDANÇA AQUI (FAIXA DE 7 DIAS) --- */}
      {/* Trocado 'justify-start' por 'justify-around' */}
      <section className="flex flex-wrap gap-15 px-4 py-3 justify-around flex-1"> 
        <WeatherDetails {...props} />
      </section>
    </Container>
  );
}