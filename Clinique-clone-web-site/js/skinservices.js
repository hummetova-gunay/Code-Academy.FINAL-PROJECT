
const BASE_URL = "http://localhost:8000/Ian";

function fillCalendar(modalId) {
  const tableBody = document.querySelector(`#${modalId} tbody`);
  const availableDate = document.querySelector(`#${modalId} .availableDate`);
  const currentDate = new Date();
  const firstDayOfWeek = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() - currentDate.getDay()
  );


  function createButton(day, isMatched) {
    const button = document.createElement("button");
    button.textContent = day;
    button.classList.add("btn");
    button.disabled = !isMatched;
    button.addEventListener("click", async function () {
      const res = await axios(BASE_URL);
      const data= await res.data;
      const selectedDay = data.find((item) => item.day === day);
      const amTime = document.querySelector(`#${modalId} .am-time`);
      const pmTime = document.querySelector(`#${modalId} .pm-time`);

      if (selectedDay) {
        amTime.innerHTML = "<h4>AM</h4>";
        pmTime.innerHTML = "<h4>PM</h4>";

        if (selectedDay.AM) {
          for (let i = 0; i < selectedDay.AM.length; i++) {
            const selectTime = document.createElement("button");
            selectTime.classList.add("btn");
            selectTime.textContent = selectedDay.AM[i];
            amTime.appendChild(selectTime);
          }
        } else {
          amTime.innerHTML = "No AM Time";
        }

        if (selectedDay.PM) {
          for (let i = 0; i < selectedDay.PM.length; i++) {
            const selectTime = document.createElement("button");
            selectTime.classList.add("btn");
            selectTime.textContent = selectedDay.PM[i];
            pmTime.appendChild(selectTime);
          }
        } else {
          pmTime.innerHTML = "No PM Time";
        }

        // availableDate.textContent = selectedDay.date;
        const currentDate = new Date();
        let clickedDay=new Date(currentDate.getFullYear(), currentDate.getMonth(), button.textContent )
                    // console.log(clickedDay);
                    const formattedDate = clickedDay.toLocaleString('en-US', {
                        weekday: 'short',
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      });
                    //   console.log(formattedDate);
                    availableDate.innerHTML=formattedDate;
      }
    });

    return button;
  }

  async function fillTable() {
    const res = await axios(BASE_URL);
    const data=await res.data

    for (let i = 0; i < 2; i++) {
      const row = document.createElement("tr");
      for (let j = 0; j < 7; j++) {
        const cell = document.createElement("td");
        const date = new Date(
          firstDayOfWeek.getFullYear(),
          firstDayOfWeek.getMonth(),
          firstDayOfWeek.getDate() + i * 7 + j
        );
        const day = date.getDate();
        const isMatched = data.some((item) => item.day === day);
        const button = createButton(day, isMatched);

        cell.appendChild(button);
        row.appendChild(cell);
      }
      tableBody.appendChild(row);
    }
  }

  fillTable();
}

fillCalendar("exampleModalToggle-Ian2");
fillCalendar("exampleModalToggle-Ian-12week");
fillCalendar("exampleModalToggle-Fawn2");
fillCalendar("exampleModalToggle-serums");

    
