import { LocalTimeZone, TimeZone } from "@types";
import axios from "axios";
import _ from "lodash";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useRef, useState } from "react";
import { Else, If, Then } from "react-if";
import { toast } from "react-toastify";
import { classNames } from "utils";

import {
  CustomButton,
  EmptyCard,
  HTMLInputElementWithClearInput,
  MemoizedClockList,
  MemoizedTimeZoneDisplay,
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
  const [zones, setZones] = usePersistState<LocalTimeZone[]>({
    storageKey: "timezones",
    initialState: [],
  });

  const router = useRouter();
  const inputRef = useRef<HTMLInputElementWithClearInput>(null);

  const getTimeZoneInfo = useCallback(async () => {
    const { value: searchTerm } = inputRef.current || { value: "" };

    if (searchTerm === "") {
      toast.error("Selecciona una zona horaria");
      return;
    }

    setIsSearching(true);
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
  }, []);

  const saveTimeZone = useCallback(() => {
    if ((zones ?? []).length >= MAX_ZONES) {
      toast.error(`Solo puedes guardar hasta ${MAX_ZONES} zonas horarias`);
      return;
    }

    if (timezone) {
      const exists = _.find(zones, { region: timezone.region });
      if (!exists) {
        setZones((prev) => [
          ...prev,
          {
            ...timezone,
            saved: true,
          },
        ]);
      }
    }
    setTimezone(undefined);
  }, [timezone]);

  const loadTimeZoneInfo = useCallback(
    (tz?: LocalTimeZone) => {
      setTimezone(tz);
    },
    [zones],
  );

  const removeSelectedZone = useCallback(() => {
    setZones((prev) => prev.filter((e) => e.region !== timezone?.region));
    setTimezone(undefined);
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
            <MemoizedTimeZoneDisplay
              timeZone={timezone}
              onViewTimeZone={onViewTimeZone}
              saveTimeZone={saveTimeZone}
              removeSelectedZone={removeSelectedZone}
              clearTimeZoneInfo={clearTimeZoneInfo}
            />
          </div>
          <div className={styles.timezoneListContainer}>
            <If condition={zones?.length ?? 0 > 0}>
              <Then>
                <MemoizedClockList zones={zones} onClick={loadTimeZoneInfo} />
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
