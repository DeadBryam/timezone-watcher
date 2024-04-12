import { useAutoAnimate } from "@formkit/auto-animate/react";
import { LocalTimeZone, TimeZone } from "@types";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useRef, useState } from "react";
import { Else, If, Then } from "react-if";
import { toast } from "react-toastify";
import { classNames } from "utils";

import {
  Card,
  ClockCard,
  CustomButton,
  EmptyCard,
  HTMLInputElementWithClearInput,
  SuggestionsInput,
} from "@/components/index";
import { usePersistState } from "@/hooks/index";
import styles from "@/styles/pages/home.module.css";

interface HomeProps {
  timeZones: Array<string>;
}

const MAX_ZONES = 9;

export default function Home({ timeZones }: HomeProps): JSX.Element {
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [timezone, setTimezone] = useState<LocalTimeZone>();
  const [isLocal, setIsLocal] = useState<boolean>(false);
  const [zones, setZones] = usePersistState<LocalTimeZone[]>({
    storageKey: "timezones",
    initialState: [],
  });

  const router = useRouter();
  const [clockRef] = useAutoAnimate<HTMLDivElement>();
  const inputRef = useRef<HTMLInputElementWithClearInput>(null);

  const getTimeZoneInfo = useCallback(async () => {
    const { value: searchTerm } = inputRef.current || { value: "" };

    if (searchTerm === "") {
      toast.error("Selecciona una zona horaria");
      return;
    }

    setIsSearching(true);
    setIsLocal(false);

    try {
      const res = await axios.get(`/api/timezone?tz=${searchTerm}`);
      if (res.status === 200) {
        const data = res.data as TimeZone;
        const zone = data.timeZone.split("/");
        const lastZone = zone[zone.length - 1].replace("_", " ");

        const today = -new Date().getTimezoneOffset();
        const minutes = data.currentUtcOffset.seconds / 60;
        const hours = Math.floor((minutes - today) / 60);

        setTimezone({
          region: lastZone,
          diff: hours,
          offset: data.currentUtcOffset.milliseconds,
          timezone: data.timeZone,
        });
      }
    } catch (error) {
      toast.error("Error al buscar la zona horaria");
    } finally {
      setIsSearching(false);
      inputRef.current?.clearInput();
    }
  }, [inputRef.current?.value]);

  const clearTimeZoneInfo = useCallback(() => {
    setTimezone(undefined);
    setIsLocal(false);
  }, []);

  const saveTimeZone = useCallback(() => {
    if ((zones ?? []).length >= MAX_ZONES) {
      toast.error(`Solo puedes guardar hasta ${MAX_ZONES} zonas horarias`);
      return;
    }

    if (timezone) {
      setZones((prev) => {
        const exists = prev.find((e) => e.region === timezone.region);
        return exists ? prev : [...prev, timezone];
      });
    }
    setTimezone(undefined);
  }, [timezone]);

  const loadTimeZoneInfo = useCallback(
    (index: number) => {
      setIsLocal(true);
      setTimezone(zones?.[index]);
    },
    [zones],
  );

  const removeSelectedZone = useCallback(() => {
    setZones((prev) => prev.filter((e) => e.region !== timezone?.region));
    setTimezone(undefined);
    setIsLocal(false);
  }, [timezone]);

  const onViewTimeZone = useCallback(() => {
    router.push(`/timezone/${encodeURIComponent(timezone?.timezone || "")}`);
  }, [timezone]);

  return (
    <>
      <Head>
        <title>Timezone Watcher</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={classNames(styles.main, "container")}>
        <div className={styles.timezoneSearch}>
          <h2>TIMEZONE WATCHER</h2>
          <div className={styles.timezoneSearchContainer}>
            <SuggestionsInput
              innerRef={inputRef}
              autoCompleteItems={timeZones}
              className={styles.timezoneInput}
            />
            <CustomButton onClick={getTimeZoneInfo} isLoading={isSearching}>
              Buscar
            </CustomButton>
          </div>
        </div>
        <If condition={zones?.length ?? 0 > 0}>
          <Then>
            <div className={styles.info}>
              <p>Haz click sobre una zona horaria para ver mas informacion</p>
              <p className={styles.infoCount}>
                {zones?.length ?? 0}/{MAX_ZONES} zonas
              </p>
            </div>
          </Then>
        </If>
        <div className={styles.container}>
          <div>
            <Card className={styles.timezoneInfo}>
              <If condition={timezone !== undefined}>
                <Then>
                  <h4>Informacion de la zona horaria</h4>
                  <ClockCard
                    offset={timezone?.offset || 0}
                    title={timezone?.region || ""}
                    className={styles.timezoneCard}
                  />
                  <p>
                    Diferencia horaria:&nbsp;
                    <b>{timezone?.diff} horas</b>
                  </p>
                  <If condition={isLocal}>
                    <Then>
                      <div className={styles.timezoneActions}>
                        <CustomButton onClick={clearTimeZoneInfo}>
                          Cancelar
                        </CustomButton>
                        <CustomButton onClick={removeSelectedZone} secondary>
                          Remover
                        </CustomButton>
                      </div>
                      <CustomButton
                        onClick={onViewTimeZone}
                        className={styles.seeMore}
                      >
                        Ver mas informacion
                      </CustomButton>
                    </Then>
                    <Else>
                      <div className={styles.timezoneActions}>
                        <CustomButton onClick={clearTimeZoneInfo} secondary>
                          Limpiar
                        </CustomButton>
                        <CustomButton onClick={saveTimeZone}>
                          Guardar
                        </CustomButton>
                      </div>
                    </Else>
                  </If>
                </Then>
                <Else>
                  <EmptyCard
                    title="No hay informacion de la zona horaria"
                    description="Por favor, busca o selecciona una zona horaria"
                    isSad
                  />
                </Else>
              </If>
            </Card>
          </div>
          <div className={styles.timezoneListContainer}>
            <If condition={zones?.length ?? 0 > 0}>
              <Then>
                <div ref={clockRef} className={styles.timezoneList}>
                  {zones?.map((e, i) => (
                    <ClockCard
                      key={i}
                      title={e.region}
                      offset={e.offset}
                      onClick={() => loadTimeZoneInfo(i)}
                    />
                  ))}
                </div>
              </Then>
              <Else>
                <EmptyCard
                  title="No tienes zonas horarias guardadas"
                  description="Puedes buscar una zona horaria y guardarla"
                />
              </Else>
            </If>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  let timeZones = [];
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const host = req.headers["x-forwarded-host"] || req.headers.host;

  const url = `${protocol}://${host}/api/timezones`;

  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      timeZones = response.data;
    }
  } catch (error) {
    timeZones = [];
  }

  return {
    props: {
      timeZones,
    },
  };
}
