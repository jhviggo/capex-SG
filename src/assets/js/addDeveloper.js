let vacationContainerIndex = 0;

function addVacationInput() {

    document.getElementById("vacation-container").innerHTML +=
        `<label for="vacationDays[${vacationContainerIndex}][startDate]" required>Start date</label>` +
        `<input type="date" name="vacationDays[${vacationContainerIndex}][startDate]">` +
        `<label for="vacationDays[${vacationContainerIndex}][endDate]" required>End date</label>` +
        `<input type="date" name="vacationDays[${vacationContainerIndex}][endDate]">`;

        vacationContainerIndex += 1;
}
