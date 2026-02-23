export interface CalendarOptions {
  value?: Date;
  min?: Date;
  max?: Date;
  onChange?: (date: Date) => void;
}

export interface CalendarResult {
  container: HTMLElement;
  setValue: (date: Date) => void;
  getValue: () => Date | null;
  getFormattedValue: () => string | null;
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export function createCalendar(opts: CalendarOptions = {}): CalendarResult {
  const container = document.createElement('div');
  container.className = 'osx-calendar';

  let currentMonth = opts.value || new Date();
  let selectedDate: Date | null = opts.value || null;

  const header = document.createElement('div');
  header.className = 'osx-calendar-header';

  const prevBtn = document.createElement('button');
  prevBtn.className = 'osx-calendar-nav';
  prevBtn.innerHTML = '&lt;';
  prevBtn.setAttribute('aria-label', 'Previous month');

  const monthLabel = document.createElement('span');
  monthLabel.className = 'osx-calendar-month';

  const nextBtn = document.createElement('button');
  nextBtn.className = 'osx-calendar-nav';
  nextBtn.innerHTML = '&gt;';
  nextBtn.setAttribute('aria-label', 'Next month');

  header.appendChild(prevBtn);
  header.appendChild(monthLabel);
  header.appendChild(nextBtn);
  container.appendChild(header);

  const grid = document.createElement('div');
  grid.className = 'osx-calendar-grid';

  function render() {
    monthLabel.textContent = `${MONTHS[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`;

    grid.innerHTML = '';

    for (const day of DAYS) {
      const dayEl = document.createElement('div');
      dayEl.className = 'osx-calendar-day-name';
      dayEl.textContent = day;
      grid.appendChild(dayEl);
    }

    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const startPadding = firstDay.getDay();
    const totalDays = lastDay.getDate();

    for (let i = 0; i < startPadding; i++) {
      const empty = document.createElement('div');
      empty.className = 'osx-calendar-day empty';
      grid.appendChild(empty);
    }

    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const dayEl = document.createElement('button');
      dayEl.className = 'osx-calendar-day';
      dayEl.textContent = String(day);

      if (opts.min && date < opts.min) {
        dayEl.classList.add('disabled');
        dayEl.disabled = true;
      } else if (opts.max && date > opts.max) {
        dayEl.classList.add('disabled');
        dayEl.disabled = true;
      } else if (selectedDate && isSameDay(date, selectedDate)) {
        dayEl.classList.add('selected');
      }

      dayEl.addEventListener('click', () => {
        selectedDate = date;
        if (opts.onChange) opts.onChange(date);
        render();
      });

      grid.appendChild(dayEl);
    }
  }

  prevBtn.addEventListener('click', () => {
    currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    render();
  });

  nextBtn.addEventListener('click', () => {
    currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
    render();
  });

  container.appendChild(grid);
  render();

  return {
    container,
    setValue(date: Date) {
      selectedDate = date;
      currentMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      render();
    },
    getValue() {
      return selectedDate;
    },
    getFormattedValue() {
      return selectedDate ? formatDate(selectedDate) : null;
    },
  };
}
