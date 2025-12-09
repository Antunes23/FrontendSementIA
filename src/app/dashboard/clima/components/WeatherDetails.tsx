/** @format */

import React from "react";
import { LuEye, LuSunrise, LuSunset } from "react-icons/lu";
import { FiDroplet } from "react-icons/fi";
import { MdAir } from "react-icons/md";
import { ImMeter } from "react-icons/im";

export interface WeatherDetailProps {
  visability: string;
  humidity: string;
  windSpeed: string;
  airPressure: string;
  sunrise: string;
  sunset: string;
}

export default function WeatherDetails(props: WeatherDetailProps) {
  const {
    visability = "25km",
    humidity = "61%",
    windSpeed = "7 km/h",
    airPressure = "1012 hPa",
    sunrise = "6.20",
    sunset = "18:48"
  } = props;

  return (
    <>
      <SingleWeatherDetail
        icon={<LuEye />}
        information="Visibilidade" // <-- MUDADO
        value={visability}
      />
      <SingleWeatherDetail
        icon={<FiDroplet />}
        information="Umidade" // <-- MUDADO
        value={humidity}
      />
      <SingleWeatherDetail
        icon={<MdAir />}
        information="Veloc. do Vento" // <-- MUDADO
        value={windSpeed}
      />
      <SingleWeatherDetail
        icon={<ImMeter />}
        information="Pressão" // <-- MUDADO
        value={airPressure}
      />
      <SingleWeatherDetail
        icon={<LuSunrise />}
        information="Nascer do Sol" // <-- MUDADO
        value={sunrise}
      />
      <SingleWeatherDetail
        icon={<LuSunset />}
        information="Pôr do Sol" // <-- MUDADO
        value={sunset}
      />
    </>
  );
}

export interface SingleWeatherDetailProps {
  information: string;
  icon: React.ReactNode;
  value: string;
}

function SingleWeatherDetail(props: SingleWeatherDetailProps) {
  return (
    <div className="flex flex-col justify-between gap-4 items-center text-xs font-semibold text-black/200">
      <p className="whitespace-nowrap">{props.information}</p>
      <div className="text-3xl">{props.icon}</div>
      <p>{props.value}</p>
    </div>
  );
}