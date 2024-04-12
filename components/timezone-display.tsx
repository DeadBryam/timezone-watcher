import { useAutoAnimate } from "@formkit/auto-animate/react";
import { LocalTimeZone } from "@types";
import { memo } from "react";
import { Else, If, Then } from "react-if";

import styles from "@/styles/components/timezone-display.module.css";

import { Card } from "./card";
import { MemiozedClockCard } from "./clock-card";
import { CustomButton } from "./custom-button";
import { EmptyCard } from "./empty-card";

interface TimeZoneDisplayProps {
  timeZone: LocalTimeZone | undefined;
  onViewTimeZone: () => void;
  saveTimeZone: () => void;
  removeSelectedZone: () => void;
  clearTimeZoneInfo: () => void;
}

function TimeZoneDisplay(props: TimeZoneDisplayProps): JSX.Element {
  const {
    timeZone,
    onViewTimeZone,
    saveTimeZone,
    removeSelectedZone,
    clearTimeZoneInfo,
  } = props;

  const [ref] = useAutoAnimate<HTMLDivElement>();

  return (
    <Card className={styles.timezoneInfo} styleRef={ref}>
      <If condition={timeZone !== undefined}>
        <Then>
          <h4>Informacion de la zona horaria</h4>
          <MemiozedClockCard
            timeZone={timeZone}
            className={styles.timezoneCard}
          />
          <p>
            Diferencia horaria:&nbsp;
            <b>{timeZone?.diff} horas</b>
          </p>
          <If condition={timeZone?.saved}>
            <Then>
              <div className={styles.timezoneActions}>
                <CustomButton onClick={clearTimeZoneInfo}>
                  Cancelar
                </CustomButton>
                <CustomButton onClick={removeSelectedZone} secondary>
                  Remover
                </CustomButton>
              </div>
            </Then>
            <Else>
              <div className={styles.timezoneActions}>
                <CustomButton onClick={clearTimeZoneInfo} secondary>
                  Limpiar
                </CustomButton>
                <CustomButton onClick={saveTimeZone}>Guardar</CustomButton>
              </div>
            </Else>
          </If>
          <CustomButton onClick={onViewTimeZone} className={styles.seeMore}>
            Ver mas informacion
          </CustomButton>
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
  );
}

const MemoizedTimeZoneDisplay = memo(TimeZoneDisplay);

export { MemoizedTimeZoneDisplay, TimeZoneDisplay };
