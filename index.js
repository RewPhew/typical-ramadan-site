const ramadanData = [
    { date: '12M', ramazan: '01', iftar: '06:06', sehri: '04:43', day:'Mon' },
    { date: '13M', ramazan: '02', iftar: '06:07', sehri: '04:42', day:'Tue' },
    { date: '14M', ramazan: '03', iftar: '06:07', sehri: '04:41', day:'Wed' },
    { date: '15M', ramazan: '04', iftar: '06:08', sehri: '04:40', day:'Thu' },
    { date: '16M', ramazan: '05', iftar: '06:08', sehri: '04:39', day:'Fri' },
    { date: '17M', ramazan: '06', iftar: '06:09', sehri: '04:38', day:'Sat' },
    { date: '18M', ramazan: '07', iftar: '06:10', sehri: '04:37', day:'Sun' },
    { date: '19M', ramazan: '08', iftar: '06:11', sehri: '04:36', day:'Mon' },
    { date: '20M', ramazan: '09', iftar: '06:11', sehri: '04:34', day:'Tue' },
    { date: '21M', ramazan: '10', iftar: '06:12', sehri: '04:33', day:'Wed' },
    { date: '22M', ramazan: '11', iftar: '06:12', sehri: '04:32', day:'Thu' },
    { date: '23M', ramazan: '12', iftar: '06:13', sehri: '04:30', day:'Fri' },
    { date: '24M', ramazan: '13', iftar: '06:14', sehri: '04:29', day:'Sat' },
    { date: '25M', ramazan: '14', iftar: '06:14', sehri: '04:28', day:'Sun' },
    { date: '26M', ramazan: '15', iftar: '06:15', sehri: '04:27', day:'Mon' },
    { date: '27M', ramazan: '16', iftar: '06:15', sehri: '04:25', day:'Tue' },
    { date: '28M', ramazan: '17', iftar: '06:16', sehri: '04:24', day:'Thu' },
    { date: '29M', ramazan: '18', iftar: '06:16', sehri: '04:23', day:'Fri' },
    { date: '30M', ramazan: '19', iftar: '06:17', sehri: '04:22', day:'Sat' },
    { date: '31M', ramazan: '20', iftar: '06:17', sehri: '04:21', day:'Sun' },
    { date: '01A', ramazan: '21', iftar: '06:18', sehri: '04:20', day:'Mon' },
    { date: '02A', ramazan: '22', iftar: '06:19', sehri: '04:19', day:'Tue' },
    { date: '03A', ramazan: '23', iftar: '06:19', sehri: '04:18', day:'Wed' },
    { date: '04A', ramazan: '24', iftar: '06:20', sehri: '04:17', day:'Thu' },
    { date: '05A', ramazan: '25', iftar: '06:20', sehri: '04:15', day:'Fri' },
    { date: '06A', ramazan: '26', iftar: '06:21', sehri: '04:14', day:'Sat' },
    { date: '07A', ramazan: '27', iftar: '06:21', sehri: '04:13', day:'Sun' },
    { date: '08A', ramazan: '28', iftar: '06:22', sehri: '04:12', day:'Mon' },
    { date: '09A', ramazan: '29', iftar: '06:22', sehri: '04:11', day:'Tue' },
    { date: '10A', ramazan: '30', iftar: '06:23', sehri: '04:10', day:'Wed' },
];
const iftari = document.getElementById('iftari');
const sehri = document.getElementById('sehri');

function parseTime(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    return { hours, minutes };
}

function populateTable() {
    const tableBody = document.querySelector('#ramadan-table tbody');
    tableBody.innerHTML = '';

    ramadanData.forEach(data => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = data.ramazan;
        row.insertCell(1).textContent = data.date;
        row.insertCell(2).textContent = data.day;
        row.insertCell(3).textContent = data.sehri;
        row.insertCell(4).textContent = data.iftar;
    });

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();
    const todayData = ramadanData.find(data => {
        const match = data.date.match(/\d{2}[MA]/);
        if (!match) {
            return false;
        }
        const [day, monthChar] = match[0].match(/\d{2}|[MA]/g);
        const month = monthChar === 'M' ? 3 : 4;
        return parseInt(month) === currentMonth && parseInt(day) === currentDay;
    });

    if (todayData) {
        iftari.textContent = todayData.iftar;
        sehri.textContent = todayData.sehri;

        const iftariTime = parseTime(todayData.iftar);
        const sehriTime = parseTime(todayData.sehri);

        

        if (currentHour < sehriTime.hours || (currentHour === sehriTime.hours && currentMinute < sehriTime.minutes)) {
        } else if (currentHour >= iftariTime.hours || (currentHour === iftariTime.hours && currentMinute >= iftariTime.minutes)) {
            const nextIftariDate = new Date(currentDate);
            nextIftariDate.setDate(nextIftariDate.getDate() + 1);
            nextIftariDate.setHours(iftariTime.hours, iftariTime.minutes, 0, 0);
        } else {
            const iftariDate = new Date(currentDate);
            iftariDate.setHours(iftariTime.hours, iftariTime.minutes, 0, 0);
        }

        console.log(iftariTime.hours)
        console.log(iftariTime.minutes)
    }
}

populateTable();

const viewBtn = document.getElementById('seeFulls');
        const ramadanTableToHide = document.getElementById('ramadan-table');
        let isRamadanTableVisible = false;
        const viewText = document.getElementById('seeFull')

        viewBtn.addEventListener('click', () => {
            if (!isRamadanTableVisible) {
                ramadanTableToHide.classList.replace('hide', 'show');
                viewText.textContent = `Hide Calendar`;
                isRamadanTableVisible = true;
            } else {
                ramadanTableToHide.classList.replace('show', 'hide');
                viewText.textContent = `View Calendar`;
                isRamadanTableVisible = false;
            }
});