import { useSelector } from 'react-redux';
import { useCalendar } from '../../hooks/useCalendar';
import { selectList } from '../../redux/list/selector';
import { checkDateIsEqual, checkIsToday } from '../../utils/helpers/date';
import styles from './Calendar.module.scss';

interface CalendarProps {
  locale?: string;
  selectedDate: Date;
  selectDate: (date: Date) => void;
  firstWeekDayNumber?: number;
}

interface Item {
  id: number;
  date: Date;
  address: string;
  person: string;
  prof: string;
  imgUrl: string;
}

const Calendar = ({
  locale = 'default',
  selectedDate: date,
  selectDate,
  firstWeekDayNumber = 2,
}: CalendarProps) => {
  const { functions, state } = useCalendar({
    locale,
    selectedDate: date,
    firstWeekDayNumber,
  });

  const { list } = useSelector(selectList);

  return (
    <div className={styles.calendar}>
      <div className={styles.calendarHeader}>
        <div
          aria-hidden
          className={styles.calendarHeaderArrowLeft}
          onClick={() => functions.onClickArrow('left')}
        />
        {state.mode === 'days' && (
          <div aria-hidden onClick={() => functions.setMode('monthes')}>
            {state.monthesNames[state.selectedMonth.monthIndex].month} {state.selectedYear}
          </div>
        )}
        {state.mode === 'monthes' && (
          <div aria-hidden onClick={() => functions.setMode('years')}>
            {state.selectedYear}
          </div>
        )}
        {state.mode === 'years' && (
          <div>
            {state.selectedYearsInterval[0]} -{' '}
            {state.selectedYearsInterval[state.selectedYearsInterval.length - 1]}
          </div>
        )}
        <div
          aria-hidden
          className={styles.calendarHeaderArrowRight}
          onClick={() => functions.onClickArrow('right')}
        />
      </div>
      <div className={styles.calendarBody}>
        {state.mode === 'days' && (
          <>
            <div className={styles.calendarWeekNames}>
              {state.weekDaysNames.map((weekDaysName) => (
                <div key={weekDaysName.dayShort}>{weekDaysName.dayShort}</div>
              ))}
            </div>
            <div className={styles.calendarDays}>
              {state.calendarDays.map((day) => {
                const isToday = checkIsToday(day.date);
                const isSelectedDay = checkDateIsEqual(day.date, state.selectedDay.date);
                const isAdditionalDay = day.monthIndex !== state.selectedMonth.monthIndex;

                return (
                  <div
                    key={`${day.dayNumber}-${day.monthIndex}`}
                    aria-hidden
                    onClick={() => {
                      functions.setSelectedDay(day);
                      selectDate(day.date);
                    }}
                    className={[
                      styles.calendarDay,
                      isToday ? styles.calendaTodayItem : '',
                      isSelectedDay ? styles.calendarSelectedItem : '',
                      isAdditionalDay ? styles.calendarAddDay : '',
                    ].join(' ')}>
                    <p>{day.dayNumber}</p>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {state.mode === 'monthes' && (
          <div className={styles.calendarPickItemsContainer}>
            {state.monthesNames.map((monthesName) => {
              const isCurrentMonth =
                new Date().getMonth() === monthesName.monthIndex &&
                state.selectedYear === new Date().getFullYear();
              const isSelectedMonth = monthesName.monthIndex === state.selectedMonth.monthIndex;

              return (
                <div
                  key={monthesName.month}
                  aria-hidden
                  onClick={() => {
                    functions.setSelectedMonthByIndex(monthesName.monthIndex);
                    functions.setMode('days');
                  }}
                  className={[
                    styles.calendarPickItem,
                    isSelectedMonth ? styles.calendarSelectedItem : '',
                    isCurrentMonth ? styles.calendaTodayItem : '',
                  ].join(' ')}>
                  {monthesName.monthShort}
                </div>
              );
            })}
          </div>
        )}

        {state.mode === 'years' && (
          <div className={styles.calendarPickItemsContainer}>
            <div className={styles.calendarUnchooseableYear}>
              {state.selectedYearsInterval[0] - 1}
            </div>
            {state.selectedYearsInterval.map((year) => {
              const isCurrentYear = new Date().getFullYear() === year;
              const isSelectedYear = year === state.selectedYear;

              return (
                <div
                  key={year}
                  aria-hidden
                  onClick={() => {
                    functions.setSelectedYear(year);
                    functions.setMode('monthes');
                  }}
                  className={[
                    styles.calendarPickItem,
                    isCurrentYear ? styles.calendaTodayItem : '',
                    isSelectedYear ? styles.calendarSelectedItem : '',
                  ].join(' ')}>
                  {year}
                </div>
              );
            })}
            <div className={styles.calendarUnchooseableYear}>
              {state.selectedYearsInterval[state.selectedYearsInterval.length - 1] + 1}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
