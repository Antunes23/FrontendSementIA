  /** @format */
  "use client";

  import Container from "../components/Container";
  import ForecastWeatherDetail from "../components/ForecastWeatherDetail";
  import MainHeader from "../components/MainHeader"; 
  import WeatherDetails from "../components/WeatherDetails";
  import WeatherIcon from "../components/WeatherIcon";
  import { convertKelvinToCelsius } from "../utils/convertKelvinToCelsius";
  import { convertWindSpeed } from "../utils/convertWindSpeed";
  import { getDayOrNightIcon } from "../utils/getDayOrNightIcon";
  import { metersToKilometers } from "../utils/metersToKilometers";
  import axios from "axios";
  import { format, fromUnixTime, parseISO } from "date-fns";
  import { ptBR } from "date-fns/locale";
  import { useQuery } from "react-query";
  import { loadingCityAtom, placeAtom } from "./atom";
  import { useAtom } from "jotai";
  import { useEffect } from "react";

  // ... (Suas interfaces WeatherDetail e WeatherData ficam aqui) ...
  interface WeatherDetail {
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    visibility: number;
    pop: number;
    sys: {
      pod: string;
    };
    dt_txt: string;
  }

  interface WeatherData {
    cod: string;
    message: number;
    cnt: number;
    list: WeatherDetail[];
    city: {
      id: number;
      name: string;
      coord: {
        lat: number;
        lon: number;
      };
      country: string;
      population: number;
      timezone: number;
      sunrise: number;
      sunset: number;
    };
  }

  export default function Home() {
    const [place, setPlace] = useAtom(placeAtom);
    const [loadingCity] = useAtom(loadingCityAtom);

    // ... (Toda a sua lógica de useQuery, useEffect, etc. continua igual) ...
    const { isLoading, error, data, refetch } = useQuery<WeatherData>(
      "repoData",
      async () => {
        const { data } = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56&lang=pt_br`
        );
        return data;
      }
    );

    useEffect(() => {
      refetch();
    }, [place, refetch]);

    const firstData = data?.list[0];
    const uniqueDates = [
      ...new Set(
        data?.list.map(
          (entry) => new Date(entry.dt * 1000).toISOString().split("T")[0]
        )
      )
    ];
    const firstDataForEachDate = uniqueDates.map((date) => {
      return data?.list.find((entry) => {
        const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
        const entryTime = new Date(entry.dt * 1000).getHours();
        return entryDate === date && entryTime >= 6;
      });
    });

    if (isLoading)
      return (
        <div className="flex items-center min-h-screen justify-center">
          <p className="animate-bounce">Carregando...</p>
        </div>
      );
    if (error)
      return (
        <div className="flex items-center min-h-screen justify-center">
          {/* @ts-ignore */}
          <p className="text-red-400">{error.message}</p>
        </div>
      );

    return (
      <div className="flex bg-gray-100 min-h-screen">
{/*         
        

        {/* --- MUDANÇA AQUI --- */}
        {/* Adicionado 'min-w-0' para impedir que esta coluna estoure a tela */}
        <div className="flex flex-col flex-1 min-w-0">
          
          <MainHeader/>    {/*ERRO ESTA NESSA LINHA, ME AJUDA AEEEE*/}
          
          <div className="flex-1 overflow-y-auto px-6 pb-6">
            
            <div className="flex-1 max-w-8xl mx-auto flex flex-col gap-6 w-full"> 
              {loadingCity ? (
                <WeatherSkeleton />
              ) : (
                <>
                  <section className="space-y-3 "> 
                    <div className="space-y-2"> 
                      <h2 className="flex gap-1 text-xl items-end "> 
                        <p className="font-bold">{data?.city.name}</p>
                        <p className="text-base">
                          ({format(parseISO(firstData?.dt_txt ?? ""), "dd/MM/yyyy")})
                        </p>
                      </h2>
                      <Container className=" gap-4 px-3 items-center py-2"> 
                        <div className=" flex flex-col px-2 "> 
                          <span className="text-4xl"> 
                            {convertKelvinToCelsius(firstData?.main.temp ?? 296.37)}°
                          </span>
                          <p className="text-xs space-x-1 whitespace-nowrap">
                            <span>Sensação</span>
                            <span>
                              {convertKelvinToCelsius(
                                firstData?.main.feels_like ?? 0
                              )}
                              °
                            </span>
                          </p>
                          <p className="text-xs space-x-2">
                            <span>
                              {convertKelvinToCelsius(firstData?.main.temp_min ?? 0)}
                              °↓{" "}
                            </span>
                            <span>
                              {" "}
                              {convertKelvinToCelsius(firstData?.main.temp_max ?? 0)}
                              °↑
                            </span>
                          </p>
                        </div>
                        <div className="flex gap-4 sm:gap-6 overflow-x-auto w-full justify-start pr-2"> 
                          {data?.list.map((d, i) => (
                            <div
                              key={i}
                              className="flex flex-col justify-between gap-1 items-center text-xs font-semibold " 
                            >
                              <p className="whitespace-nowrap">
                                {format(parseISO(d.dt_txt), "HH:mm")}
                              </p>
                              <WeatherIcon
                                iconName={getDayOrNightIcon(
                                  d.weather[0].icon,
                                  d.dt_txt
                                )}
                                className="h-15 w-15" 
                              />
                              <p>{convertKelvinToCelsius(d?.main.temp ?? 0)}°</p>
                            </div>
                          ))}
                        </div>
                      </Container>
                    </div>
                    <div className=" flex gap-2"> 
                      <Container className="w-fit  justify-center flex-col px-2 items-center py-2"> 
                        <p className=" capitalize text-center text-sm"> 
                          {firstData?.weather[0].description}{" "}
                        </p>
                        <WeatherIcon
                          iconName={getDayOrNightIcon(
                            firstData?.weather[0].icon ?? "",
                            firstData?.dt_txt ?? ""
                          )}
                          className="h-15 w-15" 
                        />
                      </Container>
                      
                      <Container className="bg-yellow-300/80 px-4 py-3 flex flex-wrap gap-1 justify-around flex-1"> 
                        <WeatherDetails
                          visability={metersToKilometers(
                            firstData?.visibility ?? 10000
                          )}
                          airPressure={`${firstData?.main.pressure} hPa`}
                          humidity={`${firstData?.main.humidity}%`}
                          sunrise={format(
                            fromUnixTime(data?.city.sunrise ?? 1702949452),
                            "HH:mm"
                          )}
                          sunset={format(
                            fromUnixTime(data?.city.sunset ?? 1702517657),
                            "HH:mm"
                          )}
                          windSpeed={convertWindSpeed(firstData?.wind.speed ?? 1.64)}
                        />
                      </Container>
                    </div>
                  </section>

                  {/* 7 day forcast data  */}
                  <section className="flex w-full flex-col gap-3  "> 
                    <p className="text-xl font-bold">Previsão (7 dias)</p>
                    {firstDataForEachDate.map((d, i) => (
                      <ForecastWeatherDetail
                        key={i}
                        description={d?.weather[0].description ?? ""}
                        weatehrIcon={d?.weather[0].icon ?? "01d"}
                        date={d ? format(parseISO(d.dt_txt), "dd/MM") : ""}
                        day={
                          d
                            ? format(parseISO(d.dt_txt), "EEEE", { locale: ptBR })
                            : "---"
                        }
                        feels_like={d?.main.feels_like ?? 0}
                        temp={d?.main.temp ?? 0}
                        temp_max={d?.main.temp_max ?? 0}
                        temp_min={d?.main.temp_min ?? 0}
                        airPressure={`${d?.main.pressure} hPa `}
                        humidity={`${d?.main.humidity}% `}
                        sunrise={format(
                          fromUnixTime(data?.city.sunrise ?? 1702517657),
                          "HH:mm"
                        )}
                        sunset={format(
                          fromUnixTime(data?.city.sunset ?? 1702517657),
                          "HH:mm"
                        )}
                        visability={`${metersToKilometers(d?.visibility ?? 10000)} `}
                        windSpeed={`${convertWindSpeed(d?.wind.speed ?? 1.64)} `}
                      />
                    ))}
                  </section>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ... (Seu componente WeatherSkeleton fica aqui) ...
  function WeatherSkeleton() {
    return (
      <section className="space-y-8 ">
        {/* Today's data skeleton */}
        <div className="space-y-2 animate-pulse">
          {/* Date skeleton */}
          <div className="flex gap-1 text-2xl items-end ">
            <div className="h-6 w-24 bg-gray-300 rounded"></div>
            <div className="h-6 w-24 bg-gray-300 rounded"></div>
          </div>

          {/* Time wise temperature skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <div className="h-6 w-16 bg-gray-300 rounded"></div>
                <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
                <div className="h-6 w-16 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        </div>

        {/* 7 days forecast skeleton */}
        <div className="flex flex-col gap-4 animate-pulse">
          <p className="text-2xl h-8 w-36 bg-gray-300 rounded"></p>

          {[1, 2, 3, 4, 5, 6, 7].map((index) => (
            <div key={index} className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
              <div className="h-8 w-28 bg-gray-300 rounded"></div>
              <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
              <div className="h-8 w-28 bg-gray-300 rounded"></div>
              <div className="h-8 w-28 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }