// Update intensity value when the slider changes
document.getElementById("intensitySlider").addEventListener("input", function() {
    document.getElementById("intensityValue").textContent = this.value;
});

// Function to handle joining a challenge
function joinChallenge() {
    const selectedChallenge = document.getElementById("challenge").value;
    alert("You joined the " + selectedChallenge + " challenge!");
}

// Function to create a fitness plan and send it to the server
function createPlan() {
    const planName = document.getElementById("planName").value;
    const intensity = document.getElementById("intensitySlider").value;
    const workoutType = document.getElementById("workoutType").value;
    const duration = document.getElementById("duration").value;

    // Collect selected goals
    const goals = [];
    document.querySelectorAll('input[type="checkbox"]:checked').forEach(goal => {
        goals.push(goal.value);
    });

    const milestone1 = document.getElementById("milestone1").value;
    const milestone2 = document.getElementById("milestone2").value;

    const reminderTime = document.getElementById("reminderTime").value;
    const notificationEnabled = document.getElementById("notificationToggle").checked;

    // Create the plan object
    const plan = {
        planName,
        intensity,
        workoutType,
        goals,
        duration,
        milestone1,
        milestone2,
        reminderTime,
        notificationEnabled
    };

    // Validate plan data before sending
    if (!planName || !workoutType || goals.length === 0 || !duration) {
        alert("Please complete all required fields before submitting.");
        return;
    }

    // Save the plan to localStorage for now (simulating server save)
    let existingPlans = JSON.parse(localStorage.getItem('fitnessPlans')) || [];
    existingPlans.push(plan);
    localStorage.setItem('fitnessPlans', JSON.stringify(existingPlans));

    // Redirect to the plans.html page after successful plan creation
    alert('Plan successfully created! Redirecting to your plans...');
    window.location.href = 'plans.html'; // Ensure that plans.html exists in the same directory
}

// Function to update progress dynamically
function updateProgress() {
    const workoutsCompleted = 5;  // Simulate a completed workout count
    const caloriesBurned = 2500;  // Simulate burned calories
    const goalsAchieved = 50;     // Simulate goal completion percentage

    const progressReport = document.getElementById('weeklyReport');
    if (progressReport) {
        progressReport.innerHTML = `
            <p>Total Workouts Completed: ${workoutsCompleted}</p>
            <p>Calories Burned: ${caloriesBurned} kcal</p>
            <p>Goals Achieved: ${goalsAchieved}%</p>
        `;
    }
}

// Example: Update the workout calendar dynamically (if needed)
function updateWorkoutCalendar() {
    const calendar = document.querySelector(".workout-calendar");
    if (calendar) {
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        let calendarHTML = "<table><tr><th>Day</th><th>Workout</th></tr>";

        days.forEach(day => {
            calendarHTML += `<tr><td>${day}</td><td><input type="text" placeholder="Enter workout"></td></tr>`;
        });

        calendarHTML += "</table>";
        calendar.innerHTML = calendarHTML;
    }
}

// Initialize additional features on load
window.onload = function() {
    updateWorkoutCalendar();  // Automatically update the calendar
};
