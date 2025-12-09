/** @format */

import React from "react";
import Image from "next/image";
import { cn } from "../utils/cn";

export default function WeatherIcon(
  props: React.HTMLProps<HTMLDivElement> & { iconName: string }
) {
  return (
    // O tamanho base pode ser um pouco maior, mas será sobrescrito pelos outros componentes
    <div title={props.iconName} {...props} className={cn("relative h-16 w-16", props.className)}> 
      <Image
        width={100}
        height={100}
        alt="weather-icon"
        className="absolute h-full w-full"
        src={`https://openweathermap.org/img/wn/${props.iconName}@4x.png`}
      />
    </div>
  );
}