import { Location } from "@types";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";

import { ClockCard, CustomButton } from "@/components/index";
import { WorldMap } from "@/components/world-map";
import styles from "@/styles/pages/timezone.module.css";
import { classNames } from "@/utils/classname.util";

interface TimeZoneProps {
  location: Location;
  rawRegion: string;
  region: string;
}

function TimeZone(props: TimeZoneProps): JSX.Element {
  const { location, rawRegion, region } = props;

  const router = useRouter();

  const goBackToHome = useCallback(() => {
    router.push("/");
  }, [router]);

  const hours = useMemo(() => {
    const today = new Date().getTimezoneOffset() / 60;
    return today + location.timezone_offset;
  }, [location]);

  const currentOffset = useMemo(() => {
    const today = new Date().getTimezoneOffset();
    return today * 60 * 1000;
  }, [location]);

  return (
    <>
      <Head>
        <title>Timezone Map - {region}</title>

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={classNames(styles.main, "container")}>
        <div className={styles.title}>
          <h2>TIMEZONE MAP</h2>
          <CustomButton onClick={goBackToHome}>
            Regresar a la página principal
          </CustomButton>
        </div>
        <div className={styles.timezoneGrid}>
          <div>
            <div className={styles.timezoneInfo}>
              <p>
                <strong>Región:</strong> <br />
                {region}
              </p>
              <p>
                <strong>Pais:</strong> <br />
                {location.geo?.country || "No disponible"}
              </p>
              <p>
                <strong>Ciudad:</strong> <br />
                {location.geo?.city || "No disponible"}
              </p>
              <p>
                <strong>Fecha:</strong> <br />
                {location.date || "No disponible"}
              </p>
              <p>
                <strong>Hora:</strong> <br />
                {location.time_12 || "No disponible"}
              </p>
              <p>
                <strong>Horario de verano:</strong> <br />
                {location.is_dst ? "Activo" : "Inactivo"}
              </p>
              <p>
                <strong>Diferencia horaria:</strong> <br />
                {hours || "N/A"} horas
              </p>
            </div>
          </div>

          <div className={styles.mapContainer}>
            <WorldMap
              lat={location.geo?.latitude || 0}
              lng={location.geo?.longitude || 0}
              description={`UBICACIÓN:${location.geo?.city}, ${location.geo?.country}.\nFECHA:${location.date_time}.\nTIMEZONE: ${rawRegion}.`}
            />
            <div className={styles.clockContainer}>
              <ClockCard offset={currentOffset} title="Hora actual" />
              <ClockCard offset={location.timezone_millis} title={region} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

async function getServerSideProps({ req, params }: GetServerSidePropsContext) {
  let location = {} as Location;
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const host = req.headers["x-forwarded-host"] || req.headers.host;

  const { region } = params as { region: string };
  const cutRegion = region
    .replace(/^\w+\//, "")
    .replace(/[/]/g, ",")
    .replace(/_/g, " ");

  try {
    const url = `${protocol}://${host}/api/location?tz=${cutRegion}`;

    const response = await axios.get(url);
    if (response.status === 200) {
      location = response.data as Location;
    }
  } catch (error) {
    location = {} as Location;
  }

  return {
    props: {
      location: {
        ...location,
        timezone_millis: location.timezone_offset * 60 * 60 * 1000,
      },
      rawRegion: region,
      region: cutRegion,
    },
  };
}

export default TimeZone;
export { getServerSideProps };
